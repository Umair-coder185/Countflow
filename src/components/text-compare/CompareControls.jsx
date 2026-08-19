"use client"

export default function CompareControls({
  mode,
  ignoreCase,
  ignoreWhitespace,
  onModeChange,
  onIgnoreCaseChange,
  onIgnoreWhitespaceChange,
  onCompare,
}) {
  const modes = [
    ["word", "Words"],
    ["character", "Characters"],
    ["line", "Lines"],
  ]

  return (
    <div className="mt-5 grid gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/60 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="space-y-4">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Compare by
          </div>

          <div className="flex flex-wrap gap-2">
            {modes.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onModeChange(value)}
                aria-pressed={mode === value}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === value
                    ? "bg-cyan-600 text-white"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-cyan-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(event) => onIgnoreCaseChange(event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            Ignore capitalization
          </label>

          <label
            className={`inline-flex items-center gap-2 text-sm ${
              mode === "character"
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-gray-700 dark:text-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              disabled={mode === "character"}
              onChange={(event) =>
                onIgnoreWhitespaceChange(event.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 disabled:opacity-50"
            />
            Ignore whitespace
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={onCompare}
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        Compare Text
      </button>
    </div>
  )
}