import { MEDIA } from "@/constants/media"

export type L = { vi: string; en: string }

export const ABOUT_MEDIA = {
  journey: "/media/about/vmit-journey.jpg",
  pitching: "/media/about/vmit-pitching.jpg",
  dualDegree: "/media/about/vmit-dual-degree.jpg",
  london: "/media/about/uk-london.jpg",
  sunderlandStPeters: "/media/about/sunderland-st-peters.jpg",
  sunderlandLibrary: "/media/about/sunderland-library.jpg",
  sunderlandCityCampus: "/media/about/sunderland-city-campus.jpg",
  sunderlandGraduation: "/media/about/sunderland-graduation.jpg",
  sunderlandCitySpace: "/media/about/sunderland-cityspace.jpg",
  sunderlandFayre: "/media/about/sunderland-fayre.jpg",
  keiserCampus: "/media/about/keiser-campus.jpg",
} as const

export const ABOUT_SECTIONS: { id: string; label: L }[] = [
  { id: "dinh-vi", label: { vi: "Định vị", en: "Positioning" } },
  { id: "lo-trinh", label: { vi: "Lộ trình", en: "Journey" } },
  { id: "chuan-quoc-te", label: { vi: "Chuẩn Anh Quốc", en: "UK standard" } },
  { id: "thuc-chien", label: { vi: "Thực chiến", en: "Work-ready" } },
  { id: "song-bang", label: { vi: "Song bằng", en: "Dual degree" } },
  { id: "sunderland", label: { vi: "Sunderland", en: "Sunderland" } },
  { id: "keiser", label: { vi: "Keiser & toàn cầu", en: "Keiser & global" } },
  { id: "nganh-hoc", label: { vi: "Chương trình", en: "Programmes" } },
  { id: "cam-ket", label: { vi: "Cam kết", en: "Commitments" } },
]

export const ABOUT_HERO = {
  eyebrow: { vi: "VMIT · Viet My International Training", en: "VMIT · Viet My International Training" },
  title: { vi: "Cử nhân thực hành Anh Quốc", en: "The UK practical bachelor's" },
  highlight: { vi: "Pearson BTEC Level 5", en: "Pearson BTEC Level 5" },
  lead: {
    vi: "Song bằng Cao đẳng chính quy & BTEC HND UK tại Cao đẳng Việt Mỹ Hà Nội (hệ sinh thái EQuest) — liên thông 1 năm lấy bằng Cử nhân Đại học Sunderland (Vương quốc Anh).",
    en: "A dual award – formal college diploma & UK BTEC HND – at Viet My College Hanoi (EQuest ecosystem), plus a one-year top-up to a University of Sunderland (UK) bachelor's degree.",
  },
  ctaJourney: { vi: "Khám phá lộ trình", en: "Explore the journey" },
  chips: [
    { vi: "Kiểm định Ofqual", en: "Ofqual regulated" },
    { vi: "Khung RQF Level 5", en: "RQF Level 5" },
    { vi: "240 tín chỉ CATS", en: "240 CATS credits" },
  ] as L[],
  route: [
    { vi: "Hà Nội", en: "Hanoi" },
    { vi: "London", en: "London" },
    { vi: "Sunderland", en: "Sunderland" },
  ] as L[],
}

/** Words wrapped in [brackets] are highlighted. */
export const ABOUT_STATEMENT: L = {
  vi: "Pearson BTEC HND Level 5 không đơn thuần là chứng chỉ đào tạo nghề — mà là chương trình [Cử nhân thực hành] tiêu chuẩn [Vương quốc Anh], được [Ofqual] kiểm định và công nhận tại [hơn 100 quốc gia].",
  en: "Pearson BTEC HND Level 5 is not just a vocational certificate — it is a [UK-standard] [practical bachelor's] programme, regulated by [Ofqual] and recognised in [more than 100 countries].",
}

export const ABOUT_STATEMENT_NOTE: L = {
  vi: "Tốt nghiệp tại Cao đẳng Việt Mỹ Hà Nội, người học nhận đồng thời Bằng Cao đẳng chính quy và Bằng Pearson BTEC HND Anh Quốc — sẵn sàng gia nhập tập đoàn FDI/MNCs hoặc liên thông 1 năm cuối lấy bằng Cử nhân Đại học Sunderland.",
  en: "Graduates of Viet My College Hanoi receive both a formal college diploma and a UK Pearson BTEC HND — ready to join FDI companies and multinationals, or to top up to a University of Sunderland bachelor's degree in one final year.",
}

