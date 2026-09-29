import { AccountsManager, type StaffAccount } from "@/components/admin/accounts-manager"
import { AdminPageHeader, ErrorState } from "@/components/admin/ui"
import { getStaff, type StaffRole } from "@/lib/admin/auth"
import { createServiceClient } from "@/lib/supabase/admin"

export default async function Page() {
  const { user, role } = await getStaff()
  const service = createServiceClient()
  let accounts: StaffAccount[] = []
  let problem: string | null = null

  if (role === "admin" && service) {
    const [roles, users] = await Promise.all([
      service.from("app_roles").select("user_id, role, created_at"),
      service.auth.admin.listUsers({ perPage: 1000 }),
    ])
    if (roles.error) problem = roles.error.message
    const byId = new Map((users.data?.users ?? []).map((item) => [item.id, item]))
    accounts = (roles.data ?? [])
      .map((row) => {
        const account = byId.get(row.user_id as string)
        return {
          id: row.user_id as string,
          email: account?.email ?? "(không tìm thấy tài khoản)",
          role: row.role as StaffRole,
          lastSignIn: account?.last_sign_in_at ?? null,
          createdAt: account?.created_at ?? (row.created_at as string | null),
        }
      })
      .sort((a, b) => (a.role === b.role ? a.email.localeCompare(b.email) : a.role === "admin" ? -1 : 1))
  }

  return (
    <div>
      <AdminPageHeader
        title="Tài khoản quản trị"
        description="Admin: toàn quyền, gồm quản lý tài khoản và xóa hồ sơ. Biên tập viên: sửa nội dung, xử lý hồ sơ, không quản lý tài khoản."
      />
      {problem ? (
        <div className="mb-4">
          <ErrorState message={problem} />
        </div>
      ) : null}
      <AccountsManager
        currentUserId={user?.id ?? ""}
        currentEmail={user?.email ?? ""}
        isAdmin={role === "admin"}
        serviceReady={Boolean(service)}
        accounts={accounts}
      />
    </div>
  )
}
