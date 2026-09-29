import { redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { createClient } from "@/lib/supabase/server"

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnon) {
    redirect("/admin/dang-nhap?error=config")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/dang-nhap")
  }

  const { data: roleRow } = await supabase
    .from("app_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!roleRow || (roleRow.role !== "admin" && roleRow.role !== "editor")) {
    redirect("/admin/dang-nhap?error=forbidden")
  }

  return <AdminShell>{children}</AdminShell>
}
