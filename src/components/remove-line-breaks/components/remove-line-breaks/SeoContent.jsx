import Link from "next/link"

const BREAK_SOURCES = [
  { source: "PDF files", why: "Hard break at end of every printed line", fix: "Preserve Paragraphs mode" },
  { source: "Microsoft Word", why: "Shift+Enter breaks mixed with paragraph marks", fix: "Remove All or Find & Replace" },
  { source: "Excel / Google Sheets", why: "Alt+Enter inserts break inside a cell", fix: "Custom separator or Remove All" },
  { source: "ChatGPT / AI output", why: "Markdown double-breaks between paragraphs", fix: "Preserve Paragraphs mode" },
  { source: "Email threads", why: "Sender's client wrapped lines at 72 characters", fix: "Remove All line breaks" },
  { source: "Notepad copies", why: "Plain text files use system-specific line endings", fix: "Remove All breaks" },
]

const MORE_TOOLS = [
  { href: "/tools/ai-token-counter", name: "AI Token Counter", desc: "count tokens in your AI prompts and responses." },
  { href: "/tools/reading-time", name: "Reading Time Calculator", desc: "estimate how long it takes to read your content." },
  { href: "/tools/word-counter", name: "Word Counter", desc: "count words, characters, and reading time as you type." },
  { href: "/tools/character-counter", name: "Character Counter", desc: "check character count with and without spaces." },
  { href: "/tools/case-converter", name: "Case Converter", desc: "fix capitalization in one click." },
  { href: "/tools/ai-text-cleaner", name: "AI Text Cleaner", desc: "remove AI artifacts, formatting, and spaces from your text." },
  { href: "/tools/remove-line-breaks", name: "Remove Line Breaks", desc: "strip unwanted line breaks from text pasted out of PDFs and emails instantly." },
]

const h2Class = "text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white"
const pClass = "text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed"
const linkClass = "text-blue-500 hover:underline"

