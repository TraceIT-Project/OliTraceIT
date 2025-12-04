"""
Seguimiento de leads y clientes potenciales
Gestiona el pipeline de ventas y seguimiento
"""

from typing import List, Optional, Dict
from datetime import datetime
from enum import Enum
from .bot_manager import Sector


class LeadStatus(Enum):
    """Estados de un lead"""
    NUEVO = "nuevo"
    CONTACTADO = "contactado"
    CALIFICADO = "calificado"
    PROPUESTA = "propuesta"
    NEGOCIACION = "negociacion"
    CERRADO = "cerrado"
    PERDIDO = "perdido"


class Lead:
    """Representa un lead o cliente potencial"""
    
    def __init__(
        self,
        id: str,
        name: str,
        phone: str,
        email: Optional[str] = None,
        source: Optional[str] = None,
        notes: Optional[str] = None
    ):
        self.id = id
        self.name = name
        self.phone = phone
        self.email = email
        self.source = source
        self.status = LeadStatus.NUEVO
        self.notes = notes
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.interactions: List[Dict] = []


class LeadTracker:
    """
    Sistema de seguimiento de leads.
    Gestiona el pipeline de ventas y conversiones.
    """
    
    def __init__(self, sector: Sector):
        self.sector = sector
        self.leads: Dict[str, Lead] = {}
        self.initialized = False
    
    async def initialize(self):
        """Inicializar tracker de leads"""
        self.initialized = True
        print(f"✅ LeadTracker {self.sector.value} inicializado")
    
    async def create_lead(
        self,
        name: str,
        phone: str,
        email: Optional[str] = None,
        source: Optional[str] = None,
        notes: Optional[str] = None
    ) -> Lead:
        """Crear nuevo lead"""
        lead_id = f"{self.sector.value}_lead_{datetime.now().timestamp()}"
        
        lead = Lead(
            id=lead_id,
            name=name,
            phone=phone,
            email=email,
            source=source,
            notes=notes
        )
        
        self.leads[lead_id] = lead
        return lead
    
    async def update_lead_status(self, lead_id: str, status: LeadStatus):
        """Actualizar estado de un lead"""
        if lead_id not in self.leads:
            raise ValueError(f"Lead {lead_id} no encontrado")
        
        self.leads[lead_id].status = status
        self.leads[lead_id].updated_at = datetime.now()
    
    async def add_interaction(self, lead_id: str, interaction_type: str, notes: str):
        """Añadir interacción a un lead"""
        if lead_id not in self.leads:
            raise ValueError(f"Lead {lead_id} no encontrado")
        
        self.leads[lead_id].interactions.append({
            "type": interaction_type,
            "notes": notes,
            "timestamp": datetime.now()
        })
        self.leads[lead_id].updated_at = datetime.now()
    
    async def get_leads_by_status(self, status: LeadStatus) -> List[Lead]:
        """Obtener leads por estado"""
        return [lead for lead in self.leads.values() if lead.status == status]
    
    async def get_lead(self, lead_id: str) -> Optional[Lead]:
        """Obtener lead por ID"""
        return self.leads.get(lead_id)
    
    async def shutdown(self):
        """Cerrar tracker de leads"""
        self.initialized = False

