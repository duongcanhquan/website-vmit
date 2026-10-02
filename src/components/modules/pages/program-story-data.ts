import { MEDIA } from "@/constants/media"
import type { Locale } from "@/lib/i18n/types"

type Line = { vi: string; en: string }

export type ProgramStep = {
  id: string
  code: string
  unit: string
  title: string
  learn: string[]
  tools: string[]
  application: string
  output: string
  image: string
}

export type ProgramTrack = {
  id: string
  index: string
  name: string
  standard: string
  promise: string
  lead: string
  salary: string
  image: string
  steps: ProgramStep[]
}

export type ProgramStory = {
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  scrollHint: string
  guaranteesTitle: string
  guarantees: { title: string; body: string }[]
  switchLabel: string
  outputLabel: string
  toolsLabel: string
  applyLabel: string
  closeEyebrow: string
  closeTitle: string
  closeLead: string
  tracks: ProgramTrack[]
}

const line = (locale: Locale, copy: Line) => copy[locale]

const foundationSteps = [
  {
    id: "f-1",
    image: MEDIA.seminar,
    code: { vi: "Trụ 1", en: "Pillar 1" },
    unit: "Academic English & Flipped Classroom",
    title: { vi: "Tiếng Anh phản xạ", en: "Instinctive English" },
    learn: [
      {
        vi: "Bỏ ngữ pháp thụ động. Sinh viên xem micro-video ở nhà, 100% giờ lớp dành cho tranh biện, thuyết trình và đóng vai.",
        en: "Leave passive grammar drills behind. Students watch micro-videos at home, and 100% of class time goes to debate, presentations and role-play.",
      },
      {
        vi: "Luyện phản xạ nói trực tiếp bằng tiếng Anh, để hết sợ nói sai.",
        en: "Build the reflex to speak English on the spot, and lose the fear of making mistakes.",
      },
    ],
    tools: ["ELSA Speak Pro", "Oxford Academic", "Quizlet", "BBC Learning English"],
    application: {
      vi: "Thuyết trình ý tưởng dự án bằng tiếng Anh và đọc case study nguyên bản của Pearson.",
      en: "Pitch a project idea in English and read original Pearson case studies.",
    },
    output: {
      vi: "Trình độ tương đương IELTS 5.0–5.5+ / B2 CEFR, kèm video thuyết trình cá nhân.",
      en: "English equivalent to IELTS 5.0–5.5+ / CEFR B2, plus a personal presentation video.",
    },
  },
  {
    id: "f-2",
    image: MEDIA.lab,
    code: { vi: "Trụ 2", en: "Pillar 2" },
    unit: "AI Power & Agentic Mastery",
    title: { vi: "Làm chủ AI", en: "AI mastery" },
    learn: [
      {
        vi: "Biến ChatGPT, Claude và Copilot thành gia sư 1-1, hỗ trợ học 24/7.",
        en: "Turn ChatGPT, Claude and Copilot into one-to-one tutors that support your learning 24/7.",
      },
      {
        vi: "Học Prompt Engineering và cách điều phối AI Agents để nghiên cứu, tóm tắt và lập kế hoạch.",
        en: "Learn prompt engineering and how to coordinate AI agents for research, summaries and planning.",
      },
    ],
    tools: ["ChatGPT", "Claude", "Microsoft Copilot", "Notion AI", "Gamma", "Canva AI"],
    application: {
      vi: "Tự động hóa nghiên cứu và soạn thảo, rút ngắn khoảng 70% thời gian làm việc.",
      en: "Automate research and drafting, cutting working time by around 70%.",
    },
    output: {
      vi: "Bộ trợ lý AI dùng suốt 2 năm, và một đề án tự động hóa cho doanh nghiệp thật.",
      en: "A personal AI assistant toolkit for all two years, plus an automation proposal for a real business.",
    },
  },
  {
    id: "f-3",
    image: MEDIA.library,
    code: { vi: "Trụ 3", en: "Pillar 3" },
    unit: "Critical Thinking & Academic Skills",
    title: { vi: "Tư duy phản biện", en: "Critical thinking" },
    learn: [
      {
        vi: "Rèn phản biện, giải quyết vấn đề, trích dẫn Harvard và phòng đạo văn.",
        en: "Build critical thinking, problem-solving, Harvard referencing and plagiarism avoidance.",
      },
      {
        vi: "Làm việc nhóm theo Agile/Scrum và quản lý thời gian số.",
        en: "Work in Agile/Scrum teams and manage your time with digital tools.",
      },
    ],
    tools: ["Miro", "Trello", "Turnitin", "Google Workspace", "Grammarly"],
    application: {
      vi: "Viết báo cáo học thuật và bảo vệ quan điểm trước giảng viên cùng doanh nghiệp.",
      en: "Write academic reports and defend your position before lecturers and employers.",
    },
    output: {
      vi: "Báo cáo chuẩn Harvard, kiểm Turnitin dưới 15% similarity.",
      en: "A Harvard-referenced report scoring under 15% similarity on Turnitin.",
    },
  },
]

