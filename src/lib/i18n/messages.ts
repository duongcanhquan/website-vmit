import type { MessageTree } from "@/lib/i18n/types"

export const messages: Record<"vi" | "en", MessageTree> = {
  vi: {
    nav: {
      about: "VMIT",
      programs: "Ngành học",
      pathway: "Lộ trình",
      subjects: "Môn học",
      btecSchools: "Trường BTEC",
      news: "Tin tức",
      tuition: "Học phí",
      studentLife: "Đời sống SV",
      apply: "Xét tuyển",
    },
    hero: {
      slogan: "Journey to work excellence",
      headline: "Học mọi thứ",
      support: "Cử nhân thực hành Anh Quốc ngay tại Việt Nam.",
      ctaExplore: "Xem hình ảnh",
      ctaScholarship: "Nhận học bổng",
      ctaApply: "Cổng xét tuyển",
    },
    common: {
      hotline: "0999999999",
      close: "Đóng",
      menu: "Menu",
    },
    trust: {
      label: "Đối tác & mạng lưới quốc tế",
    },
    pillars: {
      eyebrow: "4 trụ đột phá",
      title: "Vì sao chọn VMIT",
      counters: [
        { value: "2", label: "bằng chính quy" },
        { value: "70%", label: "tiết kiệm chi phí" },
        { value: "100%", label: "cam kết việc làm FDI" },
      ],
      items: [
        {
          id: "dual-degree",
          eyebrow: "Trụ 1 · Song bằng",
          title: "Bằng cấp song tịch danh giá",
          description:
            "Pearson BTEC HND Level 5 (Anh Quốc) kết hợp bằng Cao đẳng Quốc gia APC — hai văn bằng chính quy trong một lộ trình.",
          featured: true,
          chips: ["Pearson BTEC HND Level 5 — UK", "Bằng Cao đẳng Quốc gia APC"],
        },
        {
          id: "programs",
          eyebrow: "Trụ 2",
          title: "Ngành học thực hành",
          description: "BTEC Data Analytics & BTEC Business Management + Foundation IELTS.",
        },
        {
          id: "pathway",
          eyebrow: "Trụ 3",
          title: "Cầu nối quốc tế",
          description: "Chuyển tiếp 2+1 / 2+2 tới Keiser (Mỹ), Anh và Úc.",
        },
        {
          id: "career",
          eyebrow: "Trụ 4",
          title: "Việc làm khối FDI",
          description: "Cam kết định hướng nghề nghiệp gắn doanh nghiệp đối tác.",
        },
      ],
    },
    programs: {
      eyebrow: "Chương trình",
      title: "Chương trình đào tạo",
      lead: "Hai ngành BTEC trọng điểm và Foundation IELTS — chuẩn Anh Quốc, học tại Việt Nam.",
      view: "Xem chương trình",
      items: [
        {
          title: "BTEC Data Analytics",
          description: "Phân tích dữ liệu thực chiến với chuẩn Pearson HND.",
        },
        {
          title: "BTEC Business Management",
          description: "Quản trị doanh nghiệp theo khung giáo dục Anh Quốc.",
        },
        {
          title: "Foundation IELTS",
          description: "Nền tảng tiếng Anh học thuật trước khi vào chuyên ngành.",
        },
      ],
    },
    pathway: {
      eyebrow: "Lộ trình toàn cầu",
      title: "Lộ trình & bằng cấp",
      lead: "Song bằng tại chỗ và mạng lưới chuyển tiếp 2+1 / 2+2 tới Keiser University (Mỹ), Anh và Úc.",
      cta: "Xem lộ trình đầy đủ",
      steps: [
        { step: "01", title: "Foundation / IELTS", note: "Nền tảng học thuật" },
        { step: "02", title: "BTEC HND Level 5", note: "Song bằng VMIT · APC" },
        { step: "03", title: "Top-up quốc tế", note: "2+1 / 2+2 · UK · US · AU" },
      ],
    },
    tuition: {
      eyebrow: "Học phí & học bổng",
      title: "Vốn nhẹ – Bước xa",
      leadBefore: "Chính sách linh hoạt từ",
      leadAfter: "· quỹ học bổng nhân tài",
      cta: "Học phí & học bổng",
    },
    life: {
      eyebrow: "Đời sống sinh viên",
      title: "Không gian học & trải nghiệm",
      lead: "Campus, seminar, lab — xem qua hình ảnh.",
    },
    apply: {
      eyebrow: "Tuyển sinh",
      title: "Cổng xét tuyển trực tuyến",
      lead: "Form 3 bước · biên nhận tự động · mã theo dõi hồ sơ.",
      cta: "Bắt đầu xét tuyển",
    },
    scholarship: {
      eyebrow: "Học bổng",
      title: "Nhận học bổng",
      lead: "Form nhanh ~30 giây. Dữ liệu sẽ nối Supabase khi bật backend.",
      name: "Họ và tên",
      phone: "Số điện thoại",
      email: "Email (tuỳ chọn)",
      submit: "Đăng ký nhận tư vấn học bổng",
      success: "Đã ghi nhận (UI). [VMIT: xác nhận gửi server khi có API]",
    },
    footer: {
      nav: "Điều hướng",
      contact: "Liên hệ",
      rights: "All rights reserved.",
    },
  },
  en: {
    nav: {
      about: "VMIT",
      programs: "Programmes",
      pathway: "Pathway",
      subjects: "Subjects",
      btecSchools: "BTEC schools",
      news: "News",
      tuition: "Fees",
      studentLife: "Student life",
      apply: "Apply",
    },
    hero: {
      slogan: "Journey to work excellence",
      headline: "Learn anything",
      support: "A UK practice-based bachelor pathway in Vietnam.",
      ctaExplore: "See the visuals",
      ctaScholarship: "Get a scholarship",
      ctaApply: "Admissions portal",
    },
    trust: {
      label: "Partners & global network",
    },
    pillars: {
      eyebrow: "Four pillars",
      title: "Why choose VMIT",
      counters: [
        { value: "2", label: "recognised awards" },
        { value: "70%", label: "cost efficiency" },
        { value: "100%", label: "FDI career focus" },
      ],
      items: [
        {
          id: "dual-degree",
          eyebrow: "Pillar 1 · Dual award",
          title: "Prestigious dual qualifications",
          description:
            "Pearson BTEC HND Level 5 (UK) combined with the national APC college award — two formal credentials in one pathway.",
          featured: true,
          chips: ["Pearson BTEC HND Level 5 — UK", "National APC college award"],
        },
        {
          id: "programs",
          eyebrow: "Pillar 2",
          title: "Practice-led programmes",
          description: "BTEC Data Analytics & BTEC Business Management + IELTS Foundation.",
        },
        {
          id: "pathway",
          eyebrow: "Pillar 3",
          title: "International bridge",
          description: "2+1 / 2+2 progression to Keiser (USA), the UK and Australia.",
        },
        {
          id: "career",
          eyebrow: "Pillar 4",
          title: "FDI career outcomes",
          description: "Career guidance connected to partner enterprises.",
        },
      ],
    },
    programs: {
      eyebrow: "Programmes",
      title: "What you can study",
      lead: "Two flagship BTEC pathways plus IELTS Foundation — UK standards, studied in Vietnam.",
      view: "View programme",
      items: [
        {
          title: "BTEC Data Analytics",
          description: "Applied data practice aligned to Pearson HND standards.",
        },
        {
          title: "BTEC Business Management",
          description: "Business leadership framed by the UK education system.",
        },
        {
          title: "Foundation IELTS",
          description: "Academic English foundation before your specialist route.",
        },
      ],
    },
    pathway: {
      eyebrow: "Global pathway",
      title: "Pathway & awards",
      lead: "Dual awards on campus plus 2+1 / 2+2 progression to Keiser University (USA), the UK and Australia.",
      cta: "See the full pathway",
      steps: [
        { step: "01", title: "Foundation / IELTS", note: "Academic foundation" },
        { step: "02", title: "BTEC HND Level 5", note: "VMIT · APC dual award" },
        { step: "03", title: "International top-up", note: "2+1 / 2+2 · UK · US · AU" },
      ],
    },
    tuition: {
      eyebrow: "Fees & scholarships",
      title: "Light investment · Long runway",
      leadBefore: "Flexible plans from",
      leadAfter: "· talent scholarship fund",
      cta: "Fees & scholarships",
    },
    life: {
      eyebrow: "Campus life",
      title: "Spaces to learn and grow",
      lead: "Campus, seminars, labs — told through photography.",
    },
    apply: {
      eyebrow: "Admissions",
      title: "Online application portal",
      lead: "Three-step form · automatic receipt · application tracking code.",
      cta: "Start your application",
    },
    scholarship: {
      eyebrow: "Scholarship",
      title: "Request a scholarship",
      lead: "A ~30-second form. Data will connect to Supabase when backend is enabled.",
      name: "Full name",
      phone: "Phone number",
      email: "Email (optional)",
      submit: "Request scholarship advice",
      success: "Saved (UI only). [VMIT: wire server confirmation when API is ready]",
    },
    footer: {
      nav: "Explore",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    common: {
      hotline: "0999999999",
      close: "Close",
      menu: "Menu",
    },
  },
}
