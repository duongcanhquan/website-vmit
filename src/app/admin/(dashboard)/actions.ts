"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { clearCmsCache } from "@/services/cms"
import { requireStaff } from "@/lib/admin/auth"
import { deleteFromR2 } from "@/lib/r2/client"
import { RICH_TEXT_FIELDS, sanitizeRichHtml } from "@/lib/rich-text"

function revalidatePublic() {
  clearCmsCache()
  revalidateTag("cms")
  revalidatePath("/")
  revalidatePath("/news", "layout")
  revalidatePath("/programs")
  revalidatePath("/pathway")
  revalidatePath("/tuition")
  revalidatePath("/about")
  revalidatePath("/apply")
  revalidatePath("/btec-schools")
  revalidatePath("/sitemap.xml")
  revalidatePath("/robots.txt")
}

export async function upsertSetting(key: string, value: unknown) {
  const { supabase } = await requireStaff()
  const { error } = await supabase.from("site_settings").upsert({
    key,
    value,
    updated_at: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
  revalidatePublic()
}

export async function saveSettingsBatch(entries: Record<string, unknown>) {
  const { supabase } = await requireStaff()
  const rows = Object.entries(entries).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }))
  const { error } = await supabase.from("site_settings").upsert(rows)
  if (error) throw new Error(error.message)
  revalidatePublic()
}

export async function deleteMediaAsset(id: string, path: string) {
  const { supabase } = await requireStaff()
  try {
    await deleteFromR2(path)
  } catch {
    // continue DB delete even if R2 object missing
  }
  const { error } = await supabase.from("media_assets").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePublic()
}

export async function updateMediaAsset(
  id: string,
  payload: {
    alt_vi: string
    alt_en: string
    caption_vi: string
    caption_en: string
    kind: string
    sort_order: number
    is_published: boolean
    is_featured: boolean
  },
) {
  const { supabase } = await requireStaff()
  const kind = ["hero", "campus", "partner", "document", "other"].includes(payload.kind)
    ? payload.kind
    : "other"
  const { error } = await supabase
    .from("media_assets")
    .update({
      alt_vi: payload.alt_vi,
      alt_en: payload.alt_en,
      caption_vi: payload.caption_vi,
      caption_en: payload.caption_en,
      kind,
      sort_order: payload.sort_order,
      is_published: payload.is_published,
      is_featured: payload.is_featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePublic()
}

type CrudTable =
  | "documents"
  | "partners"
  | "pillars"
  | "pathway_steps"
  | "impact_counters"
  | "courses"
  | "team_members"
  | "pricing_plans"
  | "faqs"
  | "testimonials"
  | "posts"
  | "subjects"

export async function upsertRow(
  table: CrudTable,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const { supabase } = await requireStaff()
  const id = typeof payload.id === "string" ? payload.id : undefined
  const row: Record<string, unknown> = { ...payload, updated_at: new Date().toISOString() }
  for (const key of RICH_TEXT_FIELDS[table] ?? []) {
    if (key in row) row[key] = sanitizeRichHtml(row[key])
  }
  delete row.id
  delete row.created_at
  const query = id
    ? supabase.from(table).update(row).eq("id", id).select("*").single()
    : supabase.from(table).insert(row).select("*").single()
  const { data, error } = await query
  if (error) throw new Error(error.message)
  revalidatePublic()
  return data as Record<string, unknown>
}

export async function deleteRow(table: CrudTable, id: string) {
  const { supabase } = await requireStaff()
  const { error } = await supabase.from(table).delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePublic()
}

type PublicResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string }

async function publicAction<T>(run: () => Promise<T>): Promise<PublicResult<T>> {
  const { LeadInputError } = await import("@/lib/leads")
  try {
    return { ok: true, data: await run() }
  } catch (err) {
    if (err instanceof LeadInputError) return { ok: false, error: err.message }
    console.error("[lead]", err)
    return { ok: false, error: "Chưa gửi được hồ sơ. Vui lòng thử lại hoặc gọi hotline." }
  }
}

export async function createAdmissionApplication(input: import("@/lib/leads").AdmissionInput) {
  const { saveAdmission } = await import("@/lib/leads")
  return publicAction(async () => (await saveAdmission(input)).trackingCode)
}

export async function createScholarshipLead(input: {
  full_name: string
  phone: string
  email?: string
  website?: string
}) {
  const { saveScholarship } = await import("@/lib/leads")
  return publicAction(() => saveScholarship(input))
}
