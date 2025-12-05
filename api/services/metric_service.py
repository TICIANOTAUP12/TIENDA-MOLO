from data.json_database import JsonDatabase

class MetricService:
    def __init__(self):
        self.db = JsonDatabase()
    
    def registrar_vista(self, producto_id):
        self.db.registrar_vista(producto_id)
    
    def registrar_whatsapp_click(self, producto_id):
        self.db.registrar_whatsapp_click(producto_id)
    
    def get_resumen_metricas(self):
        return self.db.get_resumen_metricas()