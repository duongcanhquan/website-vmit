import { programStory } from "@/components/modules/pages/program-story-data"
import { MEDIA } from "@/constants/media"
import { settingText } from "@/lib/i18n/locale-text"
import { messages } from "@/lib/i18n/messages"
import type { Locale } from "@/lib/i18n/types"
import { resolveMediaUrl } from "@/lib/media"

export type Pair = { vi: string; en: string }

export type HomeTextField = { key: string; label: string; kind: "text" | "multiline"; fallback: Pair }
export type HomeImageField = { key: string; label: string; kind: "image"; fallback: string }
export type HomeField = HomeTextField | HomeImageField

export type HomeSection = {
  id: string
  title: string
  hint?: string
  fields: HomeField[]
  cards?: "benefits" | "programs" | "subjects"
  links?: { href: string; label: string }[]
}

export type BenefitCard = { title: Pair; desc: Pair }
export type ProgramCard = { name: Pair; promise: Pair; salary: Pair; image: string }
export type SubjectCard = { title: Pair; unit: string; image: string }
export type SubjectRow = { track: string; label: Pair; items: SubjectCard[] }

const vi = messages.vi
const en = messages.en
const pair = (viText: string, enText: string): Pair => ({ vi: viText, en: enText })

export const DEFAULT_BENEFITS: BenefitCard[] = [
  {
    title: pair("Chương trình thực hành", "Practice-led programmes"),
    desc: pair(
      "BTEC Data Analytics & Business Management theo chuẩn Pearson HND — học làm thật trên dự án.",
      "BTEC Data Analytics & Business Management to Pearson HND standards — learn by doing.",
    ),
  },
  {
    title: pair("Song bằng danh giá", "A prestigious dual award"),
    desc: pair(
      "Pearson BTEC HND Level 5 (UK) kết hợp bằng Cao đẳng chính quy trong một lộ trình.",
      "A Pearson BTEC HND Level 5 (UK) plus a formal college diploma, in one pathway.",
    ),
  },
  {
    title: pair("Chuyên gia & đối tác", "Experts & partners"),
    desc: pair(
      "Hệ thống giảng viên và mạng lưới doanh nghiệp FDI đồng hành từ đào tạo tới việc làm.",
      "Our faculty and FDI employer network support you from training through to employment.",
    ),
  },
]

export function defaultPrograms(): ProgramCard[] {
  const viTracks = programStory("vi").tracks
  const enTracks = programStory("en").tracks
  return viTracks.map((track, i) => ({
    name: pair(track.name, enTracks[i]?.name ?? track.name),
    promise: pair(track.promise, enTracks[i]?.promise ?? ""),
    salary: pair(track.salary, enTracks[i]?.salary ?? ""),
    image: track.image,
  }))
}

const subject = (viTitle: string, enTitle: string, unit: string, image: string): SubjectCard => ({
  title: pair(viTitle, enTitle),
  unit,
  image,
})

/** Unit numbers follow the Pearson BTEC HN Computing (2022) and HN Business (2021) specifications. */
export const DEFAULT_SUBJECT_ROWS: SubjectRow[] = [
  {
    track: "data-analytics",
    label: pair("Phân tích dữ liệu", "Data Analytics"),
    items: [
      subject("Phân tích dữ liệu nền tảng", "Data Analytics", "F/618/7415 · Level 4", "/media/subjects/eda.jpg"),
      subject("Lập trình nâng cao", "Advanced Programming", "H/618/5723 · Level 5", "/media/subjects/python.jpg"),
      subject("Học máy", "Machine Learning", "H/618/7438 · Level 5", "/media/subjects/ml.jpg"),
      subject("Dữ liệu lớn & trực quan hóa", "Big Data Analytics & Visualisation", "F/618/5664 · Level 5", "/media/subjects/bi-dashboard.jpg"),
      subject("Thiết kế & phát triển CSDL", "Database Design & Development", "A/618/7400 · Level 4", "/media/subjects/sql.jpg"),
      subject("Mô hình phân tích ứng dụng", "Applied Analytical Models", "L/618/7448 · Level 5", "/media/subjects/cloud.jpg"),
    ],
  },
  {
    track: "business-management",
    label: pair("Quản trị", "Business Management"),
    items: [
      subject("Chiến lược kinh doanh", "Business Strategy", "T/618/5080 · Level 5", "/media/subjects/strategy.jpg"),
      subject("Vận hành & chuỗi cung ứng", "Operations & Supply Chain", "F/618/5096 · Level 5", "/media/subjects/supply-chain.jpg"),
      subject("Phát triển tổ chức", "Developing Teams & Organisations", "M/618/5098 · Level 5", "/media/subjects/business-canvas.jpg"),
      subject("Hành vi tổ chức", "Organisational Behaviour", "R/650/2920 · Level 5", "/media/subjects/marketing.jpg"),
      subject("Dẫn dắt sự thay đổi", "Understanding & Leading Change", "T/650/2921 · Level 5", "/media/subjects/pitching.jpg"),
      subject("Môi trường kinh doanh toàn cầu", "Global Business Environment", "M/618/5076 · Level 5", "/media/subjects/ecommerce.jpg"),
    ],
  },
]

