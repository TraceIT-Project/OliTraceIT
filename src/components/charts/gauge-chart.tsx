"use client"

interface GaugeChartProps {
  value: number
  max: number
  label: string
  sublabel?: string
  size?: "sm" | "md" | "lg"
  color?: string
}

export function GaugeChart({
  value,
  max,
  label,
  sublabel,
  size = "md",
  color = "#1c611f",
}: GaugeChartProps) {
  const percentage = (value / max) * 100
  const angle = (percentage / 100) * 180
  const sizes = { sm: 140, md: 200, lg: 260 }
  const s = sizes[size]
  const strokeWidth = size === "sm" ? 16 : size === "md" ? 20 : 24
  const radius = (s - strokeWidth) / 2
  const circumference = Math.PI * radius

  const trackD = `M ${strokeWidth / 2} ${s / 2} A ${radius} ${radius} 0 0 1 ${s - strokeWidth / 2} ${s / 2}`
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <svg width={s} height={s / 2 + 10} viewBox={`0 0 ${s} ${s / 2 + 10}`}>
        {/* Track */}
        <path
          d={trackD}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Value */}
        <path
          d={trackD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="text-center -mt-4">
        <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-sans)' }}>
          {label}
        </div>
        {sublabel && (
          <div className="text-sm text-gray-500 mt-0.5">{sublabel}</div>
        )}
      </div>
    </div>
  )
}
