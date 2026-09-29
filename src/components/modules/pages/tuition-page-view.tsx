"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HoverLift, Reveal } from "@/components/common/reveal"
import { ContentState, PageShell } from "@/components/common/page-shell"
import { useLocale } from "@/components/providers/locale-provider"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/constants/site"
import { pickLocale } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"
import type { CmsStatus } from "@/types/home-cms"

export function TuitionPageView({
  settings,
  plans,
  status,
  heroImage,
}: {
  settings: Record<string, unknown>
  plans: Array<Record<string, unknown>>
  status: CmsStatus
  heroImage: string
}) {
  const { locale, t } = useLocale()

  return (
    <PageShell
      settings={settings}
      eyebrowVi="Học phí & học bổng"
      eyebrowEn="Fees & scholarships"
      titleVi="Vốn nhẹ – Bước xa"
      titleEn="Light investment · Far reach"
      leadVi="Minh bạch chi phí và quỹ học bổng nhân tài."
      leadEn="Transparent fees and a talent scholarship fund."
      imageUrl={heroImage}
      imageAltVi="Không gian học tập VMIT"
      imageAltEn="VMIT learning spaces"
    >
      <ContentState
        status={status}
        emptyVi="Chưa có gói học phí trong CMS. Thêm tại Admin → Học phí."
        emptyEn="No fee plans in CMS yet. Add them in Admin → Fees."
      />
      {status === "ok" ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => {
            const id = String(plan.id ?? index)
            const name = pickLocale(plan, locale, "name") || (locale === "vi" ? "Gói học phí" : "Fee plan")
            const description = pickLocale(plan, locale, "description")
            const period = pickLocale(plan, locale, "period_label")
            const amount =
              typeof plan.price_amount === "number"
                ? plan.price_amount
                : typeof plan.price_amount === "string"
                  ? Number(plan.price_amount)
                  : NaN
            const currency = typeof plan.currency === "string" ? plan.currency : "VND"
            const priceLabel = Number.isFinite(amount)
              ? `${new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US").format(amount)} ${currency}${period ? ` ${period}` : ""}`
              : ""
            const featured = Boolean(plan.is_featured)
            return (
              <Reveal key={id} delay={0.06 * index}>
                <HoverLift className="h-full">
                  <article
                    className={cn(
                      "flex h-full flex-col rounded-xl border p-6 shadow-hairline md:p-7",
                      featured
                        ? "border-accent-gold/40 bg-brand-navy text-white"
                        : "border-border bg-surface text-brand-navy",
                    )}
                  >
                    <p className={cn("overline", featured ? "text-accent-gold/90" : "text-accent-cobalt")}>
                      {featured ? (locale === "vi" ? "Nổi bật" : "Featured") : `0${index + 1}`}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-medium">{name}</h2>
                    {priceLabel ? (
                      <p
                        className={cn(
                          "mt-4 font-display text-2xl font-medium md:text-3xl",
                          featured ? "text-accent-gold" : "text-brand-navy",
                        )}
                      >
                        {priceLabel}
                      </p>
                    ) : null}
                    {description ? (
                      <p
                        className={cn(
                          "mt-3 flex-1 text-sm leading-relaxed",
                          featured ? "text-white/75" : "text-muted",
                        )}
                      >
                        {description}
                      </p>
                    ) : null}
                    <Link
                      href={ROUTES.apply}
                      className={cn(
                        buttonVariants({ variant: featured ? "primary" : "outlineNavy", size: "sm" }),
                        "mt-6 w-fit",
                      )}
                    >
                      {t.nav.apply}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </article>
                </HoverLift>
              </Reveal>
            )
          })}
        </div>
      ) : null}
    </PageShell>
  )
}