const storyVi = programStory("vi")
const storyEn = programStory("en")

/** Homepage blocks in page order. Keys live in site_settings. */
export const HOME_SECTIONS: HomeSection[] = [
  {
    id: "hero",
    title: "Banner đầu trang",
    hint: "Chữ, 3 nút và ảnh nền của banner.",
    fields: [],
    links: [{ href: "/admin/cai-dat", label: "Sửa banner tại Cài đặt & banner" }],
  },
  {
    id: "benefits",
    title: "Lợi ích học tập",
    fields: [
      { key: "home_benefits_eyebrow", label: "Dòng nhỏ phía trên", kind: "text", fallback: pair("CHƯƠNG TRÌNH HỌC THỰC HÀNH", "PRACTICE-BASED LEARNING PROGRAMME") },
      {
        key: "home_benefits_title",
        label: "Tiêu đề",
        kind: "text",
        fallback: pair("CÁC LỢI ÍCH KHI HỌC TẠI VIỆT MỸ", "BENEFITS OF STUDYING AT VIET MY"),
      },
      { key: "home_benefits_image", label: "Ảnh bên trái", kind: "image", fallback: MEDIA.aboutStudent },
    ],
    cards: "benefits",
  },
  {
    id: "counters",
    title: "Dải số liệu",
    hint: "Các con số (2 bằng, 70%…) sửa ở mục Trụ đột phá & số liệu.",
    fields: [{ key: "home_counters_image", label: "Ảnh nền dải số liệu", kind: "image", fallback: MEDIA.heroCampusUk }],
    links: [{ href: "/admin/tru-cot", label: "Sửa các con số" }],
  },
  {
    id: "programs",
    title: "Ngành học",
    fields: [
      {
        key: "home_programs_title",
        label: "Tiêu đề (xuống dòng = Enter)",
        kind: "multiline",
        fallback: pair(storyVi.heroTitle, storyEn.heroTitle),
      },
      { key: "home_programs_lead", label: "Đoạn mô tả (để trống thì ẩn)", kind: "multiline", fallback: pair(storyVi.heroLead, storyEn.heroLead) },
      { key: "home_programs_card_cta", label: "Chữ link trên mỗi thẻ", kind: "text", fallback: pair(vi.programs.view, en.programs.view) },
      { key: "home_programs_cta", label: "Nút cuối khối", kind: "text", fallback: pair("Xem đủ sáu học kỳ", "See all six terms") },
    ],
    cards: "programs",
  },
  {
    id: "subjects",
    title: "Môn học",
    fields: [
      { key: "home_subjects_eyebrow", label: "Dòng nhỏ phía trên", kind: "text", fallback: pair("Môn học", "Subjects") },
      {
        key: "home_subjects_title",
        label: "Tiêu đề",
        kind: "text",
        fallback: pair("Các môn trong chương trình", "Programme subjects"),
      },
      { key: "home_subjects_cta", label: "Chữ link cuối mỗi dòng", kind: "text", fallback: pair("Xem đủ môn", "View all subjects") },
    ],
    hint: "Hai dòng cố định: dòng 1 Phân tích dữ liệu, dòng 2 Quản trị kinh doanh, mỗi dòng 6 môn.",
    cards: "subjects",
  },
  {
    id: "pathway",
    title: "Lộ trình",
    fields: [
      { key: "home_pathway_eyebrow", label: "Dòng nhỏ phía trên", kind: "text", fallback: pair(vi.pathway.eyebrow, en.pathway.eyebrow) },
      { key: "home_pathway_title", label: "Tiêu đề", kind: "text", fallback: pair(vi.pathway.title, en.pathway.title) },
      { key: "home_pathway_lead", label: "Đoạn mô tả", kind: "multiline", fallback: pair(vi.pathway.lead, en.pathway.lead) },
      { key: "home_pathway_cta", label: "Nút", kind: "text", fallback: pair(vi.pathway.cta, en.pathway.cta) },
      {
        key: "campus_image_url",
        label: "Ảnh khuôn viên (dùng chung trang Lộ trình và Hệ thống BTEC)",
        kind: "image",
        fallback: MEDIA.campusFacility,
      },
    ],
    links: [{ href: "/admin/lo-trinh", label: "Sửa các bước lộ trình" }],
  },
  {
    id: "partners",
    title: "Đối tác",
    fields: [{ key: "home_partners_label", label: "Tiêu đề dải đối tác", kind: "text", fallback: pair(vi.trust.label, en.trust.label) }],
    links: [{ href: "/admin/doi-tac", label: "Sửa danh sách đối tác" }],
  },
  {
    id: "testimonials",
    title: "Đánh giá học viên",
    fields: [
      { key: "home_testimonials_eyebrow", label: "Dòng nhỏ phía trên", kind: "text", fallback: pair("Đánh giá", "Testimonials") },
      {
        key: "home_testimonials_title",
        label: "Tiêu đề",
        kind: "text",
        fallback: pair("Học viên nói gì về VMIT", "What our students say"),
      },
      { key: "home_testimonials_image", label: "Ảnh nền", kind: "image", fallback: MEDIA.lectureHall },
    ],
    links: [{ href: "/admin/danh-gia", label: "Sửa các đánh giá" }],
  },
  {
    id: "blog",
    title: "Tin tức",
    fields: [
      { key: "home_blog_eyebrow", label: "Dòng nhỏ phía trên", kind: "text", fallback: pair("Tin tức", "News") },
      { key: "home_blog_title", label: "Tiêu đề", kind: "text", fallback: pair("Mới từ VMIT", "Latest from VMIT") },
      { key: "home_blog_cta", label: "Nút", kind: "text", fallback: pair("Xem tin tức", "View all news") },
    ],
    links: [{ href: "/admin/bai-viet", label: "Viết và sửa bài" }],
  },
  {
    id: "apply",
    title: "Kêu gọi xét tuyển",
    fields: [
      { key: "home_apply_eyebrow", label: "Dòng nhỏ phía trên", kind: "text", fallback: pair(vi.apply.eyebrow, en.apply.eyebrow) },
      {
        key: "home_apply_title",
        label: "Tiêu đề",
        kind: "text",
        fallback: pair("Bắt đầu hành trình khám phá ngay bây giờ.", "Start your journey of discovery now."),
      },
      { key: "home_apply_lead", label: "Đoạn mô tả", kind: "multiline", fallback: pair("", "") },
      { key: "home_apply_cta", label: "Nút", kind: "text", fallback: pair(vi.apply.cta, en.apply.cta) },
    ],
  },
  {
    id: "footer",
    title: "Chân trang",
    hint: "Hotline, email, địa chỉ, slogan, Facebook/TikTok.",
    fields: [],
    links: [{ href: "/admin/cai-dat", label: "Sửa tại Cài đặt & banner" }],
  },
]

