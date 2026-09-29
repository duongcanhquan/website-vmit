"use client"

import { HoverLift, Reveal } from "@/components/common/reveal"
import { ContentState, PageShell } from "@/components/common/page-shell"
import { MotionImage } from "@/components/common/motion-image"
import { useLocale } from "@/components/providers/locale-provider"
import { settingText } from "@/lib/i18n/locale-text"
import type { CmsStatus } from "@/types/home-cms"

type Partner = { id: string; name: string; logo_url: string | null }
type TeamMember = {
  id: string
  full_name: string
  full_name_vi: string | null
  full_name_en: string | null
  role_title: string
  role_title_vi: string | null
  role_title_en: string | null
  avatar_url: string | null
}
type Pillar = Record<string, unknown>

export function AboutPageView({
  settings,
  pillars,
  pillarsStatus,
  partners,
  partnersStatus,
  team,
  teamStatus,
  heroImage,
}: {
  settings: Record<string, unknown>
  pillars: Pillar[]
  pillarsStatus: CmsStatus
  partners: Partner[]
  partnersStatus: CmsStatus
  team: TeamMember[]
  teamStatus: CmsStatus
  heroImage: string
}) {
  const { locale } = useLocale()
  const aboutLead =
    settingText(settings.about_lead, locale) ||
    (locale === "vi"
      ? "Câu chuyện thành lập, hành lang pháp lý và hệ sinh thái đối tác."
      : "Founding story, legal pathway and partner ecosystem.")

  return (
    <PageShell
      settings={settings}
      eyebrowVi="Về chúng tôi"
      eyebrowEn="About us"
      titleVi="Về VMIT"
      titleEn="About VMIT"
      leadVi={aboutLead}
      leadEn={aboutLead}
      imageUrl={heroImage}
      imageAltVi="Cộng đồng học tập quốc tế VMIT"
      imageAltEn="VMIT international learning community"
    >
      <section className="mb-16">
        <Reveal>
          <p className="overline text-accent-cobalt">{locale === "vi" ? "Trụ đột phá" : "Pillars"}</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-brand-navy">
            {locale === "vi" ? "Vì sao chọn VMIT" : "Why choose VMIT"}
          </h2>
        </Reveal>
        <div className="mt-6">
          <ContentState
            status={pillarsStatus}
            emptyVi="Chưa có trụ đột phá trong CMS."
            emptyEn="No pillars in CMS yet."
          />
        </div>
        {pillarsStatus === "ok" ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pillars.map((item, index) => {
              const id = String(item.id ?? index)
              const title =
                locale === "vi"
                  ? String(item.title_vi ?? "")
                  : String(item.title_en ?? item.title_vi ?? "")
              const description =
                locale === "vi"
                  ? String(item.description_vi ?? "")
                  : String(item.description_en ?? item.description_vi ?? "")
              const eyebrow =
                locale === "vi"
                  ? String(item.eyebrow_vi ?? "")
                  : String(item.eyebrow_en ?? item.eyebrow_vi ?? "")
              return (
                <Reveal key={id} delay={0.05 * index}>
                  <article className="rounded-xl border border-border bg-surface p-6 shadow-hairline">
                    {eyebrow ? <p className="overline text-accent-cobalt">{eyebrow}</p> : null}
                    <h3 className="mt-2 font-display text-xl font-medium text-brand-navy">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{description}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        ) : null}
      </section>

      <section className="mb-16">
        <Reveal>
          <p className="overline text-accent-cobalt">{locale === "vi" ? "Đối tác" : "Partners"}</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-brand-navy">
            {locale === "vi" ? "Mạng lưới quốc tế" : "International network"}
          </h2>
        </Reveal>
        <div className="mt-6">
          <ContentState
            status={partnersStatus}
            emptyVi="Chưa có đối tác trong CMS."
            emptyEn="No partners in CMS yet."
          />
        </div>
        {partnersStatus === "ok" ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <Reveal key={p.id} delay={0.04 * i}>
                <div className="flex min-h-20 items-center justify-center rounded-xl border border-border bg-surface px-4 py-5 text-center text-sm font-semibold text-brand-navy shadow-hairline">
                  {p.name}
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      <section>
        <Reveal>
          <p className="overline text-accent-cobalt">{locale === "vi" ? "Đội ngũ" : "Team"}</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-brand-navy">
            {locale === "vi" ? "Con người VMIT" : "People of VMIT"}
          </h2>
        </Reveal>
        <div className="mt-6">
          <ContentState
            status={teamStatus}
            emptyVi="Chưa có thành viên đội ngũ trong CMS."
            emptyEn="No team members in CMS yet."
          />
        </div>
        {teamStatus === "ok" ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => {
              const displayName =
                (locale === "vi" ? member.full_name_vi : member.full_name_en) ||
                member.full_name ||
                member.full_name_vi ||
                ""
              const role =
                (locale === "vi" ? member.role_title_vi : member.role_title_en) ||
                member.role_title ||
                member.role_title_vi ||
                ""
              return (
                <Reveal key={member.id} delay={0.05 * i}>
                  <HoverLift>
                    <article className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
                      <div className="relative aspect-[4/3] bg-sky">
                        {member.avatar_url ? (
                          <MotionImage
                            src={member.avatar_url}
                            alt={displayName}
                            fill
                            sizes="(max-width:768px) 100vw, 33vw"
                            frameClassName="absolute inset-0"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-display text-3xl text-brand-navy/20">
                            {displayName.slice(0, 1)}
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg font-medium text-brand-navy">{displayName}</h3>
                        <p className="mt-1 text-sm text-muted">{role}</p>
                      </div>
                    </article>
                  </HoverLift>
                </Reveal>
              )
            })}
          </div>
        ) : null}
      </section>
    </PageShell>
  )
}
