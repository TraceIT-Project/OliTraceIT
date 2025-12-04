"""
Servidor MCP (Model Context Protocol)
Gestiona la comunicación y contexto entre módulos
"""

import asyncio
from typing import Dict, List, Optional, Any
from langchain.memory import ConversationBufferMemory


class MCPServer:
    """
    Servidor MCP que gestiona el contexto y comunicación entre módulos.
    Inspirado en arquitecturas MCP como Open-WebUI y LangChain.
    """
    
    def __init__(self):
        self.memory: Optional[ConversationBufferMemory] = None
        self.context_store: Dict[str, Any] = {}
        self.initialized = False
    
    async def initialize(self):
        """Inicializar el servidor MCP"""
        self.memory = ConversationBufferMemory(
            return_messages=True,
            memory_key="chat_history"
        )
        self.initialized = True
        print("✅ Servidor MCP inicializado")
    
    async def add_context(self, key: str, value: Any):
        """Añadir contexto al almacén"""
        self.context_store[key] = value
    
    async def get_context(self, key: str) -> Optional[Any]:
        """Obtener contexto del almacén"""
        return self.context_store.get(key)
    
    async def clear_context(self, key: Optional[str] = None):
        """Limpiar contexto"""
        if key:
            self.context_store.pop(key, None)
        else:
            self.context_store.clear()
    
    async def shutdown(self):
        """Cerrar servidor MCP"""
        self.memory = None
        self.context_store.clear()
        self.initialized = False
        print("✅ Servidor MCP cerrado")

