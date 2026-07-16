// components/Syllable-counter-seo/SeoContent.jsx
// SERVER component — koi "use client" nahi, koi motion nahi. Static SEO copy.

import Link from "next/link"

// "How many syllables in X?" — Reddit/forums pe sab se zyada argued words.
// Yeh table featured-snippet bait hai aur "fire syllable count" jaisi long-tail queries target karti hai.
const TRICKY_WORDS = [
  { word: "fire", count: "1 (often spoken as 2)", note: "Dictionaries count one gliding sound; many accents say FY-er" },
  { word: "hour", count: "1 (often spoken as 2)", note: "Same glide as fire, and the h is silent" },
  { word: "poem", count: "2", note: "po-em; saying it as pome is common but informal" },
  { word: "chocolate", count: "2 or 3", note: "choc-late in speech, choc-o-late in dictionaries" },
  { word: "every", count: "2 or 3", note: "ev-ry in speech, ev-e-ry when spoken carefully" },
  { word: "different", count: "2 or 3", note: "diff-rent in speech, dif-fer-ent in dictionaries" },
  { word: "interesting", count: "3 or 4", note: "in-tres-ting in speech, in-ter-est-ing formally" },
  { word: "beautiful", count: "3", note: "beau-ti-ful; the eau makes one vowel sound" },
  { word: "orange", count: "2", note: "or-ange; fast speech often squeezes it toward one" },
  { word: "comfortable", count: "3 or 4", note: "comf-ter-ble in speech, com-for-ta-ble formally" },
  { word: "business", count: "2", note: "biz-ness; the middle i is silent" },
  { word: "rhythm", count: "2", note: "rhy-thm; the second syllable has no written vowel" },
]

// Fixed-syllable poetry forms — per-line breakdown in sab ke liye kaam karta hai
const POETRY_FORMS = [
  { form: "Haiku", pattern: "5-7-5", lines: "3" },
  { form: "Tanka", pattern: "5-7-5-7-7", lines: "5" },
  { form: "Limerick", pattern: "8-8-5-5-8 (approximate)", lines: "5" },
  { form: "Cinquain (American)", pattern: "2-4-6-8-2", lines: "5" },
  { form: "Nonet", pattern: "9-8-7-6-5-4-3-2-1", lines: "9" },
  { form: "Sonnet (iambic pentameter)", pattern: "10 per line", lines: "14" },
]

const h2Class =
  "text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4"
const pClass = "text-gray-600 dark:text-gray-300 leading-7 mb-4"
const linkClass = "text-cyan-600 dark:text-cyan-400 font-medium hover:underline"

