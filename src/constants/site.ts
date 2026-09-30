export const SITE = {
  name: "VMIT",
  brandTagline: "Journey to world excellence",
  heroHeadline: "Cử nhân thực hành Anh Quốc",
  accreditationBadge: "PEARSON APPROVED CENTRE",
  hotlineDisplay: "0999999999",
  hotlineHref: "tel:0999999999",
  admissionYear: "2026",
  campusAddress: "168 Trịnh Văn Bô, Xuân Phương, Hà Nội",
} as const

/** Older saved settings hold the misspelt "PERSON APPROVED CENTER"; show Pearson's official wording instead. */
export function accreditationBadgeText(value: string) {
  const text = value.trim()
  if (!text || /^pe?rson approved cent(er|re)$/i.test(text)) return SITE.accreditationBadge
  return text
}

export const ROUTES = {
  home: "/",
  about: "/about",
  programs: "/programs",
  pathway: "/pathway",
  tuition: "/tuition",
  apply: "/apply",
  news: "/news",
  subjects: "/#subjects",
  btecSchools: "/btec-schools",
  studentLife: "/#student-life",
  englishTest: "/english-test",
} as const

export const TRUST_PARTNERS = [
  "Pearson Education UK",
  "Bộ LĐ-TB&XH",
  "EQuest Group",
  "Keiser University (USA)",
  "FPT Software",
  "Viettel",
  "Samsung",
  "CMC",
] as const
