import { PILLARS } from "@/constants/site"
import { cn } from "@/lib/utils"

export function PillarsBento() {
  const featured = PILLARS.find((p) => p.featured)
  const rest = PILLARS.filter((p) => !p.featured)

  return (
    <section id="tru-dot-pha" className="mx-auto max-w-7xl px-4 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">4 trụ đột phá</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-brand-navy md:text-4xl">
        Vì sao chọn VMIT
      </h2>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured ? (
          <article className="relative overflow-hidden rounded-2xl bg-brand-navy p-8 text-white md:row-span-2 lg:col-span-1">
            <div
              className="pointer-events-none absolute -right-8 top-10 h-40 w-40 rotate-12 rounded-2xl border border-white/20 bg-gradient-to-br from-brand-red to-white/20 opacity-80"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-8 h-28 w-28 -rotate-6 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm"
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Trụ 1</p>
            <h3 className="mt-3 font-display text-2xl font-bold">{featured.title}</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">{featured.description}</p>
            <div className="mt-10 space-y-3">
              <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
                Pearson BTEC HND Level 5 — UK
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
                Bằng Cao đẳng Quốc gia APC
              </div>
            </div>
          </article>
        ) : null}

        {rest.map((pillar, index) => (
          <article
            key={pillar.id}
            className={cn(
              "rounded-2xl border border-border bg-white p-6 shadow-[0_1px_0_rgba(0,29,126,0.04)]",
              index === 0 ? "lg:col-span-2" : "",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">Trụ {index + 2}</p>
            <h3 className="mt-2 font-display text-xl font-bold text-brand-navy">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
