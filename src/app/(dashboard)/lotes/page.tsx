"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { lotes, campanas, parcelas } from "@/lib/mock-data"
import { formatDate, formatNumber } from "@/lib/utils"
import { CheckCircle2, Package, QrCode, Download } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"

export default function LotesPage() {
  const [selectedLote, setSelectedLote] = useState(lotes[0])

  const eventosChart = [
    { tipo: "Tratamientos", cantidad: selectedLote.eventosVinculados.tratamientos },
    { tipo: "Riegos", cantidad: selectedLote.eventosVinculados.riegos },
    { tipo: "Podas", cantidad: selectedLote.eventosVinculados.podas },
  ]

  const estadoColor =
    selectedLote.estadoFitosanitario === "Óptimo"
      ? "text-emerald-700"
      : selectedLote.estadoFitosanitario === "Bueno"
        ? "text-sky-700"
        : "text-amber-700"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
            Generación de Lote Oleícola
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Crea lotes trazables con certificado digital verificable
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
          <Select>
            <SelectTrigger className="max-w-[150px]">
              <SelectValue placeholder="Todas las Parcelas" />
            </SelectTrigger>
            <SelectContent>
              {parcelas.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lote selector — mobile: select nativo / desktop: pills */}
      <div className="lg:hidden flex flex-col gap-2">
        <select
          value={selectedLote.id}
          onChange={(e) => {
            const found = lotes.find((l) => l.id === e.target.value)
            if (found) setSelectedLote(found)
          }}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-trace-300"
        >
          {lotes.map((l) => (
            <option key={l.id} value={l.id}>
              Lote {l.id} — {l.parcelaNombre}
            </option>
          ))}
        </select>
        <button className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all w-full">
          + Nuevo Lote
        </button>
      </div>

      <div className="hidden lg:flex gap-3">
        {lotes.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelectedLote(l)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${selectedLote.id === l.id
              ? "border-trace-300 bg-trace-50 text-trace-700 shadow-sm"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
          >
            <Package size={14} />
            Lote {l.id}
          </button>
        ))}
        <button className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all whitespace-nowrap">
          + Nuevo Lote
        </button>
      </div>

      {/* Lote detail card */}
      <div className="rounded-xl border bg-white p-5">

        {/* Card header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Lote {selectedLote.id}</h2>
          <p className="text-sm text-gray-500 mt-0.5">Campaña {selectedLote.campana}</p>
        </div>

        {/* 2×2 grid: filas comparten altura automáticamente */}
        <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">

          {/* ── [1,1] Datos del Lote ── */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Datos del Lote
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Parcela</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{selectedLote.parcelaNombre}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Fecha de Cosecha</p>
                <p className="text-sm font-semibold text-gray-900">{formatDate(selectedLote.fechaCosecha)}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Método de Recolección</p>
                <p className="text-sm font-semibold text-gray-900">{selectedLote.metodoRecoleccion}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Volumen Estimado</p>
                <p className="text-sm font-semibold text-gray-900">{formatNumber(selectedLote.volumenEstimado)} kg</p>
              </div>
            </div>
          </div>

          {/* ── [1,2] Certificado Digital ── */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Certificado Digital
            </p>
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-5 flex-1 flex items-center">
              <div className="flex gap-5 items-center w-full">
                <div className="flex-shrink-0 w-[80px] h-[80px] rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm">
                  <QrCode size={62} className="text-gray-500" />
                </div>
                <div className="text-xs text-gray-600 flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm mb-2">{selectedLote.id} · Campaña {selectedLote.campana}</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    <p><span className="font-medium">Origen:</span> {selectedLote.parcelaNombre}</p>
                    <p><span className="font-medium">Cosecha:</span> {formatDate(selectedLote.fechaCosecha)}</p>
                    <p><span className="font-medium">Variedad:</span> {selectedLote.variedad}</p>
                    <p><span className="font-medium">Volumen:</span> {formatNumber(selectedLote.volumenEstimado)} kg</p>
                    <p><span className="font-medium">Aceite:</span> {formatNumber(selectedLote.litrosAceite)} L</p>
                  </div>
                  <p className="text-[10px] text-gray-400 truncate mt-1.5">Key: {selectedLote.certificadoId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Separador de fila ── */}
          <div className="hidden lg:block lg:col-span-2 border-t border-gray-100" />

          {/* ── [2,1] Producción y Calidad ── */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Producción y Calidad
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Variedad</p>
                <p className="text-sm font-semibold text-gray-900">{selectedLote.variedad}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Categoría</p>
                <p className="text-sm font-semibold text-gray-900">{selectedLote.categoriaCalidad}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Rendimiento Graso</p>
                <p className="text-sm font-semibold text-gray-900">{selectedLote.rendimientoGraso}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Acidez Libre</p>
                <p className="text-sm font-semibold text-gray-900">{selectedLote.acidezLibre}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Aceite Estimado</p>
                <p className="text-sm font-semibold text-gray-900">{formatNumber(selectedLote.litrosAceite)} L</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                <p className="text-[11px] text-gray-400 mb-1">Estado Fitosanitario</p>
                <p className={`text-sm font-semibold ${estadoColor}`}>{selectedLote.estadoFitosanitario}</p>
              </div>
            </div>
          </div>

          {/* ── [2,2] Actividad Vinculada ── */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Actividad Vinculada al Lote
            </p>
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[140px] lg:h-[190px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eventosChart} margin={{ top: 14, right: 4, left: -10, bottom: -15 }}>
                      <XAxis dataKey="tipo" tick={{ fontSize: 9 }} stroke="#d1d5db" />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                      <Bar dataKey="cantidad" radius={[3, 3, 0, 0]}>
                        <LabelList dataKey="cantidad" position="top" style={{ fontSize: 10, fill: "#374151", fontWeight: 600 }} />
                        {eventosChart.map((_, i) => (
                          <Cell key={i} fill={["#1c611f", "#2d8f2d", "#55b455"][i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">Insumos Clave</p>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left pb-1.5 font-medium text-gray-400">Producto</th>
                        <th className="text-right pb-1.5 font-medium text-gray-400">Cant.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLote.insumosClaveResumen.map((item) => (
                        <tr key={item.producto} className="border-b border-gray-100 last:border-0">
                          <td className="py-1.5 text-gray-700 truncate max-w-[80px]">{item.producto}</td>
                          <td className="py-1.5 text-right font-semibold text-gray-900">{item.cantidadTotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Footer: Trazabilidad + Exportar ── */}
        <div className="mt-6 border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {selectedLote.trazabilidadCompleta && (
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-trace-50">
                <CheckCircle2 size={18} className="text-trace-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-trace-800">Trazabilidad Completa</p>
                <p className="text-xs text-trace-500 mt-0.5">Todos los eventos verificados y vinculados al lote</p>
              </div>
            </div>
          )}
          <Button className="w-full sm:w-auto h-11 px-8 text-sm font-semibold uppercase tracking-wide flex-shrink-0">
            <Download size={16} className="mr-2" />
            Exportar Lote a Almazara
          </Button>
        </div>

      </div>
    </div>
  )
}
