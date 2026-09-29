import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("partners").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Đối tác"
      description="Marquee đối tác / logo."
      table="partners"
      rows={data ?? []}
      newDefaults={{ name: "", logo_url: "", website_url: "", sort_order: 0, is_published: true }}
      fields={[
        { key: "name", label: "Tên", kind: "text" },
        { key: "logo_url", label: "URL logo", kind: "url" },
        { key: "website_url", label: "Website", kind: "url" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
