import { SubmissionsPanel, type LeadRow } from "@/components/admin/submissions-panel"
import { ErrorState } from "@/components/admin/ui"
import { getStaff } from "@/lib/admin/auth"
import type { LeadTable } from "@/lib/lead-fields"

const TAB_PARAM: Record<string, LeadTable> = {
  "xet-tuyen": "admission_applications",
  "hoc-bong": "scholarship_leads",
  "lien-he": "contact_submissions",
}

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const [{ supabase, role }, { tab }] = await Promise.all([getStaff(), searchParams])
  const list = (table: LeadTable) =>
    supabase.from(table).select("*").order("created_at", { ascending: false }).limit(1000)
  const [admissions, scholarships, contacts] = await Promise.all([
    list("admission_applications"),
    list("scholarship_leads"),
    list("contact_submissions"),
  ])
  const errors = [admissions, scholarships, contacts]
    .map((result) => result.error?.message)
    .filter(Boolean)
  return (
    <>
      {errors.length ? (
        <div className="mb-4">
          <ErrorState
            message={`Không đọc được một số bảng hồ sơ (${errors.join("; ")}). Chạy file supabase/migrations/20260930_admin_core.sql trong Supabase SQL Editor.`}
          />
        </div>
      ) : null}
      <SubmissionsPanel
      admissions={(admissions.data ?? []) as LeadRow[]}
      scholarships={(scholarships.data ?? []) as LeadRow[]}
      contacts={(contacts.data ?? []) as LeadRow[]}
      canDelete={role === "admin"}
      initialTab={TAB_PARAM[tab ?? ""] ?? "admission_applications"}
      />
    </>
  )
}
