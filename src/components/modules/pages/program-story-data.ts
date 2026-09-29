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
    unit: "Unit 1 · Programming + AI Foundation",
    title: { vi: "Lập trình Python", en: "Python programming" },
    learn: [
      { vi: "Tư duy giải thuật và Python hiện đại.", en: "Algorithmic thinking and modern Python." },
      { vi: "Dùng Copilot và ChatGPT để viết, rồi tự kiểm thử code.", en: "Use Copilot and ChatGPT to draft code, then test it yourself." },
      { vi: "Tiếng Anh chuyên ngành dữ liệu.", en: "Technical English for data." },
    ],
    tools: ["Python", "VS Code", "GitHub", "Colab"],
    application: {
      vi: "Cào, lọc và làm sạch tệp dữ liệu thô hàng trăm nghìn dòng.",
      en: "Scrape, filter and clean raw data files with hundreds of thousands of rows.",
    },
    output: {
      vi: "Ứng dụng Python tự xử lý và trích xuất báo cáo doanh số.",
      en: "A Python app that processes data and generates sales reports automatically.",
    },
  },
  {
    id: "d-2",
    image: MEDIA.newsAnalytics,
    code: { vi: "Học kỳ 2", en: "Term 2" },
    unit: "Unit 4 · Database Design & Development · Unit 3 · Professional Practice",
    title: { vi: "Cơ sở dữ liệu SQL", en: "SQL databases" },
    learn: [
      { vi: "Thiết kế CSDL quan hệ chuẩn hóa: ERD và 3NF.", en: "Design a normalised relational database: ERD and 3NF." },
      { vi: "Viết SQL phức tạp: JOIN, window functions, subqueries.", en: "Write complex SQL: JOINs, window functions and subqueries." },
      { vi: "Làm việc nhóm theo Agile/Scrum.", en: "Work in Agile/Scrum teams." },
    ],
    tools: ["PostgreSQL", "MySQL", "DBeaver", "Lucidchart", "Jira"],
    application: {
      vi: "Truy vấn dữ liệu người dùng và đối soát giao dịch từ ERP/CRM.",
      en: "Query user data and reconcile transactions from ERP/CRM systems.",
    },
    output: {
      vi: "CSDL bán lẻ chuẩn hóa và kho 50 câu SQL cho báo cáo quản trị.",
      en: "A normalised retail database and a bank of 50 SQL queries for management reports.",
    },
  },
  {
    id: "d-3",
    image: MEDIA.studentsStudy,
    code: { vi: "Học kỳ 3", en: "Term 3" },
    unit: "Unit 14 · Maths for Computing · Unit 8 · Data Analytics",
    title: { vi: "Toán ứng dụng", en: "Applied mathematics" },
    learn: [
      { vi: "Xác suất, kiểm định giả thuyết và A/B testing.", en: "Probability, hypothesis testing and A/B testing." },
      { vi: "Xử lý dữ liệu lớn với NumPy và Pandas.", en: "Process large datasets with NumPy and Pandas." },
      { vi: "Trực quan hóa với Matplotlib và Seaborn.", en: "Data visualisation with Matplotlib and Seaborn." },
    ],
    tools: ["Pandas", "NumPy", "Seaborn", "Jupyter"],
    application: {
      vi: "Phân tích hành vi khách thương mại điện tử và tối ưu tỷ lệ chuyển đổi.",
      en: "Analyse e-commerce customer behaviour and optimise conversion rates.",
    },
    output: {
      vi: "Báo cáo định lượng hành vi tiêu dùng và kết quả A/B testing.",
      en: "A quantitative report on consumer behaviour and A/B test results.",
    },
  },
  {
    id: "d-4",
    image: MEDIA.lectureHall,
    code: { vi: "Học kỳ 4", en: "Term 4" },
    unit: "Unit 26 · Big Data Analytics & Visualisation · Unit 6 · Pearson-set Project",
    title: { vi: "Dashboard điều hành", en: "Executive dashboards" },
    learn: [
      { vi: "Kho dữ liệu, data mart và luồng ETL.", en: "Data warehouses, data marts and ETL pipelines." },
      { vi: "Mô hình Star Schema và Snowflake.", en: "Star and snowflake schemas." },
      { vi: "Thiết kế dashboard theo cách người ra quyết định thực sự đọc số.", en: "Design dashboards around how decision-makers actually read numbers." },
    ],
    tools: ["Power BI", "Tableau", "DAX", "Power Query"],
    application: {
      vi: "Bảng điều khiển doanh thu và dòng tiền để ban giám đốc nhìn trong vài giây.",
      en: "A revenue and cash flow dashboard the board can read in seconds.",
    },
    output: {
      vi: "Executive BI Dashboard thời gian thực cho chuỗi bán lẻ hoặc ngân hàng.",
      en: "A real-time executive BI dashboard for a retail chain or bank.",
    },
  },
  {
    id: "d-5",
    image: MEDIA.newsClassroom,
    code: { vi: "Học kỳ 5", en: "Term 5" },
    unit: "Unit 25 · Machine Learning · Unit 28 · Cloud Computing",
    title: { vi: "Machine learning", en: "Machine learning" },
    learn: [
      { vi: "Học có giám sát và không giám sát: hồi quy, Random Forest, K-Means.", en: "Supervised and unsupervised learning: regression, Random Forest, K-Means." },
      { vi: "Đánh giá mô hình bằng Precision, Recall và ROC-AUC.", en: "Evaluate models with precision, recall and ROC-AUC." },
      { vi: "Đưa mô hình lên AWS hoặc Google Cloud.", en: "Deploy models to AWS or Google Cloud." },
    ],
    tools: ["Scikit-Learn", "XGBoost", "AWS", "BigQuery"],
    application: {
      vi: "Dự báo khách hàng sắp rời bỏ và gợi ý sản phẩm bán kèm.",
      en: "Predict which customers are about to churn and recommend cross-sell products.",
    },
    output: {
      vi: "Mô hình dự báo rời bỏ chạy trên hạ tầng cloud.",
      en: "A churn prediction model running on cloud infrastructure.",
    },
  },
  {
    id: "d-6",
    image: MEDIA.newsCareer,
    code: { vi: "Học kỳ 6", en: "Term 6" },
    unit: "Unit 16 · Computing Research Project + 80-hour FDI internship",
    title: { vi: "Đồ án và thực tập", en: "Capstone and internship" },
    learn: [
      { vi: "Nghiên cứu độc lập theo chuẩn Pearson.", en: "An independent research project to the Pearson standard." },
      { vi: "80 giờ thực chiến tại doanh nghiệp FDI hoặc tập đoàn đa quốc gia.", en: "80 hours of hands-on work at an FDI company or multinational." },
      { vi: "An toàn dữ liệu và cách làm việc toàn cầu.", en: "Data security and ways of working in global teams." },
    ],
    tools: ["GitHub", "LinkedIn", "Data stack"],
    application: {
      vi: "Xử lý dữ liệu vận hành thật tại Samsung, Viettel, FPT và các đối tác.",
      en: "Handle real operational data at Samsung, Viettel, FPT and other partners.",
    },
    output: {
      vi: "Portfolio công khai trên GitHub/LinkedIn và đánh giá thực tập.",
      en: "A public GitHub and LinkedIn portfolio, plus an internship evaluation.",
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
          vi: "Hai năm tại APC Hà Nội, rồi một năm cuối tại Sunderland (Anh), Macquarie (Úc) hoặc Keiser (Mỹ).",
          en: "Two years at APC Hanoi, then a final year at Sunderland (UK), Macquarie (Australia) or Keiser (USA).",
        }),
      },
      {
        title: line(locale, { vi: "Việc làm khởi điểm", en: "Starting salaries" }),
        body: line(locale, {
          vi: "Data Analytics 15–22 triệu/tháng. Business Management 12–18 triệu/tháng.",
          en: "Data Analytics: 15–22 million VND/month. Business Management: 12–18 million VND/month.",
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
        standard: "Pearson BTEC Higher National Diploma in Computing · RQF Level 5",
        promise: line(locale, {
          vi: "Từ con số 0 thành chuyên viên phân tích dữ liệu trong hai năm.",
          en: "From zero to a working data analyst in two years.",
        }),
        lead: line(locale, {
          vi: "Samsung, Viettel, FPT, Shopee, Techcombank, Foxconn đang thiếu người đọc được dữ liệu và nói được tiếng Anh. Việt Nam đang thiếu hơn 150.000 chuyên viên phân tích có năng lực thực chiến. Ngành này đi hết sáu học kỳ, lương khởi điểm 15–22 triệu đồng mỗi tháng.",
          en: "Samsung, Viettel, FPT, Shopee, Techcombank and Foxconn are short of people who can read data and work in English. Vietnam faces a shortfall of more than 150,000 job-ready data analysts. The programme runs over six terms, with starting salaries of 15–22 million VND a month.",
        }),
        salary: line(locale, { vi: "15–22 triệu/tháng", en: "15–22 million VND/month" }),
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
