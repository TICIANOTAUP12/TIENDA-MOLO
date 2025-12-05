from data.json_database import JsonDatabase

class ProductService:
    def __init__(self):
        self.db = JsonDatabase()
    
    def get_productos(self, categoria=None, talla=None, color=None):
        return self.db.get_productos(categoria, talla, color)
    
    def get_producto_by_id(self, producto_id):
        return self.db.get_producto_by_id(producto_id)
    
    def create_producto(self, producto_data):
        return self.db.create_producto(producto_data)
    
    def update_producto(self, producto_id, producto_data):
        return self.db.update_producto(producto_id, producto_data)
    
    def delete_producto(self, producto_id):
        return self.db.delete_producto(producto_id)
    
    def get_categorias(self):
        return self.db.get_categorias()
    
    def create_categoria(self, categoria_data):
        return self.db.create_categoria(categoria_data)
    
    def update_categoria(self, categoria_id, categoria_data):
        return self.db.update_categoria(categoria_id, categoria_data)
    
    def delete_categoria(self, categoria_id):
        return self.db.delete_categoria(categoria_id)