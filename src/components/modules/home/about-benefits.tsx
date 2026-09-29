"use client"

import Image from "next/image"
import { BookOpen, Award, Users } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { MEDIA } from "@/constants/media"
import { settingText } from "@/lib/i18n/locale-text"
import type { CmsStatus } from "@/types/home-cms"

type Counter = {
  id: string
  value_text: string
  label_vi: string
  label_en: string
}

const benefits = {
  vi: [
    {
      icon: BookOpen,
      title: "Chương trình thực hành",
      desc: "BTEC Data Analytics & Business Management theo chuẩn Pearson HND — học làm thật trên dự án.",
    },
    {
      icon: Award,
      title: "Song bằng danh giá",
      desc: "Pearson BTEC HND Level 5 (UK) kết hợp bằng Cao đẳng Quốc gia APC trong một lộ trình.",
    },
    {
      icon: Users,
      title: "Chuyên gia & đối tác",
      desc: "Giảng viên thực chiến và mạng lưới doanh nghiệp FDI đồng hành tới việc làm.",
    },
  ],
  en: [
    {
      icon: BookOpen,
      title: "Practice-led programmes",
      desc: "BTEC Data Analytics & Business Management to Pearson HND standards — learn by doing.",
    },
    {
      icon: Award,
      title: "Dual awards",
      desc: "Pearson BTEC HND Level 5 (UK) with the national APC college award in one pathway.",
    },
    {
      icon: Users,
      title: "Experts & partners",
      desc: "Practitioner tutors and an FDI employer network toward employability.",
    },
  ],
} as const

export function AboutBenefits({
  settings,
  counters,
  countersStatus,
  imageUrl = MEDIA.campusFacility,
}: {
  settings: Record<string, unknown>
  counters: Counter[]
  countersStatus: CmsStatus
  imageUrl?: string
}) {
  const { locale } = useLocale()
  const items = benefits[locale]
  const aboutLead =
    settingText(settings.about_lead, locale) ||
    (locale === "vi"
      ? "Lợi ích học tập thực chiến theo chuẩn Anh Quốc ngay tại Việt Nam."
      : "Practice-led benefits of a UK-standard pathway in Vietnam.")

  return (
    <>
      <section className="bg-mist py-16 md:py-24">
        <div className="mx-auto grid max-w-[85%] items-stretch gap-0 lg:grid-cols-2">
          <Reveal className="relative min-h-[380px] lg:min-h-[560px]">
            <Image src={imageUrl} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 42.5vw" />
          </Reveal>
          <div className="bg-mist px-0 py-10 lg:px-12 lg:py-14">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary">
                {locale === "vi" ? "Học mọi thứ" : "Learn anything"}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy md:text-[2.5rem] md:leading-tight">
                {locale === "vi" ? "Lợi ích học tập tại VMIT" : "Benefits of learning at VMIT"}
              </h2>
              <p className="mt-4 text-base text-muted md:text-lg">{aboutLead}</p>
            </Reveal>
            <div className="mt-10 space-y-6">
              {items.map((item, index) => (
                <Reveal key={item.title} delay={0.06 * index}>
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
        style={{ backgroundImage: `url(${MEDIA.heroCampusUk})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto grid max-w-[85%] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {countersStatus === "ok" && counters.length > 0
            ? counters.map((c) => (
                <div key={c.id} className="text-center md:text-left">
                  <p className="text-4xl font-black md:text-5xl">{c.value_text}</p>
                  <p className="mt-2 text-lg font-medium">
                    {locale === "vi" ? c.label_vi : c.label_en}
                  </p>
                </div>
              ))
            : [
                { v: "2", l: locale === "vi" ? "bằng chính quy" : "recognised awards" },
                { v: "70%", l: locale === "vi" ? "tiết kiệm chi phí" : "cost efficiency" },
                { v: "100%", l: locale === "vi" ? "định hướng FDI" : "FDI career focus" },
                { v: "3", l: locale === "vi" ? "chương trình trọng điểm" : "flagship programmes" },
              ].map((c) => (
                <div key={c.l} className="text-center md:text-left">
                  <p className="text-4xl font-black md:text-5xl">{c.v}</p>
                  <p className="mt-2 text-lg font-medium">{c.l}</p>
                </div>
              ))}
        </div>
      </section>
    </>
  )
}
