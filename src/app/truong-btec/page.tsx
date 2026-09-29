import type { Metadata } from "next"
import { BtecSchoolsPageView } from "@/components/modules/pages/btec-schools-page-view"
import { DEFAULT_BTEC_SCHOOLS, parseBtecSchools } from "@/constants/btec-schools"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import { getSettingsMap } from "@/services/cms"

export const revalidate = 120

export const metadata: Metadata = {
  title: "Các trường BTEC trên thế giới",
  description:
    "Danh sách đại học đối tác công nhận Pearson BTEC HND Level 5 của VMIT tại Anh, châu Âu, châu Á, Bắc Mỹ và châu Đại Dương.",
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
