"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, Check, Sparkles, Leaf, Building2, CheckCircle2, AlertTriangle, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChangePlanModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: string
  onChangePlan: (plan: string) => void
}

interface Feature {
  group: string
  label: string
}

const plans = [
  {
    id: "Básico",
    icon: Leaf,
    price: 0,
    period: "Gratis",
    desc: "Para agricultores que empiezan con la trazabilidad digital.",
    features: [
      { group: "parcelas", label: "1 parcela" },
      { group: "actividades", label: "Registro de actividades" },
      { group: "trazabilidad", label: "Trazabilidad básica" },
      { group: "soporte", label: "Soporte por email" },
    ] as Feature[],
    limits: [
      "Sin generación de lotes QR",
      "Sin conexión a almazara",
      "Sin informes ni exportación PDF",
    ],
  },
  {
    id: "Profesional",
    icon: Sparkles,
    price: 29,
    period: "/mes",
    desc: "Para explotaciones que necesitan trazabilidad completa y certificación.",
    popular: true,
    features: [
      { group: "parcelas", label: "Hasta 10 parcelas" },
      { group: "trazabilidad", label: "Trazabilidad limitada" },
      { group: "lotes", label: "Generación de lotes con QR (limitado)" },
      { group: "almazara", label: "Conexión directa con almazara" },
      { group: "informes", label: "Informes y exportación PDF" },
      { group: "soporte", label: "Soporte 24 horas" },
    ] as Feature[],
    limits: [
      "Sin API de integración",
      "Sin predicción de rendimiento IA",
      "Sin múltiples usuarios y roles",
      "Sin onboarding personalizado",
    ],
  },
  {
    id: "Empresa",
    icon: Building2,
    price: 79,
    period: "/mes",
    desc: "Para cooperativas y grandes explotaciones con múltiples usuarios.",
    features: [
      { group: "parcelas", label: "Parcelas ilimitadas" },
      { group: "trazabilidad", label: "Trazabilidad completa" },
      { group: "lotes", label: "Generación de lotes con QR (ilimitado)" },
      { group: "almazara", label: "Dashboard de almazara avanzado" },
      { group: "informes", label: "Informes y exportación PDF" },
      { group: "usuarios", label: "Múltiples usuarios y roles" },
      { group: "api", label: "API de integración" },
      { group: "prediccion", label: "Predicción de rendimiento IA" },
      { group: "soporte", label: "Soporte prioritario" },
      { group: "onboarding", label: "Onboarding personalizado" },
    ] as Feature[],
    limits: [],
  },
]

type Step = "select" | "confirm" | "done"

interface Change {
  type: "upgrade" | "downgrade" | "new" | "lost"
  label: string
  prev?: string
}

function getChanges(currentId: string, newId: string): Change[] {
  const current = plans.find((p) => p.id === currentId)
  const next = plans.find((p) => p.id === newId)
  if (!current || !next) return []

  const currentMap = new Map(current.features.map((f) => [f.group, f.label]))
  const nextMap = new Map(next.features.map((f) => [f.group, f.label]))
  const changes: Change[] = []
  const isUpgrade = (next.price ?? 0) > (current.price ?? 0)

  // Features in new plan
  next.features.forEach((f) => {
    const prev = currentMap.get(f.group)
    if (!prev) {
      changes.push({ type: "new", label: f.label })
    } else if (prev !== f.label) {
      changes.push({ type: isUpgrade ? "upgrade" : "downgrade", label: f.label, prev })
    }
  })

  // Features lost (in current but not in new)
  current.features.forEach((f) => {
    if (!nextMap.has(f.group)) {
      changes.push({ type: "lost", label: f.label })
    }
  })

  return changes
}