export type JourneyStop = {
  tag: L
  title: L
  body: L
  bullets: L[]
  image: string
  accent?: boolean
}

export const JOURNEY: JourneyStop[] = [
  {
    tag: { vi: "Xuất phát", en: "Start" },
    title: { vi: "Tốt nghiệp THPT · Foundation tiếng Anh", en: "High-school graduate · English Foundation" },
    body: {
      vi: "Nền tảng tương đương BTEC Level 3 / A-Levels. Chương trình Foundation tiếng Anh học thuật giúp bạn bứt tốc tới mục tiêu IELTS 6.5+.",
      en: "A starting point equivalent to BTEC Level 3 / A-levels. The academic English Foundation programme fast-tracks you towards IELTS 6.5+.",
    },
    bullets: [
      { vi: "Chính sách “Vốn nhẹ – Bước xa”: đợt 1 chỉ từ 15 triệu", en: "“Light start – Go far” policy: first instalment from just VND 15m" },
      { vi: "Tiếng Anh học thuật theo chuẩn Pearson", en: "Academic English to Pearson standards" },
    ],
    image: MEDIA.studentsStudy,
  },
  {
    tag: { vi: "Năm 1", en: "Year 1" },
    title: { vi: "BTEC Level 4 – HNC", en: "BTEC Level 4 – HNC" },
    body: {
      vi: "120 tín chỉ – tương đương Năm 1 Đại học chuẩn Anh. Học qua dự án, làm việc nhóm và thuyết trình bằng tiếng Anh ngay từ học kỳ đầu.",
      en: "120 credits – equivalent to Year 1 of a UK degree. Learn through projects, teamwork and presentations in English from the very first term.",
    },
    bullets: [
      { vi: "Không thi viết học thuộc lòng", en: "No rote-learning written exams" },
      { vi: "Quyền chuyển tiếp vào Năm 2 đại học", en: "Eligible to transfer into Year 2 of university" },
    ],
    image: MEDIA.studentsCollab,
  },
  {
    tag: { vi: "Năm 2", en: "Year 2" },
    title: { vi: "BTEC Level 5 – HND · Song bằng", en: "BTEC Level 5 – HND · Dual degree" },
    body: {
      vi: "240 tín chỉ CATS – tương đương Năm 2 Đại học Anh. Sau 6 học kỳ, bạn nhận cùng lúc Bằng Cao đẳng chính quy và Bằng Pearson BTEC HND Level 5.",
      en: "240 CATS credits – equivalent to Year 2 of a UK degree. After 6 terms, you receive both a formal college diploma and the Pearson BTEC HND Level 5.",
    },
    bullets: [
      { vi: "Cử nhân thực hành Anh Quốc", en: "UK practical bachelor's level" },
      { vi: "Sẵn sàng làm việc tại FDI & MNCs", en: "Ready for FDI & MNC careers" },
    ],
    image: ABOUT_MEDIA.dualDegree,
    accent: true,
  },
  {
    tag: { vi: "Năm 3", en: "Year 3" },
    title: { vi: "Top-up Level 6 · Sunderland (UK) / Keiser (Mỹ)", en: "Level 6 top-up · Sunderland (UK) / Keiser (USA)" },
    body: {
      vi: "Chỉ 1 năm cuối để nhận bằng Cử nhân Đại học chính quy — du học tại Anh hoặc học Top-up ngay tại Việt Nam.",
      en: "Just one final year to earn a full bachelor's degree — study in the UK or complete the top-up in Vietnam.",
    },
    bullets: [
      { vi: "BA (Hons) Quản trị Kinh doanh / BSc (Hons) Công nghệ", en: "BA (Hons) Business Management / BSc (Hons) Technology" },
      { vi: "Tiết kiệm hơn 1 tỷ đồng so với du học 3–4 năm", en: "Save over VND 1 billion vs. 3–4 years studying abroad" },
    ],
    image: ABOUT_MEDIA.sunderlandGraduation,
  },
  {
    tag: { vi: "Đích đến", en: "Destination" },
    title: { vi: "Sự nghiệp toàn cầu · Thạc sĩ", en: "Global career · Master's" },
    body: {
      vi: "Làm việc tại tập đoàn đa quốc gia, ở lại Anh 2 năm với Graduate Visa, hoặc học thẳng lên Thạc sĩ.",
      en: "Work for multinationals, stay in the UK for 2 years on the Graduate Visa, or progress straight to a master's degree.",
    },
    bullets: [
      { vi: "Graduate Visa UK 2 năm", en: "2-year UK Graduate Visa" },
      { vi: "Mạng lưới việc làm EQuest", en: "EQuest careers network" },
    ],
    image: MEDIA.newsCareer,
  },
]

