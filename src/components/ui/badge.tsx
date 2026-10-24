import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary/10 text-primary": variant === "default",
          "bg-emerald-50 text-emerald-700 border border-emerald-200": variant === "success",
        },
        className
      )}
      {...props}
    />
  )
}
