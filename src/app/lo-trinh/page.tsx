import type { Metadata } from "next"
import { PathwayPageView } from "@/components/modules/pages/pathway-page-view"
import { getSettingsMap } from "@/services/cms"

export const metadata: Metadata = {
  title: "Lộ trình",
  description:
    "Chuyến tàu vươn ra thế giới: từ tuổi 18 đến Cử nhân quốc tế ở tuổi 20. Song bằng APC và Pearson BTEC HND, rồi bốn tuyến chuyển tiếp.",
}

export default async function LoTrinhPage() {
  const settings = await getSettingsMap()
  return <PathwayPageView settings={settings.data} />
}
