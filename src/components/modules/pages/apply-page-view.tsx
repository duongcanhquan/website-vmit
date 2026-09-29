"use client"

import { FormEvent, useMemo, useState } from "react"
import { createAdmissionApplication } from "@/app/admin/(dashboard)/actions"
import { PageShell } from "@/components/common/page-shell"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { Button } from "@/components/ui/button"
import { MEDIA } from "@/constants/media"
import { cn } from "@/lib/utils"

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-mist px-4 text-sm text-brand-navy outline-none transition focus:border-brand-navy/30 focus:bg-surface"

export function ApplyPageView({
  settings,
  heroImage = MEDIA.seminar,
}: {
  settings: Record<string, unknown>
  heroImage?: string
}) {
  const { locale, t } = useLocale()
  const steps = useMemo(
    () =>
      locale === "vi"
        ? (["Thông tin cá nhân", "Nguyện vọng ngành", "Xác nhận hồ sơ"] as const)
        : (["Personal details", "Programme choice", "Confirm application"] as const),
    [locale],
  )
  const [step, setStep] = useState(0)
  const [trackingCode, setTrackingCode] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [program, setProgram] = useState("BTEC Data Analytics")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (step < steps.length - 1) {
      setStep((s) => s + 1)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const code = await createAdmissionApplication({
        full_name: fullName,
        phone,
        email,
        program,
      })
      setTrackingCode(code)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gửi thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell
      settings={settings}
      eyebrowVi="Tuyển sinh"
      eyebrowEn="Admissions"
      titleVi={t.apply.title}
      titleEn={t.apply.title}
      leadVi={t.apply.lead}
      leadEn={t.apply.lead}
      imageUrl={heroImage}
      imageAltVi="Seminar giảng viên và sinh viên"
      imageAltEn="Tutor-led seminar with students"
      showApplyCta={false}
    >
      <Reveal>
        <div className="mx-auto max-w-xl">
          <ol className="flex gap-2">
            {steps.map((label, index) => (
              <li
                key={label}
                className={cn(
                  "flex-1 rounded-xl px-2 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide",
                  index <= step
                    ? "bg-brand-navy text-white"
                    : "border border-border bg-surface text-muted",
                )}
              >
                {index + 1}. {label}
              </li>
            ))}
          </ol>

          {trackingCode ? (
            <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-hairline md:p-8">
              <p className="font-display text-2xl font-medium text-brand-navy">
                {locale === "vi" ? "Đã ghi nhận hồ sơ" : "Application recorded"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {locale === "vi" ? "Mã theo dõi:" : "Tracking code:"}
              </p>
              <p className="mt-2 font-display text-3xl text-accent-gold">{trackingCode}</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => void onSubmit(e)}
              className="mt-8 space-y-4 rounded-xl border border-border bg-surface p-6 shadow-hairline md:p-8"
            >
              {step === 0 ? (
                <>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.scholarship.name}
                    className={inputClass}
                  />
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.scholarship.phone}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={inputClass}
                  />
                </>
              ) : null}
              {step === 1 ? (
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className={inputClass}
                >
                  <option>BTEC Data Analytics</option>
                  <option>BTEC Business Management</option>
                  <option>Foundation IELTS</option>
                </select>
              ) : null}
              {step === 2 ? (
                <div className="space-y-2 rounded-xl bg-mist px-4 py-4 text-sm text-brand-navy">
                  <p>
                    <strong>{locale === "vi" ? "Họ tên:" : "Name:"}</strong> {fullName}
                  </p>
                  <p>
                    <strong>{locale === "vi" ? "SĐT:" : "Phone:"}</strong> {phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {email || "—"}
                  </p>
                  <p>
                    <strong>{locale === "vi" ? "Ngành:" : "Programme:"}</strong> {program}
                  </p>
                </div>
              ) : null}
              {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
              <div className="flex gap-2 pt-2">
                {step > 0 ? (
                  <Button type="button" variant="outlineNavy" onClick={() => setStep((s) => s - 1)}>
                    {locale === "vi" ? "Quay lại" : "Back"}
                  </Button>
                ) : null}
                <Button type="submit" className="flex-1" disabled={loading}>
                  {step === steps.length - 1
                    ? loading
                      ? locale === "vi"
                        ? "Đang gửi…"
                        : "Submitting…"
                      : locale === "vi"
                        ? "Gửi hồ sơ"
                        : "Submit"
                    : locale === "vi"
                      ? "Tiếp tục"
                      : "Continue"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </PageShell>
  )
}
