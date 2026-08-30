import { CheckCircle2, ScanSearch } from "lucide-react"

export default function ScanSummary({ summary, cleanupResult }) {
  const clean = summary.totalDetected === 0

  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      <div className={`rounded-xl border p-4 ${clean ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20" : "border-cyan-200 bg-cyan-50/60 dark:border-cyan-900/50 dark:bg-cyan-950/20"}`}>
        <div className="flex items-start gap-3">
          {clean ? <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" /> : <ScanSearch size={20} className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" />}

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{clean ? "No supported hidden or unusual characters detected" : `${summary.totalDetected.toLocaleString()} character finding${summary.totalDetected === 1 ? "" : "s"} detected`}</p>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">{clean ? "The scanner did not find any character types currently covered by this checker." : `${summary.typesDetected} Unicode character type${summary.typesDetected === 1 ? "" : "s"} found. Review the X-Ray view and choose what you want to clean.`}</p>
          </div>
        </div>
      </div>

      {!clean && (
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Stat label="Hidden" value={summary.categories.hidden} />
          <Stat label="Unusual Spaces" value={summary.categories.space} />
          <Stat label="Directional" value={summary.categories.directional} />
          <Stat label="Typography" value={summary.categories.typography} />
          <Stat label="Selected Changes" value={cleanupResult.changedOccurrences} />
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-slate-950">
      <p className="text-xs text-gray-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
    </div>
  )
}