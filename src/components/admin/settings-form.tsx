"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { AdminCard, AdminPageHeader, Field, inputClass, textareaClass } from "@/components/admin/ui"
import { saveSettingsBatch } from "@/app/admin/(dashboard)/actions"
import { ROUTES } from "@/constants/site"

type LocalePair = { vi: string; en: string }

type Props = {
  initial: Record<string, unknown>
}

function readPair(raw: unknown): LocalePair {
  if (typeof raw === "string") return { vi: raw, en: raw }
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    return { vi: String(o.vi ?? ""), en: String(o.en ?? "") }
  }
  return { vi: "", en: "" }
}

function readUrl(raw: unknown, fallback = ""): string {
  return String(raw ?? fallback).replaceAll('"', "")
}

const PAGE_LINK_HINTS = [
  { label: "Trang chủ", href: ROUTES.home },
  { label: "Về VMIT", href: ROUTES.about },
  { label: "Ngành học", href: ROUTES.programs },
  { label: "Lộ trình", href: ROUTES.pathway },
  { label: "Học phí", href: ROUTES.tuition },
  { label: "Xét tuyển", href: ROUTES.apply },
  { label: "Môn học (#)", href: "#mon-hoc" },
  { label: "Tin tức (#)", href: "#tin-tuc" },
  { label: "Học bổng (popup)", href: "#hoc-bong" },
]

function LocalePairFields({
  label,
  pair,
  onChange,
  multiline = true,
}: {
  label: string
  pair: LocalePair
  onChange: (locale: "vi" | "en", value: string) => void
  multiline?: boolean
}) {
  const Control = multiline ? "textarea" : "input"
  return (
    <div className="space-y-2 rounded-[3px] border border-border p-3 md:col-span-2">
      <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Tiếng Việt">
          <Control
            className={multiline ? textareaClass : inputClass}
            value={pair.vi}
            onChange={(e) => onChange("vi", e.target.value)}
          />
        </Field>
        <Field label="English">
          <Control
            className={multiline ? textareaClass : inputClass}
            value={pair.en}
            onChange={(e) => onChange("en", e.target.value)}
          />
        </Field>
      </div>
    </div>
  )
}

