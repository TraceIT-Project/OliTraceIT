"use client"

import { useState } from "react"
import { User, Mail, Phone, Building2, MapPin, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal, ModalHeader, ModalSuccess } from "@/components/ui/modal"

interface Profile {
  nombre: string
  apellidos: string
  email: string
  telefono: string
  empresa: string
  cif: string
  direccion: string
}

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: Profile
  onSave: (data: Profile) => void
}

const fields = [
  { key: "nombre" as const, label: "Nombre", icon: User, placeholder: "Tu nombre", required: true, autoComplete: "given-name" },
  { key: "apellidos" as const, label: "Apellidos", icon: User, placeholder: "Tus apellidos", required: true, autoComplete: "family-name" },
  { key: "email" as const, label: "Correo electrónico", icon: Mail, placeholder: "tu@email.com", type: "email", required: true, autoComplete: "email" },
  { key: "telefono" as const, label: "Teléfono", icon: Phone, placeholder: "+34 600 000 000", type: "tel", autoComplete: "tel" },
  { key: "empresa" as const, label: "Empresa / Explotación", icon: Building2, placeholder: "Nombre de la empresa", autoComplete: "organization" },
  { key: "cif" as const, label: "CIF", icon: FileText, placeholder: "B-00000000" },
  { key: "direccion" as const, label: "Dirección", icon: MapPin, placeholder: "Dirección completa", autoComplete: "street-address" },
]

export function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      {(titleId) => (
        <>
          <ModalHeader
            titleId={titleId}
            icon={User}
            title="Editar Perfil"
            subtitle="Actualiza tu información personal"
            onClose={onClose}
          />
          <div className="px-5 py-5">
            <EditProfileForm profile={profile} onSave={onSave} onClose={onClose} />
          </div>
        </>
      )}
    </Modal>
  )
}

function EditProfileForm({ profile, onSave, onClose }: Omit<EditProfileModalProps, "isOpen">) {
  const [form, setForm] = useState(profile)
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("saving")
    await new Promise((r) => setTimeout(r, 600))
    onSave(form)
    setStatus("saved")
  }

  if (status === "saved") {
    return (
      <ModalSuccess title="Perfil actualizado" onClose={onClose}>
        Los cambios se han guardado correctamente.
      </ModalSuccess>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((f, i) => (
        <div key={f.key} className={i < 2 ? undefined : "sm:col-span-2"}>
          <label htmlFor={`profile-${f.key}`} className="mb-1.5 block text-xs font-medium text-gray-700">
            {f.label} {f.required && <span className="text-red-400">*</span>}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <f.icon size={14} className="text-gray-500" />
            </div>
            <input
              id={`profile-${f.key}`}
              type={f.type ?? "text"}
              required={f.required}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-trace-400 focus:outline-hidden focus:ring-2 focus:ring-trace-500/20"
            />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-end gap-3 pt-2 sm:col-span-2">
        <Button type="button" variant="outline" size="sm" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" size="sm" disabled={status === "saving"} className="gap-2">
          {status === "saving"
            ? <><Loader2 size={14} className="animate-spin" /> Guardando...</>
            : "Guardar cambios"
          }
        </Button>
      </div>
    </form>
  )
}
