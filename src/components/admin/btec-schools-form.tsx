"use client"

import { useState, useTransition } from "react"
import { saveSettingsBatch } from "@/app/admin/(dashboard)/actions"
import { ImageField } from "@/components/admin/image-field"
import { AdminCard, AdminPageHeader, Field, inputClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import { defaultSchoolLogo, type BtecSchool } from "@/constants/btec-schools"

const emptySchool = (): BtecSchool => ({
  region_vi: "",
  region_en: "",
  name: "",
  detail_vi: "",
  detail_en: "",
  url: "",
  logo: "",
})

export function BtecSchoolsForm({ initial }: { initial: BtecSchool[] }) {
  const [schools, setSchools] = useState(initial)
  const [message, setMessage] = useState<string | null>(null)
  const [pending, start] = useTransition()

  function patch(index: number, key: keyof BtecSchool, value: string) {
    setSchools((rows) => rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)))
  }

  return (
    <div>
      <AdminPageHeader
        title="Hệ thống BTEC"
        description="Danh sách hiển thị tại menu Hệ thống BTEC. Để trống URL nếu trường chưa có trang riêng. Logo nên tách nền (PNG/SVG)."
        actions={
          <Button type="button" onClick={() => setSchools((rows) => [...rows, emptySchool()])}>
            Thêm trường
          </Button>
        }
      />
      <div className="space-y-4">
        {schools.map((school, index) => (
          <AdminCard key={`${school.name}-${index}`}>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Khu vực (VI)">
                <input className={inputClass} value={school.region_vi} onChange={(e) => patch(index, "region_vi", e.target.value)} />
              </Field>
              <Field label="Region (EN)">
                <input className={inputClass} value={school.region_en} onChange={(e) => patch(index, "region_en", e.target.value)} />
              </Field>
              <Field label="Tên trường" className="md:col-span-2">
                <input className={inputClass} value={school.name} onChange={(e) => patch(index, "name", e.target.value)} />
              </Field>
              <Field label="Ghi chú (VI)">
                <input className={inputClass} value={school.detail_vi} onChange={(e) => patch(index, "detail_vi", e.target.value)} />
              </Field>
              <Field label="Note (EN)">
                <input className={inputClass} value={school.detail_en} onChange={(e) => patch(index, "detail_en", e.target.value)} />
              </Field>
              <Field label="Website" className="md:col-span-2">
                <input className={inputClass} value={school.url} onChange={(e) => patch(index, "url", e.target.value)} placeholder="https://" />
              </Field>
              <ImageField
                label="Logo trường (PNG/SVG nền trong suốt)"
                value={school.logo}
                fallback={defaultSchoolLogo(school.name)}
                aspect="logo"
                folder="schools"
                onChange={(url) => patch(index, "logo", url)}
                className="md:col-span-2"
              />
            </div>
            <button
              type="button"
              className="mt-3 text-sm font-semibold text-primary"
              onClick={() => setSchools((rows) => rows.filter((_, i) => i !== index))}
            >
              Xóa trường này
            </button>
          </AdminCard>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button
          type="button"
          disabled={pending}
          onClick={() => {
            setMessage(null)
            start(async () => {
              try {
                const cleaned = schools
                  .map((school) => ({
                    region_vi: school.region_vi.trim(),
                    region_en: school.region_en.trim(),
                    name: school.name.trim(),
                    detail_vi: school.detail_vi.trim(),
                    detail_en: school.detail_en.trim(),
                    url: school.url.trim(),
                    logo: school.logo.trim(),
                  }))
                  .filter((school) => school.name)
                await saveSettingsBatch({ btec_schools: cleaned })
                setSchools(cleaned)
                setMessage("Đã lưu danh sách trường.")
              } catch (err) {
                setMessage(err instanceof Error ? err.message : "Không lưu được.")
              }
            })
          }}
        >
          {pending ? "Đang lưu…" : "Lưu danh sách"}
        </Button>
        {message ? <p className="text-sm font-semibold text-brand-navy">{message}</p> : null}
      </div>
    </div>
  )
}
