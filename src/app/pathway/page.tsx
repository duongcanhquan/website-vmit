import { PathwayPageView } from "@/components/modules/pages/pathway-page-view"
import { buildPageMetadata } from "@/lib/seo"
import { getSettingsMap } from "@/services/cms"
import type { Metadata } from "next"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Lộ trình",
    description:
      "Hành trình vươn ra biển lớn. VMIT mang bạn tới những xứ sở của kiến thức và trải nghiệm học tập suốt đời.",
    path: "/pathway",
  })
}

export default async function LoTrinhPage() {
  const settings = await getSettingsMap()
  return <PathwayPageView settings={settings.data} />
}
