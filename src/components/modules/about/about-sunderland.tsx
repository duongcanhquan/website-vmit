"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Check, GraduationCap, Plane, PiggyBank } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { ABOUT_MEDIA, SUNDERLAND } from "@/constants/about-content"
import { cn } from "@/lib/utils"
import { SectionHeading, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const

function SunderlandBanner() {
  const t = useT()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.05, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const yearX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])

  return (
    <div ref={ref} className="relative h-[88svh] min-h-[560px] overflow-hidden bg-brand-navy">
      <motion.div style={reduce ? undefined : { scale, y }} className="absolute inset-0">
        <Image
          src={ABOUT_MEDIA.sunderlandStPeters}
          alt={t({ vi: "Khuôn viên St Peter's của Đại học Sunderland bên sông Wear", en: "University of Sunderland St Peter's Campus on the River Wear" })}
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-[center_60%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      <motion.p
        aria-hidden
        style={reduce ? undefined : { x: yearX }}
        className="pointer-events-none absolute right-[-2%] top-[14%] select-none text-[clamp(7rem,22vw,20rem)] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.35)]"
      >
        {SUNDERLAND.since}
      </motion.p>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[85%] pb-14 text-white md:pb-20">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/25 px-2 text-[11px] tracking-normal text-white">
                05
              </span>
              {t({ vi: "Đặc quyền liên thông 1 năm · Vương quốc Anh", en: "One-year top-up privilege · United Kingdom" })}
            </p>
            <h2 className="mt-4 text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.02] tracking-tight">
              {t(SUNDERLAND.title)}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{t(SUNDERLAND.lead)}</p>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

function Options() {
  const t = useT()
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState(SUNDERLAND.options[0].key)
  const option = SUNDERLAND.options.find((o) => o.key === selected) ?? SUNDERLAND.options[0]

  return (
    <div className="mt-12">
      <div role="tablist" className="inline-flex rounded-full bg-mist p-1.5 shadow-inner">
        {SUNDERLAND.options.map((o) => {
          const isActive = o.key === selected
          const Icon = o.key === "uk" ? Plane : GraduationCap
          return (
            <button
              key={o.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelected(o.key)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors md:px-7 md:text-base",
                isActive ? "text-white" : "text-brand-navy hover:text-primary",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="sunderland-tab"
                  className="absolute inset-0 rounded-full bg-primary shadow-button"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <Icon className="relative size-4" />
              <span className="relative">{t(o.tab)}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={option.key}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease }}
          className="mt-8 grid overflow-hidden rounded-[8px] bg-white shadow-hairline lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative min-h-[280px]">
            <Image src={option.image} alt={t(option.tab)} fill sizes="(max-width:1024px) 90vw, 45vw" className="object-cover" />
          </div>
          <div className="p-7 md:p-10">
            <ul className="space-y-4">
              {option.points.map((point, i) => (
                <motion.li
                  key={point.vi}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-brand-navy md:text-base"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {t(point)}
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 rounded-[6px] bg-sky p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                {t({ vi: "Bằng cấp đầu ra", en: "Awarded degree" })}
              </p>
              <p className="mt-2 font-semibold leading-relaxed text-brand-navy">{t(option.degree)}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Gallery() {
  const t = useT()
  const reduce = useReducedMotion()
  return (
    <div className="mt-20 grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[240px] lg:grid-cols-4">
      {SUNDERLAND.gallery.map((item, i) => (
        <motion.figure
          key={item.src}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: i * 0.08 }}
          className={cn(
            "group relative overflow-hidden rounded-[6px]",
            i === 0 && "col-span-2 row-span-2",
          )}
        >
          <Image
            src={item.src}
            alt={t(item.caption)}
            fill
            sizes={i === 0 ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
          <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-4 text-sm font-bold text-white transition-transform duration-500 group-hover:translate-y-0 md:text-base">
            {t(item.caption)}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

function Savings() {
  const t = useT()
  const reduce = useReducedMotion()
  const s = SUNDERLAND.savings
  const rows = [
    { label: t(s.abroad), value: t(s.abroadValue), width: 1, tone: "bg-brand-navy/80" },
    { label: t(s.vmit), value: t(s.vmitValue), width: 0.36, tone: "bg-gradient-to-r from-primary to-[#5fe0d4]" },
  ]

  return (
    <div className="mt-20 grid gap-10 rounded-[8px] bg-[#0a1615] p-8 text-white md:p-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
      <Reveal>
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/20 text-primary">
          <PiggyBank className="size-7" />
        </span>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-primary">
          {t({ vi: "Hiệu quả kinh tế vượt trội", en: "Outstanding value for money" })}
        </p>
        <p className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-black leading-tight">{t(s.headline)}</p>
        <p className="mt-3 text-white/65">{t(s.note)}</p>
      </Reveal>

      <motion.div
        className="space-y-8"
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {rows.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-semibold text-white/75 md:text-base">{row.label}</p>
              <p className="shrink-0 text-lg font-black md:text-xl">{row.value}</p>
            </div>
            <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={cn("h-full origin-left rounded-full", row.tone)}
                style={{ width: `${row.width * 100}%` }}
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { duration: 1.4, ease, delay: i * 0.35 } },
                }}
              />
            </div>
          </div>
        ))}
        <p className="text-xs text-white/45">
          {t({
            vi: "Ước tính chi phí trọn gói (học phí + sinh hoạt) theo tài liệu chương trình.",
            en: "Estimated all-in costs (tuition + living), based on programme materials.",
          })}
        </p>
      </motion.div>
    </div>
  )
}

export function AboutSunderland() {
  const t = useT()
  return (
    <section id="sunderland" className="relative scroll-mt-20 bg-white">
      <SunderlandBanner />
      <div className="mx-auto max-w-[85%] py-20 md:py-28">
        <SectionHeading
          eyebrow={t({ vi: "Cơ chế liên thông trực tiếp", en: "Direct progression" })}
          title={t({ vi: "Top-up 1 năm – 2 phương thức linh hoạt", en: "A one-year top-up – two flexible options" })}
          lead={t(SUNDERLAND.mechanism)}
        />
        <Options />
        <Gallery />
        <Savings />
      </div>
    </section>
  )
}
