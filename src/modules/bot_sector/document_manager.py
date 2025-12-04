"""
Gestor de documentos
Genera y envía documentos automáticamente (presupuestos, contratos, etc.)
"""

import os
from typing import Optional, Dict
from datetime import datetime
from .bot_manager import Sector


class DocumentManager:
    """
    Gestor de documentos por sector.
    Genera y gestiona documentos como presupuestos, contratos, facturas.
    """
    
    def __init__(self, sector: Sector):
        self.sector = sector
        self.documents_dir = f"documents/{sector.value}"
        self.documents: Dict[str, Dict] = {}
        self.initialized = False
    
    async def initialize(self):
        """Inicializar gestor de documentos"""
        # Crear directorio si no existe
        os.makedirs(self.documents_dir, exist_ok=True)
        
        self.initialized = True
        print(f"✅ DocumentManager {self.sector.value} inicializado")
    
    async def generate_quote(
        self,
        client_name: str,
        items: list,
        total: float,
        valid_until: datetime
    ) -> str:
        """Generar presupuesto"""
        quote_id = f"quote_{datetime.now().timestamp()}"
        
        quote_content = f"""
        PRESUPUESTO - {self.sector.value.upper()}
        ======================================
        
        Cliente: {client_name}
        Fecha: {datetime.now().strftime('%d/%m/%Y')}
        Válido hasta: {valid_until.strftime('%d/%m/%Y')}
        
        Items:
        """
        
        for item in items:
            quote_content += f"\n- {item.get('description', '')}: {item.get('price', 0)}€"
        
        quote_content += f"\n\nTOTAL: {total}€"
        
        # Guardar documento
        file_path = os.path.join(self.documents_dir, f"{quote_id}.txt")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(quote_content)
        
        self.documents[quote_id] = {
            "type": "quote",
            "client": client_name,
            "file_path": file_path,
            "created_at": datetime.now()
        }
        
        return file_path
    
    async def generate_contract(
        self,
        client_name: str,
        contract_type: str,
        terms: Dict
    ) -> str:
        """Generar contrato"""
        contract_id = f"contract_{datetime.now().timestamp()}"
        
        contract_content = f"""
        CONTRATO - {contract_type.upper()}
        ===================================
        
        Cliente: {client_name}
        Fecha: {datetime.now().strftime('%d/%m/%Y')}
        Sector: {self.sector.value}
        
        Términos:
        """
        
        for key, value in terms.items():
            contract_content += f"\n{key}: {value}"
        
        # Guardar documento
        file_path = os.path.join(self.documents_dir, f"{contract_id}.txt")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(contract_content)
        
        self.documents[contract_id] = {
            "type": "contract",
            "client": client_name,
            "file_path": file_path,
            "created_at": datetime.now()
        }
        
        return file_path
    
    async def get_document(self, document_id: str) -> Optional[str]:
        """Obtener ruta de un documento"""
        if document_id in self.documents:
            return self.documents[document_id]["file_path"]
        return None
    
    async def shutdown(self):
        """Cerrar gestor de documentos"""
        self.initialized = False

