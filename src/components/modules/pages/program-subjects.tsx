"use client"

import Image from "next/image"
import { useRef, useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, Check, Quote, Trophy, Wrench, Zap } from "lucide-react"
import {
  PROGRAM_SUBJECTS,
  type ProgramSubject,
  type SubjectTrackId,
} from "@/components/modules/pages/program-subjects-data"
import { useLocale } from "@/components/providers/locale-provider"
import { cn } from "@/lib/utils"

const COPY = {
  vi: {
    eyebrow: "Chi tiết môn học",
    title: (n: number) => `${n} môn học: học gì, có ích gì, dùng vào đâu`,
    subjects: "môn học",
    artifacts: "sản phẩm portfolio",
    tools: "công cụ làm chủ",
    learn: "Môn học đem lại",
    benefit: "Vũ khí nghề nghiệp",
    artifact: "Sản phẩm cầm tay",
    toolsLabel: "Công cụ làm chủ",
    prev: "Môn trước",
    next: "Môn tiếp theo",
    list: "Danh sách môn học",
  },
  en: {
    eyebrow: "Subject details",
    title: (n: number) => `${n} subjects: what you learn, why it matters, where you use it`,
    subjects: "subjects",
    artifacts: "portfolio pieces",
    tools: "tools mastered",
    learn: "What this subject gives you",
    benefit: "Career edge",
    artifact: "What you leave with",
    toolsLabel: "Tools you master",
    prev: "Previous subject",
    next: "Next subject",
    list: "Subject list",
  },
}

const pad = (n: number) => String(n).padStart(2, "0")

