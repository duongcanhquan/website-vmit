"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

function isModified(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

export function NavigationProgress() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle")
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onStart = () => {
      setWidth(16)
      setPhase("run")
    }
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModified(event)) return
      const anchor = (event.target as HTMLElement | null)?.closest("a")
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return
      const raw = anchor.getAttribute("href")
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("#")) return
      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search
      if (samePage && url.hash) {
        const id = decodeURIComponent(url.hash.slice(1))
        const target = id ? document.getElementById(id) : null
        if (target) {
          event.preventDefault()
          target.scrollIntoView({ behavior: "smooth", block: "start" })
          window.history.pushState(null, "", `${url.pathname}${url.search}#${id}`)
        }
        return
      }
      if (samePage) return
      onStart()
    }
    document.addEventListener("click", onClick)
    window.addEventListener("vmit-navigate", onStart)
    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("vmit-navigate", onStart)
    }
  }, [])

  useEffect(() => {
    if (phase !== "run") return
    const frame = window.requestAnimationFrame(() => setWidth(82))
    const slow = window.setTimeout(() => setPhase("idle"), 8000)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(slow)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "run") return
    setWidth(100)
    setPhase("done")
    const timer = window.setTimeout(() => setPhase("idle"), 220)
    return () => window.clearTimeout(timer)
  }, [pathname])

  if (phase === "idle") return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-1 bg-primary/20"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={width}
      aria-label="Đang chuyển trang"
    >
      <div
        className="h-full bg-primary transition-[width] duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
