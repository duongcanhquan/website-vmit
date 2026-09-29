import type { Metadata } from "next"
import { PathwayPageView } from "@/components/modules/pages/pathway-page-view"
import { getSettingsMap } from "@/services/cms"

export const revalidate = 120

export const metadata: Metadata = {
  title: "Lộ trình",
  description:
    "Hành trình vươn ra biển lớn. VMIT mang bạn tới những xứ sở của kiến thức và trải nghiệm học tập suốt đời.",
}

export default async function LoTrinhPage() {
  const settings = await getSettingsMap()
  return <PathwayPageView settings={settings.data} />
}
