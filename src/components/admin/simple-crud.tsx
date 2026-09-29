"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import { deleteRow, upsertRow } from "@/app/admin/(dashboard)/actions"
import { AdminCard, AdminPageHeader, EmptyState, Field, inputClass, textareaClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"

type FieldDef =
  | { key: string; label: string; kind: "text" | "textarea" | "number" | "checkbox" | "url" }
  | { key: string; label: string; kind: "bilingual"; viKey: string; enKey: string; multiline?: boolean }

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

type Props = {
  title: string
  description: string
  table: CrudTable
  fields: FieldDef[]
  rows: Record<string, unknown>[]
  newDefaults: Record<string, unknown>
}

export function SimpleCrud({ title, description, table, fields, rows, newDefaults }: Props) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const form = useMemo(() => editing ?? null, [editing])

  function setValue(key: string, value: unknown) {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  return (
    <div>
      <AdminPageHeader
        title={title}
        description={description}
        actions={
          <Button
            type="button"
            onClick={() => {
              setEditing({ ...newDefaults })
              setMessage(null)
            }}
          >
            Thêm mới
          </Button>
        }
      />

      {form ? (
        <AdminCard className="mb-6">
          <div className="grid gap-3 md:grid-cols-2">
            {fields.map((field) => {
              if (field.kind === "bilingual") {
                return (
                  <div key={field.key} className="space-y-2 rounded-xl border border-border p-3 md:col-span-2">
                    <p className="text-xs font-extrabold uppercase text-muted">{field.label}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="Tiếng Việt">
                        {field.multiline ? (
                          <textarea
                            className={textareaClass}
                            value={String(form[field.viKey] ?? "")}
                            onChange={(e) => setValue(field.viKey, e.target.value)}
                          />
                        ) : (
                          <input
                            className={inputClass}
                            value={String(form[field.viKey] ?? "")}
                            onChange={(e) => setValue(field.viKey, e.target.value)}
                          />
                        )}
                      </Field>
                      <Field label="English">
                        {field.multiline ? (
                          <textarea
                            className={textareaClass}
                            value={String(form[field.enKey] ?? "")}
                            onChange={(e) => setValue(field.enKey, e.target.value)}
                          />
                        ) : (
                          <input
                            className={inputClass}
                            value={String(form[field.enKey] ?? "")}
                            onChange={(e) => setValue(field.enKey, e.target.value)}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                )
              }
              if (field.kind === "checkbox") {
                return (
                  <label key={field.key} className="flex items-center gap-2 text-sm font-bold">
                    <input
                      type="checkbox"
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
            <Button
              disabled={pending}
              onClick={() => {
                start(async () => {
                  try {
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
                    await upsertRow(table, payload)
                    setEditing(null)
                    setMessage("Đã lưu.")
                    router.refresh()
                  } catch (err) {
                    setMessage(err instanceof Error ? err.message : "Lỗi lưu")
                  }
                })
              }}
            >
              Lưu
            </Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Hủy
            </Button>
          </div>
          {message ? <p className="mt-2 text-sm">{message}</p> : null}
        </AdminCard>
      ) : null}

      {rows.length === 0 ? (
        <EmptyState message="Chưa có dữ liệu." />
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <AdminCard key={String(row.id)} className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-brand-navy">
                  {String(
                    row.title_vi ??
                      row.name_vi ??
                      row.name ??
                      row.full_name_vi ??
                      row.question_vi ??
                      row.author_name ??
                      row.step_code ??
                      row.value_text ??
                      row.id,
                  )}
                </p>
                <p className="text-xs text-muted">
                  {row.is_published ? "Đã xuất bản" : "Nháp"} · sort {String(row.sort_order ?? 0)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outlineNavy" size="sm" onClick={() => setEditing(row)}>
                  Sửa
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-red"
                  disabled={pending}
                  onClick={() => {
                    start(async () => {
                      await deleteRow(table, String(row.id))
                      router.refresh()
                    })
                  }}
                >
                  Xóa
                </Button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}
