import Link from "next/link"
import { CheckCircle2, CircleAlert } from "lucide-react"
import { AdminPageHeader, AdminCard } from "@/components/admin/ui"
import { getStaff } from "@/lib/admin/auth"
import { LEAD_STATUS_LABEL, type LeadStatus } from "@/lib/lead-fields"
import { cn } from "@/lib/utils"

const shortcuts = [
  { href: "/admin/trang-chu", title: "Nội dung trang chủ", desc: "Mọi chữ và ảnh, theo từng khối" },
  { href: "/admin/cai-dat", title: "Banner & hero", desc: "Chữ VI/EN, nút + link trang, Facebook/TikTok" },
  { href: "/admin/media", title: "Gallery ảnh", desc: "Caption, featured, thứ tự hiển thị" },
  { href: "/admin/chuong-trinh", title: "Chương trình", desc: "Chương trình song ngữ" },
  { href: "/admin/bai-viet", title: "Viết tin tức", desc: "Bài mới, nháp và xuất bản" },
  { href: "/admin/ho-so", title: "Hồ sơ & đăng ký", desc: "Xét tuyển · học bổng · liên hệ" },
  { href: "/admin/tai-khoan", title: "Tài khoản quản trị", desc: "Thêm người, phân quyền, đổi mật khẩu" },
] as const

const inventory = [
  { table: "courses", label: "Chương trình", href: "/admin/chuong-trinh" },
  { table: "posts", label: "Tin tức", href: "/admin/bai-viet" },
  { table: "media_assets", label: "Ảnh", href: "/admin/media" },
  { table: "documents", label: "Tài liệu", href: "/admin/tai-lieu" },
  { table: "partners", label: "Đối tác", href: "/admin/doi-tac" },
  { table: "team_members", label: "Đội ngũ", href: "/admin/doi-ngu" },
  { table: "faqs", label: "FAQ", href: "/admin/faq" },
  { table: "testimonials", label: "Đánh giá", href: "/admin/danh-gia" },
  { table: "pricing_plans", label: "Học phí", href: "/admin/hoc-phi" },
  { table: "pathway_steps", label: "Lộ trình", href: "/admin/lo-trinh" },
] as const

const LEAD_KIND = {
  admission_applications: { label: "Xét tuyển", tab: "xet-tuyen" },
  scholarship_leads: { label: "Học bổng", tab: "hoc-bong" },
  contact_submissions: { label: "Liên hệ", tab: "lien-he" },
} as const

type RecentLead = {
  id: string
  kind: keyof typeof LEAD_KIND
  full_name: string | null
  phone: string | null
  topic: string | null
  status: string | null
  created_at: string
}

function hasEnv(...names: string[]) {
  return names.every((name) => Boolean(process.env[name]?.trim()))
}

