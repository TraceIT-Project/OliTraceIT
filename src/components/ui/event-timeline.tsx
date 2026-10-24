import { Leaf, Scissors, FlaskConical, Droplets, Wheat, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  seedling: Leaf,
  scissors: Scissors,
  shield: FlaskConical,
  droplet: Droplets,
  truck: Wheat,
}

const typeConfig: Record<string, { color: string; bg: string; dot: string }> = {
  seedling: { color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-500" },
  scissors: { color: "text-violet-600",  bg: "bg-violet-50",  dot: "bg-violet-500" },
  shield:   { color: "text-amber-600",   bg: "bg-amber-50",   dot: "bg-amber-500" },
  droplet:  { color: "text-sky-600",     bg: "bg-sky-50",     dot: "bg-sky-500" },
  truck:    { color: "text-trace-600",   bg: "bg-trace-50",   dot: "bg-trace-500" },
}

interface TimelineEvent {
  id: string
  tipo: string
  fecha: string
  icono: string
}

export function EventTimeline({ events, className }: { events: TimelineEvent[]; className?: string }) {
  const sortedEvents = [...events]
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())

  return (
    <div className={cn("max-h-[320px] overflow-y-auto pr-1", className)}>
      {sortedEvents.map((event, i) => {
        const Icon = iconMap[event.icono] || FlaskConical
        const cfg = typeConfig[event.icono] || typeConfig.shield
        const isLast = i === sortedEvents.length - 1
        const date = new Date(event.fecha)
        const dateStr = date.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })

        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full shrink-0 mt-0.5",
                  isLast ? "bg-trace-600 text-white ring-2 ring-trace-200" : cn(cfg.bg, cfg.color)
                )}
              >
                <Icon size={14} />
              </div>
              {!isLast && (
                <div className="my-1 min-h-5 w-0.5 flex-1 bg-gray-100" />
              )}
            </div>

            <div className={cn("pb-4 flex-1 min-w-0", isLast && "pb-0")}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cn(
                    "text-sm font-medium leading-tight",
                    isLast ? "text-trace-700" : "text-gray-800"
                  )}>
                    {event.tipo}
                  </span>
                  {isLast && (
                    <span className="rounded-full bg-trace-100 px-1.5 py-0.5 text-[10px] font-semibold text-trace-700">
                      Último
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{dateStr}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
