"use client"

import { HoverLift, Reveal } from "@/components/common/reveal"
import { ContentState, PageShell } from "@/components/common/page-shell"
import { MotionImage } from "@/components/common/motion-image"
import { useLocale } from "@/components/providers/locale-provider"
import type { CmsStatus } from "@/types/home-cms"

type Step = {
  id: string
  step_code: string
  title_vi: string
  title_en: string
  note_vi: string
  note_en: string
}

export function PathwayPageView({
  settings,
  steps,
  status,
  heroImage,
  campusImage,
}: {
  settings: Record<string, unknown>
  steps: Step[]
  status: CmsStatus
  heroImage: string
  campusImage: string
}) {
  const { locale } = useLocale()

  return (
    <PageShell
      settings={settings}
      eyebrowVi="Lộ trình toàn cầu"
      eyebrowEn="Global pathway"
      titleVi="Lộ trình & bằng cấp"
      titleEn="Pathway & awards"
      leadVi="Song bằng tại chỗ và cầu nối chuyển tiếp quốc tế."
      leadEn="Dual awards on campus and international progression bridges."
      imageUrl={heroImage}
      imageAltVi="Kiến trúc học thuật Anh Quốc"
      imageAltEn="UK-style academic architecture"
    >
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <HoverLift>
              <div className="overflow-hidden rounded-xl border border-border shadow-hairline">
                <MotionImage
                  src={campusImage}
                  alt={locale === "vi" ? "Khuôn viên học thuật" : "Academic campus"}
                  fill
                  sizes="(max-width:1024px) 100vw, 40vw"
                  frameClassName="relative aspect-[4/5] w-full"
                />
              </div>
            </HoverLift>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ContentState
            status={status}
            emptyVi="Chưa có bước lộ trình trong CMS."
            emptyEn="No pathway steps in CMS yet."
          />
          {status === "ok" ? (
            <ol className="space-y-4">
              {steps.map((item, index) => (
                <Reveal key={item.id} delay={0.06 * index}>
                  <li className="rounded-xl border border-border bg-surface px-5 py-5 shadow-hairline md:px-6">
                    <div className="flex items-start gap-4">
                      <span className="font-display text-2xl font-medium text-accent-gold">
                        {item.step_code || `0${index + 1}`}
                      </span>
                      <div>
                        <h2 className="font-display text-xl font-medium text-brand-navy">
                          {locale === "vi" ? item.title_vi : item.title_en}
                        </h2>
                        <p className="mt-1 text-sm text-muted md:text-base">
                          {locale === "vi" ? item.note_vi : item.note_en}
                        </p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </PageShell>
  )
}