export const PEARSON_STATS: { value: number; suffix: string; label: L }[] = [
  { value: 180, suffix: "", label: { vi: "năm lịch sử Pearson", en: "years of Pearson history" } },
  { value: 70, suffix: "+", label: { vi: "quốc gia Pearson hoạt động", en: "countries Pearson operates in" } },
  { value: 240, suffix: "", label: { vi: "tín chỉ CATS (= 120 ECTS)", en: "CATS credits (= 120 ECTS)" } },
  { value: 300, suffix: "+", label: { vi: "đại học công nhận tín chỉ", en: "universities recognise the credits" } },
]

export const PEARSON_PILLARS: { title: L; body: L }[] = [
  {
    title: { vi: "Chủ quản khảo thí uy tín nhất Anh Quốc", en: "The UK's leading awarding body" },
    body: {
      vi: "Pearson plc – tập đoàn giáo dục và khảo thí lớn nhất thế giới, trụ sở tại London, sở hữu hội đồng khảo thí Edexcel và trực tiếp cấp văn bằng BTEC.",
      en: "Pearson plc – the world's largest education and assessment company, headquartered in London, owner of the Edexcel exam board and the direct awarder of BTEC qualifications.",
    },
  },
  {
    title: { vi: "Kiểm định quốc gia Ofqual & RQF", en: "Ofqual & RQF regulated" },
    body: {
      vi: "BTEC Higher Nationals (HNC Level 4, HND Level 5) được Ofqual – cơ quan quản lý văn bằng trực thuộc Chính phủ Anh – kiểm định và gắn mã số trong khung RQF.",
      en: "BTEC Higher Nationals (HNC Level 4, HND Level 5) are regulated by Ofqual, the UK government's qualifications regulator, and assigned qualification codes on the RQF.",
    },
  },
  {
    title: { vi: "240 tín chỉ – trọn 2 năm đầu đại học", en: "240 credits – the first two years of a degree" },
    body: {
      vi: "Hơn 300 trường đại học tại Anh, Mỹ, Úc, Canada, New Zealand và Singapore ký thỏa thuận công nhận tín chỉ để tiếp nhận sinh viên BTEC vào năm cuối (Top-up).",
      en: "Over 300 universities in the UK, USA, Australia, Canada, New Zealand and Singapore have signed credit-recognition agreements to admit BTEC students into the final (top-up) year.",
    },
  },
]

export const LEVEL_STEPS: { level: string; rqf: L; vn: L; next: L; vmit?: boolean }[] = [
  {
    level: "Level 3",
    rqf: { vi: "Tương đương A-Levels / Tú tài Anh", en: "Equivalent to UK A-levels" },
    vn: { vi: "Tốt nghiệp THPT", en: "Vietnamese high-school diploma" },
    next: { vi: "Vào thẳng Năm 1 đại học quốc tế", en: "Direct entry to Year 1 at international universities" },
  },
  {
    level: "Level 4 · HNC",
    rqf: { vi: "Năm 1 Đại học chuẩn Anh (120 tín chỉ)", en: "Year 1 of a UK degree (120 credits)" },
    vn: { vi: "Năm 1 Cao đẳng chính quy / ĐH", en: "Year 1 of formal college / university" },
    next: { vi: "Chuyển tiếp Năm 2 đại học", en: "Transfer into Year 2 of university" },
  },
  {
    level: "Level 5 · HND",
    rqf: { vi: "Năm 2 Đại học chuẩn Anh (240 tín chỉ)", en: "Year 2 of a UK degree (240 credits)" },
    vn: { vi: "Tốt nghiệp Cao đẳng chính quy – song bằng", en: "Formal college graduate – dual degree" },
    next: { vi: "Top-up 1 năm lấy bằng Sunderland / Keiser", en: "One-year top-up to a Sunderland / Keiser degree" },
    vmit: true,
  },
  {
    level: "Level 6 · Top-up",
    rqf: { vi: "Bằng Cử nhân (Bachelor's Degree)", en: "Bachelor's degree" },
    vn: { vi: "Bằng Đại học chính quy", en: "Formal university degree" },
    next: { vi: "Làm việc toàn cầu hoặc học Thạc sĩ", en: "Global career or master's degree" },
  },
]

