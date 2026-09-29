"use client"

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
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
          <p className="overline text-center">{locale === "vi" ? "Đánh giá" : "Testimonial"}</p>
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
            {locale === "vi"
              ? "Chưa có đánh giá trong CMS."
              : "No testimonials in CMS yet."}
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

export function BlogTeaser({ items, status }: { items: Post[]; status: CmsStatus }) {
  const { locale } = useLocale()
  return (
    <section className="bg-mist py-16 md:py-20">
      <div className="mx-auto max-w-[85%]">
        <Reveal>
          <p className="overline text-center">{locale === "vi" ? "Tin tức" : "Our blog"}</p>
          <h2 className="mt-3 text-center text-3xl font-black text-brand-navy md:text-4xl">
            {locale === "vi" ? "Cập nhật từ VMIT" : "Recent from VMIT"}
          </h2>
        </Reveal>
        {status !== "ok" ? (
          <p className="mt-8 text-center text-sm text-muted">
            {status === "error"
              ? locale === "vi"
                ? "Không tải được bài viết."
                : "Unable to load posts."
              : locale === "vi"
                ? "Chưa có bài viết trong CMS."
                : "No journal posts in CMS yet."}
          </p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {items.slice(0, 3).map((post, i) => (
              <Reveal key={post.id} delay={0.06 * i}>
                <article className="overflow-hidden rounded-[3px] bg-surface shadow-hairline">
                  <div className="relative aspect-[16/10] bg-sky">
                    {post.cover_url ? (
                      <Image
                        src={post.cover_url}
                        alt={locale === "vi" ? post.title_vi : post.title_en}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 28vw"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-brand-navy">
                      {locale === "vi" ? post.title_vi : post.title_en}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted">
                      {locale === "vi" ? post.excerpt_vi : post.excerpt_en}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link href={ROUTES.about} className={cn(buttonVariants({ variant: "primary" }))}>
            {locale === "vi" ? "Tìm hiểu thêm" : "Learn more"}
          </Link>
        </div>
      </div>
    </section>
  )
}
