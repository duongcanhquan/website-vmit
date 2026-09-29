"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { deleteRow, upsertRow } from "@/app/admin/(dashboard)/actions"
import { ImageField, type ImageAspect } from "@/components/admin/image-field"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { AdminCard, AdminPageHeader, EmptyState, Field, inputClass, textareaClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FieldDef =
  | { key: string; label: string; kind: "text" | "textarea" | "number" | "checkbox" | "url" }
  | { key: string; label: string; kind: "image"; aspect?: ImageAspect; hint?: string }
  | { key: string; label: string; kind: "file"; hint?: string }
  | { key: string; label: string; kind: "bilingual"; viKey: string; enKey: string; multiline?: boolean }
  | { key: string; label: string; kind: "richtext"; viKey: string; enKey: string }

type CrudTable =
  | "documents"
  | "partners"
  | "pillars"
  | "pathway_steps"
  | "impact_counters"
  | "courses"
  | "team_members"
  | "pricing_plans"
  | "faqs"
  | "testimonials"
  | "posts"
  | "subjects"

type Row = Record<string, unknown>

type Props = {
  title: string
  description: string
  table: CrudTable
  fields: FieldDef[]
  rows: Row[]
  newDefaults: Row
}

type Notice = { tone: "ok" | "error"; text: string }

const NEW_ID = "__new__"

function rowLabel(row: Row): string {
  return String(
    row.title_vi ??
      row.name_vi ??
      row.name ??
      row.full_name_vi ??
      row.question_vi ??
      row.author_name ??
      row.step_code ??
      row.value_text ??
      row.id ??
      "",
  )
}

function bySort(a: Row, b: Row) {
  return Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
}

function withLegacyColumns(table: CrudTable, form: Row): Row {
  const payload = { ...form }
  if (table === "courses") {
    payload.title = payload.title_vi
    payload.summary = payload.summary_vi
    payload.description = payload.description_vi
  }
  if (table === "team_members") {
    payload.full_name = payload.full_name_vi
    payload.role_title = payload.role_title_vi
    payload.bio = payload.bio_vi
  }
  if (table === "pricing_plans") {
    payload.name = payload.name_vi
    payload.description = payload.description_vi
    payload.period_label = payload.period_label_vi
    payload.cta_label = payload.cta_label_vi
  }
  if (table === "faqs") {
    payload.question = payload.question_vi
    payload.answer = payload.answer_vi
  }
  if (table === "testimonials") {
    payload.quote = payload.quote_vi
    payload.author_role = payload.author_role_vi
  }
  if (table === "posts") {
    payload.title = payload.title_vi
    payload.excerpt = payload.excerpt_vi
    payload.body = payload.body_vi
    if (!payload.published_at && payload.is_published) {
      payload.published_at = new Date().toISOString()
    }
  }
  return payload
}

function RowForm({
  fields,
  folder,
  form,
  setValue,
  pending,
  onSave,
  onCancel,
}: {
  fields: FieldDef[]
  folder: string
  form: Row
  setValue: (key: string, value: unknown) => void
  pending: boolean
  onSave: () => void
  onCancel: () => void
}) {
  const rowKey = String(form.id ?? NEW_ID)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave()
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onCancel()
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {fields.map((field) => {
          if (field.kind === "richtext") {
            return (
              <div key={field.key} className="space-y-4 rounded-[3px] border border-border p-3 md:col-span-2">
                <p className="text-xs font-extrabold uppercase text-muted">{field.label}</p>
                <div>
                  <p className="mb-1 text-sm font-bold text-brand-navy">Tiếng Việt</p>
                  <RichTextEditor
                    key={`${rowKey}-${field.viKey}`}
                    value={String(form[field.viKey] ?? "")}
                    onChange={(html) => setValue(field.viKey, html)}
                  />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-brand-navy">English</p>
                  <RichTextEditor
                    key={`${rowKey}-${field.enKey}`}
                    value={String(form[field.enKey] ?? "")}
                    onChange={(html) => setValue(field.enKey, html)}
                    placeholder="Write the article in English…"
                  />
                </div>
              </div>
            )
          }
          if (field.kind === "bilingual") {
            const Control = field.multiline ? "textarea" : "input"
            return (
              <div key={field.key} className="space-y-2 rounded-[3px] border border-border p-3 md:col-span-2">
                <p className="text-xs font-extrabold uppercase text-muted">{field.label}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Tiếng Việt">
                    <Control
                      className={field.multiline ? textareaClass : inputClass}
                      value={String(form[field.viKey] ?? "")}
                      onChange={(e) => setValue(field.viKey, e.target.value)}
                    />
                  </Field>
                  <Field label="English">
                    <Control
                      className={field.multiline ? textareaClass : inputClass}
                      value={String(form[field.enKey] ?? "")}
                      onChange={(e) => setValue(field.enKey, e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )
          }
          if (field.kind === "image" || field.kind === "file") {
            return (
              <ImageField
                key={field.key}
                label={field.label}
                value={String(form[field.key] ?? "")}
                onChange={(url) => setValue(field.key, url)}
                folder={folder}
                accept={field.kind}
                aspect={field.kind === "image" ? field.aspect : undefined}
                hint={field.hint}
                className="rounded-xl border border-border p-4 md:col-span-2"
              />
            )
          }
          if (field.kind === "checkbox") {
            return (
              <label key={field.key} className="flex items-center gap-2 text-sm font-bold">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={Boolean(form[field.key])}
                  onChange={(e) => setValue(field.key, e.target.checked)}
                />
                {field.label}
              </label>
            )
          }
          if (field.kind === "textarea") {
            return (
              <Field key={field.key} label={field.label} className="md:col-span-2">
                <textarea
                  className={textareaClass}
                  value={String(form[field.key] ?? "")}
                  onChange={(e) => setValue(field.key, e.target.value)}
                />
              </Field>
            )
          }
          return (
            <Field key={field.key} label={field.label}>
              <input
                className={inputClass}
                type={field.kind === "number" ? "number" : "text"}
                value={String(form[field.key] ?? "")}
                onChange={(e) =>
                  setValue(field.key, field.kind === "number" ? Number(e.target.value) : e.target.value)
                }
              />
            </Field>
          )
        })}
      </div>
      <div className="mt-4 flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Đang lưu…" : "Lưu"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
          Hủy
        </Button>
      </div>
    </form>
  )
}

export function SimpleCrud({ title, description, table, fields, rows: initialRows, newDefaults }: Props) {
  const [rows, setRows] = useState<Row[]>(initialRows)
  const [pending, start] = useTransition()
  const [editing, setEditing] = useState<Row | null>(null)
  const [notice, setNotice] = useState<Notice | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const editingId = editing ? String(editing.id ?? NEW_ID) : null

  useEffect(() => setRows(initialRows), [initialRows])

  useEffect(() => {
    if (!editingId) return
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    formRef.current?.querySelector<HTMLElement>("input, textarea")?.focus({ preventScroll: true })
  }, [editingId])

  useEffect(() => {
    if (notice?.tone !== "ok") return
    const timer = window.setTimeout(() => setNotice(null), 3500)
    return () => window.clearTimeout(timer)
  }, [notice])

  function setValue(key: string, value: unknown) {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  function save() {
    if (!editing) return
    const draft = editing
    start(async () => {
      try {
        const saved = await upsertRow(table, withLegacyColumns(table, draft))
        setRows((prev) => {
          const exists = prev.some((row) => row.id === saved.id)
          const next = exists ? prev.map((row) => (row.id === saved.id ? saved : row)) : [...prev, saved]
          return next.sort(bySort)
        })
        setEditing(null)
        setNotice({ tone: "ok", text: `Đã lưu “${rowLabel(saved)}”. Trang public cập nhật ngay.` })
      } catch (err) {
        setNotice({ tone: "error", text: err instanceof Error ? err.message : "Không lưu được" })
      }
    })
  }

  function remove(row: Row) {
    const id = String(row.id)
    if (!window.confirm(`Xóa “${rowLabel(row)}”? Không thể hoàn tác.`)) return
    setBusyId(id)
    start(async () => {
      try {
        await deleteRow(table, id)
        setRows((prev) => prev.filter((item) => String(item.id) !== id))
        if (editingId === id) setEditing(null)
        setNotice({ tone: "ok", text: `Đã xóa “${rowLabel(row)}”.` })
      } catch (err) {
        setNotice({ tone: "error", text: err instanceof Error ? err.message : "Không xóa được" })
      } finally {
        setBusyId(null)
      }
    })
  }

  const imageField = fields.find((field) => field.kind === "image")
  const imageKey = imageField?.key
  const thumbFit = imageField?.kind === "image" && imageField.aspect === "logo" ? "object-contain p-1.5" : "object-cover"
  const formProps = {
    fields,
    folder: table.replace(/_/g, "-"),
    setValue,
    pending,
    onSave: save,
    onCancel: () => setEditing(null),
  }

  return (
    <div>
      <AdminPageHeader
        title={title}
        description={description}
        actions={
          <Button
            type="button"
            disabled={editingId === NEW_ID}
            onClick={() => {
              setEditing({ ...newDefaults, sort_order: rows.length + 1 })
              setNotice(null)
            }}
          >
            Thêm mới
          </Button>
        }
      />

      {notice ? (
        <p
          role="status"
          className={cn(
            "sticky top-2 z-30 mb-4 rounded-[3px] border px-4 py-3 text-sm font-semibold shadow-hairline",
            notice.tone === "ok"
              ? "border-primary/30 bg-sky text-brand-navy"
              : "border-red-200 bg-red-50 text-red-800",
          )}
        >
          {notice.text}
        </p>
      ) : null}

      {editing && editingId === NEW_ID ? (
        <div ref={formRef} className="mb-6 scroll-mt-4">
          <AdminCard className="border-primary/40">
            <p className="mb-4 text-sm font-extrabold text-brand-navy">Thêm mục mới</p>
            <RowForm {...formProps} form={editing} />
          </AdminCard>
        </div>
      ) : null}

      {rows.length === 0 && editingId !== NEW_ID ? (
        <EmptyState message="Chưa có dữ liệu. Bấm “Thêm mới” để tạo mục đầu tiên." />
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const id = String(row.id)
            const open = editingId === id
            return (
              <div key={id} ref={open ? formRef : undefined} className="scroll-mt-4">
                <AdminCard className={cn(open && "border-primary/40")}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {imageKey ? (
                      <button
                        type="button"
                        aria-label={`Sửa ảnh của ${rowLabel(row)}`}
                        onClick={() => setEditing(open ? null : { ...row })}
                        className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-mist"
                      >
                        {row[imageKey] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={String(row[imageKey])} alt="" className={cn("size-full", thumbFit)} />
                        ) : (
                          <span className="flex size-full items-center justify-center text-center text-[10px] font-bold leading-tight text-muted">
                            Chưa có ảnh
                          </span>
                        )}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="min-w-0 flex-1 text-left"
                      onClick={() => setEditing(open ? null : { ...row })}
                    >
                      <p className="truncate font-bold text-brand-navy">{rowLabel(row)}</p>
                      <p className="text-xs text-muted">
                        {row.is_published === false ? "Nháp · đang ẩn" : "Đang hiển thị"} · thứ tự{" "}
                        {String(row.sort_order ?? 0)}
                      </p>
                    </button>
                    <div className="flex gap-2">
                      <Button
                        variant="outlineNavy"
                        size="sm"
                        onClick={() => setEditing(open ? null : { ...row })}
                      >
                        {open ? "Đóng" : "Sửa"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-700"
                        disabled={busyId === id}
                        onClick={() => remove(row)}
                      >
                        {busyId === id ? "Đang xóa…" : "Xóa"}
                      </Button>
                    </div>
                  </div>
                  {open && editing ? (
                    <div className="mt-5 border-t border-border pt-5">
                      <RowForm {...formProps} form={editing} />
                    </div>
                  ) : null}
                </AdminCard>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
