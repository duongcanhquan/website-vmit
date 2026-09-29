"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { MotionImage } from "@/components/common/motion-image"
import { HoverLift, Reveal } from "@/components/common/reveal"
import { programStory } from "@/components/modules/pages/program-story-data"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { pickLocale, settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"
import type { CmsStatus } from "@/types/home-cms"

export function ProgramsPreview() {
  const { locale, t } = useLocale()
  const story = programStory(locale)
  return (
    <section id="nganh-hoc" className="bg-mist py-16 md:py-20">
      <div className="mx-auto max-w-[85%]">
        <Reveal>
          <h2 className="@container mx-auto w-full max-w-3xl text-center font-black leading-tight tracking-tight text-brand-navy">
            {story.heroTitle.split("\n").map((line) => (
              <span key={line} className="block whitespace-nowrap text-[clamp(1.15rem,7cqi,2.25rem)]">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted">{story.heroLead}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {story.tracks.map((track, index) => (
            <Reveal key={track.id} delay={0.08 * index}>
              <HoverLift className="h-full">
                <Link
                  href={`${ROUTES.programs}#${track.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-border bg-surface shadow-hairline transition duration-150 hover:border-primary active:scale-[0.99]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sky">
                    <Image
                      src={track.image}
                      alt=""
                      fill
                      sizes="(max-width:768px) 100vw, 28vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 inline-flex size-9 items-center justify-center bg-primary text-sm font-black text-white">
                      {track.index}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="text-xl font-bold tracking-tight text-brand-navy transition group-hover:text-primary">
                      {track.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">{track.promise}</p>
                    <p className="mt-4 text-sm font-bold text-primary">{track.salary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {t.programs.view}
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </HoverLift>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={ROUTES.programs} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            {locale === "vi" ? "Xem đủ sáu học kỳ" : "See all six terms"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function PathwayPreview({
  steps,
  status,
  campusUrl,
}: {
  steps: Array<{
    id: string
    step_code: string
    title_vi: string
    title_en: string
    note_vi: string
    note_en: string
  }>
  status: CmsStatus
  campusUrl: string
}) {
  const { locale, t } = useLocale()
  return (
    <section id="lo-trinh" className="bg-mist py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="overline text-accent-cobalt">{t.pathway.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.5vw,2.85rem)] font-medium tracking-[-0.02em] text-brand-navy">
            {t.pathway.title}
          </h2>
          <p className="mt-4 max-w-xl text-body-lg text-muted">{t.pathway.lead}</p>
          <Link href={ROUTES.pathway} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-8")}>
            {t.pathway.cta}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
            <MotionImage
              src={campusUrl}
              alt={locale === "vi" ? "Khuôn viên học thuật VMIT" : "VMIT academic campus"}
              fill
              sizes="(max-width:1024px) 100vw, 55vw"
              frameClassName="relative aspect-video w-full"
            />
            <ol className="divide-y divide-border">
              {status === "ok"
                ? steps.map((item) => (
                    <li key={item.id} className="flex items-start gap-4 px-5 py-4 md:px-6">
                      <span className="font-display text-xl font-medium text-accent-gold">{item.step_code}</span>
                      <div>
                        <p className="font-display text-lg font-medium text-brand-navy">
                          {locale === "vi" ? item.title_vi : item.title_en}
                        </p>
                        <p className="mt-0.5 text-sm text-muted">
                          {locale === "vi" ? item.note_vi : item.note_en}
                        </p>
                      </div>
                    </li>
                  ))
                : (
                    <li className="px-5 py-6 text-sm text-muted">
                      {status === "error" ? "Không tải lộ trình." : "Chưa có bước lộ trình trong CMS."}
                    </li>
                  )}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function TuitionTeaser({
  plans,
  status,
  settings,
}: {
  plans: Array<Record<string, unknown>>
  status: CmsStatus
  settings: Record<string, unknown>
}) {
  const { locale, t } = useLocale()
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const featured = plans[0]
  return (
    <section id="hoc-phi" className="bg-mist py-16 md:py-20">
      <div className="mx-auto max-w-[85%]">
        <div className="rounded-[3px] bg-primary px-8 py-12 text-white md:flex md:items-end md:justify-between md:px-12 md:py-14">
          <Reveal>
            <p className="overline !text-white/80">{t.tuition.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2rem,3.8vw,3rem)] font-black tracking-tight">
              {featured ? pickLocale(featured, locale, "name") || t.tuition.title : t.tuition.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              {status === "ok" && featured
                ? pickLocale(featured, locale, "description")
                : `${t.tuition.leadBefore} 15 triệu VND ${t.tuition.leadAfter} ${year}.`}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href={ROUTES.tuition}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-8 md:mt-0")}
            >
              {t.tuition.cta}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function ApplyCta() {
  const { t } = useLocale()
  return (
    <section id="xet-tuyen" className="bg-mist py-16 md:py-20">
      <div className="mx-auto max-w-[85%]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[3px] border border-border bg-surface px-8 py-10 shadow-hairline md:flex-row md:items-center md:px-12 md:py-12">
            <div>
              <p className="overline">{t.apply.eyebrow}</p>
              <h2 className="mt-3 text-[clamp(1.85rem,3vw,2.5rem)] font-black tracking-tight text-brand-navy">
                {t.apply.title}
              </h2>
              <p className="mt-3 max-w-xl text-muted">{t.apply.lead}</p>
            </div>
            <Link href={ROUTES.apply} className={cn(buttonVariants({ size: "lg" }), "shrink-0")}>
              {t.apply.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function StudentLifePreview({ settings }: { settings: Record<string, unknown> }) {
  const { locale, t } = useLocale()
  const img1 = String(settings.life_image_1_url ?? "/media/students-collab.jpg").replaceAll('"', "")
  const img2 = String(settings.life_image_2_url ?? "/media/students-study.jpg").replaceAll('"', "")
  return (
    <section id="student-life" className="bg-mist py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="overline text-accent-cobalt">{t.life.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.5vw,2.75rem)] font-medium tracking-tight text-brand-navy">
            {t.life.title}
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted">{t.life.lead}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <HoverLift>
              <div className="overflow-hidden rounded-xl border border-border shadow-hairline">
                <MotionImage
                  src={img1}
                  alt={locale === "vi" ? "Đời sống sinh viên VMIT" : "VMIT student life"}
                  width={1200}
                  height={800}
                  className="h-72 w-full md:h-[22rem]"
                  frameClassName="w-full"
                />
              </div>
            </HoverLift>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-2">
            <HoverLift>
              <div className="overflow-hidden rounded-xl border border-border shadow-hairline">
                <MotionImage
                  src={img2}
                  alt={locale === "vi" ? "Không gian học tập VMIT" : "VMIT learning spaces"}
                  width={900}
                  height={800}
                  className="h-72 w-full md:h-[22rem]"
                  frameClassName="w-full"
                />
              </div>
            </HoverLift>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
