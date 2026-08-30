function actionText(group) {
  if (group.replacement === "") return "Remove"
  if (group.replacement === " ") return "Normal space"
  return `Replace with ${JSON.stringify(group.replacement)}`
}

function categoryStyle(category) {
  if (category === "hidden") return "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
  if (category === "space") return "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
  if (category === "directional") return "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
  if (category === "typography") return "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
  return "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300"
}

export default function CharacterFindings({ groups, selectedKeys, onToggle }) {
  if (!groups.length) return null

  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">Character Findings</h3>
        <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-slate-400">Inspect each Unicode character type, its code point, count and location before removing or normalizing it.</p>
      </div>

      <div className="mt-5 space-y-3">
        {groups.map((group) => {
          const selected = selectedKeys.has(group.key)

          return (
            <article key={group.key} className={`rounded-xl border p-4 transition ${selected ? "border-cyan-300 bg-cyan-50/40 dark:border-cyan-900 dark:bg-cyan-950/10" : "border-gray-200 bg-gray-50/60 dark:border-white/10 dark:bg-slate-950/40"}`}>
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={selected} onChange={() => onToggle(group.key)} aria-label={`Select ${group.name}`} className="mt-1 h-4 w-4 shrink-0 accent-cyan-600" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="rounded bg-slate-900 px-2 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-950">{group.code}</code>

                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{group.name}</h4>

                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${categoryStyle(group.category)}`}>{group.categoryLabel}</span>

                    {group.recommended && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">Recommended</span>}
                  </div>

                  {group.description && <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{group.description}</p>}

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 dark:text-slate-400">
                    <span><strong className="text-gray-700 dark:text-slate-300">Count:</strong> {group.count}</span>
                    <span><strong className="text-gray-700 dark:text-slate-300">Action:</strong> {actionText(group)}</span>
                    <span><strong className="text-gray-700 dark:text-slate-300">Positions:</strong> {group.positions.slice(0, 8).join(", ")}{group.positions.length > 8 ? ` +${group.positions.length - 8}` : ""}</span>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}