"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const MIN_THUMB_HEIGHT = 40

export function PageScrollbar() {
  const [thumb, setThumb] = useState({ top: 0, height: 0 })
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ startY: number; startScroll: number } | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const view = window.innerHeight
        const total = document.documentElement.scrollHeight
        if (total <= view) return setThumb({ top: 0, height: 0 })
        const height = Math.max(MIN_THUMB_HEIGHT, (view / total) * view)
        setThumb({ height, top: (window.scrollY / (total - view)) * (view - height) })
      })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { startY: e.clientY, startScroll: window.scrollY }
    setDragging(true)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const track = window.innerHeight - thumb.height
    const top = drag.current.startScroll + ((e.clientY - drag.current.startY) * scrollable) / track
    window.scrollTo({ top, behavior: "instant" })
  }

  function handlePointerUp() {
    drag.current = null
    setDragging(false)
  }

  if (!thumb.height) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 right-0 z-90 w-3 pointer-coarse:hidden">
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ top: thumb.top, height: thumb.height }}
        className={cn(
          "pointer-events-auto absolute right-0.5 w-1.5 cursor-default touch-none rounded-full bg-gray-900/30 ring-1 ring-white/50 transition-[width,background-color] duration-150 hover:w-2 hover:bg-gray-900/45",
          dragging && "w-2 bg-gray-900/55"
        )}
      />
    </div>
  )
}
