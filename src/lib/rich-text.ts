import "server-only"
import sanitizeHtml from "sanitize-html"

const COLOR = [/^#[0-9a-f]{3,8}$/i, /^rgba?\(\s*[\d.\s,%]+\)$/i, /^var\(--tt-[\w-]+\)$/]
const LENGTH = [/^\d+(\.\d+)?(px|em|rem|%)$/]

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "h1", "h2", "h3", "h4", "h5", "h6",
    "strong", "b", "em", "i", "u", "s", "del", "sub", "sup", "mark", "span", "code", "pre",
    "blockquote", "hr", "ul", "ol", "li", "a", "img", "figure", "figcaption",
    "table", "colgroup", "col", "thead", "tbody", "tr", "th", "td",
    "div", "iframe",
  ],
  allowedAttributes: {
    "*": ["style"],
    a: ["href", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height"],
    mark: ["data-color"],
    ol: ["start", "type"],
    col: ["span", "width"],
    th: ["colspan", "rowspan", "colwidth"],
    td: ["colspan", "rowspan", "colwidth"],
    div: ["data-youtube-video"],
    iframe: ["src", "width", "height", "allowfullscreen", "allow", "frameborder", "title"],
  },
  allowedStyles: {
    "*": {
      color: COLOR,
      "background-color": COLOR,
      "text-align": [/^(left|right|center|justify)$/],
      "font-size": LENGTH,
      "font-family": [/^[\w\s,'"-]+$/],
      "line-height": [/^\d+(\.\d+)?(px|em|rem|%)?$/],
      width: LENGTH,
      "min-width": LENGTH,
      height: LENGTH,
    },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "youtube.com"],
  exclusiveFilter: (frame) => frame.tag === "iframe" && !frame.attribs.src,
  transformTags: {
    a: (tagName, attribs) => {
      const external = /^https?:\/\//i.test(attribs.href ?? "")
      return {
        tagName,
        attribs: external ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : attribs,
      }
    },
  },
}

export function sanitizeRichHtml(html: unknown): string {
  if (typeof html !== "string" || !html.trim()) return ""
  return sanitizeHtml(html, OPTIONS)
}

/** Columns edited with the rich text editor, per CMS table. */
export const RICH_TEXT_FIELDS: Partial<Record<string, readonly string[]>> = {
  posts: ["body", "body_vi", "body_en"],
  courses: ["description", "description_vi", "description_en"],
}
