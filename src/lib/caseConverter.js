// Case conversion logic — plain module, runs anywhere, ships zero React code.

const MINOR_WORDS = new Set([
    "a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet",
    "as", "at", "by", "in", "of", "off", "on", "per", "to", "up", "via",
])

export const toUpperCase = (t) => t.toUpperCase()
export const toLowerCase = (t) => t.toLowerCase()

// Capitalizes the first letter of each sentence.
export const toSentenceCase = (t) =>
    t
        .toLowerCase()
        .replace(/(^\s*[\p{L}])|([.!?]["')\]]*\s+[\p{L}])/gu, (m) => m.toUpperCase())

// Capitalizes the first letter of every word.
export const toCapitalizedCase = (t) =>
    t
        .toLowerCase()
        .replace(/(^|[\s\-([{"'])(\p{L})/gu, (m, sep, letter) => sep + letter.toUpperCase())

// Capitalizes major words; minor words stay lowercase unless first or last.
export const toTitleCase = (t) => {
    const parts = t.toLowerCase().split(/(\s+)/)
    const wordIdx = parts
        .map((p, i) => (p.trim().length > 0 ? i : null))
        .filter((i) => i !== null)
    const first = wordIdx[0]
    const last = wordIdx[wordIdx.length - 1]
    return parts
        .map((p, i) => {
            if (p.trim().length === 0) return p
            const bare = p.replace(/[^\p{L}\p{N}'\u2019-]/gu, "")
            if (i !== first && i !== last && MINOR_WORDS.has(bare)) return p
            return p.replace(/\p{L}/u, (c) => c.toUpperCase())
        })
        .join("")
}

export const toAlternatingCase = (t) => {
    let i = 0
    return t.replace(/\p{L}/gu, (c) =>
        i++ % 2 === 0 ? c.toLowerCase() : c.toUpperCase()
    )
}

export const toInverseCase = (t) =>
    t.replace(/\p{L}/gu, (c) =>
        c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()
    )

// ─── Developer case styles ────────────────────────────────────────────
// Helper: robustly splits text into individual words regardless of
// whether the input is plain English, camelCase, PascalCase,
// snake_case, or kebab-case.
const splitIntoWords = (t) =>
    t
        .replace(/([a-z\d])([A-Z])/g, "$1 $2")          // camelCase / PascalCase boundaries
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")      // acronyms: XMLParser → XML Parser
        .replace(/[_\-]/g, " ")                           // underscores & hyphens → spaces
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ""))  // strip punctuation
        .filter(Boolean)

// camelCase — first word lowercase, rest capitalized, no spaces
export const toCamelCase = (t) => {
    const words = splitIntoWords(t)
    return words
        .map((w, i) =>
            i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)
        )
        .join("")
}

// PascalCase — every word capitalized, no spaces
export const toPascalCase = (t) => {
    const words = splitIntoWords(t)
    return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("")
}

// snake_case — all lowercase, words joined by underscores
export const toSnakeCase = (t) => {
    const words = splitIntoWords(t)
    return words.join("_")
}

// kebab-case — all lowercase, words joined by hyphens
export const toKebabCase = (t) => {
    const words = splitIntoWords(t)
    return words.join("-")
}

export const CASE_STYLES = [
    { name: "Sentence case", convert: toSentenceCase },
    { name: "lower case", convert: toLowerCase },
    { name: "UPPER CASE", convert: toUpperCase },
    { name: "Title Case", convert: toTitleCase },
    { name: "Capitalized Case", convert: toCapitalizedCase },
    { name: "aLtErNaTiNg cAsE", convert: toAlternatingCase },
    { name: "InVeRsE cAsE", convert: toInverseCase },
    { name: "camelCase", convert: toCamelCase },
    { name: "PascalCase", convert: toPascalCase },
    { name: "snake_case", convert: toSnakeCase },
    { name: "kebab-case", convert: toKebabCase },
]