"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar-context"
import { Logo } from "@/components/layout/logo"
import {
  Home,
  LayoutGrid,
  PenLine,
  FileText,
  Package,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  X,
} from "lucide-react"

const navItems = [
  { href: "/overview", label: "Inicio", icon: Home },
  { href: "/parcelas", label: "Parcelas", icon: LayoutGrid },
  { href: "/actividades", label: "Actividades", icon: PenLine },
  { href: "/campanas", label: "Campañas", icon: FileText },
  { href: "/lotes", label: "Lotes", icon: Package },
  { href: "/almazara", label: "Almazara", icon: BarChart3 },
]

const itemClass = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
const inactiveClass = "text-gray-500 hover:bg-gray-50 hover:text-gray-900"

export function Sidebar() {
  const pathname = usePathname()
  const { collapsed, toggle, mobileOpen, closeMobile } = useSidebar()

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeMobile() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [mobileOpen, closeMobile])

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-dvh w-[210px] flex-col border-r bg-white transition-all duration-300 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full max-lg:invisible",
        collapsed && "lg:w-[68px]"
      )}
    >
      <div className="relative">
        <div className={cn(
          "flex h-16 items-center border-b",
          collapsed ? "px-4 lg:justify-center lg:px-0" : "px-4"
        )}>
          <Link href="/overview" onClick={closeMobile} aria-label="OliTraceIT - Inicio" className="overflow-hidden">
            <Logo size="sm" className="gap-1.5" textClassName={cn(collapsed && "lg:hidden")} />
          </Link>
          <button
            onClick={closeMobile}
            aria-label="Cerrar menú"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-600 lg:hidden"
          >
            <X size={16} />
          </button>
        </div>
        <button
          onClick={toggle}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
          className={cn(
            "absolute -bottom-3 z-10 hidden h-6 w-6 items-center justify-center rounded-full border bg-white text-gray-500 shadow-xs transition-colors hover:text-gray-600 lg:flex",
            collapsed ? "left-1/2 -translate-x-1/2" : "right-4"
          )}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              title={collapsed ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                itemClass,
                isActive ? "border border-trace-100 bg-trace-50 text-trace-700 shadow-xs" : inactiveClass
              )}
            >
              <item.icon size={20} className={cn("shrink-0", isActive && "text-trace-600")} />
              <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1 border-t px-3 py-3">
        <Link
          href="/perfil"
          onClick={closeMobile}
          title={collapsed ? "Mi Perfil" : undefined}
          aria-current={pathname === "/perfil" ? "page" : undefined}
          className={cn(itemClass, pathname === "/perfil" ? "bg-trace-50 text-trace-700" : inactiveClass)}
        >
          <User size={20} className="shrink-0" />
          <span className={cn(collapsed && "lg:hidden")}>Mi Perfil</span>
        </Link>
        <Link
          href="/"
          title={collapsed ? "Cerrar sesión" : undefined}
          className={cn(itemClass, "text-gray-500 hover:bg-red-50 hover:text-red-600")}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={cn(collapsed && "lg:hidden")}>Cerrar sesión</span>
        </Link>
      </div>
    </aside>
  )
}
