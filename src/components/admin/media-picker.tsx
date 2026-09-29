"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { FileText, Loader2, Search, X } from "lucide-react"
import { isImageUrl } from "@/lib/admin/upload-client"
import { cn } from "@/lib/utils"

type LibraryAsset = { id: string; url: string; path: string; alt_vi: string | null; kind: string | null; created_at: string }

let cache: Promise<LibraryAsset[]> | null = null

function loadLibrary() {
  if (!cache) {
    cache = fetch("/api/admin/media")
      .then(async (res) => {
        const json = (await res.json()) as { assets?: LibraryAsset[]; error?: string }
        if (!res.ok) throw new Error(json.error ?? "Không tải được thư viện")
        return json.assets ?? []
      })
      .catch((err) => {
        cache = null
        throw err
      })
  }
  return cache
}

export function invalidateMediaLibrary() {
  cache = null
}

export function MediaPicker({
  open,
  onClose,
  onPick,
  imagesOnly = true,
  current,
}: {
  open: boolean
  onClose: () => void
  onPick: (url: string) => void
  imagesOnly?: boolean
  current?: string
}) {
  const [assets, setAssets] = useState<LibraryAsset[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    setError(null)
    loadLibrary()
      .then(setAssets)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Không tải được thư viện"))
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current()
    window.addEventListener("keydown", onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
  }, [open])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (assets ?? []).filter(
      (asset) =>
        (!imagesOnly || isImageUrl(asset.url)) &&
        (!q || asset.path.toLowerCase().includes(q) || (asset.alt_vi ?? "").toLowerCase().includes(q)),
    )
  }, [assets, imagesOnly, query])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-navy/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === "Escape") onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chọn ảnh từ thư viện"
        className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <p className="flex-1 text-lg font-extrabold text-brand-navy">Chọn từ thư viện</p>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-muted transition hover:bg-mist hover:text-brand-navy" aria-label="Đóng">
            <X className="size-5" />
          </button>
        </div>
        <div className="border-b border-border px-5 py-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên file hoặc mô tả…"
              className="h-11 w-full rounded-xl border border-border bg-mist pl-9 pr-3 text-[15px] outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>
        <div className="min-h-[16rem] flex-1 overflow-y-auto p-5">
          {error ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>
          ) : assets === null ? (
            <p className="flex items-center justify-center gap-2 py-16 text-muted">
              <Loader2 className="size-5 animate-spin" /> Đang tải thư viện…
            </p>
          ) : visible.length === 0 ? (
            <p className="py-16 text-center text-muted">
              {assets.length ? "Không có ảnh khớp tìm kiếm." : "Thư viện chưa có ảnh. Hãy tải ảnh mới lên."}
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {visible.map((asset) => (
                <li key={asset.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onPick(asset.url)
                      onClose()
                    }}
                    className={cn(
                      "group block w-full overflow-hidden rounded-xl border-2 bg-mist text-left transition hover:border-primary focus-visible:border-primary focus-visible:outline-none",
                      current === asset.url ? "border-primary" : "border-transparent",
                    )}
                  >
                    <span className="relative block aspect-[4/3]">
                      {isImageUrl(asset.url) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={asset.url} alt={asset.alt_vi ?? ""} loading="lazy" className="size-full object-cover transition duration-300 group-hover:scale-105" />
                      ) : (
                        <span className="flex size-full items-center justify-center text-muted">
                          <FileText className="size-8" />
                        </span>
                      )}
                    </span>
                    <span className="block truncate px-2.5 py-2 text-xs font-semibold text-brand-navy/80">
                      {asset.alt_vi || asset.path.split("/").pop()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.querySelector(".admin-ui") ?? document.body,
  )
}
