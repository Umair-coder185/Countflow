import Link from "next/link"

const readingTimeRows = [
  { words: "500 words", at200: "2 min 30 sec", at250: "2 min", speaking130: "3 min 51 sec" },
  { words: "1,000 words", at200: "5 min", at250: "4 min", speaking130: "7 min 42 sec" },
  { words: "1,500 words", at200: "7 min 30 sec", at250: "6 min", speaking130: "11 min 32 sec" },
  { words: "2,000 words", at200: "10 min", at250: "8 min", speaking130: "15 min 23 sec" },
  { words: "3,000 words", at200: "15 min", at250: "12 min", speaking130: "23 min 5 sec" },
  { words: "5,000 words", at200: "25 min", at250: "20 min", speaking130: "38 min 28 sec" },
  { words: "10,000 words", at200: "50 min", at250: "40 min", speaking130: "1 hr 16 min 55 sec" },
]

const readingSpeedByReader = [
  { group: "Early elementary (1st–3rd grade)", wpm: "50–110 WPM (read aloud)", note: "Still decoding word by word" },
  { group: "Upper elementary (5th grade)", wpm: "~150 WPM (silent)", note: "Silent reading starts overtaking oral" },
  { group: "Middle / high school", wpm: "200–230 WPM (silent)", note: "Approaching the adult range" },
  { group: "Average adult — non-fiction", wpm: "238 WPM (silent)", note: "Brysbaert (2019) meta-analysis baseline" },
  { group: "Average adult — fiction", wpm: "260 WPM (silent)", note: "Shorter average word length" },
  { group: "Adult reading aloud, solo", wpm: "183 WPM", note: "Same Brysbaert (2019) dataset" },
  { group: "Older adult (65+)", wpm: "~220 WPM (silent)", note: "Gradual slowdown, still fluent" },
]

const h2Class =
  "text-2xl md:text-3xl font-bold mb-5 mt-12 first:mt-0 text-gray-800 dark:text-gray-100"

const h3Class =
  "text-xl md:text-2xl font-semibold mb-3 mt-7 text-gray-800 dark:text-gray-200"

const pClass =
  "text-gray-600 dark:text-gray-400 leading-relaxed mb-5"

const linkClass =
  "text-blue-600 dark:text-blue-400 hover:underline font-semibold"

const thClass =
  "bg-cyan-50 dark:bg-gray-900 text-left px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"

const tdClass =
  "px-4 py-3 text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800"