export const PRACTICE_STEPS: { kicker: L; title: L; body: L; image: string }[] = [
  {
    kicker: { vi: "No Written Exams", en: "No written exams" },
    title: { vi: "Xóa bỏ thi cử học vẹt", en: "No more rote-learning exams" },
    body: {
      vi: "Triết lý “Work-ready” – đào tạo để làm được việc ngay. Năng lực được trui rèn qua dự án kinh doanh và kỹ thuật mô phỏng thực tế thay vì học thuộc để qua kỳ thi giấy.",
      en: "A “work-ready” philosophy: training you to do the job from day one. Skills are forged through realistic business and technical simulation projects, not by memorising for paper exams.",
    },
    image: MEDIA.studentsCollab,
  },
  {
    kicker: { vi: "Assignment-based Learning", en: "Assignment-based learning" },
    title: { vi: "Học qua hồ sơ dự án thật", en: "Learn through real project briefs" },
    body: {
      vi: "Mỗi môn gồm 2–3 Assignment Brief do Pearson thẩm định. Sinh viên nhập vai chuyên viên phân tích, quản lý dự án, cố vấn chiến lược để giải case study từ Apple, Unilever, Google, VinFast…",
      en: "Each unit has 2–3 Pearson-approved assignment briefs. Students take on the roles of analysts, project managers and strategy consultants to solve case studies from Apple, Unilever, Google, VinFast…",
    },
    image: MEDIA.newsAnalytics,
  },
  {
    kicker: { vi: "Teamwork & Pitching", en: "Teamwork & pitching" },
    title: { vi: "Làm việc nhóm & thuyết trình chuyên nghiệp", en: "Teamwork & professional pitching" },
    body: {
      vi: "Phân vai, lập Gantt chart, quản trị rủi ro và bảo vệ đề án bằng tiếng Anh chuyên ngành trước hội đồng giảng viên và chuyên gia doanh nghiệp.",
      en: "Assign roles, build Gantt charts, manage risk and defend proposals in professional English before a panel of lecturers and industry experts.",
    },
    image: ABOUT_MEDIA.pitching,
  },
  {
    kicker: { vi: "Professional Portfolio", en: "Professional portfolio" },
    title: { vi: "Hồ sơ năng lực thực chiến", en: "A real-world portfolio" },
    body: {
      vi: "Tốt nghiệp với hàng chục báo cáo nghiên cứu thị trường, dashboard Tableau/Power BI, kế hoạch marketing đa kênh, đề cương tài chính – vũ khí khi phỏng vấn tại FDI & MNCs.",
      en: "Graduate with dozens of market research reports, Tableau/Power BI dashboards, multichannel marketing plans and financial proposals – your edge in FDI & MNC interviews.",
    },
    image: MEDIA.newsLab,
  },
  {
    kicker: { vi: "Quality Assurance", en: "Quality assurance" },
    title: { vi: "Giám định chất lượng 2 tầng", en: "Two-tier quality assurance" },
    body: {
      vi: "Giảng viên chấm → Ban khảo thí nội bộ (IV) thẩm định chéo → Chuyên gia Pearson (External Examiner) kiểm định độc lập. Không “xin điểm”, không “chấm nương tay”.",
      en: "Lecturer marks → Internal Verifier cross-checks → Pearson External Examiner audits independently. No bargaining for marks, no lenient marking.",
    },
    image: MEDIA.seminar,
  },
]

export const QA_FLOW: L[] = [
  { vi: "Giảng viên chấm", en: "Lecturer marks" },
  { vi: "Thẩm định nội bộ (IV)", en: "Internal Verifier (IV)" },
  { vi: "Chuyên gia Pearson (EE)", en: "Pearson External Examiner (EE)" },
]

