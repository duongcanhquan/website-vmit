import type { Metadata } from "next"
import { AboutPageView } from "@/components/modules/pages/about-page-view"
import { getPublishedPartners, getPublishedTeam, getSettingsMap } from "@/services/cms"

export const revalidate = 120

export const metadata: Metadata = {
  title: "Cử nhân thực hành Anh Quốc Pearson BTEC HND",
  description:
    "Song bằng Cao đẳng chính quy & Pearson BTEC HND Level 5 tại Cao đẳng Việt Mỹ, liên thông 1 năm lấy bằng Cử nhân Đại học Sunderland (UK) hoặc Keiser (Mỹ).",
}

export default async function VeVmitPage() {
  const [settings, partners, team] = await Promise.all([
    getSettingsMap(),
    getPublishedPartners(),
    getPublishedTeam(),
  ])

  return (
    <AboutPageView
      settings={settings.data}
      partners={partners.data}
      partnersStatus={partners.status}
      team={team.data}
      teamStatus={team.status}
    />
  )
}
