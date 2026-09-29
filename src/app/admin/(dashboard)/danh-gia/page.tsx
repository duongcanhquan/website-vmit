import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("testimonials").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Đánh giá"
      description="Testimonials học viên."
      table="testimonials"
      rows={data ?? []}
      newDefaults={{
        author_name: "",
        author_role: "",
        author_role_vi: "",
        author_role_en: "",
        quote: "",
        quote_vi: "",
        quote_en: "",
        avatar_url: "",
        rating: 5,
        sort_order: 0,
        is_published: true,
      }}
      fields={[
        { key: "author_name", label: "Tên", kind: "text" },
        { key: "role", label: "Vai trò", kind: "bilingual", viKey: "author_role_vi", enKey: "author_role_en" },
        { key: "quote", label: "Trích dẫn", kind: "bilingual", viKey: "quote_vi", enKey: "quote_en", multiline: true },
        { key: "avatar_url", label: "Avatar URL", kind: "url" },
        { key: "rating", label: "Rating (1-5)", kind: "number" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
