import type { Locale } from "@/lib/i18n/types"

export const STATION_IDS = ["ga-0", "ga-1", "ga-2", "ga-3", "ga-interchange"] as const
export const ROUTE_IDS = ["tuyen-do", "tuyen-xanh-duong", "tuyen-tim", "tuyen-xanh-la"] as const

export type StationId = (typeof STATION_IDS)[number]
export type RouteId = (typeof ROUTE_IDS)[number]

export type Station = {
  id: StationId
  code: string
  title: string
  subtitle: string
  when: string
  time: string
  status: string
  body: string
  marks: string[]
}

export type BoardingPass = {
  label: string
  train: string
  from: [string, string]
  to: [string, string]
  rows: [string, string][]
}

export type RouteLine = {
  id: RouteId
  name: string
  epithet: string
  destination: string
  body: string
  points: string[]
}

export type Region = {
  name: string
  schools: string[]
  perks: string[]
}

export type PathwayStory = {
  skip: string
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  scrollHint: string
  stationNav: string
  pass: BoardingPass
  boardTitle: string
  boardClock: string
  boardHeads: [string, string, string, string]
  nextStation: string
  lastStop: string
  platform: string
  stations: Station[]
  routesEyebrow: string
  routesTitle: string
  routesLead: string
  terminus: string
  routes: RouteLine[]
  proofEyebrow: string
  proofTitle: string
  proofLead: string
  proofFacts: { value: string; label: string }[]
  levelCaption: string
  levelHeads: [string, string, string, string]
  levels: { level: string; rqf: string; vn: string; benefit: string; highlight?: boolean }[]
  practiceEyebrow: string
  practiceTitle: string
  practice: { title: string; body: string }[]
  awardEyebrow: string
  awardTitle: string
  awardLead: string
  awardOptions: { title: string; points: string[]; outcome: string }[]
  awardNote: string
  networkEyebrow: string
  networkTitle: string
  networkLead: string
  regions: Region[]
  closeEyebrow: string
  closeTitle: string
  closeLead: string
  majors: { title: string; body: string }[]
  commitmentsTitle: string
  commitments: string[]
}

