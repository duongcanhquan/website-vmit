"use server"

import { revalidatePath } from "next/cache"
import { requireStaff, type StaffRole } from "@/lib/admin/auth"
import { createServiceClient } from "@/lib/supabase/admin"

type Result = { ok: true } | { ok: false; error: string }

const ROLES: StaffRole[] = ["admin", "editor"]
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_PASSWORD = 8

async function adminContext() {
  const staff = await requireStaff()
  if (staff.role !== "admin") throw new Error("Chỉ tài khoản admin được quản lý người dùng.")
  const service = createServiceClient()
  if (!service) throw new Error("Thiếu SUPABASE_SERVICE_ROLE_KEY trên máy chủ nên chưa quản lý được tài khoản.")
  return { ...staff, service }
}

async function guarded(run: () => Promise<void>): Promise<Result> {
  try {
    await run()
    revalidatePath("/admin/tai-khoan")
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Thao tác thất bại." }
  }
}

function checkPassword(password: string) {
  if (password.length < MIN_PASSWORD) throw new Error(`Mật khẩu cần ít nhất ${MIN_PASSWORD} ký tự.`)
}

async function adminCount(service: NonNullable<ReturnType<typeof createServiceClient>>) {
  const { count } = await service.from("app_roles").select("user_id", { count: "exact", head: true }).eq("role", "admin")
  return count ?? 0
}

export async function createStaff(input: { email: string; password: string; role: StaffRole }): Promise<Result> {
  return guarded(async () => {
    const { service } = await adminContext()
    const email = input.email.trim().toLowerCase()
    if (!EMAIL.test(email)) throw new Error("Email chưa đúng định dạng.")
    if (!ROLES.includes(input.role)) throw new Error("Vai trò không hợp lệ.")
    checkPassword(input.password)

    let userId: string | undefined
    const created = await service.auth.admin.createUser({ email, password: input.password, email_confirm: true })
    if (created.data.user) {
      userId = created.data.user.id
    } else {
      const { data } = await service.auth.admin.listUsers({ perPage: 1000 })
      const existing = data.users.find((user) => user.email?.toLowerCase() === email)
      if (!existing) throw new Error(created.error?.message ?? "Không tạo được tài khoản.")
      userId = existing.id
      const updated = await service.auth.admin.updateUserById(userId, { password: input.password, email_confirm: true })
      if (updated.error) throw new Error(updated.error.message)
    }

    const { error } = await service.from("app_roles").upsert({ user_id: userId, role: input.role }, { onConflict: "user_id" })
    if (error) throw new Error(error.message)
  })
}

export async function setStaffRole(userId: string, role: StaffRole): Promise<Result> {
  return guarded(async () => {
    const { service, user } = await adminContext()
    if (!ROLES.includes(role)) throw new Error("Vai trò không hợp lệ.")
    if (userId === user.id && role !== "admin") throw new Error("Không tự hạ quyền của chính mình.")
    const { error } = await service.from("app_roles").update({ role }).eq("user_id", userId)
    if (error) throw new Error(error.message)
  })
}

export async function removeStaff(userId: string, deleteAccount: boolean): Promise<Result> {
  return guarded(async () => {
    const { service, user } = await adminContext()
    if (userId === user.id) throw new Error("Không tự gỡ quyền của chính mình.")
    const { data: target } = await service.from("app_roles").select("role").eq("user_id", userId).maybeSingle()
    if (target?.role === "admin" && (await adminCount(service)) <= 1) {
      throw new Error("Phải còn ít nhất một tài khoản admin.")
    }
    const { error } = await service.from("app_roles").delete().eq("user_id", userId)
    if (error) throw new Error(error.message)
    if (deleteAccount) {
      const removed = await service.auth.admin.deleteUser(userId)
      if (removed.error) throw new Error(removed.error.message)
    }
  })
}

export async function resetStaffPassword(userId: string, password: string): Promise<Result> {
  return guarded(async () => {
    const { service } = await adminContext()
    checkPassword(password)
    const { error } = await service.auth.admin.updateUserById(userId, { password })
    if (error) throw new Error(error.message)
  })
}

export async function changeOwnPassword(password: string): Promise<Result> {
  return guarded(async () => {
    const { supabase } = await requireStaff()
    checkPassword(password)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw new Error(error.message)
  })
}
