import type { SupabaseClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { ADMISSION_DETAIL_FIELDS, type AdmissionDetails } from "@/lib/lead-fields"
import { createServiceClient } from "@/lib/supabase/admin"
import { createClient as createCookieClient } from "@/lib/supabase/server"
import { deliverEmail, type MailStatus } from "@/lib/notify"

async function db() {
  return createServiceClient() ?? (await createCookieClient())
}

export class LeadInputError extends Error {}

const PHONE = /^[0-9+().\s-]{8,20}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : ""
}

function cleanPhone(value: unknown, label: string, required: boolean) {
  const phone = clean(value, 20)
  if (!phone) {
    if (required) throw new LeadInputError(`Vui lòng nhập ${label}.`)
    return ""
  }
  if (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 9) {
    throw new LeadInputError(`${label[0].toUpperCase()}${label.slice(1)} chưa đúng định dạng.`)
  }
  return phone
}

function cleanEmail(value: unknown, required: boolean) {
  const email = clean(value, 160).toLowerCase()
  if (!email) {
    if (required) throw new LeadInputError("Vui lòng nhập email.")
    return ""
  }
  if (!EMAIL.test(email)) throw new LeadInputError("Email chưa đúng định dạng.")
  return email
}

function cleanName(value: unknown) {
  const name = clean(value, 120)
  if (name.length < 2) throw new LeadInputError("Vui lòng nhập họ và tên.")
  return name
}

/** Postgres / PostgREST errors for a column or table the database does not have yet. */
function isMissingSchema(error: { code?: string; message?: string } | null) {
  if (!error) return false
  return error.code === "42703" || error.code === "PGRST204" || /column .* does not exist|schema cache/i.test(error.message ?? "")
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

export type AdmissionInput = {
  full_name: string
  phone: string
  email: string
  program: string
  details?: AdmissionDetails
  website?: string
}

export async function saveAdmission(input: AdmissionInput) {
  const tracking_code = `VMIT-${Date.now().toString().slice(-8)}`
  if (input.website) return { trackingCode: tracking_code, mail: "not_configured" as MailStatus }

  const full_name = cleanName(input.full_name)
  const phone = cleanPhone(input.phone, "số điện thoại", true)
  const email = cleanEmail(input.email, true)
  const program = clean(input.program, 80) || "Cần tư vấn"
  const details: AdmissionDetails = {}
  for (const field of ADMISSION_DETAIL_FIELDS) {
    const raw = input.details?.[field.key]
    const value = field.key === "parent_phone" ? cleanPhone(raw, "số điện thoại phụ huynh", false) : clean(raw, field.key === "note" ? 1500 : 160)
    if (value) details[field.key] = value
  }

  const client = await db()
  const base = { full_name, phone, email, program, tracking_code }
  let result = await client.from("admission_applications").insert({ ...base, details }).select("tracking_code").single()
  if (isMissingSchema(result.error)) {
    result = await client.from("admission_applications").insert(base).select("tracking_code").single()
  }
  if (result.error) throw new Error(result.error.message)

  const inbox = await admissionsInbox(client)
  const lines = ADMISSION_DETAIL_FIELDS.filter((field) => details[field.key]).map(
    (field) => `${field.label}: ${details[field.key]}`,
  )
  const mail = await deliverEmail({
    to: [inbox],
    subject: `Đăng ký xét tuyển mới — ${full_name}`,
    text: [
      "Có một đăng ký xét tuyển mới trên website VMIT.",
      `Mã hồ sơ: ${tracking_code}`,
      `Họ tên: ${full_name}`,
      `Điện thoại: ${phone}`,
      `Email: ${email}`,
      `Chương trình: ${program}`,
      ...lines,
    ].join("\n"),
  })
  revalidatePath("/admin/ho-so")
  revalidatePath("/admin")
  return { trackingCode: (result.data?.tracking_code as string) ?? tracking_code, mail }
}

export async function saveScholarship(input: { full_name: string; phone: string; email?: string; website?: string }) {
  if (input.website) return
  const full_name = cleanName(input.full_name)
  const phone = cleanPhone(input.phone, "số điện thoại", true)
  const email = cleanEmail(input.email, false)

  const client = await db()
  const { error } = await client.from("scholarship_leads").insert({ full_name, phone, email: email || null })
  if (error) throw new Error(error.message)

  const inbox = await admissionsInbox(client)
  await deliverEmail({
    to: [inbox],
    subject: `Đăng ký tư vấn học bổng — ${full_name}`,
    text: ["Có một đăng ký tư vấn học bổng mới trên website VMIT.", `Họ tên: ${full_name}`, `Điện thoại: ${phone}`, `Email: ${email || "—"}`].join("\n"),
  })
  revalidatePath("/admin/ho-so")
  revalidatePath("/admin")
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
