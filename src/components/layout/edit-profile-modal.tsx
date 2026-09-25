"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, User, Mail, Phone, Building2, MapPin, FileText, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: {
    nombre: string
    apellidos: string
    email: string
    telefono: string
    empresa: string
    cif: string
    direccion: string
  }
  onSave: (data: EditProfileModalProps["profile"]) => void
}

const fields = [
  { key: "nombre" as const, label: "Nombre", icon: User, placeholder: "Tu nombre" },
  { key: "apellidos" as const, label: "Apellidos", icon: User, placeholder: "Tus apellidos" },
  { key: "email" as const, label: "Correo electrónico", icon: Mail, placeholder: "tu@email.com", type: "email" },
  { key: "telefono" as const, label: "Teléfono", icon: Phone, placeholder: "+34 600 000 000", type: "tel" },
  { key: "empresa" as const, label: "Empresa / Explotación", icon: Building2, placeholder: "Nombre de la empresa" },
  { key: "cif" as const, label: "CIF", icon: FileText, placeholder: "B-00000000" },
  { key: "direccion" as const, label: "Dirección", icon: MapPin, placeholder: "Dirección completa" },
]

export function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState(profile)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Sync form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(profile)
      setSaved(false)
      setSaving(false)
    }
  }, [isOpen, profile])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  function handleChange(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre || !form.apellidos || !form.email) return
    setSaving(true)
    // Simulate save delay
    await new Promise((r) => setTimeout(r, 600))
    onSave(form)
    setSaving(false)
    setSaved(true)
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
                className="relative w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-trace-50">
                      <User size={15} className="text-trace-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Editar Perfil</p>
                      <p className="text-xs text-gray-400">Actualiza tu información personal</p>
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
                  {saved ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-trace-50">
                        <CheckCircle2 size={28} className="text-trace-600" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900">Perfil actualizado</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Los cambios se han guardado correctamente.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={onClose} className="mt-2">
                        Cerrar
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name row — two columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.slice(0, 2).map((f) => {
                          const Icon = f.icon
                          return (
                            <div key={f.key}>
                              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                {f.label} <span className="text-red-400">*</span>
                              </label>
                              <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <Icon size={14} className="text-gray-400" />
                                </div>
                                <input
                                  type="text"
                                  required
                                  placeholder={f.placeholder}
                                  value={form[f.key]}
                                  onChange={(e) => handleChange(f.key, e.target.value)}
                                  className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors"
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Rest of fields */}
                      {fields.slice(2).map((f) => {
                        const Icon = f.icon
                        const isRequired = f.key === "email"
                        return (
                          <div key={f.key}>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              {f.label} {isRequired && <span className="text-red-400">*</span>}
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Icon size={14} className="text-gray-400" />
                              </div>
                              <input
                                type={f.type || "text"}
                                required={isRequired}
                                placeholder={f.placeholder}
                                value={form[f.key]}
                                onChange={(e) => handleChange(f.key, e.target.value)}
                                className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors"
                              />
                            </div>
                          </div>
                        )
                      })}

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" size="sm" onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button type="submit" size="sm" disabled={saving} className="gap-2">
                          {saving
                            ? <><Loader2 size={14} className="animate-spin" /> Guardando...</>
                            : "Guardar cambios"
                          }
                        </Button>
                      </div>
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
