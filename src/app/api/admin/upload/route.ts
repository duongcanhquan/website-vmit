import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { requireStaff } from "@/lib/admin/auth"
import { replaceUrlEverywhere } from "@/lib/admin/media-refs"
import { deleteFromR2, uploadToR2 } from "@/lib/r2/client"
import { clearCmsCache } from "@/services/cms"

export const runtime = "nodejs"

const MAX_BYTES = 12 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const { supabase } = await requireStaff()
    const form = await request.formData()
    const file = form.get("file")
    const folder = String(form.get("folder") ?? "uploads")
    const kind = String(form.get("kind") ?? "other")
    const altVi = String(form.get("alt_vi") ?? "")
    const altEn = String(form.get("alt_en") ?? "")
    const captionVi = String(form.get("caption_vi") ?? "")
    const captionEn = String(form.get("caption_en") ?? "")
    const isPublished = String(form.get("is_published") ?? "true") !== "false"
    const sortOrder = Number(form.get("sort_order") ?? 0) || 0
    const replaceId = String(form.get("replace_id") ?? "").trim()

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Thiếu file" }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File quá lớn (tối đa 12MB)" }, { status: 400 })
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "bin"
    const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, "")
    const path = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadToR2({
      path,
      body: buffer,
      contentType: file.type || "application/octet-stream",
    })

    if (replaceId) {
      const { data: previous } = await supabase.from("media_assets").select("path, url").eq("id", replaceId).maybeSingle()
      const { data, error } = await supabase
        .from("media_assets")
        .update({ path, url, updated_at: new Date().toISOString() })
        .eq("id", replaceId)
        .select("*")
        .single()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

      const updatedRefs = previous?.url ? await replaceUrlEverywhere(supabase, previous.url, url) : 0
      if (previous?.path && previous.path !== path) {
        await deleteFromR2(previous.path).catch(() => undefined)
      }
      clearCmsCache()
      revalidateTag("cms")
      revalidatePath("/", "layout")
      return NextResponse.json({ asset: data, updatedRefs })
    }

    const { data, error } = await supabase
      .from("media_assets")
      .insert({
        path,
        url,
        alt_vi: altVi,
        alt_en: altEn,
        caption_vi: captionVi,
        caption_en: captionEn,
        kind: ["hero", "campus", "partner", "document", "other"].includes(kind) ? kind : "other",
        is_published: isPublished,
        sort_order: sortOrder,
        is_featured: false,
      })
      .select("*")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ asset: data })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload thất bại"
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
