"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { NAV_ITEMS, ROUTES, SITE } from "@/constants/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 24)
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/20 bg-white/75 shadow-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-brand-red transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all",
          scrolled ? "h-16 py-2" : "h-20 py-3",
        )}
      >
        <Link href={ROUTES.home} className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-vmit.jpg"
            alt="VMIT"
            width={132}
            height={48}
            className={cn("h-auto object-contain", scrolled ? "w-[110px]" : "w-[132px]")}
            priority
          />
          <div className="hidden text-[10px] font-semibold uppercase tracking-wide text-brand-navy/70 sm:block">
            <div>Pearson Approved Centre</div>
            <div>APC</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-red",
                scrolled ? "text-brand-navy" : "text-white drop-shadow",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium",
              scrolled ? "text-brand-navy" : "text-white",
            )}
          >
            <Phone className="size-4" />
            <span className="hidden xl:inline">{SITE.hotlineDisplay}</span>
          </span>
          <Link
            href={ROUTES.apply}
            className="inline-flex h-9 items-center rounded-md bg-brand-red px-4 text-sm font-semibold text-white hover:bg-brand-red/90"
          >
            Xét tuyển {SITE.admissionYear}
          </Link>
        </div>

        <button
          type="button"
          className={cn("lg:hidden", scrolled ? "text-brand-navy" : "text-white")}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-brand-navy/10 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-brand-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ROUTES.apply}
              className="rounded-md bg-brand-red px-4 py-2 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Xét tuyển {SITE.admissionYear}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
