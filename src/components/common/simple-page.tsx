import Link from "next/link"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/constants/site"
import { cn } from "@/lib/utils"

type SimplePageProps = {
  title: string
  lead: string
  bullets?: readonly string[]
}

function SimplePage({ title, lead, bullets = [] }: SimplePageProps) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[image:var(--gradient-section)] pt-32">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">VMIT</p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] text-brand-navy">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">{lead}</p>
          {bullets.length > 0 ? (
            <ul className="mt-10 space-y-3 border-l-2 border-brand-red/70 pl-5 text-brand-navy/90">
              {bullets.map((item) => (
                <li key={item} className="text-base leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          <Link href={ROUTES.apply} className={cn(buttonVariants({ size: "xl" }), "mt-12")}>
            Xét tuyển 2026
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

export default SimplePage
