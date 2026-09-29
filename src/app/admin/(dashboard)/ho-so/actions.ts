"use server"

import { revalidatePath } from "next/cache"
import { requireStaff } from "@/lib/admin/auth"
import { LEAD_STATUS_LABEL, type LeadStatus, type LeadTable } from "@/lib/lead-fields"

const TABLES: LeadTable[] = ["admission_applications", "scholarship_leads", "contact_submissions"]

type Result = { ok: true } | { ok: false; error: string }

function explain(message: string) {
  if (/status_check|violates check constraint/i.test(message)) {
    return "Database chưa hỗ trợ trạng thái này. Chạy file supabase/migrations/20260930_admin_core.sql trong Supabase SQL Editor."
  }
  if (/admin_note|details|column/i.test(message)) {
    return "Database thiếu cột mới. Chạy file supabase/migrations/20260930_admin_core.sql trong Supabase SQL Editor."
  }
  return message
}

export async function updateLead(
  table: LeadTable,
  id: string,
  patch: { status?: LeadStatus; admin_note?: string },
): Promise<Result> {
  if (!TABLES.includes(table)) return { ok: false, error: "Bảng không hợp lệ." }
  const { supabase } = await requireStaff()
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (patch.status) {
    if (!(patch.status in LEAD_STATUS_LABEL)) return { ok: false, error: "Trạng thái không hợp lệ." }
    row.status = patch.status
  }
  if (typeof patch.admin_note === "string") row.admin_note = patch.admin_note.slice(0, 4000)
  const { data, error } = await supabase.from(table).update(row).eq("id", id).select("id")
  if (error) return { ok: false, error: explain(error.message) }
  if (!data?.length) return { ok: false, error: NO_ACCESS }
  revalidatePath("/admin")
  return { ok: true }
}

const NO_ACCESS =
  "Không cập nhật được: database chưa cấp quyền sửa cho tài khoản quản trị. Chạy file supabase/migrations/20260930_admin_core.sql."

export async function deleteLead(table: LeadTable, id: string): Promise<Result> {
  if (!TABLES.includes(table)) return { ok: false, error: "Bảng không hợp lệ." }
  const { supabase, role } = await requireStaff()
  if (role !== "admin") return { ok: false, error: "Chỉ tài khoản admin được xóa hồ sơ." }
  const { data, error } = await supabase.from(table).delete().eq("id", id).select("id")
  if (error) return { ok: false, error: explain(error.message) }
  if (!data?.length) return { ok: false, error: NO_ACCESS }
  revalidatePath("/admin")
  return { ok: true }
}
