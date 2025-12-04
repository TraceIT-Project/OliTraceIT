#!/bin/bash
# Script de inicio para Docker
# Inspirado en Open-WebUI pero desarrollado desde cero

set -e

echo "🚀 Iniciando MCP SaaS con Docker..."

# Verificar si existe archivo .env
if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado. Creando desde .env.docker.example..."
    cp .env.docker.example .env
    echo "📝 Por favor, edita el archivo .env con tus credenciales antes de continuar."
    exit 1
fi

# Verificar Docker y Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instala Docker primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor, instala Docker Compose primero."
    exit 1
fi

# Función para verificar si usar docker-compose o docker compose
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Modo de ejecución
MODE=${1:-production}

if [ "$MODE" = "dev" ]; then
    echo "🔧 Modo desarrollo"
    $DOCKER_COMPOSE -f docker-compose.dev.yml up --build
else
    echo "🏭 Modo producción"
    $DOCKER_COMPOSE up --build -d
    
    echo ""
    echo "✅ Servicios iniciados:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - Backend API: http://localhost:8000"
    echo "   - Qdrant: http://localhost:6333"
    echo ""
    echo "📊 Ver logs: docker-compose logs -f"
    echo "🛑 Detener: docker-compose down"
fi

