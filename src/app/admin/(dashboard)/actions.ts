"use server"

import { revalidatePath } from "next/cache"
import { requireStaff } from "@/lib/admin/auth"
import { deleteFromR2 } from "@/lib/r2/client"
import { RICH_TEXT_FIELDS, sanitizeRichHtml } from "@/lib/rich-text"

function revalidatePublic() {
  revalidatePath("/")
  revalidatePath("/tin-tuc", "layout")
  revalidatePath("/chuong-trinh")
  revalidatePath("/lo-trinh")
  revalidatePath("/hoc-phi")
  revalidatePath("/ve-vmit")
  revalidatePath("/xet-tuyen")
  revalidatePath("/admin", "layout")
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

export async function upsertRow(table: CrudTable, payload: Record<string, unknown>) {
  const { supabase } = await requireStaff()
  const id = typeof payload.id === "string" ? payload.id : undefined
  const row: Record<string, unknown> = { ...payload, updated_at: new Date().toISOString() }
  for (const key of RICH_TEXT_FIELDS[table] ?? []) {
    if (key in row) row[key] = sanitizeRichHtml(row[key])
  }
  if (!id) {
    delete row.id
    const { error } = await supabase.from(table).insert(row)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from(table).update(row).eq("id", id)
    if (error) throw new Error(error.message)
  }
  revalidatePublic()
}

export async function deleteRow(table: CrudTable, id: string) {
  const { supabase } = await requireStaff()
  const { error } = await supabase.from(table).delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePublic()
}

export async function updateSubmissionStatus(
  table: "contact_submissions" | "admission_applications" | "scholarship_leads",
  id: string,
  status: "new" | "read" | "archived",
) {
  const { supabase } = await requireStaff()
  const { error } = await supabase
    .from(table)
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/ho-so")
}

export async function createAdmissionApplication(input: {
  full_name: string
  phone: string
  email?: string
  program: string
}) {
  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()
  const tracking_code = `VMIT-${Date.now().toString().slice(-8)}`
  const { data, error } = await supabase
    .from("admission_applications")
    .insert({
      full_name: input.full_name,
      phone: input.phone,
      email: input.email || null,
      program: input.program,
      tracking_code,
    })
    .select("tracking_code")
    .single()
  if (error) throw new Error(error.message)
  return data.tracking_code as string
}

export async function createScholarshipLead(input: {
  full_name: string
  phone: string
  email?: string
}) {
  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()
  const { error } = await supabase.from("scholarship_leads").insert({
    full_name: input.full_name,
    phone: input.phone,
    email: input.email || null,
  })
  if (error) throw new Error(error.message)
}
