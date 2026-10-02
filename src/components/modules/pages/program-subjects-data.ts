import { MEDIA } from "@/constants/media"

type L = { vi: string; en: string }

export type ProgramSubject = {
  id: string
  code: string
  level: string
  course: string
  title: L
  hook: L
  learn: L[]
  benefit: L
  artifact: L
  tools: string[]
  image: string
}

export type SubjectTrackId = "foundation" | "data-analytics" | "business-management"

const IMG = {
  aiAgents: "/media/subjects/ai-agents.jpg",
  python: "/media/subjects/python.jpg",
  sql: "/media/subjects/sql.jpg",
  eda: "/media/subjects/eda.jpg",
  bi: "/media/subjects/bi-dashboard.jpg",
  ml: "/media/subjects/ml.jpg",
  cloud: "/media/subjects/cloud.jpg",
  canvas: "/media/subjects/business-canvas.jpg",
  marketing: "/media/subjects/marketing.jpg",
  finance: "/media/subjects/finance.jpg",
  supply: "/media/subjects/supply-chain.jpg",
  ecommerce: "/media/subjects/ecommerce.jpg",
  strategy: "/media/subjects/strategy.jpg",
  pitching: "/media/about/vmit-pitching.jpg",
}

const FOUNDATION: ProgramSubject[] = [
  {
    id: "fc-01",
    code: "Foundation Core 01",
    level: "Foundation",
    course: "Academic English & Flipped Classroom Immersion",
    title: { vi: "Tiếng Anh phản xạ học thuật & Lớp học đảo ngược", en: "Instinctive academic English & the flipped classroom" },
    hook: {
      vi: "Không còn học vẹt ngữ pháp để đi thi. Tiếng Anh trở thành công cụ tranh biện và làm việc tự nhiên như tiếng mẹ đẻ.",
      en: "No more rote-learning grammar for tests. English becomes a tool for debating and working, as natural as your mother tongue.",
    },
    learn: [
      {
        vi: "Tư duy trực tiếp bằng tiếng Anh (Direct Reflexive Method), bỏ hẳn thói quen dịch thầm từng từ.",
        en: "Think directly in English (Direct Reflexive Method) and drop the habit of translating word by word.",
      },
      {
        vi: "Lớp học đảo ngược: xem micro-learning ở nhà, lên lớp 100% là tranh biện, thuyết trình và đàm phán.",
        en: "Flipped classroom: micro-lessons at home, with 100% of class time spent on debate, presentations and negotiation.",
      },
      {
        vi: "Làm chủ 800+ thuật ngữ học thuật, kinh tế và công nghệ, đọc trơn giáo trình Pearson UK.",
        en: "Master 800+ academic, business and technology terms, and read Pearson UK materials fluently.",
      },
    ],
    benefit: {
      vi: "Phá bỏ nỗi sợ nói sai, tự tin thuyết trình trước đám đông. Từ mất gốc lên tương đương IELTS 5.0–5.5+ / B2 CEFR chỉ sau một học kỳ.",
      en: "Lose the fear of making mistakes and present confidently to any audience. Go from the basics to the equivalent of IELTS 5.0–5.5+ / CEFR B2 in just one term.",
    },
    artifact: {
      vi: "Video thuyết trình phản biện dự án cá nhân, 100% tiếng Anh, phong thái doanh nhân quốc tế.",
      en: "A video of you defending a personal project, entirely in English, with the poise of an international professional.",
    },
    tools: ["ELSA Speak Pro AI", "Oxford Academic E-learning", "Quizlet", "BBC Learning English"],
    image: MEDIA.seminar,
  },
  {
    id: "fc-02",
    code: "Foundation Core 02",
    level: "Foundation",
    course: "AI Power Mastery & Multi-Agent Workflows",
    title: { vi: "Huấn luyện AI chuyên sâu & Điều phối AI Agents", en: "Advanced AI training & AI agent orchestration" },
    hook: {
      vi: "Đừng chỉ dùng AI để tán gẫu. Biến AI thành gia sư 1-1 và đội nhân viên ảo, tăng 300% năng suất học và làm.",
      en: "Don’t just chat with AI. Turn it into a 1-1 tutor and a virtual team that triples how much you get done.",
    },
    learn: [
      {
        vi: "Prompt Engineering từ cơ bản đến nâng cao: ép AI tư duy theo khung Few-shot, Chain-of-Thought.",
        en: "Prompt engineering from basic to advanced: make AI reason with few-shot and chain-of-thought patterns.",
      },
      {
        vi: "Dựng mạng trợ lý AI riêng (Custom GPTs, Claude Projects) để tóm tắt sách, vẽ mindmap và vá lỗ hổng kiến thức.",
        en: "Build your own network of AI assistants (Custom GPTs, Claude Projects) to summarise books, draw mind maps and fill knowledge gaps.",
      },
      {
        vi: "Điều phối AI Agents tự động tìm tài liệu, phân tích số liệu và viết báo cáo chuyên nghiệp.",
        en: "Orchestrate AI agents that automatically find sources, analyse data and write professional reports.",
      },
    ],
    benefit: {
      vi: "Năng lực của nhân sự công nghệ thế hệ mới: xử lý khối lượng nghiên cứu trong 2 giờ thay vì 2 ngày, làm chủ công nghệ trước khi AI thay thế người khác.",
      en: "The edge of a next-generation tech professional: get two days of research done in two hours, and master AI rather than be replaced by it.",
    },
    artifact: {
      vi: "Hệ thống trợ lý AI cá nhân dùng suốt 2 năm học, cùng đề án tự động hóa quy trình cho một doanh nghiệp SME.",
      en: "A personal AI assistant system for your two years of study, plus a workflow automation proposal for an SME.",
    },
    tools: ["ChatGPT Plus/Team", "Claude 3.5 Sonnet", "Microsoft Copilot", "Notion AI", "Gamma App", "Perplexity Pro"],
    image: IMG.aiAgents,
  },
  {
    id: "fc-03",
    code: "Foundation Core 03",
    level: "Foundation",
    course: "Critical Thinking & Academic Research Skills",
    title: { vi: "Tư duy phản biện & Kỹ năng nghiên cứu chuẩn quốc tế", en: "Critical thinking & international-standard research skills" },
    hook: {
      vi: "Thế giới ngập tin giả và thông tin rác. Môn học dạy bạn nhìn xuyên dữ liệu, đặt đúng câu hỏi và bảo vệ luận điểm sắc bén.",
      en: "The world is flooded with fake news and junk information. Learn to see through the data, ask the right questions and defend a sharp argument.",
    },
    learn: [
      {
        vi: "Phân biệt Fact và Opinion, nhận diện các kiểu ngụy biện thường gặp.",
        en: "Separate fact from opinion and spot common logical fallacies.",
      },
      {
        vi: "Trích dẫn Harvard, liêm chính học thuật và kỹ thuật chống đạo văn chuẩn Pearson UK.",
        en: "Harvard referencing, academic integrity and anti-plagiarism techniques to the Pearson UK standard.",
      },
      {
        vi: "Quản lý dự án Agile/Scrum và làm việc nhóm hiệu suất cao trong môi trường đa văn hóa.",
        en: "Agile/Scrum project management and high-performance teamwork in multicultural settings.",
      },
    ],
    benefit: {
      vi: "Bản lĩnh của một nhà nghiên cứu độc lập: không bị dắt mũi bởi thông tin sai lệch, biết cấu trúc báo cáo thuyết phục cả chuyên gia khó tính nhất.",
      en: "The confidence of an independent researcher: never misled by false information, and able to structure a report that convinces even the toughest expert.",
    },
    artifact: {
      vi: "Báo cáo nghiên cứu chuẩn Harvard, quét Turnitin đạt chỉ số trùng lặp an toàn dưới 15%.",
      en: "A Harvard-referenced research report with a safe Turnitin similarity score below 15%.",
    },
    tools: ["Turnitin", "Miro Board", "Trello Scrum", "Google Workspace", "Grammarly Premium"],
    image: MEDIA.library,
  },
]

