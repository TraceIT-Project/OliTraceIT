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
  CheckCircle2, ChevronDown, Smartphone, Shield, Droplets, Scissors, Sprout, Bug, type LucideIcon,
} from "lucide-react"
import {
  BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts"

const iconMap: Record<string, LucideIcon> = {
  "Tratamiento Fitosanitario": Shield,
  "Riego": Droplets,
  "Poda": Scissors,
  "Fertilización": Sprout,
  "Cosecha": Sprout,
  "Control de Plagas": Bug,
}

const barColors = ["#1c611f", "#2d8f2d", "#55b455", "#b9e5b9"]

const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-trace-300 focus:outline-hidden focus:ring-2 focus:ring-trace-500/20"
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700"

export default function ActividadesPage() {
  const [tipoActividad, setTipoActividad] = useState("Tratamiento Fitosanitario")
  const [fecha, setFecha] = useState("2026-02-25")
  const [parcelasSeleccionadas, setParcelasSeleccionadas] = useState(["P-001"])
  const [producto, setProducto] = useState("Dimetoato 40 EC")
  const [dosis, setDosis] = useState("1,5")
  const [plazoSeguridad, setPlazoSeguridad] = useState("7")
  const [saved, setSaved] = useState(false)

  const toggleParcela = (id: string) => {
    setParcelasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Registro de Actividad Oleícola</h1>
        <p className="mt-1 text-sm text-gray-500">
          Registra tratamientos, riegos, podas y demás actividades de tus parcelas
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Registro de Actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="act-tipo" className={labelClass}>Tipo de Actividad</label>
                <select id="act-tipo" value={tipoActividad} onChange={(e) => setTipoActividad(e.target.value)} className={inputClass}>
                  {tiposActividad.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="act-fecha" className={labelClass}>Fecha</label>
                <input id="act-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className={inputClass} />
              </div>

              <fieldset>
                <legend className={labelClass}>Parcela(s) Afectada(s)</legend>
                <div className="space-y-2">
                  {parcelas.map((p) => (
                    <label key={p.id} className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={parcelasSeleccionadas.includes(p.id)}
                        onChange={() => toggleParcela(p.id)}
                        className="h-4 w-4 rounded-sm border-gray-300 accent-trace-600"
                      />
                      <span className="text-sm text-gray-700">{p.nombre}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="act-producto" className={labelClass}>Producto Aplicado</label>
                <div className="relative">
                  <select
                    id="act-producto"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    className={`${inputClass} appearance-none pr-9`}
                  >
                    {productosFrecuentes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="act-dosis" className={labelClass}>Dosis</label>
                  <div className="flex gap-2">
                    <input id="act-dosis" type="text" inputMode="decimal" value={dosis} onChange={(e) => setDosis(e.target.value)} className={`${inputClass} min-w-0 flex-1`} />
                    <span className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">L/ha</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="act-plazo" className={labelClass}>Plazo de Seguridad</label>
                  <div className="flex gap-2">
                    <input id="act-plazo" type="text" inputMode="numeric" value={plazoSeguridad} onChange={(e) => setPlazoSeguridad(e.target.value)} className={`${inputClass} min-w-0 flex-1`} />
                    <span className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">días</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button type="submit" className="h-11 w-full text-sm font-semibold uppercase tracking-wide">
                  Guardar Registro
                </Button>
                <Button type="button" variant="outline" className="h-11 w-full gap-2 border-trace-200 text-sm font-semibold uppercase tracking-wide text-trace-700 hover:bg-trace-50">
                  <Smartphone size={16} />
                  Cargar desde Móvil
                </Button>
              </div>
              {saved && (
                <p role="status" className="flex items-center justify-center gap-2 rounded-lg border border-trace-200 bg-trace-50 px-3 py-2 text-sm text-trace-700">
                  <CheckCircle2 size={16} /> Registro guardado correctamente
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Campaña en Curso (2026)</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="mb-3 text-sm font-semibold text-gray-700">Actividades por Tipo</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={actividadesPorTipo} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="tipo" tick={{ fontSize: 11 }} stroke="#999" interval={0} tickFormatter={(t: string) => t.split(" ")[0]} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                  <Bar dataKey="cantidad" name="Actividades" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="cantidad" position="top" style={{ fontSize: 11, fill: "#374151", fontWeight: 600 }} />
                    {actividadesPorTipo.map((a, i) => (
                      <Cell key={a.tipo} fill={barColors[i % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actividades Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actividades.slice(0, 5).map((a) => {
                  const Icon = iconMap[a.tipo] ?? Shield
                  return (
                    <div key={a.id} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-white text-trace-600">
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{formatDate(a.fecha)}</span> - {a.tipo}
                          {a.producto ? ` (${a.producto})` : ""}
                          {a.dosis ? ` - ${a.dosis.toLocaleString("es-ES")} ${a.unidad}` : ""}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">{a.parcelaNombre}</p>
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
