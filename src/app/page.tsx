import type { Metadata } from "next"
import HomePage from "@/components/modules/home/home-page"
import { JsonLd } from "@/components/common/json-ld"
import {
  getPublishedCounters,
  getPublishedCourses,
  getPublishedGallery,
  getPublishedPartners,
  getPublishedPathway,
  getPublishedPillars,
  getPublishedPosts,
  getPublishedPricing,
  getPublishedSubjects,
  getPublishedTestimonials,
  getSettingsMap,
} from "@/services/cms"
import { settingText } from "@/lib/i18n/locale-text"
import { DEFAULT_SEO, buildPageMetadata, loadSeoContext, organizationJsonLd } from "@/lib/seo"

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await loadSeoContext()
  const title = settingText(settings.seo_title, "vi") || DEFAULT_SEO.titleVi
  const description = settingText(settings.seo_description, "vi") || DEFAULT_SEO.descriptionVi
  const meta = await buildPageMetadata({
    title,
    description,
    path: "/",
    image: typeof settings.seo_og_image === "string" ? settings.seo_og_image : null,
  })
  return { ...meta, title: { absolute: title } }
}

export default async function Page() {
  const [
    settings,
    courses,
    partners,
    pillars,
    counters,
    pathway,
    pricing,
    gallery,
    testimonials,
    posts,
    subjects,
  ] = await Promise.all([
    getSettingsMap(),
    getPublishedCourses(),
    getPublishedPartners(),
    getPublishedPillars(),
    getPublishedCounters(),
    getPublishedPathway(),
    getPublishedPricing(),
    getPublishedGallery(),
    getPublishedTestimonials(),
    getPublishedPosts(),
    getPublishedSubjects(),
  ])

  const description = settingText(settings.data.seo_description, "vi") || DEFAULT_SEO.descriptionVi
  const { origin } = await loadSeoContext()

  return (
    <>
      <JsonLd data={organizationJsonLd(origin, description)} />
      <HomePage
      cms={{
        settings: settings.data,
        settingsStatus: settings.status,
        settingsError: settings.status === "error" ? settings.message : null,
        courses: courses.data,
        coursesStatus: courses.status,
        partners: partners.data,
        partnersStatus: partners.status,
        pillars: pillars.data,
        pillarsStatus: pillars.status,
        counters: counters.data,
        countersStatus: counters.status,
        pathway: pathway.data,
        pathwayStatus: pathway.status,
        pricing: pricing.data,
        pricingStatus: pricing.status,
        gallery: gallery.data,
        galleryStatus: gallery.status,
        testimonials: testimonials.data,
        testimonialsStatus: testimonials.status,
        posts: posts.data,
        postsStatus: posts.status,
        subjects: subjects.data,
        subjectsStatus: subjects.status,
      }}
    />
    </>
  )
}
