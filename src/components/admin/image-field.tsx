"use client"

import { useRef, useState, type ClipboardEvent, type DragEvent } from "react"
import { FileText, ImageUp, Images, Link2, Loader2, RotateCcw, Trash2 } from "lucide-react"
import { MediaPicker, invalidateMediaLibrary } from "@/components/admin/media-picker"
import { inputClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import { isImageUrl, uploadAdminFile } from "@/lib/admin/upload-client"
import { cn } from "@/lib/utils"

const ASPECT = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  logo: "aspect-[3/2]",
} as const

export type ImageAspect = keyof typeof ASPECT

export function ImageField({
  label,
  value,
  fallback,
  onChange,
  folder = "home",
  aspect = "video",
  hint,
  accept = "image",
  className = "md:col-span-2",
}: {
  label: string
  value: string
  fallback?: string
  onChange: (url: string) => void
  folder?: string
  aspect?: ImageAspect
  hint?: string
  accept?: "image" | "file"
  className?: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [picking, setPicking] = useState(false)
  const [showUrl, setShowUrl] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const current = value.trim()
  const preview = current || fallback || ""
  const isFile = accept === "file"
  const usingDefault = !current && Boolean(fallback)

  async function upload(file: File | undefined) {
    if (!file) return
    if (!isFile && !file.type.startsWith("image/")) {
      setError("File này không phải ảnh. Hãy chọn JPG, PNG, WebP hoặc SVG.")
      return
    }
    setUploading(true)
    setError(null)
    try {
      const asset = await uploadAdminFile(file, { folder, kind: isFile ? "document" : "other", altVi: label })
      invalidateMediaLibrary()
      onChange(asset.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tải lên thất bại")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    void upload(e.dataTransfer.files?.[0])
  }

  function onPaste(e: ClipboardEvent) {
    const file = Array.from(e.clipboardData.files).find((item) => isFile || item.type.startsWith("image/"))
    if (!file) return
    e.preventDefault()
    void upload(file)
  }

  return (
    <div className={cn("min-w-0", className)} onPaste={onPaste}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-bold text-brand-navy">{label}</span>
        {preview ? (
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-bold",
              usingDefault ? "bg-mist text-muted" : "bg-primary/10 text-primary",
            )}
          >
            {usingDefault ? "Đang dùng ảnh mặc định" : isFile ? "Đã có file" : "Ảnh đã chọn"}
          </span>
        ) : null}
      </div>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          disabled={uploading}
          aria-label={preview ? `Thay ${label.toLowerCase()}` : `Tải ${label.toLowerCase()}`}
          className={cn(
            "group relative w-full shrink-0 overflow-hidden rounded-xl border-2 border-dashed bg-mist transition sm:w-60",
            isFile ? "aspect-[3/2]" : ASPECT[aspect],
            dragging ? "border-primary bg-primary/5" : preview ? "border-transparent" : "border-border hover:border-primary/60",
          )}
        >
          {preview && !isFile && isImageUrl(preview) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt=""
              className={cn(
                "absolute inset-0 size-full",
                aspect === "logo" ? "object-contain p-4" : "object-cover",
                usingDefault && "opacity-80",
              )}
            />
          ) : preview ? (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-brand-navy">
              <FileText className="size-8 text-primary" />
              <span className="line-clamp-2 break-all text-xs font-semibold">{decodeURIComponent(preview.split("/").pop() ?? preview)}</span>
            </span>
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-muted">
              <ImageUp className="size-7" />
              <span className="text-sm font-semibold">Kéo thả hoặc bấm để chọn {isFile ? "file" : "ảnh"}</span>
            </span>
          )}
          {preview || uploading ? (
            <span
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-brand-navy/55 text-white transition",
                uploading || dragging ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
              )}
            >
              {uploading ? <Loader2 className="size-6 animate-spin" /> : <ImageUp className="size-6" />}
              <span className="text-sm font-bold">{uploading ? "Đang tải lên…" : dragging ? "Thả để thay" : `Thay ${isFile ? "file" : "ảnh"}`}</span>
            </span>
          ) : null}
        </button>

        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-[13px] leading-relaxed text-muted">
            {hint ??
              (isFile
                ? "Bấm vào ô bên trái hoặc kéo thả file (PDF, DOCX…), tối đa 12MB."
                : "Bấm vào ảnh, kéo thả, hoặc dán (Ctrl+V) để thay. Ảnh lớn được tự động nén cho web nhẹ.")}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
              <ImageUp className="size-4" /> {preview && !usingDefault ? `Thay ${isFile ? "file" : "ảnh"}` : `Tải ${isFile ? "file" : "ảnh"} lên`}
            </Button>
            <Button type="button" size="sm" variant="outlineNavy" disabled={uploading} onClick={() => setPicking(true)}>
              <Images className="size-4" /> Chọn từ thư viện
            </Button>
            {current ? (
              <Button type="button" size="sm" variant="ghost" disabled={uploading} onClick={() => onChange("")}>
                {fallback ? <RotateCcw className="size-4" /> : <Trash2 className="size-4" />}
                {fallback ? "Về ảnh mặc định" : "Bỏ ảnh"}
              </Button>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setShowUrl((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition hover:text-primary"
          >
            <Link2 className="size-3.5" /> {showUrl ? "Ẩn đường dẫn" : "Dán đường dẫn có sẵn"}
          </button>
          {showUrl ? (
            <input
              className={inputClass}
              aria-label={`${label}: đường dẫn`}
              value={value}
              placeholder={fallback ? `Mặc định: ${fallback}` : "https://…"}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : null}
          {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept={isFile ? ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,image/*" : "image/*"}
        className="hidden"
        onChange={(e) => void upload(e.target.files?.[0])}
      />
      <MediaPicker open={picking} onClose={() => setPicking(false)} onPick={onChange} imagesOnly={!isFile} current={current} />
    </div>
  )
}
