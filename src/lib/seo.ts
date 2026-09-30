import type { Metadata } from "next"
import { settingText } from "@/lib/i18n/locale-text"
import { SITE } from "@/constants/site"
import { getSettingsMap } from "@/services/cms"

export const DEFAULT_SEO = {
  titleVi: `${SITE.name} | ${SITE.brandTagline}`,
  descriptionVi:
    "Cao đẳng Việt Mỹ — chương trình cử nhân thực hành Anh Quốc, Pearson BTEC HND, lộ trình 2+1.",
  descriptionEn:
    "Viet My College — a UK practice-based bachelor pathway with Pearson BTEC HND and a 2+1 route.",
  keywordsVi: "VMIT, Cao đẳng Việt Mỹ, BTEC, Pearson, cử nhân Anh Quốc, học bổng",
} as const

export const PUBLIC_PATHS = [
  "/",
  "/about",
  "/programs",
  "/pathway",
  "/tuition",
  "/apply",
  "/news",
  "/btec-schools",
  "/english-test",
] as const

function plainSetting(settings: Record<string, unknown>, key: string): string {
  const value = settings[key]
  if (typeof value === "string") return value.replaceAll('"', "").trim()
  return settingText(value, "vi").trim()
}

export function isIndexable(settings: Record<string, unknown>): boolean {
  const value = settings.seo_index
  if (value === false || value === "false") return false
  return true
}

export function siteOrigin(settings: Record<string, unknown>): string {
  const saved = plainSetting(settings, "seo_site_url")
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  const raw = saved || env || (vercel ? `https://${vercel}` : "")
  if (!raw) return "http://localhost:3000"
  return raw.replace(/\/$/, "")
}

export function absoluteUrl(origin: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`
}

export async function loadSeoContext() {
  const settings = (await getSettingsMap()).data
  return { settings, origin: siteOrigin(settings) }
}

export async function buildPageMetadata(input: {
  title: string
  description: string
  path: string
  image?: string | null
  type?: "website" | "article"
  publishedTime?: string | null
}): Promise<Metadata> {
  const { settings, origin } = await loadSeoContext()
  const index = isIndexable(settings)
  const imagePath = input.image || plainSetting(settings, "seo_og_image") || "/media/banners/hero-vmit-student.webp"
  const imageUrl = absoluteUrl(origin, imagePath)
  const canonical = absoluteUrl(origin, input.path)
  const verification = plainSetting(settings, "seo_google_verification")
  const keywords = settingText(settings.seo_keywords, "vi") || DEFAULT_SEO.keywordsVi

  return {
    title: input.title,
    description: input.description,
    keywords,
    alternates: { canonical },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: input.type ?? "website",
      url: canonical,
      title: input.title,
      description: input.description,
      siteName: plainSetting(settings, "seo_site_name") || SITE.name,
      locale: "vi_VN",
      images: [{ url: imageUrl, alt: input.title }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
    ...(verification ? { verification: { google: verification } } : {}),
  }
}

export function organizationJsonLd(origin: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE.name,
    url: origin,
    description,
    slogan: SITE.brandTagline,
    logo: absoluteUrl(origin, "/brand/logo-vmit-color.png"),
  }
}

export function articleJsonLd(input: {
  origin: string
  path: string
  headline: string
  description: string
  image?: string | null
  publishedAt?: string | null
  author?: string | null
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.headline,
    description: input.description,
    image: input.image ? [absoluteUrl(input.origin, input.image)] : undefined,
    datePublished: input.publishedAt ?? undefined,
    author: { "@type": "Organization", name: input.author || SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(input.origin, "/brand/logo-vmit-color.png") },
    },
    mainEntityOfPage: absoluteUrl(input.origin, input.path),
  }
}
