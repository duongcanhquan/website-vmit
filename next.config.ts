import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  eslint: {
    // Typecheck vẫn chạy trong `next build`; tránh fail deploy vì ESLint config flat
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/chuong-trinh", destination: "/programs", permanent: true },
      { source: "/ve-vmit", destination: "/about", permanent: true },
      { source: "/lo-trinh", destination: "/pathway", permanent: true },
      { source: "/hoc-phi", destination: "/tuition", permanent: true },
      { source: "/xet-tuyen", destination: "/apply", permanent: true },
      { source: "/tin-tuc", destination: "/news", permanent: true },
      { source: "/tin-tuc/:slug", destination: "/news/:slug", permanent: true },
      { source: "/truong-btec", destination: "/btec-schools", permanent: true },
    ]
  },
}

export default nextConfig
