import type { Metadata } from "next"
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google"
import { LocaleProvider } from "@/components/providers/locale-provider"
import { SITE } from "@/constants/site"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  variable: "--font-fraunces",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.brandTagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.heroHeadline}. ${SITE.brandTagline}`,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
