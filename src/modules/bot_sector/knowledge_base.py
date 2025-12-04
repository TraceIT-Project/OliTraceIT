"""
Base de conocimiento automática por sector
Utiliza procesamiento de documentos y almacenamiento vectorial
"""

import os
from typing import List, Optional
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from langchain_openai import OpenAIEmbeddings
from unstructured.partition.auto import partition
from modules.bot_sector.bot_manager import Sector


class KnowledgeBase:
    """
    Base de conocimiento automática que procesa documentos y los almacena
    en formato vectorial para búsqueda semántica.
    Inspirado en Unstructured para procesamiento y Qdrant para almacenamiento.
    """
    
    def __init__(
        self,
        sector: Sector,
        qdrant_client: QdrantClient,
        embeddings: OpenAIEmbeddings
    ):
        self.sector = sector
        self.qdrant_client = qdrant_client
        self.embeddings = embeddings
        self.collection_name = f"knowledge_{sector.value}"
        self.initialized = False
    
    async def initialize(self):
        """Inicializar colección en Qdrant"""
        # Crear colección si no existe
        try:
            self.qdrant_client.get_collection(self.collection_name)
        except Exception:
            self.qdrant_client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=1536,  # OpenAI embeddings dimension
                    distance=Distance.COSINE
                )
            )
        
        self.initialized = True
        print(f"✅ KnowledgeBase {self.sector.value} inicializada")
    
    async def add_document(self, file_path: str):
        """Añadir documento a la base de conocimiento"""
        # Procesar documento con Unstructured
        elements = partition(filename=file_path)
        
        # Extraer texto y metadatos
        texts = []
        for element in elements:
            if hasattr(element, 'text') and element.text:
                texts.append(element.text)
        
        # Generar embeddings y almacenar
        for idx, text in enumerate(texts):
            embedding = await self.embeddings.aembed_query(text)
            
            self.qdrant_client.upsert(
                collection_name=self.collection_name,
                points=[
                    PointStruct(
                        id=idx,
                        vector=embedding,
                        payload={
                            "text": text,
                            "sector": self.sector.value,
                            "source": file_path
                        }
                    )
                ]
            )
    
    async def search(self, query: str, limit: int = 5) -> str:
        """Buscar información relevante en la base de conocimiento"""
        # Generar embedding de la consulta
        query_embedding = await self.embeddings.aembed_query(query)
        
        # Buscar en Qdrant
        results = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=limit
        )
        
        # Combinar resultados
        context_parts = []
        for result in results:
            if result.payload and "text" in result.payload:
                context_parts.append(result.payload["text"])
        
        return "\n\n".join(context_parts)
    
    async def shutdown(self):
        """Cerrar base de conocimiento"""
        self.initialized = False

