import { MEDIA } from "@/constants/media"
import type { HomeCmsProps } from "@/types/home-cms"

/** Shown on the home page while the matching CMS table is empty or unreachable. */

export const DEMO_SUBJECTS: HomeCmsProps["subjects"] = [
  { id: "demo-data", icon_key: "data", title_vi: "Phân tích dữ liệu", title_en: "Data Analytics", count_label_vi: "8 học phần", count_label_en: "8 modules" },
  { id: "demo-business", icon_key: "business", title_vi: "Quản trị kinh doanh", title_en: "Business Management", count_label_vi: "8 học phần", count_label_en: "8 modules" },
  { id: "demo-marketing", icon_key: "marketing", title_vi: "Marketing số", title_en: "Digital Marketing", count_label_vi: "6 học phần", count_label_en: "6 modules" },
  { id: "demo-finance", icon_key: "finance", title_vi: "Tài chính & Kế toán", title_en: "Finance & Accounting", count_label_vi: "5 học phần", count_label_en: "5 modules" },
  { id: "demo-english", icon_key: "english", title_vi: "Tiếng Anh học thuật", title_en: "Academic English", count_label_vi: "6 cấp độ", count_label_en: "6 levels" },
  { id: "demo-python", icon_key: "code", title_vi: "Lập trình Python", title_en: "Python Programming", count_label_vi: "4 học phần", count_label_en: "4 modules" },
  { id: "demo-sql", icon_key: "database", title_vi: "Cơ sở dữ liệu & SQL", title_en: "Databases & SQL", count_label_vi: "4 học phần", count_label_en: "4 modules" },
  { id: "demo-bi", icon_key: "chart", title_vi: "Trực quan hóa Power BI", title_en: "Power BI Visualisation", count_label_vi: "3 học phần", count_label_en: "3 modules" },
  { id: "demo-hr", icon_key: "people", title_vi: "Quản trị nhân sự", title_en: "Human Resources", count_label_vi: "4 học phần", count_label_en: "4 modules" },
  { id: "demo-ecommerce", icon_key: "ecommerce", title_vi: "Thương mại điện tử", title_en: "E-commerce", count_label_vi: "4 học phần", count_label_en: "4 modules" },
  { id: "demo-project", icon_key: "project", title_vi: "Quản lý dự án", title_en: "Project Management", count_label_vi: "3 học phần", count_label_en: "3 modules" },
  { id: "demo-career", icon_key: "career", title_vi: "Kỹ năng nghề nghiệp", title_en: "Career Skills", count_label_vi: "5 học phần", count_label_en: "5 modules" },
].map((item) => ({ ...item, icon_url: null, hover_icon_url: null }))

export const DEMO_TESTIMONIALS: HomeCmsProps["testimonials"] = [
  {
    id: "demo-ha",
    author_name: "Nguyễn Thu Hà",
    author_role_vi: "Cựu SV Data Analytics · Data Analyst tại tập đoàn điện tử FDI",
    author_role_en: "Data Analytics alumna · Data Analyst at an FDI electronics group",
    quote_vi:
      "Các dự án Power BI và SQL ở VMIT giống hệt công việc mình làm hằng ngày bây giờ. Mình đi phỏng vấn với portfolio thật, không chỉ tấm bằng.",
    quote_en:
      "The Power BI and SQL projects at VMIT mirror what I do every day now. I went to interviews with a real portfolio, not just a certificate.",
    avatar_url: MEDIA.avatarHa,
  },
  {
    id: "demo-lan",
    author_name: "Trần Ngọc Lan",
    author_role_vi: "Sinh viên năm 2 · Business Management",
    author_role_en: "Year 2 student · Business Management",
    quote_vi:
      "Lớp nhỏ, giảng viên sửa bài từng người. Học hoàn toàn bằng tiếng Anh nên sau một năm mình tự tin thuyết trình trước doanh nghiệp.",
    quote_en:
      "Small classes and tutors who give one-to-one feedback. Studying fully in English made me confident presenting to employers within a year.",
    avatar_url: MEDIA.avatarLan,
  },
  {
    id: "demo-minh",
    author_name: "Lê Quang Minh",
    author_role_vi: "Sinh viên năm 1 · Data Analytics",
    author_role_en: "Year 1 student · Data Analytics",
    quote_vi:
      "Mình chọn VMIT vì lộ trình song bằng Pearson BTEC và Cao đẳng. Học phí hợp lý hơn du học mà vẫn theo chuẩn Anh Quốc.",
    quote_en:
      "I chose VMIT for the dual Pearson BTEC and college award pathway. It costs far less than studying abroad but keeps the UK standard.",
    avatar_url: MEDIA.avatarMinh,
  },
]

