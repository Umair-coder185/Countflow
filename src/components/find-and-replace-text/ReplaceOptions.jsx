export default function ReplaceOptions({
  options,
  onChange,
}) {
  const updateOption = (key, value) => {
    onChange({
      ...options,
      [key]: value,
    })
  }

  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Replacement Options
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Control how CountFlows finds and replaces matching text.
        </p>
      </div>

      {/* Matching Options */}
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-4">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={options.caseSensitive}
            onChange={(event) =>
              updateOption(
                "caseSensitive",
                event.target.checked
              )
            }
            className="h-4 w-4 rounded border-gray-300 accent-cyan-600"
          />

          <span>Match case</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={options.wholeWords}
            onChange={(event) =>
              updateOption(
                "wholeWords",
                event.target.checked
              )
            }
            className="h-4 w-4 rounded border-gray-300 accent-cyan-600"
          />

          <span>Whole words only</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={options.regex}
            onChange={(event) =>
              updateOption(
                "regex",
                event.target.checked
              )
            }
            className="h-4 w-4 rounded border-gray-300 accent-cyan-600"
          />

          <span>Regular expression (Regex)</span>
        </label>
      </div>

      {/* Replacement Mode */}
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-800 dark:text-slate-200">
          Replacement mode
        </p>

        <div className="mt-3 grid max-w-xl gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              updateOption(
                "mode",
                "simultaneous"
              )
            }
            aria-pressed={
              options.mode === "simultaneous"
            }
            className={`rounded-xl border p-4 text-left transition ${
              options.mode === "simultaneous"
                ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/10 dark:border-cyan-500 dark:bg-cyan-950/30"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-slate-950 dark:hover:border-white/20"
            }`}
          >
            <span
              className={`block text-sm font-semibold ${
                options.mode === "simultaneous"
                  ? "text-cyan-700 dark:text-cyan-300"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Simultaneous
            </span>

            <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-slate-400">
              Recommended. Every rule is matched against the
              original text, helping prevent accidental chained
              replacements.
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              updateOption(
                "mode",
                "sequential"
              )
            }
            aria-pressed={
              options.mode === "sequential"
            }
            className={`rounded-xl border p-4 text-left transition ${
              options.mode === "sequential"
                ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/10 dark:border-cyan-500 dark:bg-cyan-950/30"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-slate-950 dark:hover:border-white/20"
            }`}
          >
            <span
              className={`block text-sm font-semibold ${
                options.mode === "sequential"
                  ? "text-cyan-700 dark:text-cyan-300"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Sequential
            </span>

            <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-slate-400">
              Advanced. Rules run from top to bottom, so text
              created by one replacement can be matched by a later
              rule.
            </span>
          </button>
        </div>
      </div>

      {/* Regex Help */}
      {options.regex && (
        <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50/60 px-4 py-3 dark:border-violet-900/50 dark:bg-violet-950/20">
          <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
            Regex mode enabled
          </p>

          <p className="mt-1 text-xs leading-5 text-violet-700/80 dark:text-violet-300/80">
            Find fields are treated as regular expression patterns.
            Replacement values can use capture groups such as{" "}
            <code className="rounded bg-white/70 px-1 py-0.5 dark:bg-slate-900">
              $1
            </code>{" "}
            and{" "}
            <code className="rounded bg-white/70 px-1 py-0.5 dark:bg-slate-900">
              $2
            </code>
            .
          </p>
        </div>
      )}
    </div>
  )
}