"use client"

import { useMemo, useState, useTransition } from "react"
import { ChevronDown, Download, Mail, MessageCircle, Phone, Search, Trash2 } from "lucide-react"
import { deleteLead, updateLead } from "@/app/admin/(dashboard)/ho-so/actions"
import { AdminCard, AdminPageHeader, EmptyState, textareaClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import {
  ADMISSION_DETAIL_FIELDS,
  LEAD_STATUS_FLOW,
  LEAD_STATUS_LABEL,
  type LeadStatus,
  type LeadTable,
} from "@/lib/lead-fields"
import { cn } from "@/lib/utils"

export type LeadRow = {
  id: string
  full_name: string
  phone?: string | null
  email?: string | null
  status?: string | null
  created_at: string
  program?: string | null
  tracking_code?: string | null
  subject?: string | null
  message?: string | null
  admin_note?: string | null
  details?: Record<string, string> | null
}

type Tab = { table: LeadTable; label: string; file: string }

const TABS: Tab[] = [
  { table: "admission_applications", label: "Xét tuyển", file: "ho-so-xet-tuyen" },
  { table: "scholarship_leads", label: "Học bổng", file: "tu-van-hoc-bong" },
  { table: "contact_submissions", label: "Liên hệ", file: "lien-he" },
]

const STATUS_TONE: Record<LeadStatus, string> = {
  new: "bg-primary text-white",
  read: "bg-sky text-brand-navy",
  contacted: "bg-amber-100 text-amber-900",
  enrolled: "bg-emerald-100 text-emerald-900",
  archived: "bg-mist text-muted",
}

const PAGE = 30

function statusOf(row: LeadRow): LeadStatus {
  const value = (row.status ?? "new") as LeadStatus
  return value in LEAD_STATUS_LABEL ? value : "new"
}

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

function digits(value?: string | null) {
  const raw = (value ?? "").replace(/\D/g, "")
  return raw.startsWith("84") ? `0${raw.slice(2)}` : raw
}

function csvCell(value: unknown) {
  const text = String(value ?? "").replace(/\r?\n/g, " ")
  return /[",;]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function exportCsv(tab: Tab, rows: LeadRow[]) {
  const detailCols = tab.table === "admission_applications" ? ADMISSION_DETAIL_FIELDS : []
  const header = [
    "Ngày gửi",
    "Mã hồ sơ",
    "Họ tên",
    "Điện thoại",
    "Email",
    ...(tab.table === "admission_applications" ? ["Chương trình"] : []),
    ...(tab.table === "contact_submissions" ? ["Chủ đề", "Nội dung"] : []),
    ...detailCols.map((field) => field.label),
    "Trạng thái",
    "Ghi chú tư vấn",
  ]
  const body = rows.map((row) => [
    formatDate(row.created_at),
    row.tracking_code ?? "",
    row.full_name,
    row.phone ?? "",
    row.email ?? "",
    ...(tab.table === "admission_applications" ? [row.program ?? ""] : []),
    ...(tab.table === "contact_submissions" ? [row.subject ?? "", row.message ?? ""] : []),
    ...detailCols.map((field) => row.details?.[field.key] ?? ""),
    LEAD_STATUS_LABEL[statusOf(row)],
    row.admin_note ?? "",
  ])
  const csv = [header, ...body].map((line) => line.map(csvCell).join(",")).join("\r\n")
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${tab.file}-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function SubmissionsPanel({
  admissions,
  scholarships,
  contacts,
  canDelete,
  initialTab = "admission_applications",
}: {
  admissions: LeadRow[]
  scholarships: LeadRow[]
  contacts: LeadRow[]
  canDelete: boolean
  initialTab?: LeadTable
}) {
  const [data, setData] = useState<Record<LeadTable, LeadRow[]>>({
    admission_applications: admissions,
    scholarship_leads: scholarships,
    contact_submissions: contacts,
  })
  const [tabId, setTabId] = useState<LeadTable>(initialTab)
  const [filter, setFilter] = useState<LeadStatus | "all">("all")
  const [query, setQuery] = useState("")
  const [limit, setLimit] = useState(PAGE)
  const [openId, setOpenId] = useState<string | null>(null)
  const tab = TABS.find((item) => item.table === tabId) ?? TABS[0]
  const rows = data[tabId]

  const counts = useMemo(() => {
    const map: Partial<Record<LeadStatus, number>> = {}
    for (const row of rows) map[statusOf(row)] = (map[statusOf(row)] ?? 0) + 1
    return map
  }, [rows])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (filter !== "all" && statusOf(row) !== filter) return false
      if (!q) return true
      return [row.full_name, row.phone, row.email, row.tracking_code, row.program, row.details?.high_school, row.details?.province]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    })
  }, [rows, filter, query])

  function patchRow(id: string, patch: Partial<LeadRow> | null) {
    setData((prev) => ({
      ...prev,
      [tabId]: patch
        ? prev[tabId].map((row) => (row.id === id ? { ...row, ...patch } : row))
        : prev[tabId].filter((row) => row.id !== id),
    }))
  }

  const flow = LEAD_STATUS_FLOW[tabId]
  const filters: (LeadStatus | "all")[] = ["all", ...flow, ...(counts.read ? (["read"] as const) : [])]

  return (
    <div>
      <AdminPageHeader
        title="Hồ sơ & đăng ký"
        description="Mọi đăng ký từ website: xét tuyển, tư vấn học bổng và liên hệ. Cập nhật trạng thái và ghi chú sau mỗi lần gọi tư vấn."
        actions={
          <Button variant="outlineNavy" size="sm" disabled={!visible.length} onClick={() => exportCsv(tab, visible)}>
            <Download className="size-4" />
            Xuất CSV ({visible.length})
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2 border-b border-border">
        {TABS.map((item) => {
          const fresh = data[item.table].filter((row) => statusOf(row) === "new").length
          const active = item.table === tabId
          return (
            <button
              key={item.table}
              type="button"
              onClick={() => {
                setTabId(item.table)
                setFilter("all")
                setLimit(PAGE)
                setOpenId(null)
              }}
              className={cn(
                "-mb-px flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-bold transition",
                active ? "border-primary text-brand-navy" : "border-transparent text-muted hover:text-brand-navy",
              )}
            >
              {item.label}
              <span className="text-xs font-semibold text-muted">{data[item.table].length}</span>
              {fresh ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-black text-white">{fresh} mới</span>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((value) => {
            const count = value === "all" ? rows.length : (counts[value] ?? 0)
            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setFilter(value)
                  setLimit(PAGE)
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                  filter === value
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-border bg-white text-brand-navy hover:border-primary",
                )}
              >
                {value === "all" ? "Tất cả" : LEAD_STATUS_LABEL[value]} · {count}
              </button>
            )
          })}
        </div>
        <label className="relative block w-full lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setLimit(PAGE)
            }}
            placeholder="Tìm tên, SĐT, email, mã hồ sơ, trường…"
            className="h-10 w-full rounded-[3px] border border-border bg-white pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <EmptyState message={rows.length ? "Không có hồ sơ khớp bộ lọc." : "Chưa có hồ sơ nào."} />
      ) : (
        <div className="space-y-2">
          {visible.slice(0, limit).map((row) => (
            <LeadCard
              key={row.id}
              row={row}
              table={tabId}
              open={openId === row.id}
              canDelete={canDelete}
              onToggle={() => setOpenId(openId === row.id ? null : row.id)}
              onPatch={(patch) => patchRow(row.id, patch)}
            />
          ))}
          {visible.length > limit ? (
            <div className="pt-2 text-center">
              <Button variant="outlineNavy" size="sm" onClick={() => setLimit((n) => n + PAGE)}>
                Xem thêm ({visible.length - limit} hồ sơ)
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

function LeadCard({
  row,
  table,
  open,
  canDelete,
  onToggle,
  onPatch,
}: {
  row: LeadRow
  table: LeadTable
  open: boolean
  canDelete: boolean
  onToggle: () => void
  onPatch: (patch: Partial<LeadRow> | null) => void
}) {
  const [pending, start] = useTransition()
  const [note, setNote] = useState(row.admin_note ?? "")
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null)
  const status = statusOf(row)
  const phone = digits(row.phone)

  function run(action: () => Promise<{ ok: true } | { ok: false; error: string }>, done: () => void, okText: string) {
    setMessage(null)
    start(async () => {
      const result = await action()
      if (result.ok) {
        done()
        setMessage({ tone: "ok", text: okText })
      } else {
        setMessage({ tone: "error", text: result.error })
      }
    })
  }

  const info: { label: string; value?: string | null }[] = [
    { label: "Mã hồ sơ", value: row.tracking_code },
    { label: "Chương trình", value: row.program },
    { label: "Điện thoại", value: row.phone },
    { label: "Email", value: row.email },
    { label: "Gửi lúc", value: formatDate(row.created_at) },
    ...(table === "contact_submissions" ? [{ label: "Chủ đề", value: row.subject }] : []),
    ...ADMISSION_DETAIL_FIELDS.filter((field) => field.key !== "note").map((field) => ({
      label: field.label,
      value: row.details?.[field.key],
    })),
  ].filter((item) => item.value)
  const longText = row.details?.note || row.message

  return (
    <AdminCard className={cn("p-0", open && "border-primary/40")}>
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-4 px-5 py-4 text-left">
        <span
          className={cn("size-2.5 shrink-0 rounded-full", status === "new" ? "bg-primary" : "bg-border")}
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-brand-navy">{row.full_name}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", STATUS_TONE[status])}>
              {LEAD_STATUS_LABEL[status]}
            </span>
            {row.tracking_code ? <span className="text-xs font-semibold text-muted">{row.tracking_code}</span> : null}
          </span>
          <span className="mt-0.5 block truncate text-sm text-muted">
            {[row.phone, row.email, row.program ?? row.subject].filter(Boolean).join(" · ") || "—"}
          </span>
        </span>
        <span className="hidden shrink-0 text-xs text-muted sm:block">{formatDate(row.created_at)}</span>
        <ChevronDown className={cn("size-4 shrink-0 text-muted transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="space-y-5 border-t border-border px-5 py-5">
          <div className="flex flex-wrap gap-2">
            {phone ? (
              <>
                <a href={`tel:${phone}`} className="inline-flex h-9 items-center gap-2 rounded-[3px] bg-primary px-3 text-sm font-bold text-white">
                  <Phone className="size-4" /> Gọi {row.phone}
                </a>
                <a
                  href={`https://zalo.me/${phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-[3px] border border-border px-3 text-sm font-bold text-brand-navy hover:border-primary"
                >
                  <MessageCircle className="size-4" /> Zalo
                </a>
              </>
            ) : null}
            {row.email ? (
              <a
                href={`mailto:${row.email}`}
                className="inline-flex h-9 items-center gap-2 rounded-[3px] border border-border px-3 text-sm font-bold text-brand-navy hover:border-primary"
              >
                <Mail className="size-4" /> Email
              </a>
            ) : null}
          </div>

          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
            {info.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">{item.label}</dt>
                <dd className="mt-0.5 font-semibold text-brand-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
          {longText ? (
            <div className="rounded-[3px] bg-mist px-4 py-3 text-sm text-brand-navy">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
                {table === "contact_submissions" ? "Nội dung" : "Ghi chú của thí sinh"}
              </p>
              <p className="mt-1 whitespace-pre-wrap">{longText}</p>
            </div>
          ) : null}

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Trạng thái xử lý</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {LEAD_STATUS_FLOW[table].map((value) => (
                <button
                  key={value}
                  type="button"
                  disabled={pending || value === status}
                  onClick={() =>
                    run(
                      () => updateLead(table, row.id, { status: value }),
                      () => onPatch({ status: value }),
                      `Đã chuyển sang “${LEAD_STATUS_LABEL[value]}”.`,
                    )
                  }
                  className={cn(
                    "rounded-[3px] border px-3 py-1.5 text-sm font-bold transition disabled:cursor-default",
                    value === status
                      ? "border-brand-navy bg-brand-navy text-white"
                      : "border-border bg-white text-brand-navy hover:border-primary disabled:opacity-50",
                  )}
                >
                  {LEAD_STATUS_LABEL[value]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wide text-muted" htmlFor={`note-${row.id}`}>
              Ghi chú tư vấn (chỉ nội bộ)
            </label>
            <textarea
              id={`note-${row.id}`}
              className={cn(textareaClass, "mt-2")}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ví dụ: 30/9 đã gọi, phụ huynh muốn đến cơ sở Trịnh Văn Bô thứ 7…"
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <Button
                size="sm"
                disabled={pending || note === (row.admin_note ?? "")}
                onClick={() =>
                  run(
                    () => updateLead(table, row.id, { admin_note: note }),
                    () => onPatch({ admin_note: note }),
                    "Đã lưu ghi chú.",
                  )
                }
              >
                {pending ? "Đang lưu…" : "Lưu ghi chú"}
              </Button>
              {canDelete ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-700"
                  disabled={pending}
                  onClick={() => {
                    if (!window.confirm(`Xóa hồ sơ của “${row.full_name}”? Không thể hoàn tác.`)) return
                    run(() => deleteLead(table, row.id), () => onPatch(null), "Đã xóa.")
                  }}
                >
                  <Trash2 className="size-4" /> Xóa hồ sơ
                </Button>
              ) : null}
            </div>
          </div>

          {message ? (
            <p
              role="status"
              className={cn(
                "rounded-[3px] px-3 py-2 text-sm font-semibold",
                message.tone === "ok" ? "bg-sky text-brand-navy" : "bg-red-50 text-red-800",
              )}
            >
              {message.text}
            </p>
          ) : null}
        </div>
      ) : null}
    </AdminCard>
  )
}
