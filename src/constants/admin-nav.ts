export type AdminNavItem = {
  href: string
  label: string
  hint?: string
}

export type AdminNavGroup = {
  id: string
  label: string
  items: AdminNavItem[]
}

/** Nhóm quản trị rõ ràng: nội dung trang · media · đào tạo · hồ sơ */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "overview",
    label: "Tổng quan",
    items: [{ href: "/admin", label: "Bảng điều khiển", hint: "Số liệu & lối tắt" }],
  },
  {
    id: "site",
    label: "Trang chủ & thương hiệu",
    items: [
      { href: "/admin/cai-dat", label: "Cài đặt & banner", hint: "Ảnh hero, headline VI/EN" },
      { href: "/admin/media", label: "Thư viện ảnh / gallery", hint: "Upload, caption, featured" },
      { href: "/admin/tai-lieu", label: "Tài liệu tải về" },
    ],
  },
  {
    id: "academic",
    label: "Đào tạo & lộ trình",
    items: [
      { href: "/admin/chuong-trinh", label: "Chương trình" },
      { href: "/admin/mon-hoc", label: "Môn học", hint: "Lưới MÔN HỌC trang chủ" },
      { href: "/admin/lo-trinh", label: "Lộ trình quốc tế" },
      { href: "/admin/tru-cot", label: "Trụ đột phá & số liệu" },
      { href: "/admin/hoc-phi", label: "Học phí" },
    ],
  },
  {
    id: "trust",
    label: "Uy tín & nội dung",
    items: [
      { href: "/admin/doi-tac", label: "Đối tác" },
      { href: "/admin/doi-ngu", label: "Đội ngũ" },
      { href: "/admin/bai-viet", label: "Tin tức / Blog", hint: "OUR BLOG trên trang chủ" },
      { href: "/admin/faq", label: "FAQ" },
      { href: "/admin/danh-gia", label: "Đánh giá" },
    ],
  },
  {
    id: "leads",
    label: "Tuyển sinh",
    items: [{ href: "/admin/ho-so", label: "Hồ sơ & form", hint: "Xét tuyển · học bổng · liên hệ" }],
  },
]

/** Flat list (legacy helpers / redirects) */
export const ADMIN_NAV = ADMIN_NAV_GROUPS.flatMap((g) => g.items)
