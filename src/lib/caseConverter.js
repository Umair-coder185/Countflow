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

export const CASE_STYLES = [
    { name: "Sentence case", convert: toSentenceCase },
    { name: "lower case", convert: toLowerCase },
    { name: "UPPER CASE", convert: toUpperCase },
    { name: "Title Case", convert: toTitleCase },
    { name: "Capitalized Case", convert: toCapitalizedCase },
    { name: "aLtErNaTiNg cAsE", convert: toAlternatingCase },
    { name: "InVeRsE cAsE", convert: toInverseCase },
]