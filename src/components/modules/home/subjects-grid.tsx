"use client"

import Image from "next/image"
import {
  Award,
  BarChart3,
  BookMarked,
  Briefcase,
  Calculator,
  ClipboardList,
  Code2,
  Database,
  Languages,
  Megaphone,
  PieChart,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { cn } from "@/lib/utils"
import type { CmsStatus } from "@/types/home-cms"

export type SubjectItem = {
  id: string
  title_vi: string
  title_en: string
  count_label_vi: string
  count_label_en: string
  icon_url: string | null
  hover_icon_url: string | null
  icon_key?: string | null
}

const SUBJECT_ICONS: Record<string, LucideIcon> = {
  data: BarChart3,
  business: Briefcase,
  marketing: Megaphone,
  finance: Calculator,
  english: Languages,
  code: Code2,
  database: Database,
  chart: PieChart,
  people: Users,
  ecommerce: ShoppingCart,
  project: ClipboardList,
  career: Award,
}

function SubjectIcon({ item }: { item: SubjectItem }) {
  if (item.icon_url) {
    return (
      <div className="relative mx-auto size-16">
        <Image
          src={item.icon_url}
          alt=""
          width={64}
          height={64}
          className={cn("size-16 object-contain transition", item.hover_icon_url && "group-hover:opacity-0")}
        />
        {item.hover_icon_url ? (
          <Image
            src={item.hover_icon_url}
            alt=""
            width={64}
            height={64}
            className="absolute inset-0 size-16 object-contain opacity-0 transition group-hover:opacity-100"
          />
        ) : null}
      </div>
    )
  }
  const Icon = (item.icon_key && SUBJECT_ICONS[item.icon_key]) || BookMarked
  return (
    <Icon className="mx-auto size-14 stroke-[1.6] text-primary transition-colors duration-300 group-hover:text-white" />
  )
}

export function SubjectsGrid({
  items,
  status,
}: {
  items: SubjectItem[]
  status: CmsStatus
}) {
  const { locale } = useLocale()

  return (
    <section id="subjects" className="scroll-mt-24 bg-mist py-16 text-center md:scroll-mt-32 md:py-24">
      <div className="mx-auto max-w-[85%]">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary">
            {locale === "vi" ? "Môn học" : "Subjects"}
          </p>
          <h2 className="mt-3 text-3xl font-black text-brand-navy md:text-4xl">
            {locale === "vi" ? "Các môn trong chương trình" : "Browse programme subjects"}
          </h2>
        </Reveal>

        {status === "error" ? (
          <p className="mt-8 text-sm text-muted">
            {locale === "vi" ? "Không tải được môn học." : "Unable to load subjects."}
          </p>
        ) : null}
        {status === "empty" ? (
          <p className="mt-8 text-sm text-muted">
            {locale === "vi"
              ? "Chưa có môn học trong CMS. Thêm tại Admin → Môn học."
              : "No subjects in CMS yet. Add them in Admin → Subjects."}
          </p>
        ) : null}

        {status === "ok" ? (
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {items.map((item, index) => {
              const title = locale === "vi" ? item.title_vi : item.title_en
              const count = locale === "vi" ? item.count_label_vi : item.count_label_en
              return (
                <Reveal key={item.id} delay={0.03 * index} className="h-full">
                  <article className="group flex h-full cursor-pointer flex-col items-center rounded-[3px] bg-surface px-4 pb-7 pt-8 shadow-hairline transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:shadow-[0_14px_30px_-10px_rgba(30,178,166,0.55)]">
                    <SubjectIcon item={item} />
                    <h3 className="mt-5 flex min-h-[3rem] items-center text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-white md:text-[1.05rem]">
                      {title}
                    </h3>
                    {count ? (
                      <span className="mt-2 inline-block rounded-[3px] bg-sky px-2.5 py-1 text-xs font-semibold text-primary transition-colors duration-300 group-hover:bg-white">
                        {count}
                      </span>
                    ) : null}
                  </article>
                </Reveal>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
