import { Building2, Leaf, Sparkles, type LucideIcon } from "lucide-react"

interface PlanFeature {
  group: string
  label: string
}

export interface Plan {
  id: string
  icon: LucideIcon
  price: number
  tagline: string
  desc: string
  popular?: boolean
  features: PlanFeature[]
  limits: string[]
}

export const plans: Plan[] = [
  {
    id: "Básico",
    icon: Leaf,
    price: 0,
    tagline: "Para pequeños agricultores",
    desc: "Para agricultores que empiezan con la trazabilidad digital.",
    features: [
      { group: "parcelas", label: "1 parcela" },
      { group: "actividades", label: "Registro de actividades" },
      { group: "trazabilidad", label: "Trazabilidad básica" },
      { group: "soporte", label: "Soporte por email" },
    ],
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
    tagline: "Para fincas medianas",
    desc: "Para explotaciones que necesitan trazabilidad completa y certificación.",
    popular: true,
    features: [
      { group: "parcelas", label: "Hasta 10 parcelas" },
      { group: "trazabilidad", label: "Trazabilidad limitada" },
      { group: "lotes", label: "Generación de lotes con QR (limitado)" },
      { group: "almazara", label: "Conexión directa con almazara" },
      { group: "informes", label: "Informes y exportación PDF" },
      { group: "soporte", label: "Soporte 24 horas" },
    ],
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
    tagline: "Para cooperativas y almazaras",
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
    ],
    limits: [],
  },
]

export function getPlan(id: string) {
  return plans.find((p) => p.id === id)
}
