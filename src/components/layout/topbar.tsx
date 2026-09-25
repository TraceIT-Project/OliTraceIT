"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Bell, HelpCircle, AlertTriangle, CheckCircle, Info, X, Menu,
  Home, LayoutGrid, Edit3, FileText, Package, BarChart3, User,
  BookOpen, MessageCircle, ExternalLink, Headset,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar-context"
import { SupportModal } from "@/components/layout/support-modal"
import { NotificationsModal } from "@/components/layout/notifications-modal"

const notifications = [
  {
    id: 1,
    type: "warning" as const,
    title: "Plazo de seguridad próximo a vencer",
    desc: "Dimetoato 40 EC · Parcela 1 - Finca El Olivar",
    time: "Hace 2 horas",
    read: false,
  },
  {
    id: 2,
    type: "success" as const,
    title: "Lote certificado con QR",
    desc: "T-2026-001 · Trazabilidad completa generada",
    time: "Ayer, 15:30",
    read: false,
  },
  {
    id: 3,
    type: "info" as const,
    title: "Campaña 2026 activa",
    desc: "18.500 kg acumulados · Rendimiento 23,2%",
    time: "Hace 2 días",
    read: true,
  },
  {
    id: 4,
    type: "warning" as const,
    title: "Riego no registrado",
    desc: "Parcela 4 - Valle del Guadalquivir · 8 días sin riego",
    time: "Hace 3 días",
    read: true,
  },
]

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    border: "border-l-amber-400",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-trace-50",
    iconColor: "text-trace-600",
    border: "border-l-trace-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    border: "border-l-blue-400",
  },
}

const helpSections = [
  {
    icon: Home,
    color: "text-trace-600",
    bg: "bg-trace-50",
    title: "Inicio",
    desc: "Visión global de tu explotación: parcelas activas, actividades recientes, lotes y producción acumulada de la campaña en curso.",
  },
  {
    icon: LayoutGrid,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Parcelas",
    desc: "Identidad digital de cada parcela: historial agronómico, línea temporal de eventos, indicadores NDVI y evolución productiva interanual.",
  },
  {
    icon: Edit3,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "Actividades",
    desc: "Registra tratamientos fitosanitarios, riegos, podas y fertilizaciones. Cada registro queda vinculado a una parcela y campaña.",
  },
  {
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "Campañas",
    desc: "Sigue la evolución climática, el NDVI y el rendimiento estimado por campaña oleícola. Filtra por año para comparar datos históricos.",
  },
  {
    icon: Package,
    color: "text-sky-600",
    bg: "bg-sky-50",
    title: "Lotes",
    desc: "Genera lotes de aceite con trazabilidad completa. Cada lote incluye origen, variedad, fecha de cosecha y certificación QR.",
  },
  {
    icon: BarChart3,
    color: "text-rose-600",
    bg: "bg-rose-50",
    title: "Almazara",
    desc: "Panel para la almazara cooperativa: recepción por agricultor, rendimiento graso, predicción de volumen y distribución geográfica.",
  },
  {
    icon: User,
    color: "text-gray-600",
    bg: "bg-gray-100",
    title: "Mi Perfil",
    desc: "Gestiona tus datos personales, tu explotación y las credenciales de acceso. Aquí también encontrarás el resumen de tu cuenta.",
  },
]

