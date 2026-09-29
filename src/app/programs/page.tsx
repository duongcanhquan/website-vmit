import type { Metadata } from "next"
import { ProgramsPageView } from "@/components/modules/pages/programs-page-view"
import { getSettingsMap } from "@/services/cms"

export const revalidate = 120

export const metadata: Metadata = {
  title: "Chương trình",
  description:
    "Foundation Bootcamp, Data Analytics và Business Management. Song bằng APC và Pearson BTEC HND Level 5, học bằng dự án.",
}

export default async function ChuongTrinhPage() {
  const settings = await getSettingsMap()
  return <ProgramsPageView settings={settings.data} />
}
