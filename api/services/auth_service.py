import bcrypt
from data.json_database import JsonDatabase

class AuthService:
    def __init__(self):
        self.db = JsonDatabase()
    
    def authenticate_admin(self, username, password):
        try:
            admin = self.db.get_admin_by_username(username)
            if admin and bcrypt.checkpw(password.encode('utf-8'), admin['password_hash'].encode('utf-8')):
                self.db.update_last_login(admin['id'])
                return {
                    'id': admin['id'],
                    'username': admin['username'],
                    'email': admin['email']
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