import { Nunito } from "next/font/google"

const adminFont = Nunito({
  subsets: ["latin", "vietnamese"],
  variable: "--font-admin",
  display: "swap",
})

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${adminFont.variable} admin-ui`}>{children}</div>
}
