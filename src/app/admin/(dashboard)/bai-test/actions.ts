"use server"

import { revalidatePath } from "next/cache"
import { requireStaff } from "@/lib/admin/auth"
import { deliverEmail } from "@/lib/notify"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function ready(row: { full_name: string; email: string | null; phone: string | null; overall_band: number | null; summary: string | null }) {
  const phoneDigits = (row.phone ?? "").replace(/\D/g, "")
  return row.full_name.trim().length >= 2 && EMAIL.test((row.email ?? "").trim()) && phoneDigits.length >= 8 && row.overall_band != null && Boolean(row.summary?.trim())
}

export async function sendEnglishResultEmail(id: string) {
  const { supabase } = await requireStaff()
  const { data, error } = await supabase.from("english_test_attempts").select("*").eq("id", id).maybeSingle()
  if (error || !data) return { ok: false, message: error?.message ?? "Không tìm thấy bài test." }

  const row = data as {
    full_name: string
    email: string | null
    phone: string | null
    overall_band: number | null
    summary: string | null
  }
  if (!ready(row)) {
    return { ok: false, message: "Chưa đủ thông tin. Cần họ tên, email hợp lệ, số điện thoại và điểm tổng." }
  }

  const mail = await deliverEmail({
    to: [row.email ?? ""],
    subject: `Your VMIT IELTS placement result — Band ${row.overall_band}`,
    text: row.summary ?? "",
  })
  const emailStatus = mail === "sent" ? "sent" : mail
  await supabase.from("english_test_attempts").update({ email_status: emailStatus }).eq("id", id)
  revalidatePath("/admin/bai-test")

  if (mail === "sent") return { ok: true, message: `Đã gửi kết quả tới ${row.email}.` }
  if (mail === "not_configured") {
    return { ok: false, message: "Chưa gửi được. Cần RESEND_API_KEY và NOTIFY_FROM_EMAIL trên máy chủ." }
  }
  return { ok: false, message: "Máy chủ thư trả lỗi. Thử lại sau." }
}
