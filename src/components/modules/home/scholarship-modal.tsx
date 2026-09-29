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

export function ScholarshipModal({ open, onClose }: ScholarshipModalProps) {
  const { t } = useLocale()
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarship-title"
        className="relative w-full max-w-md rounded-[1.75rem] border border-border bg-white p-8 shadow-[0_40px_80px_-40px_rgba(0,29,126,0.55)]"
      >
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-muted transition hover:bg-brand-navy/5 hover:text-brand-navy"
          aria-label={t.common.close}
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-red">{t.scholarship.eyebrow}</p>
        <h2 id="scholarship-title" className="mt-2 font-display text-2xl tracking-tight text-brand-navy">
          {t.scholarship.title} {SITE.admissionYear}
        </h2>
        <p className="mt-2 text-sm text-muted">{t.scholarship.lead}</p>

        {sent ? (
          <p className="mt-6 rounded-2xl border border-brand-navy/10 bg-sky/50 p-4 text-sm text-brand-navy">
            Đã gửi thành công. Đội ngũ VMIT sẽ liên hệ sớm.
          </p>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              setLoading(true)
              setError(null)
              void createScholarshipLead({ full_name: name, phone, email })
                .then(() => setSent(true))
                .catch((err: unknown) => setError(err instanceof Error ? err.message : "Gửi thất bại"))
                .finally(() => setLoading(false))
            }}
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.scholarship.name}
              className="h-12 w-full rounded-2xl border border-border px-4 text-sm outline-none transition focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/20"
            />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.scholarship.phone}
              className="h-12 w-full rounded-2xl border border-border px-4 text-sm outline-none transition focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/20"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.scholarship.email}
              className="h-12 w-full rounded-2xl border border-border px-4 text-sm outline-none transition focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/20"
            />
            {error ? <p className="text-sm text-brand-red">{error}</p> : null}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Đang gửi…" : t.scholarship.submit}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
