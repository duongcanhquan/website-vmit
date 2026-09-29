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

const DATA: ProgramSubject[] = [
  {
    id: "da-01",
    code: "Unit 1",
    level: "RQF Level 4",
    course: "Programming with Python & AI Code Assistants",
    title: { vi: "Lập trình Python thực chiến & Trợ lý code AI", en: "Hands-on Python programming & AI coding assistants" },
    hook: {
      vi: "Bắt đầu từ con số 0. Không cần giỏi toán để viết code: bạn học tư duy logic và biến AI thành cộng sự lập trình 24/7.",
      en: "Start from zero. You don’t need to be a maths whizz to code: learn logical thinking and make AI your 24/7 coding partner.",
    },
    learn: [
      {
        vi: "Cấu trúc dữ liệu và giải thuật căn bản: biến, vòng lặp, hàm, chuỗi và danh sách.",
        en: "Core data structures and algorithms: variables, loops, functions, strings and lists.",
      },
      {
        vi: "Viết mã sạch (Clean Code), gỡ lỗi và quản lý phiên bản với Git/GitHub.",
        en: "Clean code, debugging and version control with Git/GitHub.",
      },
      {
        vi: "Tự động hóa: script cào dữ liệu web và xử lý tệp Excel/CSV hàng trăm nghìn dòng trong tích tắc.",
        en: "Automation: web-scraping scripts, and processing Excel/CSV files with hundreds of thousands of rows in seconds.",
      },
    ],
    benefit: {
      vi: "Biến việc thủ công mất hàng tuần thành một nút bấm chạy vài giây. Làm chủ ngôn ngữ phổ biến nhất thế giới về dữ liệu và AI.",
      en: "Turn weeks of manual work into a single click that runs in seconds, and master the world’s most popular language for data and AI.",
    },
    artifact: {
      vi: "Ứng dụng Python tự cào giá hàng nghìn sản phẩm trên Shopee/Lazada và gửi báo cáo phân tích về Telegram.",
      en: "A Python app that scrapes prices for thousands of Shopee/Lazada products and sends analysis reports to Telegram.",
    },
    tools: ["Python 3.12", "VS Code", "GitHub", "Beautiful Soup", "GitHub Copilot"],
    image: IMG.python,
  },
  {
    id: "da-02",
    code: "Unit 4",
    level: "RQF Level 4",
    course: "Database Design & Development with Advanced SQL",
    title: { vi: "Thiết kế & Quản trị cơ sở dữ liệu SQL doanh nghiệp", en: "Enterprise SQL database design & management" },
    hook: {
      vi: "90% bài test tuyển Data Analyst bắt đầu bằng SQL. Đây là chìa khóa mở cửa vào kho dữ liệu khổng lồ của doanh nghiệp.",
      en: "90% of data analyst recruitment tests start with SQL. It is the key that unlocks a company’s vast data stores.",
    },
    learn: [
      {
        vi: "Thiết kế mô hình quan hệ (ERD) và chuẩn hóa dữ liệu từ 1NF đến 3NF, chống trùng lặp.",
        en: "Relational modelling (ERD) and normalisation from 1NF to 3NF to prevent duplication.",
      },
      {
        vi: "SQL từ cơ bản đến chuyên sâu: JOIN nhiều bảng, GROUP BY, Subqueries, CTE và Window Functions.",
        en: "SQL from basics to advanced: multi-table JOINs, GROUP BY, subqueries, CTEs and window functions.",
      },
      {
        vi: "Tối ưu hiệu năng truy vấn (Index Tuning) trên hệ thống phục vụ hàng triệu người dùng.",
        en: "Query performance tuning (index tuning) on systems that serve millions of users.",
      },
    ],
    benefit: {
      vi: "Nói chuyện trôi chảy với kho dữ liệu doanh nghiệp, trích xuất tức thì mọi số liệu kinh doanh phức tạp mà Giám đốc tài chính hay Marketing cần.",
      en: "Speak fluently with company databases and instantly pull any complex business figure the CFO or Marketing Director needs.",
    },
    artifact: {
      vi: "CSDL bán lẻ chuẩn hóa với 500.000 bản ghi thực tế, kèm kho 50 câu SQL nghiệp vụ phục vụ quản trị.",
      en: "A normalised retail database of 500,000 real records, plus a bank of 50 business SQL queries for management.",
    },
    tools: ["PostgreSQL", "MySQL", "DBeaver", "Lucidchart", "Supabase"],
    image: IMG.sql,
  },
  {
    id: "da-03",
    code: "Unit 14",
    level: "RQF Level 4",
    course: "Applied Mathematics & Quantitative Business Analysis",
    title: { vi: "Toán ứng dụng & Phân tích định lượng trong kinh doanh", en: "Applied maths & quantitative business analysis" },
    hook: {
      vi: "Không học toán lý thuyết trừu tượng. Đây là thứ toán giúp sàn thương mại điện tử biết khách hàng sẽ mua gì tiếp theo.",
      en: "No abstract maths theory. This is the maths that tells an online marketplace what a customer will buy next.",
    },
    learn: [
      {
        vi: "Thống kê mô tả và suy diễn: trung bình, trung vị, độ lệch chuẩn, phân phối chuẩn.",
        en: "Descriptive and inferential statistics: mean, median, standard deviation and the normal distribution.",
      },
      {
        vi: "Kiểm định giả thuyết kinh doanh và thiết kế A/B Testing để tối ưu chuyển đổi.",
        en: "Business hypothesis testing and A/B test design to optimise conversion.",
      },
      {
        vi: "Đại số tuyến tính căn bản và ma trận tương quan, nền tảng của các thuật toán AI.",
        en: "Basic linear algebra and correlation matrices, the foundation of AI algorithms.",
      },
    ],
    benefit: {
      vi: "Tư duy dựa trên bằng chứng: dùng con số chứng minh một chiến dịch marketing thành công hay thất bại, không đoán mò theo cảm tính.",
      en: "Evidence-based thinking: use numbers to prove whether a marketing campaign succeeded or failed, instead of relying on gut feeling.",
    },
    artifact: {
      vi: "Báo cáo định lượng đo hiệu quả A/B Testing giữa hai mẫu trang thanh toán thương mại điện tử.",
      en: "A quantitative report measuring an A/B test between two e-commerce checkout pages.",
    },
    tools: ["Python (SciPy, Statsmodels)", "Jupyter Notebook", "Excel Data Analysis Toolpak"],
    image: MEDIA.newsAnalytics,
  },
  {
    id: "da-04",
    code: "Unit 8",
    level: "RQF Level 4",
    course: "Python for Data Science & Exploratory Data Analysis",
    title: { vi: "Lập trình khoa học dữ liệu & Khai phá khám phá (EDA)", en: "Data science programming & exploratory data analysis (EDA)" },
    hook: {
      vi: "Biến những bảng tính khổng lồ hỗn độn thành bức tranh biết kể chuyện, lộ ra xu hướng kinh doanh ẩn giấu.",
      en: "Turn huge, messy spreadsheets into visuals that tell a story and reveal hidden business trends.",
    },
    learn: [
      {
        vi: "Thành thạo NumPy (xử lý mảng số) và Pandas (thao tác bảng dữ liệu triệu dòng).",
        en: "Fluency in NumPy for numeric arrays and Pandas for million-row tables.",
      },
      {
        vi: "Làm sạch dữ liệu thực tế (Data Wrangling): dữ liệu khuyết thiếu, nhiễu và ngoại lai.",
        en: "Real-world data wrangling: missing values, noise and outliers.",
      },
      {
        vi: "Trực quan hóa khám phá bằng heatmap, scatter plot với Matplotlib và Seaborn.",
        en: "Exploratory visualisation with heatmaps and scatter plots in Matplotlib and Seaborn.",
      },
    ],
    benefit: {
      vi: "Trực giác sắc bén với dữ liệu: nhìn tập dữ liệu thô là biết cách dọn sạch và tìm ra insight đắt giá mà đối thủ không thấy.",
      en: "A sharp instinct for data: look at a raw dataset, know how to clean it, and find the insight competitors miss.",
    },
    artifact: {
      vi: "Bộ Notebook phân tích hành vi mua sắm của 50.000 khách hàng, chỉ rõ lý do khách bỏ giỏ hàng.",
      en: "A set of notebooks analysing the shopping behaviour of 50,000 customers and pinpointing why they abandon their carts.",
    },
    tools: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Google Colab", "Kaggle Datasets"],
    image: IMG.eda,
  },
  {
    id: "da-05",
    code: "Unit 26",
    level: "RQF Level 5",
    course: "Business Intelligence & Executive Dashboard Design",
    title: { vi: "Trí tuệ kinh doanh (BI) & Thiết kế Executive Dashboard", en: "Business intelligence & executive dashboard design" },
    hook: {
      vi: "Kỹ năng được săn đón nhất trong phòng họp điều hành: bảng điều khiển giúp Tổng Giám đốc ra quyết định trong 3 giây.",
      en: "The most sought-after skill in the boardroom: a dashboard that lets a CEO decide in three seconds.",
    },
    learn: [
      {
        vi: "Kiến trúc kho dữ liệu: Data Warehouse, Data Mart và ETL Pipeline chuẩn doanh nghiệp.",
        en: "Data warehouse architecture: data warehouses, data marts and enterprise-grade ETL pipelines.",
      },
      {
        vi: "Mô hình đa chiều Star Schema, Snowflake Schema và công thức tính toán phức tạp bằng DAX.",
        en: "Multidimensional star and snowflake schemas, and complex calculations in DAX.",
      },
      {
        vi: "Tâm lý học thị giác: chọn đúng biểu đồ, phối màu tương phản, phân tầng thông tin cho lãnh đạo.",
        en: "Visual psychology: choosing the right chart, strong contrast and a clear information hierarchy for leaders.",
      },
    ],
    benefit: {
      vi: "Trở thành cánh tay phải của Ban lãnh đạo: thay tệp Excel dài bằng dashboard sống, bấm đâu số liệu nhảy theo thời gian thực tới đó.",
      en: "Become the leadership team’s right hand: replace long Excel files with a live dashboard that updates in real time wherever they click.",
    },
    artifact: {
      vi: "Executive BI Dashboard tương tác giám sát dòng tiền, doanh thu bán lẻ và KPI nhân viên theo thời gian thực.",
      en: "An interactive executive BI dashboard tracking cash flow, retail revenue and staff KPIs in real time.",
    },
    tools: ["Microsoft Power BI", "Tableau Desktop", "DAX Studio", "Power Query"],
    image: IMG.bi,
  },
  {
    id: "da-06",
    code: "Unit 25",
    level: "RQF Level 5",
    course: "Applied Machine Learning & Predictive Modelling",
    title: { vi: "Học máy ứng dụng & Dự báo kinh doanh", en: "Applied machine learning & business forecasting" },
    hook: {
      vi: "Nâng cấp từ phân tích chuyện đã qua sang dự đoán chuyện sắp tới: dạy máy tính nhìn thấu hành vi tương lai của khách hàng.",
      en: "Move from explaining the past to predicting what comes next: teach a computer to read future customer behaviour.",
    },
    learn: [
      {
        vi: "Học có giám sát: hồi quy tuyến tính, Decision Tree, Random Forest.",
        en: "Supervised learning: linear regression, decision trees and random forests.",
      },
      {
        vi: "Phân cụm khách hàng bằng K-Means để cá nhân hóa chiến dịch bán lẻ.",
        en: "Customer segmentation with K-Means clustering to personalise retail campaigns.",
      },
      {
        vi: "Đánh giá và tối ưu mô hình: Confusion Matrix, Precision/Recall, ROC-AUC.",
        en: "Model evaluation and tuning: confusion matrix, precision/recall, ROC-AUC.",
      },
    ],
    benefit: {
      vi: "Xây thuật toán dự báo rủi ro tín dụng, hoặc nhận ra khách hàng sắp hủy dịch vụ để doanh nghiệp kịp giữ chân.",
      en: "Build models that forecast credit risk, or flag customers about to cancel so the business can retain them in time.",
    },
    artifact: {
      vi: "Mô hình Machine Learning dự báo khách hàng rời bỏ (Customer Churn Prediction) đạt độ chính xác trên 88%.",
      en: "A machine learning churn prediction model with more than 88% accuracy.",
    },
    tools: ["Scikit-Learn", "XGBoost", "Streamlit", "Joblib"],
    image: IMG.ml,
  },
  {
    id: "da-07",
    code: "Unit 28",
    level: "RQF Level 5",
    course: "Cloud Computing & Big Data Engineering",
    title: { vi: "Điện toán đám mây & Hạ tầng dữ liệu lớn", en: "Cloud computing & big data infrastructure" },
    hook: {
      vi: "Khi dữ liệu lên tới hàng triệu gigabyte, laptop không tải nổi. Môn học dạy bạn chỉ huy siêu máy tính trên mây.",
      en: "When data reaches millions of gigabytes, a laptop can’t cope. Learn to command supercomputers in the cloud.",
    },
    learn: [
      {
        vi: "Kiến trúc đám mây IaaS, PaaS, SaaS và lưu trữ quy mô lớn (AWS S3, Google Cloud Storage).",
        en: "Cloud architecture (IaaS, PaaS, SaaS) and large-scale storage on AWS S3 and Google Cloud Storage.",
      },
      {
        vi: "Truy vấn dữ liệu lớn trên BigQuery / Amazon Redshift, quét hàng tỷ dòng trong vài giây.",
        en: "Big data queries on BigQuery and Amazon Redshift that scan billions of rows in seconds.",
      },
      {
        vi: "Bảo mật dữ liệu, phân quyền truy cập và tuân thủ chuẩn an toàn thông tin quốc tế (GDPR).",
        en: "Data security, access control and compliance with international standards such as GDPR.",
      },
    ],
    benefit: {
      vi: "Tự tin ứng tuyển vào tập đoàn và kỳ lân công nghệ, làm chủ hạ tầng đám mây hiện đại mà nhiều chương trình truyền thống chưa dạy.",
      en: "Apply with confidence to major corporations and tech unicorns, with command of modern cloud infrastructure that many traditional programmes still don’t teach.",
    },
    artifact: {
      vi: "Data Pipeline tự động đẩy dữ liệu bán hàng lên Cloud Data Warehouse và kích hoạt phân tích tự động.",
      en: "A data pipeline that automatically pushes sales data into a cloud data warehouse and triggers automated analysis.",
    },
    tools: ["Amazon Web Services", "Google Cloud Platform", "BigQuery", "Docker"],
    image: IMG.cloud,
  },
  {
    id: "da-08",
    code: "Unit 16",
    level: "RQF Level 5 · 30 credits",
    course: "Computing Research Project & 80-Hour On-the-Job Training",
    title: { vi: "Đồ án nghiên cứu công nghệ & Thực tập FDI", en: "Computing research project & FDI internship" },
    hook: {
      vi: "Không thi tốt nghiệp. Bạn trải qua 80 giờ giải bài toán thật tại doanh nghiệp FDI và bảo vệ dự án trước hội đồng Pearson UK.",
      en: "No graduation exam. Spend 80 hours solving real problems inside an FDI company, then defend your project before a Pearson UK panel.",
    },
    learn: [
      {
        vi: "Quy trình dự án nghiên cứu độc lập: khảo sát, thu thập mẫu, phân tích và đề xuất giải pháp kỹ thuật.",
        en: "The independent research process: surveys, data sampling, analysis and technical recommendations.",
      },
      {
        vi: "80 giờ On-job training tại tập đoàn đối tác như Samsung, Viettel, FPT, Foxconn.",
        en: "80 hours of on-the-job training with partners such as Samsung, Viettel, FPT and Foxconn.",
      },
      {
        vi: "Viết báo cáo kỹ thuật chuẩn quốc tế và thuyết trình trước hội đồng thẩm định độc lập của Pearson Anh Quốc.",
        en: "International-standard technical reports and a presentation to an independent Pearson UK assessment panel.",
      },
    ],
    benefit: {
      vi: "Tốt nghiệp không chỉ với tấm bằng, mà với portfolio hoàn chỉnh, kinh nghiệm làm việc thật và cơ hội hợp đồng lao động chính thức.",
      en: "Graduate with more than a qualification: a complete portfolio, real work experience and a chance at a permanent employment contract.",
    },
    artifact: {
      vi: "Portfolio công khai trên GitHub/LinkedIn, cùng đồ án giải bài toán dữ liệu thật cho doanh nghiệp FDI đối tác.",
      en: "A public GitHub/LinkedIn portfolio and a project that solves a real data problem for an FDI partner.",
    },
    tools: ["Full Data Stack", "GitHub", "LinkedIn", "FDI workplace"],
    image: MEDIA.newsCareer,
  },
]

