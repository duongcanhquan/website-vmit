import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/constants/site"
import { cn } from "@/lib/utils"

export function ProgramsPreview() {
  return (
    <section id="nganh-hoc" className="bg-[image:var(--gradient-section)] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl font-bold text-brand-navy">Chương trình đào tạo</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Hai ngành BTEC trọng điểm và lộ trình Foundation IELTS — nội dung chi tiết tại trang chuyên biệt.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "BTEC Data Analytics", href: ROUTES.programs },
            { title: "BTEC Business Management", href: ROUTES.programs },
            { title: "Foundation IELTS", href: ROUTES.programs },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-border bg-white p-6 transition hover:border-brand-red/40"
            >
              <h3 className="font-display text-lg font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">Xem chi tiết chương trình →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PathwayPreview() {
  return (
    <section id="lo-trinh" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="font-display text-3xl font-bold text-brand-navy">Lộ trình & Bằng cấp</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Song bằng tại chỗ và mạng lưới chuyển tiếp 2+1 / 2+2 tới Keiser University (Mỹ), Anh, Úc.
      </p>
      <Link href={ROUTES.pathway} className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}>
        Xem lộ trình đầy đủ
      </Link>
    </section>
  )
}

export function TuitionTeaser() {
  return (
    <section id="hoc-phi" className="bg-brand-navy py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 md:flex md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Học phí & học bổng</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Vốn nhẹ – Bước xa</h2>
          <p className="mt-3 max-w-xl text-white/80">
            Chính sách linh hoạt từ <strong className="text-white">15 triệu VND</strong> · quỹ học bổng nhân tài{" "}
            {new Date().getFullYear()}+.
          </p>
        </div>
        <Link href={ROUTES.tuition} className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-6 md:mt-0")}>
          Xem học phí & học bổng
        </Link>
      </div>
    </section>
  )
}

export function ApplyCta() {
  return (
    <section id="xet-tuyen" className="mx-auto max-w-7xl px-4 py-20">
      <div className="rounded-3xl border border-border bg-white p-8 md:flex md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="font-display text-3xl font-bold text-brand-navy">Cổng xét tuyển trực tuyến</h2>
          <p className="mt-2 max-w-xl text-muted">
            Form 3 bước · biên nhận tự động · mã theo dõi hồ sơ. Sẵn sàng nhận hồ sơ khi bật Supabase.
          </p>
        </div>
        <Link href={ROUTES.apply} className={cn(buttonVariants({ size: "lg" }), "mt-6 md:mt-0")}>
          Bắt đầu xét tuyển
        </Link>
      </div>
    </section>
  )
}