export const GRADES: L[] = [
  { vi: "Pass · Đạt", en: "Pass" },
  { vi: "Merit · Khá", en: "Merit" },
  { vi: "Distinction · Xuất sắc", en: "Distinction" },
]

export const VMIT_MODEL = {
  title: { vi: "Mô hình VMIT chuẩn quốc tế", en: "The international-standard VMIT model" },
  body: {
    vi: "Tại Cao đẳng Việt Mỹ Hà Nội (Tập đoàn Giáo dục EQuest), chương trình BTEC được chuẩn hóa thành thương hiệu VMIT – Viet My International Training, theo mô hình thành công của Saigon Business School (SBS) tại TP.HCM.",
    en: "At Viet My College Hanoi (EQuest Education Group), the BTEC programme is standardised under the VMIT brand – Viet My International Training – following the proven model of Saigon Business School (SBS) in Ho Chi Minh City.",
  },
  campuses: [
    { vi: "168 Trịnh Văn Bô, Hà Nội", en: "168 Trinh Van Bo, Hanoi" },
    { vi: "39 Hoàng Quán Chi, Hà Nội", en: "39 Hoang Quan Chi, Hanoi" },
  ] as L[],
  diplomas: [
    {
      title: { vi: "Bằng Cao đẳng chính quy", en: "Formal college diploma" },
      issuer: { vi: "Hiệu trưởng Cao đẳng Việt Mỹ Hà Nội cấp theo quy định Nhà nước", en: "Issued by the Principal of Viet My College Hanoi under state regulations" },
    },
    {
      title: { vi: "Bằng Pearson BTEC HND Level 5", en: "Pearson BTEC HND Level 5" },
      issuer: { vi: "Tổ chức Giáo dục Pearson (Vương quốc Anh) cấp trực tiếp từ London", en: "Awarded directly by Pearson Education (UK) from London" },
    },
  ],
  passport: {
    vi: "Giá trị pháp lý đầy đủ tại Việt Nam + “hộ chiếu học thuật” toàn cầu để làm việc hoặc học lên.",
    en: "Full legal recognition in Vietnam plus a global “academic passport” for work or further study.",
  },
}

