"use client"

import Image from "next/image"
import { SiteLink } from "@/components/common/site-link"
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
  const hotline = settingText(settings.hotline_display, locale) || t.common.hotline
  const email = settingUrl(settings.contact_email, "admissions@vmit.edu.vn")
  const savedAddress = settingText(settings.contact_address, locale).trim()
  const address =
    !savedAddress || savedAddress.includes("[VMIT:") ? SITE.campusAddress : savedAddress
  const nav = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.pathway, label: t.nav.pathway },
    { href: ROUTES.programs, label: t.nav.programs },
    { href: ROUTES.subjects, label: t.nav.subjects },
    { href: ROUTES.btecSchools, label: t.nav.btecSchools },
    { href: ROUTES.englishTest, label: t.nav.englishTest },
    { href: ROUTES.news, label: t.nav.news },
    { href: ROUTES.apply, label: t.nav.apply },
  ]

  return (
    <footer className="bg-footer text-brand-navy">
      <div className="mx-auto grid max-w-[85%] gap-10 py-14 md:grid-cols-[1fr_1.6fr_1.2fr]">
        <div>
          <Image
            src="/brand/logo-vmit.png"
            alt={SITE.name}
            width={148}
            height={58}
            className="h-auto w-[132px] object-contain"
          />
          <SocialLinks settings={settings} className="mt-5" linkClassName="text-primary" />
        </div>
        <div>
          <h3 className="mb-6 text-lg font-medium">{t.footer.nav}</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  className="text-muted transition duration-150 before:mr-2 before:text-primary before:content-['⟶'] hover:text-primary active:text-primary"
                >
                  {item.label}
                </SiteLink>
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
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
      </div>
    </footer>
  )
}
