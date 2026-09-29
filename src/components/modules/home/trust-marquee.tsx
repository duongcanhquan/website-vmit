"use client"

import { useLocale } from "@/components/providers/locale-provider"
import type { CmsStatus } from "@/types/home-cms"

export function TrustMarquee({
  partners,
  status,
}: {
  partners: Array<{ id: string; name: string }>
  status: CmsStatus
}) {
  const { t } = useLocale()
  if (status === "error") {
    return (
      <section className="border-y border-border bg-surface py-5 text-center text-sm text-muted">
        Không tải được danh sách đối tác.
      </section>
    )
  }
  if (status === "empty" || partners.length === 0) {
    return (
      <section className="border-y border-border bg-surface py-5 text-center text-sm text-muted">
        {t.trust.label}: chưa có dữ liệu.
      </section>
    )
  }
  const row = [...partners, ...partners]
  return (
    <section className="overflow-hidden border-y border-border bg-surface py-5" aria-label={t.trust.label}>
      <p className="mb-3 text-center overline text-muted/70">{t.trust.label}</p>
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