const dataSteps = [
  {
    id: "d-1",
    image: MEDIA.newsLab,
    code: { vi: "Học kỳ 1", en: "Term 1" },
    unit: "Programming · Networking · Professional Practice",
    title: { vi: "Nền tảng tin học", en: "Computing foundations" },
    learn: [
      { vi: "Lập trình căn bản — H/618/7388, Level 4, 60 giờ.", en: "Programming — H/618/7388, Level 4, 60 hours." },
      { vi: "Quản trị và thiết kế mạng — M/618/7393, Level 4, 60 giờ.", en: "Networking — M/618/7393, Level 4, 60 hours." },
      { vi: "Thực hành nghề nghiệp — L/618/7398, Level 4, 60 giờ.", en: "Professional Practice — L/618/7398, Level 4, 60 hours." },
    ],
    tools: ["Level 4 · HNC", "60 GLH"],
    application: {
      vi: "Ba môn nền của HNC, trước khi vào các môn phân tích dữ liệu.",
      en: "Three HNC foundation units, before the specialist data units.",
    },
    output: {
      vi: "Bài đánh giá Pearson cho lập trình, mạng và thực hành nghề nghiệp.",
      en: "Pearson assessments in programming, networking and professional practice.",
    },
  },
  {
    id: "d-2",
    image: MEDIA.newsAnalytics,
    code: { vi: "Học kỳ 2", en: "Term 2" },
    unit: "Database Design & Development · Security · Planning a Computing Project",
    title: { vi: "Dữ liệu, bảo mật, dự án", en: "Data, security, projects" },
    learn: [
      { vi: "Thiết kế và phát triển CSDL — A/618/7400, Level 4, 60 giờ.", en: "Database Design & Development — A/618/7400, Level 4, 60 hours." },
      { vi: "Bảo mật hệ thống thông tin — D/618/7406, Level 4, 60 giờ.", en: "Security — D/618/7406, Level 4, 60 hours." },
      { vi: "Lập kế hoạch dự án CNTT — H/618/7407, Level 4, Pearson-set, 60 giờ.", en: "Planning a Computing Project — H/618/7407, Level 4, Pearson-set, 60 hours." },
    ],
    tools: ["Level 4 · HNC", "Pearson-set"],
    application: {
      vi: "Một đồ án Pearson ngay ở bậc HNC, cùng môn cơ sở dữ liệu và bảo mật.",
      en: "A Pearson-set project at HNC level, alongside database design and security.",
    },
    output: {
      vi: "Kế hoạch dự án CNTT chuẩn Pearson và bài đánh giá CSDL, bảo mật.",
      en: "A Pearson computing project plan, plus database and security assessments.",
    },
  },
  {
    id: "d-3",
    image: MEDIA.studentsStudy,
    code: { vi: "Học kỳ 3", en: "Term 3" },
    unit: "Data Analytics · Maths for Computing",
    title: { vi: "Phân tích dữ liệu nền tảng", en: "Foundational data analytics" },
    learn: [
      { vi: "Phân tích dữ liệu nền tảng — F/618/7415, Level 4, môn chuyên ngành, 60 giờ.", en: "Data Analytics — F/618/7415, Level 4 specialist, 60 hours." },
      { vi: "Toán ứng dụng trong tin học — R/618/7421, Level 4, môn khuyến nghị, 60 giờ.", en: "Maths for Computing — R/618/7421, Level 4 recommended unit, 60 hours." },
    ],
    tools: ["Level 4 · Specialist", "60 GLH"],
    application: {
      vi: "Môn chuyên ngành đầu tiên của lộ trình Phân tích dữ liệu.",
      en: "The first specialist unit on the Data Analytics pathway.",
    },
    output: {
      vi: "Bài đánh giá Pearson cho phân tích dữ liệu và toán tin.",
      en: "Pearson assessments in data analytics and maths for computing.",
    },
  },
  {
    id: "d-4",
    image: MEDIA.lectureHall,
    code: { vi: "Học kỳ 4", en: "Term 4" },
    unit: "Business Process Support · Advanced Programming · Machine Learning",
    title: { vi: "Lập trình và học máy", en: "Programming and machine learning" },
    learn: [
      { vi: "Hỗ trợ quy trình nghiệp vụ — A/618/7428, Level 5, 60 giờ.", en: "Business Process Support — A/618/7428, Level 5, 60 hours." },
      { vi: "Lập trình nâng cao cho phân tích dữ liệu — H/618/5723, Level 5, 60 giờ.", en: "Advanced Programming for Data Analysis — H/618/5723, Level 5, 60 hours." },
      { vi: "Học máy — H/618/7438, Level 5, môn chuyên ngành, 60 giờ.", en: "Machine Learning — H/618/7438, Level 5 specialist, 60 hours." },
    ],
    tools: ["Level 5 · HND", "Specialist"],
    application: {
      vi: "Bậc HND: lập trình nâng cao và mô hình học máy cho bài toán dữ liệu.",
      en: "HND level: advanced programming and machine-learning models for data problems.",
    },
    output: {
      vi: "Bài đánh giá Pearson cho quy trình nghiệp vụ, lập trình nâng cao và học máy.",
      en: "Pearson assessments in business processes, advanced programming and machine learning.",
    },
  },
  {
    id: "d-5",
    image: MEDIA.newsClassroom,
    code: { vi: "Học kỳ 5", en: "Term 5" },
    unit: "Big Data Analytics & Visualisation · Applied Analytical Models · Analytical Methods",
    title: { vi: "Dữ liệu lớn và mô hình", en: "Big data and models" },
    learn: [
      { vi: "Dữ liệu lớn và trực quan hóa — F/618/5664, Level 5, môn chuyên ngành, 60 giờ.", en: "Big Data Analytics & Visualisation — F/618/5664, Level 5 specialist, 60 hours." },
      { vi: "Mô hình phân tích ứng dụng — L/618/7448, Level 5, môn tự chọn, 60 giờ.", en: "Applied Analytical Models — L/618/7448, Level 5 option, 60 hours." },
      { vi: "Phương pháp phân tích giải tích — J/618/7450, Level 5, môn tự chọn, 60 giờ.", en: "Analytical Methods — J/618/7450, Level 5 option, 60 hours." },
    ],
    tools: ["Level 5 · Specialist", "L5 option"],
    application: {
      vi: "Môn chuyên ngành dữ liệu lớn, cùng hai môn tự chọn bậc 5.",
      en: "The big-data specialist unit, plus two Level 5 optional units.",
    },
    output: {
      vi: "Bài đánh giá Pearson cho trực quan hóa dữ liệu lớn và mô hình phân tích.",
      en: "Pearson assessments in big-data visualisation and analytical models.",
    },
  },
  {
    id: "d-6",
    image: MEDIA.newsCareer,
    code: { vi: "Học kỳ 6", en: "Term 6" },
    unit: "Computing Research Project · K/618/7425",
    title: { vi: "Đồ án nghiên cứu tốt nghiệp", en: "Final research project" },
    learn: [
      { vi: "Dự án nghiên cứu CNTT — K/618/7425, Level 5, Pearson-set, 30 tín chỉ.", en: "Computing Research Project — K/618/7425, Level 5, Pearson-set, 30 credits." },
      { vi: "120 giờ học có hướng dẫn, dài gấp đôi các môn 60 giờ.", en: "120 guided learning hours, twice a standard 60-hour unit." },
      { vi: "Một trong ít nhất hai đồ án lớn chuẩn Pearson của cả chương trình.", en: "One of at least two major Pearson-set projects in the programme." },
    ],
    tools: ["Level 5", "120 GLH", "30 credits"],
    application: {
      vi: "Đồ án tốt nghiệp thay cho bài thi lý thuyết cuối khóa.",
      en: "A final project in place of a crammed end-of-course theory exam.",
    },
    output: {
      vi: "Đồ án nghiên cứu CNTT bảo vệ theo chuẩn Pearson.",
      en: "A computing research project assessed to the Pearson standard.",
    },
  },
]

