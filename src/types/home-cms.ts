export type CmsStatus = "ok" | "empty" | "error"

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
}
