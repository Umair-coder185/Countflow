// components/syllable-counter/SeoContent.jsx
// SERVER component — static, people-first SEO content for the Syllable Counter.
// Primary search intent: syllable counter
// Strong secondary intent: syllable counter for poems, haiku syllable counter,
// syllable counter for lyrics / songs, syllable checker.

import Link from "next/link"

const TRICKY_WORDS = [
  {
    word: "fire",
    count: "1–2",
    note: "Pronunciation varies by accent; some speakers compress it to one beat, others clearly use two.",
  },
  {
    word: "hour",
    count: "1–2",
    note: "Often pronounced as one flowing beat, but two-syllable pronunciations also occur.",
  },
  {
    word: "poem",
    count: "2",
    note: "Usually pronounced po-em.",
  },
  {
    word: "chocolate",
    count: "2–3",
    note: "Everyday speech often compresses the middle vowel.",
  },
  {
    word: "every",
    count: "2–3",
    note: "Many speakers say ev-ry; careful pronunciation may preserve three syllables.",
  },
  {
    word: "different",
    count: "2–3",
    note: "Fast speech often compresses the middle syllable.",
  },
  {
    word: "interesting",
    count: "3–4",
    note: "The count depends on whether the middle vowels are reduced in speech.",
  },
  {
    word: "beautiful",
    count: "3",
    note: "Commonly pronounced beau-ti-ful.",
  },
  {
    word: "comfortable",
    count: "3–4",
    note: "Natural speech often compresses one of the middle syllables.",
  },
  {
    word: "business",
    count: "2",
    note: "Commonly pronounced biz-ness.",
  },
  {
    word: "rhythm",
    count: "2",
    note: "The second syllable is heard even though it does not contain a standard written vowel.",
  },
]

const POETRY_FORMS = [
  { form: "Haiku", pattern: "5-7-5", lines: "3" },
  { form: "Tanka", pattern: "5-7-5-7-7", lines: "5" },
  { form: "Cinquain", pattern: "2-4-6-8-2", lines: "5" },
  { form: "Fibonacci poem", pattern: "1-1-2-3-5-8", lines: "6+" },
  { form: "Nonet", pattern: "9-8-7-6-5-4-3-2-1", lines: "9" },
  { form: "Sonnet", pattern: "Often ~10 syllables per line", lines: "14" },
]

const h2Class =
  "mt-12 mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100"
const h3Class =
  "mt-7 mb-2 text-lg font-semibold text-gray-900 md:text-xl dark:text-gray-100"
const pClass = "mb-4 leading-7 text-gray-600 dark:text-gray-300"
const linkClass =
  "font-medium text-cyan-600 hover:underline dark:text-cyan-400"
const thClass =
  "px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100"
const tdClass = "px-4 py-3 align-top"
const trClass = "border-t border-gray-200 dark:border-gray-700"

