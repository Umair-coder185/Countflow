const MAX_PREVIEW_UNITS = 15_000
const MAX_MARKERS = 300

export default function XRayPreview({ input, occurrences }) {
  if (!input || !occurrences.length) return null

  const preview = input.slice(0, MAX_PREVIEW_UNITS)
  const visible = occurrences.filter((occurrence) => occurrence.index < preview.length).slice(0, MAX_MARKERS)

  const segments = []
  let cursor = 0

  visible.forEach((occurrence, index) => {
    if (occurrence.index < cursor) return

    if (occurrence.index > cursor) {
      segments.push({ type: "text", value: preview.slice(cursor, occurrence.index), key: `text-${index}` })
    }

    segments.push({ type: "finding", occurrence, key: `finding-${index}` })
    cursor = occurrence.end
  })

  if (cursor < preview.length) segments.push({ type: "text", value: preview.slice(cursor), key: "text-last" })

  const limited = input.length > preview.length || occurrences.length > visible.length

  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">X-Ray Character View</h3>
        <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-slate-400">Invisible characters are replaced visually with Unicode labels so you can see exactly where they occur.</p>
      </div>

      <div className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm leading-7 text-gray-800 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200">
        {segments.map((segment) => {
          if (segment.type === "text") return <span key={segment.key}>{segment.value}</span>

          const { occurrence } = segment
          const typography = occurrence.info.category === "typography"

          if (typography) {
            return (
              <mark key={segment.key} title={`${occurrence.info.name} · ${occurrence.info.code}`} className="rounded bg-violet-200 px-0.5 text-gray-950 dark:bg-violet-800 dark:text-white">
                {occurrence.char}
              </mark>
            )
          }

          return (
            <span key={segment.key} title={`${occurrence.info.name} · line ${occurrence.line}, column ${occurrence.column}`} className="mx-0.5 inline-flex rounded bg-cyan-200 px-1.5 py-0.5 text-[11px] font-bold leading-5 text-cyan-950 dark:bg-cyan-800 dark:text-cyan-50">
              {occurrence.info.code}
            </span>
          )
        })}
      </div>

      {limited && <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-slate-400">The X-Ray preview is capped for performance. The full text is still scanned and cleaned.</p>}
    </div>
  )
}