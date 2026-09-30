import type { MetadataRoute } from "next"
import { absoluteUrl, isIndexable, siteOrigin } from "@/lib/seo"
import { getSettingsMap } from "@/services/cms"

export const revalidate = 120

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = (await getSettingsMap()).data
  const origin = siteOrigin(settings)
  const index = isIndexable(settings)

  return {
    rules: index
      ? [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl(origin, "/sitemap.xml"),
    host: origin,
  }
}
