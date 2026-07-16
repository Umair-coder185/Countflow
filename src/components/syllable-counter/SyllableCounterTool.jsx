"use client"

import { useMemo, useState } from "react"
import { Copy, Check, Trash } from "lucide-react"
import { analyzeText, HAIKU_PATTERN } from "@/lib/syllables"

export default function SyllableCounterTool() {
  const [text, setText] = useState("")
  const [haikuMode, setHaikuMode] = useState(false)
  const [copied, setCopied] = useState(false)

  const analysis = useMemo(() => analyzeText(text), [text])
  const { nonEmptyLines, totalSyllables, totalWords, estimatedWords } = analysis

  const haikuLines = HAIKU_PATTERN.map((target, i) => {
    const line = nonEmptyLines[i]
    const count = line ? line.syllables : 0
    return { lineNumber: i + 1, target, count, ok: line !== undefined && count === target }
  })
  const extraLines = haikuMode && nonEmptyLines.length > 3
  const haikuValid = haikuLines.every((l) => l.ok) && nonEmptyLines.length === 3

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

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">
        {/* Live stats — light-mode contrast pattern: text-gray-700 dark:text-gray-300 */}
        <div
          aria-live="polite"
          className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300"
        >
          <span className="font-semibold">🔤 Syllables: {totalSyllables}</span>
          <span className="font-semibold">✏️ Words: {totalWords}</span>
          <span className="font-semibold">📄 Lines: {nonEmptyLines.length}</span>
        </div>

        {/* Haiku mode toggle */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setHaikuMode((v) => !v)}
            aria-pressed={haikuMode}
            className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition ${
              haikuMode
                ? "bg-cyan-600 text-white ring-2 ring-cyan-300 dark:ring-cyan-500"
                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            🎋 Haiku mode (5-7-5)
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Checks your first three lines against 5-7-5.
          </span>
        </div>

        {/* Haiku checker panel */}
        {haikuMode && (
          <div className="mb-4 grid grid-cols-3 gap-3" aria-live="polite">
            {haikuLines.map((l) => (
              <div
                key={l.lineNumber}
                className={`rounded-xl border p-3 text-center text-sm font-semibold ${
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
        {haikuMode && (
          <p aria-live="polite" className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {haikuValid
              ? "✅ Perfect 5-7-5 haiku. Well done!"
              : extraLines
                ? "⚠️ A haiku has exactly three lines — remove the extra lines."
                : "Write three lines: five syllables, then seven, then five."}
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
                        {w.token}
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
              onClick={handleClear}
              disabled={!text}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash size={18} /> Clear
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
            Every keystroke refreshes the counts instantly. Copy results gives you the total plus
            a line-by-line summary.
          </p>
        </div>

        {/* Tip banner */}
        <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
          <p className="font-semibold">Writing a haiku?</p>
          <p className="mt-2">
            Turn on Haiku mode and write three lines — each line turns green the moment it
            hits its 5-7-5 target.
          </p>
        </div>
      </div>
    </section>
  )
}