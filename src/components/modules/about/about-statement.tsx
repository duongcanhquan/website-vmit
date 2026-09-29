"use client"

import { useMemo, useRef } from "react"
import Image from "next/image"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Quote } from "lucide-react"
import { Reveal } from "@/components/common/reveal"
import { ABOUT_MEDIA, ABOUT_STATEMENT, ABOUT_STATEMENT_NOTE } from "@/constants/about-content"
import { MEDIA } from "@/constants/media"
import { cn } from "@/lib/utils"
import { useT } from "./about-shared"

type Token = { text: string; highlight: boolean }

function tokenize(source: string): Token[] {
  return source
    .split(/(\[[^\]]+\])/)
    .filter(Boolean)
    .flatMap((part) => {
      const highlight = part.startsWith("[")
      return part
        .replace(/[[\]]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .map((text) => ({ text, highlight }))
    })
}

function Word({
  token,
  progress,
  range,
  reduce,
}: {
  token: Token
  progress: MotionValue<number>
  range: [number, number]
  reduce: boolean
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span
      style={reduce ? undefined : { opacity }}
      className={cn("mr-[0.28em] inline-block", token.highlight && "text-primary")}
    >
      {token.text}
    </motion.span>
  )
}

export function AboutStatement() {
  const t = useT()
  const reduce = Boolean(useReducedMotion())
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] })
  const statement = t(ABOUT_STATEMENT)
  const tokens = useMemo(() => tokenize(statement), [statement])

  return (
    <section id="dinh-vi" className="relative scroll-mt-20 overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[85%] gap-14 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Quote className="size-5" />
            {t({ vi: "Khẳng định định vị học thuật", en: "Academic positioning" })}
          </p>
          <p
            ref={ref}
            className="mt-8 text-[clamp(1.6rem,3.3vw,2.85rem)] font-bold leading-[1.28] tracking-tight text-brand-navy"
          >
            {tokens.map((token, i) => (
              <Word
                key={`${token.text}-${i}`}
                token={token}
                progress={scrollYProgress}
                range={[i / tokens.length, Math.min(1, (i + 2) / tokens.length)]}
                reduce={reduce}
              />
            ))}
          </p>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl border-l-4 border-primary pl-5 text-base leading-relaxed text-muted md:text-lg">
              {t(ABOUT_STATEMENT_NOTE)}
            </p>
          </Reveal>
        </div>

        <Reveal className="relative hidden lg:block" y={40}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] shadow-hairline">
            <Image
              src={ABOUT_MEDIA.dualDegree}
              alt={t({ vi: "Sinh viên nhận song bằng", en: "Graduate with two diplomas" })}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-10 w-40 overflow-hidden rounded-[6px] shadow-xl ring-4 ring-white">
            <div className="relative aspect-square">
              <Image src={MEDIA.seminar} alt="" fill sizes="160px" className="object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
