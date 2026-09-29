import "server-only"
import type { SupabaseClient } from "@supabase/supabase-js"

const URL_COLUMNS: Record<string, string[]> = {
  courses: ["cover_url"],
  posts: ["cover_url"],
  partners: ["logo_url"],
  team_members: ["avatar_url"],
  testimonials: ["avatar_url"],
  documents: ["file_url"],
  subjects: ["icon_url", "hover_icon_url"],
}

const HTML_COLUMNS: Record<string, string[]> = {
  posts: ["body", "body_vi", "body_en"],
}

/** Points every settings value and content row that used `oldUrl` at `newUrl`. Returns how many places changed. */
export async function replaceUrlEverywhere(supabase: SupabaseClient, oldUrl: string, newUrl: string) {
  if (!oldUrl || oldUrl === newUrl) return 0
  let changed = 0

  const settings = await supabase.from("site_settings").select("key, value")
  for (const row of settings.data ?? []) {
    const raw = JSON.stringify(row.value ?? null)
    if (!raw.includes(oldUrl)) continue
    const value = JSON.parse(raw.split(oldUrl).join(newUrl))
    const { error } = await supabase
      .from("site_settings")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("key", row.key)
    if (!error) changed += 1
  }

  for (const [table, columns] of Object.entries(URL_COLUMNS)) {
    for (const column of columns) {
      const { data, error } = await supabase.from(table).update({ [column]: newUrl }).eq(column, oldUrl).select("id")
      if (!error) changed += data?.length ?? 0
    }
  }

  for (const [table, columns] of Object.entries(HTML_COLUMNS)) {
    const filter = columns.map((column) => `${column}.like."*${oldUrl}*"`).join(",")
    const { data } = await supabase.from(table).select(["id", ...columns].join(", ")).or(filter)
    for (const row of (data ?? []) as unknown as Record<string, string | null>[]) {
      const patch: Record<string, string> = {}
      for (const column of columns) {
        const html = row[column]
        if (html?.includes(oldUrl)) patch[column] = html.split(oldUrl).join(newUrl)
      }
      const { error } = await supabase.from(table).update(patch).eq("id", row.id as string)
      if (!error) changed += 1
    }
  }

  return changed
}
