import { useEffect, useState } from 'react'
import { Bot, Truck, Users, Calendar, TrendingUp } from 'lucide-react'
import { api } from '../services/api'

interface DashboardStats {
  total_bots: number
  total_leads: number
  total_appointments: number
  routes_optimized: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // En producción, esto vendría de la API
    setTimeout(() => {
      setStats({
        total_bots: 5,
        total_leads: 127,
        total_appointments: 43,
        routes_optimized: 12,
      })
      setLoading(false)
    }, 500)
  }, [])

  const statCards = [
    {
      title: 'Bots Activos',
      value: stats?.total_bots || 0,
      icon: Bot,
      color: 'bg-blue-500',
      href: '/bot-sector',
    },
    {
      title: 'Leads Totales',
      value: stats?.total_leads || 0,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Citas Programadas',
      value: stats?.total_appointments || 0,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Rutas Optimizadas',
      value: stats?.routes_optimized || 0,
      icon: Truck,
      color: 'bg-orange-500',
      href: '/logistica',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Resumen general del sistema MCP SaaS
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.title}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Crear Bot Sector
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Configurar un nuevo bot especializado
                </p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Optimizar Ruta
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Simular y optimizar rutas logísticas
                </p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Ver Leads
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Gestionar clientes potenciales
                </p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

