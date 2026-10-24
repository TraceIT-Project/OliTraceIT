"use client"

import { useState } from "react"
import { X, Check, Sparkles, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal, ModalHeader, ModalSuccess } from "@/components/ui/modal"
import { getPlan, plans } from "@/lib/plans"
import { cn } from "@/lib/utils"

interface ChangePlanModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: string
  onChangePlan: (plan: string) => void
}

interface Change {
  type: "upgrade" | "downgrade" | "new" | "lost"
  label: string
  prev?: string
}

function getChanges(currentId: string, newId: string): Change[] {
  const current = getPlan(currentId)
  const next = getPlan(newId)
  if (!current || !next) return []

  const currentMap = new Map(current.features.map((f) => [f.group, f.label]))
  const nextGroups = new Set(next.features.map((f) => f.group))
  const isUpgrade = next.price > current.price
  const changes: Change[] = []

  for (const f of next.features) {
    const prev = currentMap.get(f.group)
    if (!prev) changes.push({ type: "new", label: f.label })
    else if (prev !== f.label) changes.push({ type: isUpgrade ? "upgrade" : "downgrade", label: f.label, prev })
  }
  for (const f of current.features) {
    if (!nextGroups.has(f.group)) changes.push({ type: "lost", label: f.label })
  }
  return changes
}

function formatPrice(price: number) {
  return price === 0 ? "Gratis" : `${price} €`
}

export function ChangePlanModal({ isOpen, onClose, currentPlan, onChangePlan }: ChangePlanModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl">
      {(titleId) => (
        <>
          <ModalHeader
            titleId={titleId}
            icon={Sparkles}
            title="Cambiar Plan"
            subtitle={<>Plan actual: <span className="font-medium text-trace-600">{currentPlan}</span></>}
            onClose={onClose}
          />
          <div className="px-5 py-5">
            <ChangePlanFlow currentPlan={currentPlan} onChangePlan={onChangePlan} onClose={onClose} />
          </div>
        </>
      )}
    </Modal>
  )
}

function ChangePlanFlow({ currentPlan, onChangePlan, onClose }: Omit<ChangePlanModalProps, "isOpen">) {
  const [selected, setSelected] = useState(currentPlan)
  const [step, setStep] = useState<"select" | "confirm" | "done">("select")
  const [saving, setSaving] = useState(false)

  async function handleConfirm() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    onChangePlan(selected)
    setSaving(false)
    setStep("done")
  }

  if (step === "done") {
    return (
      <ModalSuccess title="Plan actualizado" onClose={onClose}>
        Tu plan ha sido cambiado a <span className="font-medium text-trace-700">Plan {selected}</span>.
      </ModalSuccess>
    )
  }

  if (step === "confirm") {
    const currentPrice = getPlan(currentPlan)?.price ?? 0
    const newPrice = getPlan(selected)?.price ?? 0
    const isUpgrade = newPrice > currentPrice
    const changes = getChanges(currentPlan, selected)
    const positives = isUpgrade ? changes.filter((c) => c.type === "upgrade" || c.type === "new") : []
    const negatives = isUpgrade ? [] : changes.filter((c) => c.type === "downgrade" || c.type === "lost")

    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200">
          <div className="border-r border-gray-200 bg-gray-50/70 p-4">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-500">Plan actual</p>
            <p className="text-sm font-semibold text-gray-500">{currentPlan}</p>
            <p className="mt-1 text-2xl font-bold text-gray-500">
              <span className="line-through">{formatPrice(currentPrice)}</span>
              {currentPrice > 0 && <span className="text-sm font-normal">/mes</span>}
            </p>
          </div>
          <div className={cn("p-4", isUpgrade ? "bg-trace-50/50" : "bg-amber-50/30")}>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-500">Nuevo plan</p>
            <p className={cn("text-sm font-semibold", isUpgrade ? "text-trace-700" : "text-amber-700")}>{selected}</p>
            <p className={cn("mt-1 text-2xl font-bold", isUpgrade ? "text-trace-800" : "text-amber-800")}>
              {formatPrice(newPrice)}
              {newPrice > 0 && <span className="text-sm font-normal">/mes</span>}
            </p>
          </div>
        </div>

        {positives.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-trace-700">
              <ArrowUp size={12} /> Mejoras que obtienes
            </p>
            <div className="space-y-1.5">
              {positives.map((c) => (
                <div key={c.label} className="flex items-start gap-2 rounded-lg border border-trace-100 bg-trace-50/50 px-3 py-2">
                  <Check size={13} className="mt-0.5 shrink-0 text-trace-600" />
                  <div className="text-xs">
                    <span className="text-trace-800">{c.label}</span>
                    {c.prev && <span className="ml-1 text-gray-500">(antes: {c.prev})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {negatives.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ArrowDown size={12} /> {negatives.some((c) => c.type === "lost") ? "Funcionalidades que pierdes" : "Funcionalidades que se reducen"}
            </p>
            <div className="space-y-1.5">
              {negatives.map((c) => (
                <div key={c.label} className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50/50 px-3 py-2">
                  <X size={13} className="mt-0.5 shrink-0 text-red-400" />
                  <div className="text-xs">
                    {c.type === "lost" ? (
                      <span className="text-red-700">Ya no incluye: {c.label}</span>
                    ) : (
                      <>
                        <span className="text-red-700">{c.label}</span>
                        {c.prev && <span className="ml-1 text-gray-500">(antes: {c.prev})</span>}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-stretch">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan
          const isSelected = plan.id === selected
          return (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              aria-pressed={isSelected}
              className={cn(
                "relative flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-trace-500 bg-trace-50/50 shadow-xs"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-trace-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  Popular
                </span>
              )}
              {isCurrent && (
                <span className="absolute -top-2.5 left-3 rounded-full bg-gray-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  Actual
                </span>
              )}

              <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-lg", isSelected ? "bg-trace-100" : "bg-gray-100")}>
                <plan.icon size={16} className={isSelected ? "text-trace-600" : "text-gray-500"} />
              </div>

              <p className="text-sm font-semibold text-gray-900">{plan.id}</p>
              <p className="mb-3 mt-1 text-xl font-bold text-gray-900">
                {formatPrice(plan.price)}
                {plan.price > 0 && <span className="text-xs font-normal text-gray-500">/mes</span>}
              </p>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">{plan.desc}</p>

              <div className="space-y-1.5">
                {plan.features.map((f) => (
                  <div key={f.label} className="flex items-start gap-1.5">
                    <Check size={12} className="mt-0.5 shrink-0 text-trace-600" />
                    <span className="text-xs text-gray-700">{f.label}</span>
                  </div>
                ))}
                {plan.limits.map((l) => (
                  <div key={l} className="flex items-start gap-1.5">
                    <X size={12} className="mt-0.5 shrink-0 text-gray-300" />
                    <span className="text-xs text-gray-500">{l}</span>
                  </div>
                ))}
              </div>

              {isSelected && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-trace-600">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">Puedes cambiar de plan en cualquier momento.</p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button size="sm" disabled={selected === currentPlan} onClick={() => setStep("confirm")}>
            {selected === currentPlan ? "Plan actual" : `Cambiar a ${selected}`}
          </Button>
        </div>
      </div>
    </>
  )
}
