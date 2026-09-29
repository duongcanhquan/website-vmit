export const SITE = {
  name: "VMIT",
  brandTagline: "Journey to work excellence",
  heroSlogan: "VMIT – Subway to the World",
  heroHeadline: "Cử nhân thực hành Anh Quốc ngay tại Việt Nam",
  hotlineDisplay: "[VMIT: Hotline 24/7]",
  hotlineHref: "tel:",
  admissionYear: "2026",
} as const

export const ROUTES = {
  home: "/",
  about: "/ve-vmit",
  programs: "/chuong-trinh",
  pathway: "/lo-trinh",
  tuition: "/hoc-phi",
  apply: "/xet-tuyen",
  studentLife: "/#doi-song",
} as const

export type NavItem = {
  href: string
  label: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: ROUTES.about, label: "Về VMIT" },
  { href: ROUTES.programs, label: "Ngành học" },
  { href: ROUTES.pathway, label: "Lộ trình" },
  { href: ROUTES.tuition, label: "Học phí" },
  { href: ROUTES.studentLife, label: "Đời sống SV" },
] as const

export const HERO_COUNTERS = [
  { value: "2", label: "bằng chính quy" },
  { value: "70%", label: "tiết kiệm chi phí" },
  { value: "100%", label: "cam kết việc làm khối FDI" },
] as const

export const TRUST_PARTNERS = [
  "Pearson Education UK",
  "Bộ LĐ-TB&XH",
  "EQuest Group",
  "Keiser University (USA)",
  "FPT Software",
  "Viettel",
  "Samsung",
  "CMC",
] as const

export const PILLARS = [
  {
    id: "dual-degree",
    title: "Bằng cấp Song tịch danh giá",
    description:
      "Pearson BTEC HND Level 5 (Anh Quốc) kết hợp bằng Cao đẳng Quốc gia APC — hai văn bằng chính quy trong một lộ trình.",
    featured: true,
  },
  {
    id: "programs",
    title: "Ngành học thực hành",
    description: "BTEC Data Analytics & BTEC Business Management + Foundation IELTS.",
    featured: false,
  },
  {
    id: "pathway",
    title: "Cầu nối quốc tế",
    description: "Chuyển tiếp 2+1 / 2+2 tới Keiser (Mỹ), Anh và Úc.",
    featured: false,
  },
  {
    id: "career",
    title: "Việc làm khối FDI",
    description: "Cam kết định hướng nghề nghiệp gắn doanh nghiệp đối tác.",
    featured: false,
  },
] as const
