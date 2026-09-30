"use client"

import Image from "next/image"
import { BookOpen, Award, Users } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { homeImage, homeText, readBenefits } from "@/lib/home-content"
import { canOptimizeImage } from "@/lib/media"
import type { CmsStatus } from "@/types/home-cms"

type Counter = {
  id: string
  value_text: string
  label_vi: string
  label_en: string
}

const BENEFIT_ICONS = [BookOpen, Award, Users] as const

export function AboutBenefits({
  settings,
  counters,
  countersStatus,
}: {
  settings: Record<string, unknown>
  counters: Counter[]
  countersStatus: CmsStatus
}) {
  const { locale } = useLocale()
  const items = readBenefits(settings.home_benefits).map((card, i) => ({
    icon: BENEFIT_ICONS[i % BENEFIT_ICONS.length],
    title: card.title[locale],
    desc: card.desc[locale],
  }))
  const imageUrl = homeImage(settings, "home_benefits_image")
  const countersImage = homeImage(settings, "home_counters_image")

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto grid max-w-[85%] items-stretch gap-0 lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden bg-gradient-to-b from-primary/10 to-primary/30 lg:min-h-[640px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-[14%] aspect-square w-[80%] max-w-[560px] -translate-x-1/2 rounded-full bg-white/50"
            />
            <Reveal className="absolute inset-0">
              <Image
                src={imageUrl}
                alt={locale === "vi" ? "Sinh viên VMIT học cùng laptop" : "VMIT student learning on a laptop"}
                fill
                quality={85}
                unoptimized={!canOptimizeImage(imageUrl)}
                className="object-contain object-bottom pt-12"
                sizes="(max-width:1024px) 100vw, 42.5vw"
              />
            </Reveal>
          </div>
          <div className="bg-mist px-0 py-12 md:py-16 lg:px-12 lg:py-24">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary">
                {homeText(settings, "home_benefits_eyebrow", locale)}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy md:text-[2.5rem] md:leading-tight">
                {homeText(settings, "home_benefits_title", locale)}
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6">
              {items.map((item, index) => (
                <Reveal key={index} delay={0.06 * index}>
                  <article className="group flex cursor-pointer gap-5 bg-surface p-6 shadow-hairline transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-[0_12px_30px_-8px_rgba(30,178,166,0.45)] md:p-7">
                    <div className="flex size-[88px] shrink-0 items-center justify-center bg-sky text-primary transition duration-300 group-hover:bg-white/15 group-hover:text-white">
                      <item.icon className="size-10 stroke-[1.5]" />
                    </div>
                    <div className="min-w-0 pt-1">
                      <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-muted-soft transition duration-300 group-hover:text-white/90 md:text-[1.05rem]">
                        {item.desc}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center py-16 text-white md:py-20"
        style={{ backgroundImage: `url(${countersImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto grid max-w-[85%] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {countersStatus === "ok" && counters.length > 0
            ? counters.map((c) => (
                <div key={c.id} className="text-center md:text-left">
                  <p className="text-3xl font-black leading-tight md:text-4xl lg:text-5xl">{c.value_text}</p>
                  <p className="mt-2 text-lg font-medium">
                    {locale === "vi" ? c.label_vi : c.label_en}
                  </p>
                </div>
              ))
            : [
                {
                  v: "2+1",
                  l: locale === "vi" ? "2 bằng chính quy, 1 bằng đại học Anh Quốc" : "2 formal qualifications, 1 UK bachelor's degree",
                },
                { v: "70%", l: locale === "vi" ? "tiết kiệm chi phí" : "savings on study costs" },
                { v: "100%", l: locale === "vi" ? "Giới thiệu việc làm" : "Job referrals" },
                { v: "6,5 IELTS", l: locale === "vi" ? "Sau tốt nghiệp" : "After graduation" },
              ].map((c) => (
                <div key={c.l} className="text-center md:text-left">
                  <p className="text-3xl font-black leading-tight md:text-4xl lg:text-5xl">{c.v}</p>
                  <p className="mt-2 text-lg font-medium">{c.l}</p>
                </div>
              ))}
        </div>
      </section>
    </>
  )
}
