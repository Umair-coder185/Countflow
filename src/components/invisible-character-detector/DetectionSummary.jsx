import { AlertTriangle, CheckCircle2, Eye, Layers3, WandSparkles } from "lucide-react"

export default function DetectionSummary({ summary, selectedCount = 0, changedOccurrences = 0 }) {
  const hasFindings = summary.totalDetected > 0

  return (
    <section className={`rounded-2xl border p-5 sm:p-6 ${hasFindings ? "border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/10" : "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/10"}`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${hasFindings ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"}`}>
            {hasFindings ? <AlertTriangle size={20} aria-hidden="true" /> : <CheckCircle2 size={20} aria-hidden="true" />}
          </span>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {hasFindings ? `${summary.totalDetected.toLocaleString()} invisible or unusual ${summary.totalDetected === 1 ? "character" : "characters"} found` : "No supported invisible characters found"}
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600 dark:text-slate-400">
              {hasFindings
                ? `${summary.typesDetected.toLocaleString()} character ${summary.typesDetected === 1 ? "type was" : "types were"} detected. Review the findings below before removing anything.`
                : "The scanner did not find any supported hidden, unusual-space, or directional characters in this text."}
            </p>
          </div>
        </div>

        {hasFindings && (
          <div className="shrink-0 rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-500">Selected cleanup</p>
            <p className="mt-1 text-lg font-bold tabular-nums text-gray-900 dark:text-white">{selectedCount.toLocaleString()} {selectedCount === 1 ? "type" : "types"}</p>
          </div>
        )}
      </div>

      {hasFindings && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Eye} label="Invisible" value={summary.categories.invisible} />
          <Stat icon={Layers3} label="Unusual Spaces" value={summary.categories.space} />
          <Stat icon={AlertTriangle} label="Directional" value={summary.categories.directional} />
          <Stat icon={WandSparkles} label="Changes Previewed" value={changedOccurrences} />
        </div>
      )}
    </section>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-200/80 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
        <Icon size={15} aria-hidden="true" />
        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 text-xl font-bold tabular-nums text-gray-900 dark:text-white">{Number(value || 0).toLocaleString()}</p>
    </div>
  )
}