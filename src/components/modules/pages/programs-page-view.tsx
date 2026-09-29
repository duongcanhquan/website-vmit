"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HoverLift, Reveal } from "@/components/common/reveal"
import { ContentState, PageShell } from "@/components/common/page-shell"
import { MotionImage } from "@/components/common/motion-image"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { MEDIA } from "@/constants/media"
import { ROUTES } from "@/constants/site"
import { cn } from "@/lib/utils"
import type { CmsStatus } from "@/types/home-cms"

const coverFallbacks = [MEDIA.lab, MEDIA.studentsCollab, MEDIA.library] as const

type Course = {
  id: string
  slug: string
  title_vi: string
  title_en: string
  summary_vi: string
  summary_en: string
  cover_url: string | null
}

export function ProgramsPageView({
  settings,
  courses,
  status,
  heroImage,
}: {
  settings: Record<string, unknown>
  courses: Course[]
  status: CmsStatus
  heroImage: string
}) {
  const { locale, t } = useLocale()

  return (
    <PageShell
      settings={settings}
      eyebrowVi="Chương trình"
      eyebrowEn="Programmes"
      titleVi="Chương trình đào tạo"
      titleEn="Programmes"
      leadVi="Hai ngành BTEC trọng điểm và Foundation IELTS — chuẩn Anh Quốc, học tại Việt Nam."
      leadEn="Two flagship BTEC pathways plus IELTS Foundation — UK standards, studied in Vietnam."
      imageUrl={heroImage}
      imageAltVi="Lớp học đa văn hóa tại VMIT"
      imageAltEn="Multicultural classroom at VMIT"
    >
      <ContentState
        status={status}
        emptyVi="Chưa có chương trình trong CMS. Thêm tại Admin → Chương trình."
        emptyEn="No programmes in CMS yet. Add them in Admin → Programmes."
      />
      {status === "ok" ? (
        <div className="grid gap-5 md:grid-cols-3">
          {courses.map((item, index) => {
            const cover = item.cover_url || coverFallbacks[index % coverFallbacks.length]
            return (
            <Reveal key={item.id} delay={0.06 * index}>
              <HoverLift className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[3px] border border-border bg-surface shadow-hairline">
                  <div className="relative aspect-[16/10] w-full bg-sky">
                    <MotionImage
                      src={cover}
                      alt={locale === "vi" ? item.title_vi : item.title_en}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      frameClassName="absolute inset-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-xl font-medium text-brand-navy">
                      {locale === "vi" ? item.title_vi : item.title_en}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
                      {locale === "vi" ? item.summary_vi : item.summary_en}
                    </p>
                    <Link
                      href={ROUTES.apply}
                      className={cn(buttonVariants({ variant: "outlineNavy", size: "sm" }), "mt-5 w-fit")}
                    >
                      {t.nav.apply}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              </HoverLift>
            </Reveal>
            )
          })}
        </div>
      ) : null}
    </PageShell>
  )
}
