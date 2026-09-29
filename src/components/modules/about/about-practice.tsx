"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { GRADES, PRACTICE_STEPS, QA_FLOW } from "@/constants/about-content"
import { cn } from "@/lib/utils"
import { SectionHeading, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const

function QaFlow() {
  const t = useT()
  const reduce = useReducedMotion()
  return (
    <div className="mt-6 rounded-[6px] border border-border bg-mist p-5">
      <ol className="flex flex-wrap items-center gap-2">
        {QA_FLOW.map((step, i) => (
          <motion.li
            key={step.vi}
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease, delay: i * 0.25 }}
            className="flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-bold text-brand-navy shadow-sm">
              <ShieldCheck className="size-4 text-primary" />
              {t(step)}
            </span>
            {i < QA_FLOW.length - 1 ? <ArrowRight className="size-4 text-primary" /> : null}
          </motion.li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-2">
        {GRADES.map((grade, i) => (
          <motion.span
            key={grade.vi}
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease, delay: 0.8 + i * 0.15 }}
            className={cn(
              "rounded-[3px] px-3 py-1 text-xs font-black uppercase tracking-wider",
              i === 0 && "bg-brand-navy/10 text-brand-navy",
              i === 1 && "bg-primary/15 text-primary",
              i === 2 && "bg-primary text-white",
            )}
          >
            {t(grade)}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function Step({ index, onActive }: { index: number; onActive: (i: number) => void }) {
  const t = useT()
  const step = PRACTICE_STEPS[index]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <div ref={ref} className="flex items-center py-6 lg:min-h-[72svh] lg:py-0">
      <article className={cn("w-full transition-opacity duration-500", !inView && "lg:opacity-35")}>
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[6px] lg:hidden">
          <Image src={step.image} alt={t(step.title)} fill sizes="90vw" className="object-cover" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">
          {String(index + 1).padStart(2, "0")} · {t(step.kicker)}
        </p>
        <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] font-black leading-tight text-brand-navy">{t(step.title)}</h3>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{t(step.body)}</p>
        {index === PRACTICE_STEPS.length - 1 ? <QaFlow /> : null}
      </article>
    </div>
  )
}

export function AboutPractice() {
  const t = useT()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const current = PRACTICE_STEPS[active]

  return (
    <section id="thuc-chien" className="relative scroll-mt-20 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[85%]">
        <SectionHeading
          index="03"
          eyebrow={t({ vi: "Tính thực chiến đột phá", en: "Built for work" })}
          title={t({ vi: "Vì sao doanh nghiệp săn đón sinh viên BTEC?", en: "Why employers compete for BTEC graduates" })}
          lead={t({
            vi: "Năm nguyên tắc biến lớp học thành môi trường văn phòng quốc tế.",
            en: "Five principles that turn the classroom into an international workplace.",
          })}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative hidden lg:block">
            <div className="sticky top-28 h-[calc(100svh-10rem)] overflow-hidden rounded-[8px] bg-brand-navy shadow-hairline">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <Image src={current.image} alt={t(current.title)} fill sizes="45vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <p className="text-[clamp(3.5rem,6vw,5.5rem)] font-black leading-none tabular-nums">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-2xl text-white/50"> / {String(PRACTICE_STEPS.length).padStart(2, "0")}</span>
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">{t(current.kicker)}</p>
                <div className="mt-5 flex gap-1.5">
                  {PRACTICE_STEPS.map((s, i) => (
                    <span key={s.kicker.vi} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                      <motion.span
                        className="block h-full origin-left bg-primary"
                        animate={{ scaleX: i <= active ? 1 : 0 }}
                        transition={{ duration: 0.5, ease }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            {PRACTICE_STEPS.map((step, i) => (
              <Step key={step.kicker.vi} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
