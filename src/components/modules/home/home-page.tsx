"use client"

import { useState } from "react"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { AboutBenefits } from "@/components/modules/home/about-benefits"
import {
  ApplyCta,
  ProgramsPreview,
  TuitionTeaser,
} from "@/components/modules/home/funnel-sections"
import { HeroSection } from "@/components/modules/home/hero-section"
import { ScholarshipModal } from "@/components/modules/home/scholarship-modal"
import { BlogTeaser, TestimonialsSection } from "@/components/modules/home/social-proof"
import { TrustMarquee } from "@/components/modules/home/trust-marquee"
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
      <SiteHeader settings={cms.settings} overHero />
      <main>
        <HeroSection settings={heroSettings} onOpenScholarship={() => setScholarshipOpen(true)} />
        <AboutBenefits
          settings={cms.settings}
          counters={cms.counters}
          countersStatus={cms.countersStatus}
          imageUrl={String(heroSettings.campus_image_url)}
        />
        <TrustMarquee partners={cms.partners} status={cms.partnersStatus} />
        <ProgramsPreview courses={cms.courses} status={cms.coursesStatus} />
        <TestimonialsSection items={cms.testimonials} status={cms.testimonialsStatus} />
        <BlogTeaser items={cms.posts} status={cms.postsStatus} />
        <TuitionTeaser plans={cms.pricing} status={cms.pricingStatus} settings={cms.settings} />
        <ApplyCta />
      </main>
      <SiteFooter settings={cms.settings} />
      <ScholarshipModal open={scholarshipOpen} onClose={() => setScholarshipOpen(false)} />
    </>
  )
}
