"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { ROUTES } from "@/constants/site"
import { homeText, readSubjectRows } from "@/lib/home-content"
import { canOptimizeImage } from "@/lib/media"

export function SubjectsGrid({ settings = {} }: { settings?: Record<string, unknown> }) {
  const { locale } = useLocale()
  const rows = readSubjectRows(settings.home_subjects)
  const cta = homeText(settings, "home_subjects_cta", locale)

  return (
    <section id="subjects" className="scroll-mt-24 bg-mist py-16 md:scroll-mt-32 md:py-24">
      <div className="mx-auto max-w-[85%]">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary">
            {homeText(settings, "home_subjects_eyebrow", locale)}
          </p>
          <h2 className="mt-3 text-3xl font-black text-brand-navy md:text-4xl">
            {homeText(settings, "home_subjects_title", locale)}
          </h2>
        </Reveal>

        <div className="mt-10 space-y-10 md:mt-12">
          {rows.map((row, r) => {
            const href = `${ROUTES.programs}#${row.track}`
            return (
              <div key={row.track}>
                <Reveal delay={0.04 * r} className="mb-4 flex items-end justify-between gap-4 border-b border-border pb-3">
                  <h3 className="flex items-baseline gap-3 text-lg font-black text-brand-navy md:text-xl">
                    <span className="text-sm font-bold tabular-nums text-primary">{String(r + 1).padStart(2, "0")}</span>
                    {row.label[locale]}
                  </h3>
                  <Link
                    href={href}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-brand-navy"
                  >
                    {cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Reveal>

                <ul className="scrollbar-none -mx-[7.5vw] flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[7.5vw] px-[7.5vw] pb-2 md:gap-4 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-3 xl:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
                  {row.items.map((item, i) => (
                    <li key={i} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[23%] lg:w-auto">
                      <Reveal delay={0.03 * i + 0.04 * r} className="h-full">
                        <Link
                          href={href}
                          className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-transparent bg-surface shadow-hairline transition duration-200 hover:-translate-y-1 hover:border-primary"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-sky">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 44vw"
                              unoptimized={!canOptimizeImage(item.image)}
                              className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col px-3 pb-4 pt-3 lg:px-2.5 xl:px-3">
                            <span className="whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.06em] text-primary lg:text-[0.62rem] lg:tracking-[0.03em] xl:text-[0.68rem] xl:tracking-[0.06em]">
                              {item.unit}
                            </span>
                            <span className="mt-1 text-[0.95rem] font-bold leading-snug text-foreground [text-wrap:balance] md:text-base">
                              {item.title[locale].replaceAll(" &", "\u00A0&")}
                            </span>
                          </div>
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
