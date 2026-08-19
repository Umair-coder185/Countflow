// lib/text-compare/normalizeText.js
// Safe text normalization helpers for Text Compare.
// No HTML parsing, code execution, eval(), or remote processing.

export function normalizeLineEndings(text = "") {
  return String(text).replace(/\r\n?/g, "\n")
}

export function normalizeWhitespace(text = "") {
  return String(text)
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
}

export function normalizeForComparison(
  text = "",
  {
    ignoreWhitespace = false,
    normalizeLines = true,
  } = {}
) {
  let value = String(text)

  if (normalizeLines) {
    value = normalizeLineEndings(value)
  }

  if (ignoreWhitespace) {
    value = normalizeWhitespace(value)
  }

  return value
}