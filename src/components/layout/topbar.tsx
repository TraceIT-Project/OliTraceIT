"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Bell, HelpCircle, X, Menu,
  Home, LayoutGrid, PenLine, FileText, Package, BarChart3, User,
  BookOpen, MessageCircle, Headset,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar-context"
import { notificaciones, userProfile } from "@/lib/mock-data"
import { SupportModal } from "@/components/layout/support-modal"
import { NotificationsModal, notificationStyles } from "@/components/layout/notifications-modal"

const PREVIEW_COUNT = 4

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
    icon: PenLine,
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

const panelClass = "fixed left-4 right-4 top-[4.5rem] z-50 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2"
const panelMotion = {
  initial: { opacity: 0, y: -6, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.97 },
  transition: { duration: 0.15, ease: "easeOut" as const },
}

export function TopBar() {
  const [notifOpen, setNotifOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [notifs, setNotifs] = useState(notificaciones)
  const panelRef = useRef<HTMLDivElement>(null)
  const helpRef = useRef<HTMLDivElement>(null)
  const { mobileOpen, toggleMobile } = useSidebar()

  const unreadCount = notifs.filter((n) => !n.read).length

  useEffect(() => {
    if (!notifOpen && !helpOpen) return
    function handleOutside(e: MouseEvent) {
      if (notifOpen && !panelRef.current?.contains(e.target as Node)) setNotifOpen(false)
      if (helpOpen && !helpRef.current?.contains(e.target as Node)) setHelpOpen(false)
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key !== "Escape") return
      setNotifOpen(false)
      setHelpOpen(false)
    }
    document.addEventListener("mousedown", handleOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [notifOpen, helpOpen])

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: number) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const iconButton = (active: boolean) => cn(
    "rounded-full p-2 transition-colors",
    active ? "bg-gray-100 text-gray-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-600"
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-white/80 px-4 backdrop-blur-xs lg:px-6">
      <button
        onClick={toggleMobile}
        aria-label="Abrir menú"
        aria-expanded={mobileOpen}
        className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex flex-1 items-center justify-end gap-1 sm:gap-3">
        <div className="relative" ref={helpRef}>
          <button
            onClick={() => { setHelpOpen((o) => !o); setNotifOpen(false) }}
            aria-label="Centro de ayuda"
            aria-expanded={helpOpen}
            className={iconButton(helpOpen)}
          >
            <HelpCircle size={20} />
          </button>

          <AnimatePresence>
            {helpOpen && (
              <motion.div {...panelMotion} className={cn(panelClass, "sm:w-[340px]")}>
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-trace-50">
                      <BookOpen size={13} className="text-trace-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Centro de Ayuda</span>
                  </div>
                  <button
                    onClick={() => setHelpOpen(false)}
                    aria-label="Cerrar ayuda"
                    className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="border-b border-gray-100 bg-trace-50/40 px-4 py-3">
                  <p className="text-xs leading-relaxed text-gray-600">
                    <span className="font-semibold text-trace-700">OliTraceIT</span> es tu plataforma de trazabilidad oleícola. Gestiona parcelas, registra actividades y genera lotes con certificación digital completa.
                  </p>
                </div>

                <div className="max-h-[50vh] divide-y divide-gray-50 overflow-y-auto sm:max-h-[360px]">
                  {helpSections.map((s) => (
                    <div key={s.title} className="flex gap-3 px-4 py-3">
                      <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", s.bg)}>
                        <s.icon size={14} className={s.color} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{s.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 px-4 py-3">
                  <button
                    onClick={() => { setHelpOpen(false); setSupportOpen(true) }}
                    className="flex items-center gap-1.5 text-xs font-medium text-trace-600 transition-colors hover:text-trace-700"
                  >
                    <MessageCircle size={13} />
                    Contactar soporte
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => { setSupportOpen(true); setHelpOpen(false); setNotifOpen(false) }}
          aria-label="Contactar soporte"
          title="Contactar soporte"
          className={iconButton(false)}
        >
          <Headset size={20} />
        </button>

        <div className="relative" ref={panelRef}>
          <button
            onClick={() => { setNotifOpen((o) => !o); setHelpOpen(false) }}
            aria-label={unreadCount > 0 ? `Notificaciones (${unreadCount} sin leer)` : "Notificaciones"}
            aria-expanded={notifOpen}
            className={cn("relative", iconButton(notifOpen))}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div {...panelMotion} className={cn(panelClass, "sm:w-80")}>
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
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
                        className="rounded-sm px-2 py-1 text-xs font-medium text-trace-600 transition-colors hover:bg-trace-50"
                      >
                        Marcar leídas
                      </button>
                    )}
                    <button
                      onClick={() => setNotifOpen(false)}
                      aria-label="Cerrar notificaciones"
                      className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <div className="max-h-[340px] divide-y divide-gray-50 overflow-y-auto">
                  {notifs.slice(0, PREVIEW_COUNT).map((n) => {
                    const cfg = notificationStyles[n.type]
                    return (
                      <button
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={cn(
                          "flex w-full gap-3 border-l-2 px-4 py-3.5 text-left transition-colors hover:bg-gray-50",
                          cfg.border,
                          n.read ? "bg-white" : "bg-gray-50/70"
                        )}
                      >
                        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", cfg.bg)}>
                          <cfg.icon size={14} className={cfg.iconColor} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block text-sm leading-snug", n.read ? "font-normal text-gray-500" : "font-medium text-gray-900")}>
                            {n.title}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-gray-500">{n.desc}</span>
                          <span className="mt-1 block text-[11px] text-gray-500">{n.time}</span>
                        </span>
                        {!n.read && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-label="Sin leer" />}
                      </button>
                    )
                  })}
                </div>

                <div className="border-t border-gray-100 px-4 py-2.5 text-center">
                  <button
                    onClick={() => { setNotifOpen(false); setHistoryOpen(true) }}
                    className="text-xs font-medium text-trace-600 transition-colors hover:text-trace-700"
                  >
                    Ver historial completo →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/perfil"
          aria-label="Mi perfil"
          className="ml-1 flex items-center gap-2 rounded-full bg-gray-100 py-1.5 pl-1.5 pr-1.5 transition-colors hover:bg-gray-200 sm:ml-2 sm:pr-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-trace-600 text-sm font-semibold text-white">
            {userProfile.avatar}
          </span>
          <span className="hidden text-sm font-medium text-gray-700 sm:block">
            {userProfile.nombre} {userProfile.apellidos.split(" ")[0]}
          </span>
        </Link>
      </div>

      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
      <NotificationsModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        notifications={notifs}
        onMarkRead={markRead}
        onMarkAllRead={markAllRead}
      />
    </header>
  )
}
