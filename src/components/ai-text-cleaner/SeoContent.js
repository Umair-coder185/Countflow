import Link from "next/link"

const h2Class =
  "text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4"
const h3Class =
  "text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2"
const pClass = "text-gray-600 dark:text-gray-300 leading-7 mb-4"
const linkClass =
  "text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
const thClass = "px-4 py-3 font-semibold text-gray-900 dark:text-gray-100"
const tdClass = "px-4 py-3 align-top"
const trClass = "border-t border-gray-200 dark:border-gray-700"

export default function SeoContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <h2 className={h2Class}>How to Clean AI-Generated Text Online</h2>
      <p className={pClass}>You can clean up AI generated text in three simple steps:</p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
        <li>
          <strong>Paste your text</strong> from ChatGPT, Claude, Gemini, or any AI tool
          into the box above.
        </li>
        <li>
          <strong>Toggle the cleaners you need</strong>: markdown symbols, em dashes,
          invisible characters, smart quotes, extra spaces, bullets, or emojis.
        </li>
        <li>
          <strong>Click Clean Text and copy the result</strong>: clean, plain text ready
          to paste into a document, email, or CMS.
        </li>
      </ol>
      <p className={pClass}>
        There is no upload step and no processing delay. The cleaning happens instantly in
        your browser, whether you paste a two-line caption or a fifty-page report.
      </p>

      <h2 className={h2Class}>What This AI Text Cleaner Removes</h2>
      <p className={pClass}>
        Each cleaner targets one specific artifact that AI chatbots leave behind. Toggle
        them individually, so you only remove what you actually want gone.
      </p>

      <h3 className={h3Class}>Markdown symbols (** ## ` and more)</h3>
      <p className={pClass}>
        ChatGPT writes in markdown, so copied text arrives full of asterisks around bold
        words, hashtags before headings, backticks around terms, and bracket-parenthesis
        pairs around links. This cleaner removes the markdown formatting from your text
        while keeping every word: **important** becomes important, ## Summary becomes
        Summary, and [our site](url) becomes our site.
      </p>

      <h3 className={h3Class}>Em dashes (—)</h3>
      <p className={pClass}>
        The em dash is the single most recognizable tic of AI writing: models scatter
        them through every paragraph. The cleaner replaces spaced em dashes with a natural
        comma and tight em dashes with a regular hyphen, so the rhythm of your text reads
        like a person wrote it. No more manual find-and-replace for the — character.
      </p>

      <h3 className={h3Class}>Invisible and hidden characters</h3>
      <p className={pClass}>
        AI output often carries characters you cannot see: zero-width spaces, non-breaking
        spaces, soft hyphens, and byte-order marks. They are the reason pasted text wraps
        strangely in Google Docs, breaks Ctrl+F searches, and corrupts spreadsheet
        formulas. The invisible character remover deletes zero-width characters entirely
        and converts every exotic space (non-breaking, thin, ideographic) back to a
        regular space.
      </p>

      <h3 className={h3Class}>Smart quotes and ellipses</h3>
      <p className={pClass}>
        Curly “smart” quotes and the … ellipsis character look fine in a document but
        break code, JSON, CSV files, and many CMS fields. This option converts them to
        straight keyboard quotes and three plain dots, which is essential when you are
        pasting AI text into anything technical.
      </p>

      <h3 className={h3Class}>Extra spaces and line breaks</h3>
      <p className={pClass}>
        AI answers love double spaces and triple line breaks. The whitespace cleaner trims
        trailing spaces, collapses repeated spaces into one, and caps blank lines at a
        single empty line, leaving compact, tidy paragraphs without deleting your
        intentional paragraph structure.
      </p>

      <h3 className={h3Class}>Bullets and emojis (optional)</h3>
      <p className={pClass}>
        Two cleaners stay off by default because sometimes you want to keep them. Remove
        bullet points strips leading dashes, dots, and numbering when you are converting a
        list into prose. Remove emojis deletes every 🚀 and ✅ that chatbots sprinkle
        into professional text.
      </p>

      <h2 className={h2Class}>AI Text Cleaner Options at a Glance</h2>
      <p className={pClass}>
        Here is every cleaner in one place: what it fixes, a quick example, and whether it
        is switched on by default.
      </p>
      <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[640px] text-left text-sm md:text-base">
          <thead className="bg-cyan-50 dark:bg-cyan-900/30">
            <tr>
              <th className={thClass}>Cleaner</th>
              <th className={thClass}>What it fixes</th>
              <th className={thClass}>Example</th>
              <th className={thClass}>Default</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300">
            <tr className={trClass}>
              <td className={tdClass}>Markdown symbols</td>
              <td className={tdClass}>Asterisks, hashtags, backticks, link brackets</td>
              <td className={tdClass}>**important** becomes important</td>
              <td className={tdClass}>On</td>
            </tr>
            <tr className={trClass}>
              <td className={tdClass}>Em dashes</td>
              <td className={tdClass}>Spaced dashes become commas, tight dashes become hyphens</td>
              <td className={tdClass}>fast — and free becomes fast, and free</td>
              <td className={tdClass}>On</td>
            </tr>
            <tr className={trClass}>
              <td className={tdClass}>Invisible characters</td>
              <td className={tdClass}>Zero-width spaces, non-breaking spaces, soft hyphens</td>
              <td className={tdClass}>Hidden characters you cannot see are deleted</td>
              <td className={tdClass}>On</td>
            </tr>
            <tr className={trClass}>
              <td className={tdClass}>Smart quotes</td>
              <td className={tdClass}>Curly quotes and ellipsis characters</td>
              <td className={tdClass}>“hello”… becomes "hello"...</td>
              <td className={tdClass}>On</td>
            </tr>
            <tr className={trClass}>
              <td className={tdClass}>Extra spaces</td>
              <td className={tdClass}>Double spaces and stacked blank lines</td>
              <td className={tdClass}>Collapses gaps into single spaces and lines</td>
              <td className={tdClass}>On</td>
            </tr>
            <tr className={trClass}>
              <td className={tdClass}>Bullet points</td>
              <td className={tdClass}>Leading dashes, dots, and list numbering</td>
              <td className={tdClass}>- first item becomes first item</td>
              <td className={tdClass}>Off</td>
            </tr>
            <tr className={trClass}>
              <td className={tdClass}>Emojis</td>
              <td className={tdClass}>Emoji and pictograph characters</td>
              <td className={tdClass}>Done 🚀 ✅ becomes Done</td>
              <td className={tdClass}>Off</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={h2Class}>Why AI Text Looks Messy When You Paste It</h2>
      <p className={pClass}>
        Chatbots do not send you styled text. They send markdown, a plain-text formatting
        language, which the chat window renders as bold, headings, and lists. When you copy
        from the chat, some apps grab the rendered styling and others grab the raw markdown
        symbols. That is why the same answer pastes beautifully into one app and shows up
        in Notepad, WhatsApp, or your CMS as a mess of asterisks and hashtags. A text
        cleaner is the reliable fix: convert the AI output to clean plain text once, then
        paste it anywhere with confidence.
      </p>

      <h2 className={h2Class}>Who Uses an AI Text Cleaner</h2>
      <p className={pClass}>
        <strong>Writers and bloggers</strong> turn AI drafts into clean copy before
        editing, and strip the em dashes and smart quotes that make text feel
        machine-written.
      </p>
      <p className={pClass}>
        <strong>Students</strong> clean research notes and summaries so they paste into
        Word and Google Docs without broken spacing and stray symbols.
      </p>
      <p className={pClass}>
        <strong>Social media managers</strong> clean captions first, because platforms
        like Instagram and LinkedIn show markdown symbols as literal characters. Then they
        check the caption against platform limits with the{" "}
        <Link href="/tools/character-counter" className={linkClass}>
          Character Counter
        </Link>
        .
      </p>
      <p className={pClass}>
        <strong>Marketers and SEO teams</strong> paste AI content into a CMS without
        smart quotes breaking meta tags, then run the{" "}
        <Link href="/tools/keyword-density-checker" className={linkClass}>
          Keyword Density Checker
        </Link>{" "}
        to keep the wording natural.
      </p>
      <p className={pClass}>
        For <strong>developers and data teams</strong>, invisible Unicode characters and
        curly quotes silently break code snippets, JSON, and CSV imports. One clean pass
        removes the special characters from AI text before it touches a codebase.
      </p>

      <h2 className={h2Class}>Your Text Never Leaves Your Browser</h2>
      <p className={pClass}>
        Like every CountFlows tool, the AI Text Cleaner runs entirely on your device. Your
        text is never uploaded to a server, never logged, and never stored. Paste a
        confidential report or an unpublished draft; close the tab, and it is gone.
        There is no word limit, no sign-up wall, and no premium tier.
      </p>

      <h2 className={h2Class}>More Free Text Tools</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-7">
        <li>
          <Link href="/tools/case-converter" className={linkClass}>
            Case Converter
          </Link>{" "}
          - fix capitalization after cleaning: sentence case, title case, and more.
        </li>
        <li>
          <Link href="/tools/word-counter" className={linkClass}>
            Word Counter
          </Link>{" "}
          - count words, characters, and sentences as you type.
        </li>
        <li>
          <Link href="/tools/character-counter" className={linkClass}>
            Character Counter
          </Link>{" "}
          - check your cleaned text against platform character limits.
        </li>
        <li>
          <Link href="/tools/keyword-density-checker" className={linkClass}>
            Keyword Density Checker
          </Link>{" "}
          - keep keyword usage natural before you publish.
        </li>
        <li>
          <Link href="/tools/syllable-counter" className={linkClass}>
            Syllable Counter
          </Link>{" "}
          — count syllables in words, sentences, and poems.
        </li>
      </ul>
    </section>
  )
}