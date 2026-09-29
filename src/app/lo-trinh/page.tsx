import type { Metadata } from "next"
import { PathwayPageView } from "@/components/modules/pages/pathway-page-view"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import { getPublishedPathway, getSettingsMap } from "@/services/cms"

export const metadata: Metadata = { title: "Lộ trình & Bằng cấp" }

export default async function LoTrinhPage() {
  const [settings, pathway] = await Promise.all([getSettingsMap(), getPublishedPathway()])
  const heroImage = resolveMediaUrl(settings.data.campus_image_url, MEDIA.heroCampusUk)
  const campusImage = resolveMediaUrl(settings.data.campus_image_url, MEDIA.campusFacility)

  return (
    <PathwayPageView
      settings={settings.data}
      steps={pathway.data}
      status={pathway.status}
      heroImage={heroImage}
      campusImage={campusImage}
    />
  )
}
