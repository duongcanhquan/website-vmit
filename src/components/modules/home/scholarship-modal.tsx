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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-navy/50 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarship-title"
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          className="absolute right-3 top-3 text-muted hover:text-brand-navy"
          aria-label="Đóng"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
        <h2 id="scholarship-title" className="font-display text-xl font-bold text-brand-navy">
          Nhận học bổng {SITE.admissionYear}
        </h2>
        <p className="mt-1 text-sm text-muted">Form nhanh ~30 giây. Dữ liệu sẽ nối Supabase khi bật backend.</p>

        {sent ? (
          <p className="mt-6 rounded-md bg-brand-navy/5 p-4 text-sm text-brand-navy">
            Đã ghi nhận (UI). [VMIT: xác nhận gửi server khi có migration/API]
          </p>
        ) : (
          <form
            className="mt-5 space-y-3"
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
              className="h-11 w-full rounded-md border border-border px-3 text-sm outline-none ring-brand-red/30 focus:ring-2"
            />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              className="h-11 w-full rounded-md border border-border px-3 text-sm outline-none ring-brand-red/30 focus:ring-2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (tuỳ chọn)"
              className="h-11 w-full rounded-md border border-border px-3 text-sm outline-none ring-brand-red/30 focus:ring-2"
            />
            <Button type="submit" className="w-full">
              Đăng ký nhận tư vấn học bổng
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
