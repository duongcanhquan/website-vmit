import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("courses").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Chương trình"
      description="Chương trình BTEC / Foundation — song ngữ."
      table="courses"
      rows={data ?? []}
      newDefaults={{
        slug: "",
        title: "",
        title_vi: "",
        title_en: "",
        summary: "",
        summary_vi: "",
        summary_en: "",
        description: "",
        description_vi: "",
        description_en: "",
        cover_url: "/media/banners/students-lab.jpg",
        sort_order: 0,
        is_published: true,
      }}
      fields={[
        { key: "slug", label: "Slug", kind: "text" },
        { key: "title", label: "Tiêu đề", kind: "bilingual", viKey: "title_vi", enKey: "title_en" },
        { key: "summary", label: "Tóm tắt", kind: "bilingual", viKey: "summary_vi", enKey: "summary_en", multiline: true },
        { key: "description", label: "Mô tả dài", kind: "richtext", viKey: "description_vi", enKey: "description_en" },
        { key: "cover_url", label: "URL ảnh cover", kind: "url" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
