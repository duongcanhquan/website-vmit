"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { ArrowRight, CheckCircle2, Clock3, MapPin, TrainFront } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { LINE_FRAMES, STATION_FRAMES, frameAlt } from "@/components/modules/pages/pathway-visuals"
import type { PathwayStory, Station } from "@/components/modules/pages/pathway-story-data"
import type { Locale } from "@/lib/i18n/types"
import { cn } from "@/lib/utils"

const STATION_COLORS = ["#ffb020", "#1eb2a6", "#38a3f1", "#8b7cf6", "#ffffff"]
export const LINE_COLORS = ["#e53935", "#1e6fd9", "#8e44ad", "#16a34a"]

const RAIL_GRADIENT = `linear-gradient(180deg, ${STATION_COLORS[0]} 0%, ${STATION_COLORS[1]} 28%, ${STATION_COLORS[2]} 52%, ${STATION_COLORS[3]} 76%, #ffffff 100%)`
const HUB_RING = `conic-gradient(${LINE_COLORS[0]} 0 25%, ${LINE_COLORS[1]} 0 50%, ${LINE_COLORS[2]} 0 75%, ${LINE_COLORS[3]} 0 100%)`
const NIGHT = "#161c20"
const LED = "#ffb020"
const EASE = [0.22, 1, 0.36, 1] as const

function stationColor(index: number) {
  return STATION_COLORS[index] ?? "#ffffff"
}

function Roundel({ color, className }: { color: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative inline-flex size-5 shrink-0 items-center justify-center", className)}>
      <span className="absolute inset-0 rounded-full border-[4px]" style={{ borderColor: color }} />
      <span className="absolute h-1.5 w-7 rounded-[1px]" style={{ background: color }} />
    </span>
  )
}

function StationSign({ station, index, hub }: { station: Station; index: number; hub: boolean }) {
  return (
    <span className="flex overflow-hidden rounded-[3px] shadow-lg">
      <span
        className="flex items-center px-3 text-xs font-black uppercase tracking-wider"
        style={{ background: hub ? "#1c1c1c" : stationColor(index), color: hub ? "#fff" : "#1c1c1c" }}
      >
        {station.code}
      </span>
      <span className="bg-white px-3 py-1.5 text-sm font-black text-brand-navy">{station.title}</span>
    </span>
  )
}

export function BoardingPass({ story }: { story: PathwayStory }) {
  const reduce = useReducedMotion()
  const pass = story.pass
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, rotate: -9 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      className="relative w-full max-w-[26rem] text-brand-navy"
    >
      <div className="overflow-hidden rounded-[6px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between bg-primary px-5 py-3 text-white">
          <span className="text-xs font-black uppercase tracking-[0.2em]">{pass.label}</span>
          <span className="flex items-center gap-1.5 text-sm font-black">
            <TrainFront className="size-4" />
            {pass.train}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 px-5 pt-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{pass.from[0]}</p>
            <p className="mt-1 text-lg font-black leading-tight">{pass.from[1]}</p>
          </div>
          <span className="mb-1 flex items-center gap-1 text-primary" aria-hidden="true">
            <span className="h-0.5 w-6 bg-primary" />
            <TrainFront className="size-4" />
          </span>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{pass.to[0]}</p>
            <p className="mt-1 text-lg font-black leading-tight">{pass.to[1]}</p>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-3 px-5">
          {pass.rows.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{k}</dt>
              <dd className="mt-0.5 text-sm font-black">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-5 border-t-2 border-dashed border-border">
          <span className="absolute -left-3 -top-3 size-6 rounded-full bg-black/60" aria-hidden="true" />
          <span className="absolute -right-3 -top-3 size-6 rounded-full bg-black/60" aria-hidden="true" />
        </div>
        <div
          aria-hidden="true"
          className="mx-5 my-4 h-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #1c1c1c 0 2px, transparent 2px 4px, #1c1c1c 4px 7px, transparent 7px 9px, #1c1c1c 9px 10px, transparent 10px 13px)",
          }}
        />
      </div>
    </motion.div>
  )
}

