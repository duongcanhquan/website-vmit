"use client"

import { motion } from "framer-motion"
import { Reveal, Stagger, staggerItem } from "@/components/common/reveal"
import { HERO_COUNTERS, PILLARS } from "@/constants/site"
import { cn } from "@/lib/utils"

export function PillarsBento() {
  const featured = PILLARS.find((p) => p.featured)
  const rest = PILLARS.filter((p) => !p.featured)

  return (
    <section id="tru-dot-pha" className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(227,27,35,0.06),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">Impact at a glance</p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] text-brand-navy">
            Vì sao chọn VMIT
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {HERO_COUNTERS.map((item) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className="border-l-2 border-brand-red/80 bg-white/70 px-5 py-6 backdrop-blur-sm"
            >
              <p className="font-display text-4xl font-semibold tracking-tight text-brand-navy md:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-muted">{item.label}</p>
            </motion.div>
          ))}
        </Stagger>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured ? (
            <Reveal className="md:row-span-2 lg:col-span-1" y={36}>
              <article className="relative flex h-full flex-col overflow-hidden bg-brand-navy p-8 text-white md:p-10">
                <div
                  className="pointer-events-none absolute -right-10 top-16 h-44 w-44 rotate-12 border border-white/20 bg-gradient-to-br from-brand-red to-transparent opacity-80"
                  aria-hidden
                />
                <div
                  className="animate-float-soft pointer-events-none absolute bottom-12 right-10 h-28 w-28 -rotate-6 border border-white/25 bg-white/10 backdrop-blur-sm"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Trụ 1 · Dual Degree</p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{featured.title}</h3>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-white/80">{featured.description}</p>
                <div className="mt-auto space-y-3 pt-12">
                  <div className="border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
                    Pearson BTEC HND Level 5 — UK
                  </div>
                  <div className="border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
                    Bằng Cao đẳng Quốc gia APC
                  </div>
                </div>
              </article>
            </Reveal>
          ) : null}

          {rest.map((pillar, index) => (
            <Reveal key={pillar.id} delay={0.08 * (index + 1)} className={cn(index === 0 ? "lg:col-span-2" : "")}>
              <article className="group h-full border border-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-navy/25 hover:shadow-[0_24px_50px_-32px_rgba(0,29,126,0.45)] md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                  Trụ {index + 2}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-brand-navy transition-colors group-hover:text-brand-red">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{pillar.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
