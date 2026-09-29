"use client"

import Image from "next/image"
import Link from "next/link"
import { SocialLinks } from "@/components/common/social-links"
import { useLocale } from "@/components/providers/locale-provider"
import { ROUTES, SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"

function settingUrl(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value.replaceAll('"', "").trim() || fallback
  return settingText(value, "vi").replaceAll('"', "").trim() || fallback
}

export function SiteFooter({ settings = {} }: { settings?: Record<string, unknown> }) {
  const { locale, t } = useLocale()
  const badge = settingText(settings.accreditation_badge, locale) || SITE.accreditationBadge
  const hotline = settingText(settings.hotline_display, locale) || t.common.hotline
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const email = settingUrl(settings.contact_email, "admissions@vmit.edu.vn")
  const address =
    settingText(settings.contact_address, locale) ||
    (locale === "vi" ? "[VMIT: địa chỉ cơ sở]" : "[VMIT: campus address]")
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
    <footer className="bg-footer text-brand-navy">
      <div className="mx-auto grid max-w-[85%] gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-vmit.png"
            alt={`VMIT — ${tagline}`}
            width={148}
            height={58}
            className="h-auto w-[132px] object-contain"
          />
          <p className="mt-5 font-bold italic text-primary">{tagline}</p>
          <p className="mt-3 text-sm text-muted">{badge} · APC</p>
          <p className="mt-4 text-sm text-muted">{hotline}</p>
          <SocialLinks settings={settings} className="mt-5" linkClassName="text-primary" />
        </div>
        <div>
          <h3 className="mb-6 text-lg font-medium">{t.footer.nav}</h3>
          <ul className="space-y-4 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition before:mr-2 before:text-primary before:content-['⟶'] hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-6 text-lg font-medium">{t.footer.contact}</h3>
          <p className="text-sm text-muted">{hotline}</p>
          <a href={`mailto:${email}`} className="mt-2 block text-sm text-muted hover:text-primary">
            {email}
          </a>
          <p className="mt-2 text-sm text-muted">{address}</p>
          <p className="mt-6 text-xs text-muted">
            <Link href="/admin/dang-nhap" className="font-semibold text-primary/80 hover:text-primary hover:underline">
              Cổng quản trị
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
      </div>
    </footer>
  )
}
