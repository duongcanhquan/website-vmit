"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Color, FontFamily, FontSize, TextStyle } from "@tiptap/extension-text-style"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import { TableKit } from "@tiptap/extension-table"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import Youtube from "@tiptap/extension-youtube"
import { Placeholder } from "@tiptap/extensions"
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Code2,
  Eraser,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Subscript as SubIcon,
  Superscript as SupIcon,
  Table2,
  Underline as UnderlineIcon,
  Undo2,
  Youtube as YoutubeIcon,
} from "lucide-react"
import { MediaPicker } from "@/components/admin/media-picker"
import { toEditorHtml } from "@/lib/plain-text-html"
import { cn } from "@/lib/utils"

const FONT_FAMILIES = [
  { label: "Mặc định", value: "" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
]

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px", "48px"]

const TEXT_COLORS = [
  "#1c1c1c", "#666666", "#999999", "#ffffff",
  "#1eb2a6", "#0f766e", "#1d3a8a", "#2563eb",
  "#d7263d", "#ea580c", "#f59e0b", "#16a34a",
]

const HIGHLIGHT_COLORS = ["#fef08a", "#bbf7d0", "#ccfbf1", "#bfdbfe", "#e9d5ff", "#fecaca", "#fed7aa", "#e5e7eb"]

const MAX_IMAGE_WIDTH = 1920

async function compressImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width)
  if (scale === 1 && file.size < 400_000) {
    bitmap.close()
    return file
  }
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85))
  if (!blob || blob.size >= file.size) return file
  return new File([blob], `${file.name.replace(/\.\w+$/, "")}.webp`, { type: "image/webp" })
}

async function uploadImage(file: File): Promise<string> {
  const optimized = await compressImage(file)
  const form = new FormData()
  form.append("file", optimized)
  form.append("folder", "posts")
  form.append("kind", "other")
  form.append("alt_vi", file.name)
  form.append("is_published", "false")
  const res = await fetch("/api/admin/upload", { method: "POST", body: form })
  const json = (await res.json().catch(() => ({}))) as { asset?: { url?: string }; error?: string }
  if (!res.ok || !json.asset?.url) throw new Error(json.error || "Tải ảnh thất bại")
  return json.asset.url
}

