"use client"

import { useState } from "react"
import { MessageCircle, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal, ModalHeader, ModalSuccess } from "@/components/ui/modal"
import { sendContactForm } from "@/lib/site"

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-trace-400 focus:outline-hidden focus:ring-2 focus:ring-trace-500/20"

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {(titleId) => (
        <>
          <ModalHeader
            titleId={titleId}
            icon={MessageCircle}
            title="Contactar Soporte"
            subtitle="Te respondemos en menos de 24 h"
            onClose={onClose}
          />
          <div className="px-5 py-5">
            <SupportForm onClose={onClose} />
          </div>
        </>
      )}
    </Modal>
  )
}

function SupportForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ asunto: "Problema técnico", mensaje: "", email: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    try {
      await sendContactForm({ tipo: `[SOPORTE] ${form.asunto}`, email: form.email, mensaje: form.mensaje })
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <ModalSuccess title="¡Mensaje enviado!" onClose={onClose}>
        Hemos recibido tu consulta. Te responderemos en{" "}
        <span className="font-medium text-gray-700">{form.email}</span>.
      </ModalSuccess>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="support-email" className="mb-1.5 block text-xs font-medium text-gray-700">
          Tu email <span className="text-red-400">*</span>
        </label>
        <input
          id="support-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="support-asunto" className="mb-1.5 block text-xs font-medium text-gray-700">
          Tipo de consulta
        </label>
        <select
          id="support-asunto"
          value={form.asunto}
          onChange={(e) => setForm((f) => ({ ...f, asunto: e.target.value }))}
          className={`${inputClass} bg-white`}
        >
          <option>Problema técnico</option>
          <option>Duda sobre una funcionalidad</option>
          <option>Solicitar nueva función</option>
          <option>Problema con mis datos</option>
          <option>Otra consulta</option>
        </select>
      </div>

      <div>
        <label htmlFor="support-mensaje" className="mb-1.5 block text-xs font-medium text-gray-700">
          Descripción <span className="text-red-400">*</span>
        </label>
        <textarea
          id="support-mensaje"
          rows={4}
          required
          placeholder="Describe tu problema o consulta con el mayor detalle posible..."
          value={form.mensaje}
          onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full gap-2">
        {status === "sending"
          ? <><Loader2 size={15} className="animate-spin" /> Enviando...</>
          : <><ArrowRight size={15} /> Enviar consulta</>
        }
      </Button>
    </form>
  )
}
