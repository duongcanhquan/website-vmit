"use client"

import { FormEvent, useRef, useState, type ReactNode } from "react"
import { createAdmissionApplication } from "@/app/admin/(dashboard)/actions"
import { PageShell } from "@/components/common/page-shell"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { Button } from "@/components/ui/button"
import { MEDIA } from "@/constants/media"
import {
  ADMISSION_DETAIL_FIELDS,
  ADMISSION_METHOD_OPTIONS,
  CAMPUS_OPTIONS,
  ENGLISH_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  PROGRAM_OPTIONS,
  SOURCE_OPTIONS,
  graduationYears,
  type AdmissionDetails,
} from "@/lib/lead-fields"
import { cn } from "@/lib/utils"

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-mist px-4 text-sm text-brand-navy outline-none transition focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/15"

type Form = {
  full_name: string
  phone: string
  email: string
  program: string
  website: string
  consent: boolean
} & Required<AdmissionDetails>

const EMPTY: Form = {
  full_name: "",
  phone: "",
  email: "",
  program: PROGRAM_OPTIONS[0].value,
  website: "",
  consent: false,
  date_of_birth: "",
  gender: "",
  province: "",
  high_school: "",
  graduation_year: "",
  admission_method: "",
  score: "",
  english_level: "",
  campus: "",
  parent_name: "",
  parent_phone: "",
  source: "",
  note: "",
}

