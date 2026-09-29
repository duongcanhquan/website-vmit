import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AdminPageHeader, AdminCard, ErrorState } from "@/components/admin/ui"

const shortcuts = [
  { href: "/admin/cai-dat", title: "Banner & hero", desc: "Đổi ảnh hero, headline ngắn VI/EN" },
  { href: "/admin/media", title: "Gallery ảnh", desc: "Caption, featured, thứ tự hiển thị" },
  { href: "/admin/chuong-trinh", title: "Chương trình", desc: "Ngành học song ngữ" },
  { href: "/admin/ho-so", title: "Hồ sơ mới", desc: "Xét tuyển · học bổng · liên hệ" },
] as const

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const [admissions, scholarships, contacts, media, publishedMedia] = await Promise.all([
    supabase.from("admission_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("scholarship_leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("media_assets").select("id", { count: "exact", head: true }),
    supabase.from("media_assets").select("id", { count: "exact", head: true }).eq("is_published", true),
  ])

  const cards = [
    { label: "Hồ sơ xét tuyển mới", value: admissions.count ?? 0, href: "/admin/ho-so" },
    { label: "Lead học bổng mới", value: scholarships.count ?? 0, href: "/admin/ho-so" },
    { label: "Liên hệ mới", value: contacts.count ?? 0, href: "/admin/ho-so" },
    {
      label: "Ảnh đã publish",
      value: `${publishedMedia.count ?? 0}/${media.count ?? 0}`,
      href: "/admin/media",
    },
  ]

  const err =
    admissions.error?.message ||
    scholarships.error?.message ||
    contacts.error?.message ||
    media.error?.message ||
    publishedMedia.error?.message

  return (
    <div>
      <AdminPageHeader
        title="Bảng điều khiển"
        description="Theo dõi hồ sơ và cập nhật nội dung/ảnh song ngữ cho trang public."
      />
      {err ? <ErrorState message={err} /> : null}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <AdminCard className="transition hover:-translate-y-0.5">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{card.label}</p>
              <p className="mt-3 font-display text-4xl text-brand-navy">{card.value}</p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-medium text-brand-navy">Lối tắt thông minh</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {shortcuts.map((item) => (
          <Link key={item.href} href={item.href}>
            <AdminCard className="h-full transition hover:border-brand-navy/25">
              <p className="font-display text-lg font-medium text-brand-navy">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.desc}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </div>
  )
}
