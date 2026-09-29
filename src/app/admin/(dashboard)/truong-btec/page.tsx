import { BtecSchoolsForm } from "@/components/admin/btec-schools-form"
import { ErrorState } from "@/components/admin/ui"
import { DEFAULT_BTEC_SCHOOLS, parseBtecSchools } from "@/constants/btec-schools"
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("site_settings").select("value").eq("key", "btec_schools").maybeSingle()
  if (error) return <ErrorState message={error.message} />
  const saved = parseBtecSchools(data?.value)
  return <BtecSchoolsForm initial={saved ?? DEFAULT_BTEC_SCHOOLS} />
}
