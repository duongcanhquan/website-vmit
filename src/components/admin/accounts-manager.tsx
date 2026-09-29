"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState, useTransition } from "react"
import { KeyRound, RefreshCw, ShieldCheck, UserPlus } from "lucide-react"
import {
  changeOwnPassword,
  createStaff,
  removeStaff,
  resetStaffPassword,
  setStaffRole,
} from "@/app/admin/(dashboard)/tai-khoan/actions"
import { AdminCard, EmptyState, Field, inputClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import type { StaffRole } from "@/lib/admin/auth"
import { cn } from "@/lib/utils"

export type StaffAccount = {
  id: string
  email: string
  role: StaffRole
  lastSignIn: string | null
  createdAt: string | null
}

type Notice = { tone: "ok" | "error"; text: string } | null
type Result = { ok: true } | { ok: false; error: string }

const ROLE_LABEL: Record<StaffRole, string> = { admin: "Admin", editor: "Biên tập viên" }

function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%"
  const bytes = crypto.getRandomValues(new Uint32Array(14))
  return Array.from(bytes, (n) => chars[n % chars.length]).join("")
}

function when(value: string | null) {
  if (!value) return "Chưa đăng nhập"
  return new Date(value).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

function NoticeLine({ notice }: { notice: Notice }) {
  if (!notice) return null
  return (
    <p
      role="status"
      className={cn(
        "mt-3 rounded-[3px] px-3 py-2 text-sm font-semibold",
        notice.tone === "ok" ? "bg-sky text-brand-navy" : "bg-red-50 text-red-800",
      )}
    >
      {notice.text}
    </p>
  )
}

function useAction() {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [notice, setNotice] = useState<Notice>(null)
  function run(action: () => Promise<Result>, okText: string, after?: () => void) {
    setNotice(null)
    start(async () => {
      const result = await action()
      if (result.ok) {
        setNotice({ tone: "ok", text: okText })
        after?.()
        router.refresh()
      } else {
        setNotice({ tone: "error", text: result.error })
      }
    })
  }
  return { pending, notice, run }
}

export function AccountsManager({
  currentUserId,
  currentEmail,
  isAdmin,
  serviceReady,
  accounts,
}: {
  currentUserId: string
  currentEmail: string
  isAdmin: boolean
  serviceReady: boolean
  accounts: StaffAccount[]
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
      <div className="space-y-6">
        {isAdmin && !serviceReady ? (
          <AdminCard className="border-amber-300 bg-amber-50">
            <p className="font-bold text-amber-900">Chưa bật quản lý tài khoản</p>
            <p className="mt-1 text-sm text-amber-900/80">
              Thêm biến <code>SUPABASE_SERVICE_ROLE_KEY</code> (Supabase → Project Settings → API Keys → secret key) vào
              Vercel rồi redeploy. Trong lúc chờ, có thể thêm người dùng ở Supabase → Authentication → Users và gán quyền
              trong bảng <code>app_roles</code>.
            </p>
          </AdminCard>
        ) : null}
        {isAdmin && serviceReady ? (
          <>
            <StaffList accounts={accounts} currentUserId={currentUserId} />
            <AddStaff />
          </>
        ) : null}
        {!isAdmin ? (
          <AdminCard>
            <p className="font-bold text-brand-navy">Bạn đang dùng quyền Biên tập viên</p>
            <p className="mt-1 text-sm text-muted">
              Việc thêm, phân quyền hoặc gỡ tài khoản do admin thực hiện. Bạn vẫn đổi được mật khẩu của mình ở bên cạnh.
            </p>
          </AdminCard>
        ) : null}
      </div>
      <OwnPassword email={currentEmail} />
    </div>
  )
}

function StaffList({ accounts, currentUserId }: { accounts: StaffAccount[]; currentUserId: string }) {
  return (
    <AdminCard className="p-0">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <ShieldCheck className="size-5 text-primary" />
        <p className="font-bold text-brand-navy">Người quản trị ({accounts.length})</p>
      </div>
      {accounts.length === 0 ? (
        <div className="p-5">
          <EmptyState message="Chưa có tài khoản nào trong app_roles." />
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {accounts.map((account) => (
            <StaffRow key={account.id} account={account} self={account.id === currentUserId} />
          ))}
        </ul>
      )}
    </AdminCard>
  )
}

function StaffRow({ account, self }: { account: StaffAccount; self: boolean }) {
  const { pending, notice, run } = useAction()
  const [resetting, setResetting] = useState(false)
  const [password, setPassword] = useState("")

  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-brand-navy">
            {account.email}
            {self ? <span className="ml-2 text-xs font-semibold text-primary">(bạn)</span> : null}
          </p>
          <p className="text-xs text-muted">Lần đăng nhập gần nhất: {when(account.lastSignIn)}</p>
        </div>
        <select
          className={cn(inputClass, "h-9 w-auto")}
          value={account.role}
          disabled={pending || self}
          onChange={(e) => {
            const role = e.target.value as StaffRole
            run(() => setStaffRole(account.id, role), `Đã đổi quyền thành ${ROLE_LABEL[role]}.`)
          }}
        >
          <option value="admin">{ROLE_LABEL.admin}</option>
          <option value="editor">{ROLE_LABEL.editor}</option>
        </select>
        <Button size="sm" variant="outlineNavy" disabled={pending} onClick={() => setResetting((v) => !v)}>
          <KeyRound className="size-4" /> Đặt lại mật khẩu
        </Button>
        {!self ? (
          <Button
            size="sm"
            variant="ghost"
            className="text-red-700"
            disabled={pending}
            onClick={() => {
              if (!window.confirm(`Gỡ quyền quản trị của ${account.email}?`)) return
              const alsoDelete = window.confirm("Xóa luôn tài khoản đăng nhập này? Bấm Cancel để chỉ gỡ quyền.")
              run(() => removeStaff(account.id, alsoDelete), alsoDelete ? "Đã xóa tài khoản." : "Đã gỡ quyền.")
            }}
          >
            Gỡ quyền
          </Button>
        ) : null}
      </div>
      {resetting ? (
        <form
          className="mt-3 flex flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            run(() => resetStaffPassword(account.id, password), `Đã đặt mật khẩu mới. Gửi cho ${account.email} qua kênh riêng.`, () =>
              setResetting(false),
            )
          }}
        >
          <Field label="Mật khẩu mới" className="min-w-[16rem] flex-1">
            <input className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          </Field>
          <Button type="button" size="sm" variant="outlineNavy" onClick={() => setPassword(randomPassword())}>
            <RefreshCw className="size-4" /> Tạo ngẫu nhiên
          </Button>
          <Button type="submit" size="sm" disabled={pending}>
            Lưu
          </Button>
        </form>
      ) : null}
      <NoticeLine notice={notice} />
    </li>
  )
}

