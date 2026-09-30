import type { Metadata } from "next"
import { TuitionPageView } from "@/components/modules/pages/tuition-page-view"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import { buildPageMetadata } from "@/lib/seo"
import { getPublishedPricing, getSettingsMap } from "@/services/cms"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Học phí & Học bổng",
    description: "Học phí linh hoạt và quỹ học bổng nhân tài tại VMIT.",
    path: "/tuition",
  })
}

export default async function HocPhiPage() {
  const [settings, pricing] = await Promise.all([getSettingsMap(), getPublishedPricing()])
  const heroImage = resolveMediaUrl(settings.data.life_image_2_url, MEDIA.library)

  return (
    <TuitionPageView
      settings={settings.data}
      plans={pricing.data}
      status={pricing.status}
      heroImage={heroImage}
    />
  )
}
