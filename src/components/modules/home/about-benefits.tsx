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
      desc: "BTEC Data Analytics & Business Management theo chuẩn Pearson HND.",
    },
    {
      icon: Award,
      title: "Song bằng danh giá",
      desc: "Pearson BTEC HND Level 5 (UK) kết hợp bằng Cao đẳng Quốc gia APC.",
    },
    {
      icon: Users,
      title: "Chuyên gia & đối tác",
      desc: "Giảng viên thực chiến và mạng lưới doanh nghiệp FDI.",
    },
  ],
  en: [
    {
      icon: BookOpen,
      title: "Practice-led programmes",
      desc: "BTEC Data Analytics & Business Management to Pearson HND standards.",
    },
    {
      icon: Award,
      title: "Dual awards",
      desc: "Pearson BTEC HND Level 5 (UK) with the national APC college award.",
    },
    {
      icon: Users,
      title: "Experts & partners",
      desc: "Practitioner tutors and an FDI employer network.",
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
      <section className="bg-mist py-16 md:py-20">
        <div className="mx-auto grid max-w-[85%] items-stretch gap-0 lg:grid-cols-2">
          <Reveal className="relative min-h-[320px] lg:min-h-full">
            <Image src={imageUrl} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 42.5vw" />
          </Reveal>
          <div className="bg-mist px-0 py-10 lg:px-12 lg:py-16">
            <Reveal>
              <p className="overline">{locale === "vi" ? "Học mọi thứ" : "Learn anything"}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy md:text-4xl">
                {locale === "vi" ? "Lợi ích học tập tại VMIT" : "Benefits of learning at VMIT"}
              </h2>
              <p className="mt-4 text-muted">{aboutLead}</p>
            </Reveal>
            <div className="mt-8 space-y-5">
              {items.map((item, index) => (
                <Reveal key={item.title} delay={0.06 * index}>
                  <article className="group flex gap-4 bg-surface p-5 shadow-hairline transition hover:bg-primary hover:text-white">
                    <div className="flex size-[70px] shrink-0 items-center justify-center bg-sky text-primary transition group-hover:bg-white/15 group-hover:text-white">
                      <item.icon className="size-8 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#999] transition group-hover:text-white/90">
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
