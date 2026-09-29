import Image from "next/image"
import Link from "next/link"
import { NAV_ITEMS, ROUTES, SITE } from "@/constants/site"

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#000f3d] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(227,27,35,0.22),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-vmit.png"
            alt="VMIT"
            width={160}
            height={64}
            className="h-auto w-[148px] object-contain"
          />
          <p className="mt-5 font-display text-2xl font-medium italic tracking-tight text-white/90">
            {SITE.brandTagline}
          </p>
          <p className="mt-2 text-sm text-white/60">{SITE.heroSlogan}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Điều hướng</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={ROUTES.apply} className="text-white/80 transition hover:text-white">
                Xét tuyển {SITE.admissionYear}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Liên hệ</p>
          <p className="mt-4 text-[15px] text-white/80">{SITE.hotlineDisplay}</p>
          <p className="mt-2 text-sm text-white/50">[VMIT: địa chỉ / email]</p>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs tracking-wide text-white/40">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  )
}
