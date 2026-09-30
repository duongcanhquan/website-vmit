"use client"

import { FormEvent, useEffect, useState } from "react"
import { submitEnglishTest } from "@/app/english-test/actions"
import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { Button } from "@/components/ui/button"
import { TEST_MODULES, type ChoicePart, type ChoiceQuestion, type TestModuleId } from "@/lib/english-test/content"
import { cn } from "@/lib/utils"

type Stage = "gate" | "brief" | TestModuleId | "result"
type Profile = { name: string; email: string; phone: string }
type Scored = Awaited<ReturnType<typeof submitEnglishTest>>

const fieldClass =
  "h-12 w-full rounded-[3px] border border-border bg-white px-4 text-sm text-brand-navy outline-none focus:border-primary"

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

function ChoiceList({
  questions,
  startAt,
  choices,
  locked,
  onChoose,
}: {
  questions: readonly ChoiceQuestion[]
  startAt: number
  choices: Record<string, number>
  locked: boolean
  onChoose: (id: string, index: number) => void
}) {
  return (
    <ol className="mt-5 space-y-4">
      {questions.map((question, index) => (
        <li key={question.id}>
          <p className="text-sm font-semibold">
            {startAt + index}. {question.prompt}
          </p>
          <div className="mt-2 space-y-2">
            {question.options.map((option, optionIndex) => (
              <label key={option} className="flex items-start gap-2 text-sm">
                <input
                  type="radio"
                  name={question.id}
                  disabled={locked}
                  checked={choices[question.id] === optionIndex}
                  onChange={() => onChoose(question.id, optionIndex)}
                />
                <span>
                  {String.fromCharCode(65 + optionIndex)}. {option}
                </span>
              </label>
            ))}
          </div>
        </li>
      ))}
    </ol>
  )
}

function PartCard({
  part,
  choices,
  locked,
  plays,
  onPlay,
  onChoose,
}: {
  part: ChoicePart
  choices: Record<string, number>
  locked: boolean
  plays: number
  onPlay: () => void
  onChoose: (id: string, index: number) => void
}) {
  return (
    <article className="rounded-[3px] border border-border bg-white p-6">
      <h2 className="text-lg font-black">{part.title}</h2>
      <p className="mt-2 text-sm text-muted">{part.instruction}</p>
      {part.passage
        ? part.passage.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-3 whitespace-pre-line text-sm leading-relaxed">
              {paragraph}
            </p>
          ))
        : null}
      {part.script ? (
        <Button type="button" variant="outlineNavy" className="mt-4" disabled={locked || plays >= 2} onClick={onPlay}>
          {plays >= 2 ? "Both plays used" : `Play recording (${plays}/2)`}
        </Button>
      ) : null}
      <ChoiceList questions={part.questions} startAt={1} choices={choices} locked={locked} onChoose={onChoose} />
    </article>
  )
}

export function EnglishTestView({ settings }: { settings: Record<string, unknown> }) {
  const [stage, setStage] = useState<Stage>("gate")
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", phone: "" })
  const [plays, setPlays] = useState<Record<string, number>>({})
  const [choices, setChoices] = useState<Record<string, number>>({})
  const [seconds, setSeconds] = useState(0)
  const [clockFor, setClockFor] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<Scored | null>(null)

  const moduleIndex = TEST_MODULES.findIndex((item) => item.id === stage)
  const current = TEST_MODULES[moduleIndex]

  useEffect(() => {
    if (!current) return
    setSeconds(current.minutes * 60)
    setLocked(false)
    setClockFor(current.id)
  }, [current])

  useEffect(() => {
    if (!current || clockFor !== current.id || locked) return
    if (seconds <= 0) {
      setLocked(true)
      return
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [seconds, current, locked, clockFor])

  function onGate(event: FormEvent) {
    event.preventDefault()
    if (profile.name.trim().length < 2 || !profile.email.includes("@") || profile.phone.trim().length < 8) {
      setError("Enter your full name, a valid email address, and a phone number.")
      return
    }
    setError(null)
    setStage("brief")
  }

  function choose(id: string, index: number) {
    setChoices((currentChoices) => ({ ...currentChoices, [id]: index }))
  }

  function nextStage() {
    const next = TEST_MODULES[moduleIndex + 1]
    if (next) setStage(next.id)
    else void finish()
  }

  async function finish() {
    setSaving(true)
    setError(null)
    try {
      const scored = await submitEnglishTest({
        full_name: profile.name.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        choices,
      })
      setResult(scored)
      setStage("result")
    } catch (err) {
      setError(err instanceof Error ? err.message : "The result could not be saved. Please contact admissions.")
    } finally {
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
            Four multiple-choice modules, marked automatically on the IELTS Academic band scale from 0 to 9. This placement test is not an official IELTS certificate.
          </p>

          {current ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[3px] border border-border bg-white px-4 py-3">
              <ol className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                {TEST_MODULES.map((item, index) => (
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
                Enter your name, email and phone number to begin. Your band appears when you finish. Admissions emails the result after checking these details.
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
                {TEST_MODULES.map((item, index) => (
                  <li key={item.id}>
                    <strong>
                      {index + 1}. {item.label}
                    </strong>{" "}
                    — about {item.minutes} minutes, multiple choice
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-muted">Work in order. When the clock ends, that module locks. Listening recordings can be played twice.</p>
              <Button className="mt-6" size="lg" onClick={() => setStage("listening")}>
                Begin Listening
              </Button>
            </section>
          ) : null}

          {current ? (
            <section className="mt-8 space-y-6">
              {current.parts.map((part) => (
                <PartCard
                  key={part.id}
                  part={part}
                  choices={choices}
                  locked={locked}
                  plays={plays[part.id] ?? 0}
                  onPlay={() => {
                    if (!part.script) return
                    playScript(part.script)
                    setPlays((currentPlays) => ({ ...currentPlays, [part.id]: (currentPlays[part.id] ?? 0) + 1 }))
                  }}
                  onChoose={choose}
                />
              ))}
              {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
              <Button size="lg" disabled={saving} onClick={nextStage}>
                {saving ? "Saving your result…" : moduleIndex === TEST_MODULES.length - 1 ? "Submit and see your band" : `Continue to ${TEST_MODULES[moduleIndex + 1]?.label}`}
              </Button>
            </section>
          ) : null}

          {stage === "result" && result ? (
            <section className="mt-8 rounded-[3px] border border-border bg-white p-6 md:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">Your result</p>
              <p className="mt-2 text-5xl font-black text-brand-navy">{result.overall}</p>
              <p className="mt-1 text-lg font-semibold">Overall band · {result.level}</p>
              <p className="mt-3 text-sm text-muted">
                Admissions has your answers. They will email this result to {profile.email} after checking your name and phone number.
              </p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["Listening", `${result.listening} · ${result.listeningCorrect}/${result.listeningTotal}`],
                    ["Reading", `${result.reading} · ${result.readingCorrect}/${result.readingTotal}`],
                    ["Writing", `${result.writing} · ${result.writingCorrect}/${result.writingTotal}`],
                    ["Speaking", `${result.speaking} · ${result.speakingCorrect}/${result.speakingTotal}`],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="rounded-[3px] bg-mist px-4 py-3">
                    <dt className="text-xs font-bold uppercase tracking-wide text-muted">{label}</dt>
                    <dd className="mt-1 text-xl font-black">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Every question is multiple choice and marked automatically. Bands follow the IELTS 0–9 scale in half-band steps. An official IELTS result is awarded only by an IELTS test centre.
              </p>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
