"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, User } from "lucide-react"
import { useLocale } from "@/components/providers/locale-provider"
import { MEDIA } from "@/constants/media"
import { ROUTES } from "@/constants/site"
import type { NewsPost } from "@/types/home-cms"

const FALLBACK_COVERS = [MEDIA.newsClassroom, MEDIA.newsAnalytics, MEDIA.newsCampusLife] as const

export function formatPostDate(value: string | null | undefined, locale: "vi" | "en"): string {
  if (!value) return locale === "vi" ? "Mới cập nhật" : "Recently updated"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return locale === "vi" ? "Mới cập nhật" : "Recently updated"
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function postHref(post: Pick<NewsPost, "slug" | "id">): string {
  return `${ROUTES.news}/${encodeURIComponent(post.slug || post.id)}`
}

export function PostCard({ post, index = 0 }: { post: NewsPost; index?: number }) {
  const { locale } = useLocale()
  const title = (locale === "en" && post.title_en) || post.title_vi
  const excerpt = (locale === "en" && post.excerpt_en) || post.excerpt_vi
  const cover = post.cover_url || FALLBACK_COVERS[index % FALLBACK_COVERS.length]

  return (
    <Link href={postHref(post)} className="group block h-full">
      <article className="h-full overflow-hidden rounded-[3px] border border-border bg-surface shadow-hairline transition group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.18)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-sky">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 28vw"
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-primary">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5" />
              <span className="text-muted">{post.author_name || "VMIT"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              <span className="text-muted">{formatPostDate(post.published_at, locale)}</span>
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold leading-snug text-brand-navy transition group-hover:text-primary">
            {title}
          </h3>
          {excerpt ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted md:text-base">{excerpt}</p>
          ) : null}
          <p className="mt-5 text-sm font-semibold text-primary">{locale === "vi" ? "Đọc tiếp →" : "Read more →"}</p>
        </div>
      </article>
    </Link>
  )
}
