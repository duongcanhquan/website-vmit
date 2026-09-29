import { createClient } from "@/lib/supabase/server"
import { SettingsForm } from "@/components/admin/settings-form"
import { ErrorState } from "@/components/admin/ui"

export default async function CaiDatPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("site_settings").select("key, value")
  if (error) return <ErrorState message={error.message} />
  const serializable: Record<string, unknown> = {}
  for (const row of data ?? []) {
    serializable[row.key as string] = row.value
  }
  return <SettingsForm initial={serializable} />
}