function DepartureBoard({ story }: { story: PathwayStory }) {
  const reduce = useReducedMotion()
  const last = story.stations.length - 1
  return (
    <div className="overflow-hidden rounded-[3px] bg-black ring-1 ring-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-6">
        <p className="flex items-center gap-2.5 font-mono text-sm font-bold uppercase tracking-[0.14em] md:text-base" style={{ color: LED }}>
          <TrainFront className="size-5" />
          {story.boardTitle}
        </p>
        <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/70">
          <span className="size-2 animate-pulse rounded-full bg-[#22c55e]" />
          {story.boardClock}
        </p>
      </div>
      <div className="grid grid-cols-[4.75rem_1fr_auto] gap-x-2 px-4 sm:gap-x-3 pt-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/45 sm:grid-cols-[7rem_1fr_5rem_auto] md:px-6">
        <span>{story.boardHeads[0]}</span>
        <span>{story.boardHeads[1]}</span>
        <span className="hidden sm:block">{story.boardHeads[2]}</span>
        <span className="text-right">{story.boardHeads[3]}</span>
      </div>
      <ol className="px-2 pb-2 pt-1 md:px-3" style={{ perspective: 800 }}>
        {story.stations.map((station, index) => {
          const color = stationColor(index)
          const hub = index === last
          return (
            <motion.li
              key={station.id}
              initial={reduce ? false : { rotateX: -90, opacity: 0 }}
              whileInView={{ rotateX: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.12 * index, ease: EASE }}
              style={{ transformOrigin: "top" }}
            >
              <a
                href={`#${station.id}`}
                className="grid grid-cols-[4.75rem_1fr_auto] items-center gap-x-2 sm:gap-x-3 rounded-[3px] border-t border-white/10 px-2 py-3 transition-colors hover:bg-white/5 sm:grid-cols-[7rem_1fr_5rem_auto] md:px-3"
              >
                <span className="font-mono text-xs font-bold sm:text-sm md:text-base" style={{ color: LED }}>
                  {station.time}
                </span>
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{ background: hub ? HUB_RING : color, boxShadow: `0 0 12px ${hub ? "#fff" : color}` }}
                  />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-black leading-tight text-white sm:truncate sm:text-base md:text-lg">{station.title}</span>
                    <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
                      {station.code}
                    </span>
                  </span>
                </span>
                <span className="hidden sm:block">
                  <span className="inline-flex size-9 items-center justify-center rounded-[3px] bg-white/10 font-mono text-base font-black text-white">
                    {hub ? "⇄" : index}
                  </span>
                </span>
                <span
                  className={cn(
                    "justify-self-end whitespace-nowrap rounded-[3px] px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] md:text-xs",
                    index === 0 ? "animate-pulse bg-[#22c55e] text-black" : hub ? "bg-white text-black" : "text-[#22c55e]",
                  )}
                >
                  {station.status}
                </span>
              </a>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

function StationPanel({ story, active, locale }: { story: PathwayStory; active: number; locale: Locale }) {
  const reduce = useReducedMotion()
  const count = story.stations.length
  const last = count - 1
  const station = story.stations[active]
  const next = story.stations[active + 1]
  const hub = active === last

  return (
    <div className="relative h-[min(76svh,720px)] w-full overflow-hidden rounded-[3px] bg-black shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
      {STATION_FRAMES.map((frame, index) => {
        const here = index === active
        return (
          <motion.div
            key={frame.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: here ? 1 : 0, scale: here && !reduce ? 1 : 1.08 }}
            transition={{
              opacity: { duration: reduce ? 0 : 0.8, ease: EASE },
              scale: { duration: here && !reduce ? 9 : 0, ease: "easeOut" },
            }}
          >
            <Image
              src={frame.src}
              alt={here ? frameAlt(frame, locale) : ""}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        )
      })}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85" />

      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
        {station ? <StationSign station={station} index={active} hub={hub} /> : null}
        <span className="flex flex-col items-center rounded-[3px] bg-black/70 px-3 py-1.5 text-white backdrop-blur">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">{story.platform}</span>
          <span className="text-2xl font-black leading-none" style={{ color: stationColor(active) }}>
            {hub ? "⇄" : active}
          </span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-5 rounded-[3px] bg-black/65 p-4 backdrop-blur-md ring-1 ring-white/10">
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: LED }}>
              {hub ? story.lastStop : story.nextStation}
            </p>
            <motion.p
              key={active}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mt-1 flex items-center gap-2 text-xl font-black text-white"
            >
              {hub ? (
                <span className="flex gap-1" aria-hidden="true">
                  {LINE_COLORS.map((c) => (
                    <span key={c} className="h-4 w-2 rounded-[1px]" style={{ background: c }} />
                  ))}
                </span>
              ) : null}
              {hub ? story.routesEyebrow : next?.title}
              {!hub ? <ArrowRight className="size-5" style={{ color: stationColor(active + 1) }} /> : null}
            </motion.p>
          </div>

          <div className="relative h-8 w-60 shrink-0" aria-hidden="true">
            <span className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/20" />
            <motion.span
              className="absolute left-2 top-1/2 h-1 -translate-y-1/2 rounded-full"
              style={{ background: RAIL_GRADIENT.replace("180deg", "90deg") }}
              initial={false}
              animate={{ width: `calc(${(active / last) * 100}% - ${(active / last) * 16}px)` }}
              transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
            />
            {story.stations.map((s, i) => (
              <span
                key={s.id}
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                  left: `calc(8px + ${(i / last) * 100}% - ${(i / last) * 16}px)`,
                  borderColor: stationColor(i),
                  background: i <= active ? stationColor(i) : "#000",
                }}
              />
            ))}
            <motion.span
              className="absolute -top-5 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg"
              initial={false}
              animate={{ left: `calc(8px + ${(active / last) * 100}% - ${(active / last) * 16}px)` }}
              transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
            >
              <TrainFront className="size-4" />
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StationJourney({ story, active, locale }: { story: PathwayStory; active: number; locale: Locale }) {
  const reduce = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 55%", "end 55%"] })
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const last = story.stations.length - 1

  return (
    <section id="hanh-trinh" aria-labelledby="hanh-trinh-title" className="wrap-tidy text-white" style={{ background: NIGHT }}>
      <h2 id="hanh-trinh-title" className="sr-only">
        {story.stationNav}
      </h2>
      <div className="mx-auto w-full max-w-[85%] pt-16 md:pt-24">
        <Reveal>
          <DepartureBoard story={story} />
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[85%] pb-16 pt-14 md:pb-24 lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-6">
        <div ref={railRef} className="relative lg:col-span-5">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-11">
            <div
              className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 opacity-25"
              style={{ backgroundImage: "repeating-linear-gradient(180deg, #fff 0 2px, transparent 2px 16px)" }}
            />
            <div className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-white/15" />
            <motion.div
              className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 origin-top rounded-full"
              style={{ background: RAIL_GRADIENT, scaleY: reduce ? 1 : fill }}
            />
            <div className="sticky top-[50svh] z-20 flex size-11 items-center justify-center rounded-full bg-white text-brand-navy shadow-[0_0_0_6px_rgba(255,255,255,0.15),0_12px_30px_rgba(0,0,0,0.45)]">
              <TrainFront className="size-5" />
            </div>
          </div>

          <ol>
            {story.stations.map((station, index) => {
              const color = stationColor(index)
              const here = index === active
              const hub = index === last
              const frame = STATION_FRAMES[index]
              return (
                <li
                  key={station.id}
                  id={station.id}
                  aria-current={here ? "step" : undefined}
                  className="relative flex scroll-mt-28 flex-col justify-center py-12 pl-16 md:pl-20 lg:min-h-[80svh] lg:py-16"
                >
                  {hub ? (
                    <span aria-hidden="true" className="absolute bottom-[-4rem] left-0 top-1/2 w-11 md:bottom-[-6rem]" style={{ background: NIGHT }}>
                      <span className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 gap-[3px]">
                        {LINE_COLORS.map((c) => (
                          <span key={c} className="w-[3px]" style={{ background: c }} />
                        ))}
                      </span>
                    </span>
                  ) : null}
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-16 top-0 z-10 flex size-11 items-center justify-center rounded-full text-sm font-black motion-safe:transition-transform motion-safe:duration-300 md:-left-20",
                        here && "scale-110",
                      )}
                      style={{
                        background: hub ? HUB_RING : NIGHT,
                        border: hub ? "none" : `5px solid ${color}`,
                        boxShadow: here ? `0 0 0 7px ${hub ? "rgba(255,255,255,0.18)" : `${color}40`}` : "none",
                      }}
                    >
                      <span
                        className={cn("flex items-center justify-center rounded-full", hub && "size-7 bg-white text-brand-navy")}
                        style={hub ? undefined : { color }}
                      >
                        {hub ? "⇄" : index}
                      </span>
                    </span>

                    <div
                      className={cn(
                        "motion-safe:transition-opacity motion-safe:duration-500",
                        !here && "lg:opacity-45",
                      )}
                    >
                      <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color }}>
                        {station.code}
                      </p>
                      <h3 className="mt-2 font-display text-4xl text-white md:text-5xl lg:text-4xl xl:text-5xl">{station.title}</h3>
                      <p data-balance className="mt-2 text-xl font-bold md:text-2xl" style={{ color }}>
                        {station.subtitle}
                      </p>
                      <p data-balance className="mt-5 inline-flex items-start gap-2 rounded-[3px] bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                        <Clock3 className="mt-0.5 size-4 shrink-0" style={{ color }} />
                        {station.when}
                      </p>
                      <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{station.body}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {station.marks.map((mark) => (
                          <li
                            key={mark}
                            className="inline-flex items-center gap-2 rounded-[3px] border bg-white/5 px-3 py-2 text-sm font-bold text-white"
                            style={{ borderColor: color }}
                          >
                            <CheckCircle2 className="size-4" style={{ color }} />
                            {mark}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {frame ? (
                      <figure className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[3px] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 lg:hidden">
                        <Image src={frame.src} alt={frameAlt(frame, locale)} fill sizes="85vw" className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <figcaption className="absolute left-3 top-3">
                          <StationSign station={station} index={index} hub={hub} />
                        </figcaption>
                      </figure>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-28 flex h-[calc(100svh-8.5rem)] items-center">
            <StationPanel story={story} active={active} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  )
}

const TERMINAL_Y = [48, 116, 184, 252]
const linePath = (y: number) => `M 70 150 C 230 150, 230 ${y}, 390 ${y} L 860 ${y}`

function LineMap({ story }: { story: PathwayStory }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative mt-12 hidden aspect-[10/3] md:block" aria-hidden="true">
      <svg viewBox="0 0 1000 300" className="absolute inset-0 size-full overflow-visible">
        {TERMINAL_Y.map((y, i) => (
          <motion.path
            key={`line-${i}`}
            d={linePath(y)}
            fill="none"
            stroke={LINE_COLORS[i]}
            strokeWidth={10}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.3, delay: 0.15 * i, ease: EASE }}
          />
        ))}
        {!reduce
          ? TERMINAL_Y.map((y, i) => (
              <g key={`train-${i}`}>
                <rect x={-17} y={-8} width={34} height={16} rx={8} fill="#fff" stroke={LINE_COLORS[i]} strokeWidth={3} />
                <rect x={4} y={-4} width={8} height={8} rx={2} fill={LINE_COLORS[i]} />
                <animateMotion dur={`${6.5 + i * 0.8}s`} repeatCount="indefinite" rotate="auto" path={linePath(y)} />
              </g>
            ))
          : null}
        {TERMINAL_Y.map((y, i) => {
          const route = story.routes[i]
          return (
            <g key={`stop-${i}`}>
              <text x={372} y={y - 16} fontSize={18} fontWeight={900} letterSpacing={2} fill={LINE_COLORS[i]}>
                {route?.name.toUpperCase()}
                <tspan dx={12} fill="#1c1c1c" fontWeight={700} letterSpacing={0}>
                  {route?.destination}
                </tspan>
              </text>
              <circle cx={860} cy={y} r={20} fill="#fff" stroke={LINE_COLORS[i]} strokeWidth={9} />
              <text x={860} y={y + 7} textAnchor="middle" fontSize={19} fontWeight={900} fill="#1c1c1c">
                {i + 1}
              </text>
              <text x={895} y={y + 6} fontSize={15} fontWeight={800} letterSpacing={1.5} fill="#666">
                {story.platform.toUpperCase()}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="absolute left-[7%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="flex size-[4.5rem] items-center justify-center rounded-full shadow-lg" style={{ background: HUB_RING }}>
          <span className="flex size-12 items-center justify-center rounded-full bg-white text-xl font-black text-brand-navy">⇄</span>
        </span>
        <span className="absolute top-full mt-2 whitespace-nowrap text-xs font-black uppercase tracking-[0.14em] text-brand-navy">
          {story.stations[story.stations.length - 1]?.code}
        </span>
      </div>
    </div>
  )
}

export function RouteLines({ story, locale }: { story: PathwayStory; locale: Locale }) {
  return (
    <section id="bon-tuyen" aria-labelledby="bon-tuyen-title" className="wrap-tidy bg-surface">
      <div className="mx-auto w-full max-w-[85%] py-16 md:py-24">
        <Reveal>
          <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-primary">
            <span className="flex gap-[3px]" aria-hidden="true">
              {LINE_COLORS.map((c) => (
                <span key={c} className="h-3 w-1.5 rounded-[1px]" style={{ background: c }} />
              ))}
            </span>
            {story.routesEyebrow}
          </p>
          <h2 id="bon-tuyen-title" className="mt-3 font-display text-3xl text-brand-navy md:text-5xl">
            {story.routesTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-brand-navy/80 md:text-lg">{story.routesLead}</p>
        </Reveal>

        <LineMap story={story} />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {story.routes.map((route, i) => {
            const color = LINE_COLORS[i]
            const frame = LINE_FRAMES[i]
            return (
              <Reveal key={route.id} delay={0.06 * i} className="h-full">
                <article
                  id={route.id}
                  className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[3px] bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(0,0,0,0.45)]"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3 text-white md:px-5" style={{ background: color }}>
                    <span className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.12em]">
                      <span className="flex size-8 items-center justify-center rounded-[3px] bg-white text-base" style={{ color }}>
                        {i + 1}
                      </span>
                      {story.platform} {i + 1} · {route.name}
                    </span>
                    <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {frame ? (
                      <Image
                        src={frame.src}
                        alt={frameAlt(frame, locale)}
                        fill
                        sizes="(min-width: 768px) 42vw, 85vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <p className="absolute left-4 top-4 flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-2 pr-4 text-xs font-black uppercase tracking-[0.12em] text-brand-navy shadow-lg">
                      <Roundel color={color} />
                      {route.epithet}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                        <MapPin className="size-3.5" style={{ color }} />
                        {story.terminus}
                      </p>
                      <p data-balance className="mt-1 font-display text-2xl md:text-3xl">
                        {route.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col border-l-[6px] p-6 md:p-7" style={{ borderColor: color }}>
                    <p className="text-base leading-relaxed text-brand-navy/85">{route.body}</p>
                    <ul className="mt-5 grid gap-2.5">
                      {route.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm font-bold text-brand-navy md:text-base">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 md:mt-1" style={{ color }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
