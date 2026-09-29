"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { MotionImage } from "@/components/common/motion-image"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { Reveal, Stagger, staggerItem } from "@/components/common/reveal"
import { StoryFrame, useActiveStep } from "@/components/modules/pages/pathway-scrolly"
import { ROUTE_IDS, STATION_IDS, pathwayStory } from "@/components/modules/pages/pathway-story-data"
import {
  AWARD_FRAMES,
  FINALE_FRAME,
  LINE_FRAMES,
  MAJOR_FRAMES,
  PRACTICE_FRAMES,
  PROOF_FRAMES,
  REGION_FRAMES,
  STATION_FRAMES,
  frameAlt,
} from "@/components/modules/pages/pathway-visuals"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { MEDIA } from "@/constants/media"
import { ROUTES } from "@/constants/site"
import { cn } from "@/lib/utils"

const stepClass =
  "scroll-mt-28 flex min-h-[52svh] flex-col justify-center py-14 lg:min-h-[78svh] lg:py-20"

function StepPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl lg:hidden">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  )
}

export function PathwayPageView({ settings }: { settings: Record<string, unknown> }) {
  const { locale, t } = useLocale()
  const story = pathwayStory(locale)
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
            <h1 className="@container mt-3 w-full max-w-4xl font-black leading-[1.12] tracking-tight">
              <span className="block whitespace-nowrap text-[clamp(1.2rem,7.4cqi,3.5rem)]">{story.heroTitle}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/95 md:text-lg">{story.heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={ROUTES.apply}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "uppercase tracking-wide")}
              >
                {t.nav.apply}
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

          <div className="sticky top-[4.25rem] z-30 border-b border-border bg-surface/95 backdrop-blur lg:hidden">
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
                    <StepPhoto src={STATION_FRAMES[index].src} alt={frameAlt(STATION_FRAMES[index], locale)} />
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
                <StoryFrame
                  active={stationIndex}
                  frames={STATION_FRAMES}
                  labels={story.stations.map((item) => ({ code: item.code, title: item.title }))}
                />
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

          <div className="sticky top-[4.25rem] z-30 border-b border-border bg-surface/95 backdrop-blur lg:hidden">
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
                    <StepPhoto src={LINE_FRAMES[index].src} alt={frameAlt(LINE_FRAMES[index], locale)} />
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
                <StoryFrame
                  active={routeIndex}
                  frames={LINE_FRAMES}
                  labels={story.routes.map((item) => ({ code: item.epithet, title: item.name }))}
                />
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
              {story.proofFacts.map((fact, index) => (
                <motion.article
                  key={fact.value}
                  variants={staggerItem}
                  className="relative min-h-80 overflow-hidden rounded-xl shadow-hairline"
                >
                  <Image
                    src={PROOF_FRAMES[index].src}
                    alt={frameAlt(PROOF_FRAMES[index], locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                  <div className="relative flex min-h-80 flex-col justify-end p-6 text-white">
                    <p className="font-display text-4xl">{fact.value}</p>
                    <p className="mt-3 text-sm text-white/90">{fact.label}</p>
                  </div>
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
                  className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={PRACTICE_FRAMES[index].src}
                      alt={frameAlt(PRACTICE_FRAMES[index], locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                    <p className="mt-2 text-sm text-brand-navy/85 md:text-base">{item.body}</p>
                  </div>
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
              {story.awardOptions.map((option, index) => (
                <article key={option.title} className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={AWARD_FRAMES[index].src}
                      alt={frameAlt(AWARD_FRAMES[index], locale)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
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
                  </div>
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
              {story.regions.map((region, index) => (
                <article key={region.name} className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
                  <div className="relative h-44">
                    <Image
                      src={REGION_FRAMES[index].src}
                      alt={frameAlt(REGION_FRAMES[index], locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
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
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cam-ket" aria-labelledby="cam-ket-title" className="relative overflow-hidden bg-brand-navy text-white">
          <Image
            src={FINALE_FRAME.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/62 to-black/88" />
          <div className="relative mx-auto w-full max-w-[85%] py-20 md:py-28">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{story.closeEyebrow}</p>
            <h2 id="cam-ket-title" className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              {story.closeTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">{story.closeLead}</p>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {story.majors.map((major, index) => (
                <Link
                  key={major.title}
                  href={ROUTES.programs}
                  className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black md:min-h-[28rem]"
                >
                  <Image
                    src={MAJOR_FRAMES[index].src}
                    alt={frameAlt(MAJOR_FRAMES[index], locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  <div className="relative p-7 md:p-9">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-3xl md:text-4xl">{major.title}</h3>
                    <p className="mt-3 max-w-sm text-sm text-white/85 md:text-base">{major.body}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      {t.programs.view}
                      <ArrowRight className="size-4 motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 border-t border-white/15 pt-10">
              <h3 className="font-display text-2xl md:text-3xl">{story.commitmentsTitle}</h3>
              <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {story.commitments.map((item, index) => (
                  <li key={item}>
                    <span className="font-display text-4xl text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href={ROUTES.apply}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "uppercase tracking-wide")}
              >
                {t.nav.apply}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
