export type CmsStatus = "ok" | "empty" | "error"

export type NewsPost = HomeCmsProps["posts"][number]

export type HomeCmsProps = {
  settings: Record<string, unknown>
  settingsStatus: CmsStatus
  settingsError: string | null
  courses: Array<{
    id: string
    slug: string
    title_vi: string
    title_en: string
    summary_vi: string
    summary_en: string
    cover_url: string | null
    sort_order: number
  }>
  coursesStatus: CmsStatus
  partners: Array<{ id: string; name: string; logo_url: string | null; sort_order: number }>
  partnersStatus: CmsStatus
  pillars: Array<Record<string, unknown>>
  pillarsStatus: CmsStatus
  counters: Array<{
    id: string
    value_text: string
    label_vi: string
    label_en: string
    sort_order: number
  }>
  countersStatus: CmsStatus
  pathway: Array<{
    id: string
    step_code: string
    title_vi: string
    title_en: string
    note_vi: string
    note_en: string
    sort_order: number
  }>
  pathwayStatus: CmsStatus
  pricing: Array<Record<string, unknown>>
  pricingStatus: CmsStatus
  gallery: Array<{
    id: string
    url: string
    alt_vi: string
    alt_en: string
    caption_vi: string
    caption_en: string
    kind: string
    sort_order: number
    is_featured: boolean
  }>
  galleryStatus: CmsStatus
  testimonials: Array<{
    id: string
    author_name: string
    author_role_vi?: string | null
    author_role_en?: string | null
    quote_vi: string
    quote_en: string
    avatar_url?: string | null
  }>
  testimonialsStatus: CmsStatus
  posts: Array<{
    id: string
    title_vi: string
    title_en: string
    excerpt_vi?: string | null
    excerpt_en?: string | null
    cover_url?: string | null
    slug?: string | null
    author_name?: string | null
    published_at?: string | null
    body_vi?: string | null
    body_en?: string | null
  }>
  postsStatus: CmsStatus
  subjects: Array<{
    id: string
    title_vi: string
    title_en: string
    count_label_vi: string
    count_label_en: string
    icon_url: string | null
    hover_icon_url: string | null
    icon_key?: string | null
  }>
  subjectsStatus: CmsStatus
}
