import bcrypt
import secrets
import time
from typing import Optional, Dict
import pyotp
from data.json_database import JsonDatabase

class AuthService:
    def __init__(self):
        self.db = JsonDatabase()
        self.pending_mfa: Dict[str, Dict] = {}
    
    def authenticate_admin(self, username, password):
        try:
            if self.db.is_locked(username):
                self.db.log_event('login_blocked', {'username': username})
                return {'locked': True}
            admin = self.db.get_admin_by_username(username)
            if admin and bcrypt.checkpw(password.encode('utf-8'), admin['password_hash'].encode('utf-8')):
                self.db.update_last_login(admin['id'])
                self.db.clear_failed_attempts(username)
                if admin.get('two_factor_enabled') and admin.get('two_factor_secret'):
                    challenge = self._initiate_mfa(admin['id'])
                    self.db.log_event('mfa_challenge', {'admin_id': admin['id'], 'username': username, 'challenge_id': challenge['challenge_id']})
                    return {
                        'mfa_required': True,
                        'challenge_id': challenge['challenge_id'],
                        'user': {
                            'id': admin['id'],
                            'username': admin['username'],
                            'email': admin['email'],
                            'role': admin.get('role', 'admin')
                        }
                    }
                return {
                    'id': admin['id'],
                    'username': admin['username'],
                    'email': admin['email'],
                    'role': admin.get('role', 'admin')
                }
            return None
        except Exception as e:
            print(f"Error en autenticación: {e}")
            return None
    
    def create_admin(self, username, email, password):
        try:
            password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            admin = self.db.create_admin({
                'username': username,
                'email': email,
                'password_hash': password_hash
            })
            return admin
        except Exception as e:
            print(f"Error creando admin: {e}")
            return None

    def _initiate_mfa(self, admin_id: str) -> Dict:
        challenge_id = secrets.token_urlsafe(16)
        self.pending_mfa[challenge_id] = {
            'admin_id': admin_id,
            'expires_at': time.time() + 300
        }
        return {'challenge_id': challenge_id}

    def verify_mfa(self, challenge_id: str, code: str) -> Optional[Dict]:
        challenge = self.pending_mfa.get(challenge_id)
        if not challenge:
            return None
        if time.time() > challenge['expires_at']:
            self.pending_mfa.pop(challenge_id, None)
            return None
        admin = self.db.get_admin_by_id(challenge['admin_id'])
        if not admin:
            return None
        secret = admin.get('two_factor_secret')
        if not secret:
            return None
        totp = pyotp.TOTP(secret)
        if totp.verify(code, valid_window=1):
            self.pending_mfa.pop(challenge_id, None)
            self.db.log_event('mfa_success', {'admin_id': admin['id']})
            return {
                'id': admin['id'],
                'username': admin['username'],
                'email': admin['email'],
                'role': admin.get('role', 'admin')
            }
        else:
            self.db.increment_failed_attempt(admin['username'])
            self.db.log_event('mfa_failed', {'admin_id': admin['id']})
            return None

    def setup_mfa_secret(self, admin_id: str) -> Optional[Dict]:
        admin = self.db.get_admin_by_id(admin_id)
        if not admin:
            return None
        secret = pyotp.random_base32()
        self.db.set_two_factor(admin_id, True, secret)
        uri = pyotp.totp.TOTP(secret).provisioning_uri(name=admin.get('email', admin.get('username')), issuer_name='Tienda MOLO Admin')
        self.db.log_event('mfa_setup', {'admin_id': admin_id})
        return {'secret': secret, 'otpauth_uri': uri}
