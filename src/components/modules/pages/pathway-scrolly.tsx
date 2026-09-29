"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

export function useActiveStep(ids: readonly string[]) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement)
    if (nodes.length === 0) return

    const ratios = new Map<Element, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = -1
        let bestRatio = 0
        nodes.forEach((node, index) => {
          const ratio = ratios.get(node) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = index
          }
        })
        if (best >= 0) setActive(best)
      },
      {
        root: null,
        rootMargin: "-38% 0px -42% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function StoryFrame({
  active,
  frames,
  labels,
}: {
  active: number
  frames: { src: string }[]
  labels: { code: string; title: string }[]
}) {
  const reduce = useReducedMotion()
  const current = labels[active]
  const count = labels.length

  return (
    <div className="flex h-full items-center" aria-hidden="true">
      <div className="relative h-[min(74svh,680px)] w-full overflow-hidden rounded-xl bg-brand-navy shadow-hairline">
        {frames.map((frame, index) => {
          const here = index === active
          return (
            <motion.div
              key={frame.src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: here ? 1 : 0,
                scale: here && !reduce ? 1 : 1.08,
              }}
              transition={{
                opacity: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: here && !reduce ? 8 : 0, ease: "easeOut" },
              }}
            >
              <Image
                src={frame.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          )
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
        <div className="absolute left-5 top-5 rounded-[3px] bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{current?.code}</p>
          <p className="mt-2 font-display text-4xl leading-none">{current?.title}</p>
          <div className="mt-5 flex gap-1.5">
            {labels.map((label, index) => (
              <span
                key={label.code}
                className={cn(
                  "h-1 rounded-full motion-safe:transition-all motion-safe:duration-500",
                  index === active ? "w-8 bg-primary" : "w-3 bg-white/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
