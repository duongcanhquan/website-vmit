"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MotionImage } from "@/components/common/motion-image"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"

type HeroSectionProps = {
  onOpenScholarship: () => void
  settings: Record<string, unknown>
}

function settingUrl(value: unknown, fallback: string): string {
  const text = typeof value === "string" ? value : settingText(value, "vi")
  return text.replaceAll('"', "").trim() || fallback
}

const SCHOLARSHIP_HREF = "#hoc-bong"

function isScholarshipHref(href: string): boolean {
  return href === "" || href === SCHOLARSHIP_HREF || href === "#scholarship"
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")
}

export function HeroSection({ onOpenScholarship, settings }: HeroSectionProps) {
  const { locale, t } = useLocale()

  const eyebrow =
    settingText(settings.hero_eyebrow, locale) ||
    (locale === "vi" ? "Chào mừng đến VMIT" : "Welcome to VMIT")
  const headline = settingText(settings.hero_headline, locale) || t.hero.headline
  const support = settingText(settings.hero_support, locale) || t.hero.support
  const heroImage = settingUrl(settings.hero_image_url, "/media/banners/hero-vmit-student.jpg")

  const primaryLabel = settingText(settings.hero_cta_primary_label, locale) || t.hero.ctaScholarship
  const primaryHref = settingUrl(settings.hero_cta_primary_href, SCHOLARSHIP_HREF)

  const secondaryLabel =
    settingText(settings.hero_cta_secondary_label, locale) ||
    (locale === "vi" ? "Chương trình học" : "Programmes")
  const secondaryHref = settingUrl(settings.hero_cta_secondary_href, ROUTES.programs)

  const tertiaryLabel = settingText(settings.hero_cta_tertiary_label, locale) || t.hero.ctaApply
  const tertiaryHref = settingUrl(settings.hero_cta_tertiary_href, ROUTES.apply)
  const showTertiary = !(isScholarshipHref(tertiaryHref) && isScholarshipHref(primaryHref))

  function CtaLink({
    href,
    className,
    children,
  }: {
    href: string
    className: string
    children: ReactNode
  }) {
    if (isScholarshipHref(href)) {
      return (
        <button type="button" onClick={onOpenScholarship} className={className}>
          {children}
        </button>
      )
    }
    if (isExternalHref(href)) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-sky">
      <div className="absolute inset-0">
        <MotionImage
          src={heroImage}
          alt={locale === "vi" ? "Sinh viên VMIT" : "VMIT student"}
          fill
          priority
          quality={85}
          sizes="100vw"
          frameClassName="absolute inset-0 h-full w-full"
          className="object-cover object-[88%_center] md:object-[82%_center]"
          zoom={1.01}
        />
        {/* Soft wash on text side only — keep subject sharp on the right */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25 md:bg-gradient-to-r md:from-black/50 md:via-black/15 md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[92%] items-center pb-16 pt-32 md:max-w-[85%] md:pt-52">
        <div className="w-full max-w-xl md:w-[48%]">
          {eyebrow ? (
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-white/90">{eyebrow}</p>
          ) : null}
          <h1 className="text-[clamp(2.35rem,5vw,3.6rem)] font-black leading-[1.12] tracking-tight text-white drop-shadow-sm">
            {headline}
          </h1>
          {support ? (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/95 md:text-lg">{support}</p>
          ) : null}
          <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
            <CtaLink href={primaryHref} className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}>
              {primaryLabel}
              <ArrowRight className="size-4" />
            </CtaLink>
            <CtaLink href={secondaryHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
              {secondaryLabel}
              <ArrowRight className="size-4" />
            </CtaLink>
            {showTertiary ? (
              <CtaLink
                href={tertiaryHref}
                className="inline-flex h-12 items-center justify-center px-2 text-sm font-semibold text-white underline-offset-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] transition hover:underline sm:justify-start"
              >
                {tertiaryLabel}
              </CtaLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
