// components/Sentence-counter-seo/seo-content.jsx
// SERVER component — static, people-first SEO content.
// Primary intent: sentence counter / sentence count
// Strong secondary intent: sentence length checker / how many sentences are in this text
// Keep the tool itself above this content as the main page experience.

import Link from "next/link"

const WORD_TO_SENTENCE_ROWS = [
  { words: "100 words", short: "6–7", medium: "5–6", long: "4–5" },
  { words: "200 words", short: "13–14", medium: "10–12", long: "8–10" },
  { words: "300 words", short: "20", medium: "15–18", long: "12–15" },
  { words: "500 words", short: "33–34", medium: "25–30", long: "20–25" },
  { words: "1,000 words", short: "66–67", medium: "50–59", long: "40–50" },
]

const h2Class =
  "mt-12 mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100"

const h3Class =
  "mt-7 mb-2 text-lg font-semibold text-gray-900 md:text-xl dark:text-gray-100"

const pClass =
  "mb-4 text-gray-600 leading-7 dark:text-gray-300"

const linkClass =
  "font-medium text-cyan-600 hover:underline dark:text-cyan-400"

const thClass =
  "px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100"

const tdClass =
  "px-4 py-3 align-top text-gray-600 dark:text-gray-300"

export default function SEOContent() {
  return (
    <section
      className="mx-auto max-w-4xl px-4 py-8 md:px-8"
      aria-label="Sentence Counter Information"
    >
      <h2 className={h2Class}>How to Use the Sentence Counter</h2>

      <p className={pClass}>
        Paste or type your text into the sentence counter above. The tool
        instantly shows how many sentences are in your text, along with the word
        count, average sentence length, longest sentence, shortest sentence, and
        readability estimate.
      </p>

      <ol className="mb-4 list-decimal space-y-2 pl-6 leading-7 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Paste your text.</strong> Add a paragraph, essay, article,
          report, or any other writing.
        </li>
        <li>
          <strong>Read the sentence count.</strong> The main result tells you
          exactly how many sentences the tool detected.
        </li>
        <li>
          <strong>Check sentence length.</strong> Review the average, longest,
          shortest, and line-by-line word counts to find sentences that stand
          out.
        </li>
      </ol>

      <p className={pClass}>
        The results update as you edit, so you can shorten, combine, or rewrite
        sentences and immediately see how the structure changes.
      </p>

      <h2 className={h2Class}>How Many Sentences Are in My Text?</h2>

      <p className={pClass}>
        The fastest way to answer “how many sentences is this?” is to paste the
        text into the box above. CountFlows detects sentence boundaries and
        displays the total immediately, without requiring you to count periods
        by hand.
      </p>

      <p className={pClass}>
        The sentence-by-sentence breakdown is useful when the total alone is
        not enough. Each detected sentence appears separately with its own word
        count, making it easier to compare short and long sentences in the same
        passage.
      </p>

      <h2 className={h2Class}>Sentence Length Checker</h2>

      <p className={pClass}>
        Sentence count tells you how many sentences you wrote. Sentence length
        tells you how those sentences are distributed. The checker reports the
        average number of words per sentence and identifies the longest and
        shortest sentences in your text.
      </p>

      <h3 className={h3Class}>Average Sentence Length</h3>

      <p className={pClass}>
        Average sentence length is calculated by dividing the total number of
        words by the number of sentences. There is no single ideal number for
        every type of writing. A news article, academic paper, legal document,
        and short story can all use very different sentence rhythms.
      </p>

      <p className={pClass}>
        Use the average as a comparison point rather than a strict rule. If one
        sentence is far longer than the rest, the sentence-by-sentence
        breakdown helps you find it quickly.
      </p>

      <h3 className={h3Class}>Longest and Shortest Sentences</h3>

      <p className={pClass}>
        Long sentences are not automatically bad, and short sentences are not
        automatically better. The useful question is whether the sentence fits
        the idea and remains easy to follow. CountFlows highlights length
        differences so you can decide which sentences deserve another look.
      </p>

      <h2 className={h2Class}>What Counts as a Sentence?</h2>

      <p className={pClass}>
        A sentence usually ends with a period, question mark, or exclamation
        mark, but real text is more complicated than simply counting
        punctuation. Decimal numbers and common abbreviations can contain
        periods without ending a sentence.
      </p>

      <p className={pClass}>
        When the browser supports it, CountFlows uses browser-native sentence
        segmentation. A punctuation-aware fallback is used when needed, with
        handling for decimal numbers and common abbreviations. Because sentence
        boundaries can still be ambiguous in unusual writing, quoted dialogue,
        names, or unconventional punctuation, review the breakdown when an
        exact count is critical.
      </p>

      <h2 className={h2Class}>Sentence Count vs. Word Count</h2>

      <p className={pClass}>
        Word count measures the size of your text. Sentence count measures how
        that text is divided. Two 500-word articles can have the same word count
        but very different sentence structures if one uses short sentences and
        the other uses long ones.
      </p>

      <p className={pClass}>
        For a complete word total, use the{" "}
        <Link
          href="/tools/word-counter"
          className={linkClass}
        >
          Word Counter
        </Link>
        . Then use this page to inspect how those words are distributed across
        sentences.
      </p>

      <h2 className={h2Class}>
        How Many Sentences Are 100, 200, 500 or 1,000 Words?
      </h2>

      <p className={pClass}>
        There is no fixed conversion from words to sentences because sentence
        length varies. The table below gives rough examples using short,
        medium, and longer average sentence lengths. Use it for planning only;
        paste the finished text into the counter for the actual sentence count.
      </p>

      <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[700px] text-sm md:text-base">
          <thead className="bg-cyan-50 dark:bg-cyan-900/30">
            <tr>
              <th className={thClass}>Word count</th>
              <th className={thClass}>~15 words/sentence</th>
              <th className={thClass}>~17–20 words/sentence</th>
              <th className={thClass}>~20–25 words/sentence</th>
            </tr>
          </thead>

          <tbody>
            {WORD_TO_SENTENCE_ROWS.map((row) => (
              <tr
                key={row.words}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className={`${tdClass} font-medium text-gray-800 dark:text-gray-200`}>
                  {row.words}
                </td>
                <td className={tdClass}>{row.short}</td>
                <td className={tdClass}>{row.medium}</td>
                <td className={tdClass}>{row.long}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={h2Class}>Sentence Counter for Essays and Articles</h2>

      <p className={pClass}>
        Students and writers can use the counter to inspect sentence structure
        without changing the text. Paste an essay, blog post, report, or draft
        to compare sentence lengths, find unusually long sentences, and see how
        the writing is paced.
      </p>

      <p className={pClass}>
        If you are working toward a specific length requirement, pair the
        sentence count with the{" "}
        <Link
          href="/tools/word-counter"
          className={linkClass}
        >
          Word Counter
        </Link>{" "}
        and{" "}
        <Link
          href="/tools/character-counter"
          className={linkClass}
        >
          Character Counter
        </Link>
        .
      </p>

      <h2 className={h2Class}>Readability and Sentence Length</h2>

      <p className={pClass}>
        The tool also shows a readability estimate based on sentence length and
        syllable counts. Treat that score as a signal rather than a judgment of
        writing quality. Vocabulary, audience, subject matter, formatting, and
        sentence variety can all affect how easy a passage feels to read.
      </p>

      <p className={pClass}>
        A useful workflow is to start with the sentence breakdown, inspect the
        longest sentences, and then use the readability estimate as additional
        context. That keeps the analysis focused on specific sentences instead
        of chasing a single score.
      </p>

      <h2 className={h2Class}>Is the Sentence Counter Private?</h2>

      <p className={pClass}>
        Sentence analysis runs in your browser. Your text does not need to be
        uploaded to CountFlows to calculate the sentence count, sentence
        lengths, or readability result. This makes the tool practical for
        drafts that you would rather not paste into a server-based analyzer.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/60">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          Related text tools
        </p>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href="/tools/word-counter"
            className={linkClass}
          >
            Word Counter
          </Link>

          <Link
            href="/tools/character-counter"
            className={linkClass}
          >
            Character Counter
          </Link>

          <Link
            href="/tools/reading-time"
            className={linkClass}
          >
            Reading Time Calculator
          </Link>

          <Link
            href="/tools/syllable-counter"
            className={linkClass}
          >
            Syllable Counter
          </Link>

          <Link
            href="/tools/ai-text-cleaner"
            className={linkClass}
          >
            AI Text Cleaner
          </Link>
        </div>
      </div>
    </section>
  )
}