"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Eye, EyeOff, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sync mode when initialMode changes
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  // Pre-filled demo data
  const loginData = {
    email: "antonio.lopez@fincaelolivar.es",
    password: "TraceIT2026!",
  }

  const registerData = {
    nombre: "Antonio",
    apellidos: "López García",
    email: "antonio.lopez@fincaelolivar.es",
    empresa: "Finca El Olivar S.L.",
    telefono: "+34 654 321 098",
    password: "TraceIT2026!",
    passwordConfirm: "TraceIT2026!",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login/register
    setTimeout(() => {
      setIsLoading(false)
      router.push("/overview")
    }, 800)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header with green accent */}
        <div className="bg-gradient-to-r from-trace-700 to-trace-600 px-6 py-4 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-1 mb-2">
            <Image src="/logo.png" alt="TRACE IT" width={32} height={32} className="brightness-0 invert" />
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold">TRACE IT</span>
            </div>
          </div>
          <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
            {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p className="text-sm text-white/80 mt-1">
            {mode === "login"
              ? "Accede a tu panel de trazabilidad oleícola"
              : "Regístrate y empieza tu prueba gratuita de 30 días"
            }
          </p>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">

          {/* Demo banner */}
          <div className="mx-6 mt-4 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 flex items-start gap-2">
            <Leaf size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700">
              <strong>Modo Demo:</strong> Los datos ya están rellenados. Solo pulsa el botón para acceder al panel.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Nombre</label>
                  <input
                    type="text"
                    defaultValue={registerData.nombre}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Apellidos</label>
                  <input
                    type="text"
                    defaultValue={registerData.apellidos}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Empresa</label>
                  <input
                    type="text"
                    defaultValue={registerData.empresa}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Teléfono</label>
                  <input
                    type="tel"
                    defaultValue={registerData.telefono}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Correo electrónico</label>
              <input
                type="email"
                defaultValue={loginData.email}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  defaultValue={loginData.password}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 pr-10 focus:outline-none focus:ring-2 focus:ring-trace-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Confirmar contraseña</label>
                <input
                  type="password"
                  defaultValue={registerData.passwordConfirm}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500 focus:border-transparent"
                />
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-trace-600 focus:ring-trace-500" />
                  Recordarme
                </label>
                <a href="#" className="text-xs text-trace-600 hover:text-trace-700 font-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {mode === "register" && (
              <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-trace-600 focus:ring-trace-500 mt-0.5" />
                <span>Acepto los <a href="#" className="text-trace-600 underline">términos y condiciones</a> y la <a href="#" className="text-trace-600 underline">política de privacidad</a></span>
              </label>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-sm font-semibold gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta Gratis"}
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Switch mode */}
          <div className="border-t px-6 py-4 text-center bg-gray-50">
            {mode === "login" ? (
              <p className="text-sm text-gray-500">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="font-semibold text-trace-600 hover:text-trace-700"
                >
                  Regístrate gratis
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-semibold text-trace-600 hover:text-trace-700"
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>{/* end scrollable body */}
      </div>
    </div>
  )
}
