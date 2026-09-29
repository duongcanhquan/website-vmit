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
}

export default nextConfig
