import type { Metadata } from "next"
import SimplePage from "@/components/common/simple-page"

export const metadata: Metadata = { title: "Học phí & Học bổng" }

export default function HocPhiPage() {
  return (
    <SimplePage
      title="Học phí & Học bổng"
      lead="Minh bạch chi phí với chính sách Vốn nhẹ – Bước xa và quỹ học bổng nhân tài."
      bullets={[
        "Chính sách từ 15 triệu VND",
        "Quỹ học bổng nhân tài",
        "[VMIT: bảng học phí chi tiết theo kỳ]",
      ]}
    />
  )
}
