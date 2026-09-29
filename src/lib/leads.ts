import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { createClient as createCookieClient } from "@/lib/supabase/server"
import { deliverEmail, type MailStatus } from "@/lib/notify"

function serviceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

async function db() {
  return serviceClient() ?? (await createCookieClient())
}

function asText(value: unknown): string {
  if (typeof value === "string") return value.replaceAll('"', "").trim()
  if (value && typeof value === "object" && "vi" in value) {
    return String((value as { vi?: unknown }).vi ?? "").trim()
  }
  return ""
}

export async function admissionsInbox(client: SupabaseClient) {
  const { data } = await client
    .from("site_settings")
    .select("value")
    .eq("key", "admissions_notify_email")
    .maybeSingle()
  return (
    asText(data?.value) ||
    process.env.ADMISSIONS_NOTIFY_EMAIL?.trim() ||
    ""
  )
}

export async function saveAdmission(input: {
  full_name: string
  phone: string
  email: string
  program: string
}) {
  const client = await db()
  const tracking_code = `VMIT-${Date.now().toString().slice(-8)}`
  const { data, error } = await client
    .from("admission_applications")
    .insert({
      full_name: input.full_name.trim(),
      phone: input.phone.trim(),
      email: input.email.trim(),
      program: input.program,
      tracking_code,
    })
    .select("tracking_code")
    .single()
  if (error) throw new Error(error.message)

  const inbox = await admissionsInbox(client)
  const mail = await deliverEmail({
    to: [inbox],
    subject: `Đăng ký xét tuyển mới — ${input.full_name.trim()}`,
    text: [
      "Có một đăng ký xét tuyển mới trên website VMIT.",
      `Họ tên: ${input.full_name.trim()}`,
      `Điện thoại: ${input.phone.trim()}`,
      `Email: ${input.email.trim()}`,
      `Ngành: ${input.program}`,
      `Mã: ${tracking_code}`,
    ].join("\n"),
  })
  revalidatePath("/admin/ho-so")
  revalidatePath("/admin")
  return { trackingCode: data.tracking_code as string, mail }
}

export type EnglishTestRecord = {
  full_name: string
  email: string
  phone: string
  listening_band: number
  reading_band: number
  writing_band: number
  speaking_band: number
  overall_band: number
  cefr: string
  listening_correct: number
  reading_correct: number
  writing_task1: string
  writing_task2: string
  speaking: string
  summary: string
}

export async function saveEnglishTest(record: EnglishTestRecord): Promise<{ mail: MailStatus }> {
  const client = await db()
  const inbox = await admissionsInbox(client)
  const mail = await deliverEmail({
    to: [record.email, inbox],
    subject: `Your VMIT IELTS placement result — Band ${record.overall_band}`,
    text: record.summary,
  })

  const row = {
    full_name: record.full_name,
    email: record.email,
    phone: record.phone,
    listening_band: record.listening_band,
    reading_band: record.reading_band,
    writing_band: record.writing_band,
    speaking_band: record.speaking_band,
    overall_band: record.overall_band,
    cefr: record.cefr,
    writing_task1: record.writing_task1,
    writing_task2: record.writing_task2,
    speaking_notes: record.speaking,
    email_status: mail,
    summary: record.summary,
    detail: {
      listening_correct: record.listening_correct,
      reading_correct: record.reading_correct,
    },
  }

  const inserted = await client.from("english_test_attempts").insert(row)
  if (inserted.error) {
    const fallback = await client.from("contact_submissions").insert({
      full_name: record.full_name,
      phone: record.phone,
      email: record.email,
      subject: "IELTS placement test",
      message: record.summary,
      status: "new",
    })
    if (fallback.error) throw new Error(inserted.error.message)
  }

  revalidatePath("/admin/bai-test")
  revalidatePath("/admin/ho-so")
  return { mail }
}
