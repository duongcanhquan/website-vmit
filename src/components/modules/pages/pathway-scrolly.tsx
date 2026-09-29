"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function useActiveStep(ids: readonly string[]) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement)
    if (nodes.length === 0) return

    const ratios = new Map<Element, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = -1
        let bestRatio = 0
        nodes.forEach((node, index) => {
          const ratio = ratios.get(node) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = index
          }
        })
        if (best >= 0) setActive(best)
      },
      {
        root: null,
        rootMargin: "-38% 0px -42% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function MetroBoard({
  active,
  nowAt,
  stations,
}: {
  active: number
  nowAt: string
  stations: { code: string; title: string; subtitle: string }[]
}) {
  const count = stations.length
  const current = stations[active]
  const progress = count > 1 ? active / (count - 1) : 1

  return (
    <div className="flex h-full flex-col justify-center" aria-hidden="true">
      <div className="rounded-xl border border-border bg-surface p-6 shadow-hairline md:p-8">
        <p className="overline">Subway to the World</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {nowAt} · {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <p className="mt-2 font-display text-3xl text-brand-navy">{current?.title}</p>
        <p className="mt-1 text-sm text-muted">{current?.subtitle}</p>

        <div className="relative mt-8">
          <div className="absolute bottom-3 left-[7px] top-3 w-px bg-border" />
          <div
            className="absolute left-[7px] top-3 w-px origin-top bg-primary motion-safe:transition-transform motion-safe:duration-300"
            style={{ height: "calc(100% - 1.5rem)", transform: `scaleY(${progress})` }}
          />
          <ol className="relative space-y-5">
            {stations.map((station, index) => {
              const reached = index <= active
              const here = index === active
              return (
                <li key={station.code + station.title} className="flex items-center gap-4">
                  <span
                    className={cn(
                      "relative z-10 size-[15px] shrink-0 rounded-full border-2 motion-safe:transition-shadow motion-safe:duration-300",
                      reached ? "border-primary bg-primary" : "border-border bg-surface",
                      here && "ring-4 ring-primary/25",
                    )}
                  />
                  <span className={cn("text-sm", here ? "font-semibold text-brand-navy" : "text-muted")}>
                    <span className="mr-2 font-semibold uppercase tracking-[0.08em]">{station.code}</span>
                    {station.title}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

export function RouteBoard({
  active,
  routes,
}: {
  active: number
  routes: { name: string; epithet: string }[]
}) {
  const current = routes[active]

  return (
    <div className="flex h-full flex-col justify-center" aria-hidden="true">
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
        <div className="h-1.5 bg-primary" />
        <div className="p-6 md:p-8">
          <p className="overline">Interchange · 20</p>
          <p className="mt-6 font-display text-3xl text-brand-navy">{current?.name}</p>
          <p className="mt-1 text-sm text-muted">{current?.epithet}</p>
          <div className="mt-8 grid grid-cols-4 gap-3">
            {routes.map((route, index) => {
              const here = index === active
              return (
                <div key={route.epithet} className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      "h-14 w-1 rounded-full motion-safe:transition-colors motion-safe:duration-300",
                      here ? "bg-primary" : "bg-border",
                    )}
                  />
                  <span
                    className={cn(
                      "text-center text-[11px] font-semibold leading-tight",
                      here ? "text-brand-navy" : "text-muted",
                    )}
                  >
                    {route.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
