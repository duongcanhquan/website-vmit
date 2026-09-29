import type { Metadata } from "next"
import { Nunito, Roboto } from "next/font/google"
import { LocaleProvider } from "@/components/providers/locale-provider"
import { HashScroll } from "@/components/common/site-link"
import { NavigationProgress } from "@/components/common/navigation-progress"
import { SITE } from "@/constants/site"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
})

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-menu",
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
      <body className={`${roboto.variable} ${nunito.variable} font-sans antialiased`}>
        <NavigationProgress />
        <HashScroll />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
