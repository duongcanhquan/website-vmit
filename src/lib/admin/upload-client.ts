export type UploadedAsset = { id: string; url: string; path: string }

const MAX_BYTES = 12 * 1024 * 1024
const MAX_EDGE = 2400
const SHRINK_ABOVE = 1.5 * 1024 * 1024

export const isImageUrl = (url: string) => /\.(avif|gif|jpe?g|png|svg|webp)(\?|#|$)/i.test(url) || url.startsWith("/media/")

async function shrink(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file
  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) return file
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size <= SHRINK_ABOVE) return file
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86))
  if (!blob || blob.size >= file.size) return file
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" })
}

export async function uploadAdminFile(
  input: File,
  options: { folder?: string; kind?: string; publish?: boolean; replaceId?: string; altVi?: string } = {},
): Promise<UploadedAsset & { updatedRefs?: number }> {
  const file = await shrink(input)
  if (file.size > MAX_BYTES) throw new Error("File quá lớn (tối đa 12MB).")
  const body = new FormData()
  body.append("file", file)
  body.append("folder", options.folder ?? "uploads")
  body.append("kind", options.kind ?? "other")
  body.append("is_published", String(options.publish ?? false))
  if (options.altVi) body.append("alt_vi", options.altVi)
  if (options.replaceId) body.append("replace_id", options.replaceId)
  const res = await fetch("/api/admin/upload", { method: "POST", body })
  const json = (await res.json().catch(() => ({}))) as { asset?: UploadedAsset; error?: string; updatedRefs?: number }
  if (!res.ok || !json.asset?.url) throw new Error(json.error ?? "Tải lên thất bại.")
  return { ...json.asset, updatedRefs: json.updatedRefs }
}
