import { ABOUT_MEDIA } from "@/constants/about-content"
import { MEDIA } from "@/constants/media"
import type { Locale } from "@/lib/i18n/types"

export type Frame = {
  src: string
  altVi: string
  altEn: string
}

export const STATION_FRAMES: Frame[] = [
  {
    src: ABOUT_MEDIA.journey,
    altVi: "Sinh viên VMIT bắt đầu lộ trình",
    altEn: "VMIT students at the start of the pathway",
  },
  {
    src: MEDIA.seminar,
    altVi: "Lớp tiếng Anh học thuật",
    altEn: "Academic English seminar",
  },
  {
    src: ABOUT_MEDIA.pitching,
    altVi: "Sinh viên thuyết trình dự án",
    altEn: "Students pitching a live project",
  },
  {
    src: ABOUT_MEDIA.sunderlandLibrary,
    altVi: "Thư viện Đại học Sunderland",
    altEn: "University of Sunderland library",
  },
  {
    src: ABOUT_MEDIA.sunderlandGraduation,
    altVi: "Lễ tốt nghiệp Đại học Sunderland",
    altEn: "University of Sunderland graduation",
  },
]

export const LINE_FRAMES: Frame[] = [
  {
    src: MEDIA.newsCareer,
    altVi: "Sinh viên sẵn sàng đi làm",
    altEn: "Graduates ready for work",
  },
  {
    src: ABOUT_MEDIA.london,
    altVi: "London, điểm đến năm cuối tại Anh",
    altEn: "London, the final-year destination in the UK",
  },
  {
    src: ABOUT_MEDIA.keiserCampus,
    altVi: "Khuôn viên Keiser University",
    altEn: "Keiser University campus",
  },
  {
    src: MEDIA.campusFacility,
    altVi: "Học năm cuối ngay tại Việt Nam",
    altEn: "The final year, studied in Vietnam",
  },
]

export const PROOF_FRAMES: Frame[] = [
  {
    src: ABOUT_MEDIA.dualDegree,
    altVi: "Song bằng APC và Pearson",
    altEn: "APC and Pearson dual award",
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
