import { createClient } from "@/lib/supabase/server"
import { SubmissionsPanel } from "@/components/admin/submissions-panel"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const [admissions, scholarships, contacts] = await Promise.all([
    supabase.from("admission_applications").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("scholarship_leads").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(100),
  ])
  const err = admissions.error?.message || scholarships.error?.message || contacts.error?.message
  if (err) return <ErrorState message={err} />
  return (
    <SubmissionsPanel
      admissions={admissions.data ?? []}
      scholarships={scholarships.data ?? []}
      contacts={contacts.data ?? []}
    />
  )
}
