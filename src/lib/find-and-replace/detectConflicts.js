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

function normalize(
  value,
  caseSensitive
) {
  return caseSensitive
    ? value
    : value.toLowerCase()
}

function findDuplicateRules(
  rules,
  caseSensitive
) {
  const groups = new Map()
  const warnings = []

  for (const rule of rules) {
    const key = normalize(
      rule.search,
      caseSensitive
    )

    if (!groups.has(key)) {
      groups.set(key, [])
    }

    groups.get(key).push(rule)
  }

  for (const duplicateRules of groups.values()) {
    if (duplicateRules.length < 2) {
      continue
    }

    warnings.push({
      type: "duplicate",
      severity: "warning",
      ruleIds: duplicateRules.map(
        (rule) => rule.id
      ),
      message: `"${duplicateRules[0].search}" is used in more than one replacement rule.`,
      suggestion:
        "Keep one rule or use a different search value.",
    })
  }

  return warnings
}

function validateRegexRules(
  rules,
  options
) {
  const warnings = []

  for (const rule of rules) {
    try {
      buildMatcher(
        rule.search,
        options
      )
    } catch (error) {
      warnings.push({
        type: "invalid-regex",
        severity: "error",
        ruleIds: [rule.id],
        message:
          error instanceof Error
            ? error.message
            : `Invalid regular expression: ${rule.search}`,
        suggestion:
          "Correct this pattern before replacing text.",
      })
    }
  }

  return warnings
}

export function detectConflicts(
  rules = [],
  options = {}
) {
  const normalizedOptions = {
    regex: Boolean(options.regex),
    caseSensitive: Boolean(
      options.caseSensitive
    ),
    wholeWords: Boolean(
      options.wholeWords
    ),
    mode:
      options.mode === "sequential"
        ? "sequential"
        : "simultaneous",
  }

  const validRules =
    cleanRules(rules)

  if (!validRules.length) {
    return []
  }

  const warnings = [
    ...findDuplicateRules(
      validRules,
      normalizedOptions.caseSensitive
    ),
  ]

  /*
   * Regex patterns are too flexible for
   * reliable cascade/overlap prediction.
   *
   * We validate them instead.
   */
  if (normalizedOptions.regex) {
    warnings.push(
      ...validateRegexRules(
        validRules,
        normalizedOptions
      )
    )

    return warnings
  }

  /*
   * Rules replacing text with exactly
   * the same text make no change.
   */
  for (const rule of validRules) {
    if (
      rule.search ===
      rule.replace
    ) {
      warnings.push({
        type: "no-change",
        severity: "info",
        ruleIds: [rule.id],
        message: `"${rule.search}" is replaced with the same text.`,
        suggestion:
          "Change or remove this rule.",
      })
    }
  }

  /*
   * Compare rules in their actual order.
   */
  for (
    let i = 0;
    i < validRules.length;
    i += 1
  ) {
    for (
      let j = i + 1;
      j < validRules.length;
      j += 1
    ) {
      const first =
        validRules[i]

      const second =
        validRules[j]

      const firstSearch =
        normalize(
          first.search,
          normalizedOptions.caseSensitive
        )

      const firstReplace =
        normalize(
          first.replace,
          normalizedOptions.caseSensitive
        )

      const secondSearch =
        normalize(
          second.search,
          normalizedOptions.caseSensitive
        )

      const secondReplace =
        normalize(
          second.replace,
          normalizedOptions.caseSensitive
        )

      /*
       * Duplicate rules were already
       * handled above.
       */
      if (
        firstSearch ===
        secondSearch
      ) {
        continue
      }

      /*
       * Circular example:
       *
       * A → B
       * B → A
       */
      const circular =
        firstReplace ===
          secondSearch &&
        secondReplace ===
          firstSearch

      if (circular) {
        warnings.push({
          type: "circular",
          severity: "warning",
          ruleIds: [
            first.id,
            second.id,
          ],
          message: `"${first.search} → ${first.replace}" and "${second.search} → ${second.replace}" can reverse each other.`,
          suggestion:
            "Use Simultaneous mode unless this chained behavior is intentional.",
          sequentialOnly: true,
        })

        continue
      }

      /*
       * Sequential cascade example:
       *
       * cat → dog
       * dog → fish
       *
       * The first rule creates text
       * matched by the later rule.
       */
      if (
        firstReplace &&
        secondSearch &&
        firstReplace.includes(
          secondSearch
        )
      ) {
        warnings.push({
          type: "cascade",
          severity: "warning",
          ruleIds: [
            first.id,
            second.id,
          ],
          message: `"${first.search} → ${first.replace}" may trigger the later rule searching for "${second.search}".`,
          suggestion:
            "Use Simultaneous mode if you do not want chained replacements.",
          sequentialOnly: true,
        })
      }

      /*
       * Overlapping searches:
       *
       * cat
       * category
       *
       * Whole-word mode normally removes
       * this particular ambiguity.
       */
      if (
        !normalizedOptions.wholeWords &&
        (
          firstSearch.includes(
            secondSearch
          ) ||
          secondSearch.includes(
            firstSearch
          )
        )
      ) {
        warnings.push({
          type: "overlap",
          severity: "info",
          ruleIds: [
            first.id,
            second.id,
          ],
          message: `"${first.search}" and "${second.search}" overlap and may match some of the same text.`,
          suggestion:
            "Review the Match Preview or enable Whole Words when appropriate.",
        })
      }
    }
  }

  return warnings
}