export type Locale = "vi" | "en"

export type MessageTree = {
  nav: {
    about: string
    programs: string
    pathway: string
    subjects: string
    btecSchools: string
    englishTest: string
    news: string
    tuition: string
    studentLife: string
    apply: string
  }
  hero: {
    slogan: string
    headline: string
    support: string
    ctaExplore: string
    ctaScholarship: string
    ctaApply: string
  }
  trust: {
    label: string
  }
  pillars: {
    eyebrow: string
    title: string
    counters: readonly { value: string; label: string }[]
    items: readonly {
      id: string
      eyebrow: string
      title: string
      description: string
      featured?: boolean
      chips?: readonly string[]
    }[]
  }
  programs: {
    eyebrow: string
    title: string
    lead: string
    view: string
    items: readonly { title: string; description: string }[]
  }
  pathway: {
    eyebrow: string
    title: string
    lead: string
    cta: string
    steps: readonly { step: string; title: string; note: string }[]
  }
  tuition: {
    eyebrow: string
    title: string
    leadBefore: string
    leadAfter: string
    cta: string
  }
  life: {
    eyebrow: string
    title: string
    lead: string
  }
  apply: {
    eyebrow: string
    title: string
    lead: string
    cta: string
  }
  scholarship: {
    eyebrow: string
    title: string
    lead: string
    name: string
    phone: string
    email: string
    submit: string
    success: string
  }
  footer: {
    nav: string
    contact: string
    rights: string
  }
  common: {
    hotline: string
    close: string
    menu: string
  }
}