export const SUNDERLAND = {
  since: "1901",
  title: { vi: "Đại học Sunderland", en: "University of Sunderland" },
  lead: {
    vi: "Trường đại học công lập danh tiếng của Vương quốc Anh, thành lập từ năm 1901, nổi tiếng về tính thực hành và tỷ lệ sinh viên có việc làm sau tốt nghiệp. Trường tọa lạc tại miền Đông Bắc nước Anh và có cơ sở tại trung tâm thủ đô London.",
    en: "A renowned UK public university founded in 1901, known for practice-led teaching and graduate employability. Based in North East England, with a campus in central London.",
  },
  mechanism: {
    vi: "Nhờ thỏa thuận công nhận tín chỉ giữa Pearson và Đại học Sunderland, sinh viên hoàn thành BTEC HND Level 5 tại VMIT được liên thông thẳng vào năm cuối (Top-up Year – Level 6).",
    en: "Under the credit-recognition agreement between Pearson and the University of Sunderland, students who complete the BTEC HND Level 5 at VMIT progress directly into the final top-up year (Level 6).",
  },
  gallery: [
    { src: ABOUT_MEDIA.sunderlandLibrary, caption: { vi: "Thư viện Murray · City Campus", en: "Murray Library · City Campus" } },
    { src: ABOUT_MEDIA.sunderlandCityCampus, caption: { vi: "Toàn cảnh City Campus", en: "City Campus from above" } },
    { src: ABOUT_MEDIA.sunderlandGraduation, caption: { vi: "Lễ tốt nghiệp tại Stadium of Light", en: "Graduation at the Stadium of Light" } },
    { src: ABOUT_MEDIA.sunderlandCitySpace, caption: { vi: "CitySpace · đời sống sinh viên", en: "CitySpace · student life" } },
    { src: ABOUT_MEDIA.sunderlandFayre, caption: { vi: "Ngày hội câu lạc bộ", en: "Clubs & societies fayre" } },
  ],
  options: [
    {
      key: "uk",
      tab: { vi: "Du học Anh 1 năm", en: "1 year in the UK" },
      image: ABOUT_MEDIA.london,
      points: [
        { vi: "Học trực tiếp tại Campus Sunderland hoặc Campus London", en: "Study in person at the Sunderland or London campus" },
        { vi: "Môi trường đa văn hóa, thư viện số, mạng lưới việc làm quốc tế", en: "Multicultural campus, digital library, global career network" },
        { vi: "Graduate Visa: ở lại Anh làm việc 2 năm sau tốt nghiệp", en: "Graduate Visa: stay and work in the UK for 2 years after graduation" },
      ] as L[],
      degree: {
        vi: "Cử nhân Quản trị Kinh doanh (BA Hons) hoặc Cử nhân Công nghệ (BSc Hons) do Đại học Sunderland cấp chính quy.",
        en: "BA (Hons) Business Management or BSc (Hons) Technology awarded by the University of Sunderland.",
      },
    },
    {
      key: "vn",
      tab: { vi: "Top-up tại Việt Nam", en: "Top-up in Vietnam" },
      image: ABOUT_MEDIA.sunderlandLibrary,
      points: [
        { vi: "Học chương trình năm cuối của Sunderland ngay tại Việt Nam qua đối tác liên kết", en: "Take Sunderland's final-year programme in Vietnam through a partner institution" },
        { vi: "Tiết kiệm tối đa chi phí ăn ở, sinh hoạt tại Anh", en: "Maximise savings on UK accommodation and living costs" },
        { vi: "Vừa đi làm tích lũy kinh nghiệm, vừa học tối / cuối tuần", en: "Work and gain experience while studying in the evenings / at weekends" },
      ] as L[],
      degree: {
        vi: "Bằng Cử nhân chính quy của Đại học Sunderland giống hệt sinh viên học tại Anh, được Bộ GD&ĐT Việt Nam công nhận.",
        en: "The same University of Sunderland bachelor's degree as UK-based students, recognised by Vietnam's Ministry of Education and Training.",
      },
    },
  ],
  savings: {
    abroad: { vi: "Du học tự túc tại Anh 3–4 năm", en: "3–4 years self-funded in the UK" },
    abroadValue: { vi: "1,8 – 2,5 tỷ", en: "VND 1.8 – 2.5bn" },
    vmit: { vi: "Lộ trình VMIT 2 + 1 năm Top-up", en: "VMIT route: 2 years + 1-year top-up" },
    vmitValue: { vi: "≈ 30 – 40%", en: "≈ 30 – 40%" },
    headline: { vi: "Tiết kiệm hơn 1 tỷ đồng", en: "Save over VND 1 billion" },
    note: {
      vi: "…mà vẫn sở hữu đầy đủ Bằng Cử nhân Đại học Vương quốc Anh.",
      en: "…while still earning a full UK bachelor's degree.",
    },
  },
}

export const KEISER = {
  title: { vi: "Đại học Keiser (Mỹ)", en: "Keiser University (USA)" },
  body: {
    vi: "Bên cạnh Sunderland, sinh viên VMIT có đặc quyền chuyển tiếp sang Đại học Keiser – thành viên hệ sinh thái Tập đoàn EQuest – với chính sách chuyển đổi tín chỉ và ưu đãi 30% học phí nội bộ.",
    en: "Alongside Sunderland, VMIT students enjoy the privilege of transferring to Keiser University – a member of the EQuest ecosystem – with credit transfer and a 30% internal tuition discount.",
  },
  perk: { vi: "Ưu đãi học phí nội bộ", en: "Internal tuition discount" },
  more: { vi: "Hoặc chuyển tiếp tới các đại học đối tác tại", en: "Or transfer to partner universities in" },
  countries: [
    { vi: "Úc", en: "Australia" },
    { vi: "Canada", en: "Canada" },
    { vi: "Thụy Sĩ", en: "Switzerland" },
    { vi: "Singapore", en: "Singapore" },
  ] as L[],
}

