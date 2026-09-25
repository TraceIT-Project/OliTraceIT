"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar-context"
import Image from "next/image"
import {
  Home,
  LayoutGrid,
  Edit3,
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
  { href: "/actividades", label: "Actividades", icon: Edit3 },
  { href: "/campanas", label: "Campañas", icon: FileText },
  { href: "/lotes", label: "Lotes", icon: Package },
  { href: "/almazara", label: "Almazara", icon: BarChart3 },
]

const bottomItems = [
  { href: "/perfil", label: "Mi Perfil", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { collapsed, toggle, mobileOpen, closeMobile } = useSidebar()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-[210px] flex-col border-r bg-white transition-all duration-300",
        // Mobile: slide in/out
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: always visible, width based on collapsed state
        "lg:translate-x-0",
        collapsed && "lg:w-[68px]"
      )}
    >
      {/* Logo */}
      <div className="relative">
        <div className={cn(
          "flex h-16 items-center border-b",
          collapsed ? "lg:justify-center px-4 lg:px-0" : "px-4"
        )}>
          <Link href="/overview" onClick={closeMobile} className="flex items-center gap-1.5 overflow-hidden">
            <Image
              src="/logo.png"
              alt="TRACE IT"
              width={32}
              height={32}
              className="w-9 h-9 object-contain flex-shrink-0"
            />
            <div className={cn("flex items-baseline gap-0.5", collapsed && "lg:hidden")}>
              <span className="text-lg font-bold tracking-tight text-gray-900">TRACE</span>
              <span className="text-lg font-bold tracking-tight text-trace-700">IT</span>
            </div>
          </Link>
          {/* Mobile close button */}
          <button
            onClick={closeMobile}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors lg:hidden"
          >
            <X size={16} />
          </button>
        </div>
        {/* Desktop collapse toggle */}
        <button
          onClick={toggle}
          className={cn(
            "absolute -bottom-3 z-10 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border bg-white text-gray-400 shadow-sm hover:text-gray-600 transition-colors",
            collapsed ? "left-1/2 -translate-x-1/2" : "right-4"
          )}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-trace-50 text-trace-700 shadow-sm border border-trace-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon size={20} className={cn("flex-shrink-0", isActive && "text-trace-600")} />
              <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t px-3 py-3 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMobile}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-trace-50 text-trace-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          title={collapsed ? "Cerrar sesión" : undefined}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-black hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className={cn(collapsed && "lg:hidden")}>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
