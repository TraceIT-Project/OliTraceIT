import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "info" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary/10 text-primary": variant === "default",
          "bg-emerald-50 text-emerald-700 border border-emerald-200": variant === "success",
          "bg-amber-50 text-amber-700 border border-amber-200": variant === "warning",
          "bg-blue-50 text-blue-700 border border-blue-200": variant === "info",
          "border text-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}
