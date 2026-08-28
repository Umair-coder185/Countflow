export function escapeRegex(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function buildMatcher(
  search,
  {
    regex = false,
    caseSensitive = false,
    wholeWords = false,
  } = {}
) {
  if (typeof search !== "string" || search.length === 0) {
    throw new Error("Find text cannot be empty.")
  }

  const source = regex
    ? search
    : escapeRegex(search)

  const pattern = wholeWords
    ? `\\b(?:${source})\\b`
    : source

  const flags = caseSensitive
    ? "g"
    : "gi"

  let matcher

  try {
    matcher = new RegExp(
      pattern,
      flags
    )
  } catch {
    throw new Error(
      `Invalid regular expression: ${search}`
    )
  }

  matcher.lastIndex = 0

  if (matcher.test("")) {
    matcher.lastIndex = 0

    throw new Error(
      "The search pattern cannot match empty text."
    )
  }

  matcher.lastIndex = 0

  return matcher
}