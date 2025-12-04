"""
Gestor de bots especializados por sector
Gestiona bots para abogados, clínicas, talleres, inmobiliarias, academias
"""

import os
import asyncio
from typing import Dict, Optional, List
from enum import Enum
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from .knowledge_base import KnowledgeBase
from .whatsapp_handler import WhatsAppHandler
from .appointment_manager import AppointmentManager
from .lead_tracker import LeadTracker
from .document_manager import DocumentManager


class Sector(Enum):
    """Sectores empresariales soportados"""
    ABOGADOS = "abogados"
    CLINICAS = "clinicas"
    TALLERES = "talleres"
    INMOBILIARIAS = "inmobiliarias"
    ACADEMIAS = "academias"


class BotManager:
    """
    Gestor principal de bots por sector.
    Inspirado en arquitecturas de agentes como LangChain y Vanna AI.
    """
    
    def __init__(self):
        self.bots: Dict[Sector, 'SectorBot'] = {}
        self.qdrant_client: Optional[QdrantClient] = None
        self.embeddings: Optional[OpenAIEmbeddings] = None
        self.llm: Optional[ChatOpenAI] = None
        self.initialized = False
    
    async def initialize(self):
        """Inicializar el gestor de bots"""
        # Inicializar Qdrant para almacenamiento vectorial
        self.qdrant_client = QdrantClient(
            host=os.getenv("QDRANT_HOST", "localhost"),
            port=int(os.getenv("QDRANT_PORT", 6333))
        )
        
        # Inicializar embeddings
        self.embeddings = OpenAIEmbeddings(
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        
        # Inicializar LLM
        self.llm = ChatOpenAI(
            temperature=0.7,
            model_name=os.getenv("LLM_MODEL", "gpt-4")
        )
        
        # Crear bots para cada sector
        for sector in Sector:
            self.bots[sector] = SectorBot(
                sector=sector,
                qdrant_client=self.qdrant_client,
                embeddings=self.embeddings,
                llm=self.llm
            )
            await self.bots[sector].initialize()
        
        self.initialized = True
        print(f"✅ BotManager inicializado con {len(self.bots)} sectores")
    
    async def get_bot(self, sector: Sector) -> 'SectorBot':
        """Obtener bot de un sector específico"""
        if sector not in self.bots:
            raise ValueError(f"Sector {sector} no disponible")
        return self.bots[sector]
    
    async def shutdown(self):
        """Cerrar gestor de bots"""
        for bot in self.bots.values():
            await bot.shutdown()
        self.bots.clear()
        self.initialized = False
        print("✅ BotManager cerrado")


class SectorBot:
    """Bot especializado para un sector específico"""
    
    def __init__(
        self,
        sector: Sector,
        qdrant_client: QdrantClient,
        embeddings: OpenAIEmbeddings,
        llm: ChatOpenAI
    ):
        self.sector = sector
        self.qdrant_client = qdrant_client
        self.embeddings = embeddings
        self.llm = llm
        
        self.knowledge_base: Optional[KnowledgeBase] = None
        self.whatsapp_handler: Optional[WhatsAppHandler] = None
        self.appointment_manager: Optional[AppointmentManager] = None
        self.lead_tracker: Optional[LeadTracker] = None
        self.document_manager: Optional[DocumentManager] = None
    
    async def initialize(self):
        """Inicializar componentes del bot"""
        # Inicializar base de conocimiento
        self.knowledge_base = KnowledgeBase(
            sector=self.sector,
            qdrant_client=self.qdrant_client,
            embeddings=self.embeddings
        )
        await self.knowledge_base.initialize()
        
        # Inicializar WhatsApp handler
        self.whatsapp_handler = WhatsAppHandler(
            sector=self.sector,
            llm=self.llm,
            knowledge_base=self.knowledge_base
        )
        await self.whatsapp_handler.initialize()
        
        # Inicializar gestor de citas
        self.appointment_manager = AppointmentManager(sector=self.sector)
        await self.appointment_manager.initialize()
        
        # Inicializar seguimiento de leads
        self.lead_tracker = LeadTracker(sector=self.sector)
        await self.lead_tracker.initialize()
        
        # Inicializar gestor de documentos
        self.document_manager = DocumentManager(sector=self.sector)
        await self.document_manager.initialize()
        
        print(f"✅ Bot {self.sector.value} inicializado")
    
    async def process_message(self, message: str, user_id: str) -> str:
        """Procesar mensaje del usuario"""
        # Obtener contexto relevante de la base de conocimiento
        context = await self.knowledge_base.search(message)
        
        # Generar respuesta usando LLM con contexto
        response = await self.llm.ainvoke(
            f"Contexto del sector {self.sector.value}:\n{context}\n\n"
            f"Usuario: {message}\n\n"
            f"Responde de manera profesional y útil:"
        )
        
        return response.content
    
    async def shutdown(self):
        """Cerrar bot"""
        if self.knowledge_base:
            await self.knowledge_base.shutdown()
        if self.whatsapp_handler:
            await self.whatsapp_handler.shutdown()
        if self.appointment_manager:
            await self.appointment_manager.shutdown()
        if self.lead_tracker:
            await self.lead_tracker.shutdown()
        if self.document_manager:
            await self.document_manager.shutdown()

