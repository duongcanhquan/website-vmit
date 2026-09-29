"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, User } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { MEDIA } from "@/constants/media"
import { ROUTES } from "@/constants/site"
import { cn } from "@/lib/utils"
import type { CmsStatus } from "@/types/home-cms"

type Testimonial = {
  id: string
  author_name: string
  author_role_vi?: string | null
  author_role_en?: string | null
  quote_vi: string
  quote_en: string
  avatar_url?: string | null
}

type Post = {
  id: string
  title_vi: string
  title_en: string
  excerpt_vi?: string | null
  excerpt_en?: string | null
  cover_url?: string | null
  slug?: string | null
  author_name?: string | null
  published_at?: string | null
}

const fallbackCovers = [MEDIA.seminar, MEDIA.studentsStudy, MEDIA.studentsCollab] as const

function formatPostDate(value: string | null | undefined, locale: "vi" | "en"): string {
  if (!value) return locale === "vi" ? "Mới cập nhật" : "Recently"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return locale === "vi" ? "Mới cập nhật" : "Recently"
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function TestimonialsSection({
  items,
  status,
}: {
  items: Testimonial[]
  status: CmsStatus
}) {
  const { locale } = useLocale()
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-[85%]">
        <Reveal>
          <p className="text-center text-sm font-bold uppercase tracking-[0.12em] text-primary">
            {locale === "vi" ? "Đánh giá" : "Testimonial"}
          </p>
          <h2 className="mt-3 text-center text-3xl font-black text-brand-navy md:text-4xl">
            {locale === "vi" ? "Học viên nói gì về VMIT" : "What our students say"}
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
                <article className="h-full rounded-[3px] border border-border bg-mist p-6 shadow-hairline">
                  <p className="text-sm leading-relaxed text-muted">
                    “{locale === "vi" ? item.quote_vi : item.quote_en}”
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    {item.avatar_url ? (
                      <Image
                        src={item.avatar_url}
                        alt={item.author_name}
                        width={48}
                        height={48}
                        className="size-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {item.author_name.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-brand-navy">{item.author_name}</p>
                      <p className="text-xs text-primary">
                        {locale === "vi" ? item.author_role_vi : item.author_role_en}
                      </p>
                    </div>
                  </div>
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
export function BlogTeaser({ items, status }: { items: Post[]; status: CmsStatus }) {
  const { locale } = useLocale()

  return (
    <section id="tin-tuc" className="bg-mist py-16 md:py-24">
      <div className="mx-auto max-w-[85%]">
        <Reveal>
          <p className="text-center text-sm font-bold uppercase tracking-[0.12em] text-primary">
            {locale === "vi" ? "Tin tức" : "Our blog"}
          </p>
          <h2 className="mt-3 text-center text-3xl font-black text-brand-navy md:text-4xl">
            {locale === "vi" ? "Mới từ VMIT" : "Recent from blog"}
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
            {items.slice(0, 3).map((post, i) => {
              const title = locale === "vi" ? post.title_vi : post.title_en
              const excerpt = locale === "vi" ? post.excerpt_vi : post.excerpt_en
              const cover = post.cover_url || fallbackCovers[i % fallbackCovers.length]
              const author = post.author_name || "VMIT"
              return (
                <Reveal key={post.id} delay={0.06 * i}>
                  <article className="group h-full overflow-hidden rounded-[3px] border border-border bg-surface shadow-hairline transition hover:-translate-y-0.5">
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
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        <span className="inline-flex items-center gap-1.5">
                          <User className="size-3.5" />
                          <span className="text-muted normal-case tracking-normal">{author}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" />
                          <span className="text-muted normal-case tracking-normal">
                            {formatPostDate(post.published_at, locale)}
                          </span>
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold leading-snug text-brand-navy transition group-hover:text-primary">
                        {title}
                      </h3>
                      {excerpt ? (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted md:text-base">
                          {excerpt}
                        </p>
                      ) : null}
                      <p className="mt-5 text-sm font-semibold text-primary">
                        {locale === "vi" ? "Đọc tiếp →" : "Read more →"}
                      </p>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        ) : null}

        <div className="mt-10 text-center">
          <Link href="/#tin-tuc" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            {locale === "vi" ? "Xem tin tức" : "View blog"}
          </Link>
        </div>
      </div>
    </section>
  )
}
