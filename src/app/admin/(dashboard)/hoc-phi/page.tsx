import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("pricing_plans").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Học phí"
      description="Gói học phí / học bổng copy."
      table="pricing_plans"
      rows={data ?? []}
      newDefaults={{
        name: "",
        name_vi: "",
        name_en: "",
        slug: "",
        price_amount: 15000000,
        currency: "VND",
        period_label: "/khoá",
        period_label_vi: "/khoá",
        period_label_en: "/course",
        description: "",
        description_vi: "",
        description_en: "",
        cta_label: "Đăng ký",
        cta_label_vi: "Đăng ký",
        cta_label_en: "Apply",
        is_featured: false,
        sort_order: 0,
        is_published: true,
      }}
      fields={[
        { key: "slug", label: "Slug", kind: "text" },
        { key: "name", label: "Tên gói", kind: "bilingual", viKey: "name_vi", enKey: "name_en" },
        { key: "price_amount", label: "Số tiền", kind: "number" },
        { key: "currency", label: "Tiền tệ", kind: "text" },
        { key: "period", label: "Chu kỳ", kind: "bilingual", viKey: "period_label_vi", enKey: "period_label_en" },
        { key: "description", label: "Mô tả", kind: "bilingual", viKey: "description_vi", enKey: "description_en", multiline: true },
        { key: "cta", label: "CTA", kind: "bilingual", viKey: "cta_label_vi", enKey: "cta_label_en" },
        { key: "is_featured", label: "Nổi bật", kind: "checkbox" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
