"use client"

import { useMemo, useState } from "react"
import {
  Check,
  Copy,
  Download,
  Gauge,
  Mic2,
  ShieldCheck,
  TimerReset,
  Trash2,
} from "lucide-react"

const READING_PRESETS = [
  { label: "Slow", value: 150 },
  { label: "Standard", value: 200 },
  { label: "Fast", value: 250 },
  { label: "Very fast", value: 300 },
]

function countWords(value) {
  return (
    value.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []
  ).length
}

function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return "0 sec"

  const rounded = Math.max(1, Math.round(seconds))
  const hours = Math.floor(rounded / 3600)
  const minutes = Math.floor((rounded % 3600) / 60)
  const secs = rounded % 60

  if (hours > 0) return `${hours} hr ${minutes} min`
  if (minutes > 0) {
    return secs > 0 ? `${minutes} min ${secs} sec` : `${minutes} min`
  }

  return `${secs} sec`
}

function StatCard({ label, value, note, accent = false }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent
          ? "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/30"
          : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/70"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p
        className={`mt-1 text-xl font-black md:text-2xl ${
          accent
            ? "text-cyan-700 dark:text-cyan-300"
            : "text-gray-950 dark:text-white"
        }`}
      >
        {value}
      </p>
      {note && <p className="mt-1 text-xs text-gray-400">{note}</p>}
    </div>
  )
}

export default function ReadingTimeTool() {
  const [text, setText] = useState("")
  const [readingWpm, setReadingWpm] = useState(200)
  const [speakingWpm, setSpeakingWpm] = useState(130)
  const [copied, setCopied] = useState(false)

  const words = useMemo(() => countWords(text), [text])

  const readingSeconds =
    words === 0 ? 0 : (words / Math.max(readingWpm, 1)) * 60

  const speakingSeconds =
    words === 0 ? 0 : (words / Math.max(speakingWpm, 1)) * 60

  const readingTime = formatDuration(readingSeconds)
  const speakingTime = formatDuration(speakingSeconds)

  const handleClear = () => {
    setText("")
    setCopied(false)
  }

  const handleCopyResult = async () => {
    if (!text) return

    const result = [
      `Reading time: ${readingTime}`,
      `Speaking time: ${speakingTime}`,
      `Words: ${words}`,
      `Reading speed: ${readingWpm} WPM`,
      `Speaking speed: ${speakingWpm} WPM`,
    ].join("\n")

    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const handleDownload = () => {
    if (!text) return

    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "reading-time-text.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section
      aria-label="Reading time calculator"
      className="mx-auto mb-12 max-w-6xl px-4 md:px-8"
    >
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-cyan-100/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 md:px-6 dark:border-gray-800 dark:bg-gray-900">
          <div>
            <p className="text-sm font-bold text-gray-950 dark:text-white">
              Reading Time Calculator
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Paste text, choose your reading speed, and get an instant estimate.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Runs in your browser
          </span>
        </div>

        <div className="p-4 md:p-6">
          <div
            aria-live="polite"
            className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-4 text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-100"
          >
            {text.trim() ? (
              <>
                <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  Estimated reading time
                </p>
                <p className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                  {readingTime}
                </p>
                <p className="mt-1 text-sm text-cyan-800/80 dark:text-cyan-200/80">
                  This text has <strong>{words.toLocaleString()} words</strong>{" "}
                  at <strong>{readingWpm} words per minute</strong>.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold">
                  How long will this text take to read?
                </p>
                <p className="mt-1 text-sm text-cyan-800/80 dark:text-cyan-200/80">
                  Paste your text below to get the reading time in minutes and
                  seconds.
                </p>
              </>
            )}
          </div>

          <div
            aria-live="polite"
            className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            <StatCard
              label="Reading time"
              value={readingTime}
              note={`${readingWpm} WPM`}
              accent
            />
            <StatCard
              label="Speaking time"
              value={speakingTime}
              note={`${speakingWpm} WPM`}
            />
            <StatCard
              label="Words"
              value={words.toLocaleString()}
              note="Detected in your text"
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <label
                htmlFor="reading-time-text"
                className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                Your text
              </label>

              <textarea
                id="reading-time-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste an article, essay, script, speech, or document here…"
                aria-label="Text to calculate reading time for"
                className="min-h-[360px] w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 p-4 text-base leading-7 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100/60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-900 dark:focus:ring-cyan-950/40"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyResult}
                  disabled={!text}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy result"}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!text}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-cyan-300 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                >
                  <Download className="h-4 w-4" />
                  Download text
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={!text}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-rose-300 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <h2 className="text-sm font-bold text-gray-950 dark:text-white">
                    Reading speed
                  </h2>
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Choose a preset or enter your own reading speed.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {READING_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setReadingWpm(preset.value)}
                      className={`rounded-xl border px-3 py-2 text-left transition ${
                        readingWpm === preset.value
                          ? "border-cyan-500 bg-cyan-50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200"
                          : "border-gray-200 bg-white text-gray-700 hover:border-cyan-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                      }`}
                    >
                      <span className="block text-xs font-semibold">
                        {preset.label}
                      </span>
                      <span className="block text-sm font-bold">
                        {preset.value} WPM
                      </span>
                    </button>
                  ))}
                </div>

                <label
                  htmlFor="reading-wpm"
                  className="mt-4 block text-xs font-semibold text-gray-600 dark:text-gray-300"
                >
                  Custom reading speed
                </label>

                <div className="mt-1 flex items-center gap-2">
                  <input
                    id="reading-wpm"
                    type="number"
                    min={50}
                    max={1000}
                    value={readingWpm}
                    onChange={(event) =>
                      setReadingWpm(
                        Math.min(
                          1000,
                          Math.max(50, Number(event.target.value) || 50)
                        )
                      )
                    }
                    className="w-28 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-950 outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    words/min
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <Mic2 className="h-4 w-4 text-amber-500" />
                  <h2 className="text-sm font-bold text-gray-950 dark:text-white">
                    Speaking time
                  </h2>
                </div>

                <p className="mt-2 text-2xl font-black text-gray-950 dark:text-white">
                  {speakingTime}
                </p>

                <label
                  htmlFor="speaking-wpm"
                  className="mt-3 block text-xs font-semibold text-gray-600 dark:text-gray-300"
                >
                  Speaking speed
                </label>

                <div className="mt-1 flex items-center gap-2">
                  <input
                    id="speaking-wpm"
                    type="number"
                    min={50}
                    max={400}
                    value={speakingWpm}
                    onChange={(event) =>
                      setSpeakingWpm(
                        Math.min(
                          400,
                          Math.max(50, Number(event.target.value) || 50)
                        )
                      )
                    }
                    className="w-28 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-950 outline-none focus:border-amber-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    words/min
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/70 p-4 text-xs leading-5 text-cyan-900 dark:border-cyan-800 dark:bg-cyan-950/20 dark:text-cyan-100">
                <div className="flex gap-2">
                  <TimerReset className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Reading time is an estimate. Change the WPM settings to
                    match your own reading or speaking pace.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-gray-400">
            Calculation: word count ÷ words per minute × 60 = estimated seconds.
          </p>
        </div>
      </div>
    </section>
  )
}