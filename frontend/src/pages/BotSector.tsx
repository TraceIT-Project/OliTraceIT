import { useState } from 'react'
import { Plus, MessageSquare, Calendar, FileText, Users } from 'lucide-react'

const sectors = [
  { id: 'abogados', name: 'Abogados', color: 'bg-blue-500' },
  { id: 'clinicas', name: 'Clínicas', color: 'bg-green-500' },
  { id: 'talleres', name: 'Talleres', color: 'bg-orange-500' },
  { id: 'inmobiliarias', name: 'Inmobiliarias', color: 'bg-purple-500' },
  { id: 'academias', name: 'Academias', color: 'bg-pink-500' },
]

export default function BotSector() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bot por Sector
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gestiona bots especializados para cada sector empresarial
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Bot
        </button>
      </div>

      {/* Sector Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            onClick={() => setSelectedSector(sector.id)}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 ${
              selectedSector === sector.id
                ? 'border-primary-500'
                : 'border-transparent'
            }`}
          >
            <div className={`${sector.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {sector.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Bot especializado para el sector de {sector.name.toLowerCase()}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>12 leads</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>5 citas</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bot Details */}
      {selectedSector && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Detalles del Bot - {sectors.find((s) => s.id === selectedSector)?.name}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Funcionalidades
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MessageSquare className="w-4 h-4 mr-2 text-primary-600" />
                  Respuestas en lenguaje natural
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                  Gestión de citas automática
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-2 text-primary-600" />
                  Seguimiento de leads
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FileText className="w-4 h-4 mr-2 text-primary-600" />
                  Generación de documentos
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mensajes procesados
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1,234
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Tasa de respuesta
                  </span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Leads generados
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    45
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

