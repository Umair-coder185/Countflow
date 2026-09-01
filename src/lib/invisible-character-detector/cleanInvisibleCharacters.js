export function cleanInvisibleCharacters(text = "", occurrences = [], selectedKeys = new Set()) {
  const source = typeof text === "string" ? text : String(text ?? "")
  const selected = normalizeSelectedKeys(selectedKeys)

  if (!source || !occurrences.length || !selected.size) return createResult(source)

  const targets = occurrences
    .filter((occurrence) => selected.has(occurrence.groupKey) && isValidOccurrence(occurrence, source.length))
    .sort((a, b) => b.index - a.index)

  if (!targets.length) return createResult(source)

  let cleanedText = source
  let changedOccurrences = 0
  let removedOccurrences = 0
  let normalizedOccurrences = 0
  const changedGroups = new Set()

  for (const occurrence of targets) {
    const replacement = typeof occurrence.info?.replacement === "string" ? occurrence.info.replacement : ""
    const original = cleanedText.slice(occurrence.index, occurrence.end)

    if (original !== occurrence.char || original === replacement) continue

    cleanedText = `${cleanedText.slice(0, occurrence.index)}${replacement}${cleanedText.slice(occurrence.end)}`
    changedOccurrences += 1
    changedGroups.add(occurrence.groupKey)

    if (replacement === "") removedOccurrences += 1
    else normalizedOccurrences += 1
  }

  return {
    text: cleanedText,
    changed: cleanedText !== source,
    changedOccurrences,
    removedOccurrences,
    normalizedOccurrences,
    changedTypes: changedGroups.size,
  }
}

export function cleanRecommendedCharacters(text = "", occurrences = []) {
  const recommendedKeys = new Set(
    occurrences
      .filter((occurrence) => occurrence.info?.recommended)
      .map((occurrence) => occurrence.groupKey)
  )

  return cleanInvisibleCharacters(text, occurrences, recommendedKeys)
}

function normalizeSelectedKeys(selectedKeys) {
  if (selectedKeys instanceof Set) return selectedKeys
  if (Array.isArray(selectedKeys)) return new Set(selectedKeys)
  if (selectedKeys && typeof selectedKeys[Symbol.iterator] === "function") return new Set(selectedKeys)
  return new Set()
}

function isValidOccurrence(occurrence, textLength) {
  return Number.isInteger(occurrence?.index) && Number.isInteger(occurrence?.end) && occurrence.index >= 0 && occurrence.end > occurrence.index && occurrence.end <= textLength && typeof occurrence.groupKey === "string"
}

function createResult(text) {
  return { text, changed: false, changedOccurrences: 0, removedOccurrences: 0, normalizedOccurrences: 0, changedTypes: 0 }
}