"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { SocialLinks } from "@/components/common/social-links"
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
  const tagline =
    settingText(settings.hero_slogan, locale) ||
    settingText(settings.tagline, locale) ||
    SITE.brandTagline
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setPendingHref(null)
    setOpen(false)
  }, [pathname])

  const nav = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.pathway, label: t.nav.pathway },
    { href: ROUTES.programs, label: t.nav.programs },
    { href: ROUTES.subjects, label: t.nav.subjects },
    { href: ROUTES.btecSchools, label: t.nav.btecSchools },
  ]

  const light = overHero && !scrolled

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "hidden border-b md:block",
          light ? "border-white/15 bg-black/45 text-white" : "border-border bg-surface text-brand-navy",
        )}
      >
        <div className="mx-auto flex max-w-[85%] items-center justify-between gap-6 py-2.5">
          <SocialLinks
            settings={settings}
            className="hidden sm:flex"
            linkClassName={cn(
              "text-[13px]",
              light ? "text-white/85 hover:text-white" : "text-brand-navy/80 hover:text-primary",
            )}
          />
          <p
            className={cn(
              "ml-auto text-[11px] font-semibold uppercase tracking-[0.14em]",
              light ? "text-white/55" : "text-muted",
            )}
          >
            {badge}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto max-w-[calc(85%+2rem)] transition-all duration-300 md:mx-[7.5%]",
          scrolled || !overHero
            ? "border-b border-border bg-surface/95 shadow-hairline backdrop-blur-md"
            : "border-b border-white/10 bg-black/45 backdrop-blur-md",
        )}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-5">
          <Link
            href={ROUTES.home}
            className="relative h-10 w-[112px] shrink-0 md:h-11 md:w-[132px]"
          >
            <Image
              src="/brand/logo-vmit-white.png"
              alt={light ? `VMIT — ${tagline}` : ""}
              width={885}
              height={333}
              className={cn(
                "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                light ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!light}
              priority
            />
            <Image
              src="/brand/logo-vmit-color.png"
              alt={light ? "" : `VMIT — ${tagline}`}
              width={739}
              height={279}
              className={cn(
                "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
                light ? "pointer-events-none opacity-0" : "opacity-100",
              )}
              aria-hidden={light}
              priority
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const current = pathname === item.href
              const pending = pendingHref === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  aria-current={current ? "page" : undefined}
                  onClick={() => {
                    if (!item.href.includes("#")) setPendingHref(item.href)
                  }}
                  className={cn(
                    "rounded-[3px] px-3 py-2 text-base font-semibold transition-colors duration-150 active:scale-95 active:bg-primary active:text-white",
                    current || pending
                      ? "bg-primary text-white"
                      : light
                        ? "text-white hover:text-primary"
                        : "text-brand-navy/90 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div
              className={cn(
                "hidden rounded-[3px] border p-0.5 text-xs font-semibold uppercase tracking-wider md:inline-flex",
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
                "clip-cta hidden min-w-0 rounded-none px-8 py-6 text-base font-bold uppercase tracking-wide md:inline-flex",
              )}
            >
              {t.nav.apply}
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
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">{badge}</p>
            <SocialLinks settings={settings} className="mb-3" linkClassName="text-white/90" />
            <div className="mb-3 inline-flex rounded-[3px] border border-white/30 p-0.5 text-xs font-semibold uppercase">
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
              {nav.map((item) => {
                const current = pathname === item.href
                const pending = pendingHref === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "rounded-[3px] px-3 py-2.5 text-base font-medium transition-colors duration-150 active:scale-[0.98] active:bg-white active:text-primary",
                      current || pending ? "bg-white text-primary" : "text-white hover:bg-white/10",
                    )}
                    onClick={() => {
                      if (!item.href.includes("#")) setPendingHref(item.href)
                      setOpen(false)
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href={ROUTES.apply}
                className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "mt-3 text-base")}
                onClick={() => setOpen(false)}
              >
                {t.nav.apply}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
