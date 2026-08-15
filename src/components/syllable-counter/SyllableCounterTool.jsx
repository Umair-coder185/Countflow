


"use client"

import { useMemo, useState } from "react"
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  Music2,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react"
import { analyzeText } from "@/lib/syllables"

const POEM_PATTERNS = [
  { id: "haiku", label: "Haiku", pattern: [5, 7, 5] },
  { id: "tanka", label: "Tanka", pattern: [5, 7, 5, 7, 7] },
  { id: "cinquain", label: "Cinquain", pattern: [2, 4, 6, 8, 2] },
  { id: "fibonacci", label: "Fibonacci", pattern: [1, 1, 2, 3, 5, 8] },
  { id: "custom", label: "Custom pattern", pattern: null },
]

const parseCustomPattern = (input) =>
  input
    .split(",")
    .map((n) => parseInt(n.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0 && n <= 20)
    .slice(0, 12)

function wrapCanvasText(ctx, text, maxWidth) {
  const words = text.split(" ")
  const lines = []
  let current = ""

  for (const word of words) {
    const test = current ? `${current} ${word}` : word

    if (current && ctx.measureText(test).width > maxWidth) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }

  if (current) lines.push(current)
  return lines.length ? lines : [""]
}

function StatCard({ label, value, accent = false }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent
          ? "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/30"
          : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/70"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-black ${
          accent
            ? "text-cyan-700 dark:text-cyan-300"
            : "text-gray-950 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

export default function SyllableCounterTool() {
  const [text, setText] = useState("")
  const [patternId, setPatternId] = useState("none")
  const [customInput, setCustomInput] = useState("")
  const [copied, setCopied] = useState(false)

  const analysis = useMemo(() => analyzeText(text), [text])
  const { nonEmptyLines, totalSyllables, totalWords, estimatedWords } = analysis

  const activePreset = POEM_PATTERNS.find((pattern) => pattern.id === patternId)
  const customPatternArray = useMemo(
    () => parseCustomPattern(customInput),
    [customInput]
  )

  const activePattern =
    patternId === "custom"
      ? customPatternArray
      : activePreset
        ? activePreset.pattern
        : null

  const patternOn =
    patternId !== "none" &&
    Array.isArray(activePattern) &&
    activePattern.length > 0

  const patternLines = patternOn
    ? activePattern.map((target, index) => {
        const line = nonEmptyLines[index]
        const count = line ? line.syllables : 0

        return {
          lineNumber: index + 1,
          target,
          count,
          ok: line !== undefined && count === target,
        }
      })
    : []

  const extraLines =
    patternOn && nonEmptyLines.length > activePattern.length

  const patternComplete =
    patternOn && nonEmptyLines.length === activePattern.length

  const patternValid =
    patternOn &&
    patternComplete &&
    patternLines.every((line) => line.ok)

  const patternLabel =
    patternId === "custom"
      ? "Custom pattern"
      : activePreset?.label || ""

  const handleClear = () => {
    setText("")
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!text) return

    const summaryLines = [
      `Total syllables: ${totalSyllables}`,
      `Words: ${totalWords}`,
      ...nonEmptyLines.map(
        (line, index) =>
          `Line ${index + 1}: ${line.syllables} syllable${
            line.syllables === 1 ? "" : "s"
          }`
      ),
    ]

    await navigator.clipboard.writeText(summaryLines.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const handleDownloadImage = () => {
    if (nonEmptyLines.length === 0) return

    const canvas = document.createElement("canvas")
    canvas.width = 1000
    canvas.height = Math.min(
      2400,
      Math.max(1200, 520 + nonEmptyLines.length * 120)
    )

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height)
    bg.addColorStop(0, "#ecfeff")
    bg.addColorStop(1, "#e0f2fe")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "rgba(6,182,212,0.12)"
    ctx.beginPath()
    ctx.arc(110, 150, 190, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "rgba(59,130,246,0.10)"
    ctx.beginPath()
    ctx.arc(900, canvas.height - 140, 230, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#0e7490"
    ctx.font = "600 32px Georgia, serif"
    ctx.textAlign = "center"
    ctx.fillText(
      (patternOn ? patternLabel : "Syllable Count").toUpperCase(),
      canvas.width / 2,
      170
    )

    ctx.fillStyle = "#0f172a"
    ctx.font = "46px Georgia, serif"

    const maxTextWidth = canvas.width - 160
    const lineGap = 62
    const verseGap = 24
    let y = 340

    nonEmptyLines.forEach((line) => {
      const lineText = line.words
        .map((word) => word.display || word.token)
        .join(" ")

      const wrapped = wrapCanvasText(ctx, lineText, maxTextWidth)

      wrapped.forEach((subLine) => {
        if (y < canvas.height - 150) {
          ctx.fillText(subLine, canvas.width / 2, y)
          y += lineGap
        }
      })

      y += verseGap
    })

    ctx.fillStyle = "#0891b2"
    ctx.font = "600 26px Georgia, serif"
    ctx.fillText(
      "countflows.com",
      canvas.width / 2,
      canvas.height - 72
    )

    ctx.fillStyle = "#64748b"
    ctx.font = "22px Georgia, serif"
    ctx.fillText(
      "Free Syllable Counter for Poems, Haiku & Lyrics",
      canvas.width / 2,
      canvas.height - 38
    )

    canvas.toBlob((blob) => {
      if (!blob) return

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${patternOn ? patternId : "syllable-count"}.png`
      link.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <section className="mx-auto mb-12 max-w-6xl px-4 md:px-8">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-cyan-100/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 md:px-6 dark:border-gray-800 dark:bg-gray-900">
          <div>
            <p className="text-sm font-bold text-gray-950 dark:text-white">
              Syllable Counter
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Count words, poems, haiku and song lyrics line by line.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Private in browser
          </span>
        </div>

        <div className="p-4 md:p-6">
          <div
            aria-live="polite"
            className="grid grid-cols-3 gap-2"
          >
            <StatCard
              label="Syllables"
              value={totalSyllables.toLocaleString()}
              accent
            />
            <StatCard
              label="Words"
              value={totalWords.toLocaleString()}
            />
            <StatCard
              label="Lines"
              value={nonEmptyLines.length.toLocaleString()}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Mode
            </span>

            <button
              type="button"
              onClick={() => setPatternId("none")}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                patternId === "none"
                  ? "border-cyan-600 bg-cyan-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-cyan-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              Count syllables
            </button>

            <button
              type="button"
              onClick={() => setPatternId("haiku")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                patternId === "haiku"
                  ? "border-cyan-600 bg-cyan-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-cyan-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Haiku 5-7-5
            </button>

            <details className="group relative">
              <summary className="cursor-pointer list-none rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-cyan-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                More poetry patterns
              </summary>

              <div className="absolute left-0 top-12 z-20 w-72 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <label
                  htmlFor="poem-pattern"
                  className="mb-1.5 block text-xs font-semibold text-gray-500 dark:text-gray-400"
                >
                  Choose a pattern
                </label>

                <select
                  id="poem-pattern"
                  value={
                    ["tanka", "cinquain", "fibonacci", "custom"].includes(
                      patternId
                    )
                      ? patternId
                      : ""
                  }
                  onChange={(event) => {
                    if (event.target.value) {
                      setPatternId(event.target.value)
                    }
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select a pattern</option>
                  <option value="tanka">Tanka · 5-7-5-7-7</option>
                  <option value="cinquain">Cinquain · 2-4-6-8-2</option>
                  <option value="fibonacci">Fibonacci · 1-1-2-3-5-8</option>
                  <option value="custom">Custom pattern</option>
                </select>

                {patternId === "custom" && (
                  <div className="mt-3">
                    <label
                      htmlFor="custom-syllable-pattern"
                      className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400"
                    >
                      Syllables per line
                    </label>

                    <input
                      id="custom-syllable-pattern"
                      type="text"
                      value={customInput}
                      onChange={(event) =>
                        setCustomInput(event.target.value)
                      }
                      placeholder="5,7,5,7,7"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </details>
          </div>

          {patternOn && (
            <div className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 dark:border-cyan-900 dark:bg-cyan-950/20">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-gray-950 dark:text-white">
                    {patternLabel} checker
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    Target: {activePattern.join(" - ")} syllables
                  </p>
                </div>

                {patternValid ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Pattern matched
                  </span>
                ) : (
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-400">
                    {nonEmptyLines.length} / {activePattern.length} lines
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {patternLines.map((line) => (
                  <div
                    key={line.lineNumber}
                    className={`min-w-20 rounded-xl border px-3 py-2 text-center ${
                      line.ok
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                        : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide">
                      Line {line.lineNumber}
                    </p>
                    <p className="mt-0.5 text-lg font-black">
                      {line.count} / {line.target}
                    </p>
                  </div>
                ))}
              </div>

              {extraLines && (
                <p className="mt-3 text-xs font-medium text-amber-700 dark:text-amber-300">
                  {patternLabel} uses {activePattern.length} lines. Remove the
                  extra line{nonEmptyLines.length - activePattern.length > 1 ? "s" : ""}.
                </p>
              )}

              {patternId === "custom" && activePattern.length === 0 && (
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Enter a pattern such as 5,7,5 — one number for each line.
                </p>
              )}
            </div>
          )}

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <label
                htmlFor="syllable-text"
                className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                Your text
              </label>

              <textarea
                id="syllable-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste a word, poem, haiku, or song lyrics here. Use one line per verse for line-by-line counts…"
                aria-label="Text to count syllables in"
                className="min-h-[300px] w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 p-4 text-base leading-7 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100/60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-850 dark:focus:ring-cyan-950/40"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!text}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy results"}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadImage}
                  disabled={nonEmptyLines.length === 0}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-cyan-300 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                >
                  <Download className="h-4 w-4" />
                  Download poem card
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

            <div
              aria-live="polite"
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-gray-950 dark:text-white">
                    Line-by-line syllable count
                  </h2>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Ideal for poems, haiku and song lyrics.
                  </p>
                </div>

                <Music2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>

              {nonEmptyLines.length > 0 ? (
                <ol className="mt-4 max-h-[430px] space-y-3 overflow-y-auto pr-1">
                  {nonEmptyLines.map((line, index) => {
                    const target =
                      patternOn && index < activePattern.length
                        ? activePattern[index]
                        : null

                    const targetMatched =
                      target !== null && line.syllables === target

                    return (
                      <li
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Line {index + 1}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                              targetMatched
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300"
                            }`}
                          >
                            {line.syllables} syllable
                            {line.syllables === 1 ? "" : "s"}
                            {target !== null ? ` / target ${target}` : ""}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {line.words.map((word, wordIndex) => (
                            <span
                              key={wordIndex}
                              title={
                                word.exact
                                  ? `${word.count} syllable${
                                      word.count === 1 ? "" : "s"
                                    }`
                                  : `${word.count} syllable${
                                      word.count === 1 ? "" : "s"
                                    } (estimated — double-check)`
                              }
                              className={`inline-flex items-center gap-1 rounded-lg border bg-gray-50 px-2 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200 ${
                                word.exact
                                  ? "border-gray-200 dark:border-gray-700"
                                  : "border-dashed border-amber-400 dark:border-amber-600"
                              }`}
                            >
                              {word.display}
                              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                                {word.count}
                              </span>
                            </span>
                          ))}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              ) : (
                <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
                  <div>
                    <Music2 className="mx-auto h-7 w-7 text-cyan-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Paste your text to see each line separately
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Every line will show its total syllables plus a per-word breakdown.
                    </p>
                  </div>
                </div>
              )}

              {estimatedWords > 0 && (
                <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Dashed word chips use an estimated syllable count. Double-check
                  those words when exact meter matters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}