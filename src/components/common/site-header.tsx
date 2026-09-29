"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"

export function SiteHeader({
  settings = {},
  overHero = false,
}: {
  settings?: Record<string, unknown>
  overHero?: boolean
}) {
  const { locale, setLocale, t } = useLocale()
  const badge = settingText(settings.accreditation_badge, locale) || SITE.accreditationBadge
  const hotline = settingText(settings.hotline_display, locale) || "0999999999"
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const hotlineHref = settingText(settings.hotline_href, locale) || "tel:0999999999"
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const nav = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.programs, label: t.nav.programs },
    { href: "#mon-hoc", label: locale === "vi" ? "Môn học" : "Subjects" },
    { href: "#tin-tuc", label: locale === "vi" ? "Tin tức" : "Blog" },
    { href: ROUTES.pathway, label: t.nav.pathway },
    { href: ROUTES.tuition, label: t.nav.tuition },
    { href: ROUTES.studentLife, label: t.nav.studentLife },
  ]

  const light = overHero && !scrolled

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "hidden border-b md:block",
          light ? "border-white/20 bg-black/10 text-white" : "border-border bg-surface text-brand-navy",
        )}
      >
        <div className="mx-auto flex max-w-[85%] items-center justify-between gap-6 py-3">
          <div>
            <p
              className={cn(
                "text-base font-black uppercase tracking-[0.06em] md:text-lg lg:text-xl",
                light ? "text-white" : "text-brand-navy",
              )}
            >
              {badge}
            </p>
            <a
              href={hotlineHref}
              className={cn(
                "mt-1 inline-flex items-center gap-2 text-sm font-semibold md:text-base",
                light ? "text-white/95 hover:text-white" : "text-primary hover:text-accent-teal-hover",
              )}
            >
              <Phone className="size-4 stroke-[2]" />
              {hotline}
            </a>
          </div>
          <p className={cn("hidden text-sm italic lg:block", light ? "text-white/75" : "text-muted")}>
            {SITE.brandTagline}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto max-w-[calc(85%+2rem)] transition-all duration-300 md:mx-[7.5%]",
          scrolled || !overHero
            ? "border-b border-border bg-surface/95 shadow-hairline backdrop-blur-md"
            : "bg-white/25 backdrop-blur-sm",
        )}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-5">
          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-semibold transition hover:text-primary",
                  light ? "text-white" : "text-brand-navy/85",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div
              className={cn(
                "hidden rounded-[3px] border p-0.5 text-[11px] font-semibold uppercase tracking-wider md:inline-flex",
                light ? "border-white/30" : "border-border bg-surface",
              )}
            >
              {(["vi", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={cn(
                    "rounded-[2px] px-2.5 py-1.5 transition",
                    locale === code
                      ? "bg-primary text-white"
                      : light
                        ? "text-white/80 hover:text-white"
                        : "text-muted hover:text-brand-navy",
                  )}
                  aria-pressed={locale === code}
                >
                  {code}
                </button>
              ))}
            </div>
            <Link
              href={ROUTES.apply}
              className={cn(
                buttonVariants({ size: "default", variant: "primary" }),
                "clip-cta hidden min-w-0 rounded-none px-8 py-6 font-bold uppercase tracking-wide md:inline-flex",
              )}
            >
              {t.nav.apply} {year}
            </Link>
            <button
              type="button"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-[3px] border lg:hidden",
                light ? "border-white/40 text-white" : "border-border bg-surface text-brand-navy",
              )}
              aria-label={t.common.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border bg-primary px-4 py-4 lg:hidden">
            <a href={hotlineHref} className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Phone className="size-4" />
              {hotline}
            </a>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-white">{badge}</p>
            <div className="mb-3 inline-flex rounded-[3px] border border-white/30 p-0.5 text-[11px] font-semibold uppercase">
              {(["vi", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={cn(
                    "rounded-[2px] px-3 py-1.5",
                    locale === code ? "bg-white text-primary" : "text-white",
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
                  className="rounded-[3px] px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={ROUTES.apply}
                className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "mt-3")}
                onClick={() => setOpen(false)}
              >
                {t.nav.apply} {year}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