const vi: PathwayStory = {
  skip: "Bỏ qua hành trình, tới cam kết",
  heroEyebrow: "Journey to the World Excellence",
  heroTitle: "Hành trình vươn ra biển\u00A0lớn",
  heroLead:
    "VMIT là một chuyến tàu mang bạn tới những xứ sở của kiến thức và trải nghiệm phong phú của thế giới học tập suốt đời.",
  scrollHint: "Enter the line",
  stationNav: "Các ga trên tuyến",
  pass: {
    label: "Boarding pass",
    train: "VMIT Express",
    from: ["Khởi hành", "Tuổi 18 · Hà\u00A0Nội"],
    to: ["Điểm đến", "Thế giới"],
    rows: [
      ["Hạng vé", "Pearson BTEC"],
      ["Sân ga", "0"],
      ["Hành trình", "5\u00A0ga · 2\u00A0năm"],
    ],
  },
  boardTitle: "Bảng giờ tàu · VMIT Express",
  boardClock: "Tuyến quốc tế",
  boardHeads: ["Thời điểm", "Ga", "Sân ga", "Trạng thái"],
  nextStation: "Ga tiếp theo",
  lastStop: "Đổi tuyến tại đây",
  platform: "Sân ga",
  stations: [
    {
      id: "ga-0",
      code: "Station 0",
      title: "Khởi hành",
      subtitle: "Vốn nhẹ, bước xa",
      when: "Mùa hè tuổi 18 · Tốt nghiệp THPT",
      time: "Tuổi 18",
      status: "Mời lên tàu",
      body: "Chỉ từ 15 triệu đồng nhập học đợt đầu. Áp lực tài chính tiền tỷ ở lại phía sau. Bạn nhận vé và bước lên Line quốc tế.",
      marks: ["Từ 15 triệu đồng", "Ticket in"],
    },
    {
      id: "ga-1",
      code: "Station 1",
      title: "Foundation",
      subtitle: "Bứt phá tiếng Anh",
      when: "Học kỳ 1 · Tháng 0–6 · Tiếng Anh học thuật và kỹ năng",
      time: "Tháng 0–6",
      status: "Đúng giờ",
      body: "Nhúng 100% môi trường tiếng Anh thực chiến. Phản xạ giao tiếp và thuyết trình thay cho nỗi sợ. Chuẩn Station này: IELTS\u00A05.5–6.0+.",
      marks: ["100% tiếng Anh thực chiến", "IELTS 5.5–6.0+"],
    },
    {
      id: "ga-2",
      code: "Station 2",
      title: "HNC Level 4",
      subtitle: "Nhập môn thực chiến",
      when: "Năm 1 · Học kỳ 2 và 3 · 8 units chuyên ngành chuẩn Anh",
      time: "Năm 1",
      status: "Đúng giờ",
      body: "Không thi vẹt. Bạn nhập vai chuyên viên và giải bài toán thật từ case study của tập đoàn đa quốc gia. 70% thời lượng là thực hành.",
      marks: ["8 units chuẩn Anh", "70% thực hành"],
    },
    {
      id: "ga-3",
      code: "Station 3",
      title: "HND Level 5",
      subtitle: "Làm chủ dự án",
      when: "Năm 2 · Học kỳ 4 và 5 · 7 units nâng cao và đồ án",
      time: "Năm 2",
      status: "Đúng giờ",
      body: "Chất lượng được thẩm định hai tầng: hội đồng nội bộ và chuyên gia Pearson Anh Quốc. Cuối Station là một portfolio sẵn sàng cho vòng phỏng vấn.",
      marks: ["Thẩm định Pearson UK", "Portfolio phỏng vấn"],
    },
    {
      id: "ga-interchange",
      code: "Interchange",
      title: "Trung chuyển",
      subtitle: "Tuổi 20 tỏa sáng",
      when: "Cuối năm 2 · Cán đích Cử nhân thực hành",
      time: "Tuổi 20",
      status: "Đổi tuyến",
      body: "Song bằng trong tay: Cao đẳng chính quy APC và Pearson BTEC HND Level\u00A05. Bạn chọn một trong bốn Line — đi làm ngay, sang Anh, chuyển tiếp toàn cầu, hoặc học năm cuối ngay tại Việt Nam.",
      marks: ["Song bằng APC + BTEC", "Bốn lối ra"],
    },
  ],
  routesEyebrow: "Four Lines",
  routesTitle: "Bốn Line rời Interchange",
  routesLead: "Cùng một vé HND. Bốn đích khác nhau. Bạn chọn sau khi đã đứng vững.",
  terminus: "Ga cuối",
  routes: [
    {
      id: "tuyen-do",
      name: "Red Line",
      epithet: "Direct Career Express",
      destination: "Tập đoàn FDI & đa quốc gia",
      body: "Nhận song bằng chính quy APC và BTEC HND Anh Quốc, rồi bước thẳng vào tập đoàn FDI và doanh nghiệp đa quốc gia ở tuổi 20 — với tác phong làm việc quốc tế.",
      points: ["Song bằng APC + BTEC HND", "Vào việc ở tuổi 20", "Mạng lưới FDI / MNC"],
    },
    {
      id: "tuyen-xanh-duong",
      name: "Blue Line",
      epithet: "Sunderland UK Flight",
      destination: "Sunderland · London, Anh",
      body: "Bay sang Anh học đúng một năm cuối tại campus London hoặc Sunderland. Bằng Cử nhân danh dự của Đại học Sunderland, kèm Graduate Route Visa ở lại Anh hai năm làm việc.",
      points: ["Top-up 1 năm tại Anh", "BA (Hons) hoặc BSc (Hons)", "Graduate Visa 2 năm"],
    },
    {
      id: "tuyen-tim",
      name: "Purple Line",
      epithet: "Global Transfer",
      destination: "300+ đại học toàn cầu",
      body: "Chuyển tiếp sang Thụy Sĩ, Singapore, Hàn Quốc, Mỹ hoặc Úc nhờ mạng lưới hơn 300 trường công nhận trọn 240 tín chỉ của bằng BTEC HND Level 5.",
      points: ["Thụy Sĩ · SHMS", "Singapore · PSB / SIM", "Hàn Quốc · Chosun", "Mỹ · Keiser · Úc · Macquarie"],
    },
    {
      id: "tuyen-xanh-la",
      name: "Green Line",
      epithet: "Home top-up",
      destination: "Cử nhân Sunderland tại Việt Nam",
      body: "Học năm cuối của Đại học Sunderland ngay tại Việt Nam, hình thức hybrid. Ban ngày đi làm, buổi tối học lấy bằng Cử nhân chính quy, giữ lại khoảng 80% chi phí so với sang Anh.",
      points: ["Năm cuối tại Việt Nam", "Ngày làm, tối học", "Tiết kiệm khoảng 80% chi phí"],
    },
  ],
  proofEyebrow: "Tấm vé",
  proofTitle: "Vì sao Station cuối mở được cửa thế giới",
  proofLead:
    "Pearson BTEC HND Level 5 tại Cao đẳng Việt Mỹ Hà Nội là hộ chiếu học thuật: song bằng trong nước, và 240 tín chỉ được hơn 300 đại học đối tác nhận vào năm cuối.",
  proofFacts: [
    { value: "1844", label: "Pearson, London — tổ chức khảo thí lớn, hơn 1 triệu người tốt nghiệp mỗi năm trên 70 quốc gia." },
    { value: "RQF", label: "HNC Level 4 và HND Level 5 được Ofqual, cơ quan văn bằng của Chính phủ Anh, cấp mã trong khung RQF." },
    { value: "240", label: "Tín chỉ CATS — tương đương 120 ECTS và trọn hai năm đầu cử nhân Anh. Cửa top-up mở từ đây." },
  ],
  levelCaption: "Bậc BTEC và quyền chuyển tiếp",
  levelHeads: ["Cấp độ", "Chuẩn Anh", "Tại Việt Nam", "Chuyển tiếp"],
  levels: [
    {
      level: "BTEC Level 3",
      rqf: "Tương đương A-Levels / tú tài Anh",
      vn: "Tốt nghiệp THPT",
      benefit: "Vào thẳng năm 1 đại học quốc tế",
    },
    {
      level: "BTEC Level 4 · HNC",
      rqf: "Năm 1 đại học Anh · 120 tín chỉ",
      vn: "Năm 1 cao đẳng chính quy",
      benefit: "Chuyển tiếp năm 2",
    },
    {
      level: "BTEC Level 5 · HND",
      rqf: "Năm 2 đại học Anh · 240 tín chỉ",
      vn: "Tốt nghiệp cao đẳng chính quy · song bằng",
      benefit: "Top-up 1 năm lấy cử nhân",
      highlight: true,
    },
    {
      level: "Level 6 · Top-up",
      rqf: "Bằng Cử nhân đại học",
      vn: "Bằng đại học chính quy",
      benefit: "Làm việc toàn cầu hoặc học thẳng thạc sĩ",
    },
  ],
  practiceEyebrow: "On board",
  practiceTitle: "Học để làm được việc",
  practice: [
    {
      title: "Không thi vẹt",
      body: "Năng lực được chấm qua hồ sơ dự án. Mỗi assignment là một bài toán thật — từ các tập đoàn như Apple, Unilever, VinFast, Shopee.",
    },
    {
      title: "Portfolio mang đi phỏng vấn",
      body: "Báo cáo thị trường, phân tích Power BI hoặc Tableau, kế hoạch marketing đa kênh đã được thẩm định.",
    },
    {
      title: "Tác phong văn phòng quốc tế",
      body: "Làm việc nhóm, tiến độ Gantt, Agile, rồi pitching bằng tiếng Anh chuyên ngành trước hội đồng doanh nghiệp.",
    },
    {
      title: "Thẩm định hai tầng",
      body: "Hội đồng nội bộ chấm chéo. Giám sát viên Pearson Anh Quốc phúc tra ngẫu nhiên. Đầu ra không chỉ do một người chấm.",
    },
  ],
  awardEyebrow: "Song bằng",
  awardTitle: "APC trong nước. Pearson từ London. Năm cuối tại Sunderland.",
  awardLead:
    "Tốt nghiệp VMIT là hai văn bằng: Cao đẳng chính quy do APC cấp, và Pearson BTEC HND Level 5 do Anh Quốc cấp. Đại học Sunderland — công lập, từ 1901 — nhận tín chỉ đó cho đúng một năm cuối.",
  awardOptions: [
    {
      title: "Sang Anh một năm",
      points: [
        "Campus Sunderland hoặc London",
        "Thư viện số, thực tập tại Anh",
        "Graduate Route Visa làm việc 2 năm",
      ],
      outcome: "BA (Hons) Quản trị kinh doanh hoặc BSc (Hons) Công nghệ, do Đại học Sunderland cấp.",
    },
    {
      title: "Học năm cuối tại Việt Nam",
      points: [
        "Chương trình năm cuối Sunderland, liên kết khảo thí",
        "Không mang chi phí sinh hoạt Anh",
        "Ngày đi làm, tối hoặc cuối tuần lên lớp",
      ],
      outcome: "Cùng bằng Cử nhân chính quy của Sunderland, được Bộ GD&ĐT Việt Nam công nhận.",
    },
  ],
  awardNote:
    "So với tự túc 3–4 năm tại Anh, lộ trình này tiết kiệm hơn 1 tỷ đồng. Nhánh Keiser University (Mỹ, hệ sinh thái EQuest) có ưu đãi học phí 30%.",
  networkEyebrow: "300+ trường",
  networkTitle: "Purple Line đi những đâu",
  networkLead:
    "Pearson Degree Finder nối HND Level 5 với đại học đối tác. VMIT chủ động chọn quốc gia — không khóa một cổng duy nhất.",
  regions: [
    {
      name: "Vương quốc Anh",
      schools: ["Sunderland — Sunderland và London", "Huddersfield, Middlesex, Greenwich", "Oxford Brookes, Northampton"],
      perks: ["Đúng 1 năm cuối", "BA (Hons) / BSc (Hons)", "Graduate Visa 2 năm"],
    },
    {
      name: "Châu Âu",
      schools: ["Thụy Sĩ: SHMS, César Ritz, Hotel Institute Montreux", "Ireland: Griffith College, National College of Ireland", "Phần Lan và Hà Lan: HAMK, The Hague"],
      perks: ["Thêm 1–1,5 năm", "Thụy Sĩ: thực tập hưởng lương 6 tháng", "Cơ hội việc làm khối Schengen"],
    },
    {
      name: "Châu Á",
      schools: ["Singapore: SIM, PSB Academy, Kaplan", "Hàn Quốc: Chosun, SolBridge", "Malaysia: Sunway, Taylor's"],
      perks: ["Bằng Anh hoặc Úc tại Singapore / Malaysia", "Hàn Quốc: lộ trình 2+2", "Gần Việt Nam, chi phí vừa"],
    },
    {
      name: "Bắc Mỹ",
      schools: ["Mỹ: Keiser University, Troy University", "Canada: Thompson Rivers, George Brown College"],
      perks: ["Công nhận năm 1 và năm 2", "Keiser: học bổng nội bộ 30%", "OPT tại Mỹ 1–3 năm"],
    },
    {
      name: "Châu Đại Dương",
      schools: ["Úc: Macquarie, Deakin, Griffith", "New Zealand: Waikato, Otago Polytechnic"],
      perks: ["Thêm 1–1,5 năm", "Bằng theo khung AQF", "Post-study visa Úc 2–4 năm"],
    },
  ],
  closeEyebrow: "Journey to the World Excellence",
  closeTitle: "Hai ngành. Bốn cam kết. Một biển lớn.",
  closeLead: "Chọn ngành để đi tiếp. Bốn cam kết đi cùng chuyến tàu, tới những xứ sở của kiến thức.",
  majors: [
    {
      title: "Data Analytics",
      body: "Phân tích dữ liệu kinh doanh, BI, Python, SQL và AI.",
    },
    {
      title: "Business Management",
      body: "Quản trị kinh doanh số, tài chính, marketing đa kênh và khởi nghiệp.",
    },
  ],
  commitmentsTitle: "Bốn cam kết",
  commitments: [
    "Song bằng danh giá: Cao đẳng chính quy và BTEC HND Anh Quốc.",
    "100% việc làm tại mạng lưới tập đoàn FDI và doanh nghiệp đa quốc gia.",
    "70% thời lượng là thực hành dự án cùng chuyên gia doanh nghiệp.",
    "Chuẩn đầu ra IELTS 6.5+ và lộ trình chuyển tiếp sang đại học đối tác Pearson.",
  ],
}