function timeAgo(value: string) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000))
  if (minutes < 60) return `${minutes} phút trước`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} giờ trước`
  return `${Math.round(hours / 24)} ngày trước`
}

export default async function AdminDashboardPage() {
  const { supabase } = await getStaff()
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
  const count = (table: string) => supabase.from(table).select("id", { count: "exact", head: true })
  const recent = (table: keyof typeof LEAD_KIND, topic: string) =>
    supabase
      .from(table)
      .select(`id, full_name, phone, status, created_at, ${topic}`)
      .order("created_at", { ascending: false })
      .limit(6)

  const [admissions, scholarships, contacts, tests, probe, inboxSetting, recentRows, totals, published] = await Promise.all([
    count("admission_applications").eq("status", "new"),
    count("scholarship_leads").eq("status", "new"),
    count("contact_submissions").eq("status", "new"),
    count("english_test_attempts").gte("created_at", weekAgo),
    supabase.from("admission_applications").select("details, admin_note").limit(1),
    supabase.from("site_settings").select("value").eq("key", "admissions_notify_email").maybeSingle(),
    Promise.all([
      recent("admission_applications", "program"),
      recent("scholarship_leads", "email"),
      recent("contact_submissions", "subject"),
    ]),
    Promise.all(inventory.map((item) => count(item.table))),
    Promise.all(inventory.map((item) => count(item.table).eq("is_published", true))),
  ])

  const cards = [
    { label: "Hồ sơ xét tuyển mới", value: admissions.count, href: "/admin/ho-so?tab=xet-tuyen" },
    { label: "Tư vấn học bổng mới", value: scholarships.count, href: "/admin/ho-so?tab=hoc-bong" },
    { label: "Liên hệ mới", value: contacts.count, href: "/admin/ho-so?tab=lien-he" },
    { label: "Bài test IELTS (7 ngày)", value: tests.count, href: "/admin/bai-test" },
  ]

  const leads: RecentLead[] = recentRows
    .flatMap((result, index) => {
      const kind = (Object.keys(LEAD_KIND) as RecentLead["kind"][])[index]
      return ((result.data ?? []) as unknown as Record<string, string | null>[]).map((row) => ({
        id: row.id as string,
        kind,
        full_name: row.full_name,
        phone: row.phone,
        topic: row.program ?? row.subject ?? row.email ?? null,
        status: row.status,
        created_at: row.created_at as string,
      }))
    })
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 8)

  const inboxValue = typeof inboxSetting.data?.value === "string" ? inboxSetting.data.value.trim() : ""
  const health = [
    {
      ok: hasEnv("NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      label: "Kết nối Supabase",
      fix: "Khai báo NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    },
    {
      ok: !probe.error,
      label: "Cấu trúc dữ liệu admin",
      fix: "Chạy supabase/migrations/20260930_admin_core.sql trong Supabase SQL Editor.",
    },
    {
      ok: hasEnv("SUPABASE_SERVICE_ROLE_KEY"),
      label: "Khóa máy chủ (form đăng ký, tài khoản, API tin tức)",
      fix: "Thêm SUPABASE_SERVICE_ROLE_KEY trên Vercel (chỉ server, không để NEXT_PUBLIC_).",
    },
    {
      ok: hasEnv("R2_ENDPOINT", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "NEXT_PUBLIC_CDN_URL"),
      label: "Upload ảnh (Cloudflare R2)",
      fix: "Khai báo R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, NEXT_PUBLIC_CDN_URL.",
    },
    {
      ok: hasEnv("RESEND_API_KEY", "NOTIFY_FROM_EMAIL"),
      label: "Gửi email thông báo",
      fix: "Khai báo RESEND_API_KEY và NOTIFY_FROM_EMAIL (domain đã xác minh trên Resend).",
    },
    {
      ok: Boolean(inboxValue || process.env.ADMISSIONS_NOTIFY_EMAIL?.trim()),
      label: "Hộp thư nhận hồ sơ",
      fix: "Điền email tuyển sinh ở Cài đặt, hoặc biến ADMISSIONS_NOTIFY_EMAIL.",
    },
    {
      ok: hasEnv("NEWS_API_KEY"),
      label: "API đăng tin tự động",
      fix: "Khai báo NEWS_API_KEY nếu cần đăng tin từ hệ thống ngoài.",
    },
  ]
  const healthy = health.filter((item) => item.ok).length

  return (
    <div>
      <AdminPageHeader
        title="Bảng điều khiển"
        description="Hồ sơ cần xử lý, nội dung đang hiển thị và tình trạng cấu hình website."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <AdminCard className="h-full transition hover:-translate-y-0.5 hover:border-primary/40">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{card.label}</p>
              <p className="mt-3 font-display text-4xl text-brand-navy">{card.value ?? "—"}</p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <AdminCard className="p-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <p className="font-bold text-brand-navy">Đăng ký gần đây</p>
            <Link href="/admin/ho-so" className="text-sm font-semibold text-primary hover:underline">
              Xem tất cả
            </Link>
          </div>
          {leads.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted">Chưa có đăng ký nào.</p>
          ) : (
            <ul className="divide-y divide-border">
              {leads.map((lead) => (
                <li key={`${lead.kind}-${lead.id}`}>
                  <Link
                    href={`/admin/ho-so?tab=${LEAD_KIND[lead.kind].tab}`}
                    className="flex items-center gap-3 px-5 py-3 transition hover:bg-mist"
                  >
                    <span className="w-20 shrink-0 text-xs font-extrabold uppercase tracking-wide text-primary">
                      {LEAD_KIND[lead.kind].label}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-brand-navy">{lead.full_name || "—"}</span>
                      <span className="block truncate text-xs text-muted">
                        {[lead.phone, lead.topic].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold",
                        lead.status === "new" ? "bg-primary text-white" : "bg-mist text-muted",
                      )}
                    >
                      {LEAD_STATUS_LABEL[(lead.status ?? "new") as LeadStatus] ?? lead.status}
                    </span>
                    <span className="hidden w-24 shrink-0 text-right text-xs text-muted sm:block">
                      {timeAgo(lead.created_at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <p className="font-bold text-brand-navy">Tình trạng hệ thống</p>
            <span className="text-sm font-semibold text-muted">
              {healthy}/{health.length} sẵn sàng
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {health.map((item) => (
              <li key={item.label} className="flex gap-2.5">
                {item.ok ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                ) : (
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-600" />
                )}
                <div className="min-w-0">
                  <p className={cn("text-sm font-semibold", item.ok ? "text-brand-navy" : "text-amber-800")}>
                    {item.label}
                  </p>
                  {!item.ok ? <p className="text-xs text-muted">{item.fix}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>

      <h2 className="mt-10 font-display text-xl font-medium text-brand-navy">Nội dung đang hiển thị</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {inventory.map((item, index) => (
          <Link key={item.table} href={item.href}>
            <AdminCard className="h-full p-4 transition hover:border-primary/40">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{item.label}</p>
              <p className="mt-2 font-display text-2xl text-brand-navy">
                {published[index].count ?? "—"}
                <span className="text-base text-muted">/{totals[index].count ?? "—"}</span>
              </p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-medium text-brand-navy">Lối tắt</h2>
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
