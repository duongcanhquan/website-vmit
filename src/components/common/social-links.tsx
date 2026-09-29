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

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.2c0-.7.5-1.2 1.2-1.2H17V2h-2.2C12.1 2 10 4.1 10 6.8v1.7H8v2.8h2V22h3.2v-10.7h2.2l.4-2.8h-2.6z"
      />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 3c.3 2.2 1.6 3.8 3.8 4.1v2.4c-1.3-.1-2.5-.5-3.6-1.2v6.4c0 3.2-2.5 5.5-5.6 5.5A5.5 5.5 0 0 1 3.3 14.7c0-3 2.4-5.5 5.5-5.5.4 0 .8 0 1.1.1v2.6a3 3 0 0 0-1.1-.2 2.9 2.9 0 0 0 0 5.8 2.9 2.9 0 0 0 2.9-2.9V3h2.5z"
      />
    </svg>
  )
}

export function SocialLinks({ settings = {}, className, linkClassName }: SocialLinksProps) {
  const facebook = readUrl(settings.social_facebook)
  const tiktok = readUrl(settings.social_tiktok)
  const items = [
    facebook ? { label: "Facebook", href: facebook, icon: <FacebookIcon /> } : null,
    tiktok ? { label: "TikTok", href: tiktok, icon: <TikTokIcon /> } : null,
  ].flatMap((item) => (item ? [item] : []))

  if (!items.length) return null

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-[3px] transition duration-150 active:scale-95",
            linkClassName,
          )}
        >
          {item.icon}
        </a>
      ))}
    </div>
  )
}
