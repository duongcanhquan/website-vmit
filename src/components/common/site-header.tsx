"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import type { Locale } from "@/lib/i18n/types"
import { cn } from "@/lib/utils"

export function SiteHeader({ settings = {} }: { settings?: Record<string, unknown> }) {
  const { locale, setLocale, t } = useLocale()
  const badge = settingText(settings.accreditation_badge, locale) || SITE.accreditationBadge
  const hotline = settingText(settings.hotline_display, locale) || t.common.hotline
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const hotlineHref = settingText(settings.hotline_href, locale) || SITE.hotlineHref
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const nav = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.programs, label: t.nav.programs },
    { href: ROUTES.pathway, label: t.nav.pathway },
    { href: ROUTES.tuition, label: t.nav.tuition },
    { href: ROUTES.studentLife, label: t.nav.studentLife },
  ]

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/90 shadow-hairline backdrop-blur-md"
          : "border-b border-transparent bg-mist/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[4.5rem]">
        <Link href={ROUTES.home} className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-vmit.png"
            alt="VMIT"
            width={148}
            height={58}
            className="h-auto w-[118px] object-contain md:w-[132px]"
            priority
          />
          <div className="hidden border-l border-border pl-3 overline leading-tight text-muted sm:block">
            <div>{badge}</div>
            <div>APC</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-brand-slate/80 transition hover:bg-mist hover:text-brand-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <div className="inline-flex rounded-lg border border-border bg-surface p-0.5 text-[11px] font-semibold uppercase tracking-wider">
            {(["vi", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 transition",
                  locale === code ? "bg-brand-navy text-white" : "text-muted hover:text-brand-navy",
                )}
                aria-pressed={locale === code}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href={hotlineHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-slate/75 hover:text-brand-navy"
          >
            <Phone className="size-3.5 stroke-[1.5]" />
            <span className="hidden xl:inline">{hotline}</span>
          </a>
          <Link href={ROUTES.apply} className={cn(buttonVariants({ size: "sm", variant: "outlineNavy" }), "min-w-0")}>
            {t.nav.apply} {year}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-brand-navy lg:hidden"
          aria-label={t.common.menu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
          <div className="mb-3 inline-flex rounded-lg border border-border p-0.5 text-[11px] font-semibold uppercase">
            {(["vi", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={cn(
                  "rounded-md px-3 py-1.5",
                  locale === code ? "bg-brand-navy text-white" : "text-muted",
                )}
              >
                {code}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-navy hover:bg-mist"
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
              {t.nav.apply} {year}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
