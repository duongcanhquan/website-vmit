import type { Metadata } from "next"
import SimplePage from "@/components/common/simple-page"

export const metadata: Metadata = { title: "Lộ trình & Bằng cấp" }

export default function LoTrinhPage() {
  return (
    <SimplePage
      title="Lộ trình & Bằng cấp"
      lead="Cơ chế song bằng tại chỗ và mạng lưới chuyển tiếp quốc tế."
      bullets={[
        "Pearson BTEC HND Level 5 (UK) + bằng APC",
        "Bridge 2+1 / 2+2",
        "Keiser University (USA), Anh, Úc",
      ]}
    />
  )
}
