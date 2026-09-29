import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

/** Explicitly include /admin (matcher :path* alone can miss the bare path). */
export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
