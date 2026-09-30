import { SendResultButton } from "@/components/admin/send-result-button"
import { AdminCard, AdminPageHeader, EmptyState, ErrorState } from "@/components/admin/ui"
import { createClient } from "@/lib/supabase/server"

type AttemptDetail = {
  listening_correct?: number
  reading_correct?: number
  writing_correct?: number
  speaking_correct?: number
  listening_total?: number
  reading_total?: number
  writing_total?: number
  speaking_total?: number
}

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
  detail: AttemptDetail | null
  created_at: string
  message?: string | null
  subject?: string | null
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function scoreLine(label: string, band: number | null, correct: number | undefined, total: number | undefined) {
  if (band == null) return null
  const fraction = correct != null && total != null ? ` (${correct}/${total})` : ""
  return `${label} ${band}${fraction}`
}

function canSend(row: Attempt) {
  const phoneDigits = (row.phone ?? "").replace(/\D/g, "")
  return row.full_name.trim().length >= 2 && EMAIL.test((row.email ?? "").trim()) && phoneDigits.length >= 8 && row.overall_band != null && Boolean(row.summary?.trim())
}

export default async function Page() {
  const supabase = await createClient()
  const attempts = await supabase.from("english_test_attempts").select("*").order("created_at", { ascending: false }).limit(100)

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
    note = "Bảng english_test_attempts chưa có trên Supabase. Kết quả đang hiện từ hồ sơ liên hệ."
  }

  return (
    <div>
      <AdminPageHeader
        title="Bài test IELTS"
        description="Bài làm là trắc nghiệm và được chấm tự động. Kiểm tra họ tên, email và số điện thoại, rồi bấm gửi để email kết quả cho thí sinh."
      />
      {note ? <p className="mb-4 text-sm text-muted">{note}</p> : null}
      {rows.length === 0 ? (
        <EmptyState message="Chưa có bài test nào." />
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const detail = row.detail
            const scores = [
              scoreLine("L", row.listening_band, detail?.listening_correct, detail?.listening_total),
              scoreLine("R", row.reading_band, detail?.reading_correct, detail?.reading_total),
              scoreLine("W", row.writing_band, detail?.writing_correct, detail?.writing_total),
              scoreLine("S", row.speaking_band, detail?.speaking_correct, detail?.speaking_total),
            ].filter((item): item is string => Boolean(item))
            const ready = canSend(row)
            return (
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
                {scores.length > 0 ? <p className="mt-1 text-sm">{scores.join(" · ")}</p> : null}
                {row.summary ? (
                  <details className="mt-2 text-sm">
                    <summary className="cursor-pointer font-semibold text-primary">Xem bài làm</summary>
                    <pre className="mt-2 whitespace-pre-wrap text-muted">{row.summary}</pre>
                  </details>
                ) : null}
                {row.summary ? <SendResultButton id={row.id} ready={ready} status={row.email_status} /> : null}
              </AdminCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
