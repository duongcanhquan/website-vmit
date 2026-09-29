"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MotionImage } from "@/components/common/motion-image"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"

type HeroSectionProps = {
  onOpenScholarship: () => void
  settings: Record<string, unknown>
}

function settingUrl(value: unknown, fallback: string): string {
  const text = typeof value === "string" ? value : settingText(value, "vi")
  return text.replaceAll('"', "") || fallback
}

export function HeroSection({ onOpenScholarship, settings }: HeroSectionProps) {
  const { locale, t } = useLocale()
  const slogan =
    settingText(settings.hero_slogan, locale) ||
    settingText(settings.tagline, locale) ||
    t.hero.slogan ||
    SITE.brandTagline
  const headline = settingText(settings.hero_headline, locale) || t.hero.headline
  const support = settingText(settings.hero_support, locale) || t.hero.support
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const heroImage = settingUrl(settings.hero_image_url, "/media/banners/hero-international.jpg")

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <MotionImage
          src={heroImage}
          alt={
            locale === "vi"
              ? "Sinh viên quốc tế trên khuôn viên học thuật"
              : "International students on an academic campus"
          }
          fill
          priority
          sizes="100vw"
          frameClassName="absolute inset-0 h-full w-full"
          className="object-cover object-center"
          zoom={1.02}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[85%] items-center pb-16 pt-40 md:pt-48">
        <div className="w-full max-w-xl text-white md:w-1/2">
          <p className="overline !text-white/90">
            {locale === "vi" ? "Chào mừng đến VMIT" : "Welcome to VMIT"}
          </p>
          {slogan ? (
            <p className="mt-3 text-base font-medium italic text-primary md:text-lg">{slogan}</p>
          ) : null}
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.15] tracking-tight text-white">
            {headline}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">{support}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={ROUTES.apply} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              {locale === "vi" ? "Bắt đầu ngay" : "Get started now"}
              <ArrowRight className="size-4" />
            </Link>
            <Link href={ROUTES.programs} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              {locale === "vi" ? "Xem chương trình" : "View course"}
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={onOpenScholarship}
              className="inline-flex h-12 items-center px-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              {t.hero.ctaScholarship} {year}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
