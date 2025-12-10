from services.auth_service import AuthService

def seed():
    svc = AuthService()
    admin = svc.create_admin("admin", "admin@example.com", "Admin1234!")
    print("Admin creado:", admin)

if __name__ == "__main__":
    seed()
