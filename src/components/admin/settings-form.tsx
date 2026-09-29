"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { AdminCard, AdminPageHeader, Field, inputClass, textareaClass } from "@/components/admin/ui"
import { saveSettingsBatch } from "@/app/admin/(dashboard)/actions"

type Props = {
  initial: Record<string, unknown>
}

function readPair(raw: unknown): { vi: string; en: string } {
  if (typeof raw === "string") return { vi: raw, en: raw }
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    return { vi: String(o.vi ?? ""), en: String(o.en ?? "") }
  }
  return { vi: "", en: "" }
}

export function SettingsForm({ initial }: Props) {
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    hero_slogan: readPair(
      initial.hero_slogan ?? initial.tagline ?? { vi: "Journey to work excellence", en: "Journey to work excellence" },
    ),
    hero_headline: readPair(initial.hero_headline),
    hero_support: readPair(initial.hero_support),
    hotline_display: readPair(initial.hotline_display),
    about_lead: readPair(initial.about_lead),
    gallery_eyebrow: readPair(initial.gallery_eyebrow),
    gallery_title: readPair(initial.gallery_title),
    gallery_lead: readPair(initial.gallery_lead),
    accreditation_badge: String(initial.accreditation_badge ?? "PERSON APPROVED CENTER").replaceAll('"', ""),
    hotline_href: String(initial.hotline_href ?? "tel:").replaceAll('"', ""),
    admission_year: String(initial.admission_year ?? "2026").replaceAll('"', ""),
    hero_image_url: String(initial.hero_image_url ?? "").replaceAll('"', ""),
    campus_image_url: String(initial.campus_image_url ?? "").replaceAll('"', ""),
    life_image_1_url: String(initial.life_image_1_url ?? "").replaceAll('"', ""),
    life_image_2_url: String(initial.life_image_2_url ?? "").replaceAll('"', ""),
  })

  function setPair(key: keyof typeof form, locale: "vi" | "en", value: string) {
    setForm((prev) => {
      const current = prev[key]
      if (typeof current === "string") return prev
      return { ...prev, [key]: { ...current, [locale]: value } }
    })
  }

  return (
    <div>
      <AdminPageHeader
        title="Cài đặt & banner"
        description="Slogan chính thức Journey to work excellence, headline, URL ảnh — song ngữ VI/EN."
      />
      <AdminCard>
        <p className="mb-4 text-sm font-bold text-brand-navy">Thương hiệu & nội dung (VI / EN)</p>
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              "hero_slogan",
              "hero_headline",
              "hero_support",
              "hotline_display",
              "about_lead",
              "gallery_eyebrow",
              "gallery_title",
              "gallery_lead",
            ] as const
          ).map((key) => {
            const pair = form[key] as { vi: string; en: string }
            const label =
              key === "hero_slogan" ? "Slogan logo (Journey to work excellence)" : key
            return (
              <div key={key} className="space-y-2 rounded-xl border border-border p-3 md:col-span-2">
                <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Tiếng Việt">
                    <textarea
                      className={textareaClass}
                      value={pair.vi}
                      onChange={(e) => setPair(key, "vi", e.target.value)}
                    />
                  </Field>
                  <Field label="English">
                    <textarea
                      className={textareaClass}
                      value={pair.en}
                      onChange={(e) => setPair(key, "en", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mb-4 mt-8 text-sm font-bold text-brand-navy">Banner & ảnh (URL)</p>
        <p className="mb-3 text-xs text-muted">
          Dán URL từ Thư viện ảnh, hoặc đường dẫn local `/media/banners/...`. Gallery lưới ảnh quản lý tại Media.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="PERSON APPROVED CENTER / badge">
            <input
              className={inputClass}
              value={form.accreditation_badge}
              onChange={(e) => setForm({ ...form, accreditation_badge: e.target.value })}
            />
          </Field>
          <Field label="Năm xét tuyển">
            <input
              className={inputClass}
              value={form.admission_year}
              onChange={(e) => setForm({ ...form, admission_year: e.target.value })}
            />
          </Field>
          <Field label="Hotline href (tel:)">
            <input
              className={inputClass}
              value={form.hotline_href}
              onChange={(e) => setForm({ ...form, hotline_href: e.target.value })}
            />
          </Field>
          <Field label="URL ảnh hero (banner đầu trang)">
            <input
              className={inputClass}
              value={form.hero_image_url}
              onChange={(e) => setForm({ ...form, hero_image_url: e.target.value })}
            />
          </Field>
          <Field label="URL ảnh campus (lộ trình)">
            <input
              className={inputClass}
              value={form.campus_image_url}
              onChange={(e) => setForm({ ...form, campus_image_url: e.target.value })}
            />
          </Field>
          <Field label="URL đời sống SV 1">
            <input
              className={inputClass}
              value={form.life_image_1_url}
              onChange={(e) => setForm({ ...form, life_image_1_url: e.target.value })}
            />
          </Field>
          <Field label="URL đời sống SV 2">
            <input
              className={inputClass}
              value={form.life_image_2_url}
              onChange={(e) => setForm({ ...form, life_image_2_url: e.target.value })}
            />
          </Field>
        </div>
        <Button
          className="mt-6"
          disabled={pending}
          onClick={() => {
            start(async () => {
              try {
                await saveSettingsBatch({
                  hero_slogan: form.hero_slogan,
                  tagline: form.hero_slogan.vi || form.hero_slogan.en || "Journey to work excellence",
                  hero_headline: form.hero_headline,
                  hero_support: form.hero_support,
                  hotline_display: form.hotline_display,
                  about_lead: form.about_lead,
                  gallery_eyebrow: form.gallery_eyebrow,
                  gallery_title: form.gallery_title,
                  gallery_lead: form.gallery_lead,
                  accreditation_badge: form.accreditation_badge,
                  admission_year: form.admission_year,
                  hotline_href: form.hotline_href,
                  hero_image_url: form.hero_image_url,
                  campus_image_url: form.campus_image_url,
                  life_image_1_url: form.life_image_1_url,
                  life_image_2_url: form.life_image_2_url,
                })
                setMessage("Đã lưu cài đặt.")
              } catch (err) {
                setMessage(err instanceof Error ? err.message : "Lỗi lưu")
              }
            })
          }}
        >
          {pending ? "Đang lưu…" : "Lưu cài đặt"}
        </Button>
        {message ? <p className="mt-3 text-sm text-brand-navy">{message}</p> : null}
      </AdminCard>
    </div>
  )
}
