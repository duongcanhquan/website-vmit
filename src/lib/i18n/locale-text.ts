import type { Locale } from "@/lib/i18n/types"

export function pickLocale<T extends Record<string, unknown>>(
  row: T,
  locale: Locale,
  base: string,
): string {
  const key = `${base}_${locale}` as keyof T
  const fallback = `${base}_vi` as keyof T
  const value = row[key] ?? row[fallback]
  return typeof value === "string" ? value : ""
}

export function settingText(value: unknown, locale: Locale = "vi"): string {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>
    const localized = obj[locale] ?? obj.vi ?? obj.en
    if (typeof localized === "string") return localized
    if (typeof localized === "number" || typeof localized === "boolean") return String(localized)
  }
  return ""
}
