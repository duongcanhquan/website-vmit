"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { submitEnglishTest } from "@/app/english-test/actions"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { Button } from "@/components/ui/button"
import { LISTENING_PARTS, MODULES, READING, SPEAKING, WRITING, type ChoiceQuestion, type GapQuestion } from "@/lib/english-test/content"
import { answerMatches, cefr, objectiveBand, roundBand, scoreSpeaking, scoreWriting } from "@/lib/english-test/score"
import { cn } from "@/lib/utils"

type Stage = "gate" | "brief" | "listening" | "reading" | "writing" | "speaking" | "result"
type Profile = { name: string; email: string; phone: string }

const fieldClass =
  "h-12 w-full rounded-[3px] border border-border bg-white px-4 text-sm text-brand-navy outline-none focus:border-primary"

function isGap(question: GapQuestion | ChoiceQuestion): question is GapQuestion {
  return "accept" in question
}

function playScript(script: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  script
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const utterance = new SpeechSynthesisUtterance(line.replace(/^[A-Za-z ]+:\s*/, ""))
      utterance.lang = "en-GB"
      utterance.rate = 0.94
      utterance.pitch = /officer|tutor/i.test(line) ? 0.86 : 1.08
      window.speechSynthesis.speak(utterance)
    })
}

function formatClock(total: number) {
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

export function EnglishTestView({ settings }: { settings: Record<string, unknown> }) {
  const [stage, setStage] = useState<Stage>("gate")
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", phone: "" })
  const [plays, setPlays] = useState<Record<string, number>>({})
  const [gaps, setGaps] = useState<Record<string, string>>({})
  const [choices, setChoices] = useState<Record<string, number>>({})
  const [tfng, setTfng] = useState<Record<string, string>>({})
  const [task1, setTask1] = useState("")
  const [task2, setTask2] = useState("")
  const [spoken, setSpoken] = useState<Record<string, string>>({})
  const [seconds, setSeconds] = useState(0)
  const [locked, setLocked] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [mailNote, setMailNote] = useState("")
  const [result, setResult] = useState<{
    listening: number
    reading: number
    writing: number
    speaking: number
    overall: number
    level: string
    listeningCorrect: number
    readingCorrect: number
  } | null>(null)

  const moduleIndex = MODULES.findIndex((item) => item.id === stage)

  useEffect(() => {
    const current = MODULES.find((item) => item.id === stage)
    if (!current) return
    setSeconds(current.minutes * 60)
    setLocked(false)
  }, [stage])

  useEffect(() => {
    if (moduleIndex < 0 || locked) return
    if (seconds <= 0) {
      setLocked(true)
      return
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [seconds, moduleIndex, locked])

  const listeningCorrect = useMemo(() => {
    let correct = 0
    for (const part of LISTENING_PARTS) {
      for (const question of part.questions) {
        if (isGap(question)) {
          if (answerMatches(gaps[question.id] ?? "", question.accept)) correct += 1
        } else if (choices[question.id] === question.answer) correct += 1
      }
    }
    return correct
  }, [gaps, choices])

  const readingCorrect = useMemo(() => {
    let correct = 0
    for (const question of READING.passageOne.questions) {
      if (tfng[question.id] === question.answer) correct += 1
    }
    for (const question of READING.passageTwo.choices) {
      if (choices[question.id] === question.answer) correct += 1
    }
    for (const question of READING.passageTwo.gaps) {
      if (answerMatches(gaps[question.id] ?? "", question.accept)) correct += 1
    }
    return correct
  }, [tfng, choices, gaps])

  function onGate(event: FormEvent) {
    event.preventDefault()
    if (profile.name.trim().length < 2 || !profile.email.includes("@") || profile.phone.trim().length < 8) {
      setError("Enter your full name, a valid email address, and a phone number.")
      return
    }
    setError(null)
    setStage("brief")
  }

  async function finish() {
    const listening = objectiveBand(listeningCorrect, 10)
    const reading = objectiveBand(readingCorrect, 10)
    const writing = scoreWriting(task1, task2)
    const speaking = scoreSpeaking(SPEAKING.map((part) => spoken[part.id] ?? ""))
    const overall = roundBand((listening + reading + writing + speaking) / 4)
    const level = cefr(overall)
    const summary = [
      `VMIT IELTS Academic placement test`,
      `Candidate: ${profile.name}`,
      `Email: ${profile.email}`,
      `Phone: ${profile.phone}`,
      ``,
      `Overall band: ${overall} (${level})`,
      `Listening: ${listening} (${listeningCorrect}/10)`,
      `Reading: ${reading} (${readingCorrect}/10)`,
      `Writing: ${writing}`,
      `Speaking: ${speaking}`,
      ``,
      `This is an indicative placement band modelled on the IELTS Academic 0–9 scale. It is not an official IELTS certificate.`,
      ``,
      `Writing Task 1`,
      task1.trim() || "(no answer)",
      ``,
      `Writing Task 2`,
      task2.trim() || "(no answer)",
      ``,
      `Speaking`,
      SPEAKING.map((part) => `${part.title}\n${spoken[part.id]?.trim() || "(no answer)"}`).join("\n\n"),
    ].join("\n")

    const scored = { listening, reading, writing, speaking, overall, level, listeningCorrect, readingCorrect }
    setSaving(true)
    setError(null)
    try {
      const saved = await submitEnglishTest({
        full_name: profile.name.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        listening_band: listening,
        reading_band: reading,
        writing_band: writing,
        speaking_band: speaking,
        overall_band: overall,
        cefr: level,
        listening_correct: listeningCorrect,
        reading_correct: readingCorrect,
        writing_task1: task1.trim(),
        writing_task2: task2.trim(),
        speaking: SPEAKING.map((part) => `${part.title}\n${spoken[part.id]?.trim() || ""}`).join("\n\n"),
        summary,
      })
      setMailNote(
        saved.mail === "sent"
          ? `A copy of this result has been sent to ${profile.email}.`
          : `Your result is saved. A copy will be sent to ${profile.email} once VMIT mail delivery is switched on.`,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "The result could not be saved. Please contact admissions.")
      setMailNote("Your band is shown below. It could not be saved just now — please contact admissions and keep this page.")
    } finally {
      setResult(scored)
      setStage("result")
      setSaving(false)
    }
  }

  return (
    <>
      <SiteHeader settings={settings} overHero={false} />
      <main className="bg-mist pt-28 text-brand-navy md:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-20">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">VMIT English placement</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">IELTS Academic placement test</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Four modules, in English, using the IELTS Academic band scale from 0 to 9. This placement test is not an official IELTS certificate.
          </p>

          {moduleIndex >= 0 ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[3px] border border-border bg-white px-4 py-3">
              <ol className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                {MODULES.map((item, index) => (
                  <li key={item.id} className={cn("rounded-[3px] px-2 py-1", index === moduleIndex ? "bg-primary text-white" : "bg-mist text-muted")}>
                    {item.label}
                  </li>
                ))}
              </ol>
              <p className={cn("font-mono text-lg font-bold", seconds < 60 ? "text-red-700" : "text-brand-navy")}>{formatClock(seconds)}</p>
            </div>
          ) : null}

          {stage === "gate" ? (
            <form onSubmit={onGate} className="mt-8 space-y-4 rounded-[3px] border border-border bg-white p-6 md:p-8">
              <h2 className="text-xl font-black">Candidate details</h2>
              <p className="text-sm leading-relaxed text-muted">
                Enter your name, email and phone number to begin. Your result will be sent to your email.
              </p>
              <label className="block text-sm font-semibold">
                Full name
                <input required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className={cn(fieldClass, "mt-1")} />
              </label>
              <label className="block text-sm font-semibold">
                Email
                <input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className={cn(fieldClass, "mt-1")} />
              </label>
              <label className="block text-sm font-semibold">
                Phone
                <input required inputMode="tel" value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className={cn(fieldClass, "mt-1")} />
              </label>
              {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
              <Button type="submit" size="lg">Start the test</Button>
            </form>
          ) : null}

          {stage === "brief" ? (
            <section className="mt-8 rounded-[3px] border border-border bg-white p-6 md:p-8">
              <h2 className="text-xl font-black">Test route</h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed">
                {MODULES.map((item, index) => (
                  <li key={item.id}>
                    <strong>{index + 1}. {item.label}</strong> — about {item.minutes} minutes
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-muted">Work in order. When the clock ends, that module locks. Listening recordings can be played twice.</p>
              <Button className="mt-6" size="lg" onClick={() => setStage("listening")}>Begin Listening</Button>
            </section>
          ) : null}

          {stage === "listening" ? (
            <section className="mt-8 space-y-6">
              {LISTENING_PARTS.map((part) => (
                <article key={part.id} className="rounded-[3px] border border-border bg-white p-6">
                  <h2 className="text-lg font-black">{part.title}</h2>
                  <p className="mt-2 text-sm text-muted">{part.instruction}</p>
                  <Button
                    type="button"
                    variant="outlineNavy"
                    className="mt-4"
                    disabled={locked || (plays[part.id] ?? 0) >= 2}
                    onClick={() => {
                      playScript(part.script)
                      setPlays((current) => ({ ...current, [part.id]: (current[part.id] ?? 0) + 1 }))
                    }}
                  >
                    {(plays[part.id] ?? 0) >= 2 ? "Both plays used" : `Play recording (${plays[part.id] ?? 0}/2)`}
                  </Button>
                  <ol className="mt-5 space-y-4">
                    {part.questions.map((question, index) => (
                      <li key={question.id}>
                        <p className="text-sm font-semibold">{index + 1}. {question.prompt}</p>
                        {isGap(question) ? (
                          <input
                            disabled={locked}
                            value={gaps[question.id] ?? ""}
                            onChange={(event) => setGaps({ ...gaps, [question.id]: event.target.value })}
                            className={cn(fieldClass, "mt-2")}
                          />
                        ) : (
                          <div className="mt-2 space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <label key={option} className="flex items-start gap-2 text-sm">
                                <input
                                  type="radio"
                                  name={question.id}
                                  disabled={locked}
                                  checked={choices[question.id] === optionIndex}
                                  onChange={() => setChoices({ ...choices, [question.id]: optionIndex })}
                                />
                                <span>{String.fromCharCode(65 + optionIndex)}. {option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
              <Button size="lg" onClick={() => setStage("reading")}>Continue to Reading</Button>
            </section>
          ) : null}

          {stage === "reading" ? (
            <section className="mt-8 space-y-6">
              <article className="rounded-[3px] border border-border bg-white p-6">
                <h2 className="text-lg font-black">{READING.passageOne.title}</h2>
                {READING.passageOne.text.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mt-3 text-sm leading-relaxed">{paragraph}</p>
                ))}
                <p className="mt-5 text-sm font-bold">Do the following statements agree with the passage? Write TRUE, FALSE or NOT GIVEN.</p>
                <ol className="mt-3 space-y-4">
                  {READING.passageOne.questions.map((question, index) => (
                    <li key={question.id}>
                      <p className="text-sm">{index + 1}. {question.statement}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm">
                        {(["TRUE", "FALSE", "NOT GIVEN"] as const).map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input type="radio" name={question.id} disabled={locked} checked={tfng[question.id] === option} onChange={() => setTfng({ ...tfng, [question.id]: option })} />
                            {option}
                          </label>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
              <article className="rounded-[3px] border border-border bg-white p-6">
                <h2 className="text-lg font-black">{READING.passageTwo.title}</h2>
                {READING.passageTwo.text.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mt-3 text-sm leading-relaxed">{paragraph}</p>
                ))}
                <ol className="mt-5 space-y-4">
                  {READING.passageTwo.choices.map((question, index) => (
                    <li key={question.id}>
                      <p className="text-sm font-semibold">{index + 6}. {question.prompt}</p>
                      <div className="mt-2 space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={option} className="flex items-start gap-2 text-sm">
                            <input type="radio" name={question.id} disabled={locked} checked={choices[question.id] === optionIndex} onChange={() => setChoices({ ...choices, [question.id]: optionIndex })} />
                            <span>{String.fromCharCode(65 + optionIndex)}. {option}</span>
                          </label>
                        ))}
                      </div>
                    </li>
                  ))}
                  {READING.passageTwo.gaps.map((question, index) => (
                    <li key={question.id}>
                      <p className="text-sm font-semibold">{index + 9}. Complete the sentence with ONE WORD.</p>
                      <p className="mt-1 text-sm">{question.prompt}</p>
                      <input disabled={locked} value={gaps[question.id] ?? ""} onChange={(event) => setGaps({ ...gaps, [question.id]: event.target.value })} className={cn(fieldClass, "mt-2")} />
                    </li>
                  ))}
                </ol>
              </article>
              <Button size="lg" onClick={() => setStage("writing")}>Continue to Writing</Button>
            </section>
          ) : null}

          {stage === "writing" ? (
            <section className="mt-8 space-y-6">
              {[WRITING.task1, WRITING.task2].map((task) => (
                <article key={task.title} className="rounded-[3px] border border-border bg-white p-6">
                  <h2 className="text-lg font-black">{task.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed">{task.prompt}</p>
                  {"table" in task ? (
                    <table className="mt-4 w-full border-collapse text-sm">
                      <tbody>
                        {task.table.map((row, rowIndex) => (
                          <tr key={row.join("-")} className={rowIndex === 0 ? "bg-mist font-bold" : ""}>
                            {row.map((cell) => (
                              <td key={cell} className="border border-border px-3 py-2">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                  <textarea
                    disabled={locked}
                    value={task.title.endsWith("1") ? task1 : task2}
                    onChange={(event) => (task.title.endsWith("1") ? setTask1(event.target.value) : setTask2(event.target.value))}
                    rows={task.title.endsWith("1") ? 8 : 12}
                    className="mt-4 w-full rounded-[3px] border border-border p-3 text-sm outline-none focus:border-primary"
                  />
                  <p className="mt-2 text-xs text-muted">
                    {(task.title.endsWith("1") ? task1 : task2).trim().split(/\s+/).filter(Boolean).length} words
                  </p>
                </article>
              ))}
              <Button size="lg" onClick={() => setStage("speaking")}>Continue to Speaking</Button>
            </section>
          ) : null}

          {stage === "speaking" ? (
            <section className="mt-8 space-y-6">
              <p className="text-sm text-muted">Type the answers you would say aloud. Write in full sentences.</p>
              {SPEAKING.map((part) => (
                <article key={part.id} className="rounded-[3px] border border-border bg-white p-6">
                  <h2 className="text-lg font-black">{part.title}</h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{part.prompt}</p>
                  <textarea
                    disabled={locked}
                    value={spoken[part.id] ?? ""}
                    onChange={(event) => setSpoken({ ...spoken, [part.id]: event.target.value })}
                    rows={part.id === "s2" ? 8 : 6}
                    className="mt-4 w-full rounded-[3px] border border-border p-3 text-sm outline-none focus:border-primary"
                  />
                </article>
              ))}
              {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
              <Button size="lg" disabled={saving} onClick={() => void finish()}>
                {saving ? "Saving your result…" : "Submit and see your band"}
              </Button>
            </section>
          ) : null}

          {stage === "result" && result ? (
            <section className="mt-8 rounded-[3px] border border-border bg-white p-6 md:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">Indicative result</p>
              <p className="mt-2 text-5xl font-black text-brand-navy">{result.overall}</p>
              <p className="mt-1 text-lg font-semibold">Overall band · {result.level}</p>
              <p className="mt-3 text-sm text-muted">{mailNote}</p>
              {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Listening", `${result.listening} · ${result.listeningCorrect}/10`],
                  ["Reading", `${result.reading} · ${result.readingCorrect}/10`],
                  ["Writing", String(result.writing)],
                  ["Speaking", String(result.speaking)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[3px] bg-mist px-4 py-3">
                    <dt className="text-xs font-bold uppercase tracking-wide text-muted">{label}</dt>
                    <dd className="mt-1 text-xl font-black">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Bands follow the IELTS 0–9 scale in half-band steps. Listening and Reading are marked from your answers. Writing and Speaking are indicative bands from length, organisation and range. An official IELTS result is awarded only by an IELTS test centre.
              </p>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
