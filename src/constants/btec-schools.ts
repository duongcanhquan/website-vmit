export type BtecSchool = {
  region_vi: string
  region_en: string
  name: string
  detail_vi: string
  detail_en: string
  url: string
  logo: string
}

/** Curated from the published pathway network. Admin can replace this list. */
const DEFAULT_ROWS: Omit<BtecSchool, "logo">[] = [
  { region_vi: "Vương quốc Anh", region_en: "United Kingdom", name: "University of Sunderland", detail_vi: "Sunderland và London · đúng một năm cuối", detail_en: "Sunderland and London · just one final year", url: "https://www.sunderland.ac.uk" },
  { region_vi: "Vương quốc Anh", region_en: "United Kingdom", name: "University of Huddersfield", detail_vi: "Công nhận HND Level 5 vào năm cuối", detail_en: "Recognises HND Level 5 for final-year entry", url: "" },
  { region_vi: "Vương quốc Anh", region_en: "United Kingdom", name: "Middlesex University", detail_vi: "Công nhận HND Level 5 vào năm cuối", detail_en: "Recognises HND Level 5 for final-year entry", url: "" },
  { region_vi: "Vương quốc Anh", region_en: "United Kingdom", name: "University of Greenwich", detail_vi: "Công nhận HND Level 5 vào năm cuối", detail_en: "Recognises HND Level 5 for final-year entry", url: "" },
  { region_vi: "Vương quốc Anh", region_en: "United Kingdom", name: "Oxford Brookes University", detail_vi: "Công nhận HND Level 5 vào năm cuối", detail_en: "Recognises HND Level 5 for final-year entry", url: "" },
  { region_vi: "Vương quốc Anh", region_en: "United Kingdom", name: "University of Northampton", detail_vi: "Công nhận HND Level 5 vào năm cuối", detail_en: "Recognises HND Level 5 for final-year entry", url: "" },
  { region_vi: "Châu Âu", region_en: "Europe", name: "SHMS", detail_vi: "Thụy Sĩ · thực tập hưởng lương", detail_en: "Switzerland · paid internship", url: "" },
  { region_vi: "Châu Âu", region_en: "Europe", name: "César Ritz Colleges", detail_vi: "Thụy Sĩ", detail_en: "Switzerland", url: "" },
  { region_vi: "Châu Âu", region_en: "Europe", name: "Hotel Institute Montreux", detail_vi: "Thụy Sĩ", detail_en: "Switzerland", url: "" },
  { region_vi: "Châu Âu", region_en: "Europe", name: "Griffith College", detail_vi: "Ireland", detail_en: "Ireland", url: "" },
  { region_vi: "Châu Âu", region_en: "Europe", name: "National College of Ireland", detail_vi: "Ireland", detail_en: "Ireland", url: "" },
  { region_vi: "Châu Âu", region_en: "Europe", name: "HAMK", detail_vi: "Phần Lan", detail_en: "Finland", url: "" },
  { region_vi: "Châu Âu", region_en: "Europe", name: "The Hague University of Applied Sciences", detail_vi: "Hà Lan", detail_en: "The Netherlands", url: "" },
  { region_vi: "Châu Á", region_en: "Asia", name: "SIM", detail_vi: "Singapore · bằng Anh hoặc Úc", detail_en: "Singapore · UK or Australian degree", url: "" },
  { region_vi: "Châu Á", region_en: "Asia", name: "PSB Academy", detail_vi: "Singapore", detail_en: "Singapore", url: "" },
  { region_vi: "Châu Á", region_en: "Asia", name: "Kaplan Singapore", detail_vi: "Singapore", detail_en: "Singapore", url: "" },
  { region_vi: "Châu Á", region_en: "Asia", name: "Chosun University", detail_vi: "Hàn Quốc · lộ trình 2+2", detail_en: "South Korea · 2+2 pathway", url: "" },
  { region_vi: "Châu Á", region_en: "Asia", name: "SolBridge", detail_vi: "Hàn Quốc", detail_en: "South Korea", url: "" },
  { region_vi: "Châu Á", region_en: "Asia", name: "Sunway University", detail_vi: "Malaysia", detail_en: "Malaysia", url: "" },
  { region_vi: "Châu Á", region_en: "Asia", name: "Taylor's University", detail_vi: "Malaysia", detail_en: "Malaysia", url: "" },
  { region_vi: "Bắc Mỹ", region_en: "North America", name: "Keiser University", detail_vi: "Mỹ · học bổng nội bộ 30%", detail_en: "USA · 30% internal scholarship", url: "https://www.keiseruniversity.edu" },
  { region_vi: "Bắc Mỹ", region_en: "North America", name: "Troy University", detail_vi: "Mỹ · công nhận năm 1 và năm 2", detail_en: "USA · recognises years 1 and 2", url: "" },
  { region_vi: "Bắc Mỹ", region_en: "North America", name: "Thompson Rivers University", detail_vi: "Canada", detail_en: "Canada", url: "" },
  { region_vi: "Bắc Mỹ", region_en: "North America", name: "George Brown College", detail_vi: "Canada", detail_en: "Canada", url: "" },
  { region_vi: "Châu Đại Dương", region_en: "Oceania", name: "Macquarie University", detail_vi: "Úc · post-study visa 2–4 năm", detail_en: "Australia · 2–4-year post-study visa", url: "" },
  { region_vi: "Châu Đại Dương", region_en: "Oceania", name: "Deakin University", detail_vi: "Úc", detail_en: "Australia", url: "" },
  { region_vi: "Châu Đại Dương", region_en: "Oceania", name: "Griffith University", detail_vi: "Úc", detail_en: "Australia", url: "" },
  { region_vi: "Châu Đại Dương", region_en: "Oceania", name: "University of Waikato", detail_vi: "New Zealand", detail_en: "New Zealand", url: "" },
  { region_vi: "Châu Đại Dương", region_en: "Oceania", name: "Otago Polytechnic", detail_vi: "New Zealand", detail_en: "New Zealand", url: "" },
]

