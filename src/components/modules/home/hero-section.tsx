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
  const headline = settingText(settings.hero_headline, locale) || t.hero.headline
  const support = settingText(settings.hero_support, locale) || t.hero.support
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const heroImage = settingUrl(settings.hero_image_url, "/media/banners/hero-vmit-student.jpg")

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-sky">
      <div className="absolute inset-0">
        <MotionImage
          src={heroImage}
          alt={locale === "vi" ? "Sinh viên VMIT" : "VMIT student"}
          fill
          priority
          sizes="100vw"
          frameClassName="absolute inset-0 h-full w-full"
          className="object-cover object-[70%_center] md:object-center"
          zoom={1.02}
        />
        {/* Soft left wash only — keep photo readable, no heavy dark veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent md:from-black/40 md:via-black/10" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[85%] items-center pb-16 pt-44 md:pt-52">
        <div className="w-full max-w-xl md:w-[48%]">
          <h1 className="text-[clamp(2.35rem,5vw,3.6rem)] font-black leading-[1.12] tracking-tight text-white drop-shadow-sm">
            {headline}
          </h1>
          {support ? (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/95 md:text-lg">{support}</p>
          ) : null}
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