export function TopBar() {
  const [notifOpen, setNotifOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [notifs, setNotifs] = useState(notifications)
  const panelRef = useRef<HTMLDivElement>(null)
  const helpRef = useRef<HTMLDivElement>(null)
  const { toggleMobile } = useSidebar()

  const unreadCount = notifs.filter((n) => !n.read).length

  useEffect(() => {
    if (!notifOpen && !helpOpen) return
    function handleOutside(e: MouseEvent) {
      if (notifOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (helpOpen && helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setHelpOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [notifOpen, helpOpen])

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: number) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white/80 backdrop-blur-sm px-4 lg:px-6 gap-3">
      {/* Hamburger — mobile only */}
      <button
        onClick={toggleMobile}
        className="lg:hidden rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      >
        <Menu size={20} />
      </button>

      <div className="flex flex-1 items-center justify-end gap-3">

        {/* Help button + panel */}
        <div className="relative" ref={helpRef}>
          <button
            onClick={() => { setHelpOpen((o) => !o); setNotifOpen(false) }}
            className={cn(
              "rounded-full p-2 transition-colors",
              helpOpen
                ? "bg-gray-100 text-gray-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            )}
          >
            <HelpCircle size={20} />
          </button>

          <AnimatePresence>
            {helpOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed left-4 right-4 top-[4.5rem] sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[340px] rounded-xl border border-gray-100 bg-white shadow-2xl z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-trace-50">
                      <BookOpen size={13} className="text-trace-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Centro de Ayuda</span>
                  </div>
                  <button
                    onClick={() => setHelpOpen(false)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Intro */}
                <div className="px-4 py-3 bg-trace-50/40 border-b border-gray-100">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-semibold text-trace-700">TRACE IT</span> es tu plataforma de trazabilidad oleícola. Gestiona parcelas, registra actividades y genera lotes con certificación digital completa.
                  </p>
                </div>

                {/* Modules */}
                <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-50">
                  {helpSections.map((s) => {
                    const Icon = s.icon
                    return (
                      <div key={s.title} className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg mt-0.5", s.bg)}>
                          <Icon size={14} className={s.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{s.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-3">
                  <button
                    onClick={() => { setHelpOpen(false); setSupportOpen(true) }}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <MessageCircle size={13} />
                    Contactar soporte
                  </button>
                  <button className="flex items-center gap-1 text-xs font-medium text-trace-600 hover:text-trace-700 transition-colors">
                    Documentación completa
                    <ExternalLink size={11} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support button */}
        <button
          onClick={() => { setSupportOpen(true); setHelpOpen(false); setNotifOpen(false) }}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          title="Contactar soporte"
        >
          <Headset size={20} />
        </button>

        {/* Bell button + dropdown */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => { setNotifOpen((o) => !o); setHelpOpen(false) }}
            className={cn(
              "relative rounded-full p-2 transition-colors",
              notifOpen
                ? "bg-gray-100 text-gray-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            )}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed left-4 right-4 top-[4.5rem] sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 rounded-xl border border-gray-100 bg-white shadow-2xl z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Notificaciones</span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-600">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="rounded px-2 py-1 text-xs font-medium text-trace-600 hover:bg-trace-50 transition-colors"
                      >
                        Marcar leídas
                      </button>
                    )}
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Notification list */}
                <div className="max-h-[340px] divide-y divide-gray-50 overflow-y-auto">
                  {notifs.map((n) => {
                    const cfg = typeConfig[n.type]
                    const Icon = cfg.icon
                    return (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={cn(
                          "flex cursor-pointer gap-3 border-l-2 px-4 py-3.5 transition-colors",
                          cfg.border,
                          n.read ? "bg-white hover:bg-gray-50" : "bg-gray-50/70 hover:bg-gray-50"
                        )}
                      >
                        <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full", cfg.bg)}>
                          <Icon size={14} className={cfg.iconColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm leading-snug", n.read ? "font-normal text-gray-500" : "font-medium text-gray-900")}>
                            {n.title}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-gray-400">{n.desc}</p>
                          <p className="mt-1 text-[11px] text-gray-300">{n.time}</p>
                        </div>
                        {!n.read && (
                          <div className="mt-2 flex-shrink-0">
                            <span className="block h-1.5 w-1.5 rounded-full bg-blue-500" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-4 py-2.5 text-center">
                  <button
                    onClick={() => { setNotifOpen(false); setHistoryOpen(true) }}
                    className="text-xs font-medium text-trace-600 hover:text-trace-700 transition-colors"
                  >
                    Ver historial completo →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User pill */}
        <Link
          href="/perfil"
          className="ml-2 flex items-center gap-2 rounded-full bg-gray-100 py-1.5 pl-1.5 pr-1.5 sm:pr-3 hover:bg-gray-200 transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-trace-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            AL
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">Antonio López</span>
        </Link>
      </div>

      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
      <NotificationsModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
    </header>
  )
}
