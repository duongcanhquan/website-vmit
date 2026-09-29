import HomePage from "@/components/modules/home/home-page"
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

export const revalidate = 120

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

  return (
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
  )
}
