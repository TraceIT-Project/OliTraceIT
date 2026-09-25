"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { userProfile, parcelas } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import {
  User, Mail, Phone, Building2, MapPin, Calendar, Shield,
  LayoutGrid, Award, Edit3, Camera, Bell, Lock, Globe, FileText
} from "lucide-react"
import { EditProfileModal } from "@/components/layout/edit-profile-modal"
import { ChangePlanModal } from "@/components/layout/change-plan-modal"

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState<"general" | "seguridad" | "notificaciones">("general")
  const [editOpen, setEditOpen] = useState(false)
  const [planOpen, setPlanOpen] = useState(false)
  const [profile, setProfile] = useState(userProfile)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Mi Perfil
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestiona tu información personal y preferencias de cuenta
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border bg-white overflow-hidden">
        {/* Cover */}
        <div className="h-20 bg-gradient-to-br from-trace-800 via-trace-600 to-trace-400 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute right-20 bottom-0 w-28 h-28 rounded-full bg-white/10" />
          <div className="absolute left-1/3 -bottom-6 w-20 h-20 rounded-full bg-white/5" />
        </div>

        {/* Avatar row — overlaps cover bottom */}
        <div className="px-6">
          <div className="flex items-end justify-between -mt-12">
            <div className="relative flex-shrink-0">
              <div className="h-24 w-24 rounded-2xl bg-trace-600 border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-bold">
                {profile.avatar}
              </div>
              <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white border shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div className="pb-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setEditOpen(true)}>
                <Edit3 size={14} /> Editar Perfil
              </Button>
            </div>
          </div>
        </div>

        {/* Name + info — always in white area */}
        <div className="px-6 pt-3 pb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {profile.nombre} {profile.apellidos}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">{profile.empresa}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="default">{profile.rol}</Badge>
            <Badge variant="success">Plan {profile.plan}</Badge>
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-gray-50 border px-3 py-2 text-center">
              <p className="text-lg font-bold text-trace-700">{profile.parcelas}</p>
              <p className="text-xs text-gray-500">Parcelas</p>
            </div>
            <div className="rounded-lg bg-gray-50 border px-3 py-2 text-center">
              <p className="text-lg font-bold text-trace-700">{profile.superficieTotal.toLocaleString('es-ES')}</p>
              <p className="text-xs text-gray-500">Hectáreas</p>
            </div>
            <div className="rounded-lg bg-gray-50 border px-3 py-2 text-center">
              <p className="text-lg font-bold text-trace-700">98%</p>
              <p className="text-xs text-gray-500">Calidad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs — segmented control */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        {[
          { key: "general" as const, label: "Información General", labelShort: "General", icon: User },
          { key: "seguridad" as const, label: "Seguridad", labelShort: "Seguridad", icon: Lock },
          { key: "notificaciones" as const, label: "Notificaciones", labelShort: "Alertas", icon: Bell },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white shadow-sm text-trace-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon size={15} className="flex-shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.labelShort}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "general" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: User, label: "Nombre completo", value: `${profile.nombre} ${profile.apellidos}` },
                { icon: Mail, label: "Correo electrónico", value: profile.email },
                { icon: Phone, label: "Teléfono", value: profile.telefono },
                { icon: Building2, label: "Empresa / Explotación", value: profile.empresa },
                { icon: FileText, label: "CIF", value: profile.cif },
                { icon: MapPin, label: "Dirección", value: profile.direccion },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-400 flex-shrink-0">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Shield, label: "Rol", value: profile.rol },
                { icon: Award, label: "Plan activo", value: `Plan ${profile.plan}` },
                { icon: Calendar, label: "Miembro desde", value: formatDate(profile.miembroDesde) },
                { icon: LayoutGrid, label: "Parcelas registradas", value: `${profile.parcelas} parcelas` },
                { icon: Globe, label: "Superficie total", value: `${profile.superficieTotal.toLocaleString('es-ES')} ha` },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-400 flex-shrink-0">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}

            </CardContent>
          </Card>

          {/* Plan upgrade CTA — full width */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Plan {profile.plan}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-trace-50 border border-trace-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-trace-800">Hasta 10 parcelas · Trazabilidad limitada · Conexión almazara</p>
                  <p className="text-xs text-trace-600 mt-0.5">Gestión integral de tu explotación oleícola con certificación digital y exportación de informes.</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-lg font-bold text-trace-700">29 €<span className="text-xs font-normal text-trace-500">/mes</span></span>
                  <Button size="sm" variant="outline" className="text-trace-600 border-trace-300 hover:bg-trace-100" onClick={() => setPlanOpen(true)}>
                    Cambiar Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parcelas asociadas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Parcelas Asociadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {parcelas.map((p) => (
                  <div key={p.id} className="rounded-lg border p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-lg bg-trace-50 flex items-center justify-center">
                        <MapPin size={14} className="text-trace-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{p.id}</p>
                        <p className="text-[10px] text-gray-400">{p.ubicacion}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 truncate">{p.nombre}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{p.variedad}</span>
                      <span>{p.superficie.toLocaleString('es-ES')} ha</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-trace-500 rounded-full"
                          style={{ width: `${p.scoreCalidad}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-trace-600">{p.scoreCalidad}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "seguridad" && (
        <Card>
          <CardHeader>
            <CardTitle>Seguridad de la Cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Contraseña</p>
                  <p className="text-xs text-gray-500">Última actualización: {formatDate("2026-01-15")}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Cambiar Contraseña</Button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Verificación en dos pasos (2FA)</p>
                  <p className="text-xs text-gray-500">Protección adicional para tu cuenta</p>
                </div>
              </div>
              <Badge variant="default">Desactivado</Badge>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Sesiones activas</p>
                  <p className="text-xs text-gray-500">1 sesión activa · Chrome · Sevilla, España</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Ver Sesiones</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "notificaciones" && (
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Alertas de plazo de seguridad", desc: "Recibe un aviso cuando un plazo de seguridad está próximo a vencer", checked: true },
              { title: "Resumen semanal de actividad", desc: "Informe semanal con el resumen de actividades registradas", checked: true },
              { title: "Novedades de la plataforma", desc: "Nuevas funcionalidades y actualizaciones de TRACE IT", checked: false },
              { title: "Alertas meteorológicas", desc: "Avisos de condiciones climáticas adversas para tus parcelas", checked: true },
              { title: "Notificaciones de la almazara", desc: "Cuando la almazara confirma la recepción de un lote", checked: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trace-600"></div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={(data) => setProfile((prev) => ({ ...prev, ...data, avatar: `${data.nombre[0]}${data.apellidos[0]}`.toUpperCase() }))}
      />
      <ChangePlanModal
        isOpen={planOpen}
        onClose={() => setPlanOpen(false)}
        currentPlan={profile.plan}
        onChangePlan={(plan) => setProfile((prev) => ({ ...prev, plan }))}
      />
    </div>
  )
}
