"use client"

import { FormEvent, useState } from "react"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { Button } from "@/components/ui/button"

const STEPS = ["Thông tin cá nhân", "Nguyện vọng ngành", "Xác nhận hồ sơ"] as const

export default function XetTuyenPage() {
  const [step, setStep] = useState(0)
  const [trackingCode, setTrackingCode] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [program, setProgram] = useState("BTEC Data Analytics")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    const code = `VMIT-${Date.now().toString().slice(-8)}`
    setTrackingCode(code)
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-[image:var(--gradient-section)] pt-28">
        <div className="mx-auto max-w-xl px-4 py-16">
          <h1 className="font-display text-4xl font-bold text-brand-navy">Cổng xét tuyển trực tuyến</h1>
          <p className="mt-2 text-muted">3 bước · biên nhận · mã theo dõi (UI phase — nối Supabase sau).</p>

          <ol className="mt-6 flex gap-2">
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={`flex-1 rounded-md px-2 py-2 text-center text-xs font-semibold ${
                  index <= step ? "bg-brand-red text-white" : "bg-white text-muted"
                }`}
              >
                {index + 1}. {label}
              </li>
            ))}
          </ol>

          {trackingCode ? (
            <div className="mt-8 rounded-xl border border-border bg-white p-6">
              <p className="font-semibold text-brand-navy">Đã ghi nhận hồ sơ (UI)</p>
              <p className="mt-2 text-sm text-muted">Mã theo dõi:</p>
              <p className="mt-1 font-display text-2xl font-bold text-brand-red">{trackingCode}</p>
              <p className="mt-4 text-sm text-muted">[VMIT: gửi email biên nhận khi bật backend]</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-border bg-white p-6">
              {step === 0 ? (
                <>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Họ và tên"
                    className="h-11 w-full rounded-md border border-border px-3 text-sm"
                  />
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Số điện thoại"
                    className="h-11 w-full rounded-md border border-border px-3 text-sm"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="h-11 w-full rounded-md border border-border px-3 text-sm"
                  />
                </>
              ) : null}
              {step === 1 ? (
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="h-11 w-full rounded-md border border-border px-3 text-sm"
                >
                  <option>BTEC Data Analytics</option>
                  <option>BTEC Business Management</option>
                  <option>Foundation IELTS</option>
                </select>
              ) : null}
              {step === 2 ? (
                <div className="space-y-2 text-sm text-brand-navy">
                  <p>
                    <strong>Họ tên:</strong> {fullName}
                  </p>
                  <p>
                    <strong>SĐT:</strong> {phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {email || "—"}
                  </p>
                  <p>
                    <strong>Ngành:</strong> {program}
                  </p>
                </div>
              ) : null}
              <div className="flex gap-2">
                {step > 0 ? (
                  <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
                    Quay lại
                  </Button>
                ) : null}
                <Button type="submit" className="flex-1">
                  {step === STEPS.length - 1 ? "Gửi hồ sơ" : "Tiếp tục"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
