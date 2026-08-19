// lib/text-compare/compareText.js
//
// CountFlows Text Compare
// Pure JavaScript — ZERO external dependencies.
//
// No npm diff library.
// No API.
// No backend.
// No eval().
// User input is treated only as text.
//
// IMPORTANT:
// For maximum UI protection, this function should ultimately
// run inside textCompareWorker.js rather than directly on
// React's main thread.

import { normalizeLineEndings } from "./normalizeText"

import {
  buildComparisonStats,
  calculateSimilarity,
} from "./similarity"


// ---------------------------------------------------------
// GLOBAL SAFETY LIMITS
// ---------------------------------------------------------

export const MAX_INPUT_CHARS = 250_000

export const MAX_FILE_BYTES =
  1_048_576 // 1 MiB


// Different modes have different computational costs.

const MODE_LIMITS = {
  character: {
    maxChars: 40_000,
    maxTokens: 40_000,
  },

  word: {
    maxChars: 150_000,
    maxTokens: 30_000,
  },

  line: {
    maxChars: 250_000,
    maxTokens: 20_000,
  },
}


// Stop pathological comparisons.

const MAX_EDIT_DISTANCE = 4_000

// This is a secondary safeguard.
// The real hard timeout should be enforced by the Web Worker
// from the main thread using worker.terminate().

const INTERNAL_TIME_LIMIT_MS = 700


// ---------------------------------------------------------
// TIME
// ---------------------------------------------------------

function now() {
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    return performance.now()
  }

  return Date.now()
}


// ---------------------------------------------------------
// TOKENIZATION
// ---------------------------------------------------------

function tokenizeCharacters(text) {
  // Array.from handles Unicode code points better
  // than text.split("")
  return Array.from(text)
}


function tokenizeLines(text) {
  if (!text) {
    return []
  }

  return (
    text.match(/[^\n]*\n|[^\n]+$/g) || []
  )
}


