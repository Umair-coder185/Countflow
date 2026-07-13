import Link from "next/link";

const wordToSentenceRows = [
  { words: "50 words", short: "3–4", long: "2–3" },
  { words: "100 words", short: "6–7", long: "5" },
  { words: "150 words", short: "10", long: "7–8" },
  { words: "200 words", short: "13", long: "10" },
  { words: "250 words", short: "16–17", long: "12–13" },
  { words: "300 words", short: "20", long: "15" },
  { words: "500 words", short: "33", long: "25" },
  { words: "1,000 words", short: "66", long: "50" },
];

const sentenceLengthRows = [
  { range: "Under 14 words", verdict: "Very easy — news style, high comprehension" },
  { range: "15–20 words", verdict: "Clear and natural — the target for most writing" },
  { range: "21–25 words", verdict: "Fairly difficult — fine in moderation" },
  { range: "26–40 words", verdict: "Difficult — readers start re-reading" },
  { range: "Over 40 words", verdict: "Very difficult — comprehension drops sharply" },
];

const h2Class =
  "text-2xl md:text-3xl font-bold mb-6 mt-12 first:mt-0 text-gray-800 dark:text-gray-100";
const h3Class =
  "text-xl md:text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300";
const pClass = "text-gray-600 dark:text-gray-400 leading-relaxed mb-6";
const linkClass =
  "text-blue-600 dark:text-blue-400 hover:underline font-semibold";
const tableWrapClass = "overflow-x-auto mb-6";
const tableClass =
  "w-full text-sm md:text-base border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden";
const thClass =
  "bg-cyan-50 dark:bg-gray-900 text-left px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700";
const tdClass =
  "px-4 py-3 text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800";

