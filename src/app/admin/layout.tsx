import { Nunito } from "next/font/google"
import type { Metadata } from "next"

const adminFont = Nunito({
  subsets: ["latin", "vietnamese"],
  variable: "--font-admin",
  display: "swap",
})

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "VMIT Admin",
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${adminFont.variable} admin-ui`}>{children}</div>
}
