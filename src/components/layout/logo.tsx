import Image from "next/image"
import { cn } from "@/lib/utils"

const sizes = {
  sm: { img: 28, text: "text-lg" },
  default: { img: 36, text: "text-xl" },
  lg: { img: 44, text: "text-2xl" },
}

interface LogoProps {
  className?: string
  size?: keyof typeof sizes
  inverted?: boolean
  textClassName?: string
}

export function Logo({ className, size = "default", inverted = false, textClassName }: LogoProps) {
  const s = sizes[size]

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo.png"
        alt=""
        width={s.img}
        height={s.img}
        className={cn("shrink-0 object-contain", inverted && "brightness-0 invert")}
        preload
      />
      <span className={cn("font-sans font-bold tracking-tight", s.text, textClassName)}>
        <span className={inverted ? "text-white" : "text-gray-900"}>OliTrace</span>
        <span className={inverted ? "text-trace-200" : "text-trace-700"}>IT</span>
      </span>
    </span>
  )
}
