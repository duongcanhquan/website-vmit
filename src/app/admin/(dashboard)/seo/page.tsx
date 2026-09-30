import { createClient } from "@/lib/supabase/server"
import { SeoForm } from "@/components/admin/seo-form"
import { ErrorState } from "@/components/admin/ui"

export default async function SeoPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("site_settings").select("key, value")
  if (error) return <ErrorState message={error.message} />
  const initial: Record<string, unknown> = {}
  for (const row of data ?? []) initial[row.key as string] = row.value
  return <SeoForm initial={initial} />
}
