"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

interface SidebarContextType {
  collapsed: boolean
  toggle: () => void
  mobileOpen: boolean
  toggleMobile: () => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggle: () => {},
  mobileOpen: false,
  toggleMobile: () => {},
  closeMobile: () => {},
})

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggle = useCallback(() => setCollapsed((c) => !c), [])
  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const value = useMemo(
    () => ({ collapsed, toggle, mobileOpen, toggleMobile, closeMobile }),
    [collapsed, toggle, mobileOpen, toggleMobile, closeMobile]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => useContext(SidebarContext)
