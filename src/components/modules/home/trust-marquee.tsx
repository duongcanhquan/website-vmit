"use client"

import { useLocale } from "@/components/providers/locale-provider"
import { homeText } from "@/lib/home-content"
import type { CmsStatus } from "@/types/home-cms"

export function TrustMarquee({
  partners,
  status,
  settings = {},
}: {
  partners: Array<{ id: string; name: string }>
  status: CmsStatus
  settings?: Record<string, unknown>
}) {
  const { locale } = useLocale()
  const label = homeText(settings, "home_partners_label", locale)
  if (status !== "ok" || partners.length === 0) return null
  const row = [...partners, ...partners]
  return (
    <section className="overflow-hidden border-y border-border bg-surface py-5" aria-label={label}>
      <p className="mb-3 text-center overline text-muted/70">{label}</p>
      <div className="flex w-max animate-marquee gap-3 px-4">
        {row.map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="inline-flex h-10 shrink-0 items-center rounded-lg border border-border bg-mist px-4 text-sm font-medium text-brand-slate/80"
          >
            {item.name}
          </span>
        ))}
      </div>
    </section>
  )
}