function imageFiles(list: FileList | null | undefined): File[] {
  return Array.from(list ?? []).filter((file) => file.type.startsWith("image/"))
}

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Nhập nội dung bài viết…" }: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sourceMode, setSourceMode] = useState(false)
  const [source, setSource] = useState("")
  const insertFilesRef = useRef<(files: File[], pos?: number) => void>(() => {})

  const editor = useEditor({
    immediatelyRender: false,
    content: toEditorHtml(value),
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: { target: null, rel: null },
        },
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Subscript,
      Superscript,
      Image.configure({
        resize: {
          enabled: true,
          directions: ["top-left", "top-right", "bottom-left", "bottom-right"],
          minWidth: 80,
          alwaysPreserveAspectRatio: true,
        },
      }),
      TableKit.configure({ table: { resizable: true } }),
      Youtube.configure({ nocookie: true, width: 640, height: 360 }),
      Placeholder.configure({ placeholder }),
    ],
    editorProps: {
      attributes: {
        class: "rich-content prose prose-neutral max-w-none min-h-[360px] px-5 py-4 outline-none",
      },
      handlePaste: (view, event) => {
        const files = imageFiles(event.clipboardData?.files)
        if (!files.length) return false
        insertFilesRef.current(files)
        return true
      },
      handleDrop: (view, event) => {
        const files = imageFiles(event.dataTransfer?.files)
        if (!files.length) return false
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
        insertFilesRef.current(files, pos)
        return true
      },
    },
    onUpdate: ({ editor: current }) => {
      onChange(current.isEmpty ? "" : current.getHTML())
    },
  })

  useEffect(() => {
    insertFilesRef.current = (files, pos) => {
      if (!editor) return
      setUploading(true)
      setError(null)
      void (async () => {
        try {
          for (const file of files) {
            const src = await uploadImage(file)
            const alt = file.name.replace(/\.\w+$/, "")
            const chain = editor.chain().focus()
            if (typeof pos === "number") {
              chain.insertContentAt(pos, { type: "image", attrs: { src, alt } }).run()
            } else {
              chain.setImage({ src, alt }).run()
            }
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Tải ảnh thất bại")
        } finally {
          setUploading(false)
        }
      })()
    }
  }, [editor])

  function toggleSource() {
    if (!editor) return
    if (sourceMode) {
      editor.commands.setContent(source, { emitUpdate: true })
    } else {
      setSource(editor.getHTML())
    }
    setSourceMode(!sourceMode)
  }

  return (
    <div className="rich-editor overflow-hidden rounded-[3px] border border-border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
      <Toolbar
        editor={editor}
        uploading={uploading}
        sourceMode={sourceMode}
        onToggleSource={toggleSource}
        onPickImages={(files) => insertFilesRef.current(files)}
      />
      {error ? <p className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs font-medium text-red-700">{error}</p> : null}
      {sourceMode ? (
        <textarea
          className="block min-h-[360px] w-full resize-y px-5 py-4 font-mono text-xs leading-relaxed outline-none"
          value={source}
          onChange={(e) => {
            setSource(e.target.value)
            onChange(e.target.value)
          }}
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  )
}

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-[3px] text-brand-navy transition hover:bg-mist disabled:cursor-not-allowed disabled:opacity-35",
        active && "bg-primary/15 text-primary hover:bg-primary/20",
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span aria-hidden className="mx-1 h-6 w-px bg-border" />
}

function Menu({
  label,
  icon,
  disabled,
  children,
}: {
  label: string
  icon: ReactNode
  disabled?: boolean
  children: (close: () => void) => ReactNode
}) {
  const ref = useRef<HTMLDetailsElement>(null)
  const close = () => {
    if (ref.current) ref.current.open = false
  }
  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      if (ref.current?.open && !ref.current.contains(event.target as Node)) close()
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])
  if (disabled) {
    return (
      <button
        type="button"
        title={label}
        aria-label={label}
        disabled
        className="inline-flex h-8 cursor-not-allowed items-center rounded-[3px] px-1.5 text-brand-navy opacity-35"
      >
        {icon}
      </button>
    )
  }
  return (
    <details ref={ref} className="relative">
      <summary
        title={label}
        aria-label={label}
        className="inline-flex h-8 cursor-pointer list-none items-center gap-0.5 rounded-[3px] px-1.5 text-brand-navy transition hover:bg-mist [&::-webkit-details-marker]:hidden"
      >
        {icon}
      </summary>
      <div className="absolute left-0 top-9 z-30 min-w-[180px] rounded-[3px] border border-border bg-white p-2 shadow-lg">
        {children(close)}
      </div>
    </details>
  )
}

function ColorMenu({
  label,
  icon,
  colors,
  current,
  disabled,
  onPick,
  onClear,
}: {
  label: string
  icon: ReactNode
  colors: string[]
  current: string
  disabled?: boolean
  onPick: (color: string) => void
  onClear: () => void
}) {
  return (
    <Menu
      label={label}
      disabled={disabled}
      icon={
        <span className="flex flex-col items-center">
          {icon}
          <span className="mt-0.5 h-1 w-4 rounded-full border border-border" style={{ background: current || "transparent" }} />
        </span>
      }
    >
      {(close) => (
        <div className="w-[176px]">
          <div className="grid grid-cols-4 gap-1.5">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(color)
                  close()
                }}
                className="size-8 rounded-[3px] border border-border transition hover:scale-110"
                style={{ background: color }}
              />
            ))}
          </div>
          <label className="mt-2 flex items-center justify-between gap-2 text-xs font-semibold text-muted">
            Màu khác
            <input
              type="color"
              value={/^#[0-9a-f]{6}$/i.test(current) ? current : "#1eb2a6"}
              onChange={(e) => onPick(e.target.value)}
              className="h-7 w-10 cursor-pointer rounded border border-border"
            />
          </label>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onClear()
              close()
            }}
            className="mt-2 w-full rounded-[3px] border border-border py-1 text-xs font-semibold text-muted hover:bg-mist"
          >
            Bỏ màu
          </button>
        </div>
      )}
    </Menu>
  )
}

