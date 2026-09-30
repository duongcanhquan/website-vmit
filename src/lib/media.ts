import { settingText } from "@/lib/i18n/locale-text"

/** next/image only optimises local files and the R2 hosts listed in next.config. */
export function canOptimizeImage(src: string): boolean {
  if (src.startsWith("/")) return true
  try {
    const host = new URL(src).hostname
    return host.endsWith(".r2.cloudflarestorage.com") || host.endsWith(".r2.dev")
  } catch {
    return false
  }
}

/** Resolve CMS media URL with local banner fallbacks (legacy paths remapped). */
export function resolveMediaUrl(value: unknown, fallback: string): string {
  const raw = typeof value === "string" ? value : settingText(value, "vi")
  const cleaned = raw.replaceAll('"', "").trim()
  if (cleaned === "/media/banners/hero-vmit-student.jpg") {
    return "/media/banners/hero-vmit-student.webp"
  }
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
