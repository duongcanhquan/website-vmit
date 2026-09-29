import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NewsDetailView } from "@/components/modules/pages/news-detail-view"
import { DEMO_POSTS } from "@/constants/demo-content"
import { toEditorHtml } from "@/lib/plain-text-html"
import { sanitizeRichHtml } from "@/lib/rich-text"
import { getAllPublishedPosts, getPublishedPostBySlug, getSettingsMap } from "@/services/cms"
import type { NewsPost } from "@/types/home-cms"

export const revalidate = 120

type Params = Promise<{ slug: string }>

type PostWithBody = NewsPost & { body?: string | null }

async function loadPost(slug: string): Promise<PostWithBody | null> {
  const fromCms = await getPublishedPostBySlug(slug)
  if (fromCms.status === "ok" && fromCms.data) return fromCms.data as PostWithBody
  return DEMO_POSTS.find((post) => post.slug === slug || post.id === slug) ?? null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(decodeURIComponent(slug))
  if (!post) return { title: "Tin tức" }
  return {
    title: post.title_vi,
    description: post.excerpt_vi ?? undefined,
    openGraph: { title: post.title_vi, description: post.excerpt_vi ?? undefined, images: post.cover_url ? [post.cover_url] : undefined },
  }
}

export default async function TinTucDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const [post, settings, list] = await Promise.all([
    loadPost(decodeURIComponent(slug)),
    getSettingsMap(),
    getAllPublishedPosts(),
  ])
  if (!post) notFound()

  const pool: NewsPost[] = list.status === "ok" ? list.data : DEMO_POSTS
  const related = pool.filter((item) => item.id !== post.id).slice(0, 3)

  return (
    <NewsDetailView
      settings={settings.data}
      post={post}
      bodyVi={sanitizeRichHtml(toEditorHtml(post.body_vi || post.body))}
      bodyEn={sanitizeRichHtml(toEditorHtml(post.body_en))}
      related={related}
    />
  )
}