const en: PathwayStory = {
  skip: "Skip the journey, go to our commitments",
  heroEyebrow: "Journey to the World Excellence",
  heroTitle: "A journey out to the open\u00A0sea",
  heroLead:
    "VMIT is a train that carries you to lands of knowledge and the rich experiences of a world of lifelong learning.",
  scrollHint: "Board the train",
  stationNav: "Stations on the line",
  pass: {
    label: "Boarding pass",
    train: "VMIT Express",
    from: ["From", "Age 18 · Hanoi"],
    to: ["To", "The world"],
    rows: [
      ["Class", "Pearson BTEC"],
      ["Platform", "0"],
      ["Journey", "5\u00A0stations · 2\u00A0years"],
    ],
  },
  boardTitle: "Departures · VMIT Express",
  boardClock: "International line",
  boardHeads: ["When", "Station", "Platform", "Status"],
  nextStation: "Next station",
  lastStop: "Change here",
  platform: "Platform",
  stations: [
    {
      id: "ga-0",
      code: "Station 0",
      title: "Departure",
      subtitle: "Travel light, go far",
      when: "The summer you turn 18 · High-school graduation",
      time: "Age 18",
      status: "Boarding",
      body: "Enrol with a first payment from just 15 million VND. Billion-dong financial pressure stays on the platform. You take your ticket and board the international line.",
      marks: ["From 15 million VND", "Ticket in hand"],
    },
    {
      id: "ga-1",
      code: "Station 1",
      title: "Foundation",
      subtitle: "English, unlocked",
      when: "Semester 1 · Months 0–6 · Academic English and skills",
      time: "Months 0–6",
      status: "On time",
      body: "Total immersion in real-world English. Confident conversation and presenting replace the fear. The standard at this station: IELTS\u00A05.5–6.0+.",
      marks: ["100% real-world English", "IELTS 5.5–6.0+"],
    },
    {
      id: "ga-2",
      code: "Station 2",
      title: "HNC Level 4",
      subtitle: "Hands-on from day one",
      when: "Year 1 · Semesters 2 and 3 · 8 UK-standard specialist units",
      time: "Year 1",
      status: "On time",
      body: "No rote learning. You step into a specialist’s role and solve real problems from multinational case studies. 70% of study time is hands-on practice.",
      marks: ["8 UK-standard units", "70% hands-on"],
    },
    {
      id: "ga-3",
      code: "Station 3",
      title: "HND Level 5",
      subtitle: "Mastering the project",
      when: "Year 2 · Semesters 4 and 5 · 7 advanced units and a major project",
      time: "Year 2",
      status: "On time",
      body: "Quality is verified at two levels: an internal board and Pearson UK experts. You reach the end of this station with an interview-ready portfolio.",
      marks: ["Pearson UK verification", "Interview-ready portfolio"],
    },
    {
      id: "ga-interchange",
      code: "Interchange",
      title: "Interchange",
      subtitle: "Shining at 20",
      when: "End of year 2 · Graduate as a Practical Bachelor",
      time: "Age 20",
      status: "Change lines",
      body: "Two qualifications in hand: a formal college diploma and the Pearson BTEC HND Level\u00A05. You choose one of four lines — start work, fly to the UK, transfer worldwide, or complete your final year in Vietnam.",
      marks: ["College + BTEC dual award", "Four exits"],
    },
  ],
  routesEyebrow: "Four Lines",
  routesTitle: "Four Lines leave the Interchange",
  routesLead: "One HND ticket. Four destinations. You choose once you can stand on your own.",
  terminus: "Terminus",
  routes: [
    {
      id: "tuyen-do",
      name: "Red Line",
      epithet: "Direct Career Express",
      destination: "FDI & global\u00A0employers",
      body: "Take the APC diploma and the UK BTEC HND straight into FDI groups and multinational firms at 20, with an international way of working.",
      points: ["APC + BTEC HND", "Into work at 20", "FDI / MNC network"],
    },
    {
      id: "tuyen-xanh-duong",
      name: "Blue Line",
      epithet: "Sunderland UK Flight",
      destination: "Sunderland · London, UK",
      body: "One final year in London or Sunderland. An honours degree from the University of Sunderland, plus a two-year Graduate Route visa to work in the UK.",
      points: ["One top-up year in the UK", "BA (Hons) or BSc (Hons)", "2-year Graduate visa"],
    },
    {
      id: "tuyen-tim",
      name: "Purple Line",
      epithet: "Global Transfer",
      destination: "300+ universities",
      body: "Move on to Switzerland, Singapore, Korea, the USA or Australia. More than 300 universities accept the full 240 credits of a BTEC HND Level 5.",
      points: ["Switzerland · SHMS", "Singapore · PSB / SIM", "Korea · Chosun", "USA · Keiser · Australia · Macquarie"],
    },
    {
      id: "tuyen-xanh-la",
      name: "Green Line",
      epithet: "Home top-up",
      destination: "A Sunderland degree in Vietnam",
      body: "Sunderland’s final year in Vietnam, hybrid. Work by day, study at night, and keep about 80% of the cost of moving to the UK.",
      points: ["Final year in Vietnam", "Work by day, study at night", "About 80% of the cost stays home"],
    },
  ],
  proofEyebrow: "The ticket",
  proofTitle: "Why the last gate opens onto the world",
  proofLead:
    "A Pearson BTEC HND Level 5 at Vietnam–America College, Hanoi is an academic passport: a national dual award, and 240 credits that 300-plus partner universities can take into a final year.",
  proofFacts: [
    { value: "1844", label: "Pearson, London — a major awarding body, with more than a million graduates a year across 70 countries." },
    { value: "RQF", label: "HNC Level 4 and HND Level 5 sit on the Regulated Qualifications Framework, regulated by Ofqual." },
    { value: "240", label: "UK CATS credits — 120 ECTS, the whole of years 1 and 2 of a UK bachelor. The top-up door opens here." },
  ],
  levelCaption: "BTEC levels and where they lead",
  levelHeads: ["Level", "UK standard", "In Vietnam", "Progression"],
  levels: [
    {
      level: "BTEC Level 3",
      rqf: "Comparable to A-Levels",
      vn: "High-school graduation",
      benefit: "Direct entry to year 1 abroad",
    },
    {
      level: "BTEC Level 4 · HNC",
      rqf: "UK year 1 · 120 credits",
      vn: "College year 1",
      benefit: "Progress to year 2",
    },
    {
      level: "BTEC Level 5 · HND",
      rqf: "UK year 2 · 240 credits",
      vn: "College graduation · dual award",
      benefit: "One-year top-up to a bachelor",
      highlight: true,
    },
    {
      level: "Level 6 · Top-up",
      rqf: "Bachelor’s degree",
      vn: "A formal university degree",
      benefit: "Work globally or continue to a master’s",
    },
  ],
  practiceEyebrow: "On board",
  practiceTitle: "Trained to do the work",
  practice: [
    {
      title: "No rote exams",
      body: "You are assessed on project briefs — real problems drawn from firms such as Apple, Unilever, VinFast and Shopee.",
    },
    {
      title: "A portfolio you can take to interviews",
      body: "Market reports, Power BI or Tableau analysis, and a reviewed multi-channel marketing plan.",
    },
    {
      title: "An international office manner",
      body: "Teamwork, Gantt schedules, Agile, then a pitch in specialist English to an industry panel.",
    },
    {
      title: "Two independent checks",
      body: "An internal verifier cross-marks. A Pearson UK external examiner samples the work. One marker does not decide the outcome.",
    },
  ],
  awardEyebrow: "Dual award",
  awardTitle: "APC at home. Pearson from London. A final year at Sunderland.",
  awardLead:
    "VMIT graduation is two credentials: a national college diploma from APC, and a Pearson BTEC HND Level 5 awarded from the UK. The University of Sunderland — a public university since 1901 — accepts those credits for exactly one final year.",
  awardOptions: [
    {
      title: "One year in the UK",
      points: ["Sunderland or London campus", "Digital library, internships in the UK", "A 2-year Graduate Route visa"],
      outcome: "BA (Hons) Business or BSc (Hons) Technology, awarded by the University of Sunderland.",
    },
    {
      title: "The final year in Vietnam",
      points: [
        "Sunderland’s final year, with a local exam partner",
        "UK living costs stay off the bill",
        "Work by day, class in the evening or at the weekend",
      ],
      outcome: "The same Sunderland bachelor awarded to students in the UK, recognised by Vietnam’s Ministry of Education.",
    },
  ],
  awardNote:
    "Against three or four self-funded years in the UK, this pathway saves more than 1 billion VND. The Keiser University branch (USA, EQuest network) includes a 30% tuition preference.",
  networkEyebrow: "300+ universities",
  networkTitle: "Where the Purple Line can go",
  networkLead:
    "Pearson Degree Finder connects an HND Level 5 to partner universities. VMIT does not lock you to a single gate.",
  regions: [
    {
      name: "United Kingdom",
      schools: ["Sunderland — Sunderland and London", "Huddersfield, Middlesex, Greenwich", "Oxford Brookes, Northampton"],
      perks: ["Exactly one final year", "BA (Hons) / BSc (Hons)", "2-year Graduate visa"],
    },
    {
      name: "Europe",
      schools: ["Switzerland: SHMS, César Ritz, Hotel Institute Montreux", "Ireland: Griffith College, National College of Ireland", "Finland and the Netherlands: HAMK, The Hague"],
      perks: ["1–1.5 further years", "Switzerland: a paid 6-month placement", "Work routes in the Schengen area"],
    },
    {
      name: "Asia",
      schools: ["Singapore: SIM, PSB Academy, Kaplan", "Korea: Chosun, SolBridge", "Malaysia: Sunway, Taylor’s"],
      perks: ["A UK or Australian degree in Singapore or Malaysia", "Korea: a 2+2 route", "Closer to home, moderate cost"],
    },
    {
      name: "North America",
      schools: ["USA: Keiser University, Troy University", "Canada: Thompson Rivers, George Brown College"],
      perks: ["Years 1 and 2 recognised", "Keiser: 30% internal scholarship", "OPT in the USA for 1–3 years"],
    },
    {
      name: "Oceania",
      schools: ["Australia: Macquarie, Deakin, Griffith", "New Zealand: Waikato, Otago Polytechnic"],
      perks: ["1–1.5 further years", "An AQF-aligned degree", "Australian post-study visa, 2–4 years"],
    },
  ],
  closeEyebrow: "Journey to the World Excellence",
  closeTitle: "Two programmes. Four commitments. One open sea.",
  closeLead: "Choose a programme and go further. Four commitments ride with the train, toward lands of knowledge.",
  majors: [
    { title: "Data Analytics", body: "Business data, BI, Python, SQL and AI." },
    { title: "Business Management", body: "Digital business, finance, multi-channel marketing and venture-building." },
  ],
  commitmentsTitle: "Four commitments",
  commitments: [
    "A dual award: the national college diploma and a UK BTEC HND.",
    "100% employment across the FDI and multinational network.",
    "Seventy percent of the time spent on projects with industry specialists.",
    "An IELTS 6.5+ exit standard, and a route into Pearson’s partner universities.",
  ],
}

export function pathwayStory(locale: Locale): PathwayStory {
  return locale === "en" ? en : vi
}
