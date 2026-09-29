"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { ImageUp, Loader2 } from "lucide-react"
import { deleteMediaAsset, updateMediaAsset } from "@/app/admin/(dashboard)/actions"
import { invalidateMediaLibrary } from "@/components/admin/media-picker"
import { AdminCard, AdminPageHeader, EmptyState, Field, inputClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import { isImageUrl, uploadAdminFile } from "@/lib/admin/upload-client"
import { cn } from "@/lib/utils"

export type MediaAssetRow = {
  id: string
  url: string
  path: string
  alt_vi: string
  alt_en: string
  caption_vi: string
  caption_en: string
  kind: string
  sort_order: number
  is_published: boolean
  is_featured: boolean
}

type Draft = {
  alt_vi: string
  alt_en: string
  caption_vi: string
  caption_en: string
  kind: string
  sort_order: number
  is_published: boolean
  is_featured: boolean
}

function toDraft(asset: MediaAssetRow): Draft {
  return {
    alt_vi: asset.alt_vi ?? "",
    alt_en: asset.alt_en ?? "",
    caption_vi: asset.caption_vi ?? "",
    caption_en: asset.caption_en ?? "",
    kind: asset.kind ?? "other",
    sort_order: asset.sort_order ?? 0,
    is_published: asset.is_published ?? true,
    is_featured: asset.is_featured ?? false,
  }
}

const KIND_OPTIONS = [
  { value: "hero", label: "Hero / banner chính" },
  { value: "campus", label: "Campus / gallery" },
  { value: "partner", label: "Logo đối tác" },
  { value: "document", label: "Tài liệu" },
  { value: "other", label: "Khác" },
] as const

export function MediaManager({ assets }: { assets: MediaAssetRow[] }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [kind, setKind] = useState("campus")
  const [altVi, setAltVi] = useState("")
  const [altEn, setAltEn] = useState("")
  const [captionVi, setCaptionVi] = useState("")
  const [captionEn, setCaptionEn] = useState("")
  const [drafts, setDrafts] = useState<Record<string, Draft>>(() =>
    Object.fromEntries(assets.map((a) => [a.id, toDraft(a)])),
  )

  useEffect(() => {
    setDrafts(Object.fromEntries(assets.map((a) => [a.id, toDraft(a)])))
  }, [assets])

  function patchDraft(id: string, patch: Partial<Draft>) {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? toDraft(assets.find((a) => a.id === id)!)), ...patch },
    }))
  }

  async function onUpload(list: FileList | File[] | null) {
    const files = Array.from(list ?? [])
    if (!files.length) return
    setMessage(null)
    setBusy(`Đang tải ${files.length} file…`)
    let done = 0
    const failed: string[] = []
    for (const file of files) {
      const asset = await uploadAdminFile(file, { folder: "uploads", kind, publish: true, altVi }).catch((err: unknown) => {
        failed.push(`${file.name}: ${err instanceof Error ? err.message : "lỗi"}`)
        return null
      })
      if (asset) {
        done += 1
        if (altEn || captionVi || captionEn) {
          await updateMediaAsset(asset.id, {
            alt_vi: altVi,
            alt_en: altEn,
            caption_vi: captionVi,
            caption_en: captionEn,
            kind,
            sort_order: 0,
            is_published: true,
            is_featured: false,
          }).catch(() => undefined)
        }
      }
    }
    setBusy(null)
    invalidateMediaLibrary()
    setMessage(
      failed.length
        ? `Đã tải ${done}/${files.length} file. Lỗi: ${failed.join("; ")}`
        : `Đã tải ${done} file lên. Ảnh hiện trên web ngay nếu bật “Hiện trên web”.`,
    )
    setAltVi("")
    setAltEn("")
    setCaptionVi("")
    setCaptionEn("")
    router.refresh()
  }

  async function onReplace(asset: MediaAssetRow, file: File | undefined) {
    if (!file) return
    setMessage(null)
    setBusy("Đang thay ảnh…")
    try {
      const result = await uploadAdminFile(file, { folder: "uploads", replaceId: asset.id })
      invalidateMediaLibrary()
      setMessage(
        result.updatedRefs
          ? `Đã thay ảnh và cập nhật ${result.updatedRefs} chỗ đang dùng ảnh cũ trên website.`
          : "Đã thay ảnh.",
      )
      router.refresh()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Không thay được ảnh")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Thư viện ảnh & gallery"
        description="Upload R2 · caption VI/EN · featured/sort quyết định banner trên trang chủ. Mọi ảnh public đều chỉnh được tại đây."
      />
      <AdminCard className="mb-6">
        <p className="mb-3 text-sm font-semibold text-brand-navy">Thêm ảnh mới</p>
        <div className="grid gap-3 md:grid-cols-3">
          <Field label="Loại (hiển thị)">
            <select className={inputClass} value={kind} onChange={(e) => setKind(e.target.value)}>
              {KIND_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Alt VI (SEO / a11y)">
            <input className={inputClass} value={altVi} onChange={(e) => setAltVi(e.target.value)} />
          </Field>
          <Field label="Alt EN">
            <input className={inputClass} value={altEn} onChange={(e) => setAltEn(e.target.value)} />
          </Field>
          <Field label="Caption VI (chú thích gallery)">
            <input className={inputClass} value={captionVi} onChange={(e) => setCaptionVi(e.target.value)} />
          </Field>
          <Field label="Caption EN">
            <input className={inputClass} value={captionEn} onChange={(e) => setCaptionEn(e.target.value)} />
          </Field>
        </div>
        <label
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            void onUpload(e.dataTransfer.files)
          }}
          className={cn(
            "mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition",
            dragging ? "border-primary bg-primary/5" : "border-border bg-mist hover:border-primary/60",
            busy && "pointer-events-none opacity-70",
          )}
        >
          {busy ? <Loader2 className="size-7 animate-spin text-primary" /> : <ImageUp className="size-7 text-primary" />}
          <span className="text-[15px] font-bold text-brand-navy">{busy ?? "Kéo thả ảnh vào đây hoặc bấm để chọn"}</span>
          <span className="text-[13px] text-muted">Chọn được nhiều ảnh một lúc · JPG, PNG, WebP, PDF · tối đa 12MB · ảnh lớn tự nén</span>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            className="sr-only"
            onChange={(e) => {
              void onUpload(e.target.files)
              e.target.value = ""
            }}
          />
        </label>
      </AdminCard>

      {message ? (
        <p role="status" className="sticky top-2 z-30 mb-4 rounded-xl border border-primary/30 bg-sky px-4 py-3 text-sm font-semibold text-brand-navy shadow-hairline">
          {message}
        </p>
      ) : null}

      {assets.length === 0 ? (
        <EmptyState message="Chưa có ảnh. Hãy upload file đầu tiên — hoặc kiểm tra seed banner trong DB." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {assets.map((asset) => {
            const draft = drafts[asset.id] ?? toDraft(asset)
            return (
              <AdminCard key={asset.id}>
                <label className="group relative mb-3 block aspect-video cursor-pointer overflow-hidden rounded-xl bg-sky">
                  {isImageUrl(asset.url) ? (
                    <Image src={asset.url} alt={draft.alt_vi || asset.path} fill className="object-cover" unoptimized />
                  ) : (
                    <p className="flex h-full items-center justify-center text-sm">{asset.path}</p>
                  )}
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-brand-navy/55 text-white opacity-0 transition group-hover:opacity-100">
                    <ImageUp className="size-6" />
                    <span className="text-sm font-bold">Thay ảnh này</span>
                    <span className="text-xs text-white/80">Mọi chỗ đang dùng ảnh sẽ đổi theo</span>
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="sr-only"
                    disabled={Boolean(busy)}
                    onChange={(e) => {
                      void onReplace(asset, e.target.files?.[0])
                      e.target.value = ""
                    }}
                  />
                </label>
                <p className="truncate text-xs text-muted">{asset.url}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Field label="Alt VI">
                    <input
                      className={inputClass}
                      value={draft.alt_vi}
                      onChange={(e) => patchDraft(asset.id, { alt_vi: e.target.value })}
                    />
                  </Field>
                  <Field label="Alt EN">
                    <input
                      className={inputClass}
                      value={draft.alt_en}
                      onChange={(e) => patchDraft(asset.id, { alt_en: e.target.value })}
                    />
                  </Field>
                  <Field label="Caption VI">
                    <input
                      className={inputClass}
                      value={draft.caption_vi}
                      onChange={(e) => patchDraft(asset.id, { caption_vi: e.target.value })}
                    />
                  </Field>
                  <Field label="Caption EN">
                    <input
                      className={inputClass}
                      value={draft.caption_en}
                      onChange={(e) => patchDraft(asset.id, { caption_en: e.target.value })}
                    />
                  </Field>
                  <Field label="Loại">
                    <select
                      className={inputClass}
                      value={draft.kind}
                      onChange={(e) => patchDraft(asset.id, { kind: e.target.value })}
                    >
                      {KIND_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Thứ tự (sort)">
                    <input
                      type="number"
                      className={inputClass}
                      value={draft.sort_order}
                      onChange={(e) => patchDraft(asset.id, { sort_order: Number(e.target.value) || 0 })}
                    />
                  </Field>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.is_published}
                      onChange={(e) => patchDraft(asset.id, { is_published: e.target.checked })}
                    />
                    Hiện trên web
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.is_featured}
                      onChange={(e) => patchDraft(asset.id, { is_featured: e.target.checked })}
                    />
                    Featured (ảnh lớn gallery)
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    disabled={pending}
                    onClick={() => {
                      start(async () => {
                        try {
                          await updateMediaAsset(asset.id, draft)
                          setMessage("Đã cập nhật ảnh.")
                          router.refresh()
                        } catch (err) {
                          setMessage(err instanceof Error ? err.message : "Lỗi cập nhật")
                        }
                      })
                    }}
                  >
                    Lưu VI/EN
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-700"
                    disabled={pending}
                    onClick={() => {
                      if (!window.confirm("Xóa ảnh này khỏi thư viện? Những chỗ đang dùng ảnh sẽ mất ảnh.")) return
                      start(async () => {
                        await deleteMediaAsset(asset.id, asset.path)
                        router.refresh()
                      })
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              </AdminCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
