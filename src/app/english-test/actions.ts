"use server"

import { LISTENING_PARTS, READING_PARTS, SPEAKING_PARTS, WRITING_PARTS, questionsIn, type ChoiceQuestion } from "@/lib/english-test/content"
import { cefr, countCorrect, objectiveBand, roundBand } from "@/lib/english-test/score"
import { saveEnglishTest } from "@/lib/leads"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function letter(index: number) {
  return String.fromCharCode(65 + index)
}

function linesFor(title: string, questions: readonly ChoiceQuestion[], choices: Record<string, number>) {
  const rows = questions.map((question, index) => {
    const picked = choices[question.id]
    const chosen = picked === undefined ? "—" : `${letter(picked)}. ${question.options[picked] ?? ""}`
    const mark = picked === question.answer ? "đúng" : "sai"
    return `${index + 1}. ${question.prompt}\n   Chọn: ${chosen} · ${mark}`
  })
  return [title, ...rows].join("\n")
}

export async function submitEnglishTest(input: {
  full_name: string
  email: string
  phone: string
  choices: Record<string, number>
}) {
  const fullName = input.full_name.trim()
  const email = input.email.trim().toLowerCase()
  const phone = input.phone.trim()
  if (fullName.length < 2 || !EMAIL.test(email) || phone.length < 8) {
    throw new Error("Enter your full name, a valid email address, and a phone number.")
  }

  const choices: Record<string, number> = {}
  for (const [key, value] of Object.entries(input.choices)) {
    if (typeof value === "number" && Number.isInteger(value) && value >= 0 && value < 8) choices[key] = value
  }

  const listeningQuestions = questionsIn(LISTENING_PARTS)
  const readingQuestions = questionsIn(READING_PARTS)
  const writingQuestions = questionsIn(WRITING_PARTS)
  const speakingQuestions = questionsIn(SPEAKING_PARTS)
  const listeningCorrect = countCorrect(listeningQuestions, choices)
  const readingCorrect = countCorrect(readingQuestions, choices)
  const writingCorrect = countCorrect(writingQuestions, choices)
  const speakingCorrect = countCorrect(speakingQuestions, choices)
  const listening = objectiveBand(listeningCorrect, listeningQuestions.length)
  const reading = objectiveBand(readingCorrect, readingQuestions.length)
  const writing = objectiveBand(writingCorrect, writingQuestions.length)
  const speaking = objectiveBand(speakingCorrect, speakingQuestions.length)
  const overall = roundBand((listening + reading + writing + speaking) / 4)
  const level = cefr(overall)
  const summary = [
    "VMIT IELTS Academic placement test",
    `Candidate: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    `Overall band: ${overall} (${level})`,
    `Listening: ${listening} (${listeningCorrect}/${listeningQuestions.length})`,
    `Reading: ${reading} (${readingCorrect}/${readingQuestions.length})`,
    `Writing: ${writing} (${writingCorrect}/${writingQuestions.length})`,
    `Speaking: ${speaking} (${speakingCorrect}/${speakingQuestions.length})`,
    "",
    "This is an indicative placement band modelled on the IELTS Academic 0–9 scale. It is not an official IELTS certificate.",
    "",
    linesFor("Listening", listeningQuestions, choices),
    "",
    linesFor("Reading", readingQuestions, choices),
    "",
    linesFor("Writing", writingQuestions, choices),
    "",
    linesFor("Speaking", speakingQuestions, choices),
  ].join("\n")

  await saveEnglishTest({
    full_name: fullName,
    email,
    phone,
    listening_band: listening,
    reading_band: reading,
    writing_band: writing,
    speaking_band: speaking,
    overall_band: overall,
    cefr: level,
    listening_correct: listeningCorrect,
    reading_correct: readingCorrect,
    writing_correct: writingCorrect,
    speaking_correct: speakingCorrect,
    listening_total: listeningQuestions.length,
    reading_total: readingQuestions.length,
    writing_total: writingQuestions.length,
    speaking_total: speakingQuestions.length,
    summary,
  })

  return {
    listening,
    reading,
    writing,
    speaking,
    overall,
    level,
    listeningCorrect,
    readingCorrect,
    writingCorrect,
    speakingCorrect,
    listeningTotal: listeningQuestions.length,
    readingTotal: readingQuestions.length,
    writingTotal: writingQuestions.length,
    speakingTotal: speakingQuestions.length,
  }
}
