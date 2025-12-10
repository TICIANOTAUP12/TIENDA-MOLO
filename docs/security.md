# Sistema de Autenticación de Administradores

## Características de Seguridad

- Validación robusta de usuario y contraseña con `bcrypt` y políticas de longitud.
- Protección CSRF mediante cookie y encabezado `X-CSRF-Token` (double submit).
- Autenticación en dos factores (2FA) basada en TOTP (`pyotp`).
- Bloqueo automático tras múltiples intentos fallidos (15 minutos tras 5 intentos).
- JWT con `claims` de rol para control de permisos (RBAC).
- Auditoría de eventos (login, MFA, accesos) en `api/data/audit_log.json`.
- Cabeceras seguras en Nginx (CSP, X-Frame-Options, X-XSS-Protection, etc.).

## Flujo de Login + 2FA

1. El cliente solicita un token CSRF (`GET /api/csrf`).
2. Envía `POST /api/auth/login` con credenciales y el header `X-CSRF-Token`.
3. Si el usuario tiene 2FA activo, la API responde `mfa_required` y `challenge_id`.
4. El cliente envía `POST /api/auth/mfa/verify` con `challenge_id` y `code` TOTP.
5. La API devuelve `access_token` JWT con `role`.

## Roles y Permisos

- `admin`: puede crear/editar/eliminar productos y categorías, ver métricas.
- `editor`: puede editar productos/categorías, no eliminar.

## CSRF

- Cookie `csrf_token` (no `HttpOnly`, `SameSite=Strict`, `Secure` configurable).
- Middleware verifica coincidencia `cookie` vs `header` en todos los `POST/PUT/DELETE`.

## Bloqueo por Intentos

- Contador `failed_attempts` y `lock_until` en el registro del admin.
- Al alcanzar 5 intentos, se bloquea por 15 minutos.

## Auditoría

- Archivo `api/data/audit_log.json` almacena eventos con `type`, `details` y `timestamp`.

## Puertos y Red

- Nginx con TLS en `8443`.
- Backends aislados en la red interna `internal_net` y balanceados con `least_conn`.

## Variables de Entorno

- `JWT_SECRET_KEY`: clave para firmar tokens JWT.
- `CSRF_SECURE`: `true/false` para marcar la cookie CSRF como `Secure`.
- `CORS_ORIGINS`: orígenes permitidos (por defecto `*`).

## Build y Despliegue

```
scripts\generate_certs.ps1
scripts\deploy.ps1
```

Accede a `https://localhost:8443`.
