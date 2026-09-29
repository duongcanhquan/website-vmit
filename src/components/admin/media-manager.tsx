"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { deleteMediaAsset, updateMediaAsset } from "@/app/admin/(dashboard)/actions"
import { AdminCard, AdminPageHeader, EmptyState, Field, inputClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"

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

  async function onUpload(file: File | null) {
    if (!file) return
    setMessage(null)
    const body = new FormData()
    body.set("file", file)
    body.set("folder", "uploads")
    body.set("kind", kind)
    body.set("alt_vi", altVi)
    body.set("alt_en", altEn)
    body.set("caption_vi", captionVi)
    body.set("caption_en", captionEn)
    body.set("is_published", "true")
    const res = await fetch("/api/admin/upload", { method: "POST", body })
    const json = (await res.json()) as { error?: string }
    if (!res.ok) {
      setMessage(json.error ?? "Upload thất bại")
      return
    }
    setMessage("Đã upload — ảnh sẽ hiện trên web nếu đã publish.")
    setAltVi("")
    setAltEn("")
    setCaptionVi("")
    setCaptionEn("")
    router.refresh()
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
          <Field label="Chọn file">
            <input
              type="file"
              accept="image/*,application/pdf"
              className="block w-full text-sm"
              onChange={(e) => void onUpload(e.target.files?.[0] ?? null)}
            />
          </Field>
        </div>
        {message ? <p className="mt-3 text-sm font-medium text-brand-navy">{message}</p> : null}
      </AdminCard>

      {assets.length === 0 ? (
        <EmptyState message="Chưa có ảnh. Hãy upload file đầu tiên — hoặc kiểm tra seed banner trong DB." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {assets.map((asset) => {
            const draft = drafts[asset.id] ?? toDraft(asset)
            return (
              <AdminCard key={asset.id}>
                <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-sky">
                  {asset.url.match(/\.(png|jpe?g|webp|gif)$/i) || asset.url.startsWith("/media/") ? (
                    <Image src={asset.url} alt={draft.alt_vi || asset.path} fill className="object-cover" unoptimized />
                  ) : (
                    <p className="flex h-full items-center justify-center text-sm">{asset.path}</p>
                  )}
                </div>
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
                    className="text-brand-red"
                    disabled={pending}
                    onClick={() => {
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
