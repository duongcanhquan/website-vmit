"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, GraduationCap, Globe2, FileText, Users } from "lucide-react"
import { MotionImage } from "@/components/common/motion-image"
import { HoverLift } from "@/components/common/reveal"
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
  const reduce = useReducedMotion()
  const { locale, t } = useLocale()
  const headline = settingText(settings.hero_headline, locale) || t.hero.headline
  const support = settingText(settings.hero_support, locale) || t.hero.support
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const heroImage = settingUrl(settings.hero_image_url, "/media/banners/hero-international.jpg")

  const quickLinks = [
    {
      href: ROUTES.apply,
      label: locale === "vi" ? "Tuyển sinh" : "Admissions",
      icon: FileText,
    },
    {
      href: ROUTES.programs,
      label: locale === "vi" ? "Đào tạo" : "Programmes",
      icon: GraduationCap,
    },
    {
      href: ROUTES.pathway,
      label: locale === "vi" ? "Hợp tác quốc tế" : "Global pathway",
      icon: Globe2,
    },
    {
      href: ROUTES.studentLife,
      label: locale === "vi" ? "Đời sống SV" : "Student life",
      icon: Users,
    },
  ]

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-brand-navy pt-20 md:min-h-[92vh] md:pt-24">
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
          zoom={1.04}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/88 via-brand-navy/55 to-brand-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-brand-navy/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(88vh-5rem)] max-w-7xl flex-col justify-end px-4 pb-10 md:min-h-[calc(92vh-6rem)] md:pb-14">
        <div className="max-w-2xl">
          <motion.p
            className="font-display text-5xl font-medium tracking-tight text-white md:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            VMIT
          </motion.p>
          <motion.h1
            className="mt-4 font-display text-[clamp(1.85rem,4.2vw,3.15rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            {headline}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            {support}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <Link href={ROUTES.apply} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              {t.hero.ctaApply}
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={onOpenScholarship}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {t.hero.ctaScholarship} {year}
            </button>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item, i) => (
            <HoverLift key={item.href}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 + i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 backdrop-blur-md transition hover:bg-white/18"
                >
                  <item.icon className="size-5 stroke-[1.5] text-accent-gold" />
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  <ArrowRight className="ml-auto size-4 text-white/50 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </motion.div>
            </HoverLift>
          ))}
        </div>
      </div>
    </section>
  )
}
