import type { Metadata } from "next"
import SimplePage from "@/components/common/simple-page"

export const metadata: Metadata = { title: "Chương trình đào tạo" }

export default function ChuongTrinhPage() {
  return (
    <SimplePage
      title="Chương trình đào tạo"
      lead="Hai ngành BTEC trọng điểm và Foundation IELTS dẫn lối vào đại học thực hành Anh Quốc."
      bullets={[
        "BTEC Data Analytics",
        "BTEC Business Management",
        "Foundation IELTS pathway",
      ]}
    />
  )
}
