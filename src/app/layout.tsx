import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { LocaleProvider } from "@/components/providers/locale-provider"
import { SITE } from "@/constants/site"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
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
      <body className={`${roboto.variable} font-sans antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
