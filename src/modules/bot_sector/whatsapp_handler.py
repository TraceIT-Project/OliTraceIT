"""
Manejador de WhatsApp Business API
Gestiona mensajes entrantes y salientes vía WhatsApp
"""

import os
from typing import Optional
from twilio.rest import Client as TwilioClient
from langchain_openai import ChatOpenAI
from .knowledge_base import KnowledgeBase
from .bot_manager import Sector


class WhatsAppHandler:
    """
    Manejador de WhatsApp usando Twilio Business API.
    Gestiona comunicación bidireccional con clientes.
    """
    
    def __init__(
        self,
        sector: Sector,
        llm: ChatOpenAI,
        knowledge_base: KnowledgeBase
    ):
        self.sector = sector
        self.llm = llm
        self.knowledge_base = knowledge_base
        self.twilio_client: Optional[TwilioClient] = None
        self.whatsapp_number = os.getenv("WHATSAPP_NUMBER")
        self.initialized = False
    
    async def initialize(self):
        """Inicializar cliente de Twilio"""
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        
        if account_sid and auth_token:
            self.twilio_client = TwilioClient(account_sid, auth_token)
            self.initialized = True
            print(f"✅ WhatsAppHandler {self.sector.value} inicializado")
        else:
            print("⚠️ WhatsApp no configurado (falta TWILIO_ACCOUNT_SID/AUTH_TOKEN)")
    
    async def send_message(self, to: str, message: str):
        """Enviar mensaje por WhatsApp"""
        if not self.twilio_client:
            raise ValueError("WhatsApp no inicializado")
        
        self.twilio_client.messages.create(
            body=message,
            from_=f"whatsapp:{self.whatsapp_number}",
            to=f"whatsapp:{to}"
        )
    
    async def process_incoming_message(self, from_number: str, message: str) -> str:
        """Procesar mensaje entrante y generar respuesta"""
        # Buscar contexto relevante
        context = await self.knowledge_base.search(message)
        
        # Generar respuesta usando LLM
        response = await self.llm.ainvoke(
            f"Eres un asistente especializado en {self.sector.value}.\n"
            f"Contexto relevante:\n{context}\n\n"
            f"Mensaje del cliente: {message}\n\n"
            f"Responde de manera profesional, amable y útil en español:"
        )
        
        return response.content
    
    async def shutdown(self):
        """Cerrar manejador de WhatsApp"""
        self.initialized = False

