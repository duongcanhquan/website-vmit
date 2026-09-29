"use client"

import { settingText } from "@/lib/i18n/locale-text"
import { cn } from "@/lib/utils"

type SocialLinksProps = {
  settings?: Record<string, unknown>
  className?: string
  linkClassName?: string
}

function readUrl(value: unknown): string {
  if (typeof value === "string") return value.replaceAll('"', "").trim()
  return settingText(value, "vi").replaceAll('"', "").trim()
}

export function SocialLinks({ settings = {}, className, linkClassName }: SocialLinksProps) {
  const facebook = readUrl(settings.social_facebook)
  const tiktok = readUrl(settings.social_tiktok)
  const items = [
    facebook ? { label: "Facebook", href: facebook } : null,
    tiktok ? { label: "TikTok", href: tiktok } : null,
  ].filter((item): item is { label: string; href: string } => Boolean(item))

  if (!items.length) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm font-semibold underline-offset-4 transition hover:underline",
            linkClassName,
          )}
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}
