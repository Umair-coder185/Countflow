"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, Trash, Download } from "lucide-react"
import StatsCard from "@/components/StatsCard"

const POSITIVE_WORDS = ["good", "great", "excellent", "happy", "love", "success", "amazing", "wonderful", "positive"]
const NEGATIVE_WORDS = ["bad", "poor", "sad", "hate", "fail", "problem", "negative", "terrible", "angry"]

export default function WordCounterTool() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState(1000)
  const [focusMode, setFocusMode] = useState(false)

  const handleClear = () => setText("")
  const handleCopy = () => navigator.clipboard.writeText(text)
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-text.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  // ---- Core stats ----
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const sentences = text.split(/[.!?]+/).filter(Boolean).length
  const avgSentenceLength = sentences > 0 ? Math.round(words / sentences) : 0
  const progress = Math.min((words / goal) * 100, 100)
  const paragraphCount = text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length
  const charCount = text.length

  // ---- Words array (all languages supported) ----
  const wordsArray = text.toLowerCase().match(/\p{L}+/gu) || []
  const uniqueWords = new Set(wordsArray)
  const vocabRichness = words === 0 ? 0 : ((uniqueWords.size / words) * 100).toFixed(1)
  let vocabLabel = "⚪ Balanced"
  if (vocabRichness > 70) vocabLabel = "🌟 Rich Vocabulary"
  else if (vocabRichness < 40) vocabLabel = "🔄 Repetitive"

  // ---- Sentiment ----
  let sentimentScore = 0
  wordsArray.forEach((word) => {
    if (POSITIVE_WORDS.includes(word)) sentimentScore += 2
    if (NEGATIVE_WORDS.includes(word)) sentimentScore -= 2
  })
  let sentimentLabel = "⚪ Neutral"
  if (sentimentScore >= 6) sentimentLabel = "😊 Positive Tone"
  else if (sentimentScore <= -6) sentimentLabel = "☹️ Negative Tone"
  else if (sentimentScore > 0) sentimentLabel = "🙂 Slightly Positive"
  else if (sentimentScore < 0) sentimentLabel = "🙁 Slightly Negative"

  // ---- Word frequency (top 5) ----
  const frequencyMap = {}
  wordsArray.forEach((word) => {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1
  })
  const sortedWords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // ---- Motivation ----
  let motivation = ""
  if (progress >= 100) motivation = "🎉 Goal achieved!"
  else if (progress >= 75) motivation = "Almost there, keep going!"
  else if (progress >= 50) motivation = "Halfway done, great job!"
  else if (progress > 0) motivation = "Nice start, keep writing!"

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">
        {/* Live stats */}
        <div className="mt-2 flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
            <span className="font-semibold text-gray-700 dark:text-gray-300">📝 Words: {words}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">📖 Sentences: {sentences}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">🔡 Characters: {charCount}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">📑 Paragraphs: {paragraphCount}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
            <span className="font-semibold text-gray-700 dark:text-gray-300">🌐 Vocabulary: {vocabRichness}% – {vocabLabel}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">💬 Sentiment: {sentimentLabel}</span>
          </div>
        </div>

        {/* Word frequency — visible immediately with stats */}
        {sortedWords.length > 0 && (
          <div className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-xl p-4">
            <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-3">
              📊 Top 5 Word Frequency
            </h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              {sortedWords.map(([word, count]) => (
                <li key={word} className="flex justify-between">
                  <span className="capitalize">🔹 {word}</span>
                  <span>
                    {count} ({((count / words) * 100).toFixed(1)}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text..."
          aria-label="Text to count"
          className="w-full max-w-4xl mx-auto min-h-[150px] sm:min-h-[200px] md:min-h-[240px] mt-4 border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg"
        />

        {/* Actions */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
            >
              <Copy size={18} /> Copy
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <Trash size={18} /> Clear
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
            >
              <Download size={18} /> Download
            </button>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition"
            >
              {focusMode ? "Exit Focus Mode" : "Focus Mode"}
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
            Use the toolbar to copy, clear, or download your text. Your stats refresh instantly
            with every change.
          </p>
        </div>

        {!focusMode && (
          <>
            {/* Word Goal Tracker & Readability */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Word Goal</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                      Set a writing target and track your journey.
                    </p>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={goal}
                    onChange={(e) => setGoal(Math.max(1, Number(e.target.value)))}
                    aria-label="Word goal"
                    className="w-24 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="mt-5">
                  <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>
                      {words} / {goal} words
                    </span>
                    <span>{Math.round(progress)}% complete</span>
                  </div>
                </div>
                {motivation && (
                  <div className="mt-4 rounded-2xl bg-cyan-600/10 dark:bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-800 dark:text-cyan-200 text-center">
                    {motivation}
                  </div>
                )}
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Not sure what to aim for? See our{" "}
                  <Link
                    href="/blog/manage-essay-word-count"
                    className="text-cyan-700 dark:text-cyan-400 font-medium hover:underline"
                  >
                    essay word count guide
                  </Link>{" "}
                  for targets by assignment type.
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Readability</p>
                <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    Avg. sentence:{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {avgSentenceLength}
                    </span>{" "}
                    words
                  </p>
                  <p>
                    Level:{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {avgSentenceLength <= 12 ? "Easy" : avgSentenceLength <= 20 ? "Medium" : "Hard"}
                    </span>
                  </p>
                </div>
                <div className="mt-6 rounded-2xl bg-violet-600/10 dark:bg-violet-500/10 p-4 text-sm text-violet-800 dark:text-violet-200">
                  Tip: Keep sentences short for better readability. Aim for 12-15 words per
                  sentence.
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8">
              <StatsCard text={text} />
            </div>

            {/* Social sharing */}
            <div className="mt-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-gray-900 dark:to-gray-800 p-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Share your writing
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.slice(0, 100))}`,
                      "_blank"
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition text-sm"
                >
                  Twitter
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank"
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition text-sm"
                >
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Tip banner — contextual article link */}
            <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
              <p className="font-semibold">Writing a novel?</p>
              <p className="mt-2">
                Try the focus mode above to hide distractions and enter your flow state. And if
                you're wondering what to aim for, see{" "}
                <Link
                  href="/blog/how-many-words-in-a-novel"
                  className="font-medium underline hover:no-underline"
                >
                  how many words a novel should be
                </Link>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}