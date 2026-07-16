// lib/syllables.js
// Pure functions - koi "use client" nahi chahiye. Client component import karta hai.
// Approach = dictionary-first + vowel-group algorithm fallback (wahi pattern jo
// syllablecount.com aur syllablecounter.net use karte hain, but real-time).

// Common tricky words jahan algorithm ghalat hota hai - dictionary override.
// Zaroorat ke mutabiq words add karte raho (user feedback se list barhegi).
const EXCEPTIONS = {
  fire: 1, hour: 1, our: 1, hire: 1, poem: 2, poet: 2, poetry: 3, quiet: 2,
  science: 2, chocolate: 2, every: 2, evening: 3, different: 3, interesting: 4,
  family: 3, favorite: 3, several: 3, temperature: 4, restaurant: 3,
  business: 2, wednesday: 2, vegetable: 4, comfortable: 4, literature: 4,
  beautiful: 3, idea: 3, area: 3, being: 2, doing: 2, going: 2, really: 3,
  people: 2, orange: 2, sometimes: 2, everyone: 3, everything: 3, camera: 3,
  average: 3, coyote: 3, recipe: 3, karaoke: 4, cafe: 2, naive: 2,
  create: 2, created: 3, react: 2, riot: 2, lion: 2, ion: 2, diet: 2,
}

// Ek word ka syllable count. Returns { count, exact } ya null (agar word mein letters nahi).
// exact: true = dictionary match, false = algorithm estimate (UI mein mark hota hai).
export function countWordSyllables(raw) {
  const word = raw.toLowerCase().replace(/[^a-z]/g, "")
  if (!word) return null
  if (EXCEPTIONS[word] !== undefined) {
    return { count: EXCEPTIONS[word], exact: true }
  }
  if (word.length <= 3) return { count: 1, exact: false }

  // Silent endings hatao: "-es", "-ed", consonant + "-e" (make, note).
  // "[^laeiouy]e" mein 'l' excluded hai taake "table", "little" ka -le bacha rahe.
  const stripped = word
    .replace(/(?:[^laeiouy]es|[^aeiouy]ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")

  // Har vowel group (1-2 vowels sath) = 1 syllable
  const groups = stripped.match(/[aeiouy]{1,2}/g)
  return { count: Math.max(1, groups ? groups.length : 1), exact: false }
}

// Poore text ka analysis: per-word, per-line, totals.
export function analyzeText(text) {
  const rawLines = text.split(/\r?\n/)
  const lines = rawLines.map((lineText) => {
    const tokens = lineText.split(/\s+/).filter(Boolean)
    const words = []
    let syllables = 0
    for (const token of tokens) {
      const result = countWordSyllables(token)
      if (result) {
        words.push({ token, count: result.count, exact: result.exact })
        syllables += result.count
      }
    }
    return { text: lineText, words, syllables }
  })

  const nonEmptyLines = lines.filter((l) => l.words.length > 0)
  const totalSyllables = nonEmptyLines.reduce((sum, l) => sum + l.syllables, 0)
  const totalWords = nonEmptyLines.reduce((sum, l) => sum + l.words.length, 0)
  const estimatedWords = nonEmptyLines.reduce(
    (sum, l) => sum + l.words.filter((w) => !w.exact).length,
    0
  )

  return { lines, nonEmptyLines, totalSyllables, totalWords, estimatedWords }
}

export const HAIKU_PATTERN = [5, 7, 5]