const SCHOOL_LOGOS: Record<string, string> = {
  "university of sunderland": "sunderland",
  "university of huddersfield": "huddersfield",
  "middlesex university": "middlesex",
  "university of greenwich": "greenwich",
  "oxford brookes university": "oxford-brookes",
  "university of northampton": "northampton",
  shms: "shms",
  "césar ritz colleges": "cesar-ritz",
  "hotel institute montreux": "hotel-institute-montreux",
  "griffith college": "griffith-college",
  "national college of ireland": "nci",
  hamk: "hamk",
  "the hague university of applied sciences": "hague",
  sim: "sim",
  "psb academy": "psb",
  "kaplan singapore": "kaplan-singapore",
  "chosun university": "chosun",
  solbridge: "solbridge",
  "sunway university": "sunway",
  "taylor's university": "taylors",
  "keiser university": "keiser",
  "troy university": "troy",
  "thompson rivers university": "thompson-rivers",
  "george brown college": "george-brown",
  "macquarie university": "macquarie",
  "deakin university": "deakin",
  "griffith university": "griffith",
  "university of waikato": "waikato",
  "otago polytechnic": "otago-polytechnic",
}

/** Bundled transparent logo for a known partner, matched by name. */
export function defaultSchoolLogo(name: string) {
  const slug = SCHOOL_LOGOS[name.trim().toLowerCase()]
  return slug ? `/media/schools/${slug}.png` : ""
}

export const DEFAULT_BTEC_SCHOOLS: BtecSchool[] = DEFAULT_ROWS.map((row) => ({ ...row, logo: defaultSchoolLogo(row.name) }))

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

/** null means the setting has not been saved yet, so the page uses the default list. */
export function parseBtecSchools(value: unknown): BtecSchool[] | null {
  if (!Array.isArray(value)) return null
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return []
    const row = item as Record<string, unknown>
    const name = text(row.name)
    if (!name) return []
    return [
      {
        region_vi: text(row.region_vi) || "Khác",
        region_en: text(row.region_en) || "Other",
        name,
        detail_vi: text(row.detail_vi),
        detail_en: text(row.detail_en),
        url: text(row.url),
        logo: text(row.logo) || defaultSchoolLogo(name),
      },
    ]
  })
}
