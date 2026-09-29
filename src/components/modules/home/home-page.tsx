"use client"

import { useState } from "react"
import { Reveal } from "@/components/common/reveal"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { ApplyCta, PathwayPreview, ProgramsPreview, TuitionTeaser } from "@/components/modules/home/funnel-sections"
import { HeroSection } from "@/components/modules/home/hero-section"
import { PillarsBento } from "@/components/modules/home/pillars-bento"
import { ScholarshipModal } from "@/components/modules/home/scholarship-modal"
import { TrustMarquee } from "@/components/modules/home/trust-marquee"

export function HomePage() {
  const [scholarshipOpen, setScholarshipOpen] = useState(false)

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection onOpenScholarship={() => setScholarshipOpen(true)} />
        <TrustMarquee />
        <PillarsBento />
        <ProgramsPreview />
        <PathwayPreview />
        <TuitionTeaser />
        <div id="doi-song" className="mx-auto max-w-7xl px-4 py-20">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">Campus life</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-brand-navy">
              Đời sống sinh viên
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              [VMIT: nội dung đời sống SV — bổ sung khi có brief đầy đủ]
            </p>
          </Reveal>
        </div>
        <ApplyCta />
      </main>
      <SiteFooter />
      <ScholarshipModal open={scholarshipOpen} onClose={() => setScholarshipOpen(false)} />
    </>
  )
}
