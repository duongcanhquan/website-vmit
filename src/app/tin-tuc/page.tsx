import type { Metadata } from "next"
import { NewsListView } from "@/components/modules/pages/news-list-view"
import { DEMO_POSTS } from "@/constants/demo-content"
import { getAllPublishedPosts, getSettingsMap } from "@/services/cms"

export const metadata: Metadata = { title: "Tin tức" }

export default async function TinTucPage() {
  const [settings, posts] = await Promise.all([getSettingsMap(), getAllPublishedPosts()])
  return <NewsListView settings={settings.data} posts={posts.status === "ok" ? posts.data : DEMO_POSTS} />
}
