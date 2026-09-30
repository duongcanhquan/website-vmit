import { EnglishTestView } from "@/components/modules/pages/english-test-view"
import { buildPageMetadata } from "@/lib/seo"
import { getSettingsMap } from "@/services/cms"
import type { Metadata } from "next"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "IELTS placement test",
    description: "A four-module English placement test modelled on IELTS Academic: Listening, Reading, Writing and Speaking.",
    path: "/english-test",
  })
}

export default async function Page() {
  const settings = await getSettingsMap()
  return <EnglishTestView settings={settings.data} />
}
