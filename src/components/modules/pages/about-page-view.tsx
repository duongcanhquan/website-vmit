"use client"

import Image from "next/image"
import { HoverLift, Reveal } from "@/components/common/reveal"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { AboutDualDegree } from "@/components/modules/about/about-dual-degree"
import { AboutHero } from "@/components/modules/about/about-hero"
import { AboutKeiser } from "@/components/modules/about/about-keiser"
import { AboutCommitments, AboutCredits, AboutMajors } from "@/components/modules/about/about-majors"
import { AboutPractice } from "@/components/modules/about/about-practice"
import { AboutProgress } from "@/components/modules/about/about-progress"
import { AboutRoadmap } from "@/components/modules/about/about-roadmap"
import { SectionHeading, useT } from "@/components/modules/about/about-shared"
import { AboutStandard } from "@/components/modules/about/about-standard"
import { AboutStatement } from "@/components/modules/about/about-statement"
import { AboutSunderland } from "@/components/modules/about/about-sunderland"
import { useLocale } from "@/components/providers/locale-provider"
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

function PeopleAndPartners({
  team,
  partners,
}: {
  team: TeamMember[]
  partners: Partner[]
}) {
  const t = useT()
  const { locale } = useLocale()
  if (!team.length && !partners.length) return null

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[85%]">
        {team.length ? (
          <>
            <SectionHeading
              eyebrow={t({ vi: "Đội ngũ", en: "Team" })}
              title={t({ vi: "Con người VMIT", en: "People of VMIT" })}
              center
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, i) => {
                const name =
                  (locale === "vi" ? member.full_name_vi : member.full_name_en) || member.full_name || member.full_name_vi || ""
                const role =
                  (locale === "vi" ? member.role_title_vi : member.role_title_en) || member.role_title || member.role_title_vi || ""
                return (
                  <Reveal key={member.id} delay={0.05 * i}>
                    <HoverLift>
                      <article className="overflow-hidden rounded-[6px] bg-mist">
                        <div className="relative aspect-[4/5] bg-sky">
                          {member.avatar_url ? (
                            <Image src={member.avatar_url} alt={name} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-5xl font-black text-primary/30">
                              {name.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <div className="p-5 text-center">
                          <h3 className="text-lg font-bold text-brand-navy">{name}</h3>
                          <p className="mt-1 text-sm text-muted">{role}</p>
                        </div>
                      </article>
                    </HoverLift>
                  </Reveal>
                )
              })}
            </div>
          </>
        ) : null}

        {partners.length ? (
          <div className={team.length ? "mt-20" : undefined}>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted">
              {t({ vi: "Mạng lưới đối tác quốc tế", en: "International partner network" })}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((p, i) => (
                <Reveal key={p.id} delay={0.04 * i}>
                  <div className="flex min-h-20 items-center justify-center rounded-[6px] border border-border bg-white px-4 py-5 text-center text-sm font-semibold text-brand-navy transition-colors hover:border-primary hover:text-primary">
                    {p.name}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function AboutPageView({
  settings,
  partners,
  partnersStatus,
  team,
  teamStatus,
}: {
  settings: Record<string, unknown>
  partners: Partner[]
  partnersStatus: CmsStatus
  team: TeamMember[]
  teamStatus: CmsStatus
}) {
  return (
    <>
      <SiteHeader settings={settings} overHero />
      <AboutProgress />
      <main>
        <AboutHero />
        <AboutStatement />
        <AboutRoadmap />
        <AboutStandard />
        <AboutPractice />
        <AboutDualDegree />
        <AboutSunderland />
        <AboutKeiser />
        <AboutMajors />
        <AboutCommitments settings={settings} />
        <PeopleAndPartners
          team={teamStatus === "ok" ? team : []}
          partners={partnersStatus === "ok" ? partners : []}
        />
        <AboutCredits />
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
