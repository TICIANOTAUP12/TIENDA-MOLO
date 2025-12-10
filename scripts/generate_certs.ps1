param(
  [string]$CertDir = "certs",
  [string]$CommonName = "localhost"
)

if (!(Test-Path $CertDir)) { New-Item -ItemType Directory -Path $CertDir | Out-Null }

Write-Host "Generando certificado auto-firmado para $CommonName"

$OpenSSL = Get-Command openssl -ErrorAction SilentlyContinue
if (-not $OpenSSL) {
  Write-Error "OpenSSL no encontrado. Instala OpenSSL o usa mkcert."
  exit 1
}

Push-Location $CertDir
"[ req ]`ndefault_bits       = 4096`nprompt             = no`ndistinguished_name  = dn`nreq_extensions     = req_ext`n`n[ dn ]`nCN = $CommonName`n`n[ req_ext ]`nsubjectAltName = @alt_names`n`n[ alt_names ]`nDNS.1 = $CommonName`n" | Out-File -Encoding ascii -FilePath openssl.cnf

openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout server.key -out server.crt -config openssl.cnf
Remove-Item openssl.cnf
Pop-Location

Write-Host "Certificados generados en $CertDir: server.crt y server.key"
