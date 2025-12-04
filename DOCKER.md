# Guía de Despliegue con Docker

Esta guía explica cómo desplegar el MCP SaaS usando Docker, inspirado en la arquitectura de Open-WebUI pero desarrollado completamente desde cero.

## Requisitos Previos

- Docker Engine 20.10+
- Docker Compose 2.0+ (o `docker compose` integrado)
- Al menos 4GB de RAM disponible
- 10GB de espacio en disco

## Inicio Rápido

### 1. Configurar Variables de Entorno

```bash
cp .env.docker.example .env
# Editar .env con tus credenciales
```

### 2. Iniciar Servicios

**Producción:**
```bash
# Linux/Mac
chmod +x docker-start.sh
./docker-start.sh

# Windows
docker-start.bat
```

**Desarrollo:**
```bash
# Linux/Mac
./docker-start.sh dev

# Windows
docker-start.bat dev
```

## Arquitectura Docker

El sistema se despliega con los siguientes servicios:

### Servicios Principales

1. **frontend** - React/Vite con Nginx
   - Puerto: 3000
   - Imagen: Multi-stage build optimizada

2. **backend** - FastAPI/Python
   - Puerto: 8000
   - Healthcheck incluido

3. **qdrant** - Base de datos vectorial
   - Puerto: 6333 (HTTP), 6334 (gRPC)
   - Volumen persistente

4. **postgres** - Base de datos relacional (opcional)
   - Puerto: 5432
   - Volumen persistente

## Comandos Útiles

### Ver Logs

```bash
# Todos los servicios
docker compose logs -f

# Servicio específico
docker compose logs -f backend
docker compose logs -f frontend
```

### Detener Servicios

```bash
docker compose down
```

### Detener y Eliminar Volúmenes

```bash
docker compose down -v
```

### Reconstruir Imágenes

```bash
docker compose build --no-cache
docker compose up -d
```

### Acceder a Contenedores

```bash
# Backend
docker compose exec backend bash

# Frontend
docker compose exec frontend sh
```

## Configuración de Producción

### Variables de Entorno Importantes

```env
# Backend
ENV=production
PORT=8000
OPENAI_API_KEY=tu_key
QDRANT_HOST=qdrant
QDRANT_PORT=6333

# Frontend (se configura automáticamente)
VITE_API_URL=http://localhost:8000
```

### Optimizaciones

- **Frontend**: Build de producción con Nginx optimizado
- **Backend**: Python slim con dependencias mínimas
- **Volúmenes**: Datos persistentes en volúmenes Docker
- **Healthchecks**: Monitoreo automático de servicios

## Troubleshooting

### Puerto ya en uso

```bash
# Cambiar puertos en docker-compose.yml
ports:
  - "3001:80"  # Frontend
  - "8001:8000"  # Backend
```

### Problemas de permisos

```bash
# Linux: Ajustar permisos
sudo chown -R $USER:$USER .
```

### Limpiar todo y empezar de nuevo

```bash
docker compose down -v
docker system prune -a
docker compose up --build
```

## Diferencias con Open-WebUI

Aunque inspirado en Open-WebUI, este proyecto tiene:

- ✅ Arquitectura propia y código original
- ✅ Multi-stage builds optimizados
- ✅ Configuración de Nginx personalizada
- ✅ Scripts de inicio propios
- ✅ Estructura de servicios adaptada a nuestras necesidades

## Referencias

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Open-WebUI Docker](https://github.com/open-webui/open-webui) - Usado como referencia de arquitectura

