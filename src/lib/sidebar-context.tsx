"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  toggle: () => void
  mobileOpen: boolean
  toggleMobile: () => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => { },
  toggle: () => { },
  mobileOpen: false,
  toggleMobile: () => { },
  closeMobile: () => { },
})

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <SidebarContext.Provider value={{
      collapsed,
      setCollapsed,
      toggle: () => setCollapsed((c) => !c),
      mobileOpen,
      toggleMobile: () => setMobileOpen((o) => !o),
      closeMobile: () => setMobileOpen(false),
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
