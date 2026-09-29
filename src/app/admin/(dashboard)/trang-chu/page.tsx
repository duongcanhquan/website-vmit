import { HomeContentForm } from "@/components/admin/home-content-form"
import { ErrorState } from "@/components/admin/ui"
import { getStaff } from "@/lib/admin/auth"

export default async function TrangChuAdminPage() {
  const { supabase } = await getStaff()
  const { data, error } = await supabase.from("site_settings").select("key, value")
  if (error) return <ErrorState message={error.message} />
  const settings: Record<string, unknown> = {}
  for (const row of data ?? []) settings[row.key as string] = row.value
  return <HomeContentForm initial={settings} />
}
