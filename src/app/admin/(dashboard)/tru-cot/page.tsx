import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const [pillars, counters] = await Promise.all([
    supabase.from("pillars").select("*").order("sort_order"),
    supabase.from("impact_counters").select("*").order("sort_order"),
  ])
  if (pillars.error) return <ErrorState message={pillars.error.message} />
  if (counters.error) return <ErrorState message={counters.error.message} />

  return (
    <div className="space-y-12">
      <SimpleCrud
        title="Trụ đột phá"
        description="4 trụ + featured."
        table="pillars"
        rows={pillars.data ?? []}
        newDefaults={{
          eyebrow_vi: "",
          eyebrow_en: "",
          title_vi: "",
          title_en: "",
          description_vi: "",
          description_en: "",
          chips: [],
          is_featured: false,
          sort_order: 0,
          is_published: true,
        }}
        fields={[
          { key: "eyebrow", label: "Eyebrow", kind: "bilingual", viKey: "eyebrow_vi", enKey: "eyebrow_en" },
          { key: "title", label: "Tiêu đề", kind: "bilingual", viKey: "title_vi", enKey: "title_en" },
          { key: "description", label: "Mô tả", kind: "bilingual", viKey: "description_vi", enKey: "description_en", multiline: true },
          { key: "is_featured", label: "Nổi bật", kind: "checkbox" },
          { key: "sort_order", label: "Thứ tự", kind: "number" },
          { key: "is_published", label: "Xuất bản", kind: "checkbox" },
        ]}
      />
      <SimpleCrud
        title="Chỉ số impact"
        description="Counters dưới hero / pillars."
        table="impact_counters"
        rows={counters.data ?? []}
        newDefaults={{ value_text: "", label_vi: "", label_en: "", sort_order: 0, is_published: true }}
        fields={[
          { key: "value_text", label: "Giá trị hiển thị", kind: "text" },
          { key: "label", label: "Nhãn", kind: "bilingual", viKey: "label_vi", enKey: "label_en" },
          { key: "sort_order", label: "Thứ tự", kind: "number" },
          { key: "is_published", label: "Xuất bản", kind: "checkbox" },
        ]}
      />
    </div>
  )
}
