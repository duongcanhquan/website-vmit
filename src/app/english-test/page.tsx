import type { Metadata } from "next"
import { EnglishTestView } from "@/components/modules/pages/english-test-view"
import { getSettingsMap } from "@/services/cms"

export const revalidate = 120

export const metadata: Metadata = {
  title: "IELTS placement test",
  description: "A four-module English placement test modelled on IELTS Academic: Listening, Reading, Writing and Speaking.",
}

export default async function Page() {
  const settings = await getSettingsMap()
  return <EnglishTestView settings={settings.data} />
}
