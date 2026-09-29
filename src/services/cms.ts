import { createClient } from "@/lib/supabase/server"
import { settingText } from "@/lib/i18n/locale-text"
import type { Locale } from "@/lib/i18n/types"

export type CmsLoadState<T> =
  | { status: "ok"; data: T }
  | { status: "empty"; data: T }
  | { status: "error"; message: string; data: T }

async function publicClient() {
  return createClient()
}

export async function getSettingsMap(): Promise<CmsLoadState<Record<string, unknown>>> {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase.from("site_settings").select("key, value")
    if (error) return { status: "error", message: error.message, data: {} }
    const map: Record<string, unknown> = {}
    for (const row of data ?? []) {
      map[row.key as string] = row.value
    }
    return { status: Object.keys(map).length ? "ok" : "empty", data: map }
  } catch (err) {
    return { status: "error", message: err instanceof Error ? err.message : "Lỗi settings", data: {} }
  }
}

export function setting(map: Record<string, unknown>, key: string, locale: Locale, fallback = ""): string {
  return settingText(map[key], locale) || fallback
}

export async function getPublishedCourses() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("courses")
      .select("id, slug, title_vi, title_en, summary_vi, summary_en, cover_url, sort_order")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}

export async function getPublishedPartners() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("partners")
      .select("id, name, logo_url, sort_order")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}

export async function getPublishedPillars() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase.from("pillars").select("*").eq("is_published", true).order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}

export async function getPublishedCounters() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("impact_counters")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}

export async function getPublishedPathway() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("pathway_steps")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}

export async function getPublishedPricing() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("pricing_plans")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}

export async function getPublishedDocuments() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}

export type GalleryAsset = {
  id: string
  url: string
  alt_vi: string
  alt_en: string
  caption_vi: string
  caption_en: string
  kind: string
  sort_order: number
  is_featured: boolean
}

export async function getPublishedGallery() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("media_assets")
      .select("id, url, alt_vi, alt_en, caption_vi, caption_en, kind, sort_order, is_featured")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] as GalleryAsset[] }
    return {
      status: data?.length ? ("ok" as const) : ("empty" as const),
      data: (data ?? []) as GalleryAsset[],
    }
  } catch (err) {
    return {
      status: "error" as const,
      message: err instanceof Error ? err.message : "Lỗi",
      data: [] as GalleryAsset[],
    }
  }
}

export async function getPublishedTeam() {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("team_members")
      .select(
        "id, full_name, full_name_vi, full_name_en, role_title, role_title_vi, role_title_en, avatar_url, sort_order",
      )
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
}
