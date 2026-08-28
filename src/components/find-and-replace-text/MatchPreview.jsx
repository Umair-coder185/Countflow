const PREVIEW_CHARS = 20_000
const MAX_HIGHLIGHTS = 200

function escapeRegex(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  )
}

function createMatcher(
  search,
  options
) {
  if (!search) {
    return null
  }

  const source =
    options.regex
      ? search
      : escapeRegex(search)

  const pattern =
    options.wholeWords
      ? `\\b(?:${source})\\b`
      : source

  const flags =
    options.caseSensitive
      ? "g"
      : "gi"

  try {
    const matcher =
      new RegExp(pattern, flags)

    matcher.lastIndex = 0

    if (matcher.test("")) {
      return null
    }

    matcher.lastIndex = 0

    return matcher
  } catch {
    return null
  }
}

function getPreviewMatches(
  text,
  rules,
  options
) {
  const matches = []

  for (
    let ruleIndex = 0;
    ruleIndex < rules.length;
    ruleIndex += 1
  ) {
    const rule =
      rules[ruleIndex]

    const matcher =
      createMatcher(
        rule.search,
        options
      )

    if (!matcher) {
      continue
    }

    for (const match of text.matchAll(
      matcher
    )) {
      if (
        matches.length >=
        MAX_HIGHLIGHTS
      ) {
        break
      }

      matches.push({
        start: match.index,
        end:
          match.index +
          match[0].length,
        text: match[0],
        ruleIndex,
      })
    }

    if (
      matches.length >=
      MAX_HIGHLIGHTS
    ) {
      break
    }
  }

  matches.sort(
    (a, b) =>
      a.start - b.start ||
      a.ruleIndex -
        b.ruleIndex ||
      b.end - a.end
  )

  const accepted = []
  let cursor = 0

  for (const match of matches) {
    if (match.start < cursor) {
      continue
    }

    accepted.push(match)
    cursor = match.end
  }

  return accepted
}

function buildSegments(
  text,
  matches
) {
  const segments = []
  let cursor = 0

  matches.forEach(
    (match, index) => {
      if (match.start > cursor) {
        segments.push({
          type: "text",
          value: text.slice(
            cursor,
            match.start
          ),
          key: `text-${index}`,
        })
      }

      segments.push({
        type: "match",
        value: match.text,
        ruleIndex:
          match.ruleIndex,
        key: `match-${index}`,
      })

      cursor = match.end
    }
  )

  if (cursor < text.length) {
    segments.push({
      type: "text",
      value:
        text.slice(cursor),
      key: "text-last",
    })
  }

  return segments
}

export default function MatchPreview({
  input,
  rules,
  options,
}) {
  const activeRules =
    rules.filter(
      (rule) =>
        rule.search.length > 0
    )

  if (
    !input ||
    !activeRules.length
  ) {
    return null
  }

  const previewText =
    input.slice(
      0,
      PREVIEW_CHARS
    )

  const matches =
    getPreviewMatches(
      previewText,
      activeRules,
      options
    )

  if (!matches.length) {
    return null
  }

  const segments =
    buildSegments(
      previewText,
      matches
    )

  const isTruncated =
    input.length >
    PREVIEW_CHARS

  const highlightsLimited =
    matches.length >=
    MAX_HIGHLIGHTS

  return (
    <div className="border-t border-gray-200 p-5 dark:border-white/10 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Match Preview
          </h3>

          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
            Preview matching text before replacing it.
          </p>
        </div>

        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
          {matches.length.toLocaleString()}{" "}
          preview matches
        </span>
      </div>

      <div className="max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200">
        {segments.map(
          (segment) =>
            segment.type ===
            "match" ? (
              <mark
                key={segment.key}
                className="rounded bg-cyan-200 px-0.5 text-gray-950 dark:bg-cyan-700 dark:text-white"
              >
                {segment.value}
              </mark>
            ) : (
              <span
                key={segment.key}
              >
                {segment.value}
              </span>
            )
        )}
      </div>

      {isTruncated ||
      highlightsLimited ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
          Preview is limited for performance. The full text is processed when you select Replace Text.
        </p>
      ) : null}
    </div>
  )
}