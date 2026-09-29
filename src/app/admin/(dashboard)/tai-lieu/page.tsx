import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("documents").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Tài liệu"
      description="PDF / file hướng dẫn — VI/EN."
      table="documents"
      rows={data ?? []}
      newDefaults={{
        title_vi: "",
        title_en: "",
        description_vi: "",
        description_en: "",
        file_url: "",
        category: "general",
        sort_order: 0,
        is_published: false,
      }}
      fields={[
        { key: "title", label: "Tiêu đề", kind: "bilingual", viKey: "title_vi", enKey: "title_en" },
        { key: "description", label: "Mô tả", kind: "bilingual", viKey: "description_vi", enKey: "description_en", multiline: true },
        { key: "file_url", label: "File tài liệu", kind: "file" },
        { key: "category", label: "Danh mục", kind: "text" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
