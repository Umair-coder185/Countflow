"use client"

import Link from "next/link"
import { useDeferredValue, useMemo, useState } from "react"

import StatsCard from "@/components/StatsCard"

function buildFrequency(text) {
  const detectedWords =
    text.toLowerCase().match(/\p{L}+(?:['’\-]\p{L}+)*/gu) || []

  if (detectedWords.length === 0) {
    return {
      totalDetectedWords: 0,
      topWords: [],
    }
  }

  const frequencyMap = Object.create(null)

  for (const word of detectedWords) {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1
  }

  return {
    totalDetectedWords: detectedWords.length,
    topWords: Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
  }
}

function formatMinutes(words, wordsPerMinute) {
  if (words === 0) return "0 min"

  const minutes = words / wordsPerMinute
  if (minutes < 1) return "< 1 min"

  return `${Math.ceil(minutes)} min`
}

export default function WordCounterInsights({ text, words, sentences }) {
  const [goal, setGoal] = useState(1000)
  const deferredText = useDeferredValue(text)

  const charactersNoSpaces = useMemo(
    () => text.replace(/\s/g, "").length,
    [text]
  )

  const avgSentenceLength =
    sentences > 0 ? Math.round(words / sentences) : 0

  const goalNumber = Math.max(1, Number(goal) || 1)
  const progress = Math.min((words / goalNumber) * 100, 100)

  const frequency = useMemo(
    () => buildFrequency(deferredText),
    [deferredText]
  )

  let progressMessage = ""
  if (progress >= 100) progressMessage = "Goal reached."
  else if (progress >= 75) progressMessage = "Almost there."
  else if (progress >= 50) progressMessage = "Halfway to your goal."
  else if (progress > 0) progressMessage = "Keep writing."

  return (
    <>
      <StatsCard
        charactersNoSpaces={charactersNoSpaces}
        readingTime={formatMinutes(words, 200)}
        speakingTime={formatMinutes(words, 130)}
        avgSentenceLength={avgSentenceLength}
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Word goal
              </h2>
              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Set a target and track your progress while you write.
              </p>
            </div>

            <input
              id="word-goal"
              name="word-goal"
              type="number"
              min={1}
              inputMode="numeric"
              value={goal}
              onChange={(event) =>
                setGoal(
                  event.target.value === ""
                    ? ""
                    : Math.max(1, Number(event.target.value) || 1)
                )
              }
              aria-label="Word goal"
              className="w-24 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>
              {words.toLocaleString()} / {goalNumber.toLocaleString()} words
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          {progressMessage && (
            <p className="mt-3 text-sm font-medium text-cyan-800 dark:text-cyan-200">
              {progressMessage}
            </p>
          )}

          <p className="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400">
            Need a target for an assignment? See the{" "}
            <Link
              href="/blog/manage-essay-word-count"
              className="font-medium text-cyan-700 hover:underline dark:text-cyan-400"
            >
              Essay Word Count Guide
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Sentence length
          </h2>
          <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
            A simple structural signal based on average words per sentence.
          </p>

          <div className="mt-5 flex items-end gap-2">
            <span className="text-3xl font-bold tabular-nums text-gray-950 dark:text-white">
              {avgSentenceLength}
            </span>
            <span className="pb-1 text-sm text-gray-500 dark:text-gray-400">
              words / sentence
            </span>
          </div>

          <p className="mt-4 rounded-xl bg-violet-50 p-3 text-sm leading-6 text-violet-900 dark:bg-violet-950/30 dark:text-violet-200">
            Use this as a quick signal, not a full readability score. Sentence
            length varies by audience, purpose, and writing style.
          </p>
        </div>
      </div>

      {frequency.topWords.length > 0 && (
        <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Top word frequency
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Top 5 detected words
            </span>
          </div>

          <ul className="mt-4 divide-y divide-gray-200 text-sm dark:divide-gray-700">
            {frequency.topWords.map(([word, count]) => (
              <li
                key={word}
                className="flex items-center justify-between gap-4 py-2.5"
              >
                <span className="truncate font-medium text-gray-800 dark:text-gray-200">
                  {word}
                </span>
                <span className="shrink-0 tabular-nums text-gray-500 dark:text-gray-400">
                  {count} ·{" "}
                  {frequency.totalDetectedWords > 0
                    ? ((count / frequency.totalDetectedWords) * 100).toFixed(1)
                    : "0.0"}
                  %
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7 rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/80 p-5 text-sm text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/20 dark:text-cyan-100">
        <p className="font-semibold">Writing a novel?</p>
        <p className="mt-1.5 leading-6">
          Set your target above, then compare it with typical genre ranges in{" "}
          <Link
            href="/blog/how-many-words-in-a-novel"
            className="font-medium underline underline-offset-2 hover:no-underline"
          >
            How Many Words in a Novel?
          </Link>
          .
        </p>
      </div>
    </>
  )
}