export const MAJORS: { code: string; title: L; en: string; body: L; skills: string[]; image: string }[] = [
  {
    code: "01",
    title: { vi: "Phân tích Dữ liệu", en: "Data Analytics" },
    en: "Computing – Data Analytics",
    body: {
      vi: "Ứng dụng AI, Python, SQL, Tableau/Power BI trong phân tích dữ liệu kinh doanh: xử lý dữ liệu lớn, khai phá xu hướng tiêu dùng, dự báo kinh doanh cho công ty công nghệ, ngân hàng, bán lẻ.",
      en: "Apply AI, Python, SQL and Tableau/Power BI to business data analysis: big-data processing, consumer-trend mining and business forecasting for tech firms, banks and retailers.",
    },
    skills: ["AI", "Python", "SQL", "Power BI", "Tableau", "Forecasting"],
    image: MEDIA.newsAnalytics,
  },
  {
    code: "02",
    title: { vi: "Quản trị Kinh doanh", en: "Business Management" },
    en: "Business Management",
    body: {
      vi: "Tư duy quản trị hiện đại: chiến lược, tài chính doanh nghiệp, digital marketing, quản lý dự án – sẵn sàng làm trợ lý ban giám đốc, quản trị vận hành hoặc khởi nghiệp.",
      en: "Modern management thinking: strategy, corporate finance, digital marketing and project management – ready to work as an executive assistant or in operations management, or to launch your own start-up.",
    },
    skills: ["Strategy", "Finance", "Digital Marketing", "Project Mgmt", "Leadership"],
    image: ABOUT_MEDIA.pitching,
  },
]

export const COMMITMENTS: { title: L; body: L }[] = [
  {
    title: { vi: "Song bằng danh giá", en: "A prestigious dual degree" },
    body: {
      vi: "Bằng Cao đẳng chính quy Việt Mỹ và Bằng BTEC HND Level 5 do Pearson Anh Quốc cấp.",
      en: "A Viet My formal college diploma plus the BTEC HND Level 5 awarded by Pearson UK.",
    },
  },
  {
    title: { vi: "100% việc làm tại FDI & MNCs", en: "100% FDI & MNC job placement" },
    body: {
      vi: "Cam kết giới thiệu việc làm tại các tập đoàn đối tác liên kết của EQuest.",
      en: "A commitment to refer you to jobs at EQuest's affiliated partner corporations.",
    },
  },
  {
    title: { vi: "70% thực hành thực chiến", en: "70% hands-on practice" },
    body: {
      vi: "Giảng viên là chuyên gia, giám đốc đang điều hành doanh nghiệp thực tế.",
      en: "Taught by experts and executives who currently run real businesses.",
    },
  },
  {
    title: { vi: "IELTS 6.5+ & chuyển tiếp toàn cầu", en: "IELTS 6.5+ & global progression" },
    body: {
      vi: "Foundation tiếng Anh học thuật, bảo đảm đủ điều kiện liên thông Sunderland (UK) hoặc Keiser (Mỹ).",
      en: "An academic English Foundation that ensures you qualify for progression to Sunderland (UK) or Keiser (USA).",
    },
  },
]

export const ADMISSION_CTA = {
  eyebrow: { vi: "Chính sách tuyển sinh", en: "Admissions policy" },
  title: { vi: "Vốn nhẹ – Bước xa", en: "Light start – Go far" },
  body: {
    vi: "Hỗ trợ tài chính ban đầu: chỉ từ 15 triệu VNĐ đóng đợt 1 để hoàn tất thủ tục nhập học và trở thành sinh viên quốc tế.",
    en: "Initial financial support: pay just VND 15 million as your first instalment to complete enrolment and become an international student.",
  },
  amount: "15",
  unit: { vi: "triệu VNĐ · đợt 1", en: "million VND · 1st instalment" },
}

export const ABOUT_CREDITS: { label: string; author: string; license: string; href: string }[] = [
  { label: "St. Peter's Campus", author: "Komusar", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:St._Peter%27s_Campus.jpg" },
  { label: "Murray Library, City Campus", author: "Komusar", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Murray_Library,_City_Campus.jpg" },
  { label: "City Campus Drone Footage", author: "Komusar", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:City_Campus_Drone_Footage.jpg" },
  { label: "Graduations at the Stadium of Light", author: "Komusar", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Graduations_at_the_Stadium_of_Light.jpg" },
  { label: "Clubs and Societies Fayre", author: "Komusar", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Clubs_and_Societies_Fayre.jpg" },
  { label: "The Gateway building, Sunderland University", author: "Robert Graham", license: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:The_Gateway_building,_Sunderland_University_-_geograph.org.uk_-_5247539.jpg" },
  { label: "Keiser University Latin American Campus", author: "Wikimedia Commons contributor", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:KU_LatAmCamp_Nicaragua.jpg" },
]
