"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { GaugeChart } from "@/components/charts/gauge-chart"
import { formatNumber } from "@/lib/utils"
import {
  rankingAgricultores, recepcionPorMes, rendimientoGrasoCampanas,
  lotesRecientes, campanas,
} from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts"

const trendIcons: Record<string, any> = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
}

const trendColors: Record<string, string> = {
  up: "text-emerald-600",
  down: "text-red-500",
  stable: "text-gray-400",
}

export default function AlmazaraPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
            Dashboard de Almazara - Inteligencia Operativa
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Análisis comparativo, predicciones y gestión de proveedores
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Filtro:</span>
          <Select defaultValue={campanas[0]?.id}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {campanas.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
        {/* Row 1: Section labels */}
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Ranking y Predicción
        </div>
        <div className="hidden lg:block text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Mapa y Comparativas
        </div>

        {/* Row 2: Ranking | Distribution — same height via grid row */}
        <Card>
          <CardHeader>
            <CardTitle>Ranking Dinámico de Agricultores (Top 5)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rankingAgricultores.map((a) => {
                const TrendIcon = trendIcons[a.tendencia]
                return (
                  <div
                    key={a.posicion}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-trace-50 text-xs font-bold text-trace-700">
                        {a.posicion}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {a.nombre}
                          <span className="ml-1.5 text-xs text-gray-400">({a.score.toLocaleString('es-ES')}/10)</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Vol: {a.volumen}, RG: {a.rendimientoGraso}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${trendColors[a.tendencia]}`}>
                        {a.variacion}
                      </span>
                      <TrendIcon size={16} className={trendColors[a.tendencia]} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Geographic distribution - Andalucía Map */}
        <Card>
            <CardHeader>
              <CardTitle>Distribución Geográfica de Proveedores y Lotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg h-[240px] relative overflow-hidden border bg-gradient-to-b from-blue-50/50 to-green-50/30">
                {/* SVG Map of Andalucía */}
                <svg viewBox="0 0 600 350" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Andalucía outline (simplified) */}
                  <path
                    d="M80,180 Q100,140 140,120 Q180,100 220,95 Q260,90 300,85 Q340,80 380,90 Q420,100 450,120 Q480,140 510,155 Q530,165 550,170 Q560,175 555,195 Q550,215 535,230 Q520,245 500,255 Q480,265 455,270 Q430,275 405,278 Q380,280 355,282 Q330,285 305,290 Q280,295 255,295 Q230,295 205,290 Q180,285 155,275 Q130,265 110,250 Q90,235 80,215 Q70,200 80,180Z"
                    fill="#e8f5e9"
                    stroke="#4caf50"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                  {/* Province borders */}
                  <path d="M220,95 L230,150 L200,200 L155,275" stroke="#a5d6a7" strokeWidth="0.7" fill="none" strokeDasharray="3,3" />
                  <path d="M300,85 L290,160 L305,290" stroke="#a5d6a7" strokeWidth="0.7" fill="none" strokeDasharray="3,3" />
                  <path d="M380,90 L370,170 L355,282" stroke="#a5d6a7" strokeWidth="0.7" fill="none" strokeDasharray="3,3" />
                  <path d="M140,120 L290,160 L510,155" stroke="#a5d6a7" strokeWidth="0.7" fill="none" strokeDasharray="3,3" />

                  {/* Province labels */}
                  <text x="130" y="180" fontSize="9" fill="#666" fontWeight="500">Huelva</text>
                  <text x="210" y="170" fontSize="9" fill="#666" fontWeight="500">Sevilla</text>
                  <text x="310" y="155" fontSize="9" fill="#666" fontWeight="500">Córdoba</text>
                  <text x="410" y="145" fontSize="9" fill="#666" fontWeight="500">Jaén</text>
                  <text x="480" y="195" fontSize="9" fill="#666" fontWeight="500">Granada</text>
                  <text x="240" y="270" fontSize="9" fill="#666" fontWeight="500">Cádiz</text>
                  <text x="340" y="265" fontSize="9" fill="#666" fontWeight="500">Málaga</text>
                  <text x="480" y="250" fontSize="9" fill="#666" fontWeight="500">Almería</text>

                  {/* Provider pins - positioned approximately on real Andalucía coords */}
                  {/* Finca El Olivar - Sevilla area */}
                  <circle cx="230" cy="195" r="8" fill="#1c611f" opacity="0.9" />
                  <circle cx="230" cy="195" r="12" fill="#1c611f" opacity="0.15" />
                  <text x="243" y="198" fontSize="7.5" fill="#1c611f" fontWeight="600">Finca El Olivar</text>

                  {/* Los Almendros - Écija area */}
                  <circle cx="270" cy="180" r="6" fill="#2d8f2d" opacity="0.9" />
                  <text x="280" y="183" fontSize="7" fill="#2d8f2d" fontWeight="500">Los Almendros</text>

                  {/* Valle del Guadalquivir - Baena, Córdoba */}
                  <circle cx="340" cy="170" r="8" fill="#1c611f" opacity="0.9" />
                  <circle cx="340" cy="170" r="12" fill="#1c611f" opacity="0.15" />
                  <text x="353" y="173" fontSize="7.5" fill="#1c611f" fontWeight="600">Valle Guadalquivir</text>

                  {/* Cerro Alto - Martos, Jaén */}
                  <circle cx="400" cy="155" r="5" fill="#66bb6a" opacity="0.9" />
                  <text x="408" y="158" fontSize="7" fill="#388e3c" fontWeight="500">Cerro Alto</text>

                  {/* Cooperativa La Unión - Jaén north */}
                  <circle cx="430" cy="125" r="8" fill="#1c611f" opacity="0.9" />
                  <circle cx="430" cy="125" r="12" fill="#1c611f" opacity="0.15" />
                  <text x="443" y="128" fontSize="7.5" fill="#1c611f" fontWeight="600">Coop. La Unión</text>

                  {/* AgroJaén */}
                  <circle cx="420" cy="140" r="6" fill="#2d8f2d" opacity="0.9" />

                  {/* Olivos del Sur - Córdoba/Málaga border */}
                  <circle cx="310" cy="215" r="6" fill="#2d8f2d" opacity="0.9" />
                  <text x="320" y="218" fontSize="7" fill="#2d8f2d" fontWeight="500">Olivos del Sur</text>

                  {/* Finca Los Pinos - Jaén east */}
                  <circle cx="380" cy="165" r="4" fill="#66bb6a" opacity="0.9" />
                </svg>

                {/* Legend overlay */}
                <div className="absolute top-3 right-3 bg-white/95 rounded-lg p-2.5 text-xs space-y-1 shadow-sm border backdrop-blur-sm">
                  <p className="font-semibold text-gray-700 mb-1">Volumen</p>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-trace-700" />
                    <span className="text-gray-600">{">"}50 t</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-trace-400" />
                    <span className="text-gray-600">10-50 t</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-trace-200" />
                    <span className="text-gray-600">{"<"}10 t</span>
                  </div>
                </div>

                {/* Map title */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-medium text-gray-600 border">
                  Andalucía · 8 proveedores activos
                </div>
              </div>

              {/* Recent lots */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Lotes Recientes Recibidos</h4>
                <div className="space-y-2">
                  {lotesRecientes.map((l) => (
                    <div key={l.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg bg-gray-50 px-3 py-2 text-xs">
                      <span className="font-medium text-gray-700">{l.id}</span>
                      <span className="text-gray-500">{l.agricultor}</span>
                      <span className="text-gray-500">{l.variedad}</span>
                      <span className="font-medium text-gray-900">{l.peso}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Row 3: Prediction | Rendimiento */}
        <Card>
          <CardHeader>
            <CardTitle>Predicción Agregada de Volumen de Campaña (2026)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-6 items-center">
              <div className="flex justify-center">
                <GaugeChart
                  value={150000}
                  max={200000}
                  label="150.000 t"
                  sublabel="Confianza 90%"
                  size="md"
                  color="#1c611f"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Recepción por Mes</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={recepcionPorMes} barGap={2} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="#999" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#999" width={40} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                      formatter={(v: number) => [formatNumber(v) + ' t', '']}
                    />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="estimado" name="Estimado" fill="#d1d5db" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="recibido" name="Recibido" fill="#1c611f" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparativa de Rendimiento Graso Medio (%) entre Campañas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={rendimientoGrasoCampanas} margin={{ top: 5, right: 15, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="#999" />
                <YAxis tick={{ fontSize: 11 }} stroke="#999" domain={[18, 26]} unit="%" width={35} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                  formatter={(v: number) => [v.toLocaleString('es-ES') + '%', '']}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="c2024" name="2024" stroke="#d1d5db" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="c2025" name="2025" stroke="#9ca3af" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="c2026" name="2026" stroke="#1c611f" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
