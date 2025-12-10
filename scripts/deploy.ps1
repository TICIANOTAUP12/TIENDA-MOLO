param(
  [string]$JwtSecret = "$( [guid]::NewGuid().ToString() )"
)

Write-Host "Creando archivo .env para docker-compose"
Set-Content -Path ".env" -Value "JWT_SECRET_KEY=$JwtSecret"

Write-Host "Construyendo imágenes..."
docker compose build

Write-Host "Levantando servicios..."
docker compose up -d

Write-Host "Servicios levantados: https://localhost:8443"
