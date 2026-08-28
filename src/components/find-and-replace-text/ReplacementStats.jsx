import {
  RotateCcw,
  Wand2,
} from "lucide-react"

export default function ReplacementStats({
  stats,
  hasRun,
  error,
  canReplace,
  onReplace,
  onReset,
}) {
  const changedRules =
    stats.ruleStats.filter(
      (rule) =>
        rule.replacements > 0
    ).length

  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      {error ? (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </div>
      ) : null}

      {hasRun ? (
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat
            label="Replacements"
            value={
              stats.replacements
            }
          />

          <Stat
            label="Rules Applied"
            value={changedRules}
          />

          <Stat
            label="Words"
            value={`${stats.inputWords.toLocaleString()} → ${stats.resultWords.toLocaleString()}`}
          />

          <Stat
            label="Characters"
            value={`${stats.inputCharacters.toLocaleString()} → ${stats.resultCharacters.toLocaleString()}`}
          />
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <RotateCcw
            size={16}
            aria-hidden="true"
          />
          Reset
        </button>

        <button
          type="button"
          onClick={onReplace}
          disabled={!canReplace}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          <Wand2
            size={17}
            aria-hidden="true"
          />
          Replace Text
        </button>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-slate-950">
      <p className="text-xs text-gray-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
        {typeof value ===
        "number"
          ? value.toLocaleString()
          : value}
      </p>
    </div>
  )
}