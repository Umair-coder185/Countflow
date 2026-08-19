// lib/text-compare/similarity.js
// Pure calculation helpers for similarity and comparison statistics.

const WORD_RE = /[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu

export function countWords(text = "") {
  if (!text) return 0

  return String(text).match(WORD_RE)?.length ?? 0
}

export function calculateSimilarity(
  changes,
  originalText,
  revisedText
) {
  const original = String(originalText ?? "")
  const revised = String(revisedText ?? "")

  const longestLength = Math.max(
    original.length,
    revised.length
  )

  if (longestLength === 0) {
    return 100
  }

  const unchangedCharacters = changes
    .filter(
      (change) =>
        !change.added &&
        !change.removed
    )
    .reduce(
      (total, change) =>
        total + change.value.length,
      0
    )

  const score =
    (unchangedCharacters / longestLength) * 100

  return Math.max(
    0,
    Math.min(100, score)
  )
}

export function calculateChangeStats(changes) {
  let addedCharacters = 0
  let removedCharacters = 0

  let addedWords = 0
  let removedWords = 0

  let changeRuns = 0

  for (const change of changes) {
    if (!change.added && !change.removed) {
      continue
    }

    changeRuns += 1

    if (change.added) {
      addedCharacters += change.value.length
      addedWords += countWords(change.value)
    }

    if (change.removed) {
      removedCharacters += change.value.length
      removedWords += countWords(change.value)
    }
  }

  return {
    addedCharacters,
    removedCharacters,
    addedWords,
    removedWords,
    changeRuns,
  }
}

export function buildComparisonStats({
  changes,
  originalText,
  revisedText,
}) {
  const original = String(
    originalText ?? ""
  )

  const revised = String(
    revisedText ?? ""
  )

  return {
    originalWords:
      countWords(original),

    revisedWords:
      countWords(revised),

    originalCharacters:
      original.length,

    revisedCharacters:
      revised.length,

    ...calculateChangeStats(changes),
  }
}