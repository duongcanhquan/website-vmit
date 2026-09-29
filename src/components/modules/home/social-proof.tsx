"use client"

import Image from "next/image"
import Link from "next/link"
import { Quote } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { PostCard } from "@/components/modules/news/post-card"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/constants/site"
import { homeImage, homeText } from "@/lib/home-content"
import { canOptimizeImage } from "@/lib/media"
import { cn } from "@/lib/utils"
import type { CmsStatus, NewsPost } from "@/types/home-cms"

type Testimonial = {
  id: string
  author_name: string
  author_role_vi?: string | null
  author_role_en?: string | null
  quote_vi: string
  quote_en: string
  avatar_url?: string | null
}

export function TestimonialsSection({
  items,
  status,
  settings = {},
}: {
  items: Testimonial[]
  status: CmsStatus
  settings?: Record<string, unknown>
}) {
  const { locale } = useLocale()
  return (
    <section
      className="relative bg-cover bg-center py-16 md:py-24"
      style={{ backgroundImage: `url(${homeImage(settings, "home_testimonials_image")})` }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-[85%]">
        <Reveal>
          <p className="text-center text-sm font-bold uppercase tracking-[0.12em] text-primary">
            {homeText(settings, "home_testimonials_eyebrow", locale)}
          </p>
          <h2 className="mt-3 text-center text-3xl font-black text-white md:text-4xl">
            {homeText(settings, "home_testimonials_title", locale)}
          </h2>
        </Reveal>
        {status === "error" ? (
          <p className="mt-8 text-center text-sm text-muted">
            {locale === "vi" ? "Không tải được đánh giá." : "Unable to load testimonials."}
          </p>
        ) : null}
        {status === "empty" ? (
          <p className="mt-8 text-center text-sm text-muted">
            {locale === "vi" ? "Chưa có đánh giá trong CMS." : "No testimonials in CMS yet."}
          </p>
        ) : null}
        {status === "ok" ? (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {items.slice(0, 3).map((item, i) => (
              <Reveal key={item.id} delay={0.06 * i}>
                <article className="flex h-full flex-col rounded-[3px] bg-surface p-7 shadow-hairline">
                  <div className="flex items-center gap-4">
                    {item.avatar_url ? (
                      <Image
                        src={item.avatar_url}
                        alt={item.author_name}
                        width={128}
                        height={128}
                        unoptimized={!canOptimizeImage(item.avatar_url)}
                        className="size-16 shrink-0 rounded-full object-cover ring-4 ring-primary/20"
                      />
                    ) : (
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                        {item.author_name.slice(0, 1)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-lg font-bold text-brand-navy">{item.author_name}</p>
                      <p className="text-sm leading-snug text-primary">
                        {locale === "vi" ? item.author_role_vi : item.author_role_en}
                      </p>
                    </div>
                    <Quote className="ml-auto size-9 shrink-0 fill-primary/15 stroke-primary" />
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-muted">
                    {locale === "vi" ? item.quote_vi : item.quote_en}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/** Academia “OUR BLOG / Recent From Blog” → Tin tức VMIT */
export function BlogTeaser({
  items,
  status,
  settings = {},
}: {
  items: NewsPost[]
  status: CmsStatus
  settings?: Record<string, unknown>
}) {
  const { locale } = useLocale()

  return (
    <section id="tin-tuc" className="bg-mist py-16 md:py-24">
      <div className="mx-auto max-w-[85%]">
        <Reveal>
          <p className="text-center text-sm font-bold uppercase tracking-[0.12em] text-primary">
            {homeText(settings, "home_blog_eyebrow", locale)}
          </p>
          <h2 className="mt-3 text-center text-3xl font-black text-brand-navy md:text-4xl">
            {homeText(settings, "home_blog_title", locale)}
          </h2>
        </Reveal>

        {status === "error" ? (
          <p className="mt-8 text-center text-sm text-muted">
            {locale === "vi" ? "Không tải được tin tức." : "Unable to load news."}
          </p>
        ) : null}

        {status === "empty" ? (
          <p className="mt-8 text-center text-sm text-muted">
            {locale === "vi"
              ? "Chưa có tin tức. Thêm bài tại Admin → Tin tức / Bài viết."
              : "No posts yet. Add them in Admin → News / Posts."}
          </p>
        ) : null}

        {status === "ok" ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {items.slice(0, 3).map((post, i) => (
              <Reveal key={post.id} delay={0.06 * i} className="h-full">
                <PostCard post={post} index={i} />
              </Reveal>
            ))}
          </div>
        ) : null}

        <div className="mt-10 text-center">
          <Link href={ROUTES.news} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            {homeText(settings, "home_blog_cta", locale)}
          </Link>
        </div>
      </div>
    </section>
  )
}
