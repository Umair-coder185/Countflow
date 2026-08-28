import {
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react"

const MAX_VISIBLE_WARNINGS = 5

export default function ConflictWarnings({
  warnings,
  hasRules,
}) {
  if (!hasRules) {
    return null
  }

  if (!warnings.length) {
    return (
      <div className="border-t border-gray-200 px-5 py-4 dark:border-white/10 sm:px-6">
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2
            size={17}
            aria-hidden="true"
          />
          No rule conflicts detected
        </div>
      </div>
    )
  }

  const visibleWarnings =
    warnings.slice(
      0,
      MAX_VISIBLE_WARNINGS
    )

  return (
    <div className="border-t border-gray-200 px-5 py-4 dark:border-white/10 sm:px-6">
      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          Smart Conflict Check
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
          Review potential rule conflicts before replacing your text.
        </p>
      </div>

      <div className="space-y-2">
        {visibleWarnings.map(
          (warning, index) => {
            const isError =
              warning.severity ===
              "error"

            const isWarning =
              warning.severity ===
              "warning"

            const Icon =
              isError ||
              isWarning
                ? AlertTriangle
                : Info

            return (
              <div
                key={`${warning.type}-${index}`}
                className={`flex items-start gap-3 rounded-xl border p-3 text-sm ${
                  isError
                    ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                    : isWarning
                      ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
                      : "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300"
                }`}
              >
                <Icon
                  size={17}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />

                <div>
                  <p className="font-medium">
                    {warning.message}
                  </p>

                  {warning.suggestion ? (
                    <p className="mt-1 text-xs leading-5 opacity-80">
                      {
                        warning.suggestion
                      }
                    </p>
                  ) : null}
                </div>
              </div>
            )
          }
        )}
      </div>

      {warnings.length >
      MAX_VISIBLE_WARNINGS ? (
        <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">
          +
          {warnings.length -
            MAX_VISIBLE_WARNINGS}{" "}
          additional warnings
        </p>
      ) : null}
    </div>
  )
}