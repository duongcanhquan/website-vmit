"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { cn } from "@/lib/utils"

export function ProgramsPreview() {
  return (
    <section id="nganh-hoc" className="relative overflow-hidden bg-[image:var(--gradient-section)] py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">Programmes</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] text-brand-navy">
            Chương trình đào tạo
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Hai ngành BTEC trọng điểm và lộ trình Foundation IELTS — chuẩn Anh Quốc, học tại Việt Nam.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "BTEC Data Analytics",
              desc: "Phân tích dữ liệu thực chiến với chuẩn Pearson HND.",
              href: ROUTES.programs,
            },
            {
              title: "BTEC Business Management",
              desc: "Quản trị doanh nghiệp theo khung giáo dục Anh Quốc.",
              href: ROUTES.programs,
            },
            {
              title: "Foundation IELTS",
              desc: "Nền tảng tiếng Anh học thuật trước khi vào chuyên ngành.",
              href: ROUTES.programs,
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={0.1 * index}>
              <Link
                href={item.href}
                className="group flex h-full flex-col border border-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-red/35 hover:shadow-[0_24px_50px_-32px_rgba(227,27,35,0.35)] md:p-8"
              >
                <span className="font-display text-5xl font-semibold text-brand-navy/10 transition group-hover:text-brand-red/20">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-base text-muted">{item.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
                  Xem chương trình
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PathwayPreview() {
  return (
    <section id="lo-trinh" className="mx-auto max-w-7xl px-4 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">Global pathway</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] text-brand-navy">
            Lộ trình & bằng cấp
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Song bằng tại chỗ và mạng lưới chuyển tiếp 2+1 / 2+2 tới Keiser University (Mỹ), Anh và Úc.
          </p>
          <Link href={ROUTES.pathway} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-8")}>
            Xem lộ trình đầy đủ
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="absolute -inset-3 bg-gradient-to-br from-brand-navy/10 via-transparent to-brand-red/10" aria-hidden />
          <ol className="relative space-y-0 border border-border bg-white">
            {[
              { step: "01", title: "Foundation / IELTS", note: "Nền tảng học thuật" },
              { step: "02", title: "BTEC HND Level 5", note: "Song bằng VMIT · APC" },
              { step: "03", title: "Top-up quốc tế", note: "2+1 / 2+2 · UK · US · AU" },
            ].map((item, i) => (
              <li
                key={item.step}
                className={cn(
                  "flex items-start gap-5 px-6 py-6 md:px-8",
                  i < 2 ? "border-b border-border" : "",
                )}
              >
                <span className="font-display text-2xl font-semibold text-brand-red">{item.step}</span>
                <div>
                  <p className="font-display text-xl font-semibold text-brand-navy">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

export function TuitionTeaser() {
  return (
    <section id="hoc-phi" className="relative overflow-hidden bg-brand-navy py-24 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(227,27,35,0.35),transparent_50%)]"
        aria-hidden
      />
      <div className="hero-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:flex md:items-end md:justify-between md:gap-10">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">Fees & scholarships</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold tracking-[-0.03em]">
            Vốn nhẹ – Bước xa
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Chính sách linh hoạt từ <strong className="font-semibold text-white">15 triệu VND</strong> · quỹ học bổng
            nhân tài {SITE.admissionYear}.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <Link href={ROUTES.tuition} className={cn(buttonVariants({ variant: "primary", size: "xl" }), "mt-8 md:mt-0")}>
            Học phí & học bổng
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export function ApplyCta() {
  return (
    <section id="xet-tuyen" className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="relative overflow-hidden border border-border bg-white px-8 py-12 md:flex md:items-center md:justify-between md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">Admissions</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-brand-navy">
              Cổng xét tuyển trực tuyến
            </h2>
            <p className="mt-3 max-w-xl text-lg text-muted">
              Form 3 bước · biên nhận tự động · mã theo dõi hồ sơ. Sẵn sàng nhận hồ sơ khi bật Supabase.
            </p>
          </div>
          <Link href={ROUTES.apply} className={cn(buttonVariants({ size: "xl" }), "relative mt-8 shrink-0 md:mt-0")}>
            Bắt đầu xét tuyển
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
