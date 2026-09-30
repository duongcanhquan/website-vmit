import type { Metadata } from "next"
import { ApplyPageView } from "@/components/modules/pages/apply-page-view"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import { buildPageMetadata } from "@/lib/seo"
import { getSettingsMap } from "@/services/cms"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Xét tuyển",
    description: "Nộp hồ sơ xét tuyển VMIT và theo dõi biên nhận trực tuyến.",
    path: "/apply",
  })
}

export default async function XetTuyenPage() {
  const settings = await getSettingsMap()
  const heroImage = resolveMediaUrl(settings.data.hero_image_url, MEDIA.seminar)

  return <ApplyPageView settings={settings.data} heroImage={heroImage} />
}