function AddStaff() {
  const { pending, notice, run } = useAction()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<StaffRole>("editor")

  function submit(e: FormEvent) {
    e.preventDefault()
    run(() => createStaff({ email, password, role }), `Đã tạo ${email}. Gửi mật khẩu cho người dùng qua kênh riêng.`, () => {
      setEmail("")
      setPassword("")
    })
  }

  return (
    <AdminCard>
      <div className="flex items-center gap-2">
        <UserPlus className="size-5 text-primary" />
        <p className="font-bold text-brand-navy">Thêm người quản trị</p>
      </div>
      <p className="mt-1 text-sm text-muted">
        Tài khoản được xác nhận sẵn, đăng nhập ngay bằng email và mật khẩu. Nếu email đã có tài khoản, hệ thống cấp quyền và đặt
        lại mật khẩu cho tài khoản đó.
      </p>
      <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_11rem]">
        <Field label="Email">
          <input type="email" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Mật khẩu (tối thiểu 8 ký tự)">
          <div className="flex gap-2">
            <input
              required
              minLength={8}
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="button" size="sm" variant="outlineNavy" className="h-11 shrink-0 px-3" onClick={() => setPassword(randomPassword())} aria-label="Tạo mật khẩu ngẫu nhiên">
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </Field>
        <Field label="Vai trò">
          <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value as StaffRole)}>
            <option value="editor">{ROLE_LABEL.editor}</option>
            <option value="admin">{ROLE_LABEL.admin}</option>
          </select>
        </Field>
        <div className="md:col-span-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Đang tạo…" : "Tạo tài khoản"}
          </Button>
        </div>
      </form>
      <NoticeLine notice={notice} />
    </AdminCard>
  )
}

function OwnPassword({ email }: { email: string }) {
  const { pending, notice, run } = useAction()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const mismatch = confirm.length > 0 && confirm !== password

  return (
    <AdminCard className="h-fit">
      <div className="flex items-center gap-2">
        <KeyRound className="size-5 text-primary" />
        <p className="font-bold text-brand-navy">Đổi mật khẩu của bạn</p>
      </div>
      <p className="mt-1 break-all text-sm text-muted">{email}</p>
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (mismatch) return
          run(() => changeOwnPassword(password), "Đã đổi mật khẩu.", () => {
            setPassword("")
            setConfirm("")
          })
        }}
      >
        <Field label="Mật khẩu mới">
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field label="Nhập lại">
          <input
            type="password"
            autoComplete="new-password"
            required
            className={cn(inputClass, mismatch && "border-red-400")}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Field>
        {mismatch ? <p className="text-sm text-red-700">Hai mật khẩu chưa khớp.</p> : null}
        <Button type="submit" className="w-full" disabled={pending || mismatch}>
          {pending ? "Đang lưu…" : "Đổi mật khẩu"}
        </Button>
      </form>
      <NoticeLine notice={notice} />
    </AdminCard>
  )
}
