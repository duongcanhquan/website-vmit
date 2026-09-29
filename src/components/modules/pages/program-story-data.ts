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
    title: { vi: "Tiếng Anh phản xạ", en: "Reflexive English" },
    learn: [
      {
        vi: "Bỏ ngữ pháp thụ động. Sinh viên xem micro-video ở nhà, 100% giờ lớp dành cho tranh biện, thuyết trình và đóng vai.",
        en: "Leave passive grammar behind. Students watch micro-videos at home, and every class hour is debate, presentation and role-play.",
      },
      {
        vi: "Luyện phản xạ nói trực tiếp bằng tiếng Anh, để hết sợ nói sai.",
        en: "Train a direct English reflex, so speaking no longer feels risky.",
      },
    ],
    tools: ["ELSA Speak Pro", "Oxford Academic", "Quizlet", "BBC Learning English"],
    application: {
      vi: "Thuyết trình ý tưởng dự án bằng tiếng Anh và đọc case study nguyên bản của Pearson.",
      en: "Present a project idea in English and read Pearson case studies in the original.",
    },
    output: {
      vi: "Trình độ tương đương IELTS 5.0–5.5+ / B2 CEFR, kèm video thuyết trình cá nhân.",
      en: "A level equivalent to IELTS 5.0–5.5+ / CEFR B2, plus a personal presentation video.",
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
        en: "Turn ChatGPT, Claude and Copilot into a personal tutor, available around the clock.",
      },
      {
        vi: "Học Prompt Engineering và cách điều phối AI Agents để nghiên cứu, tóm tắt và lập kế hoạch.",
        en: "Learn prompt engineering and how to coordinate AI agents for research, summaries and planning.",
      },
    ],
    tools: ["ChatGPT", "Claude", "Microsoft Copilot", "Notion AI", "Gamma", "Canva AI"],
    application: {
      vi: "Tự động hóa nghiên cứu và soạn thảo, rút ngắn khoảng 70% thời gian làm việc.",
      en: "Automate research and drafting, and cut the working time by about 70%.",
    },
    output: {
      vi: "Bộ trợ lý AI dùng suốt 2 năm, và một đề án tự động hóa cho doanh nghiệp thật.",
      en: "A personal AI toolkit for the two-year programme, and an automation brief for a real business.",
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
        en: "Build critical thinking, Harvard referencing and a habit of original work.",
      },
      {
        vi: "Làm việc nhóm theo Agile/Scrum và quản lý thời gian số.",
        en: "Work in Agile/Scrum teams and manage time digitally.",
      },
    ],
    tools: ["Miro", "Trello", "Turnitin", "Google Workspace", "Grammarly"],
    application: {
      vi: "Viết báo cáo học thuật và bảo vệ quan điểm trước giảng viên cùng doanh nghiệp.",
      en: "Write an academic report and defend it before faculty and a business audience.",
    },
    output: {
      vi: "Báo cáo chuẩn Harvard, kiểm Turnitin dưới 15% similarity.",
      en: "A Harvard-style report that stays under 15% similarity on Turnitin.",
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
      { vi: "Tư duy giải thuật và Python hiện đại.", en: "Algorithms and modern Python." },
      { vi: "Dùng Copilot và ChatGPT để viết, rồi tự kiểm thử code.", en: "Use Copilot and ChatGPT to draft code, then test it yourself." },
      { vi: "Tiếng Anh chuyên ngành dữ liệu.", en: "English for data work." },
    ],
    tools: ["Python", "VS Code", "GitHub", "Colab"],
    application: {
      vi: "Cào, lọc và làm sạch tệp dữ liệu thô hàng trăm nghìn dòng.",
      en: "Collect, filter and clean raw files of hundreds of thousands of rows.",
    },
    output: {
      vi: "Ứng dụng Python tự xử lý và trích xuất báo cáo doanh số.",
      en: "A first Python app that cleans data and exports a sales report.",
    },
  },
  {
    id: "d-2",
    image: MEDIA.newsAnalytics,
    code: { vi: "Học kỳ 2", en: "Term 2" },
    unit: "Unit 4 · Database Design · Unit 3 · Professional Practice",
    title: { vi: "Cơ sở dữ liệu SQL", en: "SQL databases" },
    learn: [
      { vi: "Thiết kế CSDL quan hệ chuẩn hóa: ERD và 3NF.", en: "Design a normalised relational database: ERD and 3NF." },
      { vi: "Viết SQL phức tạp: JOIN, window functions, subqueries.", en: "Write serious SQL: JOIN, window functions and subqueries." },
      { vi: "Làm việc nhóm theo Agile/Scrum.", en: "Work as an Agile/Scrum team." },
    ],
    tools: ["PostgreSQL", "MySQL", "DBeaver", "Lucidchart", "Jira"],
    application: {
      vi: "Truy vấn dữ liệu người dùng và đối soát giao dịch từ ERP/CRM.",
      en: "Query user data and reconcile transactions from an ERP or CRM.",
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
    unit: "Unit 10 · Applied Maths + Data Science Programming",
    title: { vi: "Toán ứng dụng", en: "Applied mathematics" },
    learn: [
      { vi: "Xác suất, kiểm định giả thuyết và A/B testing.", en: "Probability, hypothesis tests and A/B testing." },
      { vi: "Xử lý dữ liệu lớn với NumPy và Pandas.", en: "Work large tables with NumPy and Pandas." },
      { vi: "Trực quan hóa với Matplotlib và Seaborn.", en: "Visualise with Matplotlib and Seaborn." },
    ],
    tools: ["Pandas", "NumPy", "Seaborn", "Jupyter"],
    application: {
      vi: "Phân tích hành vi khách thương mại điện tử và tối ưu tỷ lệ chuyển đổi.",
      en: "Read e-commerce behaviour and improve a campaign’s conversion rate.",
    },
    output: {
      vi: "Báo cáo định lượng hành vi tiêu dùng và kết quả A/B testing.",
      en: "A quantitative report on buying behaviour and an A/B test.",
    },
  },
  {
    id: "d-4",
    image: MEDIA.lectureHall,
    code: { vi: "Học kỳ 4", en: "Term 4" },
    unit: "Unit 17 · Business Intelligence · Unit 6 · Pearson-set Project",
    title: { vi: "Dashboard điều hành", en: "Executive dashboards" },
    learn: [
      { vi: "Kho dữ liệu, data mart và luồng ETL.", en: "Data warehouses, data marts and ETL flows." },
      { vi: "Mô hình Star Schema và Snowflake.", en: "Star and snowflake models." },
      { vi: "Thiết kế dashboard theo cách người ra quyết định thực sự đọc số.", en: "Design a dashboard the way a decision-maker actually reads numbers." },
    ],
    tools: ["Power BI", "Tableau", "DAX", "Power Query"],
    application: {
      vi: "Bảng điều khiển doanh thu và dòng tiền để ban giám đốc nhìn trong vài giây.",
      en: "A revenue and cash dashboard a board can read in a few seconds.",
    },
    output: {
      vi: "Executive BI Dashboard thời gian thực cho chuỗi bán lẻ hoặc ngân hàng.",
      en: "A live executive BI dashboard for a retail chain or a bank.",
    },
  },
  {
    id: "d-5",
    image: MEDIA.newsClassroom,
    code: { vi: "Học kỳ 5", en: "Term 5" },
    unit: "Unit 20 · Applied Machine Learning · Unit 21 · Cloud Computing",
    title: { vi: "Machine learning", en: "Machine learning" },
    learn: [
      { vi: "Học có giám sát và không giám sát: hồi quy, Random Forest, K-Means.", en: "Supervised and unsupervised learning: regression, Random Forest, K-Means." },
      { vi: "Đánh giá mô hình bằng Precision, Recall và ROC-AUC.", en: "Judge a model with precision, recall and ROC-AUC." },
      { vi: "Đưa mô hình lên AWS hoặc Google Cloud.", en: "Deploy the model on AWS or Google Cloud." },
    ],
    tools: ["Scikit-Learn", "XGBoost", "AWS", "BigQuery"],
    application: {
      vi: "Dự báo khách hàng sắp rời bỏ và gợi ý sản phẩm bán kèm.",
      en: "Predict which customers may leave, and suggest a related product.",
    },
    output: {
      vi: "Mô hình dự báo rời bỏ chạy trên hạ tầng cloud.",
      en: "A churn model running on cloud infrastructure.",
    },
  },
  {
    id: "d-6",
    image: MEDIA.newsCareer,
    code: { vi: "Học kỳ 6", en: "Term 6" },
    unit: "Unit 16 · Research Project + 80 giờ thực tập FDI",
    title: { vi: "Đồ án và thực tập", en: "Capstone and internship" },
    learn: [
      { vi: "Nghiên cứu độc lập theo chuẩn Pearson.", en: "An independent research project to the Pearson standard." },
      { vi: "80 giờ thực chiến tại doanh nghiệp FDI hoặc tập đoàn đa quốc gia.", en: "80 hours inside an FDI company or a multinational." },
      { vi: "An toàn dữ liệu và cách làm việc toàn cầu.", en: "Data security and a global way of working." },
    ],
    tools: ["GitHub", "LinkedIn", "Data stack"],
    application: {
      vi: "Xử lý dữ liệu vận hành thật tại Samsung, Viettel, FPT và các đối tác.",
      en: "Work live operating data with partners such as Samsung, Viettel and FPT.",
    },
    output: {
      vi: "Portfolio công khai trên GitHub/LinkedIn và đánh giá thực tập.",
      en: "A public GitHub and LinkedIn portfolio, plus an internship review.",
    },
  },
]

