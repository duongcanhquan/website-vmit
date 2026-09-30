import { BtecSchoolsPageView } from "@/components/modules/pages/btec-schools-page-view"
import { DEFAULT_BTEC_SCHOOLS, parseBtecSchools } from "@/constants/btec-schools"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import { buildPageMetadata } from "@/lib/seo"
import { getSettingsMap } from "@/services/cms"
import type { Metadata } from "next"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Các trường BTEC trên thế giới",
    description:
      "Danh sách đại học đối tác công nhận Pearson BTEC HND Level 5 của VMIT tại Anh, châu Âu, châu Á, Bắc Mỹ và châu Đại Dương.",
    path: "/btec-schools",
  })
}

export default async function TruongBtecPage() {
  const settings = await getSettingsMap()
  const saved = parseBtecSchools(settings.data.btec_schools)
  const heroImage = resolveMediaUrl(settings.data.campus_image_url, MEDIA.campusArchitecture)

  return (
    <BtecSchoolsPageView
      settings={settings.data}
      schools={saved ?? DEFAULT_BTEC_SCHOOLS}
      heroImage={heroImage}
    />
  )
}
