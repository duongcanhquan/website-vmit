import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isAdmin = path.startsWith("/admin")
  const isLogin = path.startsWith("/admin/dang-nhap")

  if (isAdmin && !isLogin) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/dang-nhap"
      return NextResponse.redirect(url)
    }

    const { data: roleRow } = await supabase
      .from("app_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle()

    if (!roleRow || (roleRow.role !== "admin" && roleRow.role !== "editor")) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/dang-nhap"
      url.searchParams.set("error", "forbidden")
      return NextResponse.redirect(url)
    }
  }

  if (isLogin && user) {
    const { data: roleRow } = await supabase
      .from("app_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle()
    if (roleRow && (roleRow.role === "admin" || roleRow.role === "editor")) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
