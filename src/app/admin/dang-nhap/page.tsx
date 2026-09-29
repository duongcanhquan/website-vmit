"use client"

import Image from "next/image"
import Link from "next/link"
import { FormEvent, Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ROUTES, SITE } from "@/constants/site"
import { createClient } from "@/lib/supabase/client"

/** Temporary bootstrap account — maps username "admin" → email */
const TEMP_ADMIN_EMAIL = "admin@vmit.local"

function resolveLoginEmail(raw: string): string {
  const value = raw.trim()
  if (value.toLowerCase() === "admin") return TEMP_ADMIN_EMAIL
  return value
}

function mapAuthError(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
    return "Sai tài khoản hoặc mật khẩu. Thử tạm: admin / admin"
  }
  if (lower.includes("email not confirmed")) {
    return "Email chưa xác nhận. Confirm user trên Supabase Auth."
  }
  if (lower.includes("failed to fetch") || lower.includes("network")) {
    return "Không kết nối được Supabase. Kiểm tra biến môi trường trên Vercel."
  }
  return message
}

function LoginForm() {
  const search = useSearchParams()
  const queryError = search.get("error")
  const [account, setAccount] = useState("admin")
  const [password, setPassword] = useState("admin")
  const [error, setError] = useState<string | null>(
    queryError === "forbidden"
      ? "Đã đăng nhập nhưng chưa có quyền admin/editor trong app_roles."
      : queryError === "config"
        ? "Thiếu NEXT_PUBLIC_SUPABASE_URL / ANON_KEY trên môi trường deploy."
        : null,
  )
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError("Thiếu biến môi trường Supabase (.env.local / Vercel).")
      setLoading(false)
      return
    }

    try {
      const email = resolveLoginEmail(account)
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (authError) {
        setError(mapAuthError(authError.message))
        setLoading(false)
        return
      }
      if (!data.session) {
        setError("Không tạo được phiên đăng nhập. Thử lại.")
        setLoading(false)
        return
      }
      // Hard navigation so middleware reads fresh auth cookies reliably
      window.location.assign("/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại")
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="w-full max-w-md rounded-[3px] border border-border bg-white p-8 shadow-hairline"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">Cổng quản trị</p>
      <h1 className="mt-2 text-3xl font-black text-brand-navy">Đăng nhập Admin</h1>
      <p className="mt-2 text-sm text-muted">
        Tạm thời: <strong>admin</strong> / <strong>admin</strong>
      </p>
      {error ? (
        <p className="mt-4 rounded-[3px] bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>
      ) : null}
      <label className="mt-6 block text-sm font-bold text-brand-navy">
        Tài khoản
        <input
          type="text"
          required
          autoComplete="username"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="admin"
          className="mt-1 h-12 w-full rounded-[3px] border border-border px-4 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </label>
      <label className="mt-4 block text-sm font-bold text-brand-navy">
        Mật khẩu
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="admin"
          className="mt-1 h-12 w-full rounded-[3px] border border-border px-4 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </label>
      <Button type="submit" className="mt-6 w-full" disabled={loading}>
        {loading ? "Đang đăng nhập…" : "Vào bảng điều khiển"}
      </Button>
      <p className="mt-4 text-center text-sm text-muted">
        <Link href={ROUTES.home} className="font-semibold text-primary hover:underline">
          ← Về trang chủ VMIT
        </Link>
      </p>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-mist px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,178,166,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(0,29,126,0.08),transparent_40%)]" />
      <div className="relative z-10 mb-8 flex flex-col items-center text-center">
        <Image
          src="/brand/logo-vmit.png"
          alt={SITE.name}
          width={160}
          height={64}
          className="h-auto w-[140px] object-contain"
          priority
        />
        <p className="mt-3 text-sm font-medium italic text-primary">{SITE.brandTagline}</p>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<p className="text-center text-muted">Đang tải cổng đăng nhập…</p>}>
          <LoginForm />
        </Suspense>
      </div>
      <p className="relative z-10 mt-8 text-center text-xs text-muted">
        Đường dẫn: <code className="rounded bg-white px-1.5 py-0.5">/admin</code> hoặc{" "}
        <code className="rounded bg-white px-1.5 py-0.5">/admin/dang-nhap</code>
      </p>
    </div>
  )
}
