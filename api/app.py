from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import os
from dotenv import load_dotenv
import uuid
from werkzeug.utils import secure_filename

from services.auth_service import AuthService
from services.product_service import ProductService
from services.metric_service import MetricService

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

jwt = JWTManager(app)

auth_service = AuthService()
product_service = ProductService()
metric_service = MetricService()

# Crear directorio de uploads si no existe
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'API funcionando correctamente'})

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Usuario y contraseña requeridos'}), 400
        
        admin = auth_service.authenticate_admin(username, password)
        if admin:
            access_token = create_access_token(identity=admin['id'])
            return jsonify({
                'access_token': access_token,
                'user': {
                    'id': admin['id'],
                    'username': admin['username'],
                    'email': admin['email']
                }
            })
        else:
            return jsonify({'error': 'Credenciales inválidas'}), 401
            
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
@jwt_required()
def create_producto():
    try:
        data = request.get_json()
        producto = product_service.create_producto(data)
        return jsonify(producto), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/productos/<producto_id>', methods=['PUT'])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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
@jwt_required()
def delete_categoria(categoria_id):
    try:
        if product_service.delete_categoria(categoria_id):
            return jsonify({'message': 'Categoría eliminada correctamente'})
        else:
            return jsonify({'error': 'Categoría no encontrada o tiene productos asociados'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/metricas/resumen', methods=['GET'])
@jwt_required()
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