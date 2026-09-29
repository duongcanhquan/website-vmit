"use client"

import Image from "next/image"
import { BookMarked } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import type { CmsStatus } from "@/types/home-cms"

export type SubjectItem = {
  id: string
  title_vi: string
  title_en: string
  count_label_vi: string
  count_label_en: string
  icon_url: string | null
  hover_icon_url: string | null
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
    <section id="mon-hoc" className="bg-surface py-16 text-center md:py-20">
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
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => {
              const title = locale === "vi" ? item.title_vi : item.title_en
              const count = locale === "vi" ? item.count_label_vi : item.count_label_en
              return (
                <Reveal key={item.id} delay={0.04 * index}>
                  <article className="group cursor-pointer bg-mist p-7 shadow-hairline transition-all duration-300 hover:rounded-[5px] hover:bg-primary hover:text-white">
                    <div className="relative mx-auto size-20">
                      {item.icon_url ? (
                        <>
                          <Image
                            src={item.icon_url}
                            alt=""
                            width={80}
                            height={80}
                            className="size-20 object-contain transition group-hover:opacity-0"
                          />
                          {item.hover_icon_url ? (
                            <Image
                              src={item.hover_icon_url}
                              alt=""
                              width={80}
                              height={80}
                              className="absolute inset-0 size-20 object-contain opacity-0 transition group-hover:opacity-100"
                            />
                          ) : null}
                        </>
                      ) : (
                        <div className="flex size-20 items-center justify-center rounded-full bg-primary text-white transition group-hover:bg-white group-hover:text-primary">
                          <BookMarked className="size-9 stroke-[1.5]" />
                        </div>
                      )}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-snug md:text-xl">{title}</h3>
                    {count ? (
                      <span className="mt-4 inline-block rounded-[5px] bg-surface px-4 py-1.5 text-sm font-medium text-primary transition group-hover:bg-white/15 group-hover:text-white">
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
