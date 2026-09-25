"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, MessageCircle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

const FORMSPREE_URL = "https://formspree.io/f/xjgedvop"

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [mounted, setMounted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    asunto: "Problema técnico",
    mensaje: "",
    email: "",
  })

  // Montar portal solo en cliente
  useEffect(() => { setMounted(true) }, [])

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false)
        setSending(false)
        setForm({ asunto: "Problema técnico", mensaje: "", email: "" })
      }, 300)
    }
  }, [isOpen])

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.mensaje) return
    setSending(true)
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: `[SOPORTE] ${form.asunto}`,
          email: form.email,
          mensaje: form.mensaje,
        }),
      })
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-md rounded-2xl border border-gray-100 bg-white shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-trace-50">
                      <MessageCircle size={15} className="text-trace-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Contactar Soporte</p>
                      <p className="text-xs text-gray-400">Te respondemos en menos de 24 h</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-5 py-5">
                  {submitted ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-trace-50">
                        <CheckCircle2 size={28} className="text-trace-600" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900">¡Mensaje enviado!</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Hemos recibido tu consulta. Te responderemos en{" "}
                          <span className="font-medium text-gray-700">{form.email}</span>.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={onClose} className="mt-2">
                        Cerrar
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Tu email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Correo electrónico"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Tipo de consulta
                        </label>
                        <select
                          value={form.asunto}
                          onChange={(e) => setForm((f) => ({ ...f, asunto: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors bg-white"
                        >
                          <option>Problema técnico</option>
                          <option>Duda sobre una funcionalidad</option>
                          <option>Solicitar nueva función</option>
                          <option>Problema con mis datos</option>
                          <option>Otra consulta</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Descripción <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Describe tu problema o consulta con el mayor detalle posible..."
                          value={form.mensaje}
                          onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors resize-none"
                        />
                      </div>

                      <Button type="submit" disabled={sending} className="w-full gap-2">
                        {sending
                          ? <><Loader2 size={15} className="animate-spin" /> Enviando...</>
                          : <><ArrowRight size={15} /> Enviar consulta</>
                        }
                      </Button>
                    </form>
                  )}
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
