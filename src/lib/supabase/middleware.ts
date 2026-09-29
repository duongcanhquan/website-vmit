import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

function redirectToLogin(request: NextRequest, error?: string) {
  const url = request.nextUrl.clone()
  url.pathname = "/admin/dang-nhap"
  url.search = ""
  if (error) url.searchParams.set("error", error)
  return NextResponse.redirect(url)
}

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAdminArea = path === "/admin" || path.startsWith("/admin/")
  const isLogin = path === "/admin/dang-nhap" || path.startsWith("/admin/dang-nhap/")

  if (!isAdminArea) {
    return NextResponse.next({ request })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnon) {
    if (!isLogin) return redirectToLogin(request, "config")
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
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
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!isLogin && !user) {
    return redirectToLogin(request)
  }

  if (!isLogin && user) {
    const { data: roleRow } = await supabase
      .from("app_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle()

    if (!roleRow || (roleRow.role !== "admin" && roleRow.role !== "editor")) {
      return redirectToLogin(request, "forbidden")
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
      url.search = ""
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
