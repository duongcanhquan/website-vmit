import { TRUST_PARTNERS } from "@/constants/site"

export function TrustMarquee() {
  const row = [...TRUST_PARTNERS, ...TRUST_PARTNERS]
  return (
    <section className="overflow-hidden border-y border-border bg-[#eef1f4] py-5" aria-label="Đối tác & kiểm định">
      <div className="flex w-max animate-marquee gap-10 px-4">
        {row.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="inline-flex h-10 shrink-0 items-center rounded-md border border-brand-navy/10 bg-white px-4 text-sm font-semibold text-brand-navy/80"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
