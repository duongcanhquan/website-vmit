import type { Metadata } from "next"
import { Sora, Source_Sans_3 } from "next/font/google"
import { SITE } from "@/constants/site"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin", "vietnamese"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.heroSlogan}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.heroHeadline}. ${SITE.brandTagline}`,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${sora.variable} ${sourceSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
