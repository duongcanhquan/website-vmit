"use client"

import { FormEvent, Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

/** Temporary local bootstrap account — maps username "admin" → email */
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
    return "Email chưa xác nhận. Liên hệ kỹ thuật để confirm user trên Supabase."
  }
  if (lower.includes("failed to fetch") || lower.includes("network")) {
    return "Không kết nối được Supabase. Kiểm tra NEXT_PUBLIC_SUPABASE_URL / ANON_KEY."
  }
  return message
}

function LoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const [account, setAccount] = useState("admin")
  const [password, setPassword] = useState("admin")
  const [error, setError] = useState<string | null>(
    search.get("error") === "forbidden"
      ? "Đăng nhập OK nhưng chưa có quyền admin/editor trong app_roles."
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

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <form
        onSubmit={(e) => void onSubmit(e)}
        className="rounded-[3px] border border-border bg-white p-8 shadow-hairline"
      >
        <h1 className="text-3xl font-black text-brand-navy">Đăng nhập quản trị</h1>
        <p className="mt-2 text-sm text-muted">Tạm thời: <strong>admin</strong> / <strong>admin</strong></p>
        {error ? (
          <p className="mt-4 rounded-[3px] bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>
        ) : null}
        <label className="mt-6 block text-sm font-bold">
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
        <label className="mt-4 block text-sm font-bold">
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
          {loading ? "Đang đăng nhập…" : "Đăng nhập"}
        </Button>
      </form>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-10">
      <Suspense fallback={<p className="text-muted">Đang tải…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