const BUSINESS: ProgramSubject[] = [
  {
    id: "bm-01",
    code: "Unit 1",
    level: "RQF Level 4",
    course: "The Contemporary Business Environment in the Digital Age",
    title: { vi: "Môi trường kinh doanh toàn cầu & Tư duy khởi nghiệp số", en: "The global business environment & digital start-up thinking" },
    hook: {
      vi: "Hiểu luật chơi của kinh tế toàn cầu, nhìn thấu thị trường và vẽ mô hình kinh doanh triệu đô trên một trang giấy.",
      en: "Learn the rules of the global economy, read the market, and sketch a million-dollar business model on one page.",
    },
    learn: [
      {
        vi: "Phân tích vĩ mô và vi mô: PESTLE, SWOT, mô hình 5 lực lượng cạnh tranh của Porter.",
        en: "Macro and micro analysis: PESTLE, SWOT and Porter’s Five Forces.",
      },
      {
        vi: "Thiết kế mô hình kinh doanh tinh gọn bằng Business Model Canvas chuẩn Silicon Valley.",
        en: "Lean business design with the Silicon Valley–style Business Model Canvas.",
      },
      {
        vi: "Ứng dụng AI vận hành văn phòng số: soạn văn bản thương mại, tóm tắt hợp đồng, khảo sát thị trường.",
        en: "AI for the digital office: drafting business documents, summarising contracts and conducting market research.",
      },
    ],
    benefit: {
      vi: "Tư duy nhạy bén của nhà sáng lập: đọc vị đối thủ, nhìn ra thị trường ngách và biến ý tưởng sơ khai thành kế hoạch khả thi.",
      en: "A founder’s instinct: read competitors, spot a niche and turn a rough idea into a workable plan.",
    },
    artifact: {
      vi: "Bản phân tích Business Model Canvas cho một thương hiệu bán lẻ thật, kèm đề án chuyển đổi số văn phòng.",
      en: "A Business Model Canvas analysis for a real retail brand, plus a digital office transformation proposal.",
    },
    tools: ["Business Model Canvas", "Notion AI", "ChatGPT Team", "Miro", "Canva Pro"],
    image: IMG.canvas,
  },
  {
    id: "bm-02",
    code: "Unit 2",
    level: "RQF Level 4",
    course: "Marketing Planning & Digital Growth Funnel",
    title: { vi: "Kế hoạch marketing số & Chiến lược tăng trưởng", en: "Digital marketing planning & growth strategy" },
    hook: {
      vi: "Khách hàng không mua sản phẩm, họ mua giải pháp cho vấn đề của họ. Học cách dựng cỗ máy thu hút khách hàng tự động.",
      en: "Customers don’t buy products; they buy solutions to their problems. Learn to build a machine that attracts customers automatically.",
    },
    learn: [
      {
        vi: "Chân dung khách hàng (Buyer Persona) và bản đồ hành trình trải nghiệm (Customer Journey Map).",
        en: "Buyer personas and customer journey maps.",
      },
      {
        vi: "Định vị thương hiệu khác biệt và phễu chuyển đổi đa tầng AIDA, TOFU-MOFU-BOFU.",
        en: "Distinctive brand positioning and multi-stage funnels: AIDA, TOFU-MOFU-BOFU.",
      },
      {
        vi: "Đo hiệu quả chiến dịch bằng CAC, LTV, CTR, CPL và ROAS.",
        en: "Measure campaigns with CAC, LTV, CTR, CPL and ROAS.",
      },
    ],
    benefit: {
      vi: "Tiêu từng đồng ngân sách marketing thông minh, tạo chiến dịch thu hút hàng nghìn khách tiềm năng mà không lãng phí.",
      en: "Spend every penny of your marketing budget wisely and run campaigns that attract thousands of leads without waste.",
    },
    artifact: {
      vi: "Kế hoạch Digital Marketing toàn diện cho sản phẩm mới, kèm bộ thông điệp quảng cáo và ngân sách chi tiết.",
      en: "A full digital marketing plan for a new product, with ad messaging and a detailed budget.",
    },
    tools: ["Google Analytics 4", "Meta Ads Manager", "TikTok Ads", "CapCut", "Mailchimp"],
    image: IMG.marketing,
  },
  {
    id: "bm-03",
    code: "Unit 5",
    level: "RQF Level 4",
    course: "Accounting Principles & Cash Flow Control",
    title: { vi: "Kế toán quản trị & Kiểm soát dòng tiền cho nhà lãnh đạo", en: "Management accounting & cash flow control for leaders" },
    hook: {
      vi: "Doanh thu là phù phiếm, lợi nhuận là điểm số, dòng tiền mới là sự sống còn. Làm chủ ngôn ngữ tài chính của doanh nghiệp.",
      en: "Revenue is vanity, profit is the score, cash flow is survival. Master the financial language of business.",
    },
    learn: [
      {
        vi: "Đọc và phân tích 3 báo cáo cốt lõi: cân đối kế toán, kết quả kinh doanh, lưu chuyển tiền tệ.",
        en: "Read and analyse the three core statements: balance sheet, income statement and cash flow.",
      },
      {
        vi: "Phân tích điểm hòa vốn (Cost-Volume-Profit) và kiểm soát chi phí cố định, biến đổi.",
        en: "Break-even (cost-volume-profit) analysis and control of fixed and variable costs.",
      },
      {
        vi: "Lập ngân sách hoạt động và dự báo dòng tiền để ngăn nguy cơ mất thanh khoản.",
        en: "Operating budgets and cash flow forecasts that head off a liquidity crisis.",
      },
    ],
    benefit: {
      vi: "Đọc vị sức khỏe tài chính của bất kỳ công ty nào, định giá sản phẩm có lãi và giữ doanh nghiệp không cạn tiền trong khủng hoảng.",
      en: "Read the financial health of any company, price products at a profit, and keep a business from running dry in a crisis.",
    },
    artifact: {
      vi: "Mô hình tài chính Excel dự toán dòng tiền và điểm hòa vốn cho một dự án kinh doanh mới.",
      en: "An Excel financial model forecasting cash flow and break-even for a new venture.",
    },
    tools: ["Microsoft Excel", "Google Sheets", "Power BI Finance"],
    image: IMG.finance,
  },
  {
    id: "bm-04",
    code: "Unit 26",
    level: "RQF Level 5",
    course: "Operations Management & Lean Supply Chain",
    title: { vi: "Quản trị vận hành & Chuỗi cung ứng tinh gọn", en: "Operations management & lean supply chain" },
    hook: {
      vi: "Ý tưởng hay chỉ đáng một xu, vận hành trơn tru mới tạo ra hàng triệu đô. Tối ưu từng mắt xích trong cỗ máy doanh nghiệp.",
      en: "A good idea is worth a penny; smooth operations make millions. Optimise every link in the business machine.",
    },
    learn: [
      {
        vi: "Sản xuất tinh gọn: Lean Management, 5S, Kaizen và giao hàng đúng hạn Just-In-Time.",
        en: "Lean production: Lean Management, 5S, Kaizen and Just-in-Time delivery.",
      },
      {
        vi: "Chuỗi cung ứng thông minh: dự báo nhu cầu, tồn kho tối ưu theo EOQ, chọn nhà cung cấp.",
        en: "A smart supply chain: demand forecasting, EOQ inventory and supplier selection.",
      },
      {
        vi: "Thiết kế và chuẩn hóa quy trình vận hành tiêu chuẩn (SOP), giảm sai sót và lãng phí.",
        en: "Design and standardise operating procedures (SOPs) to cut errors and waste.",
      },
    ],
    benefit: {
      vi: "Rà soát và cắt 20–30% chi phí thừa trong vận hành nhà máy hay chuỗi cửa hàng, biến bộ máy cồng kềnh thành cỗ máy tốc độ cao.",
      en: "Identify and cut 20–30% of excess costs in a factory or store chain, and turn a bloated organisation into a high-speed machine.",
    },
    artifact: {
      vi: "Bộ SOP chuẩn và sơ đồ chuỗi cung ứng chống đứt gãy cho một chuỗi phân phối bán lẻ.",
      en: "A standard SOP set and a disruption-resistant supply chain map for a retail distribution chain.",
    },
    tools: ["ERP Odoo", "Base Wework", "Trello Kanban", "Lucidchart"],
    image: IMG.supply,
  },
  {
    id: "bm-05",
    code: "Unit 54",
    level: "RQF Level 5",
    course: "E-Commerce & Omnichannel Retail Strategy",
    title: { vi: "Thương mại điện tử & Bán lẻ đa kênh (Omnichannel)", en: "E-commerce & omnichannel retail" },
    hook: {
      vi: "Kinh doanh thời nay không biên giới. Bạn tự tay dựng gian hàng thương mại điện tử chuyên nghiệp bán ra toàn cầu.",
      en: "Today’s business has no borders. Build your own professional online store that sells worldwide.",
    },
    learn: [
      {
        vi: "Chiến lược Omnichannel: đồng bộ dữ liệu khách hàng giữa cửa hàng, mạng xã hội và sàn TMĐT.",
        en: "Omnichannel strategy: one customer view across stores, social media and marketplaces.",
      },
      {
        vi: "Tối ưu chuyển đổi trang đích (CRO) và thiết kế trải nghiệm mua hàng không ma sát.",
        en: "Landing page conversion optimisation (CRO) and a frictionless buying experience.",
      },
      {
        vi: "Quản trị đóng gói, giao vận (Fulfillment) và chăm sóc khách hàng tự động bằng Chatbot AI.",
        en: "Packing and delivery (fulfilment) and automated customer care with AI chatbots.",
      },
    ],
    benefit: {
      vi: "Vận hành gian hàng TMĐT từ A đến Z: kéo traffic miễn phí từ SEO, livestream bán hàng và giữ khách quay lại mua lần 2, lần 3.",
      en: "Run an online store end to end: drive free traffic through SEO, sell via livestreams, and win repeat customers.",
    },
    artifact: {
      vi: "Gian hàng thực chiến chuẩn SEO trên Shopee/TikTok Shop, đủ quy trình fulfillment và báo cáo tồn kho.",
      en: "A live, SEO-ready Shopee/TikTok Shop store with a full fulfilment flow and inventory report.",
    },
    tools: ["Shopee Seller Center", "TikTok Shop Partner", "Shopify", "ManyChat"],
    image: IMG.ecommerce,
  },
  {
    id: "bm-06",
    code: "Unit 3 & 4",
    level: "RQF Level 4",
    course: "Leadership, Human Resource Management & Organisational Culture",
    title: { vi: "Lãnh đạo, Nghệ thuật đắc nhân tâm & Quản trị nhân sự", en: "Leadership, people skills & human resource management" },
    hook: {
      vi: "Mọi thất bại trong kinh doanh đều bắt nguồn từ bài toán con người. Học cách dùng người, giữ người và truyền cảm hứng.",
      en: "Every business failure starts as a people problem. Learn to manage, retain and inspire people.",
    },
    learn: [
      {
        vi: "Lãnh đạo tình huống (Situational Leadership) và đọc vị tính cách qua DISC, MBTI.",
        en: "Situational leadership, and reading people with DISC and MBTI.",
      },
      {
        vi: "Tuyển dụng nhân tài Gen Z, đào tạo hội nhập và hệ thống đo hiệu suất KPI/OKR.",
        en: "Hiring Gen Z talent, onboarding, and KPI/OKR performance systems.",
      },
      {
        vi: "Luật lao động Việt Nam, văn hóa gắn kết và đàm phán giải quyết xung đột Win–Win.",
        en: "Vietnamese labour law, an engaged workplace culture and win–win conflict negotiation.",
      },
    ],
    benefit: {
      vi: "Phong thái tự tin của nhà lãnh đạo trẻ: biết lắng nghe, thấu cảm, thúc đẩy tinh thần đội ngũ và giải quyết êm đẹp mâu thuẫn nội bộ.",
      en: "The presence of a young leader: listen, empathise, lift the team and settle internal conflict gracefully.",
    },
    artifact: {
      vi: "Sổ tay Văn hóa doanh nghiệp và bộ quy chế đánh giá hiệu suất theo OKR cho doanh nghiệp 50 nhân sự.",
      en: "A company culture handbook and an OKR performance appraisal framework for a 50-person business.",
    },
    tools: ["DISC Assessment", "HRM System", "OKR Dashboard"],
    image: MEDIA.studentsCollab,
  },
  {
    id: "bm-07",
    code: "Unit 43 & 8",
    level: "RQF Level 4/5",
    course: "Business Strategy, Innovation & Commercialisation",
    title: { vi: "Hoạch định chiến lược kinh doanh & Đổi mới sáng tạo", en: "Strategic business planning & innovation" },
    hook: {
      vi: "Đừng lao vào đại dương đỏ đầy đối thủ. Học cách tạo ra khoảng thị trường mới chưa ai cạnh tranh.",
      en: "Don’t fight in a red ocean full of rivals. Learn to create new market space where no one is competing yet.",
    },
    learn: [
      {
        vi: "Chiến lược cấp công ty: Đại dương xanh (Blue Ocean), ma trận Ansoff, ma trận BCG.",
        en: "Corporate strategy: Blue Ocean, the Ansoff matrix and the BCG matrix.",
      },
      {
        vi: "Design Thinking: thấu cảm người dùng, xác định vấn đề, làm mẫu thử nhanh (Prototyping).",
        en: "Design thinking: empathise with users, define the problem and prototype fast.",
      },
      {
        vi: "Đánh giá khả thi thương mại và định giá chim mồi (Decoy Pricing) khi thâm nhập thị trường mới.",
        en: "Commercial feasibility and decoy pricing for entering a new market.",
      },
    ],
    benefit: {
      vi: "Tầm nhìn chiến lược của một CEO: biết khi nào tấn công, khi nào phòng thủ, và tung sản phẩm đổi mới khiến thị trường bất ngờ.",
      en: "A CEO’s strategic view: know when to attack, when to defend, and how to launch an innovation that surprises the market.",
    },
    artifact: {
      vi: "Đề án Chiến lược tăng trưởng & Thương mại hóa sản phẩm đổi mới sáng tạo trình Ban Giám hiệu.",
      en: "A growth and innovation commercialisation strategy presented to the college leadership.",
    },
    tools: ["Design Thinking Miro", "BCG Matrix", "Ansoff Matrix", "Strategy Canvas"],
    image: IMG.strategy,
  },
  {
    id: "bm-08",
    code: "Unit 19",
    level: "RQF Level 5 · 30 credits",
    course: "Enterprise Capstone Project & Executive Internship",
    title: { vi: "Đề án khởi nghiệp thực chiến & Thực tập điều hành 80 giờ", en: "Enterprise capstone & 80-hour executive internship" },
    hook: {
      vi: "Bài kiểm tra cuối cùng là một dự án kinh doanh thật: gọi vốn trước nhà đầu tư, hoặc nhận việc quản lý tập sự ngay sau khi bảo vệ.",
      en: "The final test is a real business project: pitch to investors, or step into a management trainee role right after your defence.",
    },
    learn: [
      {
        vi: "Đề án nghiên cứu kinh doanh thực tế theo chuẩn khảo thí quốc tế của Pearson Anh Quốc.",
        en: "A real business research project to Pearson UK’s international assessment standard.",
      },
      {
        vi: "80 giờ thực tập quản trị tại doanh nghiệp đối tác, tập đoàn đa quốc gia và hệ sinh thái EQuest.",
        en: "An 80-hour management internship with partner companies, multinationals and the EQuest ecosystem.",
      },
      {
        vi: "Thuyết trình gọi vốn (Pitch Deck) và đàm phán hợp đồng với nhà đầu tư, đối tác chiến lược.",
        en: "Investor pitches (pitch decks) and contract negotiation with investors and strategic partners.",
      },
    ],
    benefit: {
      vi: "Rời giảng đường như một nhà quản trị trưởng thành: đã va chạm thương trường, có portfolio thuyết phục và thư giới thiệu từ lãnh đạo cấp cao.",
      en: "Leave as a seasoned manager: tested in real business, with a convincing portfolio and a reference from senior leaders.",
    },
    artifact: {
      vi: "Hồ sơ đề án quản trị bảo vệ thành công trước Hội đồng Pearson và doanh nghiệp, kèm thư mời làm việc.",
      en: "A management project successfully defended before a Pearson panel and the business, plus a job offer letter.",
    },
    tools: ["Pitch Deck", "Feasibility Report", "EQuest network", "Live business setting"],
    image: IMG.pitching,
  },
]

export const PROGRAM_SUBJECTS: Record<SubjectTrackId, ProgramSubject[]> = {
  foundation: FOUNDATION,
  "data-analytics": DATA,
  "business-management": BUSINESS,
}

export function isSubjectTrack(id: string): id is SubjectTrackId {
  return id in PROGRAM_SUBJECTS
}
