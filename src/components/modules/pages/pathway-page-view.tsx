"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { MotionImage } from "@/components/common/motion-image"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { Reveal, Stagger, staggerItem } from "@/components/common/reveal"
import { MetroBoard, RouteBoard, useActiveStep } from "@/components/modules/pages/pathway-scrolly"
import { ROUTE_IDS, STATION_IDS, pathwayStory } from "@/components/modules/pages/pathway-story-data"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { MEDIA } from "@/constants/media"
import { ROUTES, SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"

const stepClass =
  "scroll-mt-28 flex min-h-[52svh] flex-col justify-center py-14 lg:min-h-[78svh] lg:py-20"

export function PathwayPageView({ settings }: { settings: Record<string, unknown> }) {
  const { locale, t } = useLocale()
  const story = pathwayStory(locale)
  const year = settingText(settings.admission_year, locale) || SITE.admissionYear
  const stationIndex = useActiveStep(STATION_IDS)
  const routeIndex = useActiveStep(ROUTE_IDS)
  const station = story.stations[stationIndex]
  const route = story.routes[routeIndex]
  const heroButton =
    "border border-white/30 bg-transparent text-white shadow-none hover:bg-white hover:text-primary"

  return (
    <>
      <SiteHeader settings={settings} overHero />
      <a
        href="#cam-ket"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-24 focus:z-[60] focus:rounded-[3px] focus:bg-surface focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-brand-navy focus:shadow-button"
      >
        {story.skip}
      </a>
      <main className="bg-mist text-brand-navy">
        <section className="relative flex min-h-svh items-center overflow-hidden bg-hero-sky text-white">
          <MotionImage
            src={MEDIA.campusArchitecture}
            alt=""
            fill
            priority
            sizes="100vw"
            zoom={1}
            frameClassName="absolute inset-0 h-full w-full"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
          <Reveal className="relative z-10 mx-auto w-full max-w-[85%] py-36 md:py-44">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/90">{story.heroEyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.35rem,5vw,3.6rem)] font-black leading-[1.12] tracking-tight">
              {story.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/95 md:text-lg">{story.heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ROUTES.apply} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                {t.nav.apply} {year}
                <ArrowRight className="size-4" />
              </Link>
              <a href="#hanh-trinh" className={cn(buttonVariants({ size: "lg" }), heroButton)}>
                {story.scrollHint}
                <ArrowRight className="size-4" />
              </a>
            </div>
            <nav aria-label={story.stationNav} className="mt-6 flex flex-wrap gap-2">
              {story.stations.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(buttonVariants({ size: "sm" }), heroButton, "h-11 px-4")}
                >
                  {item.code}
                </a>
              ))}
              <a href="#bon-tuyen" className={cn(buttonVariants({ size: "sm" }), heroButton, "h-11 px-4")}>
                {story.routesEyebrow}
              </a>
            </nav>
          </Reveal>
        </section>

        <section id="hanh-trinh" aria-labelledby="hanh-trinh-title">
          <div className="mx-auto w-full max-w-[85%] pt-16 md:pt-24">
            <p className="overline">{story.journeyEyebrow}</p>
            <h2 id="hanh-trinh-title" className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
              {story.journeyTitle}
            </h2>
            <p className="mt-4 max-w-xl text-muted">{story.journeyLead}</p>
          </div>

          <div className="sticky top-16 z-30 border-b border-border bg-surface/95 backdrop-blur md:top-28 lg:hidden">
            <div className="mx-auto flex w-full max-w-[85%] items-center gap-3 py-2">
              <nav aria-label={story.stationNav} className="flex">
                {story.stations.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={index === stationIndex ? "step" : undefined}
                    className="inline-flex size-11 items-center justify-center"
                  >
                    <span
                      className={cn(
                        "size-2.5 rounded-full",
                        index === stationIndex ? "bg-primary" : index < stationIndex ? "bg-primary/40" : "bg-border",
                      )}
                    />
                    <span className="sr-only">{item.code}</span>
                  </a>
                ))}
              </nav>
              <p className="min-w-0 truncate text-sm font-semibold">
                {station?.code}
                <span className="font-normal text-muted"> · {station?.title}</span>
              </p>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-[85%] lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              {story.stations.map((item, index) => {
                const here = index === stationIndex
                return (
                  <article
                    key={item.id}
                    id={item.id}
                    aria-current={here ? "step" : undefined}
                    className={stepClass}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{item.code}</p>
                    <h3
                      className={cn(
                        "mt-3 font-display text-4xl text-brand-navy motion-safe:transition-colors motion-safe:duration-300 md:text-5xl",
                        !here && "motion-safe:lg:text-muted",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg text-brand-navy/80">{item.subtitle}</p>
                    <p className="mt-4 text-sm font-semibold text-muted">{item.when}</p>
                    <p className="mt-4 max-w-xl text-base text-brand-navy/90 md:text-lg">{item.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {item.marks.map((mark) => (
                        <li
                          key={mark}
                          className="rounded-[3px] border border-border bg-sky px-3 py-2 text-sm font-semibold text-brand-navy"
                        >
                          {mark}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
            <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
              <div className="sticky top-28 h-[calc(100svh-8rem)]">
                <MetroBoard active={stationIndex} nowAt={story.nowAt} stations={story.stations} />
              </div>
            </div>
          </div>
        </section>

        <section id="bon-tuyen" aria-labelledby="bon-tuyen-title" className="border-t border-border bg-surface">
          <div className="mx-auto w-full max-w-[85%] pt-16 md:pt-24">
            <p className="overline">{story.routesEyebrow}</p>
            <h2 id="bon-tuyen-title" className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
              {story.routesTitle}
            </h2>
            <p className="mt-4 max-w-xl text-muted">{story.routesLead}</p>
          </div>

          <div className="sticky top-16 z-30 border-b border-border bg-surface/95 backdrop-blur md:top-28 lg:hidden">
            <div className="mx-auto flex w-full max-w-[85%] items-center gap-3 py-3">
              <span className="size-2.5 shrink-0 rounded-full bg-primary" />
              <p className="min-w-0 truncate text-sm font-semibold">
                {route?.name}
                <span className="font-normal text-muted"> · {route?.epithet}</span>
              </p>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-[85%] lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              {story.routes.map((item, index) => {
                const here = index === routeIndex
                return (
                  <article
                    key={item.id}
                    id={item.id}
                    aria-current={here ? "step" : undefined}
                    className={stepClass}
                  >
                    <div
                      className={cn(
                        "border-l-2 pl-6 motion-safe:transition-colors motion-safe:duration-300",
                        here ? "border-primary" : "border-transparent",
                      )}
                    >
                      <p className="overline">{item.epithet}</p>
                      <h3 className="mt-3 font-display text-4xl text-brand-navy md:text-5xl">{item.name}</h3>
                      <p className="mt-4 max-w-xl text-base text-brand-navy/90 md:text-lg">{item.body}</p>
                      <ul className="mt-6 space-y-2">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-sm font-semibold md:text-base">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
            <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
              <div className="sticky top-28 h-[calc(100svh-8rem)]">
                <RouteBoard active={routeIndex} routes={story.routes} />
              </div>
            </div>
          </div>
        </section>

        <section id="cong-nhan" aria-labelledby="cong-nhan-title" className="border-t border-border">
          <div className="mx-auto w-full max-w-[85%] py-16 md:py-24">
            <p className="overline">{story.proofEyebrow}</p>
            <h2 id="cong-nhan-title" className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
              {story.proofTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{story.proofLead}</p>
            <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
              {story.proofFacts.map((fact) => (
                <motion.article
                  key={fact.value}
                  variants={staggerItem}
                  className="rounded-xl border border-border bg-surface p-6 shadow-hairline"
                >
                  <p className="font-display text-4xl text-primary">{fact.value}</p>
                  <p className="mt-3 text-sm text-brand-navy/85">{fact.label}</p>
                </motion.article>
              ))}
            </Stagger>

            <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-surface shadow-hairline">
              <table className="w-full min-w-[720px] text-left text-sm">
                <caption className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {story.levelCaption}
                </caption>
                <thead>
                  <tr className="border-t border-border text-xs uppercase tracking-[0.08em] text-muted">
                    {story.levelHeads.map((head) => (
                      <th key={head} scope="col" className="px-5 py-3 font-semibold">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {story.levels.map((row) => (
                    <tr key={row.level} className={cn("border-t border-border", row.highlight && "bg-sky")}>
                      <th scope="row" className="px-5 py-4 font-semibold text-brand-navy">
                        {row.level}
                        {row.highlight ? (
                          <span className="ml-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary">VMIT</span>
                        ) : null}
                      </th>
                      <td className="px-5 py-4">{row.rqf}</td>
                      <td className="px-5 py-4">{row.vn}</td>
                      <td className="px-5 py-4">{row.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="thuc-chien" aria-labelledby="thuc-chien-title" className="border-t border-border bg-surface">
          <div className="mx-auto w-full max-w-[85%] py-16 md:py-24">
            <p className="overline">{story.practiceEyebrow}</p>
            <h2 id="thuc-chien-title" className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
              {story.practiceTitle}
            </h2>
            <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
              {story.practice.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={staggerItem}
                  className="rounded-xl border border-border p-6 shadow-hairline"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-navy/85 md:text-base">{item.body}</p>
                </motion.article>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="sunderland" aria-labelledby="sunderland-title" className="border-t border-border">
          <div className="mx-auto w-full max-w-[85%] py-16 md:py-24">
            <p className="overline">{story.awardEyebrow}</p>
            <h2 id="sunderland-title" className="mt-3 max-w-3xl font-display text-3xl md:text-4xl">
              {story.awardTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{story.awardLead}</p>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {story.awardOptions.map((option) => (
                <article key={option.title} className="rounded-xl border border-border bg-surface p-6 shadow-hairline md:p-8">
                  <h3 className="font-display text-2xl">{option.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm md:text-base">
                    {option.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-border pt-4 text-sm font-semibold">{option.outcome}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-muted md:text-base">{story.awardNote}</p>
          </div>
        </section>

        <section id="mang-luoi" aria-labelledby="mang-luoi-title" className="border-t border-border bg-surface">
          <div className="mx-auto w-full max-w-[85%] py-16 md:py-24">
            <p className="overline">{story.networkEyebrow}</p>
            <h2 id="mang-luoi-title" className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
              {story.networkTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{story.networkLead}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {story.regions.map((region) => (
                <article key={region.name} className="rounded-xl border border-border p-6 shadow-hairline">
                  <h3 className="font-display text-xl">{region.name}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-brand-navy/85">
                    {region.schools.map((school) => (
                      <li key={school}>{school}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 space-y-1 border-t border-border pt-3 text-sm font-semibold">
                    {region.perks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cam-ket" aria-labelledby="cam-ket-title" className="border-t border-border">
          <div className="mx-auto w-full max-w-[85%] py-16 md:py-24">
            <p className="overline">{story.closeEyebrow}</p>
            <h2 id="cam-ket-title" className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
              {story.closeTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{story.closeLead}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {story.majors.map((major) => (
                <Link
                  key={major.title}
                  href={ROUTES.programs}
                  className="flex flex-col rounded-xl border border-border bg-surface p-6 shadow-hairline transition duration-500 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2"
                >
                  <h3 className="font-display text-2xl">{major.title}</h3>
                  <p className="mt-2 text-sm text-muted md:text-base">{major.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {t.programs.view}
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
            <h3 className="mt-12 font-display text-2xl">{story.commitmentsTitle}</h3>
            <ol className="mt-4 grid gap-3 md:grid-cols-2">
              {story.commitments.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-xl border border-border bg-surface p-5 shadow-hairline">
                  <span className="font-display text-2xl text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm md:text-base">{item}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={ROUTES.apply} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                {t.nav.apply} {year}
                <ArrowRight className="size-4" />
              </Link>
              <Link href={ROUTES.tuition} className={cn(buttonVariants({ variant: "outlineNavy", size: "lg" }))}>
                {t.nav.tuition}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
