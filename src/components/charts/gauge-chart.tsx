interface GaugeChartProps {
  value: number
  max: number
  label: string
  sublabel?: string
  size?: "sm" | "md" | "lg"
  color?: string
}

const sizes = { sm: 140, md: 200, lg: 260 }
const strokeWidths = { sm: 16, md: 20, lg: 24 }

export function GaugeChart({
  value,
  max,
  label,
  sublabel,
  size = "md",
  color = "#1c611f",
}: GaugeChartProps) {
  const s = sizes[size]
  const strokeWidth = strokeWidths[size]
  const radius = (s - strokeWidth) / 2
  const circumference = Math.PI * radius
  const offset = circumference * (1 - value / max)
  const arc = `M ${strokeWidth / 2} ${s / 2} A ${radius} ${radius} 0 0 1 ${s - strokeWidth / 2} ${s / 2}`

  return (
    <div className="flex w-full flex-col items-center">
      <svg
        viewBox={`0 0 ${s} ${s / 2 + 10}`}
        className="h-auto w-full"
        style={{ maxWidth: s }}
        role="img"
        aria-label={`${label}${sublabel ? ` ${sublabel}` : ""}`}
      >
        <path d={arc} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} strokeLinecap="round" />
        <path
          d={arc}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="-mt-4 text-center">
        <div className="text-3xl font-bold text-gray-900">{label}</div>
        {sublabel && <div className="mt-0.5 text-sm text-gray-500">{sublabel}</div>}
      </div>
    </div>
  )
}
