import { cache } from "react"
import { createClient } from "@/lib/supabase/server"

export type StaffRole = "admin" | "editor"

/** One auth + role lookup per request, shared by the admin layout, pages and actions. */
export const getStaff = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { supabase, user: null, role: null }
  const { data: roleRow } = await supabase
    .from("app_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle()
  const role = roleRow?.role === "admin" || roleRow?.role === "editor" ? (roleRow.role as StaffRole) : null
  return { supabase, user, role }
})

export async function requireStaff() {
  const { supabase, user, role } = await getStaff()
  if (!user) throw new Error("Chưa đăng nhập")
  if (!role) throw new Error("Không có quyền quản trị")
  return { supabase, user, role }
}
