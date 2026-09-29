import Link from "next/link"
import { NAV_ITEMS, ROUTES, SITE } from "@/constants/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-brand-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            <span className="text-brand-red">VM</span>
            <span>IT</span>
          </p>
          <p className="mt-2 text-sm text-white/75">{SITE.brandTagline}</p>
          <p className="mt-1 text-sm text-white/75">{SITE.heroSlogan}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Điều hướng</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-red">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={ROUTES.apply} className="hover:text-brand-red">
                Xét tuyển {SITE.admissionYear}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Liên hệ</p>
          <p className="mt-3 text-sm text-white/80">{SITE.hotlineDisplay}</p>
          <p className="mt-2 text-sm text-white/60">[VMIT: địa chỉ / email]</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  )
}