const businessSteps = [
  {
    id: "b-1",
    image: MEDIA.studentsCollab,
    code: { vi: "Học kỳ 1", en: "Term 1" },
    unit: "Unit 1 · The Contemporary Business Environment + Business English + AI",
    title: { vi: "Tư duy kinh doanh", en: "Business thinking" },
    learn: [
      { vi: "Đọc môi trường kinh doanh bằng PESTLE, SWOT và Porter’s 5 Forces.", en: "Analyse the business environment with PESTLE, SWOT and Porter’s Five Forces." },
      { vi: "Dùng AI để soạn hợp đồng và lập kế hoạch vận hành.", en: "Use AI to draft contracts and plan operations." },
      { vi: "Tiếng Anh thương mại và thuyết trình quốc tế.", en: "Business English and presenting to international audiences." },
    ],
    tools: ["Business Model Canvas", "Notion", "ChatGPT", "Canva"],
    application: {
      vi: "Đánh giá sức khỏe cạnh tranh của một doanh nghiệp bán lẻ tại Việt Nam.",
      en: "Assess the competitive health of a retail business in Vietnam.",
    },
    output: {
      vi: "Bản Business Model Canvas và đề xuất chuyển đổi số văn phòng.",
      en: "A Business Model Canvas and a digital office transformation proposal.",
    },
  },
  {
    id: "b-2",
    image: MEDIA.international,
    code: { vi: "Học kỳ 2", en: "Term 2" },
    unit: "Unit 2 · Marketing Processes & Planning · Unit 5 · Accounting Principles",
    title: { vi: "Marketing và tài chính", en: "Marketing and finance" },
    learn: [
      { vi: "Định vị thương hiệu và phễu digital marketing.", en: "Brand positioning and digital marketing funnels." },
      { vi: "Đọc bảng cân đối, kết quả kinh doanh và lưu chuyển tiền tệ.", en: "Read balance sheets, income statements and cash flow statements." },
      { vi: "Tính điểm hòa vốn, quản trị chi phí và lập ngân sách.", en: "Break-even analysis, cost control and budgeting." },
    ],
    tools: ["GA4", "Meta Ads", "Excel", "CapCut"],
    application: {
      vi: "Một chiến dịch đa kênh, tính được hòa vốn và ROI.",
      en: "A multichannel campaign with a calculated break-even point and ROI.",
    },
    output: {
      vi: "Kế hoạch digital marketing gắn với dự toán dòng tiền.",
      en: "A digital marketing plan tied to a cash flow forecast.",
    },
  },
  {
    id: "b-3",
    image: MEDIA.campusFacility,
    code: { vi: "Học kỳ 3", en: "Term 3" },
    unit: "Unit 26 · Principles of Operations Management · Unit 54 · E-Commerce & Strategy",
    title: { vi: "Chuỗi cung ứng và TMĐT", en: "Supply chain and e-commerce" },
    learn: [
      { vi: "Chuỗi cung ứng tinh gọn: Lean, JIT và quản lý kho EOQ.", en: "Lean supply chains: Lean, JIT and EOQ inventory management." },
      { vi: "Bán lẻ đa kênh và sàn thương mại điện tử.", en: "Omnichannel retail and marketplace selling." },
      { vi: "Tối ưu chuyển đổi và quy trình giao hàng.", en: "Optimising conversion and the fulfilment process." },
    ],
    tools: ["Shopee", "TikTok Shop", "Shopify", "Odoo"],
    application: {
      vi: "Dựng kho và gian hàng thật, đo chi phí logistics và hoàn đơn.",
      en: "Set up a real warehouse and store, and measure logistics and return costs.",
    },
    output: {
      vi: "Gian hàng thương mại điện tử đủ SEO, fulfillment và báo cáo tồn kho.",
      en: "An SEO-optimised online store with fulfilment and inventory reporting.",
    },
  },
  {
    id: "b-4",
    image: MEDIA.aboutStudent,
    code: { vi: "Học kỳ 4", en: "Term 4" },
    unit: "Unit 3 · Human Resource Management · Unit 4 · Leadership & Management",
    title: { vi: "Nhân sự và lãnh đạo", en: "People and leadership" },
    learn: [
      { vi: "Lãnh đạo tình huống và đọc tính cách qua DISC, MBTI.", en: "Situational leadership, and reading people with DISC and MBTI." },
      { vi: "Tuyển dụng, hội nhập và đánh giá KPI/OKR.", en: "Recruitment, onboarding and KPI/OKR appraisals." },
      { vi: "Luật lao động Việt Nam và cách giải xung đột.", en: "Vietnamese labour law and conflict resolution." },
    ],
    tools: ["DISC", "HRM", "KPI Dashboard"],
    application: {
      vi: "Khung năng lực và chính sách giữ người cho công ty khoảng 50 nhân sự.",
      en: "A competency framework and retention policy for a company of around 50 staff.",
    },
    output: {
      vi: "Sổ tay văn hóa và bộ quy chế KPI/OKR cho doanh nghiệp vừa.",
      en: "A culture handbook and a KPI/OKR policy framework for a mid-sized business.",
    },
  },
  {
    id: "b-5",
    image: MEDIA.campusArchitecture,
    code: { vi: "Học kỳ 5", en: "Term 5" },
    unit: "Unit 43 · Business Strategy · Unit 8 · Innovation & Commercialisation",
    title: { vi: "Chiến lược tăng trưởng", en: "Growth strategy" },
    learn: [
      { vi: "Đại dương xanh và cạnh tranh bằng khác biệt.", en: "Blue Ocean Strategy and competing through differentiation." },
      { vi: "Design Thinking để làm ra sản phẩm mới.", en: "Design thinking to create new products." },
      { vi: "Thẩm định khả thi và cách vào một thị trường mới.", en: "Feasibility assessment and how to enter a new market." },
    ],
    tools: ["Miro", "Ansoff", "BCG", "Design Thinking"],
    application: {
      vi: "Nghiên cứu một thị trường ngách và kế hoạch tung sản phẩm.",
      en: "Research a niche market and plan a product launch.",
    },
    output: {
      vi: "Đề án chiến lược tăng trưởng trình ban giám hiệu.",
      en: "A growth strategy proposal presented to the college leadership.",
    },
  },
  {
    id: "b-6",
    image: MEDIA.heroCampusUk,
    code: { vi: "Học kỳ 6", en: "Term 6" },
    unit: "Unit 19 · Research Project + 80-hour management internship",
    title: { vi: "Khởi nghiệp và thực tập", en: "Start-up and internship" },
    learn: [
      { vi: "Đề án nghiên cứu kinh doanh theo chuẩn Pearson.", en: "A business research project to the Pearson standard." },
      { vi: "80 giờ thực tập quản trị trong hệ sinh thái EQuest và tập đoàn đa quốc gia.", en: "An 80-hour management internship in the EQuest ecosystem and multinationals." },
      { vi: "Đàm phán hợp đồng và pitching gọi vốn.", en: "Contract negotiation and investor pitching." },
    ],
    tools: ["Pitch Deck", "Feasibility Study"],
    application: {
      vi: "Giải một điểm nghẽn vận hành hoặc một hướng mở thị trường thật.",
      en: "Tackle a real operational bottleneck or a real market expansion opportunity.",
    },
    output: {
      vi: "Đề án bảo vệ trước hội đồng Pearson và doanh nghiệp, kèm thư giới thiệu việc làm.",
      en: "A project defended before a Pearson panel and the business, plus a letter of recommendation.",
    },
  },
]

