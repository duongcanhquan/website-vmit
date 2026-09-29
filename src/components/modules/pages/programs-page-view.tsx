"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MotionImage } from "@/components/common/motion-image"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { Reveal } from "@/components/common/reveal"
import { StoryFrame, useActiveStep } from "@/components/modules/pages/pathway-scrolly"
import { ProgramSubjects } from "@/components/modules/pages/program-subjects"
import { isSubjectTrack } from "@/components/modules/pages/program-subjects-data"
import {
  PROGRAM_SECTION_IDS,
  programStory,
  type ProgramTrack,
} from "@/components/modules/pages/program-story-data"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { MEDIA } from "@/constants/media"
import { ROUTES } from "@/constants/site"
import { cn } from "@/lib/utils"

const stepClass = "scroll-mt-36 flex min-h-[64svh] flex-col justify-center py-10 lg:min-h-[78svh] lg:py-16"

function StepPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl lg:hidden">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  )
}

function TrackStory({ track }: { track: ProgramTrack }) {
  const { locale } = useLocale()
  const story = programStory(locale)
  const ids = track.steps.map((step) => step.id)
  const active = useActiveStep(ids)
  const here = track.steps[active]

  return (
    <section id={track.id} className="scroll-mt-32 border-t border-border bg-mist">
      <div className="mx-auto grid w-full max-w-[85%] items-center gap-8 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            {track.index} · {track.standard}
          </p>
          <h2 className="mt-3 font-display text-4xl text-brand-navy md:text-5xl">{track.name}</h2>
          <p className="mt-4 text-xl font-semibold text-brand-navy">{track.promise}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{track.lead}</p>
          <p className="mt-5 inline-flex rounded-[3px] bg-primary px-3 py-1.5 text-sm font-bold text-white">
            {track.salary}
          </p>
        </Reveal>
        <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-brand-navy">
          <Image src={track.image} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>

      {isSubjectTrack(track.id) ? <ProgramSubjects trackId={track.id} /> : null}

      <div className="mx-auto w-full max-w-[85%] pt-16 md:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          {locale === "vi" ? "Lộ trình theo học kỳ" : "Term-by-term roadmap"}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[85%] lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          {track.steps.map((step, index) => {
            const current = index === active
            return (
              <article
                key={step.id}
                id={step.id}
                aria-current={current ? "step" : undefined}
                className={stepClass}
              >
                <StepPhoto src={step.image} alt={`${step.title} — ${track.name}`} />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{step.code}</p>
                <h3
                  className={cn(
                    "mt-2 font-display text-3xl text-brand-navy motion-safe:transition-colors motion-safe:duration-300 md:text-4xl",
                    !current && "motion-safe:lg:text-muted",
                  )}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-brand-navy/70">{step.unit}</p>
                <ul className="mt-4 max-w-xl space-y-2 text-base text-brand-navy/90">
                  {step.learn.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-muted">{story.toolsLabel}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {step.tools.map((tool) => (
                    <li key={tool} className="rounded-[3px] bg-sky px-2.5 py-1 text-sm font-semibold text-brand-navy">
                      {tool}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{step.application}</p>
                <p className="mt-5 max-w-xl rounded-[3px] bg-primary px-4 py-3 text-sm font-semibold text-white">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                    {story.outputLabel}
                  </span>
                  {step.output}
                </p>
              </article>
            )
          })}
        </div>
        <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
          <div className="sticky top-36 h-[calc(100svh-10rem)]">
            <StoryFrame
              active={active}
              frames={track.steps.map((step) => ({ src: step.image }))}
              labels={track.steps.map((step) => ({ code: step.code, title: step.title }))}
            />
            <p className="sr-only">{here?.title}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProgramsPageView({ settings }: { settings: Record<string, unknown> }) {
  const { locale } = useLocale()
  const story = programStory(locale)
  const sectionIndex = useActiveStep(PROGRAM_SECTION_IDS)
  const heroButton =
    "border border-white/30 bg-transparent text-white shadow-none hover:bg-white hover:text-primary"

  return (
    <>
      <SiteHeader settings={settings} overHero />
      <main className="bg-mist text-brand-navy">
        <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-hero-sky text-white md:min-h-[88svh]">
          <MotionImage
            src={MEDIA.studentsCollab}
            alt=""
            fill
            priority
            sizes="100vw"
            zoom={1}
            frameClassName="absolute inset-0 h-full w-full"
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
          <Reveal className="relative z-10 mx-auto w-full max-w-[92%] py-24 md:max-w-[85%] md:py-36">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/90">{story.heroEyebrow}</p>
            <h1 className="@container mt-3 w-full max-w-4xl font-black leading-[1.12] tracking-tight">
              {story.heroTitle.split("\n").map((line) => (
                <span key={line} className="block text-balance text-[clamp(1.35rem,5cqi,3.35rem)]">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg">{story.heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ROUTES.apply} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                {story.applyLabel}
                <ArrowRight className="size-4" />
              </Link>
              <a href="#programs" className={cn(buttonVariants({ size: "lg" }), heroButton)}>
                {story.scrollHint}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </section>

        <section className="bg-brand-navy text-white">
          <div className="mx-auto max-w-[85%] py-14 md:py-16">
            <h2 className="font-display text-2xl md:text-3xl">{story.guaranteesTitle}</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {story.guarantees.map((item, index) => (
                <li key={item.title} className="rounded-[3px] border border-white/15 bg-white/5 p-5">
                  <span className="text-sm font-black text-primary">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div id="programs" className="sticky top-16 z-40 border-b border-border bg-surface/95 backdrop-blur md:top-[7.25rem]">
          <nav
            aria-label={story.switchLabel}
            className="mx-auto flex w-full max-w-[85%] gap-2 overflow-x-auto py-3"
          >
            {story.tracks.map((track, index) => {
              const current = index === sectionIndex
              return (
                <a
                  key={track.id}
                  href={`#${track.id}`}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "shrink-0 rounded-[3px] px-4 py-2.5 text-sm font-bold transition-colors duration-150 active:scale-95",
                    current ? "bg-primary text-white" : "bg-mist text-brand-navy hover:text-primary",
                  )}
                >
                  {track.index} {track.name}
                </a>
              )
            })}
          </nav>
        </div>

        {story.tracks.map((track) => (
          <TrackStory key={track.id} track={track} />
        ))}

        <section className="bg-brand-navy text-white">
          <div className="mx-auto flex max-w-[85%] flex-col items-start gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{story.closeEyebrow}</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">{story.closeTitle}</h2>
              <p className="mt-4 text-base text-white/80 md:text-lg">{story.closeLead}</p>
            </div>
            <Link href={ROUTES.apply} className={cn(buttonVariants({ variant: "primary", size: "lg" }), "shrink-0")}>
              {story.applyLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
