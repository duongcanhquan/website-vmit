"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Globe2 } from "lucide-react"
import { ABOUT_MEDIA, KEISER } from "@/constants/about-content"
import { CountUp, SectionHeading, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const

export function AboutKeiser() {
  const t = useT()
  const reduce = useReducedMotion()

  return (
    <section id="keiser" className="relative scroll-mt-20 overflow-hidden bg-mist py-24 md:py-32">
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-[85%] items-center gap-14 lg:grid-cols-2"
      >
        <motion.div
          variants={{
            hidden: { clipPath: "inset(0% 100% 0% 0% round 8px)" },
            show: { clipPath: "inset(0% 0% 0% 0% round 8px)", transition: { duration: 1.1, ease } },
          }}
          className="relative aspect-[4/3] overflow-hidden rounded-[8px] shadow-hairline"
        >
          <Image
            src={ABOUT_MEDIA.keiserCampus}
            alt={t({ vi: "Tòa nhà Keiser University", en: "Keiser University building" })}
            fill
            sizes="(max-width:1024px) 90vw, 45vw"
            className="object-cover"
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.8 }}
            className="absolute right-5 top-5 flex size-32 flex-col items-center justify-center rounded-full bg-primary text-white shadow-2xl ring-8 ring-white/40 md:size-36"
          >
            <CountUp value={30} suffix="%" className="text-4xl font-black leading-none md:text-5xl" />
            <span className="mt-1 max-w-[6.5rem] text-center text-[10px] font-bold uppercase leading-tight tracking-wider">
              {t(KEISER.perk)}
            </span>
          </motion.div>
          <span className="absolute bottom-3 left-3 rounded-[3px] bg-black/55 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
            Keiser University · EQuest
          </span>
        </motion.div>

        <div>
          <SectionHeading
            index="06"
            eyebrow={t({ vi: "Lựa chọn chuyển tiếp sang Mỹ", en: "A US progression option" })}
            title={t(KEISER.title)}
            lead={t(KEISER.body)}
          />
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-muted">{t(KEISER.more)}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {KEISER.countries.map((country, i) => (
              <motion.li
                key={country.vi}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: 0.2 + i * 0.1 }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-[15px] font-bold text-brand-navy shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                <Globe2 className="size-4 text-primary" />
                {t(country)}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
