import { Check, CircleAlert, Eraser, RotateCcw } from "lucide-react"

export default function CharacterList({ groups = [], selectedKeys = new Set(), onToggle, onSelectRecommended, onSelectAll, onClear }) {
  if (!groups.length) return null

  const selectedCount = selectedKeys.size
  const recommendedCount = groups.filter((group) => group.recommended).length

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
      <div className="border-b border-gray-200 px-5 py-4 sm:px-6 dark:border-white/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Detected Characters</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-slate-400">Review each character type before removing or normalizing it.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton onClick={onSelectRecommended} icon={Eraser}>Recommended{recommendedCount ? ` (${recommendedCount})` : ""}</ActionButton>
            <ActionButton onClick={onSelectAll} icon={Check}>Select All</ActionButton>
            <ActionButton onClick={onClear} icon={RotateCcw}>Clear</ActionButton>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-white/10">
        {groups.map((group) => (
          <CharacterRow key={group.key} group={group} selected={selectedKeys.has(group.key)} onToggle={() => onToggle(group.key)} />
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-gray-200 bg-gray-50 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/10 dark:bg-slate-950/40">
        <p className="text-gray-500 dark:text-slate-400">
          {selectedCount.toLocaleString()} of {groups.length.toLocaleString()} character {groups.length === 1 ? "type" : "types"} selected
        </p>

        <p className="text-xs text-gray-500 dark:text-slate-500">Recommended cleanup avoids automatically selecting language-sensitive characters.</p>
      </div>
    </section>
  )
}

function CharacterRow({ group, selected, onToggle }) {
  const positions = group.positions.slice(0, 8)
  const remainingPositions = Math.max(0, group.positions.length - positions.length)

  return (
    <div className={`p-5 transition sm:p-6 ${selected ? "bg-cyan-50/40 dark:bg-cyan-950/10" : "bg-white dark:bg-slate-900"}`}>
      <div className="flex items-start gap-4">
        <label className="mt-1 flex shrink-0 cursor-pointer items-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-600 dark:bg-slate-950 dark:text-cyan-400"
          />
          <span className="sr-only">{selected ? "Deselect" : "Select"} {group.name}</span>
        </label>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-700 dark:bg-slate-800 dark:text-slate-200">{group.code}</code>

                <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>

                <CategoryBadge category={group.category}>{group.categoryLabel}</CategoryBadge>

                {group.recommended && (
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Recommended
                  </span>
                )}
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-slate-400">{group.description}</p>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-500">Found</p>
              <p className="mt-1 text-xl font-bold tabular-nums text-gray-900 dark:text-white">{group.count.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <InfoBlock label="Action">
              <ActionValue group={group} />
            </InfoBlock>

            <InfoBlock label="First positions">
              <div className="flex flex-wrap gap-1.5">
                {positions.map((position, index) => {
                  const location = group.locations[index]

                  return (
                    <span key={`${group.key}-${position}-${index}`} title={location ? `Line ${location.line}, column ${location.column}` : undefined} className="rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-xs text-gray-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
                      {position}
                    </span>
                  )
                })}

                {remainingPositions > 0 && (
                  <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 dark:border-white/10 dark:bg-slate-950 dark:text-slate-400">
                    +{remainingPositions.toLocaleString()} more
                  </span>
                )}
              </div>
            </InfoBlock>
          </div>

          {!group.recommended && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2.5 dark:border-amber-900/50 dark:bg-amber-950/20">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden="true" />
              <p className="text-xs leading-5 text-amber-800 dark:text-amber-200">Review this character before removing it because it may have a legitimate formatting, language, or directional purpose.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ActionValue({ group }) {
  if (group.action === "normalize") return <span className="font-medium text-blue-700 dark:text-blue-300">Normalize to standard space</span>
  if (group.action === "remove") return <span className="font-medium text-emerald-700 dark:text-emerald-300">Remove character</span>
  return <span className="font-medium text-amber-700 dark:text-amber-300">Review manually</span>
}

function InfoBlock({ label, children }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-slate-500">{label}</p>
      {children}
    </div>
  )
}

function CategoryBadge({ category, children }) {
  const styles = {
    invisible: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    space: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    directional: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[category] || "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300"}`}>
      {children}
    </span>
  )
}

function ActionButton({ onClick, icon: Icon, children }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-300">
      <Icon size={14} aria-hidden="true" />
      {children}
    </button>
  )
}