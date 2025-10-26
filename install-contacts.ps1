# Script de instalación para el sistema de contactos
# Windows PowerShell

Write-Host "🚀 Instalando dependencias para el sistema de contactos..." -ForegroundColor Cyan

# Navegar al directorio del frontend
Set-Location -Path "C:\Users\yamil\Desktop\hhh\frontend"

# Instalar Supabase client
Write-Host "`n📦 Instalando @supabase/supabase-js..." -ForegroundColor Yellow
npm install @supabase/supabase-js

Write-Host "`n✅ Dependencias instaladas correctamente!" -ForegroundColor Green

Write-Host "`n📝 Siguientes pasos:" -ForegroundColor Cyan
Write-Host "1. Copia el archivo .env.example a .env" -ForegroundColor White
Write-Host "2. Edita .env y agrega tus credenciales de Supabase" -ForegroundColor White
Write-Host "3. Ve a Supabase Dashboard > SQL Editor" -ForegroundColor White
Write-Host "4. Ejecuta el schema SQL del archivo supabase_schema.sql" -ForegroundColor White
Write-Host "5. Inicia el servidor de desarrollo: npm run dev" -ForegroundColor White

Write-Host "`n🎉 ¡Listo para usar el sistema de contactos!" -ForegroundColor Green
