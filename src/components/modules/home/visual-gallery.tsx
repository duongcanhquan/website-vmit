"use client"

import { MotionImage } from "@/components/common/motion-image"
import { HoverLift, Reveal } from "@/components/common/reveal"
import { useLocale } from "@/components/providers/locale-provider"
import { CAMPUS_BANNERS, type BannerItem } from "@/constants/media"
import { settingText } from "@/lib/i18n/locale-text"
import type { CmsStatus } from "@/types/home-cms"
import type { GalleryAsset } from "@/services/cms"

type VisualGalleryProps = {
  items: GalleryAsset[]
  status: CmsStatus
  settings: Record<string, unknown>
}

function toBanner(item: GalleryAsset): BannerItem {
  return {
    src: item.url,
    altVi: item.alt_vi || item.caption_vi || "Hình ảnh campus VMIT",
    altEn: item.alt_en || item.caption_en || "VMIT campus image",
    captionVi: item.caption_vi || item.alt_vi || "Campus",
    captionEn: item.caption_en || item.alt_en || "Campus",
  }
}

function resolveBanners(items: GalleryAsset[], status: CmsStatus): BannerItem[] {
  if (status === "ok" && items.length > 0) {
    const featured = items.filter((i) => i.is_featured)
    const rest = items.filter((i) => !i.is_featured)
    return [...featured, ...rest].map(toBanner)
  }
  return [...CAMPUS_BANNERS]
}

export function VisualGallery({ items, status, settings }: VisualGalleryProps) {
  const { locale } = useLocale()
  const banners = resolveBanners(items, status)
  const featured = banners[0]
  const secondary = banners.slice(1, 5)
  const strip = banners.slice(5)

  const eyebrow =
    settingText(settings.gallery_eyebrow, locale) ||
    (locale === "vi" ? "Hình ảnh campus" : "Campus gallery")
  const title =
    settingText(settings.gallery_title, locale) ||
    (locale === "vi" ? "Một ngày tại VMIT" : "A day at VMIT")
  const lead =
    settingText(settings.gallery_lead, locale) ||
    (locale === "vi"
      ? "Lớp học, thư viện, lab, khuôn viên — để ảnh kể chuyện."
      : "Classrooms, library, labs and campus — let the photos tell the story.")

  if (!featured) {
    return (
      <section className="bg-mist py-20 md:py-24" aria-label={locale === "vi" ? "Hình ảnh campus" : "Campus gallery"}>
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-sm text-muted">
            {status === "error"
              ? locale === "vi"
                ? "Không tải được thư viện ảnh."
                : "The gallery could not be loaded."
              : locale === "vi"
                ? "Chưa có ảnh trong thư viện."
                : "No gallery images yet."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-mist py-20 md:py-24" aria-label={locale === "vi" ? "Hình ảnh campus" : "Campus gallery"}>
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="overline text-accent-cobalt">{eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,3.5vw,2.85rem)] font-medium tracking-[-0.02em] text-brand-navy">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted">{lead}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <HoverLift>
              <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
                <MotionImage
                  src={featured.src}
                  alt={locale === "vi" ? featured.altVi : featured.altEn}
                  fill
                  sizes="(max-width:1024px) 100vw, 60vw"
                  frameClassName="relative aspect-[16/10] w-full"
                />
                <figcaption className="border-t border-border px-4 py-3 text-sm font-medium text-brand-slate/80">
                  {locale === "vi" ? featured.captionVi : featured.captionEn}
                </figcaption>
              </figure>
            </HoverLift>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {secondary.slice(0, 2).map((item, i) => (
              <Reveal key={`${item.src}-${i}`} delay={0.06 * (i + 1)}>
                <HoverLift>
                  <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
                    <MotionImage
                      src={item.src}
                      alt={locale === "vi" ? item.altVi : item.altEn}
                      fill
                      sizes="(max-width:1024px) 50vw, 35vw"
                      frameClassName="relative aspect-[16/10] w-full lg:aspect-[16/9]"
                    />
                    <figcaption className="border-t border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted">
                      {locale === "vi" ? item.captionVi : item.captionEn}
                    </figcaption>
                  </figure>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...secondary.slice(2), ...strip].slice(0, 4).map((item, i) => (
            <Reveal key={`${item.src}-grid-${i}`} delay={0.05 * i}>
              <HoverLift>
                <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-hairline">
                  <MotionImage
                    src={item.src}
                    alt={locale === "vi" ? item.altVi : item.altEn}
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    frameClassName="relative aspect-[4/3] w-full"
                    zoom={1.08}
                  />
                  <figcaption className="border-t border-border px-3 py-2.5 text-xs font-medium text-muted">
                    {locale === "vi" ? item.captionVi : item.captionEn}
                  </figcaption>
                </figure>
              </HoverLift>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
