"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-brand-navy/10 bg-white/85 shadow-[0_8px_30px_-18px_rgba(0,29,126,0.35)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand-red via-brand-red to-brand-navy transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500",
          scrolled ? "h-[4.25rem] py-2" : "h-[5.25rem] py-3",
        )}
      >
        <Link href={ROUTES.home} className="group flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-vmit.png"
            alt="VMIT"
            width={168}
            height={66}
            className={cn(
              "h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]",
              scrolled ? "w-[128px]" : "w-[156px]",
            )}
            priority
          />
          <div
            className={cn(
              "hidden border-l pl-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] sm:block",
              scrolled ? "border-brand-navy/15 text-brand-navy/55" : "border-white/25 text-white/70",
            )}
          >
            <div>Pearson Approved</div>
            <div>Centre · APC</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300",
                scrolled
                  ? "text-brand-navy/80 hover:bg-brand-navy/[0.05] hover:text-brand-red"
                  : "text-white/90 hover:bg-white/10 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE.hotlineHref}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold transition-colors",
              scrolled ? "text-brand-navy/80 hover:text-brand-red" : "text-white/90 hover:text-white",
            )}
          >
            <Phone className="size-4" />
            <span className="hidden xl:inline">{SITE.hotlineDisplay}</span>
          </a>
          <Link
            href={ROUTES.apply}
            className={cn(
              buttonVariants({ size: "sm", variant: scrolled ? "primary" : "outline" }),
              "min-w-0",
            )}
          >
            Xét tuyển {SITE.admissionYear}
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full transition lg:hidden",
            scrolled ? "bg-brand-navy/5 text-brand-navy" : "bg-white/10 text-white",
          )}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-brand-navy/10 bg-white/95 px-4 py-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-semibold text-brand-navy hover:bg-brand-navy/[0.04]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ROUTES.apply}
              className={cn(buttonVariants({ size: "lg" }), "mt-3")}
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