function mapSteps(
  locale: Locale,
  steps: {
    id: string
    image: string
    code: Line
    unit: string
    title: Line
    learn: Line[]
    tools: string[]
    application: Line
    output: Line
  }[],
): ProgramStep[] {
  return steps.map((step) => ({
    id: step.id,
    code: line(locale, step.code),
    unit: step.unit,
    title: line(locale, step.title),
    learn: step.learn.map((item) => line(locale, item)),
    tools: step.tools,
    application: line(locale, step.application),
    output: line(locale, step.output),
    image: step.image,
  }))
}

export function programStory(locale: Locale): ProgramStory {
  return {
    heroEyebrow: "Journey to World-Class Excellence",
    heroTitle: line(locale, {
      vi: "Ba chương trình.\nMỘT CÁCH HỌC THỰC CHIẾN HIỆU QUẢ",
      en: "Three programmes.\nONE EFFECTIVE, HANDS-ON APPROACH",
    }),
    heroLead: line(locale, {
      vi: "Song bằng Cao đẳng chính quy và Pearson BTEC Level 5. Qua môn bằng dự án, không bằng bài thi nhồi nhét. Học qua thực hành.",
      en: "A dual award: a formal college diploma and a Pearson BTEC Level 5. Pass through projects, not crammed exams. Learn by doing.",
    }),
    scrollHint: line(locale, { vi: "Xem ba chương trình", en: "Explore the three programmes" }),
    guaranteesTitle: line(locale, { vi: "Bốn điều VMIT giữ", en: "Four promises VMIT keeps" }),
    guarantees: [
      {
        title: line(locale, { vi: "Học bằng dự án", en: "Project-based learning" }),
        body: line(locale, {
          vi: "Không thi lý thuyết nhồi nhét. Sản phẩm được thẩm định hai lớp, có giám sát của Pearson UK.",
          en: "No crammed theory exams. Every piece of work is verified at two levels, under Pearson UK oversight.",
        }),
      },
      {
        title: line(locale, { vi: "Song bằng", en: "Dual qualifications" }),
        body: line(locale, {
          vi: "Cao đẳng chính quy Việt Nam và Pearson BTEC HND Level 5, được công nhận tại hơn 100 quốc gia.",
          en: "A Vietnamese formal college diploma and the Pearson BTEC HND Level 5, recognised in more than 100 countries.",
        }),
      },
      {
        title: line(locale, { vi: "Năm cuối quốc tế", en: "An international final year" }),
        body: line(locale, {
          vi: "Hai năm tại VMIT, rồi một năm cuối tại Sunderland (Anh), Macquarie (Úc) hoặc Keiser (Mỹ).",
          en: "Two years at VMIT, then a final year at Sunderland (UK), Macquarie (Australia) or Keiser (USA).",
        }),
      },
      {
        title: line(locale, { vi: "Việc làm khởi điểm", en: "Starting salaries" }),
        body: line(locale, {
          vi: "Data Analytics đào tạo chuyên viên phân tích, kỹ sư dữ liệu và học máy. Business Management 12–18 triệu/tháng.",
          en: "Data Analytics prepares data analysts, data engineers and machine-learning assistants. Business Management: 12–18 million VND/month.",
        }),
      },
    ],
    switchLabel: line(locale, { vi: "Chọn chương trình", en: "Choose a programme" }),
    outputLabel: line(locale, { vi: "Sản phẩm cầm tay", en: "What you leave with" }),
    toolsLabel: line(locale, { vi: "Công cụ", en: "Tools" }),
    applyLabel: line(locale, {
      vi: "Đăng ký xét học bạ & nhận tư vấn lộ trình 1-1",
      en: "Apply with your transcript & get 1-1 pathway advice",
    }),
    closeEyebrow: line(locale, { vi: "Vốn nhẹ — bước xa", en: "Invest less — go further" }),
    closeTitle: line(locale, {
      vi: "Vào học từ 15 triệu. Ra trường với việc làm đã nói rõ mức lương.",
      en: "Start from 15 million VND. Graduate into a job with a clearly stated salary.",
    }),
    closeLead: line(locale, {
      vi: "Học phí chia theo kỳ. Hợp đồng hướng tới mức 12–22 triệu đồng mỗi tháng, tùy ngành.",
      en: "Tuition is paid term by term. The contract targets a salary of 12–22 million VND a month, depending on the programme.",
    }),
    tracks: [
      {
        id: "foundation",
        index: "01",
        name: "Foundation Bootcamp",
        standard: line(locale, { vi: "Học kỳ tiền đề · AI Accelerator", en: "Foundation term · AI Accelerator" }),
        promise: line(locale, {
          vi: "Không lo mất gốc tiếng Anh. Tự tin bước vào chuẩn Anh.",
          en: "Weak English? No problem. Step confidently into a UK-standard programme.",
        }),
        lead: line(locale, {
          vi: "Nếu tiếng Anh chưa vững, liệu có học nổi chương trình Anh? Trước chuyên ngành, mọi tân sinh viên đi qua Foundation Bootcamp: phản xạ ngôn ngữ, AI thành trợ thủ, và cách học học thuật cho hai năm phía trước.",
          en: "Worried your English isn’t strong enough for a UK programme? Before starting their major, every new student completes the Foundation Bootcamp: English speaking reflexes, AI as a study assistant, and the academic skills for the two years ahead.",
        }),
        salary: line(locale, { vi: "Cửa ngõ vào cả hai ngành", en: "The gateway to both majors" }),
        image: MEDIA.seminar,
        steps: mapSteps(locale, foundationSteps),
      },
      {
        id: "data-analytics",
        index: "02",
        name: "Data Analytics",
        standard: "BTEC Level 5 HND in Computing · Data Analytics",
        promise: line(locale, {
          vi: "Thu thập, xử lý, phân tích dữ liệu và xây dựng mô hình dự báo trên chuẩn Pearson.",
          en: "Collect, process and analyse data, and build forecasting models to the Pearson standard.",
        }),
        lead: line(locale, {
          vi: "Chuyên ngành Phân tích dữ liệu theo chuẩn BTEC Level 5 HND in Computing. Hai năm, sáu học kỳ, 15 môn, 240 tín chỉ RQF, 960 giờ học có hướng dẫn và 1.440 giờ tự học. Sinh viên làm từ hai đồ án Pearson trở lên, rồi có thể đi làm chuyên viên phân tích dữ liệu, kỹ sư dữ liệu, phân tích vận hành, trợ lý kỹ sư học máy, quản trị cơ sở dữ liệu hoặc tư vấn chuyển đổi số. Tuyển sinh: đã tốt nghiệp THPT hoặc tương đương; sinh viên cao đẳng, đại học muốn chuyển tiếp; hoặc tốt nghiệp trung cấp nghề và đã có bằng THPT. Tiếng Anh nền tảng xếp theo trình độ đầu vào.",
          en: "Data Analytics follows the BTEC Level 5 HND in Computing. Two years, six terms, 15 units, 240 RQF credits, 960 guided learning hours and 1,440 hours of independent study. Students complete two or more Pearson-set projects, then can work as a data analyst, data engineer, operations analyst, junior machine learning engineer, database administrator or digital transformation consultant. Entry: high-school graduation or equivalent; college or university students transferring in; or a vocational diploma plus a high-school certificate. The English foundation is set to each learner’s starting level.",
        }),
        salary: line(locale, { vi: "2 năm · 6 học kỳ · 240 tín chỉ", en: "2 years · 6 terms · 240 credits" }),
        image: MEDIA.lab,
        steps: mapSteps(locale, dataSteps),
      },
      {
        id: "business-management",
        index: "03",
        name: "Business Management",
        standard: "Pearson BTEC Higher National Diploma in Business · Management Pathway",
        promise: line(locale, {
          vi: "Nhà quản lý trẻ biết dùng AI, đọc tài chính và điều hành thật.",
          en: "Young managers who use AI, read the financials and run real operations.",
        }),
        lead: line(locale, {
          vi: "Kinh doanh số không còn là giáo trình đóng băng. Sáu học kỳ đưa bạn qua marketing, tài chính, thương mại điện tử, nhân sự và chiến lược, rồi 80 giờ thực tập quản lý. Lương khởi điểm 12–18 triệu đồng mỗi tháng.",
          en: "Digital business is no longer a frozen textbook. Six terms take you through marketing, finance, e-commerce, HR and strategy, followed by an 80-hour management internship. Starting salaries are 12–18 million VND a month.",
        }),
        salary: line(locale, { vi: "12–18 triệu/tháng", en: "12–18 million VND/month" }),
        image: MEDIA.studentsCollab,
        steps: mapSteps(locale, businessSteps),
      },
    ],
  }
}

export const PROGRAM_SECTION_IDS = ["foundation", "data-analytics", "business-management"] as const
