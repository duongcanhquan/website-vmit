import type { MetadataRoute } from "next"
import { DEMO_POSTS } from "@/constants/demo-content"
import { PUBLIC_PATHS, absoluteUrl, siteOrigin } from "@/lib/seo"
import { getAllPublishedPosts, getSettingsMap } from "@/services/cms"

export const revalidate = 120

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = (await getSettingsMap()).data
  const origin = siteOrigin(settings)
  const posts = await getAllPublishedPosts()
  const items = posts.status === "ok" && posts.data.length ? posts.data : DEMO_POSTS

  const pages: MetadataRoute.Sitemap = PUBLIC_PATHS.map((path) => ({
    url: absoluteUrl(origin, path),
    changeFrequency: path === "/" || path === "/news" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/news" || path === "/apply" ? 0.8 : 0.7,
  }))

  const articles: MetadataRoute.Sitemap = items
    .filter((post) => post.slug)
    .map((post) => ({
      url: absoluteUrl(origin, `/news/${post.slug}`),
      lastModified: post.published_at ? new Date(post.published_at) : undefined,
      changeFrequency: "weekly",
      priority: 0.6,
    }))

  return [...pages, ...articles]
}
