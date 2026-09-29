function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

/** Legacy CMS fields hold plain text; keep their line breaks when shown as HTML. */
export function toEditorHtml(value: unknown): string {
  const text = typeof value === "string" ? value.trim() : ""
  if (!text) return ""
  if (/<[a-z][\s\S]*>/i.test(text)) return text
  return text
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replaceAll("\n", "<br>")}</p>`)
    .join("")
}
