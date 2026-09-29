const LINKERS = [
  "however",
  "therefore",
  "although",
  "because",
  "for example",
  "in addition",
  "on the other hand",
  "as a result",
  "while",
  "whereas",
  "firstly",
  "finally",
  "in contrast",
  "moreover",
]

const OBJECTIVE = [1, 2.5, 3.5, 4, 4.5, 5, 5.5, 6.5, 7, 8, 8.5]

export function roundBand(value: number) {
  return Math.round(Math.min(9, Math.max(0, value)) * 2) / 2
}

export function objectiveBand(correct: number, total: number) {
  const scaled = Math.round((correct / Math.max(total, 1)) * 10)
  return OBJECTIVE[Math.min(10, Math.max(0, scaled))]
}

export function cefr(band: number) {
  if (band < 4) return "Below A2"
  if (band < 5) return "A2"
  if (band < 6) return "B1"
  if (band < 7) return "B2"
  if (band < 8) return "C1"
  return "C2"
}

function wordsOf(text: string) {
  return text.trim().split(/\s+/).filter(Boolean)
}

function productionBand(text: string, targetWords: number, paragraphTarget: number) {
  const words = wordsOf(text)
  if (words.length < 12) return 2
  const lower = text.toLowerCase()
  const unique = new Set(words.map((word) => word.toLowerCase().replace(/[^a-z]/g, "")).filter((word) => word.length > 2))
  const variety = unique.size / words.length
  const linkers = LINKERS.filter((item) => lower.includes(item)).length
  const paragraphs = text.split(/\n\s*\n/).filter((part) => part.trim()).length
  const sentences = text.split(/[.!?]+/).filter((part) => part.trim().split(/\s+/).length >= 4).length
  let score = 3
  const ratio = words.length / targetWords
  if (ratio >= 0.45) score += 0.5
  if (ratio >= 0.75) score += 0.5
  if (ratio >= 1) score += 0.5
  if (variety >= 0.42) score += 0.5
  if (variety >= 0.55) score += 0.5
  if (linkers >= 2) score += 0.5
  if (linkers >= 4) score += 0.5
  if (paragraphs >= paragraphTarget) score += 0.5
  if (sentences >= Math.max(3, paragraphTarget * 2)) score += 0.5
  return roundBand(Math.min(8, score))
}

export function scoreWriting(task1: string, task2: string) {
  const taskOne = productionBand(task1, 150, 2)
  const taskTwo = productionBand(task2, 250, 4)
  return roundBand((taskOne + taskTwo * 2) / 3)
}

export function scoreSpeaking(parts: string[]) {
  const joined = parts.map((part) => part.trim()).filter(Boolean).join("\n\n")
  return productionBand(joined, 180, 3)
}

export function normaliseAnswer(value: string) {
  return value.toLowerCase().replace(/£/g, "").replace(/[^a-z0-9]/g, "")
}

export function answerMatches(input: string, accepted: string[]) {
  const value = normaliseAnswer(input)
  if (!value) return false
  return accepted.some((item) => normaliseAnswer(item) === value)
}