const DATA_UNITS: {
  id: string
  code: string
  level: string
  course: string
  title: L
  hours: string
  note: L
  image: string
}[] = [
  { id: "da-01", code: "H/618/7388", level: "Level 4 · HNC", course: "Programming", title: { vi: "Lập trình căn bản", en: "Programming" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: IMG.python },
  { id: "da-02", code: "M/618/7393", level: "Level 4 · HNC", course: "Networking", title: { vi: "Quản trị và thiết kế mạng", en: "Networking" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: IMG.cloud },
  { id: "da-03", code: "L/618/7398", level: "Level 4 · HNC", course: "Professional Practice", title: { vi: "Thực hành nghề nghiệp", en: "Professional Practice" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: MEDIA.studentsStudy },
  { id: "da-04", code: "A/618/7400", level: "Level 4 · HNC", course: "Database Design & Development", title: { vi: "Thiết kế và phát triển cơ sở dữ liệu", en: "Database Design & Development" }, hours: "60", note: { vi: "Môn chuyên sâu được nêu trong mô tả ngành.", en: "A specialist area named in the programme description." }, image: IMG.sql },
  { id: "da-05", code: "D/618/7406", level: "Level 4 · HNC", course: "Security", title: { vi: "Bảo mật hệ thống thông tin", en: "Security" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: MEDIA.library },
  { id: "da-06", code: "H/618/7407", level: "Level 4 · Pearson-set", course: "Planning a Computing Project", title: { vi: "Lập kế hoạch dự án CNTT", en: "Planning a Computing Project" }, hours: "60", note: { vi: "Đồ án do Pearson ra đề ở bậc 4.", en: "A Pearson-set project at Level 4." }, image: MEDIA.lectureHall },
  { id: "da-07", code: "F/618/7415", level: "Level 4 · Specialist", course: "Data Analytics", title: { vi: "Phân tích dữ liệu nền tảng", en: "Data Analytics" }, hours: "60", note: { vi: "Môn chuyên ngành bậc 4.", en: "A Level 4 specialist unit." }, image: IMG.eda },
  { id: "da-08", code: "R/618/7421", level: "Level 4 · Recommended", course: "Maths for Computing", title: { vi: "Toán ứng dụng trong tin học", en: "Maths for Computing" }, hours: "60", note: { vi: "Môn khuyến nghị ở bậc 4.", en: "A recommended Level 4 unit." }, image: MEDIA.newsAnalytics },
  { id: "da-09", code: "A/618/7428", level: "Level 5 · HND", course: "Business Process Support", title: { vi: "Hỗ trợ quy trình nghiệp vụ", en: "Business Process Support" }, hours: "60", note: { vi: "Môn HND bậc 5.", en: "A Level 5 HND unit." }, image: MEDIA.studentsCollab },
  { id: "da-10", code: "H/618/5723", level: "Level 5 · Specialist", course: "Advanced Programming", title: { vi: "Lập trình nâng cao cho phân tích dữ liệu", en: "Advanced Programming for Data Analysis" }, hours: "60", note: { vi: "Môn chuyên ngành bậc 5.", en: "A Level 5 specialist unit." }, image: IMG.python },
  { id: "da-11", code: "H/618/7438", level: "Level 5 · Specialist", course: "Machine Learning", title: { vi: "Học máy và mô hình thuật toán", en: "Machine Learning" }, hours: "60", note: { vi: "Môn chuyên ngành bậc 5.", en: "A Level 5 specialist unit." }, image: IMG.ml },
  { id: "da-12", code: "F/618/5664", level: "Level 5 · Specialist", course: "Big Data Analytics & Visualisation", title: { vi: "Dữ liệu lớn và trực quan hóa", en: "Big Data Analytics & Visualisation" }, hours: "60", note: { vi: "Môn chuyên ngành bậc 5.", en: "A Level 5 specialist unit." }, image: IMG.bi },
  { id: "da-13", code: "L/618/7448", level: "Level 5 · Option", course: "Applied Analytical Models", title: { vi: "Mô hình phân tích ứng dụng", en: "Applied Analytical Models" }, hours: "60", note: { vi: "Môn tự chọn bậc 5.", en: "A Level 5 optional unit." }, image: IMG.cloud },
  { id: "da-14", code: "J/618/7450", level: "Level 5 · Option", course: "Analytical Methods", title: { vi: "Phương pháp phân tích giải tích", en: "Analytical Methods" }, hours: "60", note: { vi: "Môn tự chọn bậc 5.", en: "A Level 5 optional unit." }, image: MEDIA.newsClassroom },
  { id: "da-15", code: "K/618/7425", level: "Level 5 · Pearson-set · 30 credits", course: "Computing Research Project", title: { vi: "Dự án nghiên cứu CNTT tốt nghiệp", en: "Computing Research Project" }, hours: "120", note: { vi: "Đồ án Pearson-set, 30 tín chỉ.", en: "A Pearson-set project worth 30 credits." }, image: MEDIA.newsCareer },
]

const DATA: ProgramSubject[] = DATA_UNITS.map((unit) => ({
  id: unit.id,
  code: unit.code,
  level: `${unit.level} · ${unit.hours} GLH`,
  course: unit.course,
  title: unit.title,
  hook: {
    vi: `${unit.title.vi} (${unit.course}). Mã Ofqual ${unit.code}. ${unit.note.vi}`,
    en: `${unit.title.en}. Ofqual code ${unit.code}. ${unit.note.en}`,
  },
  learn: [
    { vi: `${unit.hours} giờ học có hướng dẫn trong tổng 960 giờ của chương trình.`, en: `${unit.hours} guided learning hours, within the programme total of 960.` },
    { vi: unit.note.vi, en: unit.note.en },
    { vi: "Đánh giá bằng bài tập và đồ án theo chuẩn Pearson, không thi lý thuyết nhồi nhét.", en: "Assessed by Pearson assignments and projects, not by crammed theory exams." },
  ],
  benefit: {
    vi: "Năng lực thực hành trên chuẩn BTEC Level 5 HND in Computing, chuyên ngành Phân tích dữ liệu.",
    en: "Practical ability on the BTEC Level 5 HND in Computing, Data Analytics pathway.",
  },
  artifact: {
    vi: unit.hours === "120" ? "Đồ án nghiên cứu CNTT, 120 giờ, 30 tín chỉ, Pearson-set." : "Bài đánh giá Pearson của môn, 60 giờ có hướng dẫn.",
    en: unit.hours === "120" ? "A 120-hour, 30-credit Pearson-set computing research project." : "The Pearson assessment for this 60-hour unit.",
  },
  tools: [unit.level, `${unit.hours} GLH`],
  image: unit.image,
}))


const BIZ_UNITS: {
  id: string
  code: string
  level: string
  course: string
  title: L
  hours: string
  note: L
  image: string
}[] = [
  { id: "bm-01", code: "H/650/2917", level: "Level 4 · HNC", course: "Business and the Business Environment", title: { vi: "Môi trường kinh doanh đương đại", en: "Business and the Business Environment" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: IMG.canvas },
  { id: "bm-02", code: "A/618/5033", level: "Level 4 · HNC", course: "Marketing Processes and Planning", title: { vi: "Kế hoạch và quy trình Marketing", en: "Marketing Processes and Planning" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: IMG.marketing },
  { id: "bm-03", code: "J/650/2918", level: "Level 4 · HNC", course: "Human Resource Management", title: { vi: "Quản trị nguồn nhân lực", en: "Human Resource Management" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: IMG.pitching },
  { id: "bm-04", code: "L/618/5036", level: "Level 4 · HNC", course: "Leadership and Management", title: { vi: "Lãnh đạo và quản trị", en: "Leadership and Management" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: IMG.strategy },
  { id: "bm-05", code: "Y/618/5038", level: "Level 4 · HNC", course: "Accounting Principles", title: { vi: "Nguyên lý kế toán tài chính", en: "Accounting Principles" }, hours: "60", note: { vi: "Môn nền HNC.", en: "An HNC foundation unit." }, image: IMG.finance },
  { id: "bm-06", code: "D/618/5039", level: "Level 4 · Pearson-set", course: "Managing a Successful Business Project", title: { vi: "Quản trị dự án kinh doanh", en: "Managing a Successful Business Project" }, hours: "60", note: { vi: "Đồ án do Pearson ra đề ở bậc 4.", en: "A Pearson-set project at Level 4." }, image: MEDIA.lectureHall },
  { id: "bm-07", code: "H/617/0736", level: "Level 4 · Recommended", course: "Business Law", title: { vi: "Luật kinh doanh", en: "Business Law" }, hours: "60", note: { vi: "Môn khuyến nghị ở bậc 4.", en: "A recommended Level 4 unit." }, image: MEDIA.library },
  { id: "bm-08", code: "A/618/5078", level: "Level 4 · Management foundation", course: "Operations Management", title: { vi: "Quản trị vận hành doanh nghiệp", en: "Operations Management" }, hours: "60", note: { vi: "Môn nền tảng của chuyên ngành Quản trị.", en: "A foundation unit for the Management pathway." }, image: IMG.supply },
  { id: "bm-09", code: "R/650/2920", level: "Level 5 · HND", course: "Organisational Behaviour", title: { vi: "Hành vi tổ chức", en: "Organisational Behaviour" }, hours: "60", note: { vi: "Môn chuyên sâu được nêu trong mô tả ngành.", en: "A specialist area named in the programme description." }, image: MEDIA.studentsCollab },
  { id: "bm-10", code: "T/618/5080", level: "Level 5 · Specialist", course: "Business Strategy", title: { vi: "Chiến lược kinh doanh", en: "Business Strategy" }, hours: "60", note: { vi: "Môn chuyên ngành bắt buộc bậc 5.", en: "A mandatory Level 5 specialist unit." }, image: IMG.strategy },
  { id: "bm-11", code: "F/618/5096", level: "Level 5 · Specialist", course: "Operations and Supply Chain Management", title: { vi: "Quản trị vận hành và chuỗi cung ứng", en: "Operations and Supply Chain Management" }, hours: "60", note: { vi: "Môn chuyên ngành bắt buộc bậc 5.", en: "A mandatory Level 5 specialist unit." }, image: IMG.supply },
  { id: "bm-12", code: "M/618/5098", level: "Level 5 · Specialist", course: "Developing Individuals, Teams and Organisations", title: { vi: "Phát triển cá nhân, nhóm và tổ chức", en: "Developing Individuals, Teams and Organisations" }, hours: "60", note: { vi: "Môn chuyên ngành bắt buộc bậc 5.", en: "A mandatory Level 5 specialist unit." }, image: IMG.pitching },
  { id: "bm-13", code: "T/650/2921", level: "Level 5 · Option", course: "Understanding and Leading Change", title: { vi: "Hiểu và dẫn dắt sự thay đổi", en: "Understanding and Leading Change" }, hours: "60", note: { vi: "Môn tự chọn bậc 5.", en: "A Level 5 optional unit." }, image: MEDIA.newsClassroom },
  { id: "bm-14", code: "M/618/5076", level: "Level 5 · Option", course: "Global Business Environment", title: { vi: "Môi trường kinh doanh toàn cầu", en: "Global Business Environment" }, hours: "60", note: { vi: "Môn tự chọn bậc 5.", en: "A Level 5 optional unit." }, image: MEDIA.international },
  { id: "bm-15", code: "H/618/5060", level: "Level 5 · Pearson-set · 30 credits", course: "Research Project", title: { vi: "Dự án nghiên cứu kinh doanh tốt nghiệp", en: "Research Project" }, hours: "120", note: { vi: "Đồ án Pearson-set, 30 tín chỉ.", en: "A Pearson-set project worth 30 credits." }, image: MEDIA.newsCareer },
]

const BUSINESS: ProgramSubject[] = BIZ_UNITS.map((unit) => ({
  id: unit.id,
  code: unit.code,
  level: `${unit.level} · ${unit.hours} GLH`,
  course: unit.course,
  title: unit.title,
  hook: {
    vi: `${unit.title.vi} (${unit.course}). Mã Ofqual ${unit.code}. ${unit.note.vi}`,
    en: `${unit.title.en}. Ofqual code ${unit.code}. ${unit.note.en}`,
  },
  learn: [
    { vi: `${unit.hours} giờ học có hướng dẫn trong tổng 960 giờ của chương trình.`, en: `${unit.hours} guided learning hours, within the programme total of 960.` },
    { vi: unit.note.vi, en: unit.note.en },
    { vi: "Đánh giá bằng bài tập và đồ án theo chuẩn Pearson, không thi lý thuyết nhồi nhét.", en: "Assessed by Pearson assignments and projects, not by crammed theory exams." },
  ],
  benefit: {
    vi: "Năng lực điều hành trên chuẩn BTEC Level 5 HND in Business, chuyên ngành Quản trị.",
    en: "Management ability on the BTEC Level 5 HND in Business, Management pathway.",
  },
  artifact: {
    vi: unit.hours === "120" ? "Đồ án nghiên cứu kinh doanh, 120 giờ, 30 tín chỉ, Pearson-set." : "Bài đánh giá Pearson của môn, 60 giờ có hướng dẫn.",
    en: unit.hours === "120" ? "A 120-hour, 30-credit Pearson-set business research project." : "The Pearson assessment for this 60-hour unit.",
  },
  tools: [unit.level, `${unit.hours} GLH`],
  image: unit.image,
}))

export const PROGRAM_SUBJECTS: Record<SubjectTrackId, ProgramSubject[]> = {
  foundation: FOUNDATION,
  "data-analytics": DATA,
  "business-management": BUSINESS,
}

export function isSubjectTrack(id: string): id is SubjectTrackId {
  return id in PROGRAM_SUBJECTS
}
