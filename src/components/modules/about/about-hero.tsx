"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight, BadgeCheck, MapPin } from "lucide-react"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ABOUT_HERO, ABOUT_MEDIA } from "@/constants/about-content"
import { ROUTES, SITE } from "@/constants/site"
import { cn } from "@/lib/utils"
import { GridBackdrop, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const

/** Route pins in the collage's 100×100 coordinate space. */
const PINS = [
  { x: 14, y: 78 },
  { x: 52, y: 30 },
  { x: 86, y: 58 },
]
const ROUTE_PATH = "M14 78 C 24 40, 40 26, 52 30 S 78 70, 86 58"

export function AboutHero({ year }: { year?: string }) {
  const t = useT()
  const { t: messages } = useLocale()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -140])
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -220])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const words = t(ABOUT_HERO.title).split(" ")

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#0a1615] text-white">
      <div aria-hidden className="absolute -left-40 top-10 size-[520px] rounded-full bg-primary/25 blur-[120px]" />
      <div aria-hidden className="absolute -right-32 bottom-0 size-[460px] rounded-full bg-[#2b6cb0]/20 blur-[120px]" />
      <GridBackdrop />

      <motion.div
        style={reduce ? undefined : { opacity: fade }}
        className="relative z-10 mx-auto grid min-h-[100svh] max-w-[85%] items-center gap-14 pb-24 pt-40 lg:grid-cols-[1.05fr_1fr] lg:pt-44"
      >
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            {t(ABOUT_HERO.eyebrow)}
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] font-black leading-[1.05] tracking-tight">
            <span className="sr-only">
              {t(ABOUT_HERO.title)} — {t(ABOUT_HERO.highlight)}
            </span>
            <span aria-hidden className="block">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="mr-[0.25em] inline-block"
                  initial={reduce ? false : { opacity: 0, y: "0.6em", rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.08 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span
              aria-hidden
              className="mt-2 block bg-gradient-to-r from-primary via-[#5fe0d4] to-white bg-clip-text text-transparent"
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.55 }}
            >
              {t(ABOUT_HERO.highlight)}
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
          >
            {t(ABOUT_HERO.lead)}
          </motion.p>

          <motion.ul
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }}
            className="mt-7 flex flex-wrap gap-2.5"
          >
            {ABOUT_HERO.chips.map((chip) => (
              <motion.li
                key={chip.vi}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15"
              >
                <BadgeCheck className="size-4 text-primary" />
                {t(chip)}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.1 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#lo-trinh" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              {t(ABOUT_HERO.ctaJourney)}
              <ArrowDown className="size-4" />
            </a>
            <Link
              href={ROUTES.apply}
              className={cn(
                buttonVariants({ size: "lg" }),
                "border border-white/30 bg-transparent text-white shadow-none hover:bg-white hover:text-primary",
              )}
            >
              {messages.nav.apply} {year || SITE.admissionYear}
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-[1/1] w-full max-w-[560px] lg:max-w-none">
          <motion.div
            style={reduce ? undefined : { y: yBack }}
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="absolute left-0 top-[4%] w-[74%] overflow-hidden rounded-[6px] shadow-2xl ring-1 ring-white/15"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={ABOUT_MEDIA.journey}
                alt={t({ vi: "Sinh viên VMIT trên hành trình học tập", en: "VMIT students on their learning journey" })}
                fill
                priority
                sizes="(max-width:1024px) 80vw, 36vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: yMid }}
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.45 }}
            className="absolute bottom-[6%] right-0 w-[62%] overflow-hidden rounded-[6px] shadow-2xl ring-4 ring-[#0a1615]"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={ABOUT_MEDIA.sunderlandStPeters}
                alt={t({ vi: "Khuôn viên St Peter's – Đại học Sunderland", en: "St Peter's Campus – University of Sunderland" })}
                fill
                sizes="(max-width:1024px) 60vw, 30vw"
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 rounded-[3px] bg-black/55 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                University of Sunderland · UK
              </span>
            </div>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: yFront }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
            className="absolute bottom-[26%] left-[6%] w-[34%] overflow-hidden rounded-full shadow-2xl ring-4 ring-primary"
          >
            <div className="relative aspect-square">
              <Image
                src={ABOUT_MEDIA.london}
                alt={t({ vi: "Sinh viên Việt Nam du học tại London", en: "Vietnamese students in London" })}
                fill
                sizes="(max-width:1024px) 34vw, 16vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <motion.path
              d={ROUTE_PATH}
              fill="none"
              stroke="#1eb2a6"
              strokeWidth={0.6}
              strokeDasharray="1.6 1.4"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.9 }}
            />
            {!reduce ? (
              <motion.circle
                r={1.3}
                fill="#fff"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2, delay: 3 }}
                style={{ offsetPath: `path("${ROUTE_PATH}")` }}
              />
            ) : null}
          </svg>

          {PINS.map((pin, i) => (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              initial={reduce ? false : { opacity: 0, y: -12, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease, delay: 1.1 + i * 0.55 }}
            >
              <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-brand-navy shadow-lg">
                <MapPin className="size-3.5 text-primary" />
                {t(ABOUT_HERO.route[i])}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#dinh-vi"
        aria-label={t({ vi: "Cuộn xuống", en: "Scroll down" })}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 md:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        {t({ vi: "Bắt đầu hành trình", en: "Start the journey" })}
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <motion.span
            className="size-1.5 rounded-full bg-white"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  )
}
