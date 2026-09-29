import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="Tin tức / Blog"
      description="Section Tin tức trên trang chủ (OUR BLOG). Sửa tiêu đề, excerpt, ảnh cover VI/EN."
      table="posts"
      rows={data ?? []}
      newDefaults={{
        slug: `tin-${Date.now().toString().slice(-6)}`,
        title: "",
        title_vi: "",
        title_en: "",
        excerpt: "",
        excerpt_vi: "",
        excerpt_en: "",
        body: "",
        body_vi: "",
        body_en: "",
        cover_url: "/media/banners/students-seminar.jpg",
        author_name: "VMIT",
        is_published: true,
        published_at: new Date().toISOString(),
      }}
      fields={[
        { key: "slug", label: "Slug", kind: "text" },
        { key: "title", label: "Tiêu đề", kind: "bilingual", viKey: "title_vi", enKey: "title_en" },
        { key: "excerpt", label: "Excerpt", kind: "bilingual", viKey: "excerpt_vi", enKey: "excerpt_en", multiline: true },
        { key: "body", label: "Nội dung", kind: "bilingual", viKey: "body_vi", enKey: "body_en", multiline: true },
        { key: "cover_url", label: "Cover URL", kind: "url" },
        { key: "author_name", label: "Tác giả", kind: "text" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
