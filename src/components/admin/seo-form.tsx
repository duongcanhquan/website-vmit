"use client"

import { useState, useTransition } from "react"
import { saveSettingsBatch } from "@/app/admin/(dashboard)/actions"
import { AdminCard, AdminPageHeader, Field, inputClass, textareaClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import { DEFAULT_SEO } from "@/lib/seo"

type LocalePair = { vi: string; en: string }

function readPair(raw: unknown, fallback: LocalePair): LocalePair {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    return {
      vi: String(o.vi ?? fallback.vi),
      en: String(o.en ?? fallback.en),
    }
  }
  if (typeof raw === "string" && raw.trim()) return { vi: raw, en: raw }
  return fallback
}

function readUrl(raw: unknown, fallback = ""): string {
  return String(raw ?? fallback).replaceAll('"', "")
}

function readIndex(raw: unknown): boolean {
  if (raw === false || raw === "false") return false
  return true
}

export function SeoForm({ initial }: { initial: Record<string, unknown> }) {
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    seo_site_name: readUrl(initial.seo_site_name, "VMIT"),
    seo_site_url: readUrl(initial.seo_site_url),
    seo_title: readPair(initial.seo_title, { vi: DEFAULT_SEO.titleVi, en: DEFAULT_SEO.titleVi }),
    seo_description: readPair(initial.seo_description, {
      vi: DEFAULT_SEO.descriptionVi,
      en: DEFAULT_SEO.descriptionEn,
    }),
    seo_keywords: readPair(initial.seo_keywords, { vi: DEFAULT_SEO.keywordsVi, en: DEFAULT_SEO.keywordsVi }),
    seo_og_image: readUrl(initial.seo_og_image, "/media/banners/hero-vmit-student.webp"),
    seo_google_verification: readUrl(initial.seo_google_verification),
    seo_index: readIndex(initial.seo_index),
  })

  function setPair(key: "seo_title" | "seo_description" | "seo_keywords", locale: "vi" | "en", value: string) {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], [locale]: value } }))
  }

  return (
    <div>
      <AdminPageHeader
        title="SEO"
        description="Title, mô tả, ảnh chia sẻ và cho phép Google lập chỉ mục. Sitemap tự sinh tại /sitemap.xml."
      />
      <AdminCard>
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tên site">
              <input
                className={inputClass}
                value={form.seo_site_name}
                onChange={(e) => setForm({ ...form, seo_site_name: e.target.value })}
              />
            </Field>
            <Field label="URL gốc (canonical)">
              <input
                className={inputClass}
                placeholder="https://vmit.edu.vn"
                value={form.seo_site_url}
                onChange={(e) => setForm({ ...form, seo_site_url: e.target.value })}
              />
            </Field>
          </div>
          <p className="text-xs text-muted">
            Bỏ trống URL gốc thì dùng NEXT_PUBLIC_SITE_URL hoặc domain production trên Vercel. Ngôn ngữ trên site đổi bằng nút VI/EN trên cùng một URL, nên mỗi trang có một canonical.
          </p>

          {(
            [
              ["seo_title", "Title mặc định", false],
              ["seo_description", "Mô tả mặc định", true],
              ["seo_keywords", "Từ khóa", false],
            ] as const
          ).map(([key, label, multiline]) => (
            <div key={key} className="space-y-2 rounded-[3px] border border-border p-3">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</p>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Tiếng Việt">
                  {multiline ? (
                    <textarea
                      className={textareaClass}
                      value={form[key].vi}
                      onChange={(e) => setPair(key, "vi", e.target.value)}
                    />
                  ) : (
                    <input
                      className={inputClass}
                      value={form[key].vi}
                      onChange={(e) => setPair(key, "vi", e.target.value)}
                    />
                  )}
                </Field>
                <Field label="English">
                  {multiline ? (
                    <textarea
                      className={textareaClass}
                      value={form[key].en}
                      onChange={(e) => setPair(key, "en", e.target.value)}
                    />
                  ) : (
                    <input
                      className={inputClass}
                      value={form[key].en}
                      onChange={(e) => setPair(key, "en", e.target.value)}
                    />
                  )}
                </Field>
              </div>
            </div>
          ))}

          <Field label="Ảnh Open Graph (chia sẻ Facebook / Zalo)">
            <input
              className={inputClass}
              value={form.seo_og_image}
              onChange={(e) => setForm({ ...form, seo_og_image: e.target.value })}
            />
          </Field>
          <Field label="Google Search Console verification">
            <input
              className={inputClass}
              placeholder="Mã content trong thẻ meta google-site-verification"
              value={form.seo_google_verification}
              onChange={(e) => setForm({ ...form, seo_google_verification: e.target.value })}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm font-bold text-brand-navy">
            <input
              type="checkbox"
              checked={form.seo_index}
              onChange={(e) => setForm({ ...form, seo_index: e.target.checked })}
            />
            Cho phép Google lập chỉ mục (tắt thì robots.txt chặn toàn site)
          </label>
        </div>
        <Button
          className="mt-6"
          disabled={pending}
          onClick={() => {
            start(async () => {
              try {
                await saveSettingsBatch({
                  seo_site_name: form.seo_site_name,
                  seo_site_url: form.seo_site_url.trim(),
                  seo_title: form.seo_title,
                  seo_description: form.seo_description,
                  seo_keywords: form.seo_keywords,
                  seo_og_image: form.seo_og_image,
                  seo_google_verification: form.seo_google_verification.trim(),
                  seo_index: form.seo_index,
                })
                setMessage("Đã lưu SEO.")
              } catch (err) {
                setMessage(err instanceof Error ? err.message : "Lỗi lưu")
              }
            })
          }}
        >
          {pending ? "Đang lưu…" : "Lưu SEO"}
        </Button>
        {message ? <p className="mt-3 text-sm text-brand-navy">{message}</p> : null}
      </AdminCard>
    </div>
  )
}
