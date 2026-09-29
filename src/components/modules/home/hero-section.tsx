import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { HERO_COUNTERS, ROUTES, SITE } from "@/constants/site"
import { cn } from "@/lib/utils"

type HeroSectionProps = {
  onOpenScholarship: () => void
}

export function HeroSection({ onOpenScholarship }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-28 md:items-center md:pb-0">
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" aria-hidden />
      <div className="absolute inset-0 bg-brand-navy/35" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" aria-hidden>
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(0,0,0,0.25),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        <p className="animate-fade-up font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
          {SITE.heroSlogan}
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
          {SITE.heroHeadline}
        </h1>
        <p className="animate-fade-up mt-4 max-w-xl text-base text-white/85 md:text-lg">{SITE.brandTagline}</p>

        <div className="animate-fade-up mt-8 flex flex-wrap gap-6 border-y border-white/20 py-5">
          {HERO_COUNTERS.map((item) => (
            <div key={item.label} className="min-w-[120px]">
              <p className="font-display text-3xl font-bold text-white md:text-4xl">{item.value}</p>
              <p className="mt-1 text-sm text-white/75">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
          <a href="#tru-dot-pha" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Khám phá lộ trình
          </a>
          <button
            type="button"
            onClick={onOpenScholarship}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Nhận học bổng {SITE.admissionYear}
          </button>
          <Link
            href={ROUTES.apply}
            className="inline-flex h-12 items-center px-2 text-sm font-semibold text-white/90 underline-offset-4 hover:underline"
          >
            Vào cổng xét tuyển →
          </Link>
        </div>
      </div>
    </section>
  )
}
