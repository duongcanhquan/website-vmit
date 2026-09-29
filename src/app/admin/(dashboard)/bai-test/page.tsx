import { createClient } from "@/lib/supabase/server"
import { AdminCard, AdminPageHeader, EmptyState, ErrorState } from "@/components/admin/ui"

type Attempt = {
  id: string
  full_name: string
  email: string | null
  phone: string | null
  overall_band: number | null
  cefr: string | null
  listening_band: number | null
  reading_band: number | null
  writing_band: number | null
  speaking_band: number | null
  email_status: string | null
  summary: string | null
  created_at: string
  message?: string | null
  subject?: string | null
}

export default async function Page() {
  const supabase = await createClient()
  const attempts = await supabase
    .from("english_test_attempts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  let rows = (attempts.data ?? []) as Attempt[]
  let note: string | null = null
  if (attempts.error) {
    const fallback = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("subject", "IELTS placement test")
      .order("created_at", { ascending: false })
      .limit(100)
    if (fallback.error) return <ErrorState message={attempts.error.message} />
    rows = (fallback.data ?? []) as Attempt[]
    note = "Bảng english_test_attempts chưa có trên Supabase. Kết quả đang hiện từ hồ sơ liên hệ. Chạy file supabase/migrations/20260929_english_test.sql để lưu đủ điểm từng kỹ năng."
  }

  return (
    <div>
      <AdminPageHeader
        title="Bài test IELTS"
        description="Thí sinh nhập tên, email và số điện thoại trước khi làm bài. Email kết quả gửi khi đã cấu hình RESEND_API_KEY và NOTIFY_FROM_EMAIL."
      />
      {note ? <p className="mb-4 text-sm text-muted">{note}</p> : null}
      {rows.length === 0 ? (
        <EmptyState message="Chưa có bài test nào." />
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <AdminCard key={row.id}>
              <p className="font-bold">
                {row.full_name}{" "}
                {row.overall_band != null ? <span className="text-primary">· Band {row.overall_band}</span> : null}
                {row.cefr ? <span className="text-muted"> · {row.cefr}</span> : null}
              </p>
              <p className="text-sm text-muted">
                {row.phone ?? "—"} · {row.email ?? "—"} · {new Date(row.created_at).toLocaleString("vi-VN")}
                {row.email_status ? ` · email: ${row.email_status}` : ""}
              </p>
              {row.listening_band != null ? (
                <p className="mt-1 text-sm">
                  L {row.listening_band} · R {row.reading_band} · W {row.writing_band} · S {row.speaking_band}
                </p>
              ) : null}
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer font-semibold text-primary">Xem bài làm</summary>
                <pre className="mt-2 whitespace-pre-wrap text-muted">{row.summary || row.message}</pre>
              </details>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}
