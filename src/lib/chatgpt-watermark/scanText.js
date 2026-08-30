import { getUnicodeInfo } from "./unicodeCatalog"

const CATEGORY_ORDER = {
  hidden: 1,
  space: 2,
  directional: 3,
  blank: 4,
  separator: 5,
  variation: 6,
  typography: 7,
}

export function scanText(text = "") {
  const source = typeof text === "string" ? text : ""
  const occurrences = []

  let utf16Index = 0
  let characterPosition = 1
  let line = 1
  let column = 1

  for (const char of source) {
    const codePoint = char.codePointAt(0)
    const info = getUnicodeInfo(codePoint)
    const length = char.length

    if (info) {
      occurrences.push({
        id: `${info.key}-${utf16Index}`,
        groupKey: info.key,
        char,
        index: utf16Index,
        end: utf16Index + length,
        length,
        characterPosition,
        line,
        column,
        info,
      })
    }

    if (char === "\n") {
      line += 1
      column = 1
    } else {
      column += 1
    }

    utf16Index += length
    characterPosition += 1
  }

  const groupMap = new Map()

  for (const occurrence of occurrences) {
    if (!groupMap.has(occurrence.groupKey)) {
      groupMap.set(occurrence.groupKey, {
        key: occurrence.groupKey,
        ...occurrence.info,
        count: 0,
        positions: [],
        lines: [],
      })
    }

    const group = groupMap.get(occurrence.groupKey)
    group.count += 1
    group.positions.push(occurrence.characterPosition)

    if (!group.lines.includes(occurrence.line)) group.lines.push(occurrence.line)
  }

  const groups = [...groupMap.values()].sort((a, b) => {
    const categoryDifference = (CATEGORY_ORDER[a.category] || 99) - (CATEGORY_ORDER[b.category] || 99)
    if (categoryDifference !== 0) return categoryDifference
    if (b.count !== a.count) return b.count - a.count
    return a.codePoint - b.codePoint
  })

  const categories = {
    hidden: 0,
    space: 0,
    directional: 0,
    variation: 0,
    typography: 0,
    separator: 0,
    blank: 0,
  }

  let recommendedDetected = 0

  for (const occurrence of occurrences) {
    categories[occurrence.info.category] = (categories[occurrence.info.category] || 0) + 1
    if (occurrence.info.recommended) recommendedDetected += 1
  }

  return {
    occurrences,
    groups,
    summary: {
      totalDetected: occurrences.length,
      typesDetected: groups.length,
      recommendedDetected,
      characters: characterPosition - 1,
      utf16Length: source.length,
      lines: source ? line : 0,
      categories,
    },
  }
}