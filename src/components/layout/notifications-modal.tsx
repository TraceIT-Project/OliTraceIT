"use client"

import { useState } from "react"
import { AlertTriangle, Bell, CheckCircle, Filter, Info } from "lucide-react"
import { Modal, ModalHeader } from "@/components/ui/modal"
import type { Notification, NotificationType } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export const notificationStyles = {
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    border: "border-l-amber-400",
    label: "Aviso",
    labelBg: "bg-amber-100 text-amber-700",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-trace-50",
    iconColor: "text-trace-600",
    border: "border-l-trace-500",
    label: "Completado",
    labelBg: "bg-trace-100 text-trace-700",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    border: "border-l-blue-400",
    label: "Info",
    labelBg: "bg-blue-100 text-blue-700",
  },
}

type FilterType = "all" | NotificationType

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "warning", label: "Avisos" },
  { key: "success", label: "Completados" },
  { key: "info", label: "Info" },
]

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkRead: (id: number) => void
  onMarkAllRead: () => void
}

export function NotificationsModal({ isOpen, onClose, notifications, onMarkRead, onMarkAllRead }: NotificationsModalProps) {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter)
  const unreadCount = notifications.filter((n) => !n.read).length

  const groups: { label: string; items: Notification[] }[] = []
  for (const n of filtered) {
    const existing = groups.find((g) => g.label === n.group)
    if (existing) existing.items.push(n)
    else groups.push({ label: n.group, items: [n] })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      {(titleId) => (
        <>
          <ModalHeader
            titleId={titleId}
            icon={Bell}
            onClose={onClose}
            title={
              <span className="flex items-center gap-2">
                Historial de notificaciones
                {unreadCount > 0 && (
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                    {unreadCount} sin leer
                  </span>
                )}
              </span>
            }
            subtitle={`${notifications.length} notificaciones en total`}
            actions={unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="hidden rounded-lg px-2.5 py-1.5 text-xs font-medium text-trace-600 transition-colors hover:bg-trace-50 sm:block"
              >
                Marcar todas leídas
              </button>
            )}
          />

          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-gray-100 px-5 py-3">
            <Filter size={13} className="mr-1 shrink-0 text-gray-500" />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                  filter === f.key
                    ? "border-trace-200 bg-trace-50 text-trace-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {groups.length === 0 ? (
              <div className="py-12 text-center">
                <Bell size={28} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-500">No hay notificaciones con este filtro</p>
              </div>
            ) : (
              groups.map((group) => (
                <div key={group.label}>
                  <div className="sticky top-0 border-b border-gray-100 bg-gray-50/90 px-5 py-1.5 backdrop-blur-xs">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{group.label}</p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {group.items.map((n) => {
                      const cfg = notificationStyles[n.type]
                      const Icon = cfg.icon
                      return (
                        <button
                          key={n.id}
                          onClick={() => onMarkRead(n.id)}
                          className={cn(
                            "flex w-full gap-3 border-l-2 px-5 py-3.5 text-left transition-colors hover:bg-gray-50",
                            cfg.border,
                            n.read ? "bg-white" : "bg-gray-50/70"
                          )}
                        >
                          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", cfg.bg)}>
                            <Icon size={14} className={cfg.iconColor} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="mb-0.5 flex items-center gap-2">
                              <span className={cn("text-sm leading-snug", n.read ? "font-normal text-gray-500" : "font-medium text-gray-900")}>
                                {n.title}
                              </span>
                              {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-label="Sin leer" />}
                            </span>
                            <span className="line-clamp-1 block text-xs text-gray-500">{n.desc}</span>
                            <span className="mt-1 flex items-center gap-2">
                              <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", cfg.labelBg)}>{cfg.label}</span>
                              <span className="text-[11px] text-gray-500">{n.time}</span>
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
            <p className="text-xs text-gray-500">
              Mostrando {filtered.length} de {notifications.length}
            </p>
            {unreadCount > 0 && (
              <button onClick={onMarkAllRead} className="text-xs font-medium text-trace-600 hover:text-trace-700 sm:hidden">
                Marcar todas leídas
              </button>
            )}
          </div>
        </>
      )}
    </Modal>
  )
}
