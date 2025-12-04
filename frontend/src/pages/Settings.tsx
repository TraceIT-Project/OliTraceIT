import { useState } from 'react'
import { Save, Key, Database, MessageSquare } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    openai_api_key: '',
    qdrant_host: 'localhost',
    qdrant_port: '6333',
    whatsapp_enabled: false,
  })

  const handleSave = () => {
    // Guardar configuración
    alert('Configuración guardada')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Configuración
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gestiona la configuración del sistema
        </p>
      </div>

      {/* API Keys */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Key className="w-5 h-5 mr-2 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            API Keys
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={settings.openai_api_key}
              onChange={(e) =>
                setSettings({ ...settings, openai_api_key: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="sk-..."
            />
          </div>
        </div>
      </div>

      {/* Database */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Database className="w-5 h-5 mr-2 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Base de Datos
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Qdrant Host
            </label>
            <input
              type="text"
              value={settings.qdrant_host}
              onChange={(e) =>
                setSettings({ ...settings, qdrant_host: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Qdrant Port
            </label>
            <input
              type="number"
              value={settings.qdrant_port}
              onChange={(e) =>
                setSettings({ ...settings, qdrant_port: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              WhatsApp
            </h2>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.whatsapp_enabled}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp_enabled: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
          </label>
        </div>
        {settings.whatsapp_enabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twilio Account SID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="AC..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twilio Auth Token
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          Guardar Configuración
        </button>
      </div>
    </div>
  )
}

