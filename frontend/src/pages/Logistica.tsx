import { useState } from 'react'
import { Truck, Route, Fuel, TrendingUp, MapPin } from 'lucide-react'

export default function Logistica() {
  const [simulating, setSimulating] = useState(false)

  const handleSimulate = () => {
    setSimulating(true)
    // Simular proceso de optimización
    setTimeout(() => {
      setSimulating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Simulación Logística
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Optimiza rutas, predice demanda y analiza costos operativos
        </p>
      </div>

      {/* Simulation Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Nueva Simulación
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ubicaciones
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Latitud, Longitud&#10;40.4168, -3.7038&#10;41.3851, 2.1734"
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capacidad del Vehículo
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="1000 kg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Precio Combustible (€/L)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="1.50"
              />
            </div>
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {simulating ? 'Simulando...' : 'Optimizar Ruta'}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {!simulating && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Distancia Total
              </h3>
              <Route className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              245.8 km
            </p>
            <p className="text-xs text-green-600 mt-1">-12.3% vs anterior</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Consumo Combustible
              </h3>
              <Fuel className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              24.6 L
            </p>
            <p className="text-xs text-green-600 mt-1">Ahorro: 3.2 L</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Costo Total
              </h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              €36.90
            </p>
            <p className="text-xs text-green-600 mt-1">Ahorro: €4.80</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tiempo Estimado
              </h3>
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              4.9 h
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Velocidad: 50 km/h
            </p>
          </div>
        </div>
      )}

      {/* Demand Prediction */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Predicción de Demanda
        </h2>
        <div className="space-y-3">
          {[
            { date: '2025-01-05', demand: 45 },
            { date: '2025-01-06', demand: 52 },
            { date: '2025-01-07', demand: 38 },
            { date: '2025-01-08', demand: 61 },
            { date: '2025-01-09', demand: 55 },
          ].map((item) => (
            <div
              key={item.date}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.date}
              </span>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(item.demand / 100) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                  {item.demand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

