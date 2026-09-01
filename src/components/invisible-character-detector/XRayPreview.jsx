const MAX_PREVIEW_UNITS = 15_000
const MAX_MARKERS = 300

export default function XRayPreview({ text = "", occurrences = [] }) {
  if (!text || !occurrences.length) return null

  const previewText = text.slice(0, MAX_PREVIEW_UNITS)
  const previewOccurrences = occurrences.filter((item) => item.index < previewText.length).slice(0, MAX_MARKERS)
  const segments = buildSegments(previewText, previewOccurrences)
  const textTruncated = text.length > MAX_PREVIEW_UNITS
  const markersTruncated = occurrences.filter((item) => item.index < previewText.length).length > MAX_MARKERS

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
      <div className="border-b border-gray-200 px-5 py-4 sm:px-6 dark:border-white/10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">X-Ray View</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-slate-400">Invisible characters are replaced with visible Unicode labels so you can see where they appear.</p>
          </div>

          <span className="shrink-0 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">
            {occurrences.length.toLocaleString()} {occurrences.length === 1 ? "finding" : "findings"}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="max-h-[420px] overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm leading-7 text-gray-800 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200">
          <div className="whitespace-pre-wrap break-words">
            {segments.map((segment, index) =>
              segment.type === "finding" ? (
                <FindingMarker key={`${segment.occurrence.id}-${index}`} occurrence={segment.occurrence} />
              ) : (
                <span key={`text-${index}`}>{segment.value}</span>
              )
            )}
          </div>
        </div>

        {(textTruncated || markersTruncated) && (
          <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-slate-500">
            The X-Ray preview is limited for performance. The full text is still scanned and included in the findings report.
          </p>
        )}
      </div>
    </section>
  )
}

function FindingMarker({ occurrence }) {
  const { info } = occurrence
  const spaceCharacter = info.category === "space"

  return (
    <span
      title={`${info.code} — ${info.name} · Line ${occurrence.line}, column ${occurrence.column}`}
      className={`mx-0.5 inline-flex items-center rounded-md border px-1.5 py-0.5 align-middle text-[11px] font-bold leading-4 ${spaceCharacter ? "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300" : info.category === "directional" ? "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-900 dark:bg-violet-950/60 dark:text-violet-300" : "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300"}`}
    >
      {info.code}
    </span>
  )
}

function buildSegments(text, occurrences) {
  if (!text) return []
  if (!occurrences.length) return [{ type: "text", value: text }]

  const segments = []
  let cursor = 0

  for (const occurrence of occurrences) {
    if (occurrence.index < cursor || occurrence.index >= text.length) continue

    if (occurrence.index > cursor) {
      segments.push({ type: "text", value: text.slice(cursor, occurrence.index) })
    }

    segments.push({ type: "finding", occurrence })
    cursor = Math.min(occurrence.end, text.length)
  }

  if (cursor < text.length) {
    segments.push({ type: "text", value: text.slice(cursor) })
  }

  return segments
}