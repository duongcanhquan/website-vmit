import { settingText } from "@/lib/i18n/locale-text"

/** Resolve CMS media URL with local banner fallbacks (legacy paths remapped). */
export function resolveMediaUrl(value: unknown, fallback: string): string {
  const raw = typeof value === "string" ? value : settingText(value, "vi")
  const cleaned = raw.replaceAll('"', "").trim()
  if (
    !cleaned ||
    cleaned.startsWith("/media/hero-campus") ||
    cleaned.startsWith("/media/students-") ||
    cleaned.startsWith("/media/campus-facility")
  ) {
    return fallback
  }
  return cleaned
}
