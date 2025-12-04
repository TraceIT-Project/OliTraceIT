@echo off
REM Script de inicio para Docker en Windows
REM Inspirado en Open-WebUI pero desarrollado desde cero

echo 🚀 Iniciando MCP SaaS con Docker...

REM Verificar si existe archivo .env
if not exist .env (
    echo ⚠️  Archivo .env no encontrado. Creando desde .env.docker.example...
    copy .env.docker.example .env
    echo 📝 Por favor, edita el archivo .env con tus credenciales antes de continuar.
    pause
    exit /b 1
)

REM Verificar Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker no está instalado. Por favor, instala Docker Desktop primero.
    pause
    exit /b 1
)

REM Modo de ejecución
set MODE=%1
if "%MODE%"=="" set MODE=production

if "%MODE%"=="dev" (
    echo 🔧 Modo desarrollo
    docker compose -f docker-compose.dev.yml up --build
) else (
    echo 🏭 Modo producción
    docker compose up --build -d
    
    echo.
    echo ✅ Servicios iniciados:
    echo    - Frontend: http://localhost:3000
    echo    - Backend API: http://localhost:8000
    echo    - Qdrant: http://localhost:6333
    echo.
    echo 📊 Ver logs: docker compose logs -f
    echo 🛑 Detener: docker compose down
)

pause

