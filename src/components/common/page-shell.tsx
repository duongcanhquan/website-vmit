"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MotionImage } from "@/components/common/motion-image"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"

type PageShellProps = {
  settings?: Record<string, unknown>
  eyebrowVi: string
  eyebrowEn: string
  titleVi: string
  titleEn: string
  leadVi: string
  leadEn: string
  imageUrl?: string
  imageAltVi?: string
  imageAltEn?: string
  children: React.ReactNode
  showApplyCta?: boolean
}

export function PageShell({
  settings = {},
  eyebrowVi,
  eyebrowEn,
  titleVi,
  titleEn,
  leadVi,
  leadEn,
  imageUrl,
  imageAltVi = "VMIT",
  imageAltEn = "VMIT",
  children,
  showApplyCta = true,
}: PageShellProps) {
  const { locale, t } = useLocale()
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const title = locale === "vi" ? titleVi : titleEn
  const lead = locale === "vi" ? leadVi : leadEn
  const eyebrow = locale === "vi" ? eyebrowVi : eyebrowEn
  const alt = locale === "vi" ? imageAltVi : imageAltEn

  return (
    <>
      <SiteHeader settings={settings} overHero />
      <main className="bg-mist">
        <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden md:min-h-[50vh]">
          {imageUrl ? (
            <div className="absolute inset-0">
              <MotionImage
                src={imageUrl}
                alt={alt}
                fill
                priority
                sizes="100vw"
                frameClassName="absolute inset-0 h-full w-full"
                className="object-cover object-center"
                zoom={1.03}
              />
              <div className="absolute inset-0 bg-black/55" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-primary" />
          )}

          <div className="relative z-10 mx-auto max-w-[85%] px-4 py-28 text-center text-white md:py-32">
            <p className="overline !text-white/80">{eyebrow}</p>
            <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-black tracking-tight">{title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 md:text-lg">{lead}</p>
            {showApplyCta ? (
              <Link
                href={ROUTES.apply}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-8")}
              >
                {t.nav.apply} {year}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </section>

        <div className="mx-auto max-w-[85%] py-14 md:py-20">{children}</div>
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}

export function ContentState({
  status,
  emptyVi,
  emptyEn,
  errorVi = "Không tải được dữ liệu.",
  errorEn = "Unable to load content.",
}: {
  status: "ok" | "empty" | "error"
  emptyVi: string
  emptyEn: string
  errorVi?: string
  errorEn?: string
}) {
  const { locale } = useLocale()
  if (status === "ok") return null
  return (
    <p className="rounded-[3px] border border-border bg-surface px-5 py-6 text-sm text-muted shadow-hairline">
      {status === "error"
        ? locale === "vi"
          ? errorVi
          : errorEn
        : locale === "vi"
          ? emptyVi
          : emptyEn}
    </p>
  )
}
