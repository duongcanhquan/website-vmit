"use client"

import Link from "next/link"
import { ArrowLeft, CalendarDays, User } from "lucide-react"
import { MotionImage } from "@/components/common/motion-image"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { PostCard, formatPostDate } from "@/components/modules/news/post-card"
import { useLocale } from "@/components/providers/locale-provider"
import { MEDIA } from "@/constants/media"
import { ROUTES } from "@/constants/site"
import type { NewsPost } from "@/types/home-cms"

export function NewsDetailView({
  settings,
  post,
  bodyVi,
  bodyEn,
  related,
}: {
  settings: Record<string, unknown>
  post: NewsPost
  bodyVi: string
  bodyEn: string
  related: NewsPost[]
}) {
  const { locale } = useLocale()
  const title = (locale === "en" && post.title_en) || post.title_vi
  const excerpt = (locale === "en" && post.excerpt_en) || post.excerpt_vi
  const body = (locale === "en" && bodyEn) || bodyVi

  return (
    <>
      <SiteHeader settings={settings} overHero />
      <main className="bg-mist">
        <section className="relative flex min-h-[52vh] items-end overflow-hidden">
          <div className="absolute inset-0">
            <MotionImage
              src={post.cover_url || MEDIA.newsClassroom}
              alt={title}
              fill
              priority
              sizes="100vw"
              frameClassName="absolute inset-0 h-full w-full"
              className="object-cover object-center"
              zoom={1.02}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-12 pt-40 text-white md:pb-16">
            <Link
              href={ROUTES.news}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              {locale === "vi" ? "Tất cả tin tức" : "All news"}
            </Link>
            <h1 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-black leading-tight tracking-tight">{title}</h1>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4" />
                {post.author_name || "VMIT"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatPostDate(post.published_at, locale)}
              </span>
            </div>
          </div>
        </section>

        <article className="mx-auto -mt-8 max-w-4xl px-4 md:px-6">
          <div className="relative z-10 rounded-[3px] bg-surface px-6 py-10 shadow-hairline md:px-14 md:py-14">
            {excerpt ? <p className="mb-8 text-lg font-medium leading-relaxed text-brand-navy md:text-xl">{excerpt}</p> : null}
            {body ? (
              <div className="rich-content prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: body }} />
            ) : (
              <p className="text-muted">
                {locale === "vi" ? "Bài viết đang được cập nhật nội dung." : "This article is being updated."}
              </p>
            )}
          </div>
        </article>

        {related.length ? (
          <section className="mx-auto max-w-[85%] py-16 md:py-20">
            <h2 className="text-center text-2xl font-black text-brand-navy md:text-3xl">
              {locale === "vi" ? "Tin liên quan" : "Related news"}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((item, i) => (
                <PostCard key={item.id} post={item} index={i} />
              ))}
            </div>
          </section>
        ) : (
          <div className="h-16" />
        )}
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
