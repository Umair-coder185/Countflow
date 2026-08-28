import {
  Plus,
  Trash2,
} from "lucide-react"

export default function ReplacementRules({
  rules,
  maxRules,
  regex,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Find & Replace Rules
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Replace one or multiple values at once.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={
            rules.length >= maxRules
          }
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-cyan-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-200 dark:hover:bg-cyan-950/30"
        >
          <Plus
            size={16}
            aria-hidden="true"
          />
          Add Replacement
        </button>
      </div>

      <div className="space-y-3">
        {rules.map(
          (rule, index) => (
            <div
              key={rule.id}
              className="grid gap-2 rounded-xl border border-gray-100 bg-gray-50/60 p-3 dark:border-white/5 dark:bg-slate-950/40 sm:grid-cols-[28px_minmax(0,1fr)_28px_minmax(0,1fr)_36px] sm:items-center sm:border-0 sm:bg-transparent sm:p-0 dark:sm:bg-transparent"
            >
              <span className="text-xs font-semibold text-gray-400">
                {index + 1}
              </span>

              <input
                type="text"
                value={rule.search}
                onChange={(event) =>
                  onChange(
                    rule.id,
                    "search",
                    event.target.value
                  )
                }
                placeholder={
                  regex
                    ? "Find pattern"
                    : "Find text"
                }
                aria-label={`Find value for rule ${
                  index + 1
                }`}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
              />

              <span
                className="hidden text-center text-gray-400 sm:block"
                aria-hidden="true"
              >
                →
              </span>

              <input
                type="text"
                value={rule.replace}
                onChange={(event) =>
                  onChange(
                    rule.id,
                    "replace",
                    event.target.value
                  )
                }
                placeholder="Replace with"
                aria-label={`Replacement value for rule ${
                  index + 1
                }`}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
              />

              <button
                type="button"
                onClick={() =>
                  onRemove(rule.id)
                }
                aria-label={`Remove rule ${
                  index + 1
                }`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
              >
                <Trash2
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </div>
          )
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 dark:text-slate-500">
        <span>
          Leave Replace With empty to delete matches.
        </span>

        <span>
          {rules.length} / {maxRules} rules
        </span>
      </div>
    </div>
  )
}