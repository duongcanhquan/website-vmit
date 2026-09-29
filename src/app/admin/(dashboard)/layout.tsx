import { redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { getStaff } from "@/lib/admin/auth"

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect("/admin/dang-nhap?error=config")
  }

  const { user, role } = await getStaff()
  if (!user) redirect("/admin/dang-nhap")
  if (!role) redirect("/admin/dang-nhap?error=forbidden")

  return <AdminShell>{children}</AdminShell>
}
