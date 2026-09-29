"use client"

import { motion } from "framer-motion"
import { Reveal, Stagger, staggerItem } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { pickLocale } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"
import type { CmsStatus } from "@/types/home-cms"

type Props = {
  pillars: Array<Record<string, unknown>>
  counters: Array<{
    id: string
    value_text: string
    label_vi: string
    label_en: string
  }>
  pillarsStatus: CmsStatus
  countersStatus: CmsStatus
}

export function PillarsBento({ pillars, counters, pillarsStatus, countersStatus }: Props) {
  const { locale, t } = useLocale()
  const featured = pillars.find((p) => p.is_featured)
  const rest = pillars.filter((p) => !p.is_featured)

  return (
    <section id="tru-dot-pha" className="bg-mist py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="overline text-accent-cobalt">{t.pillars.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,3.5vw,2.85rem)] font-medium tracking-[-0.02em] text-brand-navy">
            {t.pillars.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {/* Facts — 1/3 */}
          <div className="lg:col-span-4">
            {countersStatus === "error" ? (
              <p className="text-sm text-accent-gold">Không tải được chỉ số.</p>
            ) : countersStatus === "empty" ? (
              <p className="text-sm text-muted">Chưa có chỉ số trong CMS.</p>
            ) : (
              <Stagger className="flex h-full flex-col gap-3">
                {counters.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={staggerItem}
                    className="flex flex-1 flex-col justify-center rounded-xl border border-border bg-brand-navy px-6 py-7 text-white shadow-hairline"
                  >
                    <p className="font-display text-4xl font-medium tracking-tight md:text-5xl">{item.value_text}</p>
                    <p className="mt-2 overline text-white/55">
                      {locale === "vi" ? item.label_vi : item.label_en}
                    </p>
                  </motion.div>
                ))}
              </Stagger>
            )}
          </div>

          {/* Key programme / pillars — 2/3 */}
          <div className="lg:col-span-8">
            {pillarsStatus === "error" ? (
              <p className="text-sm text-accent-gold">Không tải được trụ đột phá.</p>
            ) : pillarsStatus === "empty" ? (
              <p className="text-sm text-muted">Chưa có trụ — cập nhật trong Admin.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {featured ? (
                  <Reveal className="md:col-span-2" y={28}>
                    <article className="rounded-xl border border-border bg-surface p-7 shadow-hairline md:p-9">
                      <p className="overline text-accent-gold">{pickLocale(featured, locale, "eyebrow")}</p>
                      <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-brand-navy md:text-3xl">
                        {pickLocale(featured, locale, "title")}
                      </h3>
                      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                        {pickLocale(featured, locale, "description")}
                      </p>
                    </article>
                  </Reveal>
                ) : null}
                {rest.map((pillar, index) => (
                  <Reveal key={String(pillar.id)} delay={0.06 * (index + 1)}>
                    <article
                      className={cn(
                        "h-full rounded-xl border border-border bg-surface p-6 shadow-hairline transition hover:border-brand-navy/20",
                      )}
                    >
                      <p className="overline text-accent-cobalt">{pickLocale(pillar, locale, "eyebrow")}</p>
                      <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-brand-navy">
                        {pickLocale(pillar, locale, "title")}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                        {pickLocale(pillar, locale, "description")}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
