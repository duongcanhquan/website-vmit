import type { Metadata } from "next"
import { NewsListView } from "@/components/modules/pages/news-list-view"
import { DEMO_POSTS } from "@/constants/demo-content"
import { buildPageMetadata } from "@/lib/seo"
import { getAllPublishedPosts, getSettingsMap } from "@/services/cms"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Tin tức",
    description: "Tin tức, sự kiện và câu chuyện sinh viên VMIT.",
    path: "/news",
  })
}

export default async function TinTucPage() {
  const [settings, posts] = await Promise.all([getSettingsMap(), getAllPublishedPosts()])
  return <NewsListView settings={settings.data} posts={posts.status === "ok" ? posts.data : DEMO_POSTS} />
}
