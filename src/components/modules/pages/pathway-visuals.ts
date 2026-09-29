import { ABOUT_MEDIA } from "@/constants/about-content"
import { MEDIA } from "@/constants/media"
import type { Locale } from "@/lib/i18n/types"

export type Frame = {
  src: string
  altVi: string
  altEn: string
}

export const PATHWAY_HERO = "/media/pathway/hero-train.jpg"

export const STATION_FRAMES: Frame[] = [
  {
    src: "/media/pathway/station-0.jpg",
    altVi: "Tân sinh viên cầm vé lên tàu VMIT tại Station 0",
    altEn: "A new student holding a ticket as the VMIT train arrives at Station 0",
  },
  {
    src: "/media/pathway/station-1.jpg",
    altVi: "Lớp tiếng Anh sôi nổi trong toa tàu Foundation",
    altEn: "A lively English class inside the Foundation carriage",
  },
  {
    src: "/media/pathway/station-2.jpg",
    altVi: "Nhóm sinh viên giải case study tại sân ga HNC Level 4",
    altEn: "Students working on a case study at the HNC Level 4 platform",
  },
  {
    src: "/media/pathway/station-3.jpg",
    altVi: "Sinh viên bảo vệ portfolio trước giám khảo Anh tại ga HND Level 5",
    altEn: "A student presenting a portfolio to UK assessors at HND Level 5",
  },
  {
    src: "/media/pathway/interchange.jpg",
    altVi: "Tân cử nhân trước bảng chỉ hướng bốn tuyến tại ga Interchange",
    altEn: "Graduates facing the four colour-coded platform signs at the Interchange",
  },
]

export const LINE_FRAMES: Frame[] = [
  {
    src: "/media/pathway/line-red.jpg",
    altVi: "Người trẻ bước xuống tàu Red Line vào khu văn phòng tập đoàn",
    altEn: "Young professionals stepping off the Red Line into the business district",
  },
  {
    src: "/media/pathway/line-blue.jpg",
    altVi: "Tàu Blue Line qua cầu đá tới thành phố đại học ở Anh",
    altEn: "The Blue Line crossing a stone bridge to a UK university city",
  },
  {
    src: "/media/pathway/line-purple.jpg",
    altVi: "Sinh viên kéo vali tới tàu Purple Line đi Singapore, Zurich, Seoul",
    altEn: "Students heading for the Purple Line to Singapore, Zurich and Seoul",
  },
  {
    src: "/media/pathway/line-green.jpg",
    altVi: "Tàu Green Line trên cao lúc hoàng hôn",
    altEn: "The Green Line elevated train at dusk",
  },
]

export const PROOF_FRAMES: Frame[] = [
  {
    src: ABOUT_MEDIA.dualDegree,
    altVi: "Song bằng Cao đẳng chính quy và Pearson",
    altEn: "College diploma and Pearson dual award",
  },
  {
    src: ABOUT_MEDIA.sunderlandStPeters,
    altVi: "Campus Sunderland",
    altEn: "Sunderland campus",
  },
  {
    src: ABOUT_MEDIA.sunderlandCityCampus,
    altVi: "Thành phố đại học Sunderland",
    altEn: "Sunderland city campus",
  },
]

export const PRACTICE_FRAMES: Frame[] = [
  {
    src: MEDIA.lab,
    altVi: "Phòng lab thực hành",
    altEn: "Practice lab",
  },
  {
    src: MEDIA.newsAnalytics,
    altVi: "Phân tích dữ liệu",
    altEn: "Data analysis in class",
  },
  {
    src: MEDIA.studentsCollab,
    altVi: "Làm việc nhóm",
    altEn: "Team project",
  },
  {
    src: MEDIA.library,
    altVi: "Hồ sơ học thuật",
    altEn: "Academic study",
  },
]

export const AWARD_FRAMES: Frame[] = [
  {
    src: ABOUT_MEDIA.sunderlandCitySpace,
    altVi: "Học tại Anh",
    altEn: "Studying in the UK",
  },
  {
    src: MEDIA.heroStudent,
    altVi: "Học tại Việt Nam",
    altEn: "Studying in Vietnam",
  },
]

export const REGION_FRAMES: Frame[] = [
  {
    src: ABOUT_MEDIA.sunderlandStPeters,
    altVi: "Vương quốc Anh",
    altEn: "United Kingdom",
  },
  {
    src: ABOUT_MEDIA.sunderlandFayre,
    altVi: "Đời sống sinh viên châu Âu",
    altEn: "Student life in Europe",
  },
  {
    src: MEDIA.international,
    altVi: "Bạn bè quốc tế",
    altEn: "International students",
  },
  {
    src: ABOUT_MEDIA.keiserCampus,
    altVi: "Keiser University, Mỹ",
    altEn: "Keiser University, USA",
  },
  {
    src: ABOUT_MEDIA.sunderlandCityCampus,
    altVi: "Campus quốc tế",
    altEn: "An international campus",
  },
]

export const FINALE_FRAME: Frame = {
  src: ABOUT_MEDIA.sunderlandGraduation,
  altVi: "Đích đến của hành trình: lễ tốt nghiệp",
  altEn: "The journey’s arrival: graduation day",
}

export const MAJOR_FRAMES: Frame[] = [
  {
    src: MEDIA.newsAnalytics,
    altVi: "Data Analytics",
    altEn: "Data Analytics",
  },
  {
    src: MEDIA.studentsStudy,
    altVi: "Business Management",
    altEn: "Business Management",
  },
]

export function frameAlt(frame: Frame, locale: Locale) {
  return locale === "en" ? frame.altEn : frame.altVi
}
