"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Eye, EyeOff, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Logo } from "@/components/layout/logo"
import { userProfile } from "@/lib/mock-data"

export type AuthMode = "login" | "register"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
}

const DEMO_PASSWORD = "OliTraceIT2026!"

const inputClass = "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-transparent focus:outline-hidden focus:ring-2 focus:ring-trace-500"
const labelClass = "mb-1.5 block text-xs font-medium text-gray-500"

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isLogin = mode === "login"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => router.push("/overview"), 800)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="overflow-hidden">
      {(titleId) => (
        <>
          <div className="relative bg-linear-to-r from-trace-700 to-trace-600 px-6 py-4 text-white">
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
            <Logo size="sm" inverted className="mb-2" />
            <h2 id={titleId} className="font-sans text-xl font-bold">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
            <p className="mt-1 text-sm text-white/80">
              {isLogin
                ? "Accede a tu panel de trazabilidad oleícola"
                : "Regístrate y empieza tu prueba gratuita de 30 días"}
            </p>
          </div>

          <div className="mx-6 mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <Leaf size={14} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-xs text-amber-700">
              <strong>Modo Demo:</strong> Los datos ya están rellenados. Solo pulsa el botón para acceder al panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {!isLogin && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="auth-nombre" className={labelClass}>Nombre</label>
                  <input id="auth-nombre" type="text" autoComplete="given-name" defaultValue={userProfile.nombre} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="auth-apellidos" className={labelClass}>Apellidos</label>
                  <input id="auth-apellidos" type="text" autoComplete="family-name" defaultValue={userProfile.apellidos} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="auth-empresa" className={labelClass}>Empresa</label>
                  <input id="auth-empresa" type="text" autoComplete="organization" defaultValue={userProfile.empresa} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="auth-telefono" className={labelClass}>Teléfono</label>
                  <input id="auth-telefono" type="tel" autoComplete="tel" defaultValue={userProfile.telefono} className={inputClass} />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className={labelClass}>Correo electrónico</label>
              <input id="auth-email" type="email" autoComplete="email" defaultValue={userProfile.email} className={inputClass} />
            </div>

            <div>
              <label htmlFor="auth-password" className={labelClass}>Contraseña</label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  defaultValue={DEMO_PASSWORD}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="auth-password-confirm" className={labelClass}>Confirmar contraseña</label>
                <input id="auth-password-confirm" type="password" autoComplete="new-password" defaultValue={DEMO_PASSWORD} className={inputClass} />
              </div>
            )}

            {isLogin ? (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                  <input type="checkbox" defaultChecked className="rounded-sm border-gray-300 text-trace-600 focus:ring-trace-500" />
                  Recordarme
                </label>
                <a href="#" className="text-xs font-medium text-trace-600 hover:text-trace-700">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            ) : (
              <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-500">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded-sm border-gray-300 text-trace-600 focus:ring-trace-500" />
                <span>Acepto los <a href="#" className="text-trace-600 underline">términos y condiciones</a> y la <a href="#" className="text-trace-600 underline">política de privacidad</a></span>
              </label>
            )}

            <Button type="submit" className="h-12 w-full gap-2 text-sm font-semibold" disabled={isLoading}>
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-label="Cargando" />
              ) : (
                <>
                  {isLogin ? "Iniciar Sesión" : "Crear Cuenta Gratis"}
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          <div className="border-t bg-gray-50 px-6 py-4 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <button
                onClick={() => onModeChange(isLogin ? "register" : "login")}
                className="font-semibold text-trace-600 hover:text-trace-700"
              >
                {isLogin ? "Regístrate gratis" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </>
      )}
    </Modal>
  )
}