export function ProgramSubjects({ trackId }: { trackId: SubjectTrackId }) {
  const { locale } = useLocale()
  const copy = COPY[locale] ?? COPY.vi
  const subjects = PROGRAM_SUBJECTS[trackId]
  const [active, setActive] = useState(0)
  const chipsRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const reduce = useReducedMotion()
  const subject = subjects[active]
  const toolCount = new Set(subjects.flatMap((item) => item.tools)).size
  const panelId = `${trackId}-subject-panel`

  function select(index: number, focus = false) {
    const next = (index + subjects.length) % subjects.length
    setActive(next)
    const strip = chipsRef.current
    const chip = strip?.children[next] as HTMLElement | undefined
    if (strip && chip) {
      strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
    }
    if (focus) tabsRef.current[next]?.focus()
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault()
      select(active + 1, true)
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault()
      select(active - 1, true)
    }
  }

  const stepper = (
    <div className="flex items-center gap-3">
      <p className="font-display text-2xl tabular-nums text-brand-navy">
        {pad(active + 1)}
        <span className="text-base text-muted-soft"> / {pad(subjects.length)}</span>
      </p>
      <button
        type="button"
        onClick={() => select(active - 1)}
        aria-label={copy.prev}
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-brand-navy transition hover:border-primary hover:text-primary active:scale-95"
      >
        <ArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => select(active + 1)}
        aria-label={copy.next}
        className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-white transition hover:bg-accent-teal-hover active:scale-95"
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  )

  return (
    <div id={`${trackId}-mon-hoc`} className="scroll-mt-48 border-t border-border bg-white">
      <div className="mx-auto w-full max-w-[85%] py-16 md:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{copy.eyebrow}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-brand-navy md:text-4xl">
              {copy.title(subjects.length)}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm font-semibold text-brand-navy">
              {[
                `${subjects.length} ${copy.subjects}`,
                `${subjects.length} ${copy.artifacts}`,
                `${toolCount} ${copy.tools}`,
              ].map((label) => (
                <li key={label} className="rounded-full bg-sky px-3 py-1.5">
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">{stepper}</div>
        </motion.div>

        <div
          ref={chipsRef}
          className="-mx-[8%] mt-8 flex snap-x scroll-px-[8%] gap-2 overflow-x-auto px-[8%] pb-2 [scrollbar-width:none] lg:hidden"
        >
          {subjects.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => select(index)}
              aria-pressed={index === active}
              className={cn(
                "flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                index === active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-brand-navy hover:border-primary",
              )}
            >
              <span className={index === active ? "text-white/80" : "text-primary"}>{pad(index + 1)}</span>
              <span className="max-w-[14rem] truncate">{item.title[locale].split(" & ")[0]}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-10 lg:mt-12 lg:grid-cols-12">
          <div
            role="tablist"
            aria-label={copy.list}
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="relative hidden self-start lg:sticky lg:top-48 lg:col-span-4 lg:block"
          >
            <span aria-hidden className="absolute bottom-7 left-[2.05rem] top-7 w-px bg-border" />
            <motion.span
              aria-hidden
              className="absolute left-[2.05rem] top-7 w-px origin-top bg-primary"
              style={{ height: "calc(100% - 3.5rem)" }}
              animate={{ scaleY: subjects.length > 1 ? active / (subjects.length - 1) : 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
            {subjects.map((item, index) => (
              <SubjectTab
                key={item.id}
                item={item}
                index={index}
                active={active}
                trackId={trackId}
                panelId={panelId}
                locale={locale}
                onSelect={() => select(index)}
                buttonRef={(node) => {
                  tabsRef.current[index] = node
                }}
              />
            ))}
          </div>

          <div id={panelId} role="tabpanel" aria-live="polite" className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <SubjectPanel
                key={subject.id}
                subject={subject}
                index={active}
                total={subjects.length}
                locale={locale}
                copy={copy}
                reduce={Boolean(reduce)}
              />
            </AnimatePresence>
            <div className="mt-8 flex justify-end md:hidden">{stepper}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubjectTab({
  item,
  index,
  active,
  trackId,
  panelId,
  locale,
  onSelect,
  buttonRef,
}: {
  item: ProgramSubject
  index: number
  active: number
  trackId: string
  panelId: string
  locale: "vi" | "en"
  onSelect: () => void
  buttonRef: (node: HTMLButtonElement | null) => void
}) {
  const current = index === active
  const passed = index < active
  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      aria-selected={current}
      aria-controls={panelId}
      tabIndex={current ? 0 : -1}
      onClick={onSelect}
      className="group relative flex w-full items-start gap-4 rounded-2xl px-3 py-3 text-left"
    >
      {current ? (
        <motion.span
          layoutId={`subject-pill-${trackId}`}
          className="absolute inset-0 rounded-2xl bg-sky ring-1 ring-primary/25"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : null}
      <span
        className={cn(
          "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 bg-white text-sm font-black tabular-nums transition-colors duration-300",
          current && "border-primary bg-primary text-white shadow-[0_0_0_6px_rgba(30,178,166,0.15)]",
          passed && "border-primary text-primary",
          !current && !passed && "border-border text-muted group-hover:border-primary/60",
        )}
      >
        {pad(index + 1)}
      </span>
      <span className="relative z-10 min-w-0">
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          {item.code} · {item.level}
        </span>
        <span
          className={cn(
            "mt-1 block text-[15px] font-bold leading-snug transition-colors",
            current ? "text-brand-navy" : "text-brand-navy/70 group-hover:text-brand-navy",
          )}
        >
          {item.title[locale]}
        </span>
      </span>
    </button>
  )
}

function SubjectPanel({
  subject,
  index,
  total,
  locale,
  copy,
  reduce,
}: {
  subject: ProgramSubject
  index: number
  total: number
  locale: "vi" | "en"
  copy: (typeof COPY)["vi"]
  reduce: boolean
}) {
  const ease = [0.22, 1, 0.36, 1] as const
  const list = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.25 } },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  }

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease }}
    >
      <motion.div
        className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-sky"
        initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0% round 16px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
        transition={{ duration: 0.7, ease }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease }}
        >
          <Image
            src={subject.image}
            alt={subject.title[locale]}
            fill
            sizes="(max-width: 1024px) 92vw, 56vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black tabular-nums text-brand-navy backdrop-blur">
          {pad(index + 1)} / {pad(total)}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              {subject.code}
            </span>
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
              {subject.level}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-lg font-bold leading-snug text-white md:text-2xl">{subject.course}</p>
        </div>
      </motion.div>

      <h4 className="mt-7 font-display text-2xl leading-tight text-brand-navy md:text-3xl">{subject.title[locale]}</h4>

      <motion.blockquote
        initial={reduce ? false : { opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 0.15, ease }}
        className="relative mt-5 rounded-r-2xl border-l-4 border-primary bg-sky py-4 pl-12 pr-5 text-base italic leading-relaxed text-brand-navy/90 md:text-lg"
      >
        <Quote className="absolute left-4 top-4 size-5 text-primary" aria-hidden />
        {subject.hook[locale]}
      </motion.blockquote>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5 md:p-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            <BadgeCheck className="size-4" aria-hidden />
            {copy.learn}
          </p>
          <motion.ul variants={list} initial="hidden" animate="show" className="mt-4 space-y-3">
            {subject.learn.map((line) => (
              <motion.li key={line.vi} variants={item} className="flex gap-3 text-[15px] leading-relaxed text-brand-navy/90">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span>{line[locale]}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="flex flex-col gap-5">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.3, ease }}
            className="rounded-2xl border border-primary/20 bg-sky p-5 md:p-6"
          >
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <Zap className="size-4" aria-hidden />
              {copy.benefit}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-brand-navy">{subject.benefit[locale]}</p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.42, ease }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent-teal-hover p-5 text-white md:p-6"
          >
            <Trophy className="absolute -right-3 -top-3 size-24 text-white/10" aria-hidden />
            <p className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/85">
              <Trophy className="size-4" aria-hidden />
              {copy.artifact}
            </p>
            <p className="relative mt-3 text-[15px] font-semibold leading-relaxed">{subject.artifact[locale]}</p>
          </motion.div>
        </div>
      </div>

      <div className="mt-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
          <Wrench className="size-4" aria-hidden />
          {copy.toolsLabel}
        </p>
        <motion.ul variants={list} initial="hidden" animate="show" className="mt-3 flex flex-wrap gap-2">
          {subject.tools.map((tool) => (
            <motion.li
              key={tool}
              variants={item}
              className="rounded-full border border-primary/30 bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-navy"
            >
              {tool}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.article>
  )
}