export default function SEOContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 bg-gradient-to-b from-gray-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
      {/* What is a sentence counter */}
      <h2 className={h2Class}>
        What Is a Sentence Counter and How Do You Use It?
      </h2>
      <p className={pClass}>
        A sentence counter shows how many sentences your text contains, along
        with your average sentence length — the number that decides whether
        your writing feels crisp or exhausting. Paste your draft into the box
        above, or type directly, and the count updates in real time. There is
        no button to press and no upload step: everything is counted in your
        browser as you edit.
      </p>
      <p className={pClass}>
        Alongside the sentence count, the tool shows your word count, your
        longest sentence, and a readability score, so you can spot the exact
        sentence that is dragging your paragraph down — not just know that one
        exists.
      </p>

      {/* What counts as a sentence */}
      <h2 className={h2Class}>What Counts as a Sentence?</h2>
      <p className={pClass}>
        The tool counts a sentence every time text ends with a period, question
        mark, or exclamation point. That matches how most word processors
        count, but no automatic counter is perfect: abbreviations like
        &ldquo;Dr.&rdquo; or &ldquo;e.g.&rdquo; and decimal numbers can
        register as extra sentence breaks in any tool of this kind. For an
        essay with a hard requirement, treat the count as accurate to within a
        sentence or two, and check the flagged longest sentence by eye.
      </p>
      <p className={pClass}>
        This is also why your count here may differ slightly from Microsoft
        Word or Grammarly — each tool draws sentence boundaries a little
        differently, the same way word counts differ between programs.
      </p>

      {/* How many sentences is 100 words */}
      <h2 className={h2Class}>How Many Sentences Is 100 Words?</h2>
      <p className={pClass}>
        About 5 to 7 sentences. A typical written sentence runs 15 to 20
        words, so 100 words divides into five longer sentences or seven
        shorter ones. Here is the full conversion at both paces:
      </p>
      <div className={tableWrapClass}>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Word count</th>
              <th className={thClass}>Sentences (short, ~15 words)</th>
              <th className={thClass}>Sentences (long, ~20 words)</th>
            </tr>
          </thead>
          <tbody>
            {wordToSentenceRows.map((row) => (
              <tr key={row.words}>
                <td className={tdClass}>{row.words}</td>
                <td className={tdClass}>{row.short}</td>
                <td className={tdClass}>{row.long}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={pClass}>
        Writing against a word limit instead? Check your total with the{" "}
        <Link href="/tools/word-counter" className={linkClass}>
          Word Counter
        </Link>
        , then come back to balance the sentences inside it.
      </p>

      {/* Sentences per paragraph */}
      <h2 className={h2Class}>How Many Sentences Are in a Paragraph?</h2>
      <p className={pClass}>
        Most paragraphs run 3 to 8 sentences, but the honest answer depends on
        what you are writing. Purdue University&rsquo;s Online Writing Lab
        recommends aiming for three to five or more sentences per paragraph,
        with one main idea per paragraph. Academic essays stretch longer — six
        to eight sentences is normal — while web writing and journalism drop
        to one to three, because short paragraphs survive skimming.
      </p>
      <p className={pClass}>
        The better rule: one idea per paragraph, however many sentences that
        takes. If a paragraph holds eight sentences but makes one point twice,
        it is not a long paragraph — it is two ideas short.
      </p>

      {/* Average sentence length */}
      <h2 className={h2Class}>What Is a Good Average Sentence Length?</h2>
      <p className={pClass}>
        Aim for an average of 15 to 20 words per sentence. Research by the
        American Press Institute found that readers understand more than 90%
        of what they read when the average sentence runs about 14 words — and
        comprehension collapses to under 10% at 43 words. The New York Times
        averages roughly 15 words per sentence for exactly this reason.
      </p>
      <div className={tableWrapClass}>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Average sentence length</th>
              <th className={thClass}>How it reads</th>
            </tr>
          </thead>
          <tbody>
            {sentenceLengthRows.map((row) => (
              <tr key={row.range}>
                <td className={tdClass}>{row.range}</td>
                <td className={tdClass}>{row.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={pClass}>
        Averages hide variety, though. Strong writing mixes a 5-word punch
        with a 25-word explanation. If your average is 18 but every sentence
        is exactly 18 words, the rhythm goes flat — that is what the
        longest-sentence stat above is for.
      </p>

      {/* Run-on sentences */}
      <h2 className={h2Class}>How to Spot and Fix a Run-On Sentence</h2>
      <p className={pClass}>
        A run-on sentence is two complete sentences joined without the right
        punctuation or connecting word. The most common type is the comma
        splice: &ldquo;I love writing, it helps me relax.&rdquo; Both halves
        could stand alone as sentences, so a comma alone cannot hold them
        together.
      </p>
      <p className={pClass}>Three fixes, using that example:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
        <li>
          <strong>Split it:</strong> I love writing. It helps me relax.
        </li>
        <li>
          <strong>Add a conjunction:</strong> I love writing, because it helps
          me relax.
        </li>
        <li>
          <strong>Use a semicolon:</strong> I love writing; it helps me relax.
        </li>
      </ul>
      <p className={pClass}>
        A long sentence is not automatically a run-on — a grammatically
        correct 35-word sentence is just a long sentence. But the two travel
        together: when this tool flags your longest sentence at 40+ words,
        read it aloud. If you run out of breath before the period, your reader
        ran out of patience two clauses earlier.
      </p>

      {/* US & UK essays */}
      <h2 className={h2Class}>
        Sentence Counts for Essays and Applications (US &amp; UK)
      </h2>
      <p className={pClass}>
        Sentence counting matters most when a word or character limit is
        breathing down your neck:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
        <li>
          <strong>US college essays:</strong> The Common App personal
          statement caps at 650 words — roughly 35 to 43 sentences. Admissions
          readers skim, so shorter sentences stretch that budget further.
        </li>
        <li>
          <strong>UK personal statements:</strong> UCAS allows 4,000
          characters including spaces — about 600 words, or 30 to 40
          sentences. Character limits punish long sentences twice, since
          connectives eat characters fast.
        </li>
        <li>
          <strong>University essays:</strong> Most UK universities apply a 10%
          leeway on word limits; US institutions vary. Either way, markers
          reward a controlled average sentence length — it reads as clarity,
          not padding.
        </li>
      </ul>
      <p className={pClass}>
        For full word-count targets by essay type, see our{" "}
        <Link href="/blog/manage-essay-word-count" className={linkClass}>
          Essay Word Count Guide
        </Link>
        .
      </p>

      {/* AI angle */}
      <h2 className={h2Class}>
        Why a Sentence Counter Matters in the Age of AI
      </h2>
      <p className={pClass}>
        AI drafts have a tell: uniform sentences. Ask a chatbot for an essay
        and you often get sentence after sentence in the same 18-to-22-word
        band, which is exactly what makes AI text feel flat. Paste any AI
        draft here and the pattern shows up immediately — a suspiciously
        consistent average and no short sentences at all.
      </p>
      <p className={pClass}>
        Editing AI output is now half of writing, and this tool makes the two
        highest-value edits visible: break the monotone rhythm, and cut the
        padded sentences. Unlike pasting your draft into another AI tool to
        check it, nothing here is sent to a server, logged, or used for
        training.
      </p>

      {/* Privacy */}
      <h2 className={h2Class}>Your Text Never Leaves Your Browser</h2>
      <p className={pClass}>
        Like every CountFlows tool, the Sentence Counter runs entirely on your
        device. Your text is never uploaded, never stored, and never read by
        anyone. Paste a confidential report or an unpublished chapter — close
        the tab, and it is gone. No sign-up, no word limit, no premium tier.
      </p>

      {/* Related tools */}
      <h2 className={h2Class}>More Free CountFlows Tools</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
        <li>
          <Link href="/tools/word-counter" className={linkClass}>
            Word Counter
          </Link>{" "}
          — count words, characters, and reading time as you type.
        </li>
        <li>
          <Link href="/tools/character-counter" className={linkClass}>
            Character Counter
          </Link>{" "}
          — check your text against platform character limits.
        </li>
        <li>
          <Link href="/tools/reading-time" className={linkClass}>
            Reading Time Calculator
          </Link>{" "}
          — estimate reading and speaking time.
        </li>
        <li>
          <Link href="/tools/keyword-density-checker" className={linkClass}>
            Keyword Density Checker
          </Link>{" "}
          — keep keyword usage natural before you publish.
        </li>
        <li>
          <Link href="/tools/case-converter" className={linkClass}>
            Case Converter
          </Link>{" "}
          — fix capitalization in one click.
        </li>
      </ul>

      {/* Related guides */}
      <h2 className={h2Class}>Related Guides</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
        <li>
          <Link href="/blog/common-writing-mistakes" className={linkClass}>
            11 Common Writing Mistakes That Kill Your Credibility
          </Link>
        </li>
        <li>
          <Link href="/blog/manage-essay-word-count" className={linkClass}>
            Essay Word Count Guide: How Long Is an Essay?
          </Link>
        </li>
        <li>
          <Link href="/blog/how-long-should-a-blog-post-be" className={linkClass}>
            How Long Should a Blog Post Be?
          </Link>
        </li>
      </ul>
    </section>
  );
}