import os
from supabase import create_client, Client
from datetime import datetime

class SupabaseClient:
    def __init__(self):
        self.supabase_url = os.getenv('SUPABASE_URL')
        self.supabase_key = os.getenv('SUPABASE_ANON_KEY')
        self.client: Client = create_client(self.supabase_url, self.supabase_key)
    
    def get_admin_by_username(self, username):
        try:
            response = self.client.table('admins').select('*').eq('username', username).execute()
            if response.data and len(response.data) > 0:
                return response.data[0]
            return None
        except Exception as e:
            print(f"Error obteniendo admin: {e}")
            return None
    
    def update_last_login(self, admin_id):
        try:
            self.client.table('admins').update({
                'last_login': datetime.now().isoformat()
            }).eq('id', admin_id).execute()
        except Exception as e:
            print(f"Error actualizando último login: {e}")
    
    def create_admin(self, username, email, password_hash):
        try:
            response = self.client.table('admins').insert({
                'username': username,
                'email': email,
                'password_hash': password_hash
            }).execute()
            if response.data and len(response.data) > 0:
                return response.data[0]
            return None
        except Exception as e:
            print(f"Error creando admin: {e}")
            return None
    
    def get_productos(self, categoria_id=None, talla=None, color=None, activo=True):
        try:
            query = self.client.table('productos').select('*, categorias(*), imagenes(*), variantes(*)')
            
            if activo:
                query = query.eq('activo', True)
            
            if categoria_id:
                query = query.eq('categoria_id', categoria_id)
            
            response = query.execute()
            
            productos = response.data if response.data else []
            
            if talla or color:
                productos_filtrados = []
                for producto in productos:
                    variantes_filtradas = producto['variantes']
                    if talla:
                        variantes_filtradas = [v for v in variantes_filtradas if v['talla'] == talla]
                    if color:
                        variantes_filtradas = [v for v in variantes_filtradas if v['color'] == color]
                    
                    if variantes_filtradas:
                        producto['variantes'] = variantes_filtradas
                        productos_filtrados.append(producto)
                
                return productos_filtrados
            
            return productos
            
        except Exception as e:
            print(f"Error obteniendo productos: {e}")
            return []
    
    def get_producto_by_id(self, producto_id):
        try:
            response = self.client.table('productos').select('*, categorias(*), imagenes(*), variantes(*)').eq('id', producto_id).execute()
            if response.data and len(response.data) > 0:
                return response.data[0]
            return None
        except Exception as e:
            print(f"Error obteniendo producto: {e}")
            return None
    
    def create_producto(self, producto_data):
        try:
            imagenes = producto_data.pop('imagenes', [])
            variantes = producto_data.pop('variantes', [])
            
            response = self.client.table('productos').insert(producto_data).execute()
            if response.data and len(response.data) > 0:
                producto = response.data[0]
                
                if imagenes:
                    for idx, imagen_url in enumerate(imagenes):
                        self.client.table('imagenes').insert({
                            'producto_id': producto['id'],
                            'url_imagen': imagen_url,
                            'orden': idx
                        }).execute()
                
                if variantes:
                    for variante in variantes:
                        variante['producto_id'] = producto['id']
                        self.client.table('variantes').insert(variante).execute()
                
                return self.get_producto_by_id(producto['id'])
            
            return None
        except Exception as e:
            print(f"Error creando producto: {e}")
            return None
    
    def update_producto(self, producto_id, producto_data):
        try:
            imagenes = producto_data.pop('imagenes', None)
            variantes = producto_data.pop('variantes', None)
            
            response = self.client.table('productos').update(producto_data).eq('id', producto_id).execute()
            if response.data and len(response.data) > 0:
                if imagenes is not None:
                    self.client.table('imagenes').delete().eq('producto_id', producto_id).execute()
                    for idx, imagen_url in enumerate(imagenes):
                        self.client.table('imagenes').insert({
                            'producto_id': producto_id,
                            'url_imagen': imagen_url,
                            'orden': idx
                        }).execute()
                
                if variantes is not None:
                    self.client.table('variantes').delete().eq('producto_id', producto_id).execute()
                    for variante in variantes:
                        variante['producto_id'] = producto_id
                        self.client.table('variantes').insert(variante).execute()
                
                return self.get_producto_by_id(producto_id)
            
            return None
        except Exception as e:
            print(f"Error actualizando producto: {e}")
            return None
    
    def delete_producto(self, producto_id):
        try:
            response = self.client.table('productos').delete().eq('id', producto_id).execute()
            return response.data is not None and len(response.data) > 0
        except Exception as e:
            print(f"Error eliminando producto: {e}")
            return False
    
    def get_categorias(self):
        try:
            response = self.client.table('categorias').select('*').execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"Error obteniendo categorías: {e}")
            return []
    
    def create_categoria(self, categoria_data):
        try:
            response = self.client.table('categorias').insert(categoria_data).execute()
            return response.data[0] if response.data and len(response.data) > 0 else None
        except Exception as e:
            print(f"Error creando categoría: {e}")
            return None
    
    def update_categoria(self, categoria_id, categoria_data):
        try:
            response = self.client.table('categorias').update(categoria_data).eq('id', categoria_id).execute()
            return response.data[0] if response.data and len(response.data) > 0 else None
        except Exception as e:
            print(f"Error actualizando categoría: {e}")
            return None
    
    def delete_categoria(self, categoria_id):
        try:
            response = self.client.table('categorias').delete().eq('id', categoria_id).execute()
            return response.data is not None and len(response.data) > 0
        except Exception as e:
            print(f"Error eliminando categoría: {e}")
            return False
    
    def registrar_vista(self, producto_id):
        try:
            today = datetime.now().date()
            response = self.client.table('metricas').select('*').eq('producto_id', producto_id).eq('fecha', today.isoformat()).execute()
            
            if response.data and len(response.data) > 0:
                metrica = response.data[0]
                self.client.table('metricas').update({
                    'vistas': metrica['vistas'] + 1
                }).eq('id', metrica['id']).execute()
            else:
                self.client.table('metricas').insert({
                    'producto_id': producto_id,
                    'vistas': 1,
                    'clicks_whatsapp': 0,
                    'fecha': today.isoformat()
                }).execute()
        except Exception as e:
            print(f"Error registrando vista: {e}")
    
    def registrar_whatsapp_click(self, producto_id):
        try:
            today = datetime.now().date()
            response = self.client.table('metricas').select('*').eq('producto_id', producto_id).eq('fecha', today.isoformat()).execute()
            
            if response.data and len(response.data) > 0:
                metrica = response.data[0]
                self.client.table('metricas').update({
                    'clicks_whatsapp': metrica['clicks_whatsapp'] + 1
                }).eq('id', metrica['id']).execute()
            else:
                self.client.table('metricas').insert({
                    'producto_id': producto_id,
                    'vistas': 0,
                    'clicks_whatsapp': 1,
                    'fecha': today.isoformat()
                }).execute()
        except Exception as e:
            print(f"Error registrando click WhatsApp: {e}")
    
    def get_resumen_metricas(self):
        try:
            today = datetime.now().date()
            
            total_productos = self.client.table('productos').count().eq('activo', True).execute()
            visitas_hoy = self.client.table('metricas').count().eq('fecha', today.isoformat()).execute()
            
            productos_mas_vistos = self.client.table('metricas').select('producto_id, vistas, productos(nombre)').eq('fecha', today.isoformat()).order('vistas', desc=True).limit(5).execute()
            
            return {
                'total_productos': total_productos.count if hasattr(total_productos, 'count') else 0,
                'visitas_hoy': visitas_hoy.count if hasattr(visitas_hoy, 'count') else 0,
                'productos_mas_vistos': productos_mas_vistos.data if productos_mas_vistos.data else [],
                'conversion_whatsapp': 0.05  # Placeholder, se calculará con datos reales
            }
        except Exception as e:
            print(f"Error obteniendo métricas: {e}")
            return {
                'total_productos': 0,
                'visitas_hoy': 0,
                'productos_mas_vistos': [],
                'conversion_whatsapp': 0
            }