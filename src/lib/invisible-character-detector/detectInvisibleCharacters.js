import { getInvisibleCharacterInfo } from "./unicodeCatalog"

export function detectInvisibleCharacters(text = "") {
  const source = typeof text === "string" ? text : String(text ?? "")

  if (!source) {
    return {
      occurrences: [],
      groups: [],
      summary: createEmptySummary(),
    }
  }

  const occurrences = []
  const groupMap = new Map()

  let utf16Index = 0
  let characterPosition = 1
  let line = 1
  let column = 1
  let previousWasCarriageReturn = false

  for (const char of source) {
    const codePoint = char.codePointAt(0)
    const info = getInvisibleCharacterInfo(codePoint)
    const charLength = char.length

    if (info) {
      const occurrence = {
        id: `${info.code}-${utf16Index}`,
        groupKey: info.code,
        char,
        index: utf16Index,
        end: utf16Index + charLength,
        length: charLength,
        characterPosition,
        line,
        column,
        info,
      }

      occurrences.push(occurrence)

      const existingGroup = groupMap.get(info.code)

      if (existingGroup) {
        existingGroup.count += 1
        existingGroup.positions.push(characterPosition)
        existingGroup.indices.push(utf16Index)
        existingGroup.locations.push({ line, column })
      } else {
        groupMap.set(info.code, {
          key: info.code,
          ...info,
          count: 1,
          positions: [characterPosition],
          indices: [utf16Index],
          locations: [{ line, column }],
        })
      }
    }

    utf16Index += charLength
    characterPosition += 1

    if (char === "\r") {
      line += 1
      column = 1
      previousWasCarriageReturn = true
      continue
    }

    if (char === "\n") {
      if (!previousWasCarriageReturn) line += 1
      column = 1
      previousWasCarriageReturn = false
      continue
    }

    previousWasCarriageReturn = false
    column += 1
  }

  const groups = Array.from(groupMap.values()).sort(sortGroups)
  const categoryCounts = countCategories(occurrences)

  return {
    occurrences,
    groups,
    summary: {
      totalDetected: occurrences.length,
      typesDetected: groups.length,
      recommendedDetected: occurrences.reduce(
        (total, occurrence) => total + (occurrence.info.recommended ? 1 : 0),
        0
      ),
      characters: characterPosition - 1,
      utf16Length: source.length,
      lines: line,
      categories: categoryCounts,
    },
  }
}

function createEmptySummary() {
  return {
    totalDetected: 0,
    typesDetected: 0,
    recommendedDetected: 0,
    characters: 0,
    utf16Length: 0,
    lines: 0,
    categories: {
      invisible: 0,
      space: 0,
      directional: 0,
    },
  }
}

function countCategories(occurrences) {
  const counts = {
    invisible: 0,
    space: 0,
    directional: 0,
  }

  for (const occurrence of occurrences) {
    const category = occurrence.info.category

    if (Object.prototype.hasOwnProperty.call(counts, category)) {
      counts[category] += 1
    }
  }

  return counts
}

function sortGroups(a, b) {
  const categoryOrder = {
    invisible: 0,
    space: 1,
    directional: 2,
  }

  const categoryDifference =
    (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99)

  if (categoryDifference !== 0) return categoryDifference
  if (a.recommended !== b.recommended) return a.recommended ? -1 : 1
  if (a.count !== b.count) return b.count - a.count

  return a.codePoint - b.codePoint
}