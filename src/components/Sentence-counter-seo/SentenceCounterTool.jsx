"use client"

import { useMemo, useState } from "react"
import {
  BarChart3,
  Check,
  Copy,
  Download,
  FileText,
  Gauge,
  ListChecks,
  ShieldCheck,
  Trash2,
} from "lucide-react"
import { analyzeText } from "@/lib/syllables"

const COMMON_ABBREVIATIONS =
  /\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|vs|etc|No|Fig|Inc|Ltd|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\./gi

function getWords(value) {
  return (
    value.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []
  )
}

function splitSentencesFallback(value) {
  const DOT = "__CF_DOT__"
  const DECIMAL = "__CF_DECIMAL__"

  let protectedText = value
    .replace(/(\d)\.(\d)/g, `$1${DECIMAL}$2`)
    .replace(/\b(?:e\.g|i\.e)\./gi, (match) =>
      match.replace(/\./g, DOT)
    )
    .replace(/\b(?:[A-Za-z]\.){2,}/g, (match) =>
      match.replace(/\./g, DOT)
    )
    .replace(COMMON_ABBREVIATIONS, (match) =>
      match.replace(/\./g, DOT)
    )

  const pieces =
    protectedText.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g) || []

  return pieces
    .map((piece) =>
      piece
        .replaceAll(DOT, ".")
        .replaceAll(DECIMAL, ".")
        .trim()
    )
    .filter((piece) => /[\p{L}\p{N}]/u.test(piece))
}

function splitIntoSentences(value) {
  const trimmed = value.trim()
  if (!trimmed) return []

  try {
    if (
      typeof Intl !== "undefined" &&
      typeof Intl.Segmenter === "function"
    ) {
      const segmenter = new Intl.Segmenter("en", {
        granularity: "sentence",
      })

      const segmented = Array.from(
        segmenter.segment(trimmed),
        ({ segment }) => segment.trim()
      ).filter((segment) => /[\p{L}\p{N}]/u.test(segment))

      if (segmented.length > 0) return segmented
    }
  } catch {
    // Fall back to punctuation-aware splitting below.
  }

  return splitSentencesFallback(trimmed)
}

function getReadabilityLabel(score) {
  if (score === null) return "No text yet"
  if (score >= 90) return "Very easy"
  if (score >= 80) return "Easy"
  if (score >= 70) return "Fairly easy"
  if (score >= 60) return "Standard"
  if (score >= 50) return "Fairly difficult"
  if (score >= 30) return "Difficult"
  return "Very difficult"
}