export default function SeoContent() {
  return (
    <section
      className="mx-auto max-w-4xl px-4 py-8 md:px-8"
      aria-label="Syllable Counter Information"
    >
      <h2 className={h2Class}>How to Use the Syllable Counter</h2>

      <p className={pClass}>
        Use the free syllable counter above to check a single word, a sentence,
        a full poem, haiku, or song lyrics. The result updates as you type, so
        you can adjust a line and immediately see whether the syllable count
        changed.
      </p>

      <ol className="mb-4 list-decimal space-y-2 pl-6 leading-7 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Paste or type your text.</strong> Put each poem or lyric line
          on a separate line if you want line-by-line results.
        </li>
        <li>
          <strong>Check the totals.</strong> The tool shows total syllables,
          words, lines, and a per-word breakdown.
        </li>
        <li>
          <strong>Use Haiku mode when needed.</strong> The built-in 5-7-5
          checker compares each of three lines with the target pattern.
        </li>
      </ol>

      <p className={pClass}>
        For other fixed forms, open the poetry-pattern options and choose
        Tanka, Cinquain, Fibonacci, or a custom syllable pattern.
      </p>

      <h2 className={h2Class}>What Is a Syllable?</h2>

      <p className={pClass}>
        A syllable is a spoken beat within a word. Each syllable normally
        contains one main vowel sound. For example, <em>cat</em> has one
        syllable, <em>paper</em> has two, and <em>beautiful</em> has three.
        Written vowels alone do not determine the count because English
        spelling and pronunciation do not always match.
      </p>

      <p className={pClass}>
        That is why counting syllables is useful for poetry, haiku, lyrics,
        pronunciation practice, and any writing where rhythm matters.
      </p>

      <h2 className={h2Class}>How the Syllable Checker Works</h2>

      <p className={pClass}>
        CountFlows analyzes each word and returns both a total syllable count
        and a line-by-line breakdown. Words recognized by the tool&apos;s
        pronunciation data can be counted directly. Less common words, names,
        slang, or invented words may require an estimated count based on
        spelling and vowel patterns.
      </p>

      <p className={pClass}>
        English pronunciation varies by accent and speaking style, so no
        automatic syllable checker can resolve every word perfectly. The tool
        marks estimated words differently so you can double-check them when one
        syllable matters to the meter of your poem or lyric.
      </p>

      <div className="mb-6 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-5 dark:border-cyan-900 dark:bg-cyan-950/20">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Need to understand the rules behind the count?
        </p>
        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          See our guide to{" "}
          <Link
            href="/blog/syllable-division-rules"
            className={linkClass}
          >
            syllable division rules
          </Link>{" "}
          for practical examples of splitting words into syllables.
        </p>
      </div>

      <h2 className={h2Class}>
        Syllable Counter for Poems, Haiku &amp; Song Lyrics
      </h2>

      <p className={pClass}>
        The most useful part of a poetry syllable counter is not only the grand
        total — it is the count for each line. A poem can have the right total
        number of syllables and still miss its intended rhythm if one line is
        too long or too short.
      </p>

      <p className={pClass}>
        Paste your poem or lyrics with one line per verse. CountFlows shows the
        syllable total beside each line and then breaks that line down word by
        word. This makes it easier to spot exactly where the rhythm changes.
      </p>

      <h3 className={h3Class}>Haiku Syllable Counter: Check 5-7-5</h3>

      <p className={pClass}>
        If you are writing a classroom-style English haiku, turn on{" "}
        <strong>Haiku 5-7-5</strong> mode. The checker compares line one with 5
        syllables, line two with 7, and line three with 5. A matching line is
        highlighted so you can revise the poem without recounting it manually.
      </p>

      <p className={pClass}>
        English haiku is often taught with the 5-7-5 structure, although modern
        English-language haiku does not always follow exactly 17 syllables. If
        your assignment specifically requires 5-7-5, use the pattern checker as
        your target.
      </p>

      <h3 className={h3Class}>Syllable Counter for Songs &amp; Lyrics</h3>

      <p className={pClass}>
        Songwriters can use the same line-by-line view to compare verses. If a
        lyric fits the melody well, note its syllable count and compare the
        corresponding line in the next verse. Similar counts can make phrasing
        easier to keep consistent, although stress, tempo, and held notes also
        affect how a lyric fits a melody.
      </p>

      <h2 className={h2Class}>Common Poetry Syllable Patterns</h2>

      <p className={pClass}>
        Different poetic forms use syllables in different ways. These common
        patterns can be checked with the line-by-line results or the poetry
        pattern controls above.
      </p>

      <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[620px] text-sm md:text-base">
          <thead className="bg-cyan-50 dark:bg-cyan-900/30">
            <tr>
              <th className={thClass}>Poetry form</th>
              <th className={thClass}>Common syllable pattern</th>
              <th className={thClass}>Lines</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 dark:text-gray-300">
            {POETRY_FORMS.map((row) => (
              <tr
                key={row.form}
                className={trClass}
              >
                <td className={`${tdClass} font-medium text-gray-800 dark:text-gray-200`}>
                  {row.form}
                </td>
                <td className={tdClass}>{row.pattern}</td>
                <td className={tdClass}>{row.lines}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={pClass}>
        Not every poem follows a fixed syllable formula. In free verse and song
        lyrics, use the line totals as a rhythm guide rather than as a strict
        rule.
      </p>

      <h2 className={h2Class}>How Many Syllables? Tricky English Words</h2>

      <p className={pClass}>
        Some English words can sound different depending on accent, speed, or
        speaking style. That is why two people may count the same word
        differently. Here are several common examples:
      </p>

      <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[680px] text-sm md:text-base">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className={thClass}>Word</th>
              <th className={thClass}>Typical count</th>
              <th className={thClass}>Why it can vary</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 dark:text-gray-300">
            {TRICKY_WORDS.map((row) => (
              <tr
                key={row.word}
                className={trClass}
              >
                <td className={`${tdClass} font-medium text-gray-800 dark:text-gray-200`}>
                  {row.word}
                </td>
                <td className={tdClass}>{row.count}</td>
                <td className={tdClass}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={pClass}>
        When the count matters for poetry or songwriting, use the pronunciation
        that fits the way the line is actually spoken or sung.
      </p>

      <h2 className={h2Class}>Three Simple Ways to Count Syllables by Hand</h2>

      <p className={pClass}>
        An online syllable counter is faster, but manual methods are useful when
        you want to double-check an unusual pronunciation.
      </p>

      <ol className="mb-4 list-decimal space-y-3 pl-6 leading-7 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Clap the beats.</strong> Say the word naturally and clap once
          for every beat you hear.
        </li>
        <li>
          <strong>Use the chin method.</strong> Place a hand lightly under your
          chin and say the word; each noticeable jaw drop usually marks a
          syllable.
        </li>
        <li>
          <strong>Listen for vowel sounds.</strong> Count spoken vowel sounds,
          not simply the number of written vowel letters.
        </li>
      </ol>

      <h2 className={h2Class}>Who Uses a Syllable Counter?</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Poets &amp; students
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
            Check haiku, tanka, cinquain, sonnets, and classroom poetry
            assignments line by line.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Songwriters &amp; rappers
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
            Compare lyric lines and keep phrasing more consistent across verses
            and bars.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Teachers &amp; English learners
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
            Demonstrate word pronunciation and make syllable structure easier
            to see.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Speechwriters &amp; copywriters
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
            Compare spoken rhythm and simplify lines that feel difficult to say
            naturally.
          </p>
        </div>
      </div>

      <h2 className={h2Class}>Your Text Stays in Your Browser</h2>

      <p className={pClass}>
        The CountFlows syllable counter processes your text in the browser.
        Your poem, lyrics, or draft is not uploaded to CountFlows for syllable
        analysis. There is no account required to use the tool.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/60">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          Related writing tools
        </p>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href="/tools/word-counter"
            className={linkClass}
          >
            Word Counter
          </Link>
          <Link
            href="/tools/sentence-counter"
            className={linkClass}
          >
            Sentence Counter
          </Link>
          <Link
            href="/tools/reading-time"
            className={linkClass}
          >
            Reading Time Calculator
          </Link>
          <Link
            href="/tools/character-counter"
            className={linkClass}
          >
            Character Counter
          </Link>
        </div>
      </div>
    </section>
  )
}