function FieldBox({ label, required, children, wide }: { label: string; required?: boolean; children: ReactNode; wide?: boolean }) {
  return (
    <label className={cn("block text-sm font-semibold text-brand-navy", wide && "sm:col-span-2")}>
      <span>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

export function ApplyPageView({
  settings,
  heroImage = MEDIA.seminar,
}: {
  settings: Record<string, unknown>
  heroImage?: string
}) {
  const { locale, t } = useLocale()
  const vi = locale === "vi"
  const steps = vi ? ["Cá nhân", "Học vấn & nguyện vọng", "Xác nhận"] : ["Details", "Education & choice", "Confirm"]
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(EMPTY)
  const [trackingCode, setTrackingCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const topRef = useRef<HTMLOListElement>(null)

  function goTo(next: number) {
    setStep(next)
    const top = topRef.current
    if (top && top.getBoundingClientRect().top < 112) top.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((prev) => ({ ...prev, [key]: value }))
  const text = (key: keyof Form) => ({
    value: String(form[key] ?? ""),
    onChange: (e: { target: { value: string } }) => set(key, e.target.value as never),
  })
  const pick = (options: { value: string; label: { vi: string; en: string } }[], placeholder = true) => (
    <>
      {placeholder ? <option value="">{vi ? "— Chọn —" : "— Select —"}</option> : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label[locale]}
        </option>
      ))}
    </>
  )

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (step < steps.length - 1) {
      goTo(step + 1)
      return
    }
    if (!form.consent) {
      setError(vi ? "Vui lòng đồng ý để VMIT liên hệ tư vấn." : "Please agree to be contacted by VMIT.")
      return
    }
    setLoading(true)
    const details: AdmissionDetails = {}
    for (const field of ADMISSION_DETAIL_FIELDS) details[field.key] = form[field.key]
    const result = await createAdmissionApplication({
      full_name: form.full_name,
      phone: form.phone,
      email: form.email,
      program: form.program,
      website: form.website,
      details,
    }).catch(() => ({ ok: false as const, error: vi ? "Gửi thất bại, vui lòng thử lại." : "Submission failed, please try again." }))
    setLoading(false)
    if (result.ok) setTrackingCode(result.data)
    else setError(result.error)
  }

  const summary: [string, string][] = [
    [vi ? "Họ tên" : "Name", form.full_name],
    [vi ? "Điện thoại" : "Phone", form.phone],
    ["Email", form.email],
    [vi ? "Tỉnh / thành" : "Province", form.province],
    [vi ? "Trường THPT" : "High school", form.high_school],
    [vi ? "Chương trình" : "Programme", PROGRAM_OPTIONS.find((o) => o.value === form.program)?.label[locale] ?? form.program],
    [vi ? "Hình thức xét tuyển" : "Admission route", form.admission_method],
  ]

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
        <div className="mx-auto max-w-2xl">
          <ol ref={topRef} className="flex scroll-mt-28 gap-2">
            {steps.map((label, index) => (
              <li
                key={label}
                className={cn(
                  "flex min-w-0 flex-1 items-center justify-center rounded-[3px] px-2 py-2 text-center text-[11px] font-bold leading-tight",
                  index <= step ? "bg-brand-navy text-white" : "border border-border bg-surface text-muted",
                )}
              >
                {index + 1}. {label}
              </li>
            ))}
          </ol>

          {trackingCode ? (
            <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-hairline md:p-8">
              <p className="font-display text-2xl font-medium text-brand-navy">
                {vi ? "Đã ghi nhận hồ sơ" : "Application recorded"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {vi
                  ? "Phòng tuyển sinh sẽ gọi cho bạn trong 1–2 ngày làm việc. Giữ lại mã hồ sơ dưới đây để tra cứu khi cần."
                  : "Admissions will call you within 1–2 working days. Keep the reference below for any follow-up."}
              </p>
              <p className="mt-3 font-display text-3xl text-primary">{trackingCode}</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => void onSubmit(e)}
              className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-hairline md:p-8"
            >
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                {...text("website")}
              />

              {step === 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldBox label={vi ? "Họ và tên" : "Full name"} required wide>
                    <input required autoComplete="name" className={inputClass} {...text("full_name")} />
                  </FieldBox>
                  <FieldBox label={vi ? "Ngày sinh" : "Date of birth"}>
                    <input type="date" className={inputClass} {...text("date_of_birth")} />
                  </FieldBox>
                  <FieldBox label={vi ? "Giới tính" : "Gender"}>
                    <select className={inputClass} {...text("gender")}>
                      {pick(GENDER_OPTIONS)}
                    </select>
                  </FieldBox>
                  <FieldBox label={vi ? "Số điện thoại" : "Phone"} required>
                    <input required type="tel" autoComplete="tel" inputMode="tel" className={inputClass} {...text("phone")} />
                  </FieldBox>
                  <FieldBox label="Email" required>
                    <input required type="email" autoComplete="email" className={inputClass} {...text("email")} />
                  </FieldBox>
                  <FieldBox label={vi ? "Tỉnh / thành phố đang sống" : "Province / city"} required wide>
                    <input required autoComplete="address-level1" className={inputClass} {...text("province")} />
                  </FieldBox>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldBox label={vi ? "Chương trình đăng ký" : "Programme"} required wide>
                    <select required className={inputClass} {...text("program")}>
                      {pick(PROGRAM_OPTIONS, false)}
                    </select>
                  </FieldBox>
                  <FieldBox label={vi ? "Trường THPT" : "High school"} required wide>
                    <input required className={inputClass} {...text("high_school")} />
                  </FieldBox>
                  <FieldBox label={vi ? "Năm tốt nghiệp THPT" : "Graduation year"}>
                    <select className={inputClass} {...text("graduation_year")}>
                      <option value="">{vi ? "— Chọn —" : "— Select —"}</option>
                      {graduationYears().map((year) => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>
                  </FieldBox>
                  <FieldBox label={vi ? "Hình thức xét tuyển" : "Admission route"}>
                    <select className={inputClass} {...text("admission_method")}>
                      {pick(ADMISSION_METHOD_OPTIONS)}
                    </select>
                  </FieldBox>
                  <FieldBox label={vi ? "Điểm TB học bạ / điểm thi" : "GPA or exam score"}>
                    <input className={inputClass} placeholder={vi ? "Ví dụ: 7.5" : "e.g. 7.5"} {...text("score")} />
                  </FieldBox>
                  <FieldBox label={vi ? "Trình độ tiếng Anh" : "English level"}>
                    <select className={inputClass} {...text("english_level")}>
                      {pick(ENGLISH_LEVEL_OPTIONS)}
                    </select>
                  </FieldBox>
                  <FieldBox label={vi ? "Cơ sở học mong muốn" : "Preferred campus"} wide>
                    <select className={inputClass} {...text("campus")}>
                      {pick(CAMPUS_OPTIONS)}
                    </select>
                  </FieldBox>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldBox label={vi ? "Họ tên phụ huynh" : "Parent / guardian"}>
                      <input className={inputClass} {...text("parent_name")} />
                    </FieldBox>
                    <FieldBox label={vi ? "SĐT phụ huynh" : "Parent phone"}>
                      <input type="tel" inputMode="tel" className={inputClass} {...text("parent_phone")} />
                    </FieldBox>
                    <FieldBox label={vi ? "Bạn biết VMIT qua" : "How did you hear about VMIT?"} wide>
                      <select className={inputClass} {...text("source")}>
                        {pick(SOURCE_OPTIONS)}
                      </select>
                    </FieldBox>
                    <FieldBox label={vi ? "Câu hỏi / ghi chú cho phòng tuyển sinh" : "Questions for admissions"} wide>
                      <textarea
                        rows={3}
                        className={cn(inputClass, "h-auto py-3")}
                        {...text("note")}
                      />
                    </FieldBox>
                  </div>
                  <dl className="grid gap-x-6 gap-y-2 rounded-xl bg-mist px-4 py-4 text-sm text-brand-navy sm:grid-cols-2">
                    {summary.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">{label}</dt>
                        <dd className="font-semibold">{value || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                  <label className="flex items-start gap-3 text-sm text-brand-navy">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-4 accent-primary"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                    />
                    <span>
                      {vi
                        ? "Tôi đồng ý để VMIT liên hệ tư vấn qua điện thoại, Zalo hoặc email, và xác nhận thông tin trên là chính xác."
                        : "I agree to be contacted by VMIT by phone, Zalo or email, and confirm the details above are correct."}
                    </span>
                  </label>
                </div>
              ) : null}

              {error ? <p className="mt-4 text-sm font-medium text-red-700">{error}</p> : null}
              <div className="mt-6 flex gap-2">
                {step > 0 ? (
                  <Button type="button" variant="outlineNavy" onClick={() => goTo(step - 1)}>
                    {vi ? "Quay lại" : "Back"}
                  </Button>
                ) : null}
                <Button type="submit" className="flex-1" disabled={loading}>
                  {step === steps.length - 1
                    ? loading
                      ? vi
                        ? "Đang gửi…"
                        : "Submitting…"
                      : vi
                        ? "Gửi hồ sơ"
                        : "Submit"
                    : vi
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
