"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { cn } from "@/lib/utils"

type HeroSectionProps = {
  onOpenScholarship: () => void
}

export function HeroSection({ onOpenScholarship }: HeroSectionProps) {
  const reduce = useReducedMotion()

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-24 md:pt-28">
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" aria-hidden />
      <div className="hero-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-[480px] w-[480px] rounded-full bg-brand-red/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-navy/50 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        <motion.p
          className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-brand-red">VM</span>IT
        </motion.p>

        <motion.p
          className="mt-3 max-w-2xl font-display text-xl font-medium italic tracking-tight text-white/85 md:text-2xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.heroSlogan}
        </motion.p>

        <motion.h1
          className="mt-8 max-w-4xl font-display text-[clamp(2rem,4.8vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.heroHeadline}
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-lg text-white/80 md:text-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.brandTagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3 md:gap-4"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#tru-dot-pha" className={cn(buttonVariants({ variant: "primary", size: "xl" }))}>
            Khám phá lộ trình
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={onOpenScholarship}
            className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
          >
            Nhận học bổng {SITE.admissionYear}
          </button>
          <Link
            href={ROUTES.apply}
            className="group inline-flex h-14 items-center gap-2 px-2 text-base font-semibold text-white/90 transition hover:text-white"
          >
            Cổng xét tuyển
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
