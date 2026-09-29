import { createClient } from "@/lib/supabase/server"
import { MediaManager } from "@/components/admin/media-manager"
import { ErrorState } from "@/components/admin/ui"

export default async function MediaPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("media_assets")
    .select(
      "id, url, path, alt_vi, alt_en, caption_vi, caption_en, kind, sort_order, is_published, is_featured",
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
  if (error) return <ErrorState message={error.message} />
  return <MediaManager assets={data ?? []} />
}
