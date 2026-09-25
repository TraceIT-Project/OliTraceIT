"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  actividades, parcelas, tiposActividad, productosFrecuentes,
  actividadesPorTipo,
} from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import {
  CheckCircle2, Smartphone,
  Shield, Droplets, Scissors, Sprout, Bug
} from "lucide-react"
import {
  BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts"

const iconMap: Record<string, any> = {
  "Tratamiento Fitosanitario": Shield,
  "Riego": Droplets,
  "Poda": Scissors,
  "Fertilización": Sprout,
  "Cosecha": Sprout,
  "Control de Plagas": Bug,
}

export default function ActividadesPage() {
  const [tipoActividad, setTipoActividad] = useState("Tratamiento Fitosanitario")
  const [fecha, setFecha] = useState("2026-02-25")
  const [parcelasSeleccionadas, setParcelasSeleccionadas] = useState(["P-001"])
  const [producto, setProducto] = useState("Dimetoato 40 EC")
  const [dosis, setDosis] = useState("1,5")
  const [plazoSeguridad, setPlazoSeguridad] = useState("7")

  const toggleParcela = (id: string) => {
    setParcelasSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
            Registro de Actividad Oleícola
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Registra tratamientos, riegos, podas y demás actividades de tus parcelas
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,1fr] gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Registro de Actividad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Tipo actividad */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tipo de Actividad</label>
              <select
                value={tipoActividad}
                onChange={(e) => setTipoActividad(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-300"
              >
                {tiposActividad.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Fecha</label>
              <div className="relative">
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-300"
                />
              </div>
            </div>

            {/* Parcelas */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Parcela(s) Afectada(s)</label>
              <div className="space-y-2">
                {parcelas.map((p) => (
                  <label key={p.id} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={parcelasSeleccionadas.includes(p.id)}
                      onChange={() => toggleParcela(p.id)}
                      className="h-4 w-4 rounded border-gray-300 text-trace-600 focus:ring-trace-500"
                    />
                    <span className="text-sm text-gray-700">{p.nombre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Producto */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Producto Aplicado</label>
              <div className="relative">
                <select
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-300 appearance-none"
                >
                  {productosFrecuentes.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <CheckCircle2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-trace-500" />
              </div>
            </div>

            {/* Dosis */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Dosis</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={dosis}
                  onChange={(e) => setDosis(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-300"
                />
                <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                  L/ha
                </div>
              </div>
            </div>

            {/* Plazo seguridad */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Plazo de Seguridad</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={plazoSeguridad}
                  onChange={(e) => setPlazoSeguridad(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-300"
                />
                <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                  días
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <Button className="w-full h-11 text-sm font-semibold uppercase tracking-wide">
                Guardar Registro
              </Button>
              <Button variant="outline" className="w-full h-11 text-sm font-semibold uppercase tracking-wide border-trace-200 text-trace-700 hover:bg-trace-50">
                <Smartphone size={16} className="mr-2" />
                Cargar desde Móvil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Stats + Recent */}
        <div className="space-y-6">
          {/* Resumen campaña */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Campaña en Curso (2026)</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Actividades por Tipo</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={actividadesPorTipo} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="tipo" tick={{ fontSize: 10 }} stroke="#999" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
                  <Bar dataKey="cantidad" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="cantidad" position="top" style={{ fontSize: 11, fill: "#374151", fontWeight: 600 }} />
                    {actividadesPorTipo.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "#1c611f" : i === 1 ? "#2d8f2d" : i === 2 ? "#55b455" : "#b9e5b9"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Actividades recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Actividades Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actividades.slice(0, 5).map((a) => {
                  const Icon = iconMap[a.tipo] || Shield
                  return (
                    <div key={a.id} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border text-trace-600 flex-shrink-0">
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{formatDate(a.fecha)}</span> - {a.tipo}
                          {a.producto ? ` (${a.producto})` : ""}
                          {a.dosis ? ` - ${a.dosis.toLocaleString('es-ES')} ${a.unidad}` : ""}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{a.parcelaNombre}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
