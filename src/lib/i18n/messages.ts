import type { MessageTree } from "@/lib/i18n/types"

export const messages: Record<"vi" | "en", MessageTree> = {
  vi: {
    nav: {
      about: "VMIT",
      programs: "Chương trình",
      pathway: "Lộ trình",
      subjects: "Môn học",
      btecSchools: "Hệ thống BTEC",
      englishTest: "IELTS Test",
      news: "Tin tức",
      tuition: "Học phí",
      studentLife: "Đời sống SV",
      apply: "Xét tuyển",
    },
    hero: {
      slogan: "Journey to work excellence",
      headline: "CHƯƠNG\u00A0TRÌNH CỬ\u00A0NHÂN ANH\u00A0QUỐC",
      support: "Lộ trình tới TOP 1% đại học Quốc\u00A0tế.",
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
        { value: "2+1", label: "2 bằng chính quy, 1 bằng đại học Anh Quốc" },
        { value: "70%", label: "tiết kiệm chi phí" },
        { value: "100%", label: "Giới thiệu việc làm" },
        { value: "6,5 IELTS", label: "Sau tốt nghiệp" },
      ],
      items: [
        {
          id: "dual-degree",
          eyebrow: "Trụ 1 · Song bằng",
          title: "Bằng cấp song tịch danh giá",
          description:
            "Pearson BTEC HND Level 5 (Anh Quốc) kết hợp bằng Cao đẳng chính quy — hai văn bằng chính quy trong một lộ trình.",
          featured: true,
          chips: ["Pearson BTEC HND Level 5 — UK", "Bằng Cao đẳng chính quy"],
        },
        {
          id: "programs",
          eyebrow: "Trụ 2",
          title: "Chương trình thực hành",
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
      eyebrow: "",
      title: "Chương trình",
      lead: "Song bằng Cao đẳng chính quy và Pearson BTEC Level 5. Qua môn bằng dự án, không bằng bài thi nhồi nhét. Học qua thực hành.",
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
        { step: "02", title: "BTEC HND Level 5", note: "Song bằng Cao đẳng chính quy · Pearson" },
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
      title: "Cổng xét tuyển trực\u00A0tuyến",
      lead: "Form 3 bước · biên nhận tự động · mã theo dõi hồ sơ.",
      cta: "Bắt đầu xét tuyển",
    },
    scholarship: {
      eyebrow: "Học bổng",
      title: "Nhận học bổng",
      lead: "Chỉ mất khoảng 30 giây. Tư vấn viên VMIT sẽ gọi lại cho bạn.",
      name: "Họ và tên",
      phone: "Số điện thoại",
      email: "Email (tuỳ chọn)",
      submit: "Đăng ký nhận tư vấn học bổng",
      success: "Đã gửi thành công. Đội ngũ VMIT sẽ liên hệ với bạn sớm.",
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
      btecSchools: "BTEC network",
      englishTest: "IELTS Test",
      news: "News",
      tuition: "Fees",
      studentLife: "Student life",
      apply: "Apply",
    },
    hero: {
      slogan: "Journey to work excellence",
      headline: "UK BACHELOR'S DEGREE\u00A0PROGRAMME",
      support: "Your pathway to the TOP 1% of international\u00A0universities.",
      ctaExplore: "View the gallery",
      ctaScholarship: "Get a scholarship",
      ctaApply: "Admissions portal",
    },
    trust: {
      label: "Partners & international network",
    },
    pillars: {
      eyebrow: "Four breakthrough pillars",
      title: "Why choose VMIT",
      counters: [
        { value: "2+1", label: "2 formal qualifications, 1 UK bachelor's degree" },
        { value: "70%", label: "savings on study costs" },
        { value: "100%", label: "Job referrals" },
        { value: "6.5 IELTS", label: "After graduation" },
      ],
      items: [
        {
          id: "dual-degree",
          eyebrow: "Pillar 1 · Dual award",
          title: "Prestigious dual qualifications",
          description:
            "A Pearson BTEC HND Level 5 (UK) combined with a formal college diploma — two recognised qualifications in one pathway.",
          featured: true,
          chips: ["Pearson BTEC HND Level 5 — UK", "Formal college diploma"],
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
          title: "International progression",
          description: "2+1 / 2+2 transfer to Keiser University (USA) and universities in the UK and Australia.",
        },
        {
          id: "career",
          eyebrow: "Pillar 4",
          title: "Careers with FDI companies",
          description: "Committed career guidance linked to our partner companies.",
        },
      ],
    },
    programs: {
      eyebrow: "",
      title: "Programmes",
      lead: "A formal college diploma plus Pearson BTEC Level 5. Pass by projects, not crammed exams. Learn by doing.",
      view: "View programme",
      items: [
        {
          title: "BTEC Data Analytics",
          description: "Hands-on data analytics to Pearson HND standards.",
        },
        {
          title: "BTEC Business Management",
          description: "Business management within the UK education framework.",
        },
        {
          title: "Foundation IELTS",
          description: "A foundation in academic English before you start your specialism.",
        },
      ],
    },
    pathway: {
      eyebrow: "Global pathway",
      title: "Pathway & qualifications",
      lead: "Earn two qualifications on campus, then transfer via 2+1 / 2+2 to Keiser University (USA), the UK or Australia.",
      cta: "See the full pathway",
      steps: [
        { step: "01", title: "Foundation / IELTS", note: "Academic foundation" },
        { step: "02", title: "BTEC HND Level 5", note: "Dual award · College diploma · Pearson" },
        { step: "03", title: "International top-up", note: "2+1 / 2+2 · UK · US · AU" },
      ],
    },
    tuition: {
      eyebrow: "Fees & scholarships",
      title: "Invest lightly, go far",
      leadBefore: "Flexible plans from",
      leadAfter: "· talent scholarship fund",
      cta: "Fees & scholarships",
    },
    life: {
      eyebrow: "Campus life",
      title: "Spaces to learn and grow",
      lead: "Campus, seminars and labs — in pictures.",
    },
    apply: {
      eyebrow: "Admissions",
      title: "Online application\u00A0portal",
      lead: "Three-step form · automatic receipt · application tracking code.",
      cta: "Start your application",
    },
    scholarship: {
      eyebrow: "Scholarship",
      title: "Get a scholarship",
      lead: "It takes about 30 seconds. A VMIT adviser will call you back.",
      name: "Full name",
      phone: "Phone number",
      email: "Email (optional)",
      submit: "Request scholarship advice",
      success: "Thank you! The VMIT team will be in touch with you shortly.",
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
