import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

type Variant = "default" | "outline" | "ghost" | "secondary"
type Size = "default" | "sm" | "lg" | "icon"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function buttonVariants({ variant = "default", size = "default", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs": variant === "default",
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
      "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
    },
    {
      "h-10 px-4 py-2": size === "default",
      "h-8 rounded-md px-3 text-xs": size === "sm",
      "h-12 rounded-lg px-8 text-base": size === "lg",
      "h-10 w-10": size === "icon",
    },
    className
  )
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={buttonVariants({ variant, size, className })} {...props} />
  )
)
Button.displayName = "Button"

export { Button }
