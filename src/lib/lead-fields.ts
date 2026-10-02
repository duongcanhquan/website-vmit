type L = { vi: string; en: string }
type Option = { value: string; label: L }

export type LeadTable = "admission_applications" | "scholarship_leads" | "contact_submissions"

export type LeadStatus = "new" | "read" | "contacted" | "enrolled" | "archived"

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Mới",
  read: "Đã xem",
  contacted: "Đã liên hệ",
  enrolled: "Đã nhập học",
  archived: "Lưu trữ",
}

export const LEAD_STATUS_FLOW: Record<LeadTable, LeadStatus[]> = {
  admission_applications: ["new", "contacted", "enrolled", "archived"],
  scholarship_leads: ["new", "contacted", "archived"],
  contact_submissions: ["new", "contacted", "archived"],
}

export const PROGRAM_OPTIONS: Option[] = [
  { value: "Data Analytics", label: { vi: "Data Analytics · Phân tích dữ liệu", en: "Data Analytics" } },
  { value: "Business Management", label: { vi: "Business Management · Quản trị", en: "Business Management" } },
  { value: "Cần tư vấn", label: { vi: "Chưa chọn, cần tư vấn thêm", en: "Not sure yet, I need advice" } },
]

export const GENDER_OPTIONS: Option[] = [
  { value: "Nam", label: { vi: "Nam", en: "Male" } },
  { value: "Nữ", label: { vi: "Nữ", en: "Female" } },
  { value: "Khác", label: { vi: "Khác", en: "Other" } },
]

export const ADMISSION_METHOD_OPTIONS: Option[] = [
  { value: "Học bạ THPT", label: { vi: "Xét học bạ THPT", en: "High school transcript" } },
  { value: "Điểm thi tốt nghiệp THPT", label: { vi: "Điểm thi tốt nghiệp THPT", en: "National high school graduation exam score" } },
  { value: "Chứng chỉ tiếng Anh quốc tế", label: { vi: "Chứng chỉ tiếng Anh quốc tế", en: "International English certificate" } },
  { value: "Khác", label: { vi: "Khác", en: "Other" } },
]

export const ENGLISH_LEVEL_OPTIONS: Option[] = [
  { value: "Chưa có chứng chỉ", label: { vi: "Chưa có chứng chỉ", en: "No certificate yet" } },
  { value: "Dưới IELTS 5.0", label: { vi: "Dưới IELTS 5.0 (hoặc tương đương)", en: "Below IELTS 5.0 (or equivalent)" } },
  { value: "IELTS 5.0–5.5", label: { vi: "IELTS 5.0–5.5", en: "IELTS 5.0–5.5" } },
  { value: "IELTS 6.0+", label: { vi: "IELTS 6.0 trở lên", en: "IELTS 6.0 or higher" } },
]

export const CAMPUS_OPTIONS: Option[] = [
  { value: "168 Trịnh Văn Bô", label: { vi: "Cơ sở 168 Trịnh Văn Bô", en: "168 Trinh Van Bo campus" } },
  { value: "39 Hoàng Quán Chi", label: { vi: "Cơ sở 39 Hoàng Quán Chi", en: "39 Hoang Quan Chi campus" } },
  { value: "Chưa quyết định", label: { vi: "Chưa quyết định", en: "Not decided" } },
]

export const SOURCE_OPTIONS: Option[] = [
  { value: "Facebook", label: { vi: "Facebook", en: "Facebook" } },
  { value: "TikTok", label: { vi: "TikTok", en: "TikTok" } },
  { value: "Google", label: { vi: "Tìm kiếm Google", en: "Google search" } },
  { value: "Bạn bè / người thân", label: { vi: "Bạn bè / người thân", en: "Friends or family" } },
  { value: "Trường THPT / thầy cô", label: { vi: "Trường THPT / thầy cô", en: "School or teacher" } },
  { value: "Sự kiện / hội thảo", label: { vi: "Sự kiện / hội thảo", en: "Event or seminar" } },
  { value: "Khác", label: { vi: "Khác", en: "Other" } },
]

/** Extra admission fields stored in `admission_applications.details`, in display order. */
export const ADMISSION_DETAIL_FIELDS = [
  { key: "date_of_birth", label: "Ngày sinh" },
  { key: "gender", label: "Giới tính" },
  { key: "province", label: "Tỉnh / thành phố" },
  { key: "high_school", label: "Trường THPT" },
  { key: "graduation_year", label: "Năm tốt nghiệp THPT" },
  { key: "admission_method", label: "Hình thức xét tuyển" },
  { key: "score", label: "Điểm TB học bạ / điểm thi" },
  { key: "english_level", label: "Trình độ tiếng Anh" },
  { key: "campus", label: "Cơ sở mong muốn" },
  { key: "parent_name", label: "Phụ huynh" },
  { key: "parent_phone", label: "SĐT phụ huynh" },
  { key: "source", label: "Biết VMIT qua" },
  { key: "note", label: "Ghi chú của thí sinh" },
] as const

export type AdmissionDetailKey = (typeof ADMISSION_DETAIL_FIELDS)[number]["key"]
export type AdmissionDetails = Partial<Record<AdmissionDetailKey, string>>

export function graduationYears(now = new Date()) {
  const year = now.getFullYear()
  return [year + 1, year, year - 1, year - 2, year - 3].map(String)
}