const FIELDS = new Map<string, HomeField>(HOME_SECTIONS.flatMap((s) => s.fields.map((f) => [f.key, f] as const)))

export function homeText(settings: Record<string, unknown>, key: string, locale: Locale): string {
  const saved = settingText(settings[key], locale).trim()
  if (saved) return saved
  const field = FIELDS.get(key)
  return field && field.kind !== "image" ? field.fallback[locale] : ""
}

export function homeImage(settings: Record<string, unknown>, key: string): string {
  const field = FIELDS.get(key)
  return resolveMediaUrl(settings[key], field?.kind === "image" ? field.fallback : "")
}

function readPair(raw: unknown, fallback: Pair): Pair {
  if (!raw || typeof raw !== "object") return fallback
  const o = raw as Record<string, unknown>
  return {
    vi: typeof o.vi === "string" && o.vi.trim() ? o.vi : fallback.vi,
    en: typeof o.en === "string" && o.en.trim() ? o.en : fallback.en,
  }
}

export function readBenefits(raw: unknown): BenefitCard[] {
  const list = Array.isArray(raw) ? raw : []
  return DEFAULT_BENEFITS.map((base, i) => {
    const item = (list[i] ?? {}) as Record<string, unknown>
    return { title: readPair(item.title, base.title), desc: readPair(item.desc, base.desc) }
  })
}

export function readSubjectRows(raw: unknown): SubjectRow[] {
  const rows = Array.isArray(raw) ? raw : []
  return DEFAULT_SUBJECT_ROWS.map((base, r) => {
    const row = (rows[r] ?? {}) as Record<string, unknown>
    const items = Array.isArray(row.items) ? row.items : []
    return {
      track: base.track,
      label: readPair(row.label, base.label),
      items: base.items.map((card, i) => {
        const item = (items[i] ?? {}) as Record<string, unknown>
        return {
          title: readPair(item.title, card.title),
          unit: typeof item.unit === "string" && item.unit.trim() ? item.unit : card.unit,
          image: resolveMediaUrl(item.image, card.image),
        }
      }),
    }
  })
}

export function readPrograms(raw: unknown): ProgramCard[] {
  const list = Array.isArray(raw) ? raw : []
  return defaultPrograms().map((base, i) => {
    const item = (list[i] ?? {}) as Record<string, unknown>
    return {
      name: readPair(item.name, base.name),
      promise: readPair(item.promise, base.promise),
      salary: readPair(item.salary, base.salary),
      image: resolveMediaUrl(item.image, base.image),
    }
  })
}