export function SettingsForm({ initial }: Props) {
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    hero_eyebrow: readPair(
      initial.hero_eyebrow ?? { vi: "Chào mừng đến VMIT", en: "Welcome to VMIT" },
    ),
    hero_slogan: readPair(
      initial.hero_slogan ?? initial.tagline ?? { vi: "Journey to work excellence", en: "Journey to work excellence" },
    ),
    hero_headline: readPair(initial.hero_headline ?? { vi: "Học mọi thứ", en: "Learn anything" }),
    hero_support: readPair(initial.hero_support),
    hero_cta_primary_label: readPair(
      initial.hero_cta_primary_label ?? { vi: "Bắt đầu ngay", en: "Get started now" },
    ),
    hero_cta_primary_href: readUrl(initial.hero_cta_primary_href, ROUTES.apply),
    hero_cta_secondary_label: readPair(
      initial.hero_cta_secondary_label ?? { vi: "Xem chương trình", en: "View course" },
    ),
    hero_cta_secondary_href: readUrl(initial.hero_cta_secondary_href, ROUTES.programs),
    hero_cta_tertiary_label: readPair(
      initial.hero_cta_tertiary_label ?? { vi: "Nhận học bổng", en: "Get scholarship" },
    ),
    hero_cta_tertiary_href: readUrl(initial.hero_cta_tertiary_href, "#hoc-bong"),
    social_facebook: readUrl(initial.social_facebook, "https://www.facebook.com/"),
    social_tiktok: readUrl(initial.social_tiktok, "https://www.tiktok.com/"),
    contact_email: readUrl(initial.contact_email, "admissions@vmit.edu.vn"),
    contact_address: readPair(
      initial.contact_address ?? {
        vi: "[VMIT: địa chỉ cơ sở]",
        en: "[VMIT: campus address]",
      },
    ),
    hotline_display: readPair(initial.hotline_display),
    about_lead: readPair(initial.about_lead),
    gallery_eyebrow: readPair(initial.gallery_eyebrow),
    gallery_title: readPair(initial.gallery_title),
    gallery_lead: readPair(initial.gallery_lead),
    accreditation_badge: readUrl(initial.accreditation_badge, "PERSON APPROVED CENTER"),
    hotline_href: readUrl(initial.hotline_href, "tel:0999999999"),
    admission_year: readUrl(initial.admission_year, "2026"),
    hero_image_url: readUrl(initial.hero_image_url),
    campus_image_url: readUrl(initial.campus_image_url),
    life_image_1_url: readUrl(initial.life_image_1_url),
    life_image_2_url: readUrl(initial.life_image_2_url),
  })

  function setPair(key: keyof typeof form, locale: "vi" | "en", value: string) {
    setForm((prev) => {
      const current = prev[key]
      if (typeof current === "string") return prev
      return { ...prev, [key]: { ...current, [locale]: value } }
    })
  }

  function setUrl(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <AdminPageHeader
        title="Cài đặt & banner"
        description="Toàn bộ chữ banner, nút + link trang, Facebook/TikTok — chỉnh VI/EN tại đây."
      />

      <AdminCard>
        <p className="mb-4 text-sm font-bold text-brand-navy">1. Banner hero (3 dòng chữ)</p>
        <div className="grid gap-4">
          <LocalePairFields
            label="Dòng Welcome (eyebrow)"
            pair={form.hero_eyebrow}
            onChange={(l, v) => setPair("hero_eyebrow", l, v)}
            multiline={false}
          />
          <LocalePairFields
            label="Tiêu đề lớn (headline)"
            pair={form.hero_headline}
            onChange={(l, v) => setPair("hero_headline", l, v)}
            multiline={false}
          />
          <LocalePairFields
            label="Đoạn phụ dưới tiêu đề"
            pair={form.hero_support}
            onChange={(l, v) => setPair("hero_support", l, v)}
          />
          <LocalePairFields
            label="Slogan (logo / footer)"
            pair={form.hero_slogan}
            onChange={(l, v) => setPair("hero_slogan", l, v)}
            multiline={false}
          />
        </div>

        <p className="mb-4 mt-10 text-sm font-bold text-brand-navy">2. Nút trên banner + link trang</p>
        <p className="mb-3 text-xs text-muted">
          Link nội bộ: đường dẫn site (vd <code>/xet-tuyen</code>). Link ngoài: đầy đủ https://…
          Dùng <code>#hoc-bong</code> để mở popup học bổng.
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {PAGE_LINK_HINTS.map((hint) => (
            <span
              key={hint.href}
              className="rounded-[3px] border border-border bg-mist px-2 py-1 text-[11px] font-medium text-muted"
            >
              {hint.label}: {hint.href}
            </span>
          ))}
        </div>
        <div className="grid gap-4">
          <LocalePairFields
            label="Nút 1 — chữ"
            pair={form.hero_cta_primary_label}
            onChange={(l, v) => setPair("hero_cta_primary_label", l, v)}
            multiline={false}
          />
          <Field label="Nút 1 — link">
            <input
              className={inputClass}
              value={form.hero_cta_primary_href}
              onChange={(e) => setUrl("hero_cta_primary_href", e.target.value)}
              placeholder={ROUTES.apply}
            />
          </Field>
          <LocalePairFields
            label="Nút 2 — chữ"
            pair={form.hero_cta_secondary_label}
            onChange={(l, v) => setPair("hero_cta_secondary_label", l, v)}
            multiline={false}
          />
          <Field label="Nút 2 — link">
            <input
              className={inputClass}
              value={form.hero_cta_secondary_href}
              onChange={(e) => setUrl("hero_cta_secondary_href", e.target.value)}
              placeholder={ROUTES.programs}
            />
          </Field>
          <LocalePairFields
            label="Nút 3 (học bổng / text link) — chữ"
            pair={form.hero_cta_tertiary_label}
            onChange={(l, v) => setPair("hero_cta_tertiary_label", l, v)}
            multiline={false}
          />
          <Field label="Nút 3 — link (#hoc-bong = popup)">
            <input
              className={inputClass}
              value={form.hero_cta_tertiary_href}
              onChange={(e) => setUrl("hero_cta_tertiary_href", e.target.value)}
              placeholder="#hoc-bong"
            />
          </Field>
        </div>

        <p className="mb-4 mt-10 text-sm font-bold text-brand-navy">3. Mạng xã hội</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Facebook URL">
            <input
              className={inputClass}
              value={form.social_facebook}
              onChange={(e) => setUrl("social_facebook", e.target.value)}
              placeholder="https://www.facebook.com/..."
            />
          </Field>
          <Field label="TikTok URL">
            <input
              className={inputClass}
              value={form.social_tiktok}
              onChange={(e) => setUrl("social_tiktok", e.target.value)}
              placeholder="https://www.tiktok.com/@..."
            />
          </Field>
        </div>

        <p className="mb-4 mt-10 text-sm font-bold text-brand-navy">4. Liên hệ & nội dung khác (VI/EN)</p>
        <div className="grid gap-4">
          <LocalePairFields
            label="Hotline hiển thị"
            pair={form.hotline_display}
            onChange={(l, v) => setPair("hotline_display", l, v)}
            multiline={false}
          />
          <LocalePairFields
            label="Địa chỉ"
            pair={form.contact_address}
            onChange={(l, v) => setPair("contact_address", l, v)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Email liên hệ">
              <input
                className={inputClass}
                value={form.contact_email}
                onChange={(e) => setUrl("contact_email", e.target.value)}
              />
            </Field>
            <Field label="Hotline href (tel:)">
              <input
                className={inputClass}
                value={form.hotline_href}
                onChange={(e) => setUrl("hotline_href", e.target.value)}
              />
            </Field>
          </div>
          <LocalePairFields
            label="About lead"
            pair={form.about_lead}
            onChange={(l, v) => setPair("about_lead", l, v)}
          />
          <LocalePairFields
            label="Gallery eyebrow"
            pair={form.gallery_eyebrow}
            onChange={(l, v) => setPair("gallery_eyebrow", l, v)}
            multiline={false}
          />
          <LocalePairFields
            label="Gallery title"
            pair={form.gallery_title}
            onChange={(l, v) => setPair("gallery_title", l, v)}
            multiline={false}
          />
          <LocalePairFields
            label="Gallery lead"
            pair={form.gallery_lead}
            onChange={(l, v) => setPair("gallery_lead", l, v)}
          />
        </div>

        <p className="mb-4 mt-10 text-sm font-bold text-brand-navy">5. Badge & ảnh (URL)</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="PERSON / badge header">
            <input
              className={inputClass}
              value={form.accreditation_badge}
              onChange={(e) => setUrl("accreditation_badge", e.target.value)}
            />
          </Field>
          <Field label="Năm xét tuyển">
            <input
              className={inputClass}
              value={form.admission_year}
              onChange={(e) => setUrl("admission_year", e.target.value)}
            />
          </Field>
          <Field label="URL ảnh hero">
            <input
              className={inputClass}
              value={form.hero_image_url}
              onChange={(e) => setUrl("hero_image_url", e.target.value)}
            />
          </Field>
          <Field label="URL ảnh campus">
            <input
              className={inputClass}
              value={form.campus_image_url}
              onChange={(e) => setUrl("campus_image_url", e.target.value)}
            />
          </Field>
          <Field label="URL đời sống SV 1">
            <input
              className={inputClass}
              value={form.life_image_1_url}
              onChange={(e) => setUrl("life_image_1_url", e.target.value)}
            />
          </Field>
          <Field label="URL đời sống SV 2">
            <input
              className={inputClass}
              value={form.life_image_2_url}
              onChange={(e) => setUrl("life_image_2_url", e.target.value)}
            />
          </Field>
        </div>

        <Button
          className="mt-8"
          disabled={pending}
          onClick={() => {
            start(async () => {
              try {
                await saveSettingsBatch({
                  hero_eyebrow: form.hero_eyebrow,
                  hero_slogan: form.hero_slogan,
                  tagline: form.hero_slogan.vi || form.hero_slogan.en || "Journey to work excellence",
                  hero_headline: form.hero_headline,
                  hero_support: form.hero_support,
                  hero_cta_primary_label: form.hero_cta_primary_label,
                  hero_cta_primary_href: form.hero_cta_primary_href,
                  hero_cta_secondary_label: form.hero_cta_secondary_label,
                  hero_cta_secondary_href: form.hero_cta_secondary_href,
                  hero_cta_tertiary_label: form.hero_cta_tertiary_label,
                  hero_cta_tertiary_href: form.hero_cta_tertiary_href,
                  social_facebook: form.social_facebook,
                  social_tiktok: form.social_tiktok,
                  contact_email: form.contact_email,
                  contact_address: form.contact_address,
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
