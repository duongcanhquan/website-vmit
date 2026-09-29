import { createClient } from "@/lib/supabase/server"

export async function requireStaff() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Chưa đăng nhập")
  }
  const { data: roleRow } = await supabase
    .from("app_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle()
  if (!roleRow || (roleRow.role !== "admin" && roleRow.role !== "editor")) {
    throw new Error("Không có quyền quản trị")
  }
  return { supabase, user, role: roleRow.role as "admin" | "editor" }
}
