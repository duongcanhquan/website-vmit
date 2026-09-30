import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/common/json-ld"
import { NewsDetailView } from "@/components/modules/pages/news-detail-view"
import { DEMO_POSTS } from "@/constants/demo-content"
import { toEditorHtml } from "@/lib/plain-text-html"
import { sanitizeRichHtml } from "@/lib/rich-text"
import { articleJsonLd, buildPageMetadata, loadSeoContext } from "@/lib/seo"
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
  const title = post.seo_title_vi || post.title_vi
  const description = post.seo_description_vi || post.excerpt_vi || post.title_vi
  return buildPageMetadata({
    title,
    description,
    path: `/news/${post.slug || slug}`,
    image: post.cover_url,
    type: "article",
    publishedTime: post.published_at,
  })
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
  const { origin } = await loadSeoContext()
  const headline = post.seo_title_vi || post.title_vi
  const description = post.seo_description_vi || post.excerpt_vi || post.title_vi

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          origin,
          path: `/news/${post.slug || slug}`,
          headline,
          description,
          image: post.cover_url,
          publishedAt: post.published_at,
          author: post.author_name,
        })}
      />
      <NewsDetailView
        settings={settings.data}
        post={post}
        bodyVi={sanitizeRichHtml(toEditorHtml(post.body_vi || post.body))}
        bodyEn={sanitizeRichHtml(toEditorHtml(post.body_en))}
        related={related}
      />
    </>
  )
}
