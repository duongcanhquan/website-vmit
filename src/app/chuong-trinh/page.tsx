import type { Metadata } from "next"
import { ProgramsPageView } from "@/components/modules/pages/programs-page-view"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import { getPublishedCourses, getSettingsMap } from "@/services/cms"

export const revalidate = 120

export const metadata: Metadata = { title: "Chương trình đào tạo" }

export default async function ChuongTrinhPage() {
  const [settings, courses] = await Promise.all([getSettingsMap(), getPublishedCourses()])
  const heroImage = resolveMediaUrl(settings.data.life_image_1_url, MEDIA.studentsStudy)

  return (
    <ProgramsPageView
      settings={settings.data}
      courses={courses.data}
      status={courses.status}
      heroImage={heroImage}
    />
  )
}
