# TIENDA-MOLO

Proyecto full-stack para venta de ropa:
- Frontend en `React` + `Vite` (plugin `@vitejs/plugin-react-swc`).
- Backend en `Flask` con JWT y CORS.

## Requisitos
- Node.js >= 18 (recomendado 20)
- npm
- Python >= 3.11 (probado con 3.13)

## Configuración rápida

### Frontend
- Instalar dependencias: `npm install`
- Desarrollo: `npm run dev` (abre en `http://localhost:3000`)
- Build: `npm run build` (salida en `build/`)

### Backend (Flask)
- Variables de entorno:
  - `JWT_SECRET_KEY` (obligatorio en producción; por defecto usa `your-secret-key-change-this`)
- Instalar dependencias: `pip install -r api/requirements.txt`
- Ejecutar API: `python api/app.py` (arranca en `http://localhost:5000`)

### Endpoints principales
- `GET /api/health` — estado de la API
- `POST /api/auth/login` — autenticación (JWT)
- `GET /api/productos` — lista y filtros
- `GET /api/productos/:id` — detalle
- `POST /api/productos` — crear (JWT requerido)
- `PUT /api/productos/:id` — actualizar (JWT requerido)
- `DELETE /api/productos/:id` — eliminar (JWT requerido)
- `GET /api/categorias` — categorías
- `POST /api/categorias` — crear (JWT requerido)
- `POST /api/whatsapp/click` — métrica de click
- `POST /api/upload` — subir imagen (JWT requerido)

## CI (GitHub Actions)
Se añadió un workflow:
- Build del frontend con Node 20.
- Verificación del backend: compilación de sintaxis y ejecución de tests (`unittest` si existen).

## Notas
- No subir `api/venv/`, `node_modules/`, `build/`, `uploads/`. Ya están en `.gitignore`.
- Para producción, configure `JWT_SECRET_KEY` en `.env` o variables del entorno del servidor.
