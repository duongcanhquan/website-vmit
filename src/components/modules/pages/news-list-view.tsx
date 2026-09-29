"use client"

import { PageShell } from "@/components/common/page-shell"
import { Reveal } from "@/components/common/reveal"
import { PostCard } from "@/components/modules/news/post-card"
import { MEDIA } from "@/constants/media"
import type { NewsPost } from "@/types/home-cms"

export function NewsListView({ settings, posts }: { settings: Record<string, unknown>; posts: NewsPost[] }) {
  return (
    <PageShell
      settings={settings}
      eyebrowVi="Tin tức"
      eyebrowEn="News"
      titleVi={"Tin tức và sự\u00A0kiện"}
      titleEn={"VMIT news &\u00A0events"}
      leadVi="Hoạt động học thuật, dự án doanh nghiệp và đời sống sinh viên tại VMIT."
      leadEn="Academic highlights, employer projects and student life at VMIT."
      imageUrl={MEDIA.newsCampusLife}
      showApplyCta={false}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.id} delay={0.04 * (i % 3)} className="h-full">
            <PostCard post={post} index={i} />
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
