type Pair = { vi: string; en: string }

export const HERO_HEADLINE: Pair = {
  vi: "CHƯƠNG\u00A0TRÌNH CỬ\u00A0NHÂN ANH\u00A0QUỐC",
  en: "UK BACHELOR'S DEGREE\u00A0PROGRAMME",
}

export const HERO_SUPPORT: Pair = {
  vi: "Lộ trình tới TOP 1% đại học Quốc\u00A0tế.",
  en: "Your pathway to the TOP 1% of international\u00A0universities.",
}

/** Earlier defaults still saved in site_settings; they are replaced by the current copy. */
const LEGACY = {
  headline: [
    "Học mọi thứ",
    "Learn anything",
    "CỬ NHÂN THỰC HÀNH ANH QUỐC",
    "UK PRACTICE-BASED BACHELOR",
    "UK PRACTICE-BASED BACHELOR'S DEGREE",
  ],
  support: [
    "Cử nhân thực hành Anh Quốc ngay tại Việt Nam.",
    "A UK practice-based bachelor pathway in Vietnam.",
    "Chương trình học từ Anh với lộ trình học đa dạng và thực tiễn.",
    "UK-designed programmes with diverse, practical learning pathways.",
    "UK programmes with diverse, practical learning pathways.",
  ],
}

const normalize = (value: string) => value.replaceAll("\u00A0", " ").trim().toLowerCase()

export function heroText(kind: keyof typeof LEGACY, value: string, locale: keyof Pair): string {
  const current = kind === "headline" ? HERO_HEADLINE : HERO_SUPPORT
  const text = normalize(value)
  if (!text || LEGACY[kind].some((old) => normalize(old) === text)) return current[locale]
  return value
}
