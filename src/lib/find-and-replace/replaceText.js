import { buildMatcher } from "./buildMatcher"

function cleanRules(rules = []) {
  return rules
    .map((rule, index) => ({
      id: rule.id ?? index,
      search:
        typeof rule.search === "string"
          ? rule.search
          : "",
      replace:
        typeof rule.replace === "string"
          ? rule.replace
          : "",
      index,
    }))
    .filter(
      (rule) => rule.search.length > 0
    )
}

function expandRegexReplacement(
  template,
  match,
  input
) {
  return template.replace(
    /\$(\$|&|`|'|<[^>]+>|\d{1,2})/g,
    (token, key) => {
      /*
       * $$
       * Literal dollar sign
       */
      if (key === "$") {
        return "$"
      }

      /*
       * $&
       * Entire match
       */
      if (key === "&") {
        return match[0]
      }

      /*
       * $`
       * Text before match
       */
      if (key === "`") {
        return input.slice(
          0,
          match.index
        )
      }

      /*
       * $'
       * Text after match
       */
      if (key === "'") {
        return input.slice(
          match.index +
            match[0].length
        )
      }

      /*
       * $<name>
       * Named capture group
       */
      if (
        key.startsWith("<") &&
        key.endsWith(">")
      ) {
        if (!match.groups) {
          return token
        }

        const name =
          key.slice(1, -1)

        return (
          match.groups[name] ?? ""
        )
      }

      /*
       * $1 ... $99
       * Numbered capture groups
       */
      const groupNumber =
        Number(key)

      if (
        groupNumber > 0 &&
        groupNumber <
          match.length
      ) {
        return (
          match[groupNumber] ?? ""
        )
      }

      /*
       * Native JS behavior for cases
       * such as $12 when group 12
       * does not exist but group 1 does.
       */
      if (key.length === 2) {
        const firstDigit =
          Number(key[0])

        if (
          firstDigit > 0 &&
          firstDigit <
            match.length
        ) {
          return `${
            match[firstDigit] ?? ""
          }${key[1]}`
        }
      }

      return token
    }
  )
}

function replaceSequential(
  text,
  rules,
  options
) {
  let output = text

  let totalReplacements = 0

  const ruleStats = []

  for (const rule of rules) {
    const matcher =
      buildMatcher(
        rule.search,
        options
      )

    const matches = [
      ...output.matchAll(
        matcher
      ),
    ]

    const replacements =
      matches.length

    if (replacements > 0) {
      matcher.lastIndex = 0

      /*
       * Regex replacement uses native
       * JavaScript replacement semantics,
       * including $1 and named groups.
       */
      if (options.regex) {
        output =
          output.replace(
            matcher,
            rule.replace
          )
      } else {
        /*
         * Callback prevents normal text
         * such as "$&" from being treated
         * as a replacement token.
         */
        output =
          output.replace(
            matcher,
            () => rule.replace
          )
      }
    }

    totalReplacements +=
      replacements

    ruleStats.push({
      id: rule.id,
      search: rule.search,
      replacements,
    })
  }

  return {
    text: output,
    totalReplacements,
    ruleStats,
  }
}

function replaceSimultaneous(
  text,
  rules,
  options
) {
  const matches = []

  for (const rule of rules) {
    const matcher =
      buildMatcher(
        rule.search,
        options
      )

    for (
      const match of text.matchAll(
        matcher
      )
    ) {
      matches.push({
        rule,
        start: match.index,
        end:
          match.index +
          match[0].length,
        match,
      })
    }
  }

  /*
   * Earlier position wins.
   *
   * When two rules begin at the same
   * position, the rule appearing first
   * in the user's list wins.
   */
  matches.sort(
    (a, b) =>
      a.start -
        b.start ||
      a.rule.index -
        b.rule.index ||
      b.end -
        a.end
  )

  const applied = []

  let cursor = 0

  for (const item of matches) {
    /*
     * Ignore a match that overlaps
     * an already accepted match.
     */
    if (
      item.start <
      cursor
    ) {
      continue
    }

    applied.push(item)

    cursor =
      item.end
  }

  const counts =
    new Map(
      rules.map((rule) => [
        rule.id,
        0,
      ])
    )

  if (!applied.length) {
    return {
      text,
      totalReplacements: 0,

      ruleStats:
        rules.map((rule) => ({
          id: rule.id,
          search:
            rule.search,
          replacements: 0,
        })),
    }
  }

  let output = ""
  let position = 0

  for (const item of applied) {
    output += text.slice(
      position,
      item.start
    )

    const replacement =
      options.regex
        ? expandRegexReplacement(
            item.rule.replace,
            item.match,
            text
          )
        : item.rule.replace

    output += replacement

    position =
      item.end

    counts.set(
      item.rule.id,
      (
        counts.get(
          item.rule.id
        ) || 0
      ) + 1
    )
  }

  output +=
    text.slice(position)

  return {
    text: output,

    totalReplacements:
      applied.length,

    ruleStats:
      rules.map((rule) => ({
        id: rule.id,
        search: rule.search,

        replacements:
          counts.get(
            rule.id
          ) || 0,
      })),
  }
}

export function replaceText(
  text = "",
  rules = [],
  options = {}
) {
  const normalizedText =
    typeof text === "string"
      ? text
      : ""

  const normalizedOptions = {
    regex: Boolean(
      options.regex
    ),

    caseSensitive:
      Boolean(
        options.caseSensitive
      ),

    wholeWords:
      Boolean(
        options.wholeWords
      ),

    mode:
      options.mode ===
      "sequential"
        ? "sequential"
        : "simultaneous",
  }

  const validRules =
    cleanRules(rules)

  if (!validRules.length) {
    return {
      text: normalizedText,
      totalReplacements: 0,
      ruleStats: [],
    }
  }

  if (
    normalizedOptions.mode ===
    "sequential"
  ) {
    return replaceSequential(
      normalizedText,
      validRules,
      normalizedOptions
    )
  }

  return replaceSimultaneous(
    normalizedText,
    validRules,
    normalizedOptions
  )
}