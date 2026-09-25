"use client"

import { StatCard } from "@/components/ui/stat-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { overviewStats, actividades, lotes, parcelas } from "@/lib/mock-data"
import { formatDate, formatNumber } from "@/lib/utils"
import {
  LayoutGrid, Package, Activity, Award,
  ArrowRight, Calendar, MapPin
} from "lucide-react"
import Link from "next/link"
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts"

const produccionMensual = [
  { mes: "Sep", valor: 0 },
  { mes: "Oct", valor: 4200 },
  { mes: "Nov", valor: 8500 },
  { mes: "Dic", valor: 12000 },
  { mes: "Ene", valor: 15200 },
  { mes: "Feb", valor: 18500 },
]

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Panel General
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Resumen de tu explotación oleícola · Campaña 2026
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Parcelas Activas"
          value={overviewStats.totalParcelas}
          subtitle={`${overviewStats.superficieTotal.toLocaleString('es-ES')} ha totales`}
          icon={LayoutGrid}
          trend={{ value: "+1 esta campaña", positive: true }}
        />
        <StatCard
          title="Actividades Registradas"
          value={overviewStats.actividadesRegistradas}
          subtitle="Campaña 2026"
          icon={Activity}
          trend={{ value: "+12 este mes", positive: true }}
        />
        <StatCard
          title="Lotes Generados"
          value={overviewStats.lotesGenerados}
          subtitle="Con trazabilidad completa"
          icon={Package}
        />
        <StatCard
          title="Score Calidad Medio"
          value={`${overviewStats.scorePromedioCalidad}%`}
          subtitle="Completitud de datos"
          icon={Award}
          trend={{ value: "+3% vs campaña anterior", positive: true }}
        />
      </div>

      {/* Financial KPIs */}
      {/*
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50">
            <Euro size={14} className="text-emerald-600" />
          </div>
          <p className="text-sm font-semibold text-gray-700">Resumen Económico · Campaña 2026</p>
          <span className="text-xs text-gray-400 font-normal">(estimado a feb.)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Ingresos Estimados"
            value={formatCurrency(overviewStats.ingresosEstimados)}
            subtitle="Venta de aceite + subproductos"
            icon={TrendingUp}
            trend={{ value: "+12% vs campaña 2025", positive: true }}
          />
          <StatCard
            title="Costes de Producción"
            value={formatCurrency(overviewStats.costesProduccion)}
            subtitle="Insumos, mano de obra y riego"
            icon={TrendingDown}
            trend={{ value: "-3% vs campaña 2025", positive: true }}
          />
          <StatCard
            title="Beneficio Neto Estimado"
            value={formatCurrency(overviewStats.beneficioNeto)}
            subtitle="Ingresos menos costes totales"
            icon={Euro}
            trend={{ value: "+18% vs campaña 2025", positive: true }}
          />
          <StatCard
            title="Margen de Beneficio"
            value={`${overviewStats.margenPct.toLocaleString('es-ES')}%`}
            subtitle="Sobre ingresos estimados"
            icon={Percent}
            trend={{ value: "+3,1 pp vs campaña 2025", positive: true }}
          />
        </div>
      </div>
*/}
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Producción acumulada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Producción Acumulada (Campaña 2026)</span>
              <Badge variant="success">En curso</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={produccionMensual}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1c611f" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1c611f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="#999" />
                <YAxis tick={{ fontSize: 12 }} stroke="#999" tickFormatter={(v) => formatNumber(v)} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
                  formatter={(v: number) => [`${formatNumber(v)} kg`, "Producción"]}
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#1c611f"
                  strokeWidth={2}
                  fill="url(#colorProd)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Parcelas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Mis Parcelas</span>
              <Link href="/parcelas" className="text-sm text-trace-600 hover:text-trace-700 font-medium flex items-center gap-1">
                Ver todas <ArrowRight size={14} />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {parcelas.map((p) => (
                <Link
                  key={p.id}
                  href="/parcelas"
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-trace-50 text-trace-600">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{p.nombre}</p>
                      <p className="text-xs text-gray-500">{p.variedad} · {p.superficie.toLocaleString('es-ES')} ha</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-trace-700">{p.scoreCalidad}%</p>
                      <p className="text-[10px] text-gray-400">Calidad</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Lots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Actividades Recientes</span>
              <Link href="/actividades" className="text-sm text-trace-600 hover:text-trace-700 font-medium flex items-center gap-1">
                Ver todas <ArrowRight size={14} />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {actividades.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 flex-shrink-0 mt-0.5">
                    <Calendar size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{a.tipo}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {a.parcelaNombre}
                      {a.producto ? ` · ${a.producto}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(a.fecha)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Últimos Lotes</span>
              <Link href="/lotes" className="text-sm text-trace-600 hover:text-trace-700 font-medium flex items-center gap-1">
                Ver todos <ArrowRight size={14} />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lotes.map((l) => (
                <div key={l.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-trace-50 text-trace-600 flex-shrink-0 mt-0.5">
                    <Package size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{l.id}</p>
                      {l.trazabilidadCompleta && (
                        <Badge variant="success" className="text-[10px] py-0">Trazabilidad Completa</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {l.parcelaNombre} · {formatNumber(l.volumenEstimado)} kg
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(l.fechaCosecha)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
