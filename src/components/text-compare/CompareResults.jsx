"use client"

import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react"

function DiffSpan({ item, inline = true }) {
  const base = "whitespace-pre-wrap break-words"

  const style =
    item.type === "added"
      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
      : item.type === "removed"
        ? "bg-rose-100 text-rose-900 line-through decoration-rose-400 dark:bg-rose-900/40 dark:text-rose-100"
        : "text-gray-800 dark:text-gray-200"

  return (
    <span
      id={
        inline && item.differenceIndex !== null
          ? `text-difference-${item.differenceIndex}`
          : undefined
      }
      className={`${base} ${style} rounded px-0.5`}
    >
      {item.value}
    </span>
  )
}

function SideBySideResults({ changes }) {
  return (
    <div className="mt-4 grid overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950/70 lg:grid-cols-2">
      <div className="border-b border-gray-200 lg:border-b-0 lg:border-r dark:border-gray-700">
        <div className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
          Original
        </div>

        <div className="p-5 text-sm leading-7">
          {changes.map((item, index) => {
            if (item.type === "added") return null

            return (
              <span
                key={`left-${index}`}
                id={
                  item.type === "removed" && item.differenceIndex !== null
                    ? `text-difference-${item.differenceIndex}`
                    : undefined
                }
              >
                <DiffSpan item={item} inline={false} />
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <div className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
          Changed
        </div>

        <div className="p-5 text-sm leading-7">
          {changes.map((item, index) => {
            if (item.type === "removed") return null

            return (
              <span
                key={`right-${index}`}
                id={
                  item.type === "added" && item.differenceIndex !== null
                    ? `text-difference-${item.differenceIndex}`
                    : undefined
                }
              >
                <DiffSpan item={item} inline={false} />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function InlineResults({ changes }) {
  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 text-sm leading-7 dark:border-gray-700 dark:bg-gray-950/70">
      {changes.map((item, index) => (
        <DiffSpan key={`${index}-${item.type}`} item={item} />
      ))}
    </div>
  )
}

export default function CompareResults({
  result,
  view,
  onViewChange,
  currentDifference,
  onPreviousDifference,
  onNextDifference,
  onCopyChangedText,
  copied,
}) {
  if (!result) return null

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onViewChange("side")}
            aria-pressed={view === "side"}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              view === "side"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            Side by side
          </button>

          <button
            type="button"
            onClick={() => onViewChange("inline")}
            aria-pressed={view === "inline"}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              view === "inline"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            Inline
          </button>
        </div>

        <button
          type="button"
          onClick={onCopyChangedText}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-gray-700 dark:text-gray-300"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy changed text"}
        </button>
      </div>

      {result.differenceCount > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Difference {currentDifference + 1} of {result.differenceCount}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onPreviousDifference}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-cyan-300 dark:border-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </button>

            <button
              type="button"
              onClick={onNextDifference}
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-700"
            >
              Next
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
          No differences were found with the selected comparison settings.
        </div>
      )}

      {view === "inline" ? (
        <InlineResults changes={result.changes} />
      ) : (
        <SideBySideResults changes={result.changes} />
      )}

      <p className="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400">
        Similarity is a comparison aid based on unchanged text. It is not a
        plagiarism score, authorship detector, or semantic-equivalence score.
      </p>
    </div>
  )
}