const selectClass =
  "h-8 rounded-[3px] border border-border bg-white px-1.5 text-xs font-semibold text-brand-navy outline-none focus:border-primary"

function Toolbar({
  editor,
  uploading,
  sourceMode,
  onToggleSource,
  onPickImages,
}: {
  editor: Editor | null
  uploading: boolean
  sourceMode: boolean
  onToggleSource: () => void
  onPickImages: (files: File[]) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [picking, setPicking] = useState(false)
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      if (!e) return null
      const style = e.getAttributes("textStyle") as { color?: string; fontFamily?: string; fontSize?: string }
      return {
        block: e.isActive("heading", { level: 2 })
          ? "h2"
          : e.isActive("heading", { level: 3 })
            ? "h3"
            : e.isActive("heading", { level: 4 })
              ? "h4"
              : "p",
        bold: e.isActive("bold"),
        italic: e.isActive("italic"),
        underline: e.isActive("underline"),
        strike: e.isActive("strike"),
        sub: e.isActive("subscript"),
        sup: e.isActive("superscript"),
        bullet: e.isActive("bulletList"),
        ordered: e.isActive("orderedList"),
        quote: e.isActive("blockquote"),
        link: e.isActive("link"),
        table: e.isActive("table"),
        align: (["center", "right", "justify"] as const).find((a) => e.isActive({ textAlign: a })) ?? "left",
        color: style.color ?? "",
        highlight: (e.getAttributes("highlight") as { color?: string }).color ?? "",
        fontFamily: style.fontFamily ?? "",
        fontSize: style.fontSize ?? "",
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
      }
    },
  })

  const disabled = !editor || sourceMode
  const run = (fn: (e: Editor) => void) => () => {
    if (editor) fn(editor)
  }

  function setLink() {
    if (!editor) return
    const previous = (editor.getAttributes("link") as { href?: string }).href ?? ""
    const url = window.prompt("Nhập đường link (để trống để bỏ link):", previous || "https://")
    if (url === null) return
    const chain = editor.chain().focus().extendMarkRange("link")
    if (!url.trim() || url.trim() === "https://") {
      chain.unsetLink().run()
      return
    }
    chain.setLink({ href: url.trim() }).run()
  }

  function insertImageUrl() {
    if (!editor) return
    const url = window.prompt("Dán link ảnh (https://…):", "https://")
    if (!url || url === "https://") return
    editor.chain().focus().setImage({ src: url.trim() }).run()
  }

  function insertYoutube() {
    if (!editor) return
    const url = window.prompt("Dán link video YouTube:", "https://www.youtube.com/watch?v=")
    if (!url) return
    editor.chain().focus().setYoutubeVideo({ src: url.trim() }).run()
  }

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-0.5 border-b border-border bg-mist/80 px-2 py-1.5 backdrop-blur">
      <ToolbarButton label="Hoàn tác" disabled={disabled || !state?.canUndo} onClick={run((e) => e.chain().focus().undo().run())}>
        <Undo2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Làm lại" disabled={disabled || !state?.canRedo} onClick={run((e) => e.chain().focus().redo().run())}>
        <Redo2 className="size-4" />
      </ToolbarButton>
      <Divider />

      <select
        aria-label="Kiểu đoạn"
        className={selectClass}
        disabled={disabled}
        value={state?.block ?? "p"}
        onChange={(event) => {
          if (!editor) return
          const v = event.target.value
          if (v === "p") editor.chain().focus().setParagraph().run()
          else editor.chain().focus().setHeading({ level: Number(v.slice(1)) as 2 | 3 | 4 }).run()
        }}
      >
        <option value="p">Đoạn văn</option>
        <option value="h2">Tiêu đề lớn</option>
        <option value="h3">Tiêu đề vừa</option>
        <option value="h4">Tiêu đề nhỏ</option>
      </select>
      <select
        aria-label="Phông chữ"
        className={cn(selectClass, "w-[118px]")}
        disabled={disabled}
        value={state?.fontFamily ?? ""}
        onChange={(event) => {
          if (!editor) return
          const v = event.target.value
          if (v) editor.chain().focus().setFontFamily(v).run()
          else editor.chain().focus().unsetFontFamily().run()
        }}
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font.label} value={font.value} style={{ fontFamily: font.value || undefined }}>
            {font.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Cỡ chữ"
        className={cn(selectClass, "w-[72px]")}
        disabled={disabled}
        value={state?.fontSize ?? ""}
        onChange={(event) => {
          if (!editor) return
          const v = event.target.value
          if (v) editor.chain().focus().setFontSize(v).run()
          else editor.chain().focus().unsetFontSize().run()
        }}
      >
        <option value="">Cỡ</option>
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size.replace("px", "")}
          </option>
        ))}
      </select>
      <Divider />

      <ToolbarButton label="In đậm (Ctrl+B)" active={state?.bold} disabled={disabled} onClick={run((e) => e.chain().focus().toggleBold().run())}>
        <Bold className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="In nghiêng (Ctrl+I)" active={state?.italic} disabled={disabled} onClick={run((e) => e.chain().focus().toggleItalic().run())}>
        <Italic className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Gạch chân (Ctrl+U)" active={state?.underline} disabled={disabled} onClick={run((e) => e.chain().focus().toggleUnderline().run())}>
        <UnderlineIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Gạch ngang" active={state?.strike} disabled={disabled} onClick={run((e) => e.chain().focus().toggleStrike().run())}>
        <Strikethrough className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Chỉ số dưới" active={state?.sub} disabled={disabled} onClick={run((e) => e.chain().focus().toggleSubscript().run())}>
        <SubIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Chỉ số trên" active={state?.sup} disabled={disabled} onClick={run((e) => e.chain().focus().toggleSuperscript().run())}>
        <SupIcon className="size-4" />
      </ToolbarButton>
      <ColorMenu
        label="Màu chữ"
        icon={<Baseline className="size-4" />}
        colors={TEXT_COLORS}
        current={state?.color ?? ""}
        disabled={disabled}
        onPick={(color) => editor?.chain().focus().setColor(color).run()}
        onClear={() => editor?.chain().focus().unsetColor().run()}
      />
      <ColorMenu
        label="Tô nền chữ"
        icon={<Highlighter className="size-4" />}
        colors={HIGHLIGHT_COLORS}
        current={state?.highlight ?? ""}
        disabled={disabled}
        onPick={(color) => editor?.chain().focus().setHighlight({ color }).run()}
        onClear={() => editor?.chain().focus().unsetHighlight().run()}
      />
      <Divider />

      <ToolbarButton label="Căn trái" active={state?.align === "left"} disabled={disabled} onClick={run((e) => e.chain().focus().setTextAlign("left").run())}>
        <AlignLeft className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Căn giữa" active={state?.align === "center"} disabled={disabled} onClick={run((e) => e.chain().focus().setTextAlign("center").run())}>
        <AlignCenter className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Căn phải" active={state?.align === "right"} disabled={disabled} onClick={run((e) => e.chain().focus().setTextAlign("right").run())}>
        <AlignRight className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Căn đều hai bên" active={state?.align === "justify"} disabled={disabled} onClick={run((e) => e.chain().focus().setTextAlign("justify").run())}>
        <AlignJustify className="size-4" />
      </ToolbarButton>
      <Divider />

      <ToolbarButton label="Danh sách chấm" active={state?.bullet} disabled={disabled} onClick={run((e) => e.chain().focus().toggleBulletList().run())}>
        <List className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Danh sách số" active={state?.ordered} disabled={disabled} onClick={run((e) => e.chain().focus().toggleOrderedList().run())}>
        <ListOrdered className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Trích dẫn" active={state?.quote} disabled={disabled} onClick={run((e) => e.chain().focus().toggleBlockquote().run())}>
        <Quote className="size-4" />
      </ToolbarButton>
      <ToolbarButton label="Đường kẻ ngang" disabled={disabled} onClick={run((e) => e.chain().focus().setHorizontalRule().run())}>
        <Minus className="size-4" />
      </ToolbarButton>
      <Divider />

      <ToolbarButton label="Chèn / sửa link" active={state?.link} disabled={disabled} onClick={setLink}>
        <Link2 className="size-4" />
      </ToolbarButton>
      <Menu label="Chèn ảnh" icon={<ImagePlus className="size-4" />} disabled={disabled}>
        {(close) => (
          <div className="flex flex-col text-sm">
            <button
              type="button"
              className="rounded-[3px] px-2 py-1.5 text-left font-medium hover:bg-mist"
              onClick={() => {
                fileRef.current?.click()
                close()
              }}
            >
              Tải ảnh từ máy…
            </button>
            <button
              type="button"
              className="rounded-[3px] px-2 py-1.5 text-left font-medium hover:bg-mist"
              onClick={() => {
                setPicking(true)
                close()
              }}
            >
              Chọn từ thư viện ảnh…
            </button>
            <button
              type="button"
              className="rounded-[3px] px-2 py-1.5 text-left font-medium hover:bg-mist"
              onClick={() => {
                insertImageUrl()
                close()
              }}
            >
              Chèn ảnh từ link…
            </button>
            <p className="px-2 pt-1 text-[11px] leading-snug text-muted">
              Có thể kéo thả hoặc dán ảnh trực tiếp vào bài. Kéo góc ảnh để đổi kích thước.
            </p>
          </div>
        )}
      </Menu>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          const files = imageFiles(event.target.files)
          if (files.length) onPickImages(files)
          event.target.value = ""
        }}
      />
      <MediaPicker
        open={picking}
        onClose={() => setPicking(false)}
        onPick={(src) => editor?.chain().focus().setImage({ src }).run()}
      />
      <ToolbarButton label="Chèn video YouTube" disabled={disabled} onClick={insertYoutube}>
        <YoutubeIcon className="size-4" />
      </ToolbarButton>
      <Menu label="Bảng" icon={<Table2 className={cn("size-4", state?.table && "text-primary")} />} disabled={disabled}>
        {(close) => {
          const item = (label: string, fn: (e: Editor) => void, enabled = true) => (
            <button
              key={label}
              type="button"
              disabled={!enabled}
              className="rounded-[3px] px-2 py-1.5 text-left text-sm font-medium hover:bg-mist disabled:opacity-35"
              onClick={() => {
                if (editor) fn(editor)
                close()
              }}
            >
              {label}
            </button>
          )
          const inTable = Boolean(state?.table)
          return (
            <div className="flex flex-col">
              {item("Chèn bảng 3 × 3", (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
              {item("Thêm hàng bên dưới", (e) => e.chain().focus().addRowAfter().run(), inTable)}
              {item("Thêm cột bên phải", (e) => e.chain().focus().addColumnAfter().run(), inTable)}
              {item("Xóa hàng", (e) => e.chain().focus().deleteRow().run(), inTable)}
              {item("Xóa cột", (e) => e.chain().focus().deleteColumn().run(), inTable)}
              {item("Gộp / tách ô", (e) => e.chain().focus().mergeOrSplit().run(), inTable)}
              {item("Xóa bảng", (e) => e.chain().focus().deleteTable().run(), inTable)}
            </div>
          )
        }}
      </Menu>
      <Divider />

      <ToolbarButton
        label="Xóa định dạng"
        disabled={disabled}
        onClick={run((e) => e.chain().focus().unsetAllMarks().clearNodes().run())}
      >
        <Eraser className="size-4" />
      </ToolbarButton>
      <ToolbarButton label={sourceMode ? "Quay lại soạn thảo" : "Xem mã HTML"} active={sourceMode} disabled={!editor} onClick={onToggleSource}>
        <Code2 className="size-4" />
      </ToolbarButton>
      {uploading ? <span className="ml-2 text-xs font-semibold text-primary">Đang tải ảnh…</span> : null}
    </div>
  )
}
