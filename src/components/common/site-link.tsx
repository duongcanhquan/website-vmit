"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, type ComponentProps, type MouseEvent } from "react"
import Link from "next/link"

const SCROLL_KEY = "vmit-scroll"

export function scrollToSection(id: string, behavior: ScrollBehavior = "auto") {
  const node = document.getElementById(id)
  if (!node) return false
  const header = document.querySelector("header")
  const offset = (header?.getBoundingClientRect().height ?? 96) + 12
  const top = node.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export function beginNavigation() {
  window.dispatchEvent(new CustomEvent("vmit-navigate"))
}

function rememberHash(id: string) {
  try {
    sessionStorage.setItem(SCROLL_KEY, id)
  } catch {
    // Private mode can block storage. The hash on the next URL still works as a fallback.
  }
}

export function SiteLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter()
  const pathname = usePathname()
  const raw = typeof href === "string" ? href : ""

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    const hashAt = raw.indexOf("#")
    if (hashAt === -1) {
      if (raw && raw !== pathname) beginNavigation()
      return
    }
    event.preventDefault()
    const path = raw.slice(0, hashAt) || "/"
    const id = decodeURIComponent(raw.slice(hashAt + 1))
    if (!id) return
    if (pathname === path) {
      scrollToSection(id, "smooth")
      window.history.pushState(null, "", `${path}#${id}`)
      window.dispatchEvent(new HashChangeEvent("hashchange"))
      return
    }
    beginNavigation()
    rememberHash(id)
    router.push(path, { scroll: false })
  }

  return <Link href={href} {...props} onClick={handleClick} />
}

export function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false
    let stored: string | null = null
    try {
      stored = sessionStorage.getItem(SCROLL_KEY)
    } catch {
      stored = null
    }
    const id = stored || window.location.hash.replace(/^#/, "")
    if (!id) return
    let tries = 0
    const timer = window.setInterval(() => {
      if (cancelled) return
      const found = scrollToSection(id)
      tries += 1
      if (!found && tries < 20) return
      if (tries < 12) return
      window.clearInterval(timer)
      try {
        sessionStorage.removeItem(SCROLL_KEY)
      } catch {
        // Ignore storage failures.
      }
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `${pathname}#${id}`)
        window.dispatchEvent(new HashChangeEvent("hashchange"))
      }
    }, 50)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [pathname])

  return null
}
