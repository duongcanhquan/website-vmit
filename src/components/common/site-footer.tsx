"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/components/providers/locale-provider"
import { ROUTES, SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"

export function SiteFooter({ settings = {} }: { settings?: Record<string, unknown> }) {
  const { locale, t } = useLocale()
  const badge = settingText(settings.accreditation_badge, locale) || SITE.accreditationBadge
  const hotline = settingText(settings.hotline_display, locale) || t.common.hotline
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const tagline =
    settingText(settings.tagline, locale) ||
    settingText(settings.hero_slogan, locale) ||
    SITE.brandTagline
  const nav = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.programs, label: t.nav.programs },
    { href: ROUTES.pathway, label: t.nav.pathway },
    { href: ROUTES.tuition, label: t.nav.tuition },
    { href: ROUTES.apply, label: `${t.nav.apply} ${year}` },
  ]

  return (
    <footer className="border-t border-white/10 bg-brand-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-vmit.png"
            alt={`VMIT — ${tagline}`}
            width={148}
            height={58}
            className="h-auto w-[132px] object-contain brightness-0 invert"
          />
          <p className="mt-5 font-display text-xl font-medium italic tracking-tight text-accent-gold">
            {tagline}
          </p>
          <p className="mt-2 overline text-white/40">
            {badge} · APC
          </p>
        </div>
        <div>
          <p className="overline text-white/40">{t.footer.nav}</p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 transition hover:text-accent-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="overline text-white/40">{t.footer.contact}</p>
          <p className="mt-4 text-sm font-medium text-white/80">{hotline}</p>
          <p className="mt-2 text-sm text-white/45">[VMIT: địa chỉ / email]</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs tracking-wide text-white/35">
        © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
      </div>
    </footer>
  )
}
