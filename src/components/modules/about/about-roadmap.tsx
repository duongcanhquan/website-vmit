"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { Check, GraduationCap } from "lucide-react"
import { JOURNEY, type JourneyStop } from "@/constants/about-content"
import { cn } from "@/lib/utils"
import { SectionHeading, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const

function Stop({ stop, index }: { stop: JourneyStop; index: number }) {
  const t = useT()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const flip = index % 2 === 1

  return (
    <div ref={ref} className="relative grid gap-8 pl-14 lg:grid-cols-2 lg:gap-24 lg:pl-0">
      <motion.span
        aria-hidden
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease }}
        className={cn(
          "absolute left-6 top-6 z-10 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-4 border-mist text-sm font-black shadow-lg lg:left-1/2",
          stop.accent ? "bg-primary text-white" : "bg-brand-navy text-white",
        )}
      >
        {String(index).padStart(2, "0")}
      </motion.span>

      <motion.article
        initial={reduce ? false : { opacity: 0, x: flip ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease }}
        className={cn(
          "relative rounded-[6px] p-7 shadow-hairline md:p-9",
          stop.accent ? "bg-primary text-white" : "bg-white",
          flip ? "lg:order-2" : "lg:order-1",
        )}
      >
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]",
            stop.accent ? "bg-white/20 text-white" : "bg-sky text-primary",
          )}
        >
          {t(stop.tag)}
        </span>
        <h3
          className={cn(
            "mt-4 text-2xl font-black leading-tight md:text-[1.7rem]",
            stop.accent ? "text-white" : "text-brand-navy",
          )}
        >
          {t(stop.title)}
        </h3>
        <p className={cn("mt-3 leading-relaxed", stop.accent ? "text-white/90" : "text-muted")}>{t(stop.body)}</p>
        <ul className="mt-5 space-y-2.5">
          {stop.bullets.map((b) => (
            <li key={b.vi} className="flex items-start gap-2.5 text-[15px] font-semibold">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  stop.accent ? "bg-white text-primary" : "bg-primary text-white",
                )}
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span className={stop.accent ? "text-white" : "text-brand-navy"}>{t(b)}</span>
            </li>
          ))}
        </ul>
      </motion.article>

      <motion.div
        initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12% round 6px)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 6px)", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease }}
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-[6px] lg:aspect-auto lg:min-h-[320px]",
          flip ? "lg:order-1" : "lg:order-2",
        )}
      >
        <motion.div style={reduce ? undefined : { y: imageY }} className="absolute -inset-y-12 inset-x-0">
          <Image src={stop.image} alt={t(stop.title)} fill sizes="(max-width:1024px) 90vw, 40vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </motion.div>
    </div>
  )
}

export function AboutRoadmap() {
  const t = useT()
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.6", "end 0.6"] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 })
  const travellerTop = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  return (
    <section id="lo-trinh" className="relative scroll-mt-20 overflow-x-clip bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-[85%]">
        <SectionHeading
          index="01"
          eyebrow={t({ vi: "Lộ trình VMIT", en: "The VMIT journey" })}
          title={t({ vi: "3 năm – từ THPT đến Cử nhân Anh Quốc", en: "3 years – from high school to a UK bachelor's" })}
          lead={t({
            vi: "Mỗi chặng là một bậc năng lực được Pearson bảo chứng. Cuộn xuống để đi hết hành trình.",
            en: "Each stage is a level of competence certified by Pearson. Scroll down to follow the whole journey.",
          })}
          center
        />

        <div ref={trackRef} className="relative mt-16 md:mt-20">
          <div aria-hidden className="absolute bottom-0 left-6 top-0 w-[3px] -translate-x-1/2 rounded-full bg-brand-navy/10 lg:left-1/2" />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleY: progress }}
            className="absolute bottom-0 left-6 top-0 w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary to-[#5fe0d4] lg:left-1/2"
          />
          {!reduce ? (
            <motion.div
              aria-hidden
              style={{ top: travellerTop }}
              className="absolute left-6 z-20 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-[0_0_0_6px_rgba(30,178,166,0.18)] lg:left-1/2"
            >
              <GraduationCap className="size-5" />
            </motion.div>
          ) : null}

          <div className="space-y-16 md:space-y-24">
            {JOURNEY.map((stop, i) => (
              <Stop key={stop.title.vi} stop={stop} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
