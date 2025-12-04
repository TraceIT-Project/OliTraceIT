# MCP SaaS para PYMEs Españolas

Sistema MCP (Model Context Protocol) modular que combina dos módulos principales:

1. **Bot especializado por sector** - Gestión de clientes, citas, leads y documentos vía WhatsApp
2. **Simulación logística** - Optimización de rutas, predicción de demanda y análisis de costos

## Características

### Bot por Sector
- ✅ Base de conocimiento automática por sector (abogados, clínicas, talleres, inmobiliarias, academias)
- ✅ Integración con WhatsApp Business API
- ✅ Gestión de citas y calendario
- ✅ Seguimiento de leads y pipeline de ventas
- ✅ Generación automática de documentos (presupuestos, contratos)

### Simulación Logística
- ✅ Optimización de rutas usando OR-Tools
- ✅ Predicción de demanda
- ✅ Cálculo de consumo de combustible
- ✅ Análisis de costos operativos
- ✅ Recomendaciones de optimización

## Instalación

1. Clonar el repositorio:
```bash
git clone <tu-repositorio>
cd mi-saas
```

2. Crear entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

## Configuración

Crear archivo `.env` con las siguientes variables:

```env
# OpenAI
OPENAI_API_KEY=tu_api_key
LLM_MODEL=gpt-4

# Qdrant
QDRANT_HOST=localhost
QDRANT_PORT=6333

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
WHATSAPP_NUMBER=+1234567890

# Servidor
PORT=8000
```

## Uso

### Opción 1: Docker (Recomendado) 🐳

La forma más fácil de desplegar todo el sistema:

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

Esto iniciará:
- ✅ Frontend en `http://localhost:3000`
- ✅ Backend API en `http://localhost:8000`
- ✅ Qdrant en `http://localhost:6333`
- ✅ PostgreSQL en `localhost:5432`

**Comandos útiles:**
```bash
# Ver logs
docker compose logs -f

# Detener servicios
docker compose down

# Reconstruir imágenes
docker compose build --no-cache
```

### Opción 2: Desarrollo Local

**Backend:**

Iniciar servidor backend:
```bash
python src/main.py
```

El backend estará disponible en `http://localhost:8000`

**Frontend:**

Instalar dependencias:
```bash
cd frontend
npm install
```

Iniciar servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### API Endpoints:

- `GET /` - Información del sistema
- `GET /health` - Estado de salud del sistema

## Estructura del Proyecto

```
mi-saas/
├── src/                         # Backend Python
│   ├── main.py                 # Punto de entrada principal
│   ├── core/
│   │   └── mcp_server.py       # Servidor MCP
│   ├── modules/
│   │   ├── bot_sector/         # Módulo de bot por sector
│   │   │   ├── bot_manager.py
│   │   │   ├── knowledge_base.py
│   │   │   ├── whatsapp_handler.py
│   │   │   ├── appointment_manager.py
│   │   │   ├── lead_tracker.py
│   │   │   └── document_manager.py
│   │   └── logistica/          # Módulo de simulación logística
│   │       └── simulador_logistica.py
│   └── utils/
├── frontend/                    # Frontend React
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/              # Páginas principales
│   │   │   ├── Dashboard.tsx
│   │   │   ├── BotSector.tsx
│   │   │   ├── Logistica.tsx
│   │   │   └── Settings.tsx
│   │   └── services/           # Servicios API
│   ├── nginx.conf              # Configuración Nginx para producción
│   └── package.json
├── docker-compose.yml          # Docker Compose para producción
├── docker-compose.dev.yml      # Docker Compose para desarrollo
├── Dockerfile.backend          # Dockerfile del backend
├── Dockerfile.frontend         # Dockerfile del frontend
├── Dockerfile.frontend.dev     # Dockerfile del frontend (dev)
├── docker-start.sh             # Script de inicio (Linux/Mac)
├── docker-start.bat            # Script de inicio (Windows)
├── requirements.txt
├── LICENSE
└── README.md
```

## Licencia

MIT License - Ver archivo LICENSE para más detalles.

## Atribuciones

Este proyecto utiliza las siguientes librerías de código abierto:

**Backend:**
- LangChain (https://github.com/langchain-ai/langchain)
- Qdrant (https://github.com/qdrant/qdrant)
- Vanna AI (https://github.com/vanna-ai/vanna)
- Unstructured (https://github.com/Unstructured-IO/unstructured)
- OR-Tools (https://github.com/google/or-tools)

**Frontend:**
- React (https://react.dev/)
- Vite (https://vitejs.dev/)
- TailwindCSS (https://tailwindcss.com/)
- React Router (https://reactrouter.com/)

**Inspiración:**
- Open-WebUI (https://github.com/open-webui/open-webui) - Utilizado como referencia para arquitectura de UI y diseño, pero el código frontend es completamente original.

Todas las librerías se instalan como dependencias vía pip/npm. El código fuente de este proyecto es original y desarrollado específicamente para este SaaS.

