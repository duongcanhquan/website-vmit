import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function MonHocAdminPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("subjects").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Môn học"
      description="Lưới MÔN HỌC trên trang chủ (tương đương COURSES trong template Academia). Có thể sửa VI/EN."
      table="subjects"
      rows={data ?? []}
      newDefaults={{
        title_vi: "",
        title_en: "",
        count_label_vi: "",
        count_label_en: "",
        icon_url: "",
        hover_icon_url: "",
        sort_order: 0,
        is_published: true,
      }}
      fields={[
        { key: "title", label: "Tên môn", kind: "bilingual", viKey: "title_vi", enKey: "title_en" },
        {
          key: "count",
          label: "Nhãn phụ (vd: BTEC HND)",
          kind: "bilingual",
          viKey: "count_label_vi",
          enKey: "count_label_en",
        },
        { key: "icon_url", label: "Icon URL", kind: "url" },
        { key: "hover_icon_url", label: "Icon hover URL", kind: "url" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
