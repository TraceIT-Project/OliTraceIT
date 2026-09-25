import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  className?: string
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border bg-white p-5 card-hover", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-sans)' }}>
            {value}
          </p>
          {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
          {trend && (
            <p className={cn("mt-1.5 text-xs font-medium", trend.positive ? "text-emerald-600" : "text-red-500")}>
              {trend.value}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-trace-50 p-2.5">
          <Icon size={20} className="text-trace-600" />
        </div>
      </div>
    </div>
  )
}
