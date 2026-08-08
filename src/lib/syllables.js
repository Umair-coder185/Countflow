// lib/syllables.js
// Pure functions - no "use client" needed.
// Client components can import these functions directly.
//
// Approach:
// 1. Dictionary-first syllable counting.
// 2. Vowel-group algorithm fallback.
// 3. Optional syllable-break display for common/tricky words.
// 4. Everything runs locally in the browser with zero packages.

// Common tricky words where the basic algorithm can be wrong.
// Add words here as needed based on user feedback.
const EXCEPTIONS = {
  fire: 1,
  hour: 1,
  our: 1,
  hire: 1,
  poem: 2,
  poet: 2,
  poetry: 3,
  quiet: 2,
  science: 2,
  chocolate: 2,
  every: 2,
  evening: 3,
  different: 3,
  interesting: 4,
  family: 3,
  favorite: 3,
  several: 3,
  temperature: 4,
  restaurant: 3,
  business: 2,
  wednesday: 2,
  vegetable: 4,
  comfortable: 4,
  literature: 4,
  beautiful: 3,
  idea: 3,
  area: 3,
  being: 2,
  doing: 2,
  going: 2,
  really: 3,
  people: 2,
  orange: 2,
  sometimes: 2,
  everyone: 3,
  everything: 3,
  camera: 3,
  average: 3,
  coyote: 3,
  recipe: 3,
  karaoke: 4,
  cafe: 2,
  naive: 2,
  create: 2,
  created: 3,
  react: 2,
  riot: 2,
  lion: 2,
  ion: 2,
  diet: 2,
}

// Known syllable-break positions.
//
// This is intentionally separate from EXCEPTIONS because
// syllable count and syllable boundaries are different things.
//
// Words not present here are left unchanged rather than being
// given a potentially incorrect syllable split.
const SYLLABLE_BREAKS = {
  fire: "fire",
  hour: "hour",
  our: "our",
  hire: "hire",

  poem: "po·em",
  poet: "po·et",
  poetry: "po·et·ry",
  quiet: "qui·et",

  science: "sci·ence",
  chocolate: "choc·o·late",
  every: "ev·ery",
  evening: "eve·ning",
  different: "dif·fer·ent",
  interesting: "in·ter·est·ing",

  family: "fam·i·ly",
  favorite: "fa·vor·ite",
  several: "sev·er·al",
  temperature: "tem·per·a·ture",
  restaurant: "res·tau·rant",
  business: "busi·ness",
  wednesday: "wednes·day",
  vegetable: "veg·e·ta·ble",
  comfortable: "com·fort·a·ble",
  literature: "lit·er·a·ture",

  beautiful: "beau·ti·ful",
  idea: "i·de·a",
  area: "ar·e·a",
  being: "be·ing",
  doing: "do·ing",
  going: "go·ing",
  really: "real·ly",

  people: "peo·ple",
  orange: "or·ange",
  sometimes: "some·times",
  everyone: "ev·ery·one",
  everything: "ev·ery·thing",
  camera: "cam·er·a",
  average: "av·er·age",
  coyote: "co·yote",
  recipe: "rec·i·pe",
  karaoke: "kar·a·o·ke",

  cafe: "ca·fe",
  naive: "na·ive",
  create: "cre·ate",
  created: "cre·at·ed",
  react: "re·act",
  riot: "ri·ot",
  lion: "li·on",
  ion: "i·on",
  diet: "di·et",

  wonderful: "won·der·ful",
}

// Ek word ka syllable count.
// Returns { count, exact } ya null agar word mein letters nahi.
// exact:
//   true  = dictionary/exception match
//   false = algorithm estimate
export function countWordSyllables(raw) {
  const word = raw.toLowerCase().replace(/[^a-z]/g, "")

  if (!word) return null

  if (EXCEPTIONS[word] !== undefined) {
    return {
      count: EXCEPTIONS[word],
      exact: true,
    }
  }

  if (word.length <= 3) {
    return {
      count: 1,
      exact: false,
    }
  }

  // Silent endings hatao:
  // -es
  // -ed
  // consonant + -e
  //
  // "[^laeiouy]e" mein "l" excluded hai taake
  // "table" aur "little" ka -le bacha rahe.
  const stripped = word
    .replace(/(?:[^laeiouy]es|[^aeiouy]ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")

  // Har vowel group (1-2 vowels sath) = 1 syllable.
  const groups = stripped.match(/[aeiouy]{1,2}/g)

  return {
    count: Math.max(1, groups ? groups.length : 1),
    exact: false,
  }
}


// Display a word with syllable separators.
//
// Example:
//   wonderful -> won·der·ful
//
// We only return a syllable split when we know the word's
// boundaries. Unknown words are returned unchanged so the UI
// never displays a confidently-wrong split.
export function hyphenateWord(raw) {
  if (!raw) return ""

  const cleanWord = raw.toLowerCase().replace(/[^a-z]/g, "")

  if (!cleanWord) return raw

  const broken = SYLLABLE_BREAKS[cleanWord]

  if (!broken) return raw

  // Preserve the original token's capitalization for simple
  // alphabetic words.
  if (raw === raw.toUpperCase()) {
    return broken.toUpperCase()
  }

  if (
    raw.length > 0 &&
    raw[0] === raw[0].toUpperCase() &&
    raw[0] !== raw[0].toLowerCase()
  ) {
    return broken.charAt(0).toUpperCase() + broken.slice(1)
  }

  return broken
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
        words.push({
          token,
          display: hyphenateWord(token),
          count: result.count,
          exact: result.exact,
        })

        syllables += result.count
      }
    }

    return {
      text: lineText,
      words,
      syllables,
    }
  })

  const nonEmptyLines = lines.filter((l) => l.words.length > 0)

  const totalSyllables = nonEmptyLines.reduce(
    (sum, l) => sum + l.syllables,
    0
  )

  const totalWords = nonEmptyLines.reduce(
    (sum, l) => sum + l.words.length,
    0
  )

  const estimatedWords = nonEmptyLines.reduce(
    (sum, l) => sum + l.words.filter((w) => !w.exact).length,
    0
  )

  return {
    lines,
    nonEmptyLines,
    totalSyllables,
    totalWords,
    estimatedWords,
  }
}


export const HAIKU_PATTERN = [5, 7, 5]
