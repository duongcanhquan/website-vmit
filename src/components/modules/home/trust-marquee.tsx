import { TRUST_PARTNERS } from "@/constants/site"

export function TrustMarquee() {
  const row = [...TRUST_PARTNERS, ...TRUST_PARTNERS]
  return (
    <section
      className="overflow-hidden border-y border-border bg-[#e8ecf5] py-6"
      aria-label="Đối tác & kiểm định"
    >
      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-navy/45">
        Trusted partners · UK & global network
      </p>
      <div className="flex w-max animate-marquee gap-4 px-4">
        {row.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="inline-flex h-11 shrink-0 items-center border border-brand-navy/10 bg-white px-5 text-sm font-semibold tracking-wide text-brand-navy/75"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