export default function SeoContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-8" aria-label="Syllable Counter Information">
      <h2 className={h2Class}>How to Count Syllables Online</h2>
      <p className={pClass}>You can count syllables online in three steps:</p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
        <li>
          <strong>Paste your text</strong> into the box above — a single word, a poem, or a
          whole speech.
        </li>
        <li>
          <strong>Read the counts</strong> — the total at the top, line-by-line totals
          underneath, and a per-word count on every word.
        </li>
        <li>
          <strong>Check a form</strong> — turn on Haiku mode to validate the 5-7-5 pattern, or
          use the per-line totals for sonnets, limericks, and lyrics.
        </li>
      </ol>
      <p className={pClass}>
        There is no upload step and no processing delay. The syllables counter updates live in
        your browser, whether you paste one word or an entire chapter.
      </p>

      <h2 className={h2Class}>Three Ways to Count Syllables by Hand</h2>
      <p className={pClass}>
        The tool is faster, but the manual methods help you settle any count it flags:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
        <li>
          <strong>The chin method.</strong> Rest your hand under your chin and say the word out
          loud. Your chin drops once for every syllable, because each syllable carries a vowel
          sound that opens your jaw.
        </li>
        <li>
          <strong>The clap method.</strong> Say the word slowly and clap on every beat:
          po-et-ry gets three claps. Teachers use this one in class because it works at any
          age.
        </li>
        <li>
          <strong>The vowel-sound method.</strong> Count the vowel sounds you hear, not the
          vowel letters you see. Make has two vowel letters but one vowel sound, so it counts
          as one syllable.
        </li>
      </ol>

      <h2 className={h2Class}>How the Syllable Counter Works</h2>
      <p className={pClass}>
        The tool checks every word against a built-in pronunciation dictionary first. If a word is
        not in the dictionary — a rare word, a name, or a made-up word — a vowel-group
        algorithm estimates the count: each group of neighboring vowel sounds counts as one
        syllable, and silent endings like the final “e” in <em>make</em> drop off.
      </p>
      <p className={pClass}>
        Dictionary lookups are exact. Algorithm estimates fit most standard English words, but
        English carries enough exceptions that no automatic counter is perfect — words like{" "}
        <em>fire</em>, <em>hour</em>, and <em>chocolate</em> genuinely vary by accent and
        dictionary. That is why the tool marks algorithm-counted words with a dashed border, so
        you can double-check the ones that matter. When a single syllable decides your line, that
        marker is your friend.
      </p>

      <h2 className={h2Class}>How Many Syllables? Words People Argue About</h2>
      <p className={pClass}>
        Whole forum threads argue over single words: is fire one syllable or two, does
        chocolate keep its middle vowel, and why does poem trip everyone up? Here are the
        counts for the words people look up and debate the most:
      </p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700 text-left">
              <th className="px-3 py-3 font-semibold">Word</th>
              <th className="px-3 py-3 font-semibold">Syllables</th>
              <th className="px-3 py-3 font-semibold">Why people argue</th>
            </tr>
          </thead>
          <tbody>
            {TRICKY_WORDS.map((row) => (
              <tr key={row.word} className="border-b border-gray-200 dark:border-gray-800">
                <td className="px-3 py-3 font-medium">{row.word}</td>
                <td className="px-3 py-3">{row.count}</td>
                <td className="px-3 py-3 text-gray-600 dark:text-gray-400">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={pClass}>
        The rule for poetry: follow the meter of your line. The rule for speech: follow the
        way you actually say the word. When a dictionary and your accent disagree, your poem
        wins.
      </p>

      <h2 className={h2Class}>Haiku Syllable Counter (5-7-5 Checker)</h2>
      <p className={pClass}>
        A traditional English haiku runs three lines: five syllables, then seven, then five. Turn
        on <strong>Haiku mode</strong> and this page becomes a dedicated haiku syllable counter
        — each of your three lines gets its own live count against the 5-7-5 target, and a
        line turns green the moment it fits.
      </p>
      <p className={pClass}>
        Write your haiku directly in the box and watch the haiku syllable count update with every
        word. You never count on your fingers, and you never retype your poem into a separate
        haiku tool.
      </p>
      <p className={pClass}>
        Strict 5-7-5 is the classroom standard, but Japanese haiku count sounds (<em>on</em>),
        not English syllables — so many published English haiku run shorter than 17
        syllables. If your teacher asked for 5-7-5, this checker keeps you exact. If you write
        literary haiku, treat 17 as a ceiling, not a rule.
      </p>

      <h2 className={h2Class}>Syllable Counter for Poems, Lyrics and Speeches</h2>
      <p className={pClass}>
        Meter is rhythm you can count. The per-line breakdown makes this a practical syllable
        counter for poems of any form — iambic pentameter needs ten syllables a line, a
        tanka runs 5-7-5-7-7, and a limerick leans on 8-8-5-5-8. Match your line totals to the
        pattern, and the rhythm takes care of itself.
      </p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700 text-left">
              <th className="px-3 py-3 font-semibold">Form</th>
              <th className="px-3 py-3 font-semibold">Syllable pattern</th>
              <th className="px-3 py-3 font-semibold">Lines</th>
            </tr>
          </thead>
          <tbody>
            {POETRY_FORMS.map((row) => (
              <tr key={row.form} className="border-b border-gray-200 dark:border-gray-800">
                <td className="px-3 py-3 font-medium">{row.form}</td>
                <td className="px-3 py-3">{row.pattern}</td>
                <td className="px-3 py-3">{row.lines}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={pClass}>
        Songwriters use the same trick in reverse: when a lyric refuses to sit on the melody, the
        syllable count is usually the reason. Count the line that works, then rewrite the line
        that does not until the numbers match.
      </p>
      <p className={pClass}>
        Writing for the ear rather than the page? Shorter words read faster and punch harder.
        Pair this tool with the{" "}
        <Link href="/tools/reading-time" className={linkClass}>Reading Time Calculator</Link> to
        time your speech, and the{" "}
        <Link href="/tools/word-counter" className={linkClass}>Word Counter</Link> to hit your
        length target.
      </p>

      <h2 className={h2Class}>Do Syllable Counts Matter in Songwriting?</h2>
      <p className={pClass}>
        Songwriting forums ask this question constantly, and the honest answer is:
        consistency beats any magic number. When line one of verse one carries eight
        syllables, line one of verse two should land close to eight, so both verses sit on
        the same melody without cramming or stretching.
      </p>
      <p className={pClass}>
        Stressed syllables matter even more than totals. Two lines with the same count can
        still fight the melody when the stresses fall in different places. Use the count to
        get close, then sing the line to place the stresses.
      </p>
      <p className={pClass}>
        The line-by-line breakdown above makes the comparison simple: paste verse one and
        verse two together and read the numbers side by side, instead of counting each line
        on your fingers.
      </p>

      <h2 className={h2Class}>Who Uses a Syllable Counter</h2>
      <p className={pClass}>
        <strong>Poets</strong> — check haiku, tanka, sonnets, and limericks against their
        syllable patterns line by line, without counting on fingers.
      </p>
      <p className={pClass}>
        <strong>Songwriters and rappers</strong> — match lyric lines to the melody's beat
        count and keep verses even from bar to bar.
      </p>
      <p className={pClass}>
        <strong>Students</strong> — finish the haiku assignment with an exact 5-7-5 count,
        and learn how syllables work from the per-word breakdown.
      </p>
      <p className={pClass}>
        <strong>Teachers</strong> — demonstrate syllable counting on the board in real time,
        and let students self-check their poetry homework.
      </p>
      <p className={pClass}>
        <strong>Copywriters and speechwriters</strong> — shorter, punchier lines are easier
        to say and remember, and the syllable count is the fastest way to measure that. Keep your
        sentences tight with the{" "}
        <Link href="/tools/sentence-counter" className={linkClass}>Sentence Counter</Link>.
      </p>
      <p className={pClass}>
        <strong>English learners</strong> — see how many syllables a new word has before
        saying it out loud, and where the count differs from the spelling.
      </p>

      <h2 className={h2Class}>Your Text Never Leaves Your Browser</h2>
      <p className={pClass}>
        Like every CountFlows tool, the Syllable Counter runs entirely on your device. Your text
        is never uploaded to a server, never logged, and never stored. Paste an unpublished poem
        or a whole manuscript — close the tab, and it is gone. There is no word limit, no
        sign-up wall, and no premium tier.
      </p>

      <h2 className={h2Class}>More Free Text Tools</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-7">
        <li>
          <Link href="/tools/word-counter" className={linkClass}>Word Counter</Link>{" "}
          — count words, characters, and sentences as you type.
        </li>
        <li>
          <Link href="/tools/character-counter" className={linkClass}>Character Counter</Link>{" "}
          — check your text against platform character limits.
        </li>
        <li>
          <Link href="/tools/sentence-counter" className={linkClass}>Sentence Counter</Link>{" "}
          — check sentence count and average sentence length.
        </li>
        <li>
          <Link href="/tools/reading-time" className={linkClass}>Reading Time Calculator</Link>{" "}
          — see how long your text takes to read or speak aloud.
        </li>
        <li>
          <Link href="/tools/case-converter" className={linkClass}>Case Converter</Link>{" "}
          — fix capitalization in one click.</li>
          <li>
            <Link href="/tools/keyword-density-checker" className={linkClass}>Keyword Density Checker</Link>{" "}
            - keep keyword usage natural before you publish.
          </li>
          <li>
            <Link href="/tools/ai-text-cleaner" className={linkClass}>AI Text Cleaner</Link>{" "}
            - remove AI artifacts, formatting, and spaces from your text.
          </li>
          <li>
            <Link href="/tools/syllable-counter" className={linkClass}>Syllable Counter</Link>{" "}
            - count syllables in words, sentences, and poems.
          </li>

      </ul>
    </section>
  )
}