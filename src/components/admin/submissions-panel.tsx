"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { updateSubmissionStatus } from "@/app/admin/(dashboard)/actions"
import { AdminCard, AdminPageHeader, EmptyState } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"

type Row = {
  id: string
  full_name: string
  phone?: string | null
  email?: string | null
  status: "new" | "read" | "archived"
  created_at: string
  program?: string
  tracking_code?: string
  subject?: string
  message?: string
}

export function SubmissionsPanel({
  admissions,
  scholarships,
  contacts,
}: {
  admissions: Row[]
  scholarships: Row[]
  contacts: Row[]
}) {
  const router = useRouter()
  const [pending, start] = useTransition()

  function Section({
    title,
    rows,
    table,
  }: {
    title: string
    rows: Row[]
    table: "admission_applications" | "scholarship_leads" | "contact_submissions"
  }) {
    return (
      <div className="mb-10">
        <h2 className="mb-3 font-display text-2xl text-brand-navy">{title}</h2>
        {rows.length === 0 ? (
          <EmptyState message="Chưa có hồ sơ." />
        ) : (
          <div className="space-y-3">
            {rows.map((row) => (
              <AdminCard key={row.id} className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{row.full_name}</p>
                  <p className="text-sm text-muted">
                    {row.phone ?? "—"} · {row.email ?? "—"} · {row.status}
                  </p>
                  {row.tracking_code ? <p className="text-sm">Mã: {row.tracking_code}</p> : null}
                  {row.program ? <p className="text-sm">Ngành: {row.program}</p> : null}
                  {row.subject ? <p className="text-sm">{row.subject}</p> : null}
                  {row.message ? <p className="mt-1 text-sm text-muted">{row.message}</p> : null}
                </div>
                <div className="flex gap-2">
                  {(["read", "archived"] as const).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant="outlineNavy"
                      disabled={pending}
                      onClick={() => {
                        start(async () => {
                          await updateSubmissionStatus(table, row.id, status)
                          router.refresh()
                        })
                      }}
                    >
                      {status === "read" ? "Đã đọc" : "Lưu trữ"}
                    </Button>
                  ))}
                </div>
              </AdminCard>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader title="Hồ sơ & form" description="Xét tuyển · học bổng · liên hệ." />
      <Section title="Xét tuyển" rows={admissions} table="admission_applications" />
      <Section title="Học bổng" rows={scholarships} table="scholarship_leads" />
      <Section title="Liên hệ" rows={contacts} table="contact_submissions" />
    </div>
  )
}
