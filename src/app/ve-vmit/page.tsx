import type { Metadata } from "next"
import { AboutPageView } from "@/components/modules/pages/about-page-view"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import {
  getPublishedPartners,
  getPublishedPillars,
  getPublishedTeam,
  getSettingsMap,
} from "@/services/cms"

export const metadata: Metadata = { title: "Về VMIT" }

export default async function VeVmitPage() {
  const [settings, pillars, partners, team] = await Promise.all([
    getSettingsMap(),
    getPublishedPillars(),
    getPublishedPartners(),
    getPublishedTeam(),
  ])
  const heroImage = resolveMediaUrl(settings.data.hero_image_url, MEDIA.international)

  return (
    <AboutPageView
      settings={settings.data}
      pillars={pillars.data}
      pillarsStatus={pillars.status}
      partners={partners.data}
      partnersStatus={partners.status}
      team={team.data}
      teamStatus={team.status}
      heroImage={heroImage}
    />
  )
}
