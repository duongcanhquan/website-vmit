"use client"

import { FormEvent, Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

function LoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(
    search.get("error") === "forbidden" ? "Tài khoản chưa được cấp quyền admin/editor." : null,
  )
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }
    router.push("/admin")
    router.refresh()
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="w-full max-w-md rounded-[1.75rem] border border-border bg-white p-8 shadow-[0_24px_60px_-40px_rgba(0,29,126,0.4)]"
    >
      <h1 className="font-display text-3xl text-brand-navy">Đăng nhập quản trị</h1>
      <p className="mt-2 text-sm text-muted">Chỉ dành cho nhân sự VMIT (admin / editor).</p>
      {error ? <p className="mt-4 rounded-xl bg-brand-red/10 px-3 py-2 text-sm text-brand-red">{error}</p> : null}
      <label className="mt-6 block text-sm font-bold">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 h-12 w-full rounded-2xl border border-border px-4"
        />
      </label>
      <label className="mt-4 block text-sm font-bold">
        Mật khẩu
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 h-12 w-full rounded-2xl border border-border px-4"
        />
      </label>
      <Button type="submit" className="mt-6 w-full" disabled={loading}>
        {loading ? "Đang đăng nhập…" : "Đăng nhập"}
      </Button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4">
      <Suspense fallback={<p className="text-muted">Đang tải…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
