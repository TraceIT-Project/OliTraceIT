export interface Parcela {
  id: string
  nombre: string
  ubicacion: string
  sigpac: string
  superficie: number
  variedad: string
  anoPlantacion: number
  lat: number
  lng: number
  scoreCalidad: number
  estado: string
}

export interface Actividad {
  id: string
  tipo: string
  fecha: string
  parcelaId: string
  parcelaNombre: string
  producto?: string
  dosis?: number
  unidad?: string
  plazoSeguridad?: number
  notas?: string
}

export interface Lote {
  id: string
  parcelaId: string
  parcelaNombre: string
  fechaCosecha: string
  metodoRecoleccion: string
  volumenEstimado: number
  trazabilidadCompleta: boolean
  campana: string
  certificadoId: string
  eventosVinculados: {
    tratamientos: number
    riegos: number
    podas: number
  }
  insumosClaveResumen: Array<{
    producto: string
    cantidadTotal: string
  }>
}
