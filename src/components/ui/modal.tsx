"use client"

import { useCallback, useEffect, useEffectEvent, useId, useSyncExternalStore, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, X, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const noopSubscribe = () => () => {}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: (titleId: string) => ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const titleId = useId()
  const onEscape = useEffectEvent(() => onClose())
  const moveFocusIn = useCallback((el: HTMLDivElement) => {
    const opener = document.activeElement as HTMLElement | null
    el.focus({ preventScroll: true })
    return () => opener?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onEscape() }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handler)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", handler)
    }
  }, [isOpen])

  if (!isClient) return null

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
            className="fixed inset-0 z-100 bg-black/40 backdrop-blur-xs"
          />
          <div className="pointer-events-none fixed inset-0 z-101 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                ref={moveFocusIn}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn("pointer-events-auto relative w-full max-w-md rounded-2xl outline-hidden border border-gray-100 bg-white shadow-2xl", className)}
              >
                {children(titleId)}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

interface ModalHeaderProps {
  titleId: string
  icon: LucideIcon
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  onClose: () => void
}

export function ModalHeader({ titleId, icon: Icon, title, subtitle, actions, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-trace-50">
          <Icon size={15} className="text-trace-600" />
        </div>
        <div className="min-w-0">
          <h2 id={titleId} className="font-sans text-sm font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {actions}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  )
}

export function ModalSuccess({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-trace-50">
        <CheckCircle2 size={28} className="text-trace-600" />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{children}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onClose} className="mt-2">
        Cerrar
      </Button>
    </div>
  )
}
