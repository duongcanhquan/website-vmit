"use client"

import { useState } from "react"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import {
  ApplyCta,
  PathwayPreview,
  ProgramsPreview,
  StudentLifePreview,
  TuitionTeaser,
} from "@/components/modules/home/funnel-sections"
import { HeroSection } from "@/components/modules/home/hero-section"
import { PillarsBento } from "@/components/modules/home/pillars-bento"
import { ScholarshipModal } from "@/components/modules/home/scholarship-modal"
import { TrustMarquee } from "@/components/modules/home/trust-marquee"
import { VisualGallery } from "@/components/modules/home/visual-gallery"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import type { HomeCmsProps } from "@/types/home-cms"

export default function HomePage({ cms }: { cms: HomeCmsProps }) {
  const [scholarshipOpen, setScholarshipOpen] = useState(false)
  const heroSettings = {
    ...cms.settings,
    hero_image_url: resolveMediaUrl(cms.settings.hero_image_url, MEDIA.hero),
    campus_image_url: resolveMediaUrl(cms.settings.campus_image_url, MEDIA.campusFacility),
    life_image_1_url: resolveMediaUrl(cms.settings.life_image_1_url, MEDIA.studentsCollab),
    life_image_2_url: resolveMediaUrl(cms.settings.life_image_2_url, MEDIA.studentsStudy),
  }

  return (
    <>
      <SiteHeader settings={cms.settings} />
      <main>
        <HeroSection settings={heroSettings} onOpenScholarship={() => setScholarshipOpen(true)} />
        <TrustMarquee partners={cms.partners} status={cms.partnersStatus} />
        <PillarsBento
          pillars={cms.pillars}
          counters={cms.counters}
          pillarsStatus={cms.pillarsStatus}
          countersStatus={cms.countersStatus}
        />
        <VisualGallery items={cms.gallery} status={cms.galleryStatus} settings={cms.settings} />
        <ProgramsPreview courses={cms.courses} status={cms.coursesStatus} />
        <PathwayPreview
          steps={cms.pathway}
          status={cms.pathwayStatus}
          campusUrl={String(heroSettings.campus_image_url)}
        />
        <TuitionTeaser plans={cms.pricing} status={cms.pricingStatus} settings={cms.settings} />
        <StudentLifePreview settings={heroSettings} />
        <ApplyCta />
      </main>
      <SiteFooter settings={cms.settings} />
      <ScholarshipModal open={scholarshipOpen} onClose={() => setScholarshipOpen(false)} />
    </>
  )
}
