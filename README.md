# Tienda MOLO - Tienda de Ropa Online

Una aplicación completa de comercio electrónico para tiendas de ropa con integración de WhatsApp, panel administrativo y sistema de métricas.

## Características Principales

### 🛍️ Tienda Pública

- Catálogo de productos con filtros por categoría, talla y color
- Vista detallada de productos con galería de imágenes
- Sistema de carrito de compras
- Integración con WhatsApp para finalizar pedidos
- Diseño responsive y moderno

### 📊 Panel Administrativo

- Autenticación segura para administradores
- Dashboard con métricas en tiempo real
- Gestión completa de productos (CRUD)
- Gestión de categorías
- Control de stock y variantes
- Análisis de conversiones y visitas

### 📱 Integración WhatsApp

- Botones de contacto en productos
- Mensajes predefinidos con detalles del pedido
- Seguimiento de clicks en WhatsApp
- Formato optimizado para Argentina (+54 9)

### 📈 Sistema de Métricas

- Visitas por producto
- Clicks en WhatsApp
- Tasa de conversión
- Productos más populares
- Análisis de tendencias

## Tecnologías Utilizadas

### Frontend

- React 18 con TypeScript
- Vite para desarrollo rápido
- Tailwind CSS para estilos
- Shadcn/ui para componentes
- Lucide React para iconos
- Recharts para gráficos

### Backend

- Python Flask
- JSON como base de datos
- JWT para autenticación
- Flask-CORS para integración
- Bcrypt para seguridad de contraseñas

## Instalación y Configuración

### Requisitos Previos

- Node.js 18+
- Python 3.8+ (para backend completo)
- npm o pnpm

### Frontend Setup

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd tienda-molo
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**

   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Backend Setup (Opcional - Si tienes Python)

1. **Navegar al directorio API**

   ```bash
   cd api
   ```

2. **Crear entorno virtual**

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instalar dependencias**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

5. **Iniciar servidor backend**
   ```bash
   python app.py
   ```

## Uso de la Aplicación

### Tienda Pública

1. **Navegar por el catálogo**: Usa los filtros para encontrar productos
2. **Ver detalles**: Click en cualquier producto para ver más información
3. **Seleccionar variante**: Elige talla y color disponibles
4. **Agregar al carrito**: Usa el botón correspondiente
5. **Finalizar pedido**: Click en "Finalizar por WhatsApp" en el carrito

### Panel Administrativo

1. **Acceder al admin**: Click en el ícono de configuración (⚙️) en el header
2. **Login**: Usa las credenciales por defecto (admin/admin123)
3. **Dashboard**: Visualiza métricas generales
4. **Gestión de productos**: CRUD completo con variantes
5. **Gestión de categorías**: Administra las categorías disponibles

### Credenciales por Defecto

**Admin Panel:**

- Usuario: admin
- Contraseña: admin123

## Estructura del Proyecto

```
tienda-molo/
├── src/                          # Frontend React
│   ├── components/              # Componentes React
│   │   ├── AdminApp.tsx         # Panel administrativo principal
│   │   ├── AdminDashboard.tsx   # Dashboard con métricas
│   │   ├── ProductManagement.tsx # Gestión de productos
│   │   ├── ProductCatalog.tsx   # Catálogo público
│   │   ├── ProductDetail.tsx    # Detalle de producto
│   │   └── Cart.tsx             # Carrito de compras
│   ├── services/                # Servicios y API
│   │   └── api.ts               # Cliente API con TypeScript
│   ├── contexts/                # Contextos de React
│   │   └── CartContext.tsx      # Contexto del carrito
│   └── tests/                   # Tests de validación
├── api/                          # Backend Python Flask
│   ├── app.py                   # Aplicación principal Flask
│   ├── services/                # Servicios del backend
│   │   ├── auth_service.py      # Autenticación
│   │   ├── product_service.py   # Gestión de productos
│   │   └── metric_service.py    # Métricas y análisis
│   ├── data/                    # Base de datos JSON
│   │   ├── productos.json       # Productos
│   │   ├── categorias.json    # Categorías
│   │   ├── admins.json         # Usuarios admin
│   │   └── json_database.py    # Cliente JSON database
│   └── requirements.txt        # Dependencias Python
└── .trae/documents/             # Documentación del proyecto
    ├── tienda-ropa-prd.md      # Requisitos del producto
    └── tienda-ropa-arquitectura.md # Arquitectura técnica
```

## API Endpoints

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener producto específico
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/{id}` - Actualizar producto
- `DELETE /api/products/{id}` - Eliminar producto

### Categorías

- `GET /api/categories` - Obtener todas las categorías
- `POST /api/categories` - Crear categoría
- `PUT /api/categories/{id}` - Actualizar categoría
- `DELETE /api/categories/{id}` - Eliminar categoría

### Métricas

- `POST /api/metrics/view/{product_id}` - Registrar vista
- `POST /api/metrics/whatsapp/{product_id}` - Registrar click WhatsApp

### Autenticación

- `POST /api/auth/login` - Login de administrador

## Personalización

### Número de WhatsApp

Edita el número en los componentes:

- `src/components/ProductDetail.tsx` (línea con el número)
- `src/components/Cart.tsx` (línea con el número)

### Estilos y Colores

- Modifica `tailwind.config.js` para cambiar la paleta de colores
- Actualiza los componentes en `src/components/` para cambiar estilos

### Productos Iniciales

- Edita `api/data/productos.json` para cambiar productos
- Edita `api/data/categorias.json` para cambiar categorías

## Testing

### Tests de Frontend

```bash
npm run test
```

### Validación de Tipos

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Deployment

### Frontend (Vercel/Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura el build command: `npm run build`
3. Configura el output directory: `dist`

### Backend (Render/PythonAnywhere)

1. Sube el código a tu plataforma preferida
2. Configura las variables de entorno
3. Asegúrate de que Python y las dependencias estén instaladas

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte técnico o preguntas:

- Crea un issue en el repositorio
- Contacta al equipo de desarrollo

## Demo

[Agregar URL de demo cuando esté disponible]

---

**Desarrollado con ❤️ para Tienda MOLO**