function tokenizeWords(text) {
  if (!text) {
    return []
  }

  /*
   * Keeps:
   *
   * words
   * numbers
   * whitespace
   * punctuation
   *
   * as separate tokens.
   */

  return (
    text.match(
      /[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*|\s+|[^\s\p{L}\p{N}]+/gu
    ) || []
  )
}


function tokenize(text, mode) {
  switch (mode) {
    case "character":
      return tokenizeCharacters(text)

    case "line":
      return tokenizeLines(text)

    case "word":
    default:
      return tokenizeWords(text)
  }
}


// ---------------------------------------------------------
// COMPARISON KEYS
// ---------------------------------------------------------

function createComparisonKey(
  token,
  mode,
  options
) {
  let value = token

  if (options.ignoreWhitespace) {
    if (mode === "word") {
      if (/^\s+$/u.test(value)) {
        value = " "
      }
    }

    if (mode === "line") {
      value = value
        .replace(/[ \t]+/g, " ")
        .replace(/ +\n$/g, "\n")
    }
  }

  if (options.ignoreCase) {
    value = value.toLocaleLowerCase()
  }

  return value
}


// ---------------------------------------------------------
// VALIDATION
// ---------------------------------------------------------

function validateInputs(
  original,
  revised,
  mode
) {
  if (
    original.length > MAX_INPUT_CHARS ||
    revised.length > MAX_INPUT_CHARS
  ) {
    return (
      `Each text is limited to ` +
      `${MAX_INPUT_CHARS.toLocaleString()} characters.`
    )
  }

  const limits =
    MODE_LIMITS[mode] ||
    MODE_LIMITS.word

  if (
    original.length > limits.maxChars ||
    revised.length > limits.maxChars
  ) {
    if (mode === "character") {
      return (
        "Character comparison is designed for shorter text. " +
        "Use Word or Line mode for large documents."
      )
    }

    if (mode === "word") {
      return (
        "This text is too large for Word mode. " +
        "Use Line mode for large documents."
      )
    }
  }

  return null
}


// ---------------------------------------------------------
// PREFIX / SUFFIX OPTIMIZATION
//
// Large documents often contain mostly identical text.
// Removing identical beginnings and endings before running
// Myers dramatically reduces work.
// ---------------------------------------------------------

function trimCommonEdges(
  originalTokens,
  revisedTokens,
  originalKeys,
  revisedKeys
) {
  let start = 0

  const originalLength =
    originalTokens.length

  const revisedLength =
    revisedTokens.length


  while (
    start < originalLength &&
    start < revisedLength &&
    originalKeys[start] === revisedKeys[start]
  ) {
    start += 1
  }


  let originalEnd =
    originalLength - 1

  let revisedEnd =
    revisedLength - 1


  while (
    originalEnd >= start &&
    revisedEnd >= start &&
    originalKeys[originalEnd] ===
      revisedKeys[revisedEnd]
  ) {
    originalEnd -= 1
    revisedEnd -= 1
  }


  return {
    prefix:
      originalTokens.slice(
        0,
        start
      ),

    originalMiddle:
      originalTokens.slice(
        start,
        originalEnd + 1
      ),

    revisedMiddle:
      revisedTokens.slice(
        start,
        revisedEnd + 1
      ),

    originalMiddleKeys:
      originalKeys.slice(
        start,
        originalEnd + 1
      ),

    revisedMiddleKeys:
      revisedKeys.slice(
        start,
        revisedEnd + 1
      ),

    suffix:
      originalTokens.slice(
        originalEnd + 1
      ),
  }
}


// ---------------------------------------------------------
// MYERS DIFF
//
// O((N + M)D)
//
// D = edit distance.
//
// We also impose:
// - time limit
// - maximum edit distance
// - token limits
//
// This prevents uncontrolled computation.
// ---------------------------------------------------------

function myersDiff(
  originalTokens,
  revisedTokens,
  originalKeys,
  revisedKeys
) {
  const n =
    originalTokens.length

  const m =
    revisedTokens.length


  if (n === 0) {
    return revisedTokens.map(
      (value) => ({
        type: "added",
        value,
      })
    )
  }


  if (m === 0) {
    return originalTokens.map(
      (value) => ({
        type: "removed",
        value,
      })
    )
  }


  const startedAt = now()

  const max =
    Math.min(
      n + m,
      MAX_EDIT_DISTANCE
    )


  let vector =
    new Map()

  vector.set(1, 0)


  const trace = []


  for (
    let distance = 0;
    distance <= max;
    distance += 1
  ) {
    if (
      now() - startedAt >
      INTERNAL_TIME_LIMIT_MS
    ) {
      return null
    }


    trace.push(
      new Map(vector)
    )


    for (
      let diagonal = -distance;
      diagonal <= distance;
      diagonal += 2
    ) {
      let x


      const left =
        vector.get(
          diagonal - 1
        )

      const right =
        vector.get(
          diagonal + 1
        )


      if (
        diagonal === -distance ||
        (
          diagonal !== distance &&
          (left ?? -1) <
            (right ?? -1)
        )
      ) {
        x =
          right ?? 0
      } else {
        x =
          (left ?? 0) + 1
      }


      let y =
        x - diagonal


      while (
        x < n &&
        y < m &&
        originalKeys[x] ===
          revisedKeys[y]
      ) {
        x += 1
        y += 1
      }


      vector.set(
        diagonal,
        x
      )


      if (
        x >= n &&
        y >= m
      ) {
        return backtrack(
          trace,
          originalTokens,
          revisedTokens
        )
      }
    }
  }


  return null
}


// ---------------------------------------------------------
// BACKTRACK MYERS RESULT
// ---------------------------------------------------------

function backtrack(
  trace,
  originalTokens,
  revisedTokens
) {
  let x =
    originalTokens.length

  let y =
    revisedTokens.length


  const result = []


  for (
    let distance =
      trace.length - 1;

    distance >= 0;

    distance -= 1
  ) {
    const vector =
      trace[distance]


    const diagonal =
      x - y


    let previousDiagonal


    const left =
      vector.get(
        diagonal - 1
      )

    const right =
      vector.get(
        diagonal + 1
      )


    if (
      diagonal === -distance ||
      (
        diagonal !== distance &&
        (left ?? -1) <
          (right ?? -1)
      )
    ) {
      previousDiagonal =
        diagonal + 1
    } else {
      previousDiagonal =
        diagonal - 1
    }


    const previousX =
      vector.get(
        previousDiagonal
      ) ?? 0


    const previousY =
      previousX -
      previousDiagonal


    // Unchanged diagonal section

    while (
      x > previousX &&
      y > previousY
    ) {
      result.push({
        type: "equal",

        value:
          originalTokens[
            x - 1
          ],
      })

      x -= 1
      y -= 1
    }


    if (distance === 0) {
      break
    }


    if (x === previousX) {
      // Addition

      result.push({
        type: "added",

        value:
          revisedTokens[
            y - 1
          ],
      })

      y -= 1
    } else {
      // Removal

      result.push({
        type: "removed",

        value:
          originalTokens[
            x - 1
          ],
      })

      x -= 1
    }
  }


  return result.reverse()
}


// ---------------------------------------------------------
// MERGE NEIGHBORING OPERATIONS
//
// Instead of returning:
//
// removed: "h"
// removed: "e"
// removed: "l"
//
// return:
//
// removed: "hel"
//
// This greatly reduces React DOM nodes.
// ---------------------------------------------------------

function mergeChanges(changes) {
  const merged = []


  for (const change of changes) {
    if (!change.value) {
      continue
    }


    const previous =
      merged[
        merged.length - 1
      ]


    if (
      previous &&
      previous.type ===
        change.type
    ) {
      previous.value +=
        change.value

      continue
    }


    merged.push({
      type:
        change.type,

      value:
        change.value,
    })
  }


  return merged
}


// ---------------------------------------------------------
// DIFFERENCE INDEX
// ---------------------------------------------------------

function addDifferenceIndexes(
  changes
) {
  let differenceIndex = 0


  const indexed =
    changes.map(
      (change) => {
        const isDifference =
          change.type !==
          "equal"


        const result = {
          ...change,

          differenceIndex:
            isDifference
              ? differenceIndex
              : null,
        }


        if (isDifference) {
          differenceIndex += 1
        }


        return result
      }
    )


  return {
    changes: indexed,

    differenceCount:
      differenceIndex,
  }
}


// ---------------------------------------------------------
// MAIN COMPARISON
// ---------------------------------------------------------

export function compareText(
  originalText = "",
  revisedText = "",
  mode = "word",
  options = {}
) {
  const rawOriginal =
    String(
      originalText ?? ""
    )

  const rawRevised =
    String(
      revisedText ?? ""
    )


  const validationError =
    validateInputs(
      rawOriginal,
      rawRevised,
      mode
    )


  if (validationError) {
    return {
      error:
        validationError,
    }
  }


  // Only normalize line-ending differences
  // between Windows / Unix.

  const original =
    normalizeLineEndings(
      rawOriginal
    )

  const revised =
    normalizeLineEndings(
      rawRevised
    )


  // Fast path:
  // completely identical text.

  if (original === revised) {
    const changes = original
      ? [
          {
            type: "equal",
            value: original,
          },
        ]
      : []


    return {
      changes,

      differenceCount: 0,

      similarity: 100,

      stats:
        buildComparisonStats({
          changes,

          originalText:
            rawOriginal,

          revisedText:
            rawRevised,
        }),
    }
  }


  const originalTokens =
    tokenize(
      original,
      mode
    )


  const revisedTokens =
    tokenize(
      revised,
      mode
    )


  const modeLimits =
    MODE_LIMITS[mode] ||
    MODE_LIMITS.word


  if (
    originalTokens.length >
      modeLimits.maxTokens ||
    revisedTokens.length >
      modeLimits.maxTokens
  ) {
    return {
      error:
        mode === "line"
          ? "This document contains too many lines for one comparison. Compare it in smaller sections."
          : "This comparison contains too many elements for this mode. Try Line mode or compare smaller sections.",
    }
  }


  const normalizedOptions = {
    ignoreCase:
      Boolean(
        options.ignoreCase
      ),

    ignoreWhitespace:
      Boolean(
        options.ignoreWhitespace
      ),
  }


  const originalKeys =
    originalTokens.map(
      (token) =>
        createComparisonKey(
          token,
          mode,
          normalizedOptions
        )
    )


  const revisedKeys =
    revisedTokens.map(
      (token) =>
        createComparisonKey(
          token,
          mode,
          normalizedOptions
        )
    )


  const trimmed =
    trimCommonEdges(
      originalTokens,
      revisedTokens,
      originalKeys,
      revisedKeys
    )


  const middleResult =
    myersDiff(
      trimmed.originalMiddle,
      trimmed.revisedMiddle,
      trimmed.originalMiddleKeys,
      trimmed.revisedMiddleKeys
    )


  if (!middleResult) {
    return {
      error:
        "This comparison is too complex for the selected mode. Try Line mode or compare the document in smaller sections.",
    }
  }


  const combined = []


  if (
    trimmed.prefix.length
  ) {
    combined.push({
      type: "equal",

      value:
        trimmed.prefix.join(""),
    })
  }


  combined.push(
    ...middleResult
  )


  if (
    trimmed.suffix.length
  ) {
    combined.push({
      type: "equal",

      value:
        trimmed.suffix.join(""),
    })
  }


  const merged =
    mergeChanges(
      combined
    )


  const indexed =
    addDifferenceIndexes(
      merged
    )


  return {
    changes:
      indexed.changes,

    differenceCount:
      indexed.differenceCount,

    similarity:
      calculateSimilarity(
        merged,
        original,
        revised
      ),

    stats:
      buildComparisonStats({
        changes: merged,

        originalText:
          rawOriginal,

        revisedText:
          rawRevised,
      }),
  }
}