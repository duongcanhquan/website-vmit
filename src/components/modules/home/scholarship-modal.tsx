"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SITE } from "@/constants/site"

type ScholarshipModalProps = {
  open: boolean
  onClose: () => void
}

export function ScholarshipModal({ open, onClose }: ScholarshipModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) {
      setSent(false)
      setName("")
      setPhone("")
      setEmail("")
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-navy/55 p-4 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarship-title"
        className="relative w-full max-w-md border border-border bg-white p-8 shadow-[0_40px_80px_-40px_rgba(0,29,126,0.65)]"
      >
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-muted transition hover:bg-brand-navy/5 hover:text-brand-navy"
          aria-label="Đóng"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Scholarship</p>
        <h2 id="scholarship-title" className="mt-2 font-display text-2xl font-semibold tracking-tight text-brand-navy">
          Nhận học bổng {SITE.admissionYear}
        </h2>
        <p className="mt-2 text-sm text-muted">Form nhanh ~30 giây. Dữ liệu sẽ nối Supabase khi bật backend.</p>

        {sent ? (
          <p className="mt-6 border border-brand-navy/10 bg-brand-navy/[0.04] p-4 text-sm text-brand-navy">
            Đã ghi nhận (UI). [VMIT: xác nhận gửi server khi có migration/API]
          </p>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Họ và tên"
              className="h-12 w-full border border-border px-4 text-sm outline-none transition focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/20"
            />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              className="h-12 w-full border border-border px-4 text-sm outline-none transition focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/20"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (tuỳ chọn)"
              className="h-12 w-full border border-border px-4 text-sm outline-none transition focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/20"
            />
            <Button type="submit" size="lg" className="w-full">
              Đăng ký nhận tư vấn học bổng
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
