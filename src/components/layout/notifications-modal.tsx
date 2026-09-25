"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, AlertTriangle, CheckCircle, Info, Bell, Filter } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

type NotifType = "warning" | "success" | "info"
type FilterType = "all" | NotifType

interface Notification {
  id: number
  type: NotifType
  title: string
  desc: string
  time: string
  date: string
  read: boolean
}

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-500 dark:text-amber-400",
    border: "border-l-amber-400",
    label: "Aviso",
    labelBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-trace-50 dark:bg-trace-950/30",
    iconColor: "text-trace-600 dark:text-trace-400",
    border: "border-l-trace-500",
    label: "Completado",
    labelBg: "bg-trace-100 dark:bg-trace-900/40 text-trace-700 dark:text-trace-300",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-500 dark:text-blue-400",
    border: "border-l-blue-400",
    label: "Info",
    labelBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  },
}

const allNotifications: Notification[] = [
  {
    id: 1,
    type: "warning",
    title: "Plazo de seguridad próximo a vencer",
    desc: "Dimetoato 40 EC · Parcela 1 - Finca El Olivar · Vence en 48 horas",
    time: "Hace 2 horas",
    date: "Hoy",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Lote certificado con QR",
    desc: "T-2026-001 · Trazabilidad completa generada · Picual Extra Virgen",
    time: "Ayer, 15:30",
    date: "Hoy",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Campaña 2026 activa",
    desc: "18.500 kg acumulados · Rendimiento 23,2% · 4 parcelas contribuyendo",
    time: "Hace 2 días",
    date: "Esta semana",
    read: true,
  },
  {
    id: 4,
    type: "warning",
    title: "Riego no registrado",
    desc: "Parcela 4 - Valle del Guadalquivir · 8 días sin registro de riego",
    time: "Hace 3 días",
    date: "Esta semana",
    read: true,
  },
  {
    id: 5,
    type: "success",
    title: "Actividad registrada correctamente",
    desc: "Tratamiento fitosanitario · Cobre 50% · Parcela 2 - Sierra Norte",
    time: "Hace 4 días",
    date: "Esta semana",
    read: true,
  },
  {
    id: 6,
    type: "info",
    title: "Nuevo informe NDVI disponible",
    desc: "Índice de vegetación actualizado para las 4 parcelas activas",
    time: "Hace 5 días",
    date: "Esta semana",
    read: true,
  },
  {
    id: 7,
    type: "warning",
    title: "Certificado fitosanitario por caducar",
    desc: "Licencia de aplicador · Vence el 15/04/2026 · Renovar antes de esa fecha",
    time: "Hace 1 semana",
    date: "Anteriores",
    read: true,
  },
  {
    id: 8,
    type: "success",
    title: "Lote T-2025-047 exportado",
    desc: "PDF de trazabilidad generado · Enviado a Cooperativa San Isidro",
    time: "Hace 1 semana",
    date: "Anteriores",
    read: true,
  },
  {
    id: 9,
    type: "info",
    title: "Actualización de la plataforma",
    desc: "Trace IT v2.4 · Nuevo módulo de predicción de rendimiento disponible",
    time: "Hace 2 semanas",
    date: "Anteriores",
    read: true,
  },
  {
    id: 10,
    type: "success",
    title: "Parcela 3 añadida al sistema",
    desc: "Loma de los Alcores · 3,2 ha · Variedad Hojiblanca · SIGPAC verificado",
    time: "Hace 2 semanas",
    date: "Anteriores",
    read: true,
  },
  {
    id: 11,
    type: "warning",
    title: "Helada prevista esta semana",
    desc: "Alerta AEMET · Temperaturas bajo cero en Jaén · Revisar protección de parcelas",
    time: "Hace 3 semanas",
    date: "Anteriores",
    read: true,
  },
  {
    id: 12,
    type: "info",
    title: "Resumen mensual generado",
    desc: "Febrero 2026 · 12 actividades · 3 lotes · 4.200 kg procesados",
    time: "Hace 3 semanas",
    date: "Anteriores",
    read: true,
  },
]

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "warning", label: "Avisos" },
  { key: "success", label: "Completados" },
  { key: "info", label: "Info" },
]

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [mounted, setMounted] = useState(false)
  const [notifs, setNotifs] = useState(allNotifications)
  const [filter, setFilter] = useState<FilterType>("all")

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: number) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const filtered = filter === "all" ? notifs : notifs.filter((n) => n.type === filter)
  const unreadCount = notifs.filter((n) => !n.read).length

  // Group by date
  const groups: { label: string; items: Notification[] }[] = []
  for (const n of filtered) {
    const existing = groups.find((g) => g.label === n.date)
    if (existing) {
      existing.items.push(n)
    } else {
      groups.push({ label: n.date, items: [n] })
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-lg rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-trace-50 dark:bg-trace-950/30">
                      <Bell size={15} className="text-trace-600 dark:text-trace-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Historial de notificaciones</p>
                        {unreadCount > 0 && (
                          <span className="rounded-full bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 text-[10px] font-semibold text-red-600 dark:text-red-400">
                            {unreadCount} sin leer
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{notifs.length} notificaciones en total</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-trace-600 dark:text-trace-400 hover:bg-trace-50 dark:hover:bg-trace-950/30 transition-colors"
                      >
                        Marcar todas leídas
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="rounded-full p-1.5 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-1.5 px-5 py-3 border-b border-gray-100 dark:border-gray-800">
                  <Filter size={13} className="text-gray-400 dark:text-gray-500 mr-1" />
                  {filters.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                        filter === f.key
                          ? "bg-trace-50 dark:bg-trace-950/30 text-trace-700 dark:text-trace-300 border border-trace-200 dark:border-trace-800"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Notification list */}
                <div className="max-h-[420px] overflow-y-auto">
                  {groups.length === 0 ? (
                    <div className="py-12 text-center">
                      <Bell size={28} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                      <p className="text-sm text-gray-400 dark:text-gray-500">No hay notificaciones con este filtro</p>
                    </div>
                  ) : (
                    groups.map((group) => (
                      <div key={group.label}>
                        <div className="sticky top-0 bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur-sm px-5 py-1.5 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{group.label}</p>
                        </div>
                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                          {group.items.map((n) => {
                            const cfg = typeConfig[n.type]
                            const Icon = cfg.icon
                            return (
                              <div
                                key={n.id}
                                onClick={() => markRead(n.id)}
                                className={cn(
                                  "flex cursor-pointer gap-3 border-l-2 px-5 py-3.5 transition-colors",
                                  cfg.border,
                                  n.read
                                    ? "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    : "bg-gray-50/70 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800"
                                )}
                              >
                                <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full", cfg.bg)}>
                                  <Icon size={14} className={cfg.iconColor} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <p className={cn("text-sm leading-snug", n.read ? "font-normal text-gray-500 dark:text-gray-400" : "font-medium text-gray-900 dark:text-gray-100")}>
                                      {n.title}
                                    </p>
                                    {!n.read && (
                                      <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">{n.desc}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", cfg.labelBg)}>{cfg.label}</span>
                                    <span className="text-[11px] text-gray-300 dark:text-gray-600">{n.time}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-3 text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Mostrando {filtered.length} de {notifs.length} notificaciones
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
