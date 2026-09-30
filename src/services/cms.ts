import { unstable_cache } from "next/cache"
import { createClient } from "@supabase/supabase-js"
import { settingText } from "@/lib/i18n/locale-text"
import type { Locale } from "@/lib/i18n/types"

const bucket = new Map<string, { exp: number; value: unknown }>()

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error("Thiếu cấu hình Supabase")
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/** Drop in-memory CMS cache after an admin save. Route cache is cleared separately. */
export function clearCmsCache() {
  bucket.clear()
  persistedFns.clear()
}

const persistedFns = new Map<string, () => Promise<{ status: string }>>()

async function remember<T extends { status: string }>(key: string, load: () => Promise<T>): Promise<T> {
  const now = Date.now()
  const hit = bucket.get(key)
  if (hit && hit.exp > now) return hit.value as T
  let cached = persistedFns.get(key) as (() => Promise<T>) | undefined
  if (!cached) {
    cached = unstable_cache(load, ["cms", key], { revalidate: 120, tags: ["cms"] })
    persistedFns.set(key, cached as () => Promise<{ status: string }>)
  }
  const value = await cached()
  if (value.status !== "error") bucket.set(key, { exp: now + 120_000, value })
  return value
}

export type CmsLoadState<T> =
  | { status: "ok"; data: T }
  | { status: "empty"; data: T }
  | { status: "error"; message: string; data: T }

async function publicClient() {
  return db()
}

export async function getSettingsMap(): Promise<CmsLoadState<Record<string, unknown>>> {
  return remember("getSettingsMap", async () => {
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
  })
}

export function setting(map: Record<string, unknown>, key: string, locale: Locale, fallback = ""): string {
  return settingText(map[key], locale) || fallback
}

export async function getPublishedCourses() {
  return remember("getPublishedCourses", async () => {
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
  })
}

export async function getPublishedPartners() {
  return remember("getPublishedPartners", async () => {
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
  })
}

export async function getPublishedPillars() {
  return remember("getPublishedPillars", async () => {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase.from("pillars").select("*").eq("is_published", true).order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
  })
}

export async function getPublishedCounters() {
  return remember("getPublishedCounters", async () => {
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
  })
}

export async function getPublishedPathway() {
  return remember("getPublishedPathway", async () => {
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
  })
}

export async function getPublishedPricing() {
  return remember("getPublishedPricing", async () => {
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
  })
}

export async function getPublishedDocuments() {
  return remember("getPublishedDocuments", async () => {
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
  })
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
  return remember("getPublishedGallery", async () => {
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
  })
}

export async function getPublishedTeam() {
  return remember("getPublishedTeam", async () => {
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
  })
}

export async function getPublishedTestimonials() {
  return remember("getPublishedTestimonials", async () => {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, author_name, author_role_vi, author_role_en, quote_vi, quote_en, avatar_url, sort_order")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
  })
}

export async function getPublishedPosts() {
  return remember("getPublishedPosts", async () => {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, slug, title_vi, title_en, excerpt_vi, excerpt_en, cover_url, author_name, published_at",
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(6)
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
  })
}

const POST_LIST_COLUMNS =
  "id, slug, title_vi, title_en, excerpt_vi, excerpt_en, cover_url, author_name, published_at, seo_title_vi, seo_title_en, seo_description_vi, seo_description_en"

export async function getAllPublishedPosts() {
  return remember("getAllPublishedPosts", async () => {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("posts")
      .select(POST_LIST_COLUMNS)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(60)
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
  })
}

export async function getPublishedPostBySlug(slug: string) {
  return remember(`getPublishedPostBySlug:${slug}`, async () => {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("posts")
      .select(`${POST_LIST_COLUMNS}, body, body_vi, body_en`)
      .eq("is_published", true)
      .eq("slug", slug)
      .maybeSingle()
    if (error) return { status: "error" as const, message: error.message, data: null }
    return { status: data ? ("ok" as const) : ("empty" as const), data }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: null }
  }
  })
}

export async function getPublishedSubjects() {
  return remember("getPublishedSubjects", async () => {
  try {
    const supabase = await publicClient()
    const { data, error } = await supabase
      .from("subjects")
      .select("id, title_vi, title_en, count_label_vi, count_label_en, icon_url, hover_icon_url, sort_order")
      .eq("is_published", true)
      .order("sort_order")
    if (error) return { status: "error" as const, message: error.message, data: [] }
    return { status: data?.length ? ("ok" as const) : ("empty" as const), data: data ?? [] }
  } catch (err) {
    return { status: "error" as const, message: err instanceof Error ? err.message : "Lỗi", data: [] }
  }
  })
}
