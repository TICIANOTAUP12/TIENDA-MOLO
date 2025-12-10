# Manual de Administración

## Inicio de Sesión

- Ingresa usuario y contraseña.
- Si 2FA está habilitado, ingresa el código de tu app (Google Authenticator, Authy).
- En caso de bloqueo temporal por intentos fallidos, espera 15 minutos.

## Gestión de 2FA

- Con sesión iniciada, realiza `POST /api/auth/mfa/setup` para obtener el `otpauth_uri` y el `secret`.
- Escanea el `otpauth_uri` en tu app de autenticación.
- Guarda el `secret` de manera segura.

## Roles

- `admin`: operaciones completas.
- `editor`: edición sin eliminar.

## Auditoría

- Revisa `api/data/audit_log.json` para ver accesos y eventos.

## Buenas Prácticas

- Usa contraseñas de al menos 12 caracteres.
- Mantén el `JWT_SECRET_KEY` en secreto.
- No compartas el `secret` de 2FA.

## Despliegue

- Genera certificados: `scripts\generate_certs.ps1`.
- Despliega: `scripts\deploy.ps1`.
- URL: `https://localhost:8443`.
