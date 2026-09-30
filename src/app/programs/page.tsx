import { ProgramsPageView } from "@/components/modules/pages/programs-page-view"
import { buildPageMetadata } from "@/lib/seo"
import { getSettingsMap } from "@/services/cms"
import type { Metadata } from "next"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Chương trình",
    description:
      "Foundation Bootcamp, Data Analytics và Business Management. Song bằng Cao đẳng chính quy và Pearson BTEC HND Level 5, học bằng dự án.",
    path: "/programs",
  })
}

export default async function ChuongTrinhPage() {
  const settings = await getSettingsMap()
  return <ProgramsPageView settings={settings.data} />
}
