from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import os
from dotenv import load_dotenv
import uuid
from werkzeug.utils import secure_filename
import secrets
import time

from services.auth_service import AuthService
from services.product_service import ProductService
from services.metric_service import MetricService

load_dotenv()

app = Flask(__name__)
# Configurar CORS con headers seguros
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": os.getenv('CORS_ORIGINS', '*')}})

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['CSRF_COOKIE_NAME'] = 'csrf_token'
app.config['CSRF_HEADER_NAME'] = 'X-CSRF-Token'

jwt = JWTManager(app)

auth_service = AuthService()
product_service = ProductService()
metric_service = MetricService()

# Crear directorio de uploads si no existe
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def roles_required(roles):
    def decorator(fn):
        from functools import wraps
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            admin_id = get_jwt_identity()
            admin = auth_service.db.get_admin_by_id(admin_id)
            if not admin or admin.get('role') not in roles:
                return jsonify({'error': 'No autorizado'}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator

@app.before_request
def csrf_protect():
    if request.method in ['POST', 'PUT', 'DELETE'] and request.path.startswith('/api/'):
        token_cookie = request.cookies.get(app.config['CSRF_COOKIE_NAME'])
        token_header = request.headers.get(app.config['CSRF_HEADER_NAME'])
        if not token_cookie or not token_header or token_cookie != token_header:
            return jsonify({'error': 'CSRF token inválido'}), 403

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'API funcionando correctamente'})

@app.route('/api/csrf', methods=['GET'])
def get_csrf():
    token = secrets.token_urlsafe(32)
    resp = make_response(jsonify({'csrf_token': token}))
    secure = os.getenv('CSRF_SECURE', 'false').lower() == 'true'
    resp.set_cookie(app.config['CSRF_COOKIE_NAME'], token, secure=secure, httponly=False, samesite='Strict', max_age=3600)
    return resp

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Usuario y contraseña requeridos'}), 400
        
        admin = auth_service.authenticate_admin(username, password)
        if admin is None:
            auth_service.db.increment_failed_attempt(username)
            auth_service.db.log_event('login_failed', {'username': username, 'ip': request.remote_addr})
            return jsonify({'error': 'Credenciales inválidas'}), 401
        if isinstance(admin, dict) and admin.get('locked'):
            return jsonify({'error': 'Cuenta bloqueada temporalmente'}), 423
        if isinstance(admin, dict) and admin.get('mfa_required'):
            auth_service.db.log_event('login_mfa_required', {'username': username})
            return jsonify({'mfa_required': True, 'challenge_id': admin['challenge_id'], 'user': admin['user']}), 200
        access_token = create_access_token(identity=admin['id'], additional_claims={'role': admin.get('role', 'admin')})
        auth_service.db.log_event('login_success', {'admin_id': admin['id'], 'ip': request.remote_addr})
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': admin['id'],
                'username': admin['username'],
                'email': admin['email'],
                'role': admin.get('role', 'admin')
            }
        })
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/mfa/verify', methods=['POST'])
def mfa_verify():
    try:
        data = request.get_json()
        challenge_id = data.get('challenge_id')
        code = data.get('code')
        if not challenge_id or not code:
            return jsonify({'error': 'Datos de verificación incompletos'}), 400
        admin = auth_service.verify_mfa(challenge_id, code)
        if not admin:
            return jsonify({'error': 'Código inválido'}), 401
        access_token = create_access_token(identity=admin['id'], additional_claims={'role': admin.get('role', 'admin')})
        return jsonify({'access_token': access_token, 'user': admin})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/mfa/setup', methods=['POST'])
@jwt_required()
def mfa_setup():
    try:
        admin_id = get_jwt_identity()
        res = auth_service.setup_mfa_secret(admin_id)
        if not res:
            return jsonify({'error': 'No se pudo generar secreto'}), 400
        return jsonify(res)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/productos', methods=['GET'])
def get_productos():
    try:
        categoria = request.args.get('categoria')
        talla = request.args.get('talla')
        color = request.args.get('color')
        
        productos = product_service.get_productos(categoria, talla, color)
        return jsonify({
            'products': productos,
            'total': len(productos)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/productos/<producto_id>', methods=['GET'])
def get_producto(producto_id):
    try:
        producto = product_service.get_producto_by_id(producto_id)
        if producto:
            metric_service.registrar_vista(producto_id)
            return jsonify(producto)
        else:
            return jsonify({'error': 'Producto no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/productos', methods=['POST'])
@roles_required(['admin'])
def create_producto():
    try:
        data = request.get_json()
        producto = product_service.create_producto(data)
        return jsonify(producto), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/productos/<producto_id>', methods=['PUT'])
@roles_required(['admin', 'editor'])
def update_producto(producto_id):
    try:
        data = request.get_json()
        producto = product_service.update_producto(producto_id, data)
        if producto:
            return jsonify(producto)
        else:
            return jsonify({'error': 'Producto no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/productos/<producto_id>', methods=['DELETE'])
@roles_required(['admin'])
def delete_producto(producto_id):
    try:
        if product_service.delete_producto(producto_id):
            return jsonify({'message': 'Producto eliminado correctamente'})
        else:
            return jsonify({'error': 'Producto no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categorias', methods=['GET'])
def get_categorias():
    try:
        categorias = product_service.get_categorias()
        return jsonify({'categorias': categorias})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categorias', methods=['POST'])
@roles_required(['admin'])
def create_categoria():
    try:
        data = request.get_json()
        categoria = product_service.create_categoria(data)
        if categoria:
            return jsonify(categoria), 201
        else:
            return jsonify({'error': 'Error creando categoría'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categorias/<categoria_id>', methods=['PUT'])
@roles_required(['admin', 'editor'])
def update_categoria(categoria_id):
    try:
        data = request.get_json()
        categoria = product_service.update_categoria(categoria_id, data)
        if categoria:
            return jsonify(categoria)
        else:
            return jsonify({'error': 'Categoría no encontrada'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categorias/<categoria_id>', methods=['DELETE'])
@roles_required(['admin'])
def delete_categoria(categoria_id):
    try:
        if product_service.delete_categoria(categoria_id):
            return jsonify({'message': 'Categoría eliminada correctamente'})
        else:
            return jsonify({'error': 'Categoría no encontrada o tiene productos asociados'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/metricas/resumen', methods=['GET'])
@roles_required(['admin'])
def get_metricas_resumen():
    try:
        metricas = metric_service.get_resumen_metricas()
        return jsonify(metricas)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/whatsapp/click', methods=['POST'])
def registrar_whatsapp_click():
    try:
        data = request.get_json()
        producto_id = data.get('producto_id')
        
        if producto_id:
            metric_service.registrar_whatsapp_click(producto_id)
            return jsonify({'message': 'Click registrado'})
        else:
            return jsonify({'error': 'producto_id requerido'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload', methods=['POST'])
@jwt_required()
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No se proporcionó imagen'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No se seleccionó archivo'}), 400
        
        if file:
            filename = secure_filename(file.filename)
            # Generar nombre único
            unique_filename = f"{uuid.uuid4()}_{filename}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            file.save(filepath)
            
            # Retornar URL de la imagen
            image_url = f"/uploads/{unique_filename}"
            return jsonify({'url': image_url, 'filename': unique_filename})
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
