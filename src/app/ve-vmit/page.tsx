import type { Metadata } from "next"
import SimplePage from "@/components/common/simple-page"

export const metadata: Metadata = { title: "Về VMIT" }

export default function VeVmitPage() {
  return (
    <SimplePage
      title="Về VMIT"
      lead="Câu chuyện thành lập, hành lang pháp lý và hệ sinh thái đối tác quốc tế."
      bullets={[
        "Pháp lý / mốc 1966 theo brief — [VMIT: chi tiết văn bản]",
        "Đối tác Pearson UK — Approved Centre",
        "Hệ sinh thái EQuest Group",
      ]}
    />
  )
}
