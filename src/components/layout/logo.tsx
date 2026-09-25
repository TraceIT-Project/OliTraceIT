import Image from "next/image"

export function Logo({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const sizes = {
    sm: { img: 28, text: "text-lg" },
    default: { img: 36, text: "text-xl" },
    lg: { img: 44, text: "text-2xl" },
  }

  const s = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="TRACE IT"
        width="40"
        height="40"
        className="object-contain"
        priority
      />
      <div className="flex items-baseline gap-0.5">
        <span className={`${s.text} font-bold tracking-tight text-gray-900`} style={{ fontFamily: 'var(--font-sans)' }}>
          TRACE
        </span>
        <span className={`${s.text} font-bold tracking-tight text-trace-700`} style={{ fontFamily: 'var(--font-sans)' }}>
          IT
        </span>
      </div>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="TRACE IT"
      width={36}
      height={36}
      className={`object-contain ${className}`}
      priority
    />
  )
}