export function ChangePlanModal({ isOpen, onClose, currentPlan, onChangePlan }: ChangePlanModalProps) {
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState(currentPlan)
  const [step, setStep] = useState<Step>("select")
  const [saving, setSaving] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (isOpen) {
      setSelected(currentPlan)
      setStep("select")
      setSaving(false)
    }
  }, [isOpen, currentPlan])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  async function handleConfirm() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    onChangePlan(selected)
    setSaving(false)
    setStep("done")
  }

  function getComparison() {
    const currentPrice = plans.find((p) => p.id === currentPlan)?.price ?? 0
    const newPrice = plans.find((p) => p.id === selected)?.price ?? 0
    const isUpgrade = newPrice > currentPrice
    const changes = getChanges(currentPlan, selected)
    return { changes, currentPrice, newPrice, isUpgrade, diff: newPrice - currentPrice }
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
                className="relative w-full max-w-3xl rounded-2xl border border-gray-100 bg-white shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-trace-50">
                      <Sparkles size={15} className="text-trace-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Cambiar Plan</p>
                      <p className="text-xs text-gray-400">
                        Plan actual: <span className="font-medium text-trace-600">{currentPlan}</span>
                      </p>
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
                  {step === "done" ? (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-trace-50">
                        <CheckCircle2 size={28} className="text-trace-600" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900">Plan actualizado</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Tu plan ha sido cambiado a <span className="font-medium text-trace-700">Plan {selected}</span>.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={onClose} className="mt-2">
                        Cerrar
                      </Button>
                    </div>

                  ) : step === "confirm" ? (() => {
                    const { changes, currentPrice, newPrice, isUpgrade, diff } = getComparison()
                    const upgrades = changes.filter((c) => c.type === "upgrade")
                    const newFeats = changes.filter((c) => c.type === "new")
                    const downgrades = changes.filter((c) => c.type === "downgrade")
                    const lost = changes.filter((c) => c.type === "lost")
                    const positives = isUpgrade ? [...upgrades, ...newFeats] : []
                    const negatives = !isUpgrade ? [...downgrades, ...lost] : []
                    return (
                      <div className="space-y-5">
                        {/* Price comparison */}
                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                          <div className="grid grid-cols-2">
                            {/* Current plan */}
                            <div className="p-4 bg-gray-50/70 border-r border-gray-200">
                              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Plan actual</p>
                              <p className="text-sm font-semibold text-gray-500">{currentPlan}</p>
                              <p className="text-2xl font-bold text-gray-400 mt-1">
                                {currentPrice === 0 ? <span className="line-through">Gratis</span> : <><span className="line-through">{currentPrice}</span> <span className="text-sm font-normal">€/mes</span></>}
                              </p>
                            </div>

                            {/* New plan */}
                            <div className={cn(
                              "p-4",
                              isUpgrade ? "bg-trace-50/50" : "bg-amber-50/30"
                            )}>
                              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Nuevo plan</p>
                              <p className={cn("text-sm font-semibold", isUpgrade ? "text-trace-700" : "text-amber-700")}>{selected}</p>
                              <p className={cn("text-2xl font-bold mt-1", isUpgrade ? "text-trace-800" : "text-amber-800")}>
                                {newPrice === 0 ? "Gratis" : <>{newPrice} <span className="text-sm font-normal">€/mes</span></>}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Positive changes */}
                        {positives.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-trace-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <ArrowUp size={12} /> Mejoras que obtienes
                            </p>
                            <div className="space-y-1.5">
                              {positives.map((c) => (
                                <div key={c.label} className="flex items-start gap-2 rounded-lg bg-trace-50/50 border border-trace-100 px-3 py-2">
                                  <Check size={13} className="text-trace-600 mt-0.5 flex-shrink-0" />
                                  <div className="text-xs">
                                    <span className="text-trace-800">{c.label}</span>
                                    {c.prev && (
                                      <span className="text-gray-400 ml-1">(antes: {c.prev})</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Negative changes */}
                        {negatives.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <ArrowDown size={12} /> {negatives.some((c) => c.type === "lost") ? "Funcionalidades que pierdes" : "Funcionalidades que se reducen"}
                            </p>
                            <div className="space-y-1.5">
                              {negatives.map((c) => (
                                <div key={c.label} className="flex items-start gap-2 rounded-lg bg-red-50/50 border border-red-100 px-3 py-2">
                                  <X size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                                  <div className="text-xs">
                                    {c.type === "lost" ? (
                                      <span className="text-red-700">Ya no incluye: {c.label}</span>
                                    ) : (
                                      <>
                                        <span className="text-red-700">{c.label}</span>
                                        {c.prev && (
                                          <span className="text-gray-400 ml-1">(antes: {c.prev})</span>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Warning banner */}
                        {/*
                        <div className={cn(
                          "flex items-start gap-3 rounded-lg border p-4",
                          isUpgrade
                            ? "bg-trace-50/50 border-trace-200"
                            : "bg-amber-50/50 border-amber-200"
                        )}>
                          <AlertTriangle size={18} className={isUpgrade ? "text-trace-600 mt-0.5 flex-shrink-0" : "text-amber-500 mt-0.5 flex-shrink-0"} />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {isUpgrade ? "¿Mejorar a " : "¿Cambiar a "}Plan {selected}?
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {isUpgrade
                                ? "Se aplicará el nuevo precio en tu próximo ciclo de facturación."
                                : "Perderás acceso a algunas funcionalidades de tu plan actual."
                              }
                            </p>
                          </div>
                        </div>
                        */}

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                          <Button variant="outline" size="sm" onClick={() => setStep("select")}>
                            Volver
                          </Button>
                          <Button
                            size="sm"
                            disabled={saving}
                            onClick={handleConfirm}
                            className={cn("gap-2", !isUpgrade && "bg-amber-600 hover:bg-amber-700")}
                          >
                            {saving
                              ? <><Loader2 size={14} className="animate-spin" /> Procesando...</>
                              : isUpgrade ? "Confirmar mejora" : "Confirmar cambio"
                            }
                          </Button>
                        </div>
                      </div>
                    )
                  })() : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-stretch">
                        {plans.map((plan) => {
                          const Icon = plan.icon
                          const isCurrent = plan.id === currentPlan
                          const isSelected = plan.id === selected
                          return (
                            <button
                              key={plan.id}
                              onClick={() => setSelected(plan.id)}
                              className={cn(
                                "relative flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
                                isSelected
                                  ? "border-trace-500 bg-trace-50/50 shadow-sm"
                                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                              )}
                            >
                              {plan.popular && (
                                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-trace-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                                  Popular
                                </span>
                              )}

                              {isCurrent && (
                                <span className="absolute -top-2.5 right-3 rounded-full bg-gray-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                                  Actual
                                </span>
                              )}

                              <div className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-lg mb-3",
                                isSelected ? "bg-trace-100" : "bg-gray-100"
                              )}>
                                <Icon size={16} className={isSelected ? "text-trace-600" : "text-gray-500"} />
                              </div>

                              <p className="text-sm font-semibold text-gray-900">{plan.id}</p>
                              <div className="mt-1 mb-3">
                                {plan.price === 0 ? (
                                  <span className="text-xl font-bold text-gray-900">{plan.period}</span>
                                ) : (
                                  <span className="text-xl font-bold text-gray-900">
                                    {plan.price} €<span className="text-xs font-normal text-gray-500">{plan.period}</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{plan.desc}</p>

                              <div className="space-y-1.5">
                                {plan.features.map((f) => (
                                  <div key={f.label} className="flex items-start gap-1.5">
                                    <Check size={12} className="text-trace-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-gray-700">{f.label}</span>
                                  </div>
                                ))}
                                {plan.limits.map((l) => (
                                  <div key={l} className="flex items-start gap-1.5">
                                    <X size={12} className="text-gray-300 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-gray-400">{l}</span>
                                  </div>
                                ))}
                              </div>

                              {isSelected && (
                                <div className="absolute top-3 right-3">
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-trace-600">
                                    <Check size={12} className="text-white" />
                                  </div>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400">
                          Puedes cambiar de plan en cualquier momento.
                        </p>
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="sm" onClick={onClose}>
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            disabled={selected === currentPlan}
                            onClick={() => setStep("confirm")}
                          >
                            {selected === currentPlan ? "Plan actual" : `Cambiar a ${selected}`}
                          </Button>
                        </div>
                      </div>
                    </>
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
