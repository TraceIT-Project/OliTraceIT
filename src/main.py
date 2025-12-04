"""
MCP SaaS para PYMEs Españolas
Sistema modular que combina bot especializado por sector y simulación logística
"""

import asyncio
import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from core.mcp_server import MCPServer
from modules.bot_sector.bot_manager import BotManager
from modules.logistica.simulador_logistica import SimuladorLogistica

# Cargar variables de entorno
load_dotenv()

app = FastAPI(
    title="MCP SaaS PYMEs",
    description="Sistema MCP modular para gestión empresarial y logística",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instancias globales
mcp_server: Optional[MCPServer] = None
bot_manager: Optional[BotManager] = None
simulador_logistica: Optional[SimuladorLogistica] = None


@app.on_event("startup")
async def startup_event():
    """Inicializar servicios al arrancar la aplicación"""
    global mcp_server, bot_manager, simulador_logistica
    
    # Inicializar servidor MCP
    mcp_server = MCPServer()
    await mcp_server.initialize()
    
    # Inicializar gestor de bots por sector
    bot_manager = BotManager()
    await bot_manager.initialize()
    
    # Inicializar simulador logístico
    simulador_logistica = SimuladorLogistica()
    await simulador_logistica.initialize()
    
    print("✅ MCP SaaS iniciado correctamente")


@app.on_event("shutdown")
async def shutdown_event():
    """Limpiar recursos al cerrar la aplicación"""
    global mcp_server, bot_manager, simulador_logistica
    
    if mcp_server:
        await mcp_server.shutdown()
    if bot_manager:
        await bot_manager.shutdown()
    if simulador_logistica:
        await simulador_logistica.shutdown()


@app.get("/")
async def root():
    """Endpoint raíz"""
    return {
        "message": "MCP SaaS para PYMEs Españolas",
        "version": "1.0.0",
        "modules": ["bot_sector", "logistica"]
    }


@app.get("/health")
async def health_check():
    """Verificación de salud del sistema"""
    return {
        "status": "healthy",
        "mcp_server": mcp_server is not None,
        "bot_manager": bot_manager is not None,
        "simulador_logistica": simulador_logistica is not None
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )

