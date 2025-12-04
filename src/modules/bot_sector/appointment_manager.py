"""
Gestor de citas y calendario
Gestiona reservas, recordatorios y disponibilidad
"""

from typing import List, Optional, Dict
from datetime import datetime, timedelta
from .bot_manager import Sector


class Appointment:
    """Representa una cita"""
    
    def __init__(
        self,
        id: str,
        client_name: str,
        client_phone: str,
        date_time: datetime,
        service_type: str,
        notes: Optional[str] = None
    ):
        self.id = id
        self.client_name = client_name
        self.client_phone = client_phone
        self.date_time = date_time
        self.service_type = service_type
        self.notes = notes


class AppointmentManager:
    """
    Gestor de citas y calendario por sector.
    Maneja reservas, disponibilidad y recordatorios.
    """
    
    def __init__(self, sector: Sector):
        self.sector = sector
        self.appointments: Dict[str, Appointment] = {}
        self.initialized = False
    
    async def initialize(self):
        """Inicializar gestor de citas"""
        self.initialized = True
        print(f"✅ AppointmentManager {self.sector.value} inicializado")
    
    async def create_appointment(
        self,
        client_name: str,
        client_phone: str,
        date_time: datetime,
        service_type: str,
        notes: Optional[str] = None
    ) -> Appointment:
        """Crear nueva cita"""
        appointment_id = f"{self.sector.value}_{datetime.now().timestamp()}"
        
        # Verificar disponibilidad
        if not await self.is_available(date_time):
            raise ValueError("Horario no disponible")
        
        appointment = Appointment(
            id=appointment_id,
            client_name=client_name,
            client_phone=client_phone,
            date_time=date_time,
            service_type=service_type,
            notes=notes
        )
        
        self.appointments[appointment_id] = appointment
        return appointment
    
    async def is_available(self, date_time: datetime) -> bool:
        """Verificar si un horario está disponible"""
        # Verificar que no haya otra cita en el mismo horario
        for appointment in self.appointments.values():
            time_diff = abs((appointment.date_time - date_time).total_seconds())
            if time_diff < 3600:  # 1 hora de diferencia mínima
                return False
        return True
    
    async def get_appointments(
        self,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None
    ) -> List[Appointment]:
        """Obtener citas en un rango de fechas"""
        appointments = list(self.appointments.values())
        
        if start_date:
            appointments = [a for a in appointments if a.date_time >= start_date]
        if end_date:
            appointments = [a for a in appointments if a.date_time <= end_date]
        
        return sorted(appointments, key=lambda x: x.date_time)
    
    async def cancel_appointment(self, appointment_id: str):
        """Cancelar una cita"""
        if appointment_id in self.appointments:
            del self.appointments[appointment_id]
    
    async def shutdown(self):
        """Cerrar gestor de citas"""
        self.initialized = False

