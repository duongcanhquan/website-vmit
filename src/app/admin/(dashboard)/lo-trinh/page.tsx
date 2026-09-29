import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("pathway_steps").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Lộ trình"
      description="Các bước pathway song ngữ."
      table="pathway_steps"
      rows={data ?? []}
      newDefaults={{
        step_code: "01",
        title_vi: "",
        title_en: "",
        note_vi: "",
        note_en: "",
        sort_order: 0,
        is_published: true,
      }}
      fields={[
        { key: "step_code", label: "Mã bước", kind: "text" },
        { key: "title", label: "Tiêu đề", kind: "bilingual", viKey: "title_vi", enKey: "title_en" },
        { key: "note", label: "Ghi chú", kind: "bilingual", viKey: "note_vi", enKey: "note_en" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
