"use client"

import { useMemo, useState } from "react"
import { Copy, Check, Trash, Download } from "lucide-react"
import { analyzeText } from "@/lib/syllables"

/* ============================================================
   Poem patterns — Haiku generalized into a preset system.
   Each pattern is a list of target syllable counts, one per line.
   "custom" lets the writer type any sequence, so this covers
   forms we haven't thought of too (double dactyl, ghazal, etc).
   ============================================================ */
const POEM_PATTERNS = [
  { id: "haiku", label: "Haiku (5-7-5)", pattern: [5, 7, 5] },
  { id: "tanka", label: "Tanka (5-7-5-7-7)", pattern: [5, 7, 5, 7, 7] },
  { id: "cinquain", label: "Cinquain (2-4-6-8-2)", pattern: [2, 4, 6, 8, 2] },
  { id: "fibonacci", label: "Fibonacci (1-1-2-3-5-8)", pattern: [1, 1, 2, 3, 5, 8] },
  { id: "custom", label: "Custom pattern", pattern: null },
]

const parseCustomPattern = (input) =>
  input
    .split(",")
    .map((n) => parseInt(n.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0 && n <= 20)
    .slice(0, 12)

/* Wrap text on a canvas to a max pixel width — canvas has no
   built-in word wrap, so long poem lines need this before drawing. */
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

export default function SyllableCounterTool() {
  const [text, setText] = useState("")
  const [patternId, setPatternId] = useState("none")
  const [customInput, setCustomInput] = useState("")
  const [copied, setCopied] = useState(false)

  const analysis = useMemo(() => analyzeText(text), [text])
  const { nonEmptyLines, totalSyllables, totalWords, estimatedWords } = analysis

  const activePreset = POEM_PATTERNS.find((p) => p.id === patternId)
  const customPatternArray = useMemo(() => parseCustomPattern(customInput), [customInput])
  const activePattern =
    patternId === "custom" ? customPatternArray : activePreset ? activePreset.pattern : null
  const patternOn = patternId !== "none" && !!activePattern && activePattern.length > 0

  const patternLines = patternOn
    ? activePattern.map((target, i) => {
        const line = nonEmptyLines[i]
        const count = line ? line.syllables : 0
        return { lineNumber: i + 1, target, count, ok: line !== undefined && count === target }
      })
    : []
  const extraLines = patternOn && nonEmptyLines.length > activePattern.length
  const patternComplete = patternOn && nonEmptyLines.length === activePattern.length
  const patternValid = patternOn && patternComplete && patternLines.every((l) => l.ok)
  const patternLabel = patternId === "custom" ? "custom pattern" : activePreset?.label.split(" (")[0] || ""
  const patternDescription = patternOn
    ? `Write ${activePattern.length} line${activePattern.length === 1 ? "" : "s"}: ${activePattern.join(", then ")} syllables.`
    : "Pick a form to check your lines against a target syllable pattern."

  const handleClear = () => setText("")

  const handleCopy = async () => {
    const summaryLines = [
      `Total syllables: ${totalSyllables}`,
      `Words: ${totalWords}`,
      ...nonEmptyLines.map((l, i) => `Line ${i + 1}: ${l.syllables} syllables`),
    ]
    await navigator.clipboard.writeText(summaryLines.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadImage = () => {
    if (nonEmptyLines.length === 0) return

    const canvas = document.createElement("canvas")
    canvas.width = 1000
    canvas.height = 1500
    const ctx = canvas.getContext("2d")

    // Background
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
    ctx.arc(900, 1360, 230, 0, Math.PI * 2)
    ctx.fill()

    // Eyebrow label
    ctx.fillStyle = "#0e7490"
    ctx.font = "600 32px Georgia, serif"
    ctx.textAlign = "center"
    ctx.fillText((patternOn ? patternLabel : "Syllable Count").toUpperCase(), canvas.width / 2, 190)

    // Poem lines, wrapped and centered
    ctx.fillStyle = "#0f172a"
    ctx.font = "46px Georgia, serif"
    const maxTextWidth = canvas.width - 160
    const lineGap = 62
    const verseGap = 26
    let y = 420

    nonEmptyLines.forEach((line) => {
     const lineText = line.words.map((w) => w.display || w.token).join(" ")
      const wrapped = wrapCanvasText(ctx, lineText, maxTextWidth)
      wrapped.forEach((sub) => {
        ctx.fillText(sub, canvas.width / 2, y)
        y += lineGap
      })
      y += verseGap
    })

    // Footer watermark
    ctx.fillStyle = "#0891b2"
    ctx.font = "600 26px Georgia, serif"
    ctx.fillText("countflows.com", canvas.width / 2, canvas.height - 70)
    ctx.fillStyle = "#64748b"
    ctx.font = "22px Georgia, serif"
    ctx.fillText("Free Syllable Counter & Poetry Tool", canvas.width / 2, canvas.height - 38)

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${patternOn ? patternId : "poem"}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">
        {/* Live stats */}
        <div
          aria-live="polite"
          className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300"
        >
          <span className="font-semibold">🔤 Syllables: {totalSyllables}</span>
          <span className="font-semibold">✏️ Words: {totalWords}</span>
          <span className="font-semibold">📄 Lines: {nonEmptyLines.length}</span>
        </div>

        {/* Poem pattern selector */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label htmlFor="poem-pattern" className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            🎋 Poem pattern
          </label>
          <select
            id="poem-pattern"
            value={patternId}
            onChange={(e) => setPatternId(e.target.value)}
            className="rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm md:text-base font-medium px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="none">Off — just count syllables</option>
            {POEM_PATTERNS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
          {patternId === "custom" && (
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. 5,7,5,7,7"
              aria-label="Custom syllable pattern, comma separated"
              className="rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm md:text-base px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500 w-40 md:w-52"
            />
          )}
        </div>
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">{patternDescription}</p>

        {/* Pattern checker panel */}
        {patternOn && patternLines.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-3" aria-live="polite">
            {patternLines.map((l) => (
              <div
                key={l.lineNumber}
                className={`w-20 md:w-24 rounded-xl border p-3 text-center text-sm font-semibold shrink-0 ${
                  l.ok
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                }`}
              >
                Line {l.lineNumber}
                <span className="block mt-1 text-lg">
                  {l.count} / {l.target}
                </span>
              </div>
            ))}
          </div>
        )}
        {patternOn && (
          <p aria-live="polite" className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {patternValid
              ? `✅ Perfect ${patternLabel}. Well done!`
              : extraLines
                ? `⚠️ A ${patternLabel} has exactly ${activePattern.length} lines — remove the extra lines.`
                : patternId === "custom" && activePattern.length === 0
                  ? "Enter a pattern above, like 5,7,5 — one number per line, separated by commas."
                  : patternDescription}
          </p>
        )}

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste a word, sentence, or poem — one line per verse for line-by-line counts..."
          aria-label="Text to count syllables in"
          className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[260px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg"
        />

        {/* Per-line + per-word breakdown */}
        {nonEmptyLines.length > 0 && (
          <div className="mt-6 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Line-by-line breakdown
            </p>
            <ol className="space-y-3">
              {nonEmptyLines.map((line, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                  <span className="shrink-0 inline-flex items-center justify-center rounded-full bg-cyan-600 text-white text-xs font-bold w-7 h-7">
                    {line.syllables}
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {line.words.map((w, j) => (
                      <span
                        key={j}
                        title={
                          w.exact
                            ? `${w.count} syllable${w.count === 1 ? "" : "s"}`
                            : `${w.count} syllable${w.count === 1 ? "" : "s"} (estimated — double-check)`
                        }
                        className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 bg-white dark:bg-gray-800 border text-gray-800 dark:text-gray-200 ${
                          w.exact
                            ? "border-gray-200 dark:border-gray-700"
                            : "border-dashed border-amber-400 dark:border-amber-600"
                        }`}
                      >
                         {w.display}
                        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                          {w.count}
                        </span>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ol>
            {estimatedWords > 0 && (
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Words with a dashed border use an estimated count — hover to see details, and
                double-check the ones that matter.
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy results"}
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={nonEmptyLines.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download size={18} /> Download as image
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash size={18} /> Clear
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
            Every keystroke refreshes the counts instantly. Copy results gives you a text
            summary; Download as image saves a shareable poem card sized for Pinterest.
          </p>
        </div>

        {/* Tip banner */}
        <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
          <p className="font-semibold">Writing a poem?</p>
          <p className="mt-2">
            Pick a pattern above — Haiku, Tanka, Cinquain, Fibonacci, or your own custom
            sequence — and each line turns green the moment it hits its target.
          </p>
        </div>
      </div>
    </section>
  )
} 