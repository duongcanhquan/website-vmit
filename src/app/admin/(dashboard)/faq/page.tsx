import { createClient } from "@/lib/supabase/server"
import { SimpleCrud } from "@/components/admin/simple-crud"
import { ErrorState } from "@/components/admin/ui"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("faqs").select("*").order("sort_order")
  if (error) return <ErrorState message={error.message} />
  return (
    <SimpleCrud
      title="FAQ"
      description="Câu hỏi thường gặp."
      table="faqs"
      rows={data ?? []}
      newDefaults={{
        question: "",
        question_vi: "",
        question_en: "",
        answer: "",
        answer_vi: "",
        answer_en: "",
        sort_order: 0,
        is_published: true,
      }}
      fields={[
        { key: "question", label: "Câu hỏi", kind: "bilingual", viKey: "question_vi", enKey: "question_en", multiline: true },
        { key: "answer", label: "Trả lời", kind: "bilingual", viKey: "answer_vi", enKey: "answer_en", multiline: true },
        { key: "sort_order", label: "Thứ tự", kind: "number" },
        { key: "is_published", label: "Xuất bản", kind: "checkbox" },
      ]}
    />
  )
}
