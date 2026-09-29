"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Building2, MapPin, Stamp } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { ABOUT_MEDIA, VMIT_MODEL } from "@/constants/about-content"
import { cn } from "@/lib/utils"
import { SectionHeading, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const

const DIPLOMA_POSES = [
  { rest: { rotate: 0, x: "30%", y: 0 }, fan: { rotate: -6, x: "0%", y: 0 } },
  { rest: { rotate: 0, x: "-30%", y: 0 }, fan: { rotate: 5, x: "0%", y: 28 } },
]

export function AboutDualDegree() {
  const t = useT()
  const reduce = useReducedMotion()

  return (
    <section id="song-bang" className="relative scroll-mt-20 overflow-hidden bg-sky py-24 md:py-32">
      <div className="mx-auto grid max-w-[85%] items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            index="04"
            eyebrow={t({ vi: "Triển khai tại Cao đẳng Việt Mỹ", en: "Delivered at Viet My College" })}
            title={t(VMIT_MODEL.title)}
            lead={t(VMIT_MODEL.body)}
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {VMIT_MODEL.campuses.map((campus) => (
                <li
                  key={campus.vi}
                  className="flex items-center gap-3 rounded-[6px] bg-white px-4 py-3.5 text-[15px] font-bold text-brand-navy shadow-hairline"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-4.5" />
                  </span>
                  {t(campus)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 rounded-[6px] border-l-4 border-primary bg-white p-6 shadow-hairline">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                <Building2 className="size-4" />
                {t({ vi: "Đặc quyền song bằng · 2 năm · 6 học kỳ", en: "Dual-degree privilege · 2 years · 6 terms" })}
              </p>
              <p className="mt-3 text-lg font-semibold leading-relaxed text-brand-navy">{t(VMIT_MODEL.passport)}</p>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <Reveal y={40}>
            <div className="relative ml-auto aspect-[4/3] w-[88%] overflow-hidden rounded-[8px] shadow-hairline">
              <Image
                src={ABOUT_MEDIA.dualDegree}
                alt={t({ vi: "Tân cử nhân VMIT với hai tấm bằng", en: "VMIT graduate holding two diplomas" })}
                fill
                sizes="(max-width:1024px) 85vw, 38vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="relative -mt-24 flex justify-center sm:-mt-32 lg:absolute lg:-bottom-12 lg:-left-8 lg:mt-0 lg:w-[88%]">
            {VMIT_MODEL.diplomas.map((diploma, i) => (
              <motion.div
                key={diploma.title.vi}
                initial={reduce ? false : { ...DIPLOMA_POSES[i].rest, opacity: 0 }}
                whileInView={{ ...DIPLOMA_POSES[i].fan, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease, delay: 0.2 + i * 0.15 }}
                whileHover={reduce ? undefined : { y: -10, rotate: 0, zIndex: 10 }}
                className={cn(
                  "relative w-[50%] max-w-[270px] rounded-[6px] border p-4 shadow-2xl",
                  i === 0 ? "z-[1] border-[#d9c9a3] bg-[#fdf8ec]" : "z-[2] -ml-[4%] border-[#b7d4ea] bg-[#f3f8fd]",
                )}
              >
                <div className="rounded-[4px] border border-dashed border-current/20 p-4 text-brand-navy">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                      {i === 0 ? "Việt Nam" : "United Kingdom"}
                    </p>
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full text-white shadow-md",
                        i === 0 ? "bg-[#b8322a]" : "bg-[#1f3c88]",
                      )}
                    >
                      <Stamp className="size-5" />
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-black leading-tight">{t(diploma.title)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{t(diploma.issuer)}</p>
                  <div className="mt-4 h-px bg-brand-navy/15" />
                  <p className="mt-2 font-serif text-sm italic text-brand-navy/60">Dual Degree · VMIT</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
