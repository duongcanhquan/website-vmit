import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { timingSafeEqual } from "node:crypto"
import { uploadToR2 } from "@/lib/r2/client"
import { sanitizeRichHtml } from "@/lib/rich-text"

const MAX_BYTES = 12 * 1024 * 1024
const MAX_IMAGES = 12

const IMAGE_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

export class NewsApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export function assertNewsApiKey(request: Request) {
  const expected = process.env.NEWS_API_KEY?.trim()
  if (!expected) {
    throw new NewsApiError("Chưa cấu hình NEWS_API_KEY trên máy chủ.", 503)
  }
  const header = request.headers.get("authorization") ?? ""
  const fromBearer = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : ""
  const token = fromBearer || request.headers.get("x-api-key")?.trim() || ""
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new NewsApiError("Khóa API không đúng.", 401)
  }
}

export function createNewsClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new NewsApiError("Thiếu SUPABASE_SERVICE_ROLE_KEY để ghi bài.", 503)
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

export function slugifyTitle(input: string) {
  const slug = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
  return slug || `tin-${Date.now().toString().slice(-6)}`
}

function asHtml(value: string) {
  const textValue = value.trim()
  if (!textValue) return ""
  if (/<[a-z][\s\S]*>/i.test(textValue)) return textValue
  return textValue
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>")}</p>`)
    .join("")
}

function escapeAttr(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")
}

export function placeImages(html: string, images: { url: string; alt: string }[]) {
  const used = new Set<number>()
  let cursor = 0
  const withSlots = html.replace(/\{\{\s*(?:image|anh)(?:\s*:\s*(\d+))?\s*\}\}/gi, (_match, index: string | undefined) => {
    const i = index === undefined ? cursor++ : Number(index)
    const image = images[i]
    if (!image) return ""
    used.add(i)
    return `<figure><img src="${escapeAttr(image.url)}" alt="${escapeAttr(image.alt)}"></figure>`
  })
  const rest = images.filter((_, index) => !used.has(index))
  const extra = rest
    .map((image) => `<figure><img src="${escapeAttr(image.url)}" alt="${escapeAttr(image.alt)}"></figure>`)
    .join("")
  return withSlots + extra
}

function isPublicHttps(raw: string) {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return false
  }
  if (url.protocol !== "https:") return false
  const host = url.hostname.toLowerCase()
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return false
  if (/^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)) return false
  return true
}

