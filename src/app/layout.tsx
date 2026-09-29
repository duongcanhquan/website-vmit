import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"
import { SITE } from "@/constants/site"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  variable: "--font-fraunces",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-manrope",
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
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>{children}</body>
    </html>
  )
}
