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
    id: "leads",
    label: "Tuyển sinh",
    items: [
      { href: "/admin/ho-so", label: "Hồ sơ & đăng ký", hint: "Xét tuyển · học bổng · liên hệ" },
      { href: "/admin/bai-test", label: "Bài test IELTS", hint: "Điểm placement và bài làm" },
    ],
  },
  {
    id: "site",
    label: "Trang chủ & thương hiệu",
    items: [
      { href: "/admin/trang-chu", label: "Nội dung trang chủ", hint: "Mọi chữ và ảnh, theo từng khối" },
      { href: "/admin/cai-dat", label: "Cài đặt & banner", hint: "Banner đầu trang, liên hệ, Facebook/TikTok" },
      { href: "/admin/seo", label: "SEO", hint: "Title, mô tả, sitemap, Google" },
      { href: "/admin/media", label: "Thư viện ảnh / gallery", hint: "Upload, caption, featured" },
      { href: "/admin/tai-lieu", label: "Tài liệu tải về" },
    ],
  },
  {
    id: "academic",
    label: "Đào tạo & lộ trình",
    items: [
      { href: "/admin/chuong-trinh", label: "Chương trình" },
      { href: "/admin/trang-chu#khoi-subjects", label: "Môn học", hint: "2 dòng môn học trên trang chủ" },
      { href: "/admin/lo-trinh", label: "Lộ trình quốc tế", hint: "Khối lộ trình trên trang chủ" },
      { href: "/admin/truong-btec", label: "Hệ thống BTEC", hint: "Danh sách đại học đối tác" },
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
    id: "system",
    label: "Hệ thống",
    items: [{ href: "/admin/tai-khoan", label: "Tài khoản quản trị", hint: "Người dùng, phân quyền, mật khẩu" }],
  },
]

/** Flat list (legacy helpers / redirects) */
export const ADMIN_NAV = ADMIN_NAV_GROUPS.flatMap((g) => g.items)
