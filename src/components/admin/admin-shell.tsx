"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ADMIN_NAV_GROUPS } from "@/constants/admin-nav"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/dang-nhap")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-mist text-brand-navy">
      <div className="mx-auto flex max-w-[1400px] gap-0 md:gap-6">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-border bg-white p-4 md:block">
          <p className="font-display text-xl text-brand-navy">VMIT Admin</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
            Cổng quản trị nội dung · VI/EN
          </p>
          <Link
            href="/admin"
            className="mt-3 inline-block text-xs font-bold text-primary hover:underline"
          >
            Bảng điều khiển
          </Link>
          <nav className="mt-6 flex flex-col gap-5">
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.id}>
                <p className="mb-1.5 px-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
                  {group.label}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/admin" && pathname.startsWith(item.href))
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-xl px-3 py-2 transition",
                          active ? "bg-brand-navy text-white" : "text-brand-navy/80 hover:bg-sky",
                        )}
                      >
                        <span className="block text-sm font-bold">{item.label}</span>
                        {item.hint ? (
                          <span
                            className={cn(
                              "mt-0.5 block text-[11px] font-medium leading-snug",
                              active ? "text-white/70" : "text-muted",
                            )}
                          >
                            {item.hint}
                          </span>
                        ) : null}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => void logout()}
            className="mt-8 w-full rounded-[3px] border border-border px-3 py-2 text-sm font-bold text-primary transition duration-300 hover:bg-mist"
          >
            Đăng xuất
          </button>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 md:px-2 md:py-8">{children}</main>
      </div>
    </div>
  )
}