export default function SEOContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 bg-gradient-to-b from-gray-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
      <h2 className={h2Class}>How to Use the Reading Time Calculator</h2>

      <p className={pClass}>
        Paste or type your article, essay, script, speech, or other text into
        the calculator above. CountFlows counts the words and estimates how long
        the text will take to read at your selected reading speed.
      </p>

      <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
        <li>
          <strong>Paste your text.</strong> The word count and time estimate
          update automatically.
        </li>
        <li>
          <strong>Choose your reading speed.</strong> Use a preset or enter your
          own words-per-minute rate.
        </li>
        <li>
          <strong>Read the result.</strong> The tool shows the estimated reading
          time in minutes and seconds, plus a separate speaking-time estimate.
        </li>
      </ol>

      <p className={pClass}>
        If you are asking, <strong>“How long will this take to read?”</strong>,
        the result above gives the answer directly from your actual text rather
        than relying on a generic page or word-count estimate.
      </p>

      <h2 className={h2Class}>How Is Reading Time Calculated?</h2>

      <p className={pClass}>
        Reading time is estimated by dividing the number of words in the text by
        the selected reading speed in words per minute (WPM). For example, a
        1,000-word article at 200 WPM has an estimated reading time of 5 minutes.
      </p>

      <div className="mb-5 rounded-2xl border border-cyan-200 bg-white/70 p-5 text-gray-700 dark:border-cyan-800 dark:bg-gray-900/70 dark:text-gray-300">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          Reading time formula
        </p>
        <p className="mt-2">
          <strong>Reading time = total words ÷ reading speed (WPM)</strong>
        </p>
      </div>

      <p className={pClass}>
        The estimate becomes more personal when you use your own WPM instead of
        a default speed. If you do not know your reading speed yet, see our{" "}
        <Link href="/blog/fast-reading-test" className={linkClass}>
          Fast Reading Test
        </Link>{" "}
        or learn the formula in our{" "}
        <Link
          href="/blog/how-to-calculate-words-per-minute-reading"
          className={linkClass}
        >
          guide to calculating reading WPM
        </Link>
        .
      </p>

      <h2 className={h2Class}>
        How Long Does It Take to Read 500, 1,000, or 5,000 Words?
      </h2>

      <p className={pClass}>
        The time depends on reading speed. The examples below show calculated
        estimates at 200 and 250 words per minute, with a separate read-aloud
        estimate at 130 WPM. These are planning examples; use the calculator
        above for your own text and preferred speed.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full min-w-[720px] text-sm md:text-base border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th className={thClass}>Word count</th>
              <th className={thClass}>Reading at 200 WPM</th>
              <th className={thClass}>Reading at 250 WPM</th>
              <th className={thClass}>Speaking at 130 WPM</th>
            </tr>
          </thead>
          <tbody>
            {readingTimeRows.map((row) => (
              <tr key={row.words}>
                <td className={`${tdClass} font-semibold`}>{row.words}</td>
                <td className={tdClass}>{row.at200}</td>
                <td className={tdClass}>{row.at250}</td>
                <td className={tdClass}>{row.speaking130}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={pClass}>
        For a detailed example at the upper end of the table, see{" "}
        <Link
          href="/blog/how-long-does-it-take-to-read-10000-words"
          className={linkClass}
        >
          how long it takes to read 10,000 words
        </Link>
        .
      </p>

      <h2 className={h2Class}>Reading Time vs. Reading Speed</h2>

      <p className={pClass}>
        Reading time and reading speed are related, but they are not the same
        thing. <strong>Reading time</strong> tells you how long a specific piece
        of text may take to finish. <strong>Reading speed</strong> tells you how
        many words you read per minute.
      </p>

      <p className={pClass}>
        This page is designed primarily to estimate the time required for a
        piece of text. If you want to compare your pace with common benchmarks,
        use our{" "}
        <Link href="/blog/average-reading-speed" className={linkClass}>
          Average Reading Speed guide
        </Link>
        .
      </p>

      <h2 className={h2Class}>What's a Realistic Reading Speed to Use?</h2>

      <p className={pClass}>
        Most reading-time tools default to a round number like 200 or 250 words
        per minute, but neither figure comes from a specific study — they're
        rounded conventions. The most thorough research on this question comes
        from Marc Brysbaert's 2019 meta-analysis in the{" "}
        <em>Journal of Memory and Language</em>, which pooled 190 separate
        reading-speed studies. It found that adults silently read English
        non-fiction at an average of 238 WPM and fiction at 260 WPM — both a
        little lower than the 200–300 WPM range you'll see quoted in older or
        less rigorous sources.
      </p>

      <p className={pClass}>
        Reading speed also shifts with age and reading experience. The table
        below combines Brysbaert's adult baseline with commonly cited oral
        fluency benchmarks for younger readers:
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full min-w-[640px] text-sm md:text-base border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th className={thClass}>Reader</th>
              <th className={thClass}>Typical speed</th>
              <th className={thClass}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {readingSpeedByReader.map((row) => (
              <tr key={row.group}>
                <td className={`${tdClass} font-semibold`}>{row.group}</td>
                <td className={tdClass}>{row.wpm}</td>
                <td className={tdClass}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={pClass}>
        If you want a more research-backed default than the standard 200 WPM
        preset, try entering 238 into the calculator's custom speed field above
        — it's a closer match to how most adults actually read non-fiction text
        in silence.
      </p>

      <h2 className={h2Class}>Reading Time and Speaking Time</h2>

      <p className={pClass}>
        Reading silently and speaking aloud usually require different speeds,
        so the calculator provides separate controls for each. This is useful
        when the same text will be used as a speech, presentation, script,
        voiceover, lesson, or recording.
      </p>

      <p className={pClass}>
        These aren't the same "aloud" speed, either. Reading a passage aloud
        alone, with no audience, averages close to 183 WPM — the oral reading
        rate from the same Brysbaert dataset above. Speaking to an audience is
        usually slower, typically 120–150 WPM, because pauses, emphasis, and
        pacing for comprehension all eat into speed. That's why this
        calculator's speaking estimate defaults to 130 WPM rather than the
        faster solo-reading-aloud rate — it's built around how a script
        actually gets delivered, not how fast one person can read text out
        loud alone.
      </p>

      <p className={pClass}>
        Change the speaking-speed setting to match your delivery style instead
        of treating one default rate as exact. For more detail about preparing
        timed speeches, see our{" "}
        <Link href="/blog/speech-time-calculator" className={linkClass}>
          Speech Time Calculator guide
        </Link>
        .
      </p>

      <h2 className={h2Class}>What Affects Reading Time?</h2>

      <h3 className={h3Class}>Your Reading Speed</h3>
      <p className={pClass}>
        A faster WPM produces a shorter estimate, while a slower WPM produces a
        longer one. Using your own reading speed is therefore more useful than
        relying only on a site-wide average.
      </p>

      <h3 className={h3Class}>Text Difficulty and Familiarity</h3>
      <p className={pClass}>
        Technical material, unfamiliar vocabulary, dense arguments, or frequent
        pauses can make a passage take longer than the mathematical estimate.
        Familiar or simple material may be read more quickly.
      </p>

      <h3 className={h3Class}>Purpose of Reading</h3>
      <p className={pClass}>
        Skimming, close study, proofreading, and reading aloud are different
        activities. A calculator gives a useful time estimate, but your purpose
        determines how closely the final time matches that estimate.
      </p>

      <h2 className={h2Class}>Who Can Use a Reading Time Estimator?</h2>

      <p className={pClass}>
        A reading-time estimate is useful whenever content length needs to be
        translated into time. Bloggers can estimate how long a post takes to
        read, students can plan study sessions, editors can compare article
        lengths, and speakers can check whether a script fits a presentation
        window. If your draft started out as an AI-generated outline, run it
        through our{" "}
        <Link href="/tools/ai-text-cleaner" className={linkClass}>
          AI Text Cleaner
        </Link>{" "}
        first to tighten the phrasing, then check the cleaned version here to
        see how long the final piece will actually take readers to get
        through.
      </p>

      <p className={pClass}>
        If you need to inspect the text itself, use the{" "}
        <Link href="/tools/word-counter" className={linkClass}>
          Word Counter
        </Link>{" "}
        for word totals or the{" "}
        <Link href="/tools/sentence-counter" className={linkClass}>
          Sentence Counter
        </Link>{" "}
        to review sentence count and sentence length.
      </p>

      <h2 className={h2Class}>Is the Reading Time Estimate Exact?</h2>

      <p className={pClass}>
        No reading-time calculator can know exactly how long every person will
        take to read a passage. The result is an estimate based on word count
        and the WPM setting you choose. Pauses, comprehension, formatting,
        difficulty, and reading purpose can all change the real time.
      </p>

      <p className={pClass}>
        For planning, the most useful approach is to enter your own WPM and use
        the result as a practical estimate rather than a guaranteed completion
        time.
      </p>

      <h2 className={h2Class}>Your Text Stays in Your Browser</h2>

      <p className={pClass}>
        The calculator performs its text analysis in your browser. Your pasted
        text does not need to be uploaded to CountFlows to calculate the word
        count, reading time, or speaking time.
      </p>
    </section>
  )
}