const businessSteps = [
  {
    id: "b-1",
    image: MEDIA.studentsCollab,
    code: { vi: "Học kỳ 1", en: "Term 1" },
    unit: "Unit 1 · Business Environment + Business English + AI",
    title: { vi: "Tư duy kinh doanh", en: "Business thinking" },
    learn: [
      { vi: "Đọc môi trường kinh doanh bằng PESTLE, SWOT và Porter’s 5 Forces.", en: "Read a market with PESTLE, SWOT and Porter’s Five Forces." },
      { vi: "Dùng AI để soạn hợp đồng và lập kế hoạch vận hành.", en: "Use AI to draft a contract and plan the work." },
      { vi: "Tiếng Anh thương mại và thuyết trình quốc tế.", en: "Business English and an international presentation." },
    ],
    tools: ["Business Model Canvas", "Notion", "ChatGPT", "Canva"],
    application: {
      vi: "Đánh giá sức khỏe cạnh tranh của một doanh nghiệp bán lẻ tại Việt Nam.",
      en: "Assess the competitive health of a real Vietnamese retailer.",
    },
    output: {
      vi: "Bản Business Model Canvas và đề xuất chuyển đổi số văn phòng.",
      en: "A finished Business Model Canvas and an office digital plan.",
    },
  },
  {
    id: "b-2",
    image: MEDIA.international,
    code: { vi: "Học kỳ 2", en: "Term 2" },
    unit: "Unit 2 · Marketing Planning · Unit 5 · Management Accounting",
    title: { vi: "Marketing và tài chính", en: "Marketing and finance" },
    learn: [
      { vi: "Định vị thương hiệu và phễu digital marketing.", en: "Brand positioning and a digital marketing funnel." },
      { vi: "Đọc bảng cân đối, kết quả kinh doanh và lưu chuyển tiền tệ.", en: "Read a balance sheet, income statement and cash flow." },
      { vi: "Tính điểm hòa vốn, quản trị chi phí và lập ngân sách.", en: "Find the break-even point, control cost and build a budget." },
    ],
    tools: ["GA4", "Meta Ads", "Excel", "CapCut"],
    application: {
      vi: "Một chiến dịch đa kênh, tính được hòa vốn và ROI.",
      en: "A multi-channel campaign with a break-even point and an ROI.",
    },
    output: {
      vi: "Kế hoạch digital marketing gắn với dự toán dòng tiền.",
      en: "A digital marketing plan tied to a cash forecast.",
    },
  },
  {
    id: "b-3",
    image: MEDIA.campusFacility,
    code: { vi: "Học kỳ 3", en: "Term 3" },
    unit: "Unit 22 · Operations & Supply Chain · Unit 33 · E-Commerce",
    title: { vi: "Chuỗi cung ứng và TMĐT", en: "Supply chain and commerce" },
    learn: [
      { vi: "Chuỗi cung ứng tinh gọn: Lean, JIT và quản lý kho EOQ.", en: "A lean supply chain: Lean, JIT and EOQ inventory." },
      { vi: "Bán lẻ đa kênh và sàn thương mại điện tử.", en: "Omnichannel retail and marketplace selling." },
      { vi: "Tối ưu chuyển đổi và quy trình giao hàng.", en: "Conversion rate and the fulfilment flow." },
    ],
    tools: ["Shopee", "TikTok Shop", "Shopify", "Odoo"],
    application: {
      vi: "Dựng kho và gian hàng thật, đo chi phí logistics và hoàn đơn.",
      en: "Run a real store and warehouse, and measure logistics and returns.",
    },
    output: {
      vi: "Gian hàng thương mại điện tử đủ SEO, fulfillment và báo cáo tồn kho.",
      en: "A live store with SEO, fulfilment and an inventory report.",
    },
  },
  {
    id: "b-4",
    image: MEDIA.aboutStudent,
    code: { vi: "Học kỳ 4", en: "Term 4" },
    unit: "Unit 3 · Human Resource Management · Unit 4 · Leadership",
    title: { vi: "Nhân sự và lãnh đạo", en: "People and leadership" },
    learn: [
      { vi: "Lãnh đạo tình huống và đọc tính cách qua DISC, MBTI.", en: "Situational leadership, and reading people with DISC and MBTI." },
      { vi: "Tuyển dụng, hội nhập và đánh giá KPI/OKR.", en: "Hiring, onboarding and KPI/OKR reviews." },
      { vi: "Luật lao động Việt Nam và cách giải xung đột.", en: "Vietnamese labour law and how to resolve a conflict." },
    ],
    tools: ["DISC", "HRM", "KPI Dashboard"],
    application: {
      vi: "Khung năng lực và chính sách giữ người cho công ty khoảng 50 nhân sự.",
      en: "A capability framework and a retention policy for a 50-person company.",
    },
    output: {
      vi: "Sổ tay văn hóa và bộ quy chế KPI/OKR cho doanh nghiệp vừa.",
      en: "A culture handbook and a KPI/OKR rulebook for an SME.",
    },
  },
  {
    id: "b-5",
    image: MEDIA.campusArchitecture,
    code: { vi: "Học kỳ 5", en: "Term 5" },
    unit: "Unit 32 · Business Strategy · Unit 8 · Innovation",
    title: { vi: "Chiến lược tăng trưởng", en: "Growth strategy" },
    learn: [
      { vi: "Đại dương xanh và cạnh tranh bằng khác biệt.", en: "Blue ocean thinking and competing by being different." },
      { vi: "Design Thinking để làm ra sản phẩm mới.", en: "Design thinking for a new product." },
      { vi: "Thẩm định khả thi và cách vào một thị trường mới.", en: "Test whether it can sell, and how to enter a new market." },
    ],
    tools: ["Miro", "Ansoff", "BCG", "Design Thinking"],
    application: {
      vi: "Nghiên cứu một thị trường ngách và kế hoạch tung sản phẩm.",
      en: "Study a niche and plan the launch that meets the competitor.",
    },
    output: {
      vi: "Đề án chiến lược tăng trưởng trình ban giám hiệu.",
      en: "A growth and commercialisation proposal for the academic board.",
    },
  },
  {
    id: "b-6",
    image: MEDIA.heroCampusUk,
    code: { vi: "Học kỳ 6", en: "Term 6" },
    unit: "Unit 19 · Research Project + 80 giờ thực tập quản lý",
    title: { vi: "Khởi nghiệp và thực tập", en: "Venture and internship" },
    learn: [
      { vi: "Đề án nghiên cứu kinh doanh theo chuẩn Pearson.", en: "A business research project to the Pearson standard." },
      { vi: "80 giờ thực tập quản trị trong hệ sinh thái EQuest và tập đoàn đa quốc gia.", en: "80 management hours inside the EQuest network and a multinational." },
      { vi: "Đàm phán hợp đồng và pitching gọi vốn.", en: "Contract negotiation and a funding pitch." },
    ],
    tools: ["Pitch Deck", "Thẩm định"],
    application: {
      vi: "Giải một điểm nghẽn vận hành hoặc một hướng mở thị trường thật.",
      en: "Solve a real operating bottleneck or a real market expansion.",
    },
    output: {
      vi: "Đề án bảo vệ trước hội đồng Pearson và doanh nghiệp, kèm thư giới thiệu việc làm.",
      en: "A defence before the Pearson board and the company, plus a job reference.",
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
    heroEyebrow: "Journey to the World Excellence",
    heroTitle: line(locale, {
      vi: "Ba chương trình.\nMột cách học bằng sản phẩm.",
      en: "Three programmes.\nLearning by making the work.",
    }),
    heroLead: line(locale, {
      vi: "Học kỳ tiền đề, rồi Data Analytics hoặc Business Management. Song bằng Cao đẳng chính quy APC và Pearson BTEC HND Level 5. Qua môn bằng dự án, không bằng bài thi nhồi nhét.",
      en: "A foundation term, then Data Analytics or Business Management. A national college diploma from APC and a Pearson BTEC HND Level 5. You pass by the project you ship.",
    }),
    scrollHint: line(locale, { vi: "Xem ba chương trình", en: "See the three programmes" }),
    guaranteesTitle: line(locale, { vi: "Bốn điều VMIT giữ", en: "Four things VMIT stands behind" }),
    guarantees: [
      {
        title: line(locale, { vi: "Học bằng dự án", en: "Assignment-based" }),
        body: line(locale, {
          vi: "Không thi lý thuyết nhồi nhét. Sản phẩm được thẩm định hai lớp, có giám sát của Pearson UK.",
          en: "No crammed theory exam. The project is reviewed twice, with Pearson UK in the loop.",
        }),
      },
      {
        title: line(locale, { vi: "Song bằng", en: "Two awards" }),
        body: line(locale, {
          vi: "Cao đẳng chính quy Việt Nam và Pearson BTEC HND Level 5, được công nhận tại hơn 100 quốc gia.",
          en: "A Vietnamese college diploma and a Pearson BTEC HND Level 5, recognised in more than 100 countries.",
        }),
      },
      {
        title: line(locale, { vi: "Năm cuối quốc tế", en: "A final year abroad" }),
        body: line(locale, {
          vi: "Hai năm tại APC Hà Nội, rồi một năm cuối tại Sunderland (Anh), Macquarie (Úc) hoặc Keiser (Mỹ).",
          en: "Two years at APC Hanoi, then a final year at Sunderland, Macquarie or Keiser.",
        }),
      },
      {
        title: line(locale, { vi: "Việc làm khởi điểm", en: "A starting salary" }),
        body: line(locale, {
          vi: "Data Analytics 15–22 triệu/tháng. Business Management 12–18 triệu/tháng.",
          en: "Data Analytics 15–22 million VND a month. Business Management 12–18 million.",
        }),
      },
    ],
    switchLabel: line(locale, { vi: "Chọn chương trình", en: "Choose a programme" }),
    outputLabel: line(locale, { vi: "Sản phẩm cầm tay", en: "What you leave with" }),
    toolsLabel: line(locale, { vi: "Công cụ", en: "Tools" }),
    applyLabel: line(locale, {
      vi: "Đăng ký xét học bạ & nhận tư vấn lộ trình 1-1",
      en: "Apply with your transcript and book a 1-1 consult",
    }),
    closeEyebrow: line(locale, { vi: "Vốn nhẹ — bước xa", en: "A lighter start" }),
    closeTitle: line(locale, {
      vi: "Vào học từ 15 triệu. Ra trường với việc làm đã nói rõ mức lương.",
      en: "Start from 15 million VND. Leave with a salary the programme states up front.",
    }),
    closeLead: line(locale, {
      vi: "Học phí chia theo kỳ. Hợp đồng hướng tới mức 12–22 triệu đồng mỗi tháng, tùy ngành.",
      en: "Fees are paid by term. The employment promise sits between 12 and 22 million VND a month, depending on the programme.",
    }),
    tracks: [
      {
        id: "foundation",
        index: "01",
        name: "Foundation Bootcamp",
        standard: line(locale, { vi: "Học kỳ tiền đề · AI Accelerator", en: "Foundation term · AI Accelerator" }),
        promise: line(locale, {
          vi: "Không lo mất gốc tiếng Anh. Tự tin bước vào chuẩn Anh.",
          en: "A weak English start is not a closed door.",
        }),
        lead: line(locale, {
          vi: "Nếu tiếng Anh chưa vững, liệu có học nổi chương trình Anh? Trước chuyên ngành, mọi tân sinh viên đi qua Foundation Bootcamp: phản xạ ngôn ngữ, AI thành trợ thủ, và cách học học thuật cho hai năm phía trước.",
          en: "Can you start a UK programme if English is still shaky? Before the major, every new student takes the Foundation Bootcamp: a language reflex, AI as a study partner, and the academic habits for the two years ahead.",
        }),
        salary: line(locale, { vi: "Cửa ngõ vào cả hai ngành", en: "The door into both majors" }),
        image: MEDIA.seminar,
        steps: mapSteps(locale, foundationSteps),
      },
      {
        id: "data-analytics",
        index: "02",
        name: "Data Analytics",
        standard: "Pearson BTEC Higher National in Computing · RQF Level 5",
        promise: line(locale, {
          vi: "Từ con số 0 thành chuyên viên phân tích dữ liệu trong hai năm.",
          en: "From zero to a working data analyst in two years.",
        }),
        lead: line(locale, {
          vi: "Samsung, Viettel, FPT, Shopee, Techcombank, Foxconn đang thiếu người đọc được dữ liệu và nói được tiếng Anh. Việt Nam đang thiếu hơn 150.000 chuyên viên phân tích có năng lực thực chiến. Ngành này đi hết sáu học kỳ, lương khởi điểm 15–22 triệu đồng mỗi tháng.",
          en: "Samsung, Viettel, FPT, Shopee, Techcombank and Foxconn need people who can read data and work in English. Vietnam is short more than 150,000 analysts who can do the job. Six terms, with a starting salary of 15–22 million VND a month.",
        }),
        salary: line(locale, { vi: "15–22 triệu/tháng", en: "15–22 million VND / month" }),
        image: MEDIA.lab,
        steps: mapSteps(locale, dataSteps),
      },
      {
        id: "business-management",
        index: "03",
        name: "Business Management",
        standard: "Pearson BTEC Higher National in Business · Management Pathway",
        promise: line(locale, {
          vi: "Nhà quản lý trẻ biết dùng AI, đọc tài chính và điều hành thật.",
          en: "A young manager who can use AI, read the numbers and run the work.",
        }),
        lead: line(locale, {
          vi: "Kinh doanh số không còn là giáo trình đóng băng. Sáu học kỳ đưa bạn qua marketing, tài chính, thương mại điện tử, nhân sự và chiến lược, rồi 80 giờ thực tập quản lý. Lương khởi điểm 12–18 triệu đồng mỗi tháng.",
          en: "Digital business is not a frozen textbook. Six terms take you through marketing, finance, commerce, people and strategy, then 80 hours of management practice. Starting salary 12–18 million VND a month.",
        }),
        salary: line(locale, { vi: "12–18 triệu/tháng", en: "12–18 million VND / month" }),
        image: MEDIA.studentsCollab,
        steps: mapSteps(locale, businessSteps),
      },
    ],
  }
}

export const PROGRAM_SECTION_IDS = ["foundation", "data-analytics", "business-management"] as const
