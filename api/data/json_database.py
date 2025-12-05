import json
import os
import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional

class JsonDatabase:
    def __init__(self, data_dir: str = "api/data"):
        self.data_dir = data_dir
        self.admins_file = os.path.join(data_dir, "admins.json")
        self.categorias_file = os.path.join(data_dir, "categorias.json")
        self.productos_file = os.path.join(data_dir, "productos.json")
        self.imagenes_file = os.path.join(data_dir, "imagenes.json")
        self.variantes_file = os.path.join(data_dir, "variantes.json")
        self.metricas_file = os.path.join(data_dir, "metricas.json")
        
        self._ensure_files_exist()
    
    def _ensure_files_exist(self):
        """Crear archivos JSON si no existen"""
        os.makedirs(self.data_dir, exist_ok=True)
        
        files = [
            (self.admins_file, []),
            (self.categorias_file, []),
            (self.productos_file, []),
            (self.imagenes_file, []),
            (self.variantes_file, []),
            (self.metricas_file, [])
        ]
        
        for file_path, default_data in files:
            if not os.path.exists(file_path):
                self._write_json(file_path, default_data)
    
    def _read_json(self, file_path: str) -> List[Dict]:
        """Leer datos de archivo JSON"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []
    
    def _write_json(self, file_path: str, data: List[Dict]):
        """Escribir datos a archivo JSON"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    def _generate_id(self) -> str:
        """Generar ID único"""
        return str(uuid.uuid4())
    
    # Métodos para Administradores
    def get_admin_by_username(self, username: str) -> Optional[Dict]:
        admins = self._read_json(self.admins_file)
        for admin in admins:
            if admin['username'] == username:
                return admin
        return None
    
    def get_admin_by_id(self, admin_id: str) -> Optional[Dict]:
        admins = self._read_json(self.admins_file)
        for admin in admins:
            if admin['id'] == admin_id:
                return admin
        return None
    
    def create_admin(self, admin_data: Dict) -> Optional[Dict]:
        admins = self._read_json(self.admins_file)
        
        # Verificar si ya existe
        if self.get_admin_by_username(admin_data['username']):
            return None
        
        admin_data['id'] = self._generate_id()
        admin_data['created_at'] = datetime.now().isoformat()
        admin_data['last_login'] = None
        
        admins.append(admin_data)
        self._write_json(self.admins_file, admins)
        
        return admin_data
    
    def update_last_login(self, admin_id: str):
        admins = self._read_json(self.admins_file)
        for admin in admins:
            if admin['id'] == admin_id:
                admin['last_login'] = datetime.now().isoformat()
                self._write_json(self.admins_file, admins)
                break
    
    # Métodos para Categorías
    def get_categorias(self) -> List[Dict]:
        return self._read_json(self.categorias_file)
    
    def get_categoria_by_id(self, categoria_id: str) -> Optional[Dict]:
        categorias = self._read_json(self.categorias_file)
        for categoria in categorias:
            if categoria['id'] == categoria_id:
                return categoria
        return None
    
    def create_categoria(self, categoria_data: Dict) -> Optional[Dict]:
        categorias = self._read_json(self.categorias_file)
        
        categoria_data['id'] = self._generate_id()
        categoria_data['created_at'] = datetime.now().isoformat()
        
        categorias.append(categoria_data)
        self._write_json(self.categorias_file, categorias)
        
        return categoria_data
    
    def update_categoria(self, categoria_id: str, categoria_data: Dict) -> Optional[Dict]:
        categorias = self._read_json(self.categorias_file)
        for i, categoria in enumerate(categorias):
            if categoria['id'] == categoria_id:
                categoria.update(categoria_data)
                self._write_json(self.categorias_file, categorias)
                return categoria
        return None
    
    def delete_categoria(self, categoria_id: str) -> bool:
        categorias = self._read_json(self.categorias_file)
        for i, categoria in enumerate(categorias):
            if categoria['id'] == categoria_id:
                # Verificar si hay productos usando esta categoría
                productos = self.get_productos()
                for producto in productos:
                    if producto.get('categoria_id') == categoria_id:
                        return False  # No se puede eliminar, tiene productos
                
                categorias.pop(i)
                self._write_json(self.categorias_file, categorias)
                return True
        return False
    
    # Métodos para Productos
    def get_productos(self, categoria_id: Optional[str] = None, talla: Optional[str] = None, 
                      color: Optional[str] = None, activo: bool = True) -> List[Dict]:
        productos = self._read_json(self.productos_file)
        imagenes = self._read_json(self.imagenes_file)
        variantes = self._read_json(self.variantes_file)
        
        # Filtrar productos activos
        if activo:
            productos = [p for p in productos if p.get('activo', True)]
        
        # Filtrar por categoría
        if categoria_id:
            productos = [p for p in productos if p.get('categoria_id') == categoria_id]
        
        # Agregar imágenes y variantes a cada producto
        for producto in productos:
            producto['imagenes'] = [img for img in imagenes if img.get('producto_id') == producto['id']]
            producto['variantes'] = [var for var in variantes if var.get('producto_id') == producto['id']]
            
            # Ordenar imágenes por orden
            producto['imagenes'].sort(key=lambda x: x.get('orden', 0))
        
        # Filtrar por talla y color
        if talla or color:
            productos_filtrados = []
            for producto in productos:
                variantes_filtradas = producto['variantes']
                if talla:
                    variantes_filtradas = [v for v in variantes_filtradas if v.get('talla') == talla]
                if color:
                    variantes_filtradas = [v for v in variantes_filtradas if v.get('color') == color]
                
                if variantes_filtradas:
                    producto['variantes'] = variantes_filtradas
                    productos_filtrados.append(producto)
            
            return productos_filtrados
        
        return productos
    
    def get_producto_by_id(self, producto_id: str) -> Optional[Dict]:
        productos = self._read_json(self.productos_file)
        imagenes = self._read_json(self.imagenes_file)
        variantes = self._read_json(self.variantes_file)
        
        for producto in productos:
            if producto['id'] == producto_id:
                producto['imagenes'] = [img for img in imagenes if img.get('producto_id') == producto_id]
                producto['variantes'] = [var for var in variantes if var.get('producto_id') == producto_id]
                
                # Ordenar imágenes por orden
                producto['imagenes'].sort(key=lambda x: x.get('orden', 0))
                
                return producto
        
        return None
    
    def create_producto(self, producto_data: Dict) -> Optional[Dict]:
        productos = self._read_json(self.productos_file)
        
        producto_data['id'] = self._generate_id()
        producto_data['created_at'] = datetime.now().isoformat()
        producto_data['updated_at'] = datetime.now().isoformat()
        producto_data['activo'] = producto_data.get('activo', True)
        
        # Procesar imágenes
        imagenes = producto_data.pop('imagenes', [])
        for idx, imagen_url in enumerate(imagenes):
            self.create_imagen({
                'producto_id': producto_data['id'],
                'url_imagen': imagen_url,
                'orden': idx
            })
        
        # Procesar variantes
        variantes = producto_data.pop('variantes', [])
        for variante in variantes:
            variante['producto_id'] = producto_data['id']
            self.create_variante(variante)
        
        productos.append(producto_data)
        self._write_json(self.productos_file, productos)
        
        return self.get_producto_by_id(producto_data['id'])
    
    def update_producto(self, producto_id: str, producto_data: Dict) -> Optional[Dict]:
        productos = self._read_json(self.productos_file)
        
        for i, producto in enumerate(productos):
            if producto['id'] == producto_id:
                # Actualizar datos básicos
                producto.update(producto_data)
                producto['updated_at'] = datetime.now().isoformat()
                
                # Actualizar imágenes si se proporcionan
                if 'imagenes' in producto_data:
                    # Eliminar imágenes existentes
                    self.delete_imagenes_by_producto(producto_id)
                    # Crear nuevas imágenes
                    for idx, imagen_url in enumerate(producto_data['imagenes']):
                        self.create_imagen({
                            'producto_id': producto_id,
                            'url_imagen': imagen_url,
                            'orden': idx
                        })
                
                # Actualizar variantes si se proporcionan
                if 'variantes' in producto_data:
                    # Eliminar variantes existentes
                    self.delete_variantes_by_producto(producto_id)
                    # Crear nuevas variantes
                    for variante in producto_data['variantes']:
                        variante['producto_id'] = producto_id
                        self.create_variante(variante)
                
                self._write_json(self.productos_file, productos)
                return self.get_producto_by_id(producto_id)
        
        return None
    
    def delete_producto(self, producto_id: str) -> bool:
        productos = self._read_json(self.productos_file)
        
        for i, producto in enumerate(productos):
            if producto['id'] == producto_id:
                # Eliminar imágenes y variantes asociadas
                self.delete_imagenes_by_producto(producto_id)
                self.delete_variantes_by_producto(producto_id)
                
                productos.pop(i)
                self._write_json(self.productos_file, productos)
                return True
        
        return False
    
    # Métodos para Imágenes
    def create_imagen(self, imagen_data: Dict) -> Optional[Dict]:
        imagenes = self._read_json(self.imagenes_file)
        
        imagen_data['id'] = self._generate_id()
        imagen_data['created_at'] = datetime.now().isoformat()
        
        imagenes.append(imagen_data)
        self._write_json(self.imagenes_file, imagenes)
        
        return imagen_data
    
    def delete_imagenes_by_producto(self, producto_id: str):
        imagenes = self._read_json(self.imagenes_file)
        imagenes = [img for img in imagenes if img.get('producto_id') != producto_id]
        self._write_json(self.imagenes_file, imagenes)
    
    # Métodos para Variantes
    def create_variante(self, variante_data: Dict) -> Optional[Dict]:
        variantes = self._read_json(self.variantes_file)
        
        variante_data['id'] = self._generate_id()
        
        variantes.append(variante_data)
        self._write_json(self.variantes_file, variantes)
        
        return variante_data
    
    def delete_variantes_by_producto(self, producto_id: str):
        variantes = self._read_json(self.variantes_file)
        variantes = [var for var in variantes if var.get('producto_id') != producto_id]
        self._write_json(self.variantes_file, variantes)
    
    # Métodos para Métricas
    def registrar_vista(self, producto_id: str):
        metricas = self._read_json(self.metricas_file)
        today = datetime.now().date().isoformat()
        
        # Buscar métrica de hoy para este producto
        for metrica in metricas:
            if metrica.get('producto_id') == producto_id and metrica.get('fecha') == today:
                metrica['vistas'] = metrica.get('vistas', 0) + 1
                self._write_json(self.metricas_file, metricas)
                return
        
        # Crear nueva métrica
        nueva_metrica = {
            'id': self._generate_id(),
            'producto_id': producto_id,
            'vistas': 1,
            'clicks_whatsapp': 0,
            'fecha': today
        }
        metricas.append(nueva_metrica)
        self._write_json(self.metricas_file, metricas)
    
    def registrar_whatsapp_click(self, producto_id: str):
        metricas = self._read_json(self.metricas_file)
        today = datetime.now().date().isoformat()
        
        # Buscar métrica de hoy para este producto
        for metrica in metricas:
            if metrica.get('producto_id') == producto_id and metrica.get('fecha') == today:
                metrica['clicks_whatsapp'] = metrica.get('clicks_whatsapp', 0) + 1
                self._write_json(self.metricas_file, metricas)
                return
        
        # Crear nueva métrica
        nueva_metrica = {
            'id': self._generate_id(),
            'producto_id': producto_id,
            'vistas': 0,
            'clicks_whatsapp': 1,
            'fecha': today
        }
        metricas.append(nueva_metrica)
        self._write_json(self.metricas_file, metricas)
    
    def get_resumen_metricas(self) -> Dict:
        metricas = self._read_json(self.metricas_file)
        productos = self._read_json(self.productos_file)
        today = datetime.now().date().isoformat()
        
        # Métricas de hoy
        metricas_hoy = [m for m in metricas if m.get('fecha') == today]
        
        # Total de productos activos
        productos_activos = [p for p in productos if p.get('activo', True)]
        
        # Productos más vistos hoy
        productos_vistas = {}
        for metrica in metricas_hoy:
            producto_id = metrica.get('producto_id')
            if producto_id:
                if producto_id not in productos_vistas:
                    productos_vistas[producto_id] = 0
                productos_vistas[producto_id] += metrica.get('vistas', 0)
        
        # Ordenar por vistas y obtener top 5
        top_productos = sorted(productos_vistas.items(), key=lambda x: x[1], reverse=True)[:5]
        
        # Enriquecer con nombres de productos
        productos_mas_vistos = []
        for producto_id, vistas in top_productos:
            producto = self.get_producto_by_id(producto_id)
            if producto:
                productos_mas_vistos.append({
                    'producto_id': producto_id,
                    'nombre': producto.get('nombre'),
                    'vistas': vistas
                })
        
        # Calcular conversión WhatsApp
        total_vistas = sum(m.get('vistas', 0) for m in metricas_hoy)
        total_clicks = sum(m.get('clicks_whatsapp', 0) for m in metricas_hoy)
        conversion = (total_clicks / total_vistas * 100) if total_vistas > 0 else 0
        
        return {
            'total_productos': len(productos_activos),
            'visitas_hoy': total_vistas,
            'productos_mas_vistos': productos_mas_vistos,
            'conversion_whatsapp': round(conversion, 2)
        }