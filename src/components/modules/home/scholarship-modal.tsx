"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { createScholarshipLead } from "@/app/admin/(dashboard)/actions"
import { useLocale } from "@/components/providers/locale-provider"
import { Button } from "@/components/ui/button"
import { SITE } from "@/constants/site"

type ScholarshipModalProps = {
  open: boolean
  onClose: () => void
}

const fieldClass =
  "h-12 w-full rounded-[3px] border border-border px-4 text-sm outline-none transition duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"

export function ScholarshipModal({ open, onClose }: ScholarshipModalProps) {
  const { t, locale } = useLocale()
  const vi = locale === "vi"
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      setSent(false)
      setName("")
      setPhone("")
      setEmail("")
      setError(null)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarship-title"
        className="relative w-full max-w-md rounded-[3px] border border-border bg-white p-8 shadow-hairline"
      >
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-[3px] text-muted transition hover:bg-mist hover:text-brand-navy"
          aria-label={t.common.close}
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">{t.scholarship.eyebrow}</p>
        <h2 id="scholarship-title" className="mt-2 text-2xl font-black tracking-tight text-brand-navy">
          {t.scholarship.title} {SITE.admissionYear}
        </h2>
        <p className="mt-2 text-sm text-muted">{t.scholarship.lead}</p>

        {sent ? (
          <p className="mt-6 rounded-[3px] border border-primary/20 bg-sky p-4 text-sm text-brand-navy">
            {t.scholarship.success}
          </p>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              setLoading(true)
              setError(null)
              void createScholarshipLead({ full_name: name, phone, email })
                .then((result) => (result.ok ? setSent(true) : setError(result.error)))
                .catch(() => setError(vi ? "Gửi thất bại, vui lòng thử lại." : "Something went wrong. Please try again."))
                .finally(() => setLoading(false))
            }}
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.scholarship.name}
              className={fieldClass}
            />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.scholarship.phone}
              className={fieldClass}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.scholarship.email}
              className={fieldClass}
            />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (vi ? "Đang gửi…" : "Sending…") : t.scholarship.submit}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