function StatCard({ label, value, suffix, accent = false }) {
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

      <div className="mt-1 flex items-baseline gap-1.5">
        <p
          className={`text-2xl font-black ${
            accent
              ? "text-cyan-700 dark:text-cyan-300"
              : "text-gray-950 dark:text-white"
          }`}
        >
          {value}
        </p>

        {suffix && (
          <span className="text-xs font-medium text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export default function SentenceCounterTool() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState(50)
  const [copied, setCopied] = useState(false)

  const sentences = useMemo(() => splitIntoSentences(text), [text])

  const sentenceData = useMemo(
    () =>
      sentences.map((sentence, index) => ({
        index: index + 1,
        text: sentence,
        words: getWords(sentence).length,
      })),
    [sentences]
  )

  const sentenceCount = sentenceData.length
  const wordCount = useMemo(() => getWords(text).length, [text])

  const avgSentenceLength =
    sentenceCount === 0 ? 0 : wordCount / sentenceCount

  const longestSentence = useMemo(() => {
    if (sentenceData.length === 0) return null

    return sentenceData.reduce((longest, current) =>
      current.words > longest.words ? current : longest
    )
  }, [sentenceData])

  const shortestSentence = useMemo(() => {
    const withWords = sentenceData.filter((sentence) => sentence.words > 0)
    if (withWords.length === 0) return null

    return withWords.reduce((shortest, current) =>
      current.words < shortest.words ? current : shortest
    )
  }, [sentenceData])

  const longSentenceCount = sentenceData.filter(
    (sentence) => sentence.words >= 25
  ).length

  const syllableAnalysis = useMemo(() => analyzeText(text), [text])
  const totalSyllables = syllableAnalysis?.totalSyllables || 0

  const fleschScore = useMemo(() => {
    if (
      sentenceCount === 0 ||
      wordCount === 0 ||
      totalSyllables === 0
    ) {
      return null
    }

    const score =
      206.835 -
      1.015 * (wordCount / sentenceCount) -
      84.6 * (totalSyllables / wordCount)

    return Math.round(Math.max(0, Math.min(100, score)))
  }, [sentenceCount, wordCount, totalSyllables])

  const readabilityLabel = getReadabilityLabel(fleschScore)

  const progress =
    goal > 0
      ? Math.min((sentenceCount / goal) * 100, 100)
      : 0

  const handleClear = () => {
    setText("")
    setCopied(false)
  }

  const handleCopyResults = async () => {
    if (!text) return

    const results = [
      `Sentences: ${sentenceCount}`,
      `Words: ${wordCount}`,
      `Average sentence length: ${avgSentenceLength.toFixed(1)} words`,
      `Longest sentence: ${longestSentence?.words || 0} words`,
      `Shortest sentence: ${shortestSentence?.words || 0} words`,
      `Readability: ${
        fleschScore === null
          ? "Not available"
          : `${fleschScore}/100 — ${readabilityLabel}`
      }`,
    ]

    await navigator.clipboard.writeText(results.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const handleDownload = () => {
    if (!text) return

    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "sentence-counter-text.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="mx-auto mb-12 max-w-6xl px-4 md:px-8">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-cyan-100/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/30">
        {/* Tool header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 md:px-6 dark:border-gray-800 dark:bg-gray-900">
          <div>
            <p className="text-sm font-bold text-gray-950 dark:text-white">
              Sentence Counter &amp; Length Checker
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Count sentences and inspect sentence length instantly.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Runs in your browser
          </span>
        </div>

        <div className="p-4 md:p-6">
          {/* Primary stats */}
          <div
            aria-live="polite"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            <StatCard
              label="Sentences"
              value={sentenceCount.toLocaleString()}
              accent
            />

            <StatCard
              label="Words"
              value={wordCount.toLocaleString()}
            />

            <StatCard
              label="Avg. length"
              value={avgSentenceLength.toFixed(1)}
              suffix="words"
            />

            <StatCard
              label="Longest"
              value={(longestSentence?.words || 0).toLocaleString()}
              suffix="words"
            />

            <StatCard
              label="Shortest"
              value={(shortestSentence?.words || 0).toLocaleString()}
              suffix="words"
            />
          </div>

          {/* Exact query-intent answer */}
          <div
            aria-live="polite"
            className="mt-3 rounded-xl border border-cyan-100 bg-cyan-50/60 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/20 dark:text-cyan-100"
          >
            {text.trim() ? (
              <>
                Your text contains{" "}
                <strong>
                  {sentenceCount} sentence
                  {sentenceCount === 1 ? "" : "s"}
                </strong>
                .
              </>
            ) : (
              <>
                Paste your text below to see{" "}
                <strong>how many sentences it contains</strong>.
              </>
            )}
          </div>

          {/* Main workflow */}
          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
            {/* Input */}
            <div>
              <label
                htmlFor="sentence-counter-text"
                className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                Your text
              </label>

              <textarea
                id="sentence-counter-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste an essay, article, paragraph, or any text here…"
                aria-label="Text to count sentences in"
                className="min-h-[340px] w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 p-4 text-base leading-7 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100/60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-900 dark:focus:ring-cyan-950/40"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyResults}
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

            {/* Always-visible sentence breakdown */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-gray-950 dark:text-white">
                    Sentence-by-sentence breakdown
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    See the word count for every sentence and quickly spot long
                    sentences.
                  </p>
                </div>

                <ListChecks className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
              </div>

              {sentenceData.length > 0 ? (
                <ol className="mt-4 max-h-[470px] space-y-3 overflow-y-auto pr-1">
                  {sentenceData.map((sentence) => {
                    const isLong = sentence.words >= 25

                    return (
                      <li
                        key={`${sentence.index}-${sentence.text}`}
                        className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            Sentence {sentence.index}
                          </span>

                          <div className="flex items-center gap-2">
                            {isLong && (
                              <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                                Long sentence
                              </span>
                            )}

                            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">
                              {sentence.words} word
                              {sentence.words === 1 ? "" : "s"}
                            </span>
                          </div>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                          {sentence.text}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              ) : (
                <div className="flex min-h-[340px] items-center justify-center px-6 text-center">
                  <div>
                    <FileText className="mx-auto h-7 w-7 text-cyan-400" />

                    <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Your sentence breakdown will appear here
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Each sentence will show its word count, making long and
                      short sentences easy to compare.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Readability + sentence-length signals */}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-violet-500" />
                <p className="text-sm font-bold text-gray-950 dark:text-white">
                  Readability estimate
                </p>
              </div>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-black text-gray-950 dark:text-white">
                  {fleschScore === null ? "—" : fleschScore}
                </span>

                {fleschScore !== null && (
                  <span className="pb-0.5 text-xs text-gray-400">
                    / 100
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {readabilityLabel}
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Based on Flesch Reading Ease using sentence length and estimated
                syllable counts. Treat it as a writing signal, not a quality
                grade.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-500" />
                <p className="text-sm font-bold text-gray-950 dark:text-white">
                  Sentence length signal
                </p>
              </div>

              <p className="mt-3 text-2xl font-black text-gray-950 dark:text-white">
                {longSentenceCount}
              </p>

              <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                sentence{longSentenceCount === 1 ? "" : "s"} with 25+ words
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Longer sentences are not automatically bad. Use this signal to
                find lines worth reviewing when your writing feels dense.
              </p>
            </div>
          </div>

          {/* Secondary feature: sentence goal */}
          <details className="group mt-5 rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
              <span>Set a sentence goal (optional)</span>
              <span className="text-xs font-medium text-gray-400 group-open:hidden">
                {sentenceCount} / {goal}
              </span>
            </summary>

            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Target sentence count
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Useful for assignments or structured writing targets.
                  </p>
                </div>

                <input
                  type="number"
                  min={1}
                  value={goal}
                  onChange={(event) =>
                    setGoal(Math.max(1, Number(event.target.value) || 1))
                  }
                  aria-label="Sentence goal"
                  className="w-24 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {sentenceCount} / {goal} sentences
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </details>

          <p className="mt-4 text-center text-xs leading-5 text-gray-400">
            Sentence detection uses browser-native sentence segmentation when
            available, with a punctuation-aware fallback for decimals and
            common abbreviations.
          </p>
        </div>
      </div>
    </section>
  )
}