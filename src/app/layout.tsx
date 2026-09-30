import type { Metadata } from "next"
import { Nunito, Roboto } from "next/font/google"
import { LocaleProvider } from "@/components/providers/locale-provider"
import { HashScroll } from "@/components/common/site-link"
import { NavigationProgress } from "@/components/common/navigation-progress"
import { SITE } from "@/constants/site"
import { settingText } from "@/lib/i18n/locale-text"
import { DEFAULT_SEO, loadSeoContext } from "@/lib/seo"
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

export async function generateMetadata(): Promise<Metadata> {
  const { settings, origin } = await loadSeoContext()
  const title = settingText(settings.seo_title, "vi") || DEFAULT_SEO.titleVi
  const description = settingText(settings.seo_description, "vi") || DEFAULT_SEO.descriptionVi
  return {
    metadataBase: new URL(origin),
    title: {
      default: title,
      template: `%s | ${SITE.name}`,
    },
    description,
  }
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
