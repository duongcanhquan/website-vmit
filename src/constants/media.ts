export const MEDIA = {
  hero: "/media/banners/hero-vmit-student.jpg",
  heroStudent: "/media/banners/hero-vmit-student.jpg",
  heroCampusUk: "/media/banners/hero-campus-uk.jpg",
  aboutStudent: "/media/banners/about-vmit-student.webp",
  studentsStudy: "/media/banners/students-asian-classroom.jpg",
  campusFacility: "/media/banners/campus-quad.jpg",
  studentsCollab: "/media/banners/students-asian-collab.jpg",
  library: "/media/banners/students-library.jpg",
  lab: "/media/banners/students-lab.jpg",
  seminar: "/media/banners/students-seminar.jpg",
  international: "/media/banners/international-friends.jpg",
  lectureHall: "/media/banners/lecture-hall.jpg",
  campusArchitecture: "/media/banners/campus-architecture.jpg",
  newsClassroom: "/media/news/classroom.jpg",
  newsAnalytics: "/media/news/analytics.jpg",
  newsCampusLife: "/media/news/campus-life.jpg",
  newsLab: "/media/news/lab.jpg",
  newsCareer: "/media/news/career.jpg",
} as const

export type BannerItem = {
  src: string
  altVi: string
  altEn: string
  captionVi: string
  captionEn: string
}

/** Editorial banners: UK campus · Asian / international students · facilities */
export const CAMPUS_BANNERS: readonly BannerItem[] = [
  {
    src: MEDIA.hero,
    altVi: "Sinh viên quốc tế thảo luận nhóm trên khuôn viên",
    altEn: "International students collaborating on campus",
    captionVi: "Cộng đồng học tập quốc tế",
    captionEn: "An international learning community",
  },
  {
    src: MEDIA.heroCampusUk,
    altVi: "Kiến trúc giảng đường chuẩn Anh Quốc",
    altEn: "UK-style university architecture",
    captionVi: "Không gian học thuật Anh Quốc",
    captionEn: "British academic atmosphere",
  },
  {
    src: MEDIA.studentsCollab,
    altVi: "Sinh viên châu Á làm việc nhóm",
    altEn: "Asian students collaborating on a project",
    captionVi: "Sinh viên châu Á · học thực chiến",
    captionEn: "Asian students · practice-led learning",
  },
  {
    src: MEDIA.studentsStudy,
    altVi: "Lớp học đa văn hóa",
    altEn: "Multicultural classroom discussion",
    captionVi: "Lớp học đa văn hóa",
    captionEn: "Multicultural classrooms",
  },
  {
    src: MEDIA.library,
    altVi: "Thư viện ánh sáng tự nhiên",
    altEn: "Daylit university library",
    captionVi: "Thư viện & tự học",
    captionEn: "Library & independent study",
  },
  {
    src: MEDIA.lab,
    altVi: "Phòng lab thực hành",
    altEn: "Hands-on laboratory session",
    captionVi: "Lab thực hành hiện đại",
    captionEn: "Modern practice labs",
  },
  {
    src: MEDIA.seminar,
    altVi: "Seminar giảng viên và sinh viên",
    altEn: "Tutor-led seminar with students",
    captionVi: "Seminar 1:1 & nhóm nhỏ",
    captionEn: "Seminars & small-group tutoring",
  },
  {
    src: MEDIA.international,
    altVi: "Bạn bè quốc tế trên campus",
    altEn: "International friends on campus",
    captionVi: "Kết nối bạn bè toàn cầu",
    captionEn: "Global friendships on campus",
  },
] as const