const DEMO_POST_BODIES: Record<string, { vi: string; en: string }> = {
  "demo-post-opening": {
    vi: `<p>Sáng 15/9, <strong>VMIT</strong> chính thức khai giảng khóa <strong><span style="color:#1eb2a6">BTEC HND Data Analytics 2026</span></strong> với hơn 120 tân sinh viên đến từ 18 tỉnh thành.</p>
<h2>Học thật từ tuần thứ ba</h2>
<p>Khác với mô hình giảng đường truyền thống, sinh viên VMIT học theo nhóm nhỏ tối đa <mark data-color="#fef08a" style="background-color:#fef08a">25 người/lớp</mark> và bắt tay vào dự án dữ liệu thực tế ngay từ tuần thứ ba của học kỳ.</p>
<img src="${MEDIA.newsClassroom}" alt="Sinh viên VMIT trong buổi học đầu tiên">
<h3>Lộ trình học kỳ 1</h3>
<ul>
<li>Tư duy dữ liệu và Excel nâng cao</li>
<li>Nhập môn SQL và cơ sở dữ liệu</li>
<li>Tiếng Anh học thuật cấp độ 1–2</li>
<li>Kỹ năng làm việc nhóm và thuyết trình</li>
</ul>
<blockquote><p>“Chúng tôi muốn mỗi sinh viên ra trường đều có một portfolio dự án thật, không chỉ một tấm bằng.” — Ban Giám đốc VMIT</p></blockquote>
<h3>Thông tin khóa học</h3>
<table><tbody>
<tr><th><p>Hạng mục</p></th><th><p>Chi tiết</p></th></tr>
<tr><td><p>Văn bằng</p></td><td><p>Pearson BTEC HND Level 5 + Cao đẳng Quốc gia</p></td></tr>
<tr><td><p>Thời gian</p></td><td><p>2,5 năm (5 học kỳ)</p></td></tr>
<tr><td><p>Ngôn ngữ</p></td><td><p>Tiếng Anh (có lớp bổ trợ)</p></td></tr>
</tbody></table>
<p>Hồ sơ xét tuyển đợt tiếp theo vẫn đang mở. Xem chi tiết tại <a href="/xet-tuyen">Cổng xét tuyển</a>.</p>`,
    en: `<p>On 15 September, <strong>VMIT</strong> officially opened its <strong><span style="color:#1eb2a6">2026 BTEC HND Data Analytics</span></strong> intake with more than 120 new students from 18 provinces.</p>
<h2>Real projects from week three</h2>
<p>Students learn in small groups of <mark data-color="#fef08a" style="background-color:#fef08a">up to 25 per class</mark> and start live data projects in the third week of term.</p>
<img src="${MEDIA.newsClassroom}" alt="VMIT students in their first class">
<ul>
<li>Data thinking and advanced Excel</li>
<li>Introduction to SQL and databases</li>
<li>Academic English levels 1–2</li>
</ul>
<p>Applications for the next round are open on the <a href="/xet-tuyen">admissions portal</a>.</p>`,
  },
  "demo-post-powerbi": {
    vi: `<p>Trong 6 tuần, nhóm 5 sinh viên năm 2 ngành Data Analytics đã xây dựng bộ <strong>dashboard vận hành bằng Power BI</strong> cho một nhà máy linh kiện điện tử tại Bắc Ninh.</p>
<img src="${MEDIA.newsAnalytics}" alt="Sinh viên trình bày dashboard Power BI">
<h2>Kết quả nổi bật</h2>
<ol>
<li>Gộp dữ liệu từ 4 hệ thống sản xuất vào một mô hình thống nhất.</li>
<li>Giảm thời gian lập báo cáo tuần từ 2 ngày xuống <strong><span style="color:#16a34a">dưới 1 giờ</span></strong>.</li>
<li>Cảnh báo sớm khi tỷ lệ lỗi dây chuyền vượt ngưỡng.</li>
</ol>
<p>Dự án được chấm điểm theo tiêu chí Pearson và được doanh nghiệp đề nghị tiếp tục hợp tác ở học kỳ sau.</p>`,
    en: `<p>Over six weeks, a team of five Year 2 Data Analytics students built a <strong>Power BI operations dashboard</strong> for an electronics plant in Bac Ninh.</p>
<img src="${MEDIA.newsAnalytics}" alt="Students presenting a Power BI dashboard">
<ol>
<li>Merged data from four production systems into one model.</li>
<li>Cut weekly reporting from two days to <strong><span style="color:#16a34a">under one hour</span></strong>.</li>
<li>Added early alerts when line defect rates exceed thresholds.</li>
</ol>`,
  },
  "demo-post-campus": {
    vi: `<p>Tuần lễ chào tân sinh viên mùa thu 2026 diễn ra sôi nổi với hơn <strong>20 hoạt động</strong> do các câu lạc bộ tổ chức.</p>
<img src="${MEDIA.newsCampusLife}" alt="Sinh viên VMIT trong khuôn viên">
<h3>Các câu lạc bộ tuyển thành viên</h3>
<ul>
<li><strong>English Club</strong> — luyện nói và tranh biện hằng tuần</li>
<li><strong>Data Club</strong> — thi phân tích dữ liệu và chia sẻ công cụ</li>
<li><strong>Đội tình nguyện VMIT</strong> — hoạt động cộng đồng cuối tuần</li>
</ul>`,
    en: `<p>Welcome Week, autumn 2026, featured more than <strong>20 activities</strong> run by student clubs.</p>
<img src="${MEDIA.newsCampusLife}" alt="VMIT students on campus">
<ul>
<li><strong>English Club</strong> — weekly speaking and debate</li>
<li><strong>Data Club</strong> — analytics challenges and tool sharing</li>
<li><strong>Volunteer team</strong> — weekend community projects</li>
</ul>`,
  },
  "demo-post-lab": {
    vi: `<p>VMIT đưa vào sử dụng phòng lab dữ liệu với <strong>40 máy trạm cấu hình cao</strong>, màn hình kép và phần mềm bản quyền.</p>
<img src="${MEDIA.newsLab}" alt="Phòng lab dữ liệu mới">
<p>Phòng lab cài sẵn <em>Power BI, Python, SQL Server</em> và mở cửa cho sinh viên tự học đến 21h các ngày trong tuần.</p>`,
    en: `<p>VMIT opened a data lab with <strong>40 high-spec workstations</strong>, dual monitors and licensed software.</p>
<img src="${MEDIA.newsLab}" alt="The new data lab">
<p>The lab runs <em>Power BI, Python and SQL Server</em> and is open for self-study until 9pm on weekdays.</p>`,
  },
  "demo-post-career": {
    vi: `<p>Hội thảo hướng nghiệp quy tụ chuyên gia nhân sự từ các doanh nghiệp FDI trong lĩnh vực sản xuất, logistics và công nghệ.</p>
<img src="${MEDIA.newsCareer}" alt="Hội thảo hướng nghiệp tại VMIT">
<h3>3 lời khuyên từ nhà tuyển dụng</h3>
<ol>
<li>CV ngắn gọn, nêu rõ kết quả dự án bằng con số.</li>
<li>Chuẩn bị portfolio có thể trình bày trong 5 phút.</li>
<li>Luyện phỏng vấn bằng tiếng Anh ít nhất 3 buổi.</li>
</ol>`,
    en: `<p>The career talk brought together HR leaders from FDI companies in manufacturing, logistics and technology.</p>
<img src="${MEDIA.newsCareer}" alt="Career talk at VMIT">
<ol>
<li>Keep your CV short and quantify project results.</li>
<li>Prepare a portfolio you can present in five minutes.</li>
<li>Practise at least three interviews in English.</li>
</ol>`,
  },
}

