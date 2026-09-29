"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Award, Landmark, Layers, Star } from "lucide-react"
import { LEVEL_STEPS, PEARSON_PILLARS, PEARSON_STATS } from "@/constants/about-content"
import { cn } from "@/lib/utils"
import { CountUp, GridBackdrop, SectionHeading, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const
const PILLAR_ICONS = [Landmark, Award, Layers]
const STEP_HEIGHTS = ["lg:h-[58%]", "lg:h-[72%]", "lg:h-[88%]", "lg:h-full"]

export function AboutStandard() {
  const t = useT()
  const reduce = useReducedMotion()

  return (
    <section id="chuan-quoc-te" className="relative scroll-mt-20 overflow-hidden bg-[#0a1615] py-24 text-white md:py-32">
      <GridBackdrop />
      <div aria-hidden className="absolute right-0 top-0 size-[520px] rounded-full bg-primary/15 blur-[140px]" />

      <div className="relative mx-auto max-w-[85%]">
        <SectionHeading
          index="02"
          eyebrow={t({ vi: "Chứng nhận & công nhận toàn cầu", en: "Global accreditation" })}
          title={t({
            vi: "Pearson BTEC được bảo chứng bởi Chính phủ Anh",
            en: "Pearson BTEC is backed by the UK government framework",
          })}
          lead={t({
            vi: "Văn bằng đạt chuẩn học thuật quốc gia Anh, được đối soát bình đẳng với chương trình đại học chính quy.",
            en: "A qualification benchmarked to UK national academic standards and mapped equally against full university programmes.",
          })}
          light
        />

        <div className="mt-14 grid grid-cols-2 gap-y-10 border-y border-white/10 py-10 lg:grid-cols-4">
          {PEARSON_STATS.map((stat, i) => (
            <div key={stat.label.vi} className={cn("px-4 text-center", i > 0 && "lg:border-l lg:border-white/10")}>
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="block text-[clamp(2.6rem,5vw,4rem)] font-black leading-none text-white"
              />
              <p className="mt-3 text-sm font-semibold text-white/60">{t(stat.label)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PEARSON_PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Award
            return (
              <motion.article
                key={pillar.title.vi}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group rounded-[6px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors duration-300 hover:border-primary/60 hover:bg-white/[0.07]"
              >
                <span className="flex size-12 items-center justify-center rounded-[6px] bg-primary/15 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold leading-snug">{t(pillar.title)}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{t(pillar.body)}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-24">
          <h3 className="text-center text-2xl font-black md:text-3xl">
            {t({ vi: "Bậc thang học thuật BTEC", en: "The BTEC academic ladder" })}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
            {t({
              vi: "Đối chiếu chuẩn RQF Anh Quốc với hệ thống giáo dục Việt Nam và quyền lợi chuyển tiếp quốc tế.",
              en: "UK RQF levels mapped to the Vietnamese system and international progression rights.",
            })}
          </p>

          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 flex flex-col gap-4 lg:h-[500px] lg:flex-row lg:items-end"
          >
            {LEVEL_STEPS.map((step, i) => (
              <motion.div
                key={step.level}
                variants={{
                  hidden: { clipPath: "inset(100% 0% 0% 0%)", y: 30 },
                  show: { clipPath: "inset(-20% -5% 0% -5%)", y: 0, transition: { duration: 0.9, ease, delay: i * 0.15 } },
                }}
                className={cn(
                  "relative flex origin-bottom flex-col rounded-[8px] p-6 lg:flex-1 lg:rounded-b-none",
                  STEP_HEIGHTS[i],
                  step.vmit
                    ? "bg-primary text-white shadow-[0_30px_80px_-20px_rgba(30,178,166,0.6)]"
                    : "border border-white/10 bg-white/[0.05]",
                )}
              >
                {step.vmit ? (
                  <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary shadow-lg">
                    <Star className="size-3 fill-primary" />
                    {t({ vi: "Chuẩn VMIT", en: "VMIT level" })}
                  </span>
                ) : null}
                <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", step.vmit ? "text-white/80" : "text-primary")}>
                  BTEC
                </p>
                <p className="mt-1 text-2xl font-black">{step.level}</p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className={cn("text-[11px] font-bold uppercase tracking-wider", step.vmit ? "text-white/70" : "text-white/45")}>
                      RQF
                    </dt>
                    <dd className="font-semibold">{t(step.rqf)}</dd>
                  </div>
                  <div>
                    <dt className={cn("text-[11px] font-bold uppercase tracking-wider", step.vmit ? "text-white/70" : "text-white/45")}>
                      {t({ vi: "Việt Nam", en: "Vietnam" })}
                    </dt>
                    <dd className="font-semibold">{t(step.vn)}</dd>
                  </div>
                  <div>
                    <dt className={cn("text-[11px] font-bold uppercase tracking-wider", step.vmit ? "text-white/70" : "text-white/45")}>
                      {t({ vi: "Chuyển tiếp", en: "Progression" })}
                    </dt>
                    <dd className="font-semibold">{t(step.next)}</dd>
                  </div>
                </dl>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
