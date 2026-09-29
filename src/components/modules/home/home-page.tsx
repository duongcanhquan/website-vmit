"use client"

import { useState } from "react"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { AboutBenefits } from "@/components/modules/home/about-benefits"
import {
  ApplyCta,
  PathwayPreview,
  ProgramsPreview,
} from "@/components/modules/home/funnel-sections"
import { HeroSection } from "@/components/modules/home/hero-section"
import { ScholarshipModal } from "@/components/modules/home/scholarship-modal"
import { BlogTeaser, TestimonialsSection } from "@/components/modules/home/social-proof"
import { SubjectsGrid } from "@/components/modules/home/subjects-grid"
import { TrustMarquee } from "@/components/modules/home/trust-marquee"
import { DEMO_POSTS, DEMO_TESTIMONIALS } from "@/constants/demo-content"
import { MEDIA } from "@/constants/media"
import { resolveMediaUrl } from "@/lib/media"
import type { HomeCmsProps } from "@/types/home-cms"

export default function HomePage({ cms }: { cms: HomeCmsProps }) {
  const [scholarshipOpen, setScholarshipOpen] = useState(false)
  const heroSettings = {
    ...cms.settings,
    hero_image_url: resolveMediaUrl(cms.settings.hero_image_url, MEDIA.heroStudent),
    campus_image_url: resolveMediaUrl(cms.settings.campus_image_url, MEDIA.campusFacility),
    life_image_1_url: resolveMediaUrl(cms.settings.life_image_1_url, MEDIA.studentsCollab),
    life_image_2_url: resolveMediaUrl(cms.settings.life_image_2_url, MEDIA.studentsStudy),
  }
  const testimonials = cms.testimonialsStatus === "ok" ? cms.testimonials : DEMO_TESTIMONIALS
  const posts = cms.postsStatus === "ok" ? cms.posts : DEMO_POSTS

  return (
    <>
      <SiteHeader settings={cms.settings} overHero />
      <main>
        <HeroSection settings={heroSettings} onOpenScholarship={() => setScholarshipOpen(true)} />
        <AboutBenefits
          settings={cms.settings}
          counters={cms.counters}
          countersStatus={cms.countersStatus}
        />
        <ProgramsPreview settings={cms.settings} />
        <SubjectsGrid settings={cms.settings} />
        <PathwayPreview
          steps={cms.pathway}
          status={cms.pathwayStatus}
          campusUrl={String(heroSettings.campus_image_url)}
          settings={cms.settings}
        />
        <TrustMarquee partners={cms.partners} status={cms.partnersStatus} settings={cms.settings} />
        <TestimonialsSection items={testimonials} status="ok" settings={cms.settings} />
        <BlogTeaser items={posts} status="ok" settings={cms.settings} />
        <ApplyCta settings={cms.settings} />
      </main>
      <SiteFooter settings={cms.settings} />
      <ScholarshipModal open={scholarshipOpen} onClose={() => setScholarshipOpen(false)} />
    </>
  )
}