async function readRemoteImage(raw: string) {
  if (!isPublicHttps(raw)) throw new NewsApiError("Ảnh phải là đường dẫn https công khai.", 400)
  const response = await fetch(raw, { redirect: "follow", signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw new NewsApiError("Không tải được ảnh từ đường dẫn.", 400)
  const type = (response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase()
  if (!IMAGE_EXT[type]) throw new NewsApiError("Ảnh phải là JPG, PNG, WEBP hoặc GIF.", 400)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.byteLength > MAX_BYTES) throw new NewsApiError("Ảnh lớn hơn 12MB.", 400)
  return { bytes, type }
}

function readDataUrl(raw: string) {
  const match = /^data:(image\/(?:jpeg|png|webp|gif));base64,([a-z0-9+/=\s]+)$/i.exec(raw.trim())
  if (!match) return null
  const type = match[1].toLowerCase()
  const bytes = Buffer.from(match[2].replace(/\s/g, ""), "base64")
  if (bytes.byteLength > MAX_BYTES) throw new NewsApiError("Ảnh lớn hơn 12MB.", 400)
  return { bytes, type }
}

async function storeImage(
  supabase: SupabaseClient,
  bytes: Buffer,
  contentType: string,
  alt: string,
) {
  const ext = IMAGE_EXT[contentType]
  if (!ext) throw new NewsApiError("Ảnh phải là JPG, PNG, WEBP hoặc GIF.", 400)
  const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const url = await uploadToR2({ path, body: bytes, contentType })
  await supabase.from("media_assets").insert({
    path,
    url,
    alt_vi: alt,
    alt_en: alt,
    caption_vi: "",
    caption_en: "",
    kind: "other",
    is_published: true,
    is_featured: false,
    sort_order: 0,
  })
  return url
}

async function fileToStored(supabase: SupabaseClient, file: File, alt: string) {
  if (file.size > MAX_BYTES) throw new NewsApiError("Ảnh lớn hơn 12MB.", 400)
  const type = (file.type || "").toLowerCase()
  if (!IMAGE_EXT[type]) throw new NewsApiError("Ảnh phải là JPG, PNG, WEBP hoặc GIF.", 400)
  return storeImage(supabase, Buffer.from(await file.arrayBuffer()), type, alt)
}

async function sourceToStored(supabase: SupabaseClient, source: string, alt: string) {
  const data = readDataUrl(source)
  if (data) return storeImage(supabase, data.bytes, data.type, alt)
  const remote = await readRemoteImage(source)
  return storeImage(supabase, remote.bytes, remote.type, alt)
}

type IncomingImage = { source: string; alt: string }

export type NewsDraft = {
  titleVi: string
  titleEn: string
  excerptVi: string
  excerptEn: string
  bodyVi: string
  bodyEn: string
  slug: string
  author: string
  publish: boolean
  cover: IncomingImage | File | null
  images: Array<IncomingImage | File>
}

function flag(value: unknown, fallback: boolean) {
  if (typeof value === "boolean") return value
  if (typeof value === "string") {
    if (value === "false" || value === "0") return false
    if (value === "true" || value === "1") return true
  }
  return fallback
}

function publishFlag(status: unknown, isPublished: unknown) {
  const value = text(status).toLowerCase()
  if (!value) return flag(isPublished, true)
  if (value === "draft") return false
  if (value === "publish" || value === "published") return true
  throw new NewsApiError('status chỉ nhận "draft" hoặc "publish".', 400)
}

function imageRef(value: unknown, fallbackAlt: string): IncomingImage | null {
  if (typeof value === "string") return value.trim() ? { source: value.trim(), alt: fallbackAlt } : null
  if (!value || typeof value !== "object") return null
  const row = value as Record<string, unknown>
  const source = text(row.url || row.src || row.data)
  return source ? { source, alt: text(row.alt) || fallbackAlt } : null
}

export async function draftFromRequest(request: Request): Promise<NewsDraft> {
  const type = request.headers.get("content-type") ?? ""
  if (type.includes("multipart/form-data")) {
    const form = await request.formData()
    const images = form
      .getAll("images")
      .concat(form.getAll("image"))
      .filter((item): item is File => item instanceof File && item.size > 0)
    const titleVi = text(form.get("title_vi") || form.get("title"))
    const cover = form.get("cover") || form.get("featured_image")
    return {
      titleVi,
      titleEn: text(form.get("title_en")),
      excerptVi: text(form.get("excerpt_vi") || form.get("excerpt")),
      excerptEn: text(form.get("excerpt_en")),
      bodyVi: text(form.get("body_vi") || form.get("body") || form.get("content")),
      bodyEn: text(form.get("body_en")),
      slug: text(form.get("slug")),
      author: text(form.get("author_name")) || "VMIT",
      publish: publishFlag(form.get("status"), form.get("is_published")),
      cover: cover instanceof File ? (cover.size > 0 ? cover : null) : imageRef(cover, titleVi),
      images,
    }
  }

  const json = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!json || typeof json !== "object") throw new NewsApiError("Thiếu nội dung bài viết.", 400)
  const imagesRaw = Array.isArray(json.images) ? json.images : []
  if (imagesRaw.length > MAX_IMAGES) throw new NewsApiError("Tối đa 12 ảnh trong một bài.", 400)
  const images = imagesRaw.flatMap((item) => {
    const image = imageRef(item, "")
    return image ? [image] : []
  })
  const titleVi = text(json.title_vi || json.title)
  return {
    titleVi,
    titleEn: text(json.title_en),
    excerptVi: text(json.excerpt_vi || json.excerpt),
    excerptEn: text(json.excerpt_en),
    bodyVi: text(json.body_vi || json.body || json.content),
    bodyEn: text(json.body_en),
    slug: text(json.slug),
    author: text(json.author_name) || "VMIT",
    publish: publishFlag(json.status, json.is_published),
    cover: imageRef(json.cover_url || json.cover || json.featured_image, text(json.cover_alt) || titleVi),
    images,
  }
}

export async function publishNews(supabase: SupabaseClient, draft: NewsDraft) {
  if (!draft.titleVi) throw new NewsApiError("Thiếu tiêu đề tiếng Việt (title_vi).", 400)
  if (draft.images.length > MAX_IMAGES) throw new NewsApiError("Tối đa 12 ảnh trong một bài.", 400)

  const titleEn = draft.titleEn || draft.titleVi
  const storedImages: { url: string; alt: string }[] = []
  for (const [index, image] of draft.images.entries()) {
    const alt = image instanceof File ? image.name : image.alt || draft.titleVi
    const url =
      image instanceof File
        ? await fileToStored(supabase, image, alt)
        : await sourceToStored(supabase, image.source, alt)
    storedImages.push({ url, alt: alt || `${draft.titleVi} ${index + 1}` })
  }

  let coverUrl = ""
  if (draft.cover instanceof File) {
    coverUrl = await fileToStored(supabase, draft.cover, draft.titleVi)
  } else if (draft.cover) {
    coverUrl = await sourceToStored(supabase, draft.cover.source, draft.cover.alt || draft.titleVi)
  } else if (storedImages[0]) {
    coverUrl = storedImages[0].url
  }

  const bodyVi = sanitizeRichHtml(placeImages(asHtml(draft.bodyVi), storedImages))
  const bodyEn = sanitizeRichHtml(placeImages(asHtml(draft.bodyEn || draft.bodyVi), storedImages))
  const excerptVi = draft.excerptVi
  const excerptEn = draft.excerptEn || excerptVi
  const baseSlug = slugifyTitle(draft.slug || draft.titleVi)
  const slug = await uniqueSlug(supabase, baseSlug, draft.slug)
  const now = new Date().toISOString()

  const row = {
    slug,
    title: draft.titleVi,
    title_vi: draft.titleVi,
    title_en: titleEn,
    excerpt: excerptVi,
    excerpt_vi: excerptVi,
    excerpt_en: excerptEn,
    body: bodyVi,
    body_vi: bodyVi,
    body_en: bodyEn,
    cover_url: coverUrl,
    author_name: draft.author,
    is_published: draft.publish,
    published_at: draft.publish ? now : null,
    updated_at: now,
  }

  const existing = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle()
  const query = existing.data
    ? supabase.from("posts").update(row).eq("id", existing.data.id)
    : supabase.from("posts").insert(row)
  const { data, error } = await query.select("id, slug, title_vi, cover_url, is_published").single()
  if (error) throw new NewsApiError(error.message, 500)

  return {
    id: data.id as string,
    slug: data.slug as string,
    title_vi: data.title_vi as string,
    cover_url: (data.cover_url as string) || "",
    is_published: Boolean(data.is_published),
    images: storedImages.map((image) => image.url),
    updated: Boolean(existing.data),
  }
}

async function uniqueSlug(supabase: SupabaseClient, base: string, requested: string) {
  if (requested) return base
  for (let n = 0; n < 20; n += 1) {
    const candidate = n === 0 ? base : `${base}-${n + 1}`
    const { data } = await supabase.from("posts").select("id").eq("slug", candidate).maybeSingle()
    if (!data) return candidate
  }
  return `${base}-${Date.now().toString().slice(-4)}`
}
