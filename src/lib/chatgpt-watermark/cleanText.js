export function applyCleanup(text = "", occurrences = [], selectedKeys = new Set()) {
  const source = typeof text === "string" ? text : ""
  const selected = selectedKeys instanceof Set ? selectedKeys : new Set(selectedKeys || [])

  const changes = occurrences
    .filter((occurrence) => selected.has(occurrence.groupKey))
    .sort((a, b) => b.index - a.index)

  if (!changes.length) {
    return {
      text: source,
      changedOccurrences: 0,
      removedOccurrences: 0,
      normalizedOccurrences: 0,
    }
  }

  let output = source
  let removedOccurrences = 0
  let normalizedOccurrences = 0

  for (const occurrence of changes) {
    const replacement = occurrence.info.replacement ?? ""

    output = output.slice(0, occurrence.index) + replacement + output.slice(occurrence.end)

    if (replacement === "") removedOccurrences += 1
    else normalizedOccurrences += 1
  }

  return {
    text: output,
    changedOccurrences: changes.length,
    removedOccurrences,
    normalizedOccurrences,
  }
}