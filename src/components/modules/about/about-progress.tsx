"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ABOUT_SECTIONS } from "@/constants/about-content"
import { cn } from "@/lib/utils"
import { useT } from "./about-shared"

export function AboutProgress() {
  const t = useT()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = ABOUT_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const activeIndex = ABOUT_SECTIONS.findIndex((s) => s.id === active)

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary to-[#5fe0d4]"
        style={{ scaleX }}
      />
      <nav
        aria-label={t({ vi: "Các chặng hành trình", en: "Journey stages" })}
        className={cn(
          "fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block",
          activeIndex < 0 ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <ol className="relative flex flex-col gap-3.5">
          <span aria-hidden className="absolute bottom-2 right-[5px] top-2 w-px bg-brand-navy/15" />
          {ABOUT_SECTIONS.map((section, i) => {
            const isActive = section.id === active
            const passed = activeIndex >= 0 && i < activeIndex
            return (
              <li key={section.id} className="relative">
                <a
                  href={`#${section.id}`}
                  className="group flex items-center justify-end gap-3"
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "rounded-[3px] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all duration-300",
                      "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      isActive ? "bg-primary text-white 2xl:translate-x-0 2xl:opacity-100" : "bg-white text-brand-navy",
                    )}
                  >
                    {t(section.label)}
                  </span>
                  <span
                    className={cn(
                      "relative size-[11px] rounded-full border-2 transition-all duration-300",
                      isActive
                        ? "scale-125 border-primary bg-primary shadow-[0_0_0_4px_rgba(30,178,166,0.2)]"
                        : passed
                          ? "border-primary bg-white"
                          : "border-brand-navy/25 bg-white",
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
