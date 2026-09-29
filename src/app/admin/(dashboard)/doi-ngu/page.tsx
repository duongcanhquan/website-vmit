import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("team_members").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Đội ngũ"
      description="Giảng viên / nhân sự."
      table="team_members"
      rows={data ?? []}
      newDefaults={{
        full_name: "",
        full_name_vi: "",
        full_name_en: "",
        role_title: "",
        role_title_vi: "",
        role_title_en: "",
        bio: "",
        bio_vi: "",
        bio_en: "",
        avatar_url: "",
        email: "",
        sort_order: 0,
        is_published: false,
      }}
      fields={[
        { key: "name", label: "Họ tên", kind: "bilingual", viKey: "full_name_vi", enKey: "full_name_en" },
        { key: "role", label: "Chức danh", kind: "bilingual", viKey: "role_title_vi", enKey: "role_title_en" },
        { key: "bio", label: "Bio", kind: "bilingual", viKey: "bio_vi", enKey: "bio_en", multiline: true },
        { key: "avatar_url", label: "Ảnh chân dung", kind: "image", aspect: "portrait" },
        { key: "email", label: "Email", kind: "text" },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
