"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Award, Briefcase, Hammer, Languages, Phone } from "lucide-react"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ABOUT_CREDITS, ADMISSION_CTA, COMMITMENTS, MAJORS } from "@/constants/about-content"
import { ROUTES } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"
import { CountUp, GridBackdrop, SectionHeading, useT } from "./about-shared"

const ease = [0.22, 1, 0.36, 1] as const
const COMMITMENT_ICONS = [Award, Briefcase, Hammer, Languages]

export function AboutMajors() {
  const t = useT()
  const reduce = useReducedMotion()

  return (
    <section id="nganh-hoc" className="relative scroll-mt-20 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[85%]">
        <SectionHeading
          index="07"
          eyebrow={t({ vi: "Hai ngành đào tạo mũi nhọn", en: "Two flagship majors" })}
          title={t({ vi: "Chọn hướng đi – VMIT APC Hà Nội", en: "Choose your path – VMIT APC Hanoi" })}
          center
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {MAJORS.map((major, i) => (
            <motion.article
              key={major.code}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
              whileHover={reduce ? undefined : { y: -8 }}
              className="group overflow-hidden rounded-[8px] bg-white shadow-hairline ring-1 ring-border transition-shadow duration-500 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={major.image}
                  alt={t(major.title)}
                  fill
                  sizes="(max-width:1024px) 90vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-6 top-3 text-[3.25rem] font-black md:top-4 md:text-[5rem] leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">
                  {major.code}
                </span>
                <div className="absolute inset-x-6 bottom-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{major.en}</p>
                  <h3 className="mt-1 text-3xl font-black">{t(major.title)}</h3>
                </div>
              </div>
              <div className="p-7 md:p-8">
                <p className="leading-relaxed text-muted">{t(major.body)}</p>
                <motion.ul
                  className="mt-6 flex flex-wrap gap-2"
                  initial={reduce ? false : "hidden"}
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
                >
                  {major.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
                      className="rounded-full bg-sky px-3.5 py-1.5 text-sm font-bold text-primary"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutCommitments({ settings }: { settings: Record<string, unknown> }) {
  const t = useT()
  const { locale, t: messages } = useLocale()
  const reduce = useReducedMotion()
  const hotline = settingText(settings.hotline_display, locale) || messages.common.hotline

  return (
    <section id="cam-ket" className="relative scroll-mt-20 overflow-hidden bg-[#0a1615] py-24 text-white md:py-32">
      <GridBackdrop />
      <div aria-hidden className="absolute -left-20 bottom-0 size-[480px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="relative mx-auto max-w-[85%]">
        <SectionHeading
          index="08"
          eyebrow={t({ vi: "Bốn cam kết vàng", en: "Four golden commitments" })}
          title={t({ vi: "Điều VMIT cam kết với bạn", en: "What VMIT promises you" })}
          light
          center
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((item, i) => {
            const Icon = COMMITMENT_ICONS[i] ?? Award
            return (
              <motion.article
                key={item.title.vi}
                initial={reduce ? false : { opacity: 0, y: 50, rotateX: 25 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] p-7 [perspective:800px] transition-colors duration-500 hover:border-primary/60"
              >
                <span
                  aria-hidden
                  className="absolute -right-2 -top-6 text-[7rem] font-black leading-none text-white/[0.05] transition-colors duration-500 group-hover:text-primary/15"
                >
                  {i + 1}
                </span>
                <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_0_6px_rgba(30,178,166,0.15)]">
                  <Icon className="size-6" />
                </span>
                <h3 className="relative mt-6 text-xl font-black leading-snug">{t(item.title)}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-white/65">{t(item.body)}</p>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
          className="relative mt-20 grid items-center gap-10 overflow-hidden rounded-[10px] bg-primary p-8 md:p-12 lg:grid-cols-[1fr_auto]"
        >
          <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-white/10" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80">{t(ADMISSION_CTA.eyebrow)}</p>
            <h3 className="mt-3 text-[clamp(2rem,4.5vw,3.4rem)] font-black leading-tight">{t(ADMISSION_CTA.title)}</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">{t(ADMISSION_CTA.body)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ROUTES.apply} className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
                {messages.nav.apply}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={`tel:${hotline.replace(/\s+/g, "")}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "border border-white/50 bg-transparent text-white shadow-none hover:bg-white/10",
                )}
              >
                <Phone className="size-4" />
                {hotline}
              </a>
            </div>
          </div>
          <div className="relative text-center lg:pr-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              {t({ vi: "Chỉ từ", en: "From just" })}
            </p>
            <CountUp value={Number(ADMISSION_CTA.amount)} className="block text-[clamp(5rem,10vw,8rem)] font-black leading-none" />
            <p className="text-sm font-bold uppercase tracking-wider text-white/90">{t(ADMISSION_CTA.unit)}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function AboutCredits() {
  const t = useT()
  return (
    <section className="bg-mist py-8">
      <div className="mx-auto max-w-[85%] text-xs leading-relaxed text-muted-soft">
        <p className="font-semibold text-muted">
          {t({ vi: "Nguồn ảnh Đại học Sunderland & Keiser", en: "University of Sunderland & Keiser photo credits" })}
        </p>
        <p className="mt-1">
          {ABOUT_CREDITS.map((credit, i) => (
            <span key={credit.href}>
              <a href={credit.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-primary hover:underline">
                {credit.label}
              </a>{" "}
              – {credit.author}, {credit.license}
              {i < ABOUT_CREDITS.length - 1 ? " · " : ""}
            </span>
          ))}
          {t({
            vi: ". Ảnh từ Wikimedia Commons, đã được cắt và thu nhỏ.",
            en: ". Photos via Wikimedia Commons, cropped and resized.",
          })}
        </p>
      </div>
    </section>
  )
}
