import Link from "next/link"

const h2Class = "text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 mt-12"
const pClass = "text-gray-600 dark:text-gray-400 leading-relaxed mb-6"
const listClass = "list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2"
const linkClass = "text-cyan-600 dark:text-cyan-400 font-medium hover:underline"

export default function SEOContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 bg-gradient-to-b from-gray-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
      <h2 className={h2Class}>What Is a Word Counter and How Do You Use It?</h2>
      <p className={pClass}>
        A word counter instantly tells you how many words are in your text. Paste content from
        Google Docs, Word, or any app — or type directly into the box — and the count updates in
        real time, along with characters, sentences, paragraphs, and estimated reading time. There
        is no button to press and no upload step: everything is counted in your browser as you
        edit, so you can watch the number climb toward your target while you write.
      </p>

      <h2 className={h2Class}>How Many Pages Is 1,000 Words?</h2>
      <p className={pClass}>
        The quick answer: about 2 pages single-spaced or 4 pages double-spaced, using 12-point font
        and normal margins. A standard page holds roughly 500 words single-spaced or 250 words
        double-spaced, so 500 words is one to two pages and 2,000 words is four to eight. Font,
        margins, and headings shift these numbers, which is why a word count is always more precise
        than a page count. For a full words-to-pages conversion table, see{" "}
        <Link href="/blog/how-many-pages-is-2000-words" className={linkClass}>
          How Many Pages Is 2,000 Words?
        </Link>
      </p>

      <h2 className={h2Class}>How Many Words Should Your Writing Be?</h2>
      <ul className={listClass}>
        <li>
          <strong>College essays:</strong> 500–1,500 words for most assignments; admissions essays
          often cap at 650. Get targets for every essay type in our{" "}
          <Link href="/blog/manage-essay-word-count" className={linkClass}>
            Essay Word Count Guide
          </Link>
          .
        </li>
        <li>
          <strong>Blog posts:</strong> 1,000–2,000 words; in-depth guides often run longer — see{" "}
          <Link href="/blog/how-long-should-a-blog-post-be" className={linkClass}>
            How Long Should a Blog Post Be?
          </Link>
        </li>
        <li>
          <strong>SEO articles:</strong> typically 1,500+ words, but depth matters more than
          length.
        </li>
        <li>
          <strong>Cover letters:</strong> 250–400 words — one page, never more. Full breakdown in
          our{" "}
          <Link href="/blog/cover-letter-word-count" className={linkClass}>
            Cover Letter Word Count Guide
          </Link>
          .
        </li>
        <li>
          <strong>Abstracts:</strong> 150–300 words for most journals.
        </li>
        <li>
          <strong>Novels:</strong> most adult fiction lands between 70,000 and 100,000 words —
          see the genre-by-genre numbers in{" "}
          <Link href="/blog/how-many-words-in-a-novel" className={linkClass}>
            How Many Words in a Novel?
          </Link>
        </li>
        <li>
          <strong>Undergraduate dissertations:</strong> 8,000–12,000 words; master's 12,000–20,000;
          PhD 60,000–100,000.
        </li>
        <li>
          <strong>Social media posts:</strong> 50–300 words — check exact platform limits with the{" "}
          <Link href="/tools/character-counter" className={linkClass}>
            Character Counter
          </Link>
          , since platforms cut by characters, not words.
        </li>
      </ul>

      <h2 className={h2Class}>Does Word Count Include Citations and References?</h2>
      <p className={pClass}>
        Usually, in-text citations and quotations count toward your word count, while the reference
        list or bibliography at the end does not. But this is set by your institution, not by any
        universal rule — some universities count everything, others exclude quotes. Check your
        assignment brief first, and if it is unclear, ask your instructor. To check your body text
        alone, paste it without the reference section and read the count from there.
      </p>

      <h2 className={h2Class}>Why Does My Word Count Differ From Word or Google Docs?</h2>
      <p className={pClass}>
        Every program counts slightly differently. Hyphenated words, dates, number ranges like
        1.3–5.0, and terms with slashes can register as one word in Microsoft Word but two in
        Google Docs, so a difference of a few dozen words on a long document is completely normal.
        If you are submitting against a hard limit, always confirm with the tool your instructor,
        editor, or competition specifies — and leave a small buffer. If Docs is your main editor,
        see our step-by-step guide:{" "}
        <Link href="/blog/check-word-count-in-google-docs" className={linkClass}>
          How to Check Word Count in Google Docs
        </Link>
        .
      </p>

      <h2 className={h2Class}>Why a Word Counter Matters in the Age of AI</h2>
      <p className={pClass}>
        Here is something most people discover the hard way: AI assistants cannot count words
        reliably. Ask ChatGPT for a 1,000-word essay and you might get 600 or 1,400 — language
        models process tokens, not words, so they estimate length instead of measuring it. That
        makes an exact word counter more useful now, not less:
      </p>
      <ul className={listClass}>
        <li>
          <strong>Verify AI output</strong> — paste any AI draft here to check whether it actually
          hit the length you asked for before you submit or publish it.
        </li>
        <li>
          <strong>Trim AI padding</strong> — AI drafts tend to run wordy. Watching the count while
          you cut filler phrases is the fastest way to tighten a draft to its target.
        </li>
        <li>
          <strong>Stay private</strong> — unlike pasting text into an AI chatbot, nothing you paste
          here is sent to a server, logged, or used for training. Count a confidential document,
          close the tab, and it is gone.
        </li>
      </ul>

      <h2 className={h2Class}>Features of This Word Counter</h2>
      <ul className={listClass}>
        <li>Real-time word and character counts as you type</li>
        <li>Sentence and paragraph analysis with a readability level</li>
        <li>Word goal tracker for hitting exact targets</li>
        <li>
          Reading time estimates based on published research —{" "}
          <Link href="/blog/average-reading-speed" className={linkClass}>
            238 words per minute
          </Link>{" "}
          for silent reading
        </li>
        <li>Fast, mobile-friendly, and 100% private — your text never leaves your browser</li>
      </ul>

      <h2 className={h2Class}>More Free CountFlows Tools</h2>
      <ul className={listClass}>
        <li>
          <Link href="/tools/character-counter" className={linkClass}>
            Character Counter
          </Link>{" "}
          — check your text against platform character limits.
        </li>
        <li>
          <Link href="/tools/sentence-counter" className={linkClass}>
            Sentence Counter
          </Link>{" "}
          — check sentence count and average sentence length for readability.
        </li>
        <li>
          <Link href="/tools/reading-time" className={linkClass}>
            Reading Time Calculator
          </Link>{" "}
          — estimate how long your text takes to read or speak aloud.
        </li>
        <li>
          <Link href="/tools/keyword-density-checker" className={linkClass}>
            Keyword Density Checker
          </Link>{" "}
          — keep keyword usage natural before you publish.
        </li>

        <li>
          <Link href="/tools/ai-text-cleaner" className={linkClass}>
            AI Text Cleaner
          </Link>{" "}
          — remove AI artifacts, formatting, and spaces from your text.
        </li>
        <li>
          <Link href="/tools/syllable-counter" className={linkClass}>
            Syllable Counter
          </Link>{" "}
          — count syllables in words, sentences, and poems.
        </li>
        <li>
          <Link href="/tools/word-counter" className={linkClass}>
            Word Counter
          </Link>{" "}
          — check word count, character count, and reading time in real time.
        </li>
        <li>
          <Link href="/tools/case-converter" className={linkClass}>
            Case Converter
          </Link>{" "}
        </li>

      </ul>
    </section>
  )
}