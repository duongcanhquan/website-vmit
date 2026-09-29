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
      <main className="bg-[image:var(--gradient-section)] pt-28">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-display text-4xl font-bold text-brand-navy">{title}</h1>
          <p className="mt-4 text-lg text-muted">{lead}</p>
          {bullets.length > 0 ? (
            <ul className="mt-8 list-disc space-y-2 pl-5 text-brand-navy/90">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <Link href={ROUTES.apply} className={cn(buttonVariants({ size: "lg" }), "mt-10")}>
            Xét tuyển 2026
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

export default SimplePage
