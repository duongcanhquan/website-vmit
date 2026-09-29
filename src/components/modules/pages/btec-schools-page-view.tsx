"use client"

import { PageShell } from "@/components/common/page-shell"
import { useLocale } from "@/components/providers/locale-provider"
import type { BtecSchool } from "@/constants/btec-schools"

export function BtecSchoolsPageView({
  settings,
  schools,
  heroImage,
}: {
  settings: Record<string, unknown>
  schools: BtecSchool[]
  heroImage: string
}) {
  const { locale } = useLocale()
  const groups: { region: string; items: BtecSchool[] }[] = []
  for (const school of schools) {
    const region = locale === "vi" ? school.region_vi : school.region_en
    const current = groups.find((group) => group.region === region)
    if (current) current.items.push(school)
    else groups.push({ region, items: [school] })
  }

  return (
    <PageShell
      settings={settings}
      eyebrowVi="Mạng lưới Pearson"
      eyebrowEn="Pearson network"
      titleVi={"Các trường BTEC trên thế\u00A0giới"}
      titleEn={"BTEC universities\u00A0worldwide"}
      leadVi="HND Level 5 của VMIT được các đại học đối tác công nhận để vào năm cuối hoặc lộ trình 2+2. Danh sách do nhà trường cập nhật."
      leadEn="VMIT’s HND Level 5 is accepted by partner universities for a final year or a 2+2 route. The college keeps this list up to date."
      imageUrl={heroImage}
      imageAltVi="Khuôn viên đại học đối tác"
      imageAltEn="A partner university campus"
      showApplyCta
    >
      {groups.length === 0 ? (
        <p className="rounded-[3px] border border-border bg-surface px-5 py-6 text-sm text-muted">
          {locale === "vi" ? "Danh sách trường đang được cập nhật." : "The university list is being updated."}
        </p>
      ) : (
        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.region}>
              <h2 className="font-display text-2xl text-brand-navy md:text-3xl">{group.region}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {group.items.map((school) => {
                  const detail = locale === "vi" ? school.detail_vi : school.detail_en
                  const body = (
                    <>
                      <span className="block text-lg font-bold text-brand-navy">{school.name}</span>
                      {detail ? <span className="mt-1 block text-sm text-muted">{detail}</span> : null}
                    </>
                  )
                  return (
                    <li key={`${group.region}-${school.name}`}>
                      {school.url ? (
                        <a
                          href={school.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block h-full rounded-[3px] border border-border bg-surface px-5 py-4 shadow-hairline transition-colors duration-150 hover:border-primary active:scale-[0.99] active:border-primary active:bg-sky"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="h-full rounded-[3px] border border-border bg-surface px-5 py-4 shadow-hairline">
                          {body}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  )
}
