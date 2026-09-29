"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import type { L } from "@/constants/about-content"
import { cn } from "@/lib/utils"

export function useT() {
  const { locale } = useLocale()
  return (pair: L) => pair[locale] || pair.vi
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  light = false,
  center = false,
  className,
}: {
  index?: string
  eyebrow: string
  title: ReactNode
  lead?: string
  light?: boolean
  center?: boolean
  className?: string
}) {
  return (
    <Reveal className={cn(center && "mx-auto text-center", "max-w-3xl", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary",
          center && "justify-center",
        )}
      >
        {index ? (
          <span
            className={cn(
              "inline-flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-[11px] tracking-normal",
              light ? "border-white/25 text-white" : "border-primary/30 text-primary",
            )}
          >
            {index}
          </span>
        ) : null}
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-black leading-[1.12] tracking-tight",
          light ? "text-white" : "text-brand-navy",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-5 text-base leading-relaxed md:text-lg", light ? "text-white/70" : "text-muted")}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  )
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/** Faint blueprint grid used on dark sections. */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]",
        className,
      )}
    />
  )
}
