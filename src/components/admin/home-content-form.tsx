"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, useTransition } from "react"
import { ArrowRight } from "lucide-react"
import { saveSettingsBatch } from "@/app/admin/(dashboard)/actions"
import { ImageField } from "@/components/admin/image-field"
import { AdminCard, AdminPageHeader, Field, inputClass, textareaClass } from "@/components/admin/ui"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_BENEFITS,
  DEFAULT_SUBJECT_ROWS,
  HOME_SECTIONS,
  defaultPrograms,
  readBenefits,
  readPrograms,
  readSubjectRows,
  type BenefitCard,
  type Pair,
  type ProgramCard,
  type SubjectCard,
  type SubjectRow,
} from "@/lib/home-content"
import { cn } from "@/lib/utils"

function savedPair(raw: unknown, fallback: Pair): Pair {
  if (typeof raw === "string" && raw.trim()) return { vi: raw, en: raw }
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>
    return {
      vi: typeof o.vi === "string" && o.vi.trim() ? o.vi : fallback.vi,
      en: typeof o.en === "string" && o.en.trim() ? o.en : fallback.en,
    }
  }
  return fallback
}

function savedUrl(raw: unknown): string {
  return typeof raw === "string" ? raw.replaceAll('"', "").trim() : ""
}

function PairField({
  label,
  value,
  multiline,
  onChange,
}: {
  label: string
  value: Pair
  multiline?: boolean
  onChange: (next: Pair) => void
}) {
  const Control = multiline ? "textarea" : "input"
  return (
    <div className="space-y-2 rounded-[3px] border border-border p-3 md:col-span-2">
      <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Tiếng Việt">
          <Control
            className={multiline ? textareaClass : inputClass}
            value={value.vi}
            onChange={(e) => onChange({ ...value, vi: e.target.value })}
          />
        </Field>
        <Field label="English">
          <Control
            className={multiline ? textareaClass : inputClass}
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        </Field>
      </div>
    </div>
  )
}

type State = {
  text: Record<string, Pair>
  images: Record<string, string>
  benefits: BenefitCard[]
  programs: ProgramCard[]
  subjects: SubjectRow[]
}

function initialState(initial: Record<string, unknown>): State {
  const text: Record<string, Pair> = {}
  const images: Record<string, string> = {}
  for (const section of HOME_SECTIONS) {
    for (const field of section.fields) {
      if (field.kind === "image") images[field.key] = savedUrl(initial[field.key])
      else text[field.key] = savedPair(initial[field.key], field.fallback)
    }
  }
  const rawPrograms = Array.isArray(initial.home_programs) ? (initial.home_programs as Record<string, unknown>[]) : []
  const rawSubjects = Array.isArray(initial.home_subjects) ? (initial.home_subjects as Record<string, unknown>[]) : []
  return {
    text,
    images,
    benefits: readBenefits(initial.home_benefits),
    programs: readPrograms(initial.home_programs).map((card, i) => ({ ...card, image: savedUrl(rawPrograms[i]?.image) })),
    subjects: readSubjectRows(initial.home_subjects).map((row, r) => {
      const rawItems = Array.isArray(rawSubjects[r]?.items) ? (rawSubjects[r].items as Record<string, unknown>[]) : []
      return { ...row, items: row.items.map((card, i) => ({ ...card, image: savedUrl(rawItems[i]?.image) })) }
    }),
  }
}