export default function SeoContent() {
  return (
    <article aria-label="Remove Line Breaks Tool Information">
      <section
        className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="why-text-gets-broken"
      >
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="space-y-4">
            <h2 id="why-text-gets-broken" className={h2Class}>
              Why Text Gets Broken in the First Place
            </h2>
            <p className={pClass}>
              The problem is not your clipboard. It is how different applications encode line
              endings. A PDF renders each printed line with a hard break baked in — carriage
              return plus newline on Windows, just a newline on Mac. That is invisible inside the
              PDF viewer. The second you paste it into Gmail, Notion, Salesforce, or a Google
              Doc, those hidden characters show up as broken sentence fragments. A paragraph that
              looked perfect becomes ten separate lines of mangled text.
            </p>
            <p className={pClass}>
              The same thing happens when you copy output from ChatGPT or Claude, which injects
              Markdown double-breaks between every paragraph. Or when you pull a cell from Excel
              where someone edited with Alt+Enter. Or export from Word using Shift+Enter manual
              line breaks instead of paragraph marks. Or forward an email thread where the
              sender's client wrapped text at 72 characters. None of these are bugs. They are
              format collisions — and a line break remover fixes all of them in one paste.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="three-modes" className={h2Class}>
              Three Modes — Pick the One That Fits
            </h2>
            <p className={pClass}>
              Not every cleanup job is the same. That is why the tool gives you three distinct
              removal modes, each designed for a different type of broken text.
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              <li>
                <strong>Remove All Line Breaks</strong> joins every line into a single
                continuous block of text, with a space inserted between each joined line. Use this
                when you are building a CSV row, flattening text for an API payload, or cleaning
                a pasted list for a search query. Best for: developers, data teams, anyone
                pushing text into a single-field input.
              </li>
              <li>
                <strong>Preserve Paragraph Spacing</strong> is more surgical. It strips the
                single line breaks that chop up sentences inside a paragraph but leaves the blank
                lines between paragraphs alone. The structure of your document survives. The ugly
                mid-sentence breaks disappear. Best for: writers republishing PDF content, editors
                cleaning up Word exports, anyone who needs readable prose without rebuilding the
                whole document.
              </li>
              <li>
                <strong>Replace With a Custom Separator</strong> swaps line breaks for something
                useful — a comma, pipe symbol, semicolon, or any character you type. Just paste
                your multi-line text and the breaks get replaced instantly. Best for: turning
                pasted lists into data structures, formatting inputs for spreadsheets or databases.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 id="how-to-in-3-steps" className={h2Class}>
              How to Remove Line Breaks in 3 Steps
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              <li>
                <strong>Paste your text</strong> into the input box. No character limit — a
                single sentence or a 10,000-word document both work the same way.
              </li>
              <li>
                <strong>Choose your mode.</strong> Not sure? Start with Preserve Paragraphs.
                It is the safest default for most cleanup jobs.
              </li>
              <li>
                <strong>Copy the result.</strong> Your original text stays in the input box, so
                if the first mode is not right, switch and try again without repasting. No button
                to click, no page reload — the cleaned text updates the moment you paste.
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <h2 id="native-methods" className={h2Class}>
              Remove Line Breaks in Word, Excel, Google Docs &amp; Sheets
            </h2>
            <p className={pClass}>
              Sometimes you need to fix the problem inside the app itself. Here is how each one
              works natively:
            </p>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Microsoft Word</h3>
              <p className={pClass}>
                Open Find &amp; Replace (Ctrl+H). In the Find field, type <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm">^p</code> to
                find paragraph marks or <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm">^l</code> to find manual line
                breaks. Replace with a space or leave blank to delete. For complex documents with
                tables, test on a small section first — this method can clip headers in longer files.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Excel</h3>
              <p className={pClass}>Select the problem cell and use this formula in an adjacent column:</p>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm text-gray-900 dark:text-gray-100">
                =SUBSTITUTE(A1,CHAR(10)," ")
              </div>
              <p className={pClass}>
                This replaces every line break (ASCII character 10) with a space. Drag it down the
                column, then paste as values to clean the full dataset. For one-off fixes, pasting
                here is faster.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Google Sheets</h3>
              <p className={pClass}>
                Same formula as Excel: <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm">=SUBSTITUTE(A1,CHAR(10)," ")</code>. Google
                Sheets uses the same line break character (CHAR 10), so the logic is identical.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Google Docs</h3>
              <p className={pClass}>
                Go to Find &amp; Replace and enable Regular expressions. In the Find field, enter <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm">\n</code>. Replace
                with a space. This handles most cases, though complex formatting in longer documents
                can behave unexpectedly — test first.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 id="break-sources" className={h2Class}>Where Unwanted Line Breaks Come From</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-slate-700 text-left">
                    <th className="px-3 py-3 font-semibold">Source</th>
                    <th className="px-3 py-3 font-semibold">Why breaks appear</th>
                    <th className="px-3 py-3 font-semibold">Recommended fix</th>
                  </tr>
                </thead>
                <tbody>
                  {BREAK_SOURCES.map((row) => (
                    <tr key={row.source} className="border-b border-gray-200 dark:border-slate-800">
                      <td className="px-3 py-3 font-medium">{row.source}</td>
                      <td className="px-3 py-3 text-gray-600 dark:text-slate-400">{row.why}</td>
                      <td className="px-3 py-3 text-gray-600 dark:text-slate-400">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h2 id="who-uses" className={h2Class}>Who Uses This Tool</h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              <li>
                <strong>Developers and engineers</strong> flatten multi-line strings before passing
                them into logs, APIs, or CSV pipelines. A line break inside a field can break your
                JSON or corrupt a database import.
              </li>
              <li>
                <strong>Writers and editors</strong> use it constantly when republishing PDF content
                — academic papers, press releases, old print archives. The PDF looks fine on screen.
                The copy-paste is a disaster.
              </li>
              <li>
                <strong>Sales and support teams</strong> hit this every day. A rep copies an email
                into Salesforce and the field wraps. A line break remover cleans it before it goes
                into the CRM.
              </li>
              <li>
                <strong>Students and researchers</strong> pull quotes from academic PDFs and need
                clean, pasteable text for essays or notes — without touching the actual wording.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 id="privacy" className={h2Class}>Your Text Never Leaves Your Browser</h2>
            <p className={pClass}>
              Every character you paste is processed entirely in JavaScript running locally on your
              device. Nothing is transmitted to a server. Nothing is logged. Nothing is stored.
              Close the tab, and the text is gone. That applies to every mode, every setting, every
              piece of text — confidential or otherwise.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="more-tools" className={h2Class}>More Free CountFlows Tools</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              {MORE_TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className={linkClass}>{tool.name}</Link>: {tool.desc}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </article>
  )
}