const DEMO_POST_LIST: HomeCmsProps["posts"] = [
  {
    id: "demo-post-opening",
    slug: "khai-giang-btec-hnd-2026",
    title_vi: "VMIT khai giảng khóa BTEC HND Data Analytics 2026",
    title_en: "VMIT opens the 2026 BTEC HND Data Analytics intake",
    excerpt_vi:
      "Hơn 120 tân sinh viên bước vào học kỳ đầu với lớp học nhỏ, giáo trình Pearson và dự án thực tế ngay từ tuần thứ ba.",
    excerpt_en:
      "Over 120 new students begin their first term with small classes, Pearson materials and live projects from week three.",
    cover_url: MEDIA.newsClassroom,
    author_name: "Phòng Tuyển sinh",
    published_at: "2026-09-15T08:00:00+07:00",
  },
  {
    id: "demo-post-powerbi",
    slug: "thuc-chien-power-bi-fdi",
    title_vi: "Sinh viên thực chiến Power BI cùng doanh nghiệp FDI",
    title_en: "Students build Power BI dashboards with FDI employers",
    excerpt_vi:
      "Nhóm sinh viên năm 2 hoàn thành bộ dashboard vận hành cho một nhà máy linh kiện điện tử tại Bắc Ninh trong 6 tuần.",
    excerpt_en:
      "A Year 2 team delivered an operations dashboard for an electronics plant in Bac Ninh in six weeks.",
    cover_url: MEDIA.newsAnalytics,
    author_name: "Khoa Dữ liệu",
    published_at: "2026-09-08T08:00:00+07:00",
  },
  {
    id: "demo-post-campus",
    slug: "ngay-hoi-doi-song-sinh-vien",
    title_vi: "Ngày hội đời sống sinh viên VMIT mùa thu 2026",
    title_en: "VMIT Student Life Fair, autumn 2026",
    excerpt_vi:
      "Câu lạc bộ tiếng Anh, Data Club và đội tình nguyện chào đón tân sinh viên với chuỗi hoạt động trải nghiệm suốt một tuần.",
    excerpt_en:
      "The English Club, Data Club and volunteer team welcomed new students with a week of hands-on activities.",
    cover_url: MEDIA.newsCampusLife,
    author_name: "Phòng Công tác SV",
    published_at: "2026-08-28T08:00:00+07:00",
  },
  {
    id: "demo-post-lab",
    slug: "phong-lab-du-lieu-moi",
    title_vi: "Khánh thành phòng lab dữ liệu chuẩn doanh nghiệp",
    title_en: "New industry-standard data lab opens on campus",
    excerpt_vi:
      "Phòng lab 40 máy cấu hình cao, cài sẵn Power BI, Python và SQL Server phục vụ các học phần thực hành.",
    excerpt_en:
      "A 40-seat high-spec lab with Power BI, Python and SQL Server supports all practical modules.",
    cover_url: MEDIA.newsLab,
    author_name: "VMIT",
    published_at: "2026-08-18T08:00:00+07:00",
  },
  {
    id: "demo-post-career",
    slug: "hoi-thao-nghe-nghiep-fdi",
    title_vi: "Hội thảo hướng nghiệp: Con đường vào doanh nghiệp FDI",
    title_en: "Career talk: pathways into FDI companies",
    excerpt_vi:
      "Chuyên gia nhân sự từ các tập đoàn FDI chia sẻ kỹ năng CV, phỏng vấn và những vị trí đang tuyển cho sinh viên mới tốt nghiệp.",
    excerpt_en:
      "HR leaders from FDI groups shared CV and interview tips plus the graduate roles they are hiring for.",
    cover_url: MEDIA.newsCareer,
    author_name: "Trung tâm Việc làm",
    published_at: "2026-08-05T08:00:00+07:00",
  },
]

export const DEMO_POSTS: HomeCmsProps["posts"] = DEMO_POST_LIST.map((post) => ({
  ...post,
  body_vi: DEMO_POST_BODIES[post.id]?.vi ?? null,
  body_en: DEMO_POST_BODIES[post.id]?.en ?? null,
}))