export function HomeContentForm({ initial }: { initial: Record<string, unknown> }) {
  const start0 = useMemo(() => initialState(initial), [initial])
  const [state, setState] = useState<State>(start0)
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(start0))
  const [pending, start] = useTransition()
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null)
  const programDefaults = useMemo(() => defaultPrograms(), [])
  const dirty = JSON.stringify(state) !== savedSnapshot

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  function setText(key: string, value: Pair) {
    setState((prev) => ({ ...prev, text: { ...prev.text, [key]: value } }))
  }
  function setImage(key: string, value: string) {
    setState((prev) => ({ ...prev, images: { ...prev.images, [key]: value } }))
  }
  function setBenefit(i: number, patch: Partial<BenefitCard>) {
    setState((prev) => ({ ...prev, benefits: prev.benefits.map((b, j) => (j === i ? { ...b, ...patch } : b)) }))
  }
  function setProgram(i: number, patch: Partial<ProgramCard>) {
    setState((prev) => ({ ...prev, programs: prev.programs.map((p, j) => (j === i ? { ...p, ...patch } : p)) }))
  }
  function setSubjectRow(r: number, patch: Partial<SubjectRow>) {
    setState((prev) => ({ ...prev, subjects: prev.subjects.map((row, j) => (j === r ? { ...row, ...patch } : row)) }))
  }
  function setSubject(r: number, i: number, patch: Partial<SubjectCard>) {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.map((row, j) =>
        j === r ? { ...row, items: row.items.map((card, k) => (k === i ? { ...card, ...patch } : card)) } : row,
      ),
    }))
  }

  function save() {
    const snapshot = JSON.stringify(state)
    start(async () => {
      try {
        await saveSettingsBatch({
          ...state.text,
          ...state.images,
          home_benefits: state.benefits,
          home_programs: state.programs,
          home_subjects: state.subjects,
        })
        setSavedSnapshot(snapshot)
        setNotice({ tone: "ok", text: "Đã lưu. Trang chủ đã cập nhật." })
      } catch (err) {
        setNotice({ tone: "error", text: err instanceof Error ? err.message : "Không lưu được" })
      }
    })
  }

  return (
    <div>
      <AdminPageHeader
        title="Nội dung trang chủ"
        description="Mọi chữ và ảnh trên trang chủ, xếp theo thứ tự từ trên xuống. Danh sách (đánh giá, tin tức, đối tác…) có nút dẫn tới trang sửa riêng."
      />

      <nav aria-label="Các khối trang chủ" className="mb-6 flex flex-wrap gap-2">
        {HOME_SECTIONS.map((section, i) => (
          <a
            key={section.id}
            href={`#khoi-${section.id}`}
            className="rounded-[3px] border border-border bg-white px-3 py-1.5 text-xs font-bold text-brand-navy transition-colors hover:border-primary hover:text-primary"
          >
            {i + 1}. {section.title}
          </a>
        ))}
      </nav>

      <div className="space-y-5">
        {HOME_SECTIONS.map((section, i) => (
          <section key={section.id} id={`khoi-${section.id}`} className="scroll-mt-6">
            <AdminCard>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-brand-navy">
                    {i + 1}. {section.title}
                  </h2>
                  {section.hint ? <p className="mt-1 text-sm text-muted">{section.hint}</p> : null}
                </div>
                {section.links?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 rounded-[3px] bg-sky px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                      >
                        {link.label}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {section.fields.length ? (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {section.fields.map((field) =>
                    field.kind === "image" ? (
                      <ImageField
                        key={field.key}
                        label={field.label}
                        value={state.images[field.key] ?? ""}
                        fallback={field.fallback}
                        onChange={(url) => setImage(field.key, url)}
                      />
                    ) : (
                      <PairField
                        key={field.key}
                        label={field.label}
                        value={state.text[field.key] ?? field.fallback}
                        multiline={field.kind === "multiline"}
                        onChange={(next) => setText(field.key, next)}
                      />
                    ),
                  )}
                </div>
              ) : null}

              {section.cards === "benefits" ? (
                <div className="mt-5 space-y-4">
                  {state.benefits.map((card, j) => (
                    <div key={j} className="rounded-[3px] border border-dashed border-border p-4">
                      <p className="mb-3 text-sm font-extrabold text-brand-navy">Thẻ {j + 1}</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <PairField
                          label="Tiêu đề thẻ"
                          value={card.title}
                          onChange={(title) => setBenefit(j, { title })}
                        />
                        <PairField
                          label="Mô tả"
                          value={card.desc}
                          multiline
                          onChange={(desc) => setBenefit(j, { desc })}
                        />
                      </div>
                      <button
                        type="button"
                        className="mt-2 text-xs font-bold text-muted underline-offset-2 hover:text-primary hover:underline"
                        onClick={() => setBenefit(j, DEFAULT_BENEFITS[j])}
                      >
                        Khôi phục chữ gốc
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}

              {section.cards === "programs" ? (
                <div className="mt-5 space-y-4">
                  {state.programs.map((card, j) => (
                    <div key={j} className="rounded-[3px] border border-dashed border-border p-4">
                      <p className="mb-3 text-sm font-extrabold text-brand-navy">Thẻ ngành {j + 1}</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <PairField label="Tên ngành" value={card.name} onChange={(name) => setProgram(j, { name })} />
                        <PairField
                          label="Câu giới thiệu"
                          value={card.promise}
                          multiline
                          onChange={(promise) => setProgram(j, { promise })}
                        />
                        <PairField
                          label="Dòng lương / điểm nhấn"
                          value={card.salary}
                          onChange={(salary) => setProgram(j, { salary })}
                        />
                        <ImageField
                          label="Ảnh thẻ"
                          value={card.image}
                          fallback={programDefaults[j]?.image}
                          onChange={(image) => setProgram(j, { image })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {section.cards === "subjects" ? (
                <div className="mt-5 space-y-6">
                  {state.subjects.map((row, r) => (
                    <div key={row.track} className="rounded-[3px] border border-dashed border-border p-4">
                      <p className="mb-3 text-sm font-extrabold text-brand-navy">Dòng {r + 1}</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <PairField label="Tên dòng (ngành)" value={row.label} onChange={(label) => setSubjectRow(r, { label })} />
                      </div>
                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        {row.items.map((card, i) => (
                          <div key={i} className="space-y-3 rounded-[3px] bg-mist p-3">
                            <p className="text-xs font-extrabold uppercase tracking-wide text-muted">Môn {i + 1}</p>
                            <PairField
                              label="Tên môn"
                              value={card.title}
                              onChange={(title) => setSubject(r, i, { title })}
                            />
                            <Field label="Mã & cấp độ (vd. Unit 1 · Level 4)">
                              <input
                                className={inputClass}
                                value={card.unit}
                                onChange={(e) => setSubject(r, i, { unit: e.target.value })}
                              />
                            </Field>
                            <ImageField
                              label="Ảnh môn"
                              value={card.image}
                              fallback={DEFAULT_SUBJECT_ROWS[r]?.items[i]?.image}
                              onChange={(image) => setSubject(r, i, { image })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </AdminCard>
          </section>
        ))}
      </div>

      <div className="sticky bottom-0 z-30 -mx-4 mt-6 border-t border-border bg-white/95 backdrop-blur md:mx-0 md:rounded-t-[3px] md:border-x">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p
            role="status"
            className={cn(
              "text-sm font-semibold",
              notice?.tone === "error" ? "text-red-700" : dirty ? "text-brand-navy" : "text-muted",
            )}
          >
            {notice?.tone === "error"
              ? notice.text
              : dirty
                ? "Có thay đổi chưa lưu."
                : (notice?.text ?? "Chưa có thay đổi.")}
          </p>
          <Button type="button" onClick={save} disabled={pending || !dirty}>
            {pending ? "Đang lưu…" : "Lưu trang chủ"}
          </Button>
        </div>
      </div>
    </div>
  )
}
