import Link from "next/link"
import { ArrowRight, Braces, CheckCircle2, Code2, Database, Eye, GitCompareArrows, ReplaceAll, ScanSearch, ShieldCheck, Sparkles, Type } from "lucide-react"

const characters = [
  ["U+200B", "Zero Width Space", "Invisible", "Remove"],
  ["U+00AD", "Soft Hyphen", "Invisible", "Remove"],
  ["U+FEFF", "BOM / Zero Width No-Break Space", "Invisible", "Remove"],
  ["U+00A0", "No-Break Space", "Unusual space", "Normalize"],
  ["U+202F", "Narrow No-Break Space", "Unusual space", "Normalize"],
  ["U+200C", "Zero Width Non-Joiner", "Language-sensitive", "Review"],
  ["U+200D", "Zero Width Joiner", "Language / emoji-sensitive", "Review"],
  ["U+200E", "Left-to-Right Mark", "Directional", "Review"],
  ["U+200F", "Right-to-Left Mark", "Directional", "Review"],
  ["U+202E", "Right-to-Left Override", "Directional", "Review"],
]

const faqs = [
  {
    question: "How do I detect invisible characters in text?",
    answer: "Paste the text into the Invisible Character Detector and select Detect Invisible Characters. The scanner checks supported Unicode code points and reports the character name, code point, count, position, line and column. The X-Ray view makes detected characters visible inside the original text.",
  },
  {
    question: "What is a zero-width space?",
    answer: "A zero-width space, U+200B, is a Unicode character that has no visible width. It can exist between visible characters even though you cannot see a normal gap. It may affect exact search, string comparison and text processing.",
  },
  {
    question: "Can I remove zero-width spaces?",
    answer: "Yes. U+200B Zero Width Space is a recommended removal candidate in this tool. Other invisible characters may have legitimate uses, so they are handled more conservatively.",
  },
  {
    question: "Should I remove every invisible character?",
    answer: "No. Characters such as the Zero Width Joiner, Zero Width Non-Joiner and directional controls can be meaningful in some languages, emoji sequences and bidirectional text. CountFlows detects these characters but does not automatically select them for removal.",
  },
  {
    question: "Why does copied text contain invisible characters?",
    answer: "Invisible or unusual Unicode can enter text through websites, word processors, PDFs, messaging apps, rich-text editors, source code, file encodings and copy-paste operations. Their presence alone does not identify where the text originally came from.",
  },
  {
    question: "Can invisible characters break code or data?",
    answer: "They can cause problems when software compares the underlying character sequence. Hidden Unicode may affect exact string matches, identifiers, search, validation, copied commands or structured data even when the visible text looks normal.",
  },
  {
    question: "Does this detector find every possible invisible Unicode character?",
    answer: "No tool should imply that every Unicode character that may render invisibly in every font or context is covered. CountFlows detects the supported zero-width, unusual-space and directional characters defined by its scanner and reports exactly what it finds.",
  },
  {
    question: "Is my text uploaded?",
    answer: "The detection and cleanup logic run in your browser and do not require an AI API or server-side text analysis.",
  },
]

export default function SEOContent() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-16 px-4 py-14 text-gray-700 sm:px-6 sm:py-16 lg:px-8 dark:text-slate-300">

        {/* DIRECT ANSWER */}
        <section>
          <SectionLabel>Quick answer</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            What Is an Invisible Character Detector?
          </h2>

          <p className="mt-4 leading-7">
            <strong>An invisible character detector scans the actual Unicode characters inside text and reveals characters that are difficult or impossible to see.</strong> CountFlows shows supported zero-width characters, unusual spaces and directional controls with their Unicode code point, name, count and position. If your problem is broader formatting such as Markdown, HTML, punctuation or general AI-text cleanup, use the{" "}
            <Link href="/tools/ai-text-cleaner" className="font-semibold text-cyan-700 underline decoration-cyan-300 underline-offset-4 dark:text-cyan-300">
              AI Text Cleaner
            </Link>{" "}
            instead.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <QuickFact icon={Eye} title="Reveal">See characters that are normally hidden from view.</QuickFact>
            <QuickFact icon={Code2} title="Identify">Get the Unicode code point, name and exact location.</QuickFact>
            <QuickFact icon={CheckCircle2} title="Clean">Remove or normalize only the character types you choose.</QuickFact>
          </div>
        </section>

        {/* HOW TO USE */}
        <section>
          <SectionLabel>How it works</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            How to Use the Invisible Character Detector
          </h2>

          <p className="mt-4 max-w-3xl leading-7">
            You do not need to know Unicode codes before using the tool. Paste the text, run the scan and review the character report before applying cleanup.
          </p>

          <ol className="mt-7 space-y-5">
            <Step number="1" title="Paste your text">Paste the text you want to inspect into the Original Text box.</Step>
            <Step number="2" title="Detect invisible characters">Select Detect Invisible Characters to scan the underlying Unicode sequence.</Step>
            <Step number="3" title="Check the X-Ray view">Detected characters appear as visible labels such as U+200B inside the text preview.</Step>
            <Step number="4" title="Review the findings">See each character&apos;s name, Unicode code point, number of occurrences and positions.</Step>
            <Step number="5" title="Choose what to remove">Use the recommended selection or manually choose the character types you want changed.</Step>
            <Step number="6" title="Copy the cleaned text">Review the cleaned output and copy it when you are satisfied with the result.</Step>
          </ol>
        </section>

        {/* XRAY EXAMPLE */}
        <section>
          <SectionLabel>See what is hidden</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            What Does an Invisible Character Look Like?
          </h2>

          <p className="mt-4 leading-7">
            Usually, it does not look like anything. Two strings can appear identical on screen while containing different Unicode sequences underneath.
          </p>

          <div className="mt-7 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
            <div className="grid md:grid-cols-2">
              <div className="border-b border-gray-200 p-5 md:border-b-0 md:border-r sm:p-6 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-500">Normal view</p>
                <div className="mt-4 rounded-xl bg-gray-50 p-4 font-mono text-sm text-gray-900 dark:bg-slate-950 dark:text-slate-200">
                  HelloWorld
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-slate-400">Nothing unusual is visible between the words.</p>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">X-Ray view</p>
                <div className="mt-4 rounded-xl bg-gray-50 p-4 font-mono text-sm text-gray-900 dark:bg-slate-950 dark:text-slate-200">
                  Hello <span className="inline-flex rounded-md border border-amber-200 bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300">U+200B</span> World
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-slate-400">The detector reveals the Zero Width Space stored between the visible characters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TYPES */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            What Invisible Characters Can This Tool Detect?
          </h2>

          <p className="mt-4 leading-7">
            The scanner focuses on common hidden and non-standard Unicode characters that can be difficult to identify visually. It separates them by purpose because not every detected character should be treated the same way.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <Card title="Zero-Width Characters">
              Detect supported characters such as Zero Width Space, Zero Width Joiner, Zero Width Non-Joiner and Word Joiner.
            </Card>

            <Card title="Unusual Unicode Spaces">
              Find no-break, narrow, thin, hair, figure, ideographic and other supported Unicode spacing characters.
            </Card>

            <Card title="Directional Controls">
              Identify supported left-to-right, right-to-left, embedding, override and isolate controls.
            </Card>

            <Card title="Soft Hyphen and BOM">
              Detect characters such as U+00AD Soft Hyphen and U+FEFF, which may be difficult to notice in ordinary text.
            </Card>
          </div>
        </section>

        {/* ZERO WIDTH */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            What Are Zero-Width Characters?
          </h2>

          <p className="mt-4 leading-7">
            <strong>Zero-width characters are Unicode code points that can exist in a text string without occupying ordinary visible space.</strong> The best-known example is <code>U+200B</code>, the Zero Width Space. Because the character still exists in the underlying string, software can count or compare it even when a person cannot see it.
          </p>

          <p className="mt-4 leading-7">
            Zero-width does not automatically mean useless. <code>U+200C</code> Zero Width Non-Joiner and <code>U+200D</code> Zero Width Joiner can affect how characters connect in writing systems, and ZWJ is also involved in emoji presentation. For that reason, CountFlows detects these characters but does not automatically recommend removing them.
          </p>

          <ReferenceNote>
            Unicode documents U+200B separately from normal space characters and defines ZWJ/ZWNJ as characters with legitimate text-processing uses.{" "}
            <a href="https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-6/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-700 underline decoration-cyan-300 underline-offset-4 dark:text-cyan-300">
              Unicode Standard reference
            </a>
          </ReferenceNote>
        </section>

        {/* TABLE */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Common Invisible Unicode Characters
          </h2>

          <p className="mt-4 leading-7">
            These examples show why character-level inspection is more useful than a simple “remove everything invisible” button.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Unicode</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Default approach</th>
                </tr>
              </thead>

              <tbody>
                {characters.map(([code, name, type, action]) => (
                  <tr key={code} className="border-t border-gray-200 dark:border-white/10">
                    <td className="px-4 py-3 font-mono font-semibold">{code}</td>
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">{type}</td>
                    <td className="px-4 py-3"><ActionBadge action={action} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SAFE REMOVAL */}
        <section>
          <SectionLabel>Important distinction</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Should You Remove Every Invisible Character?
          </h2>

          <p className="mt-4 leading-7">
            <strong>No.</strong> Some hidden characters are common cleanup candidates, while others can carry legitimate formatting or linguistic meaning. A reliable detector should tell you what the character is before changing it.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
                <h3 className="font-bold text-gray-900 dark:text-white">Recommended cleanup</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-400">
                Common candidates such as stray Zero Width Spaces, Soft Hyphens and BOM characters can be selected automatically. Non-standard spaces can be normalized to an ordinary space.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900/50 dark:bg-amber-950/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-300" aria-hidden="true" />
                <h3 className="font-bold text-gray-900 dark:text-white">Review before removal</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-400">
                Joiners, non-joiners and bidirectional controls can have legitimate uses. They remain visible in the report but are not automatically selected by the recommended cleanup mode.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Why Can Invisible Characters Cause Problems?
          </h2>

          <p className="mt-4 leading-7">
            Computers compare the characters stored in a string, not only what the string looks like on screen. An extra code point can therefore change how text behaves without producing an obvious visual difference.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <Problem icon={Code2} title="Code and identifiers">
              A hidden character inside a variable, copied command or identifier can make two visually identical strings different.
            </Problem>

            <Problem icon={Database} title="Forms and stored data">
              Hidden Unicode can remain inside data saved through forms, CMS fields, spreadsheets or databases.
            </Problem>

            <Problem icon={ScanSearch} title="Search and matching">
              Exact search may fail if an invisible character exists inside the phrase being matched.
            </Problem>

            <Problem icon={ReplaceAll} title="Find and replace">
              A visible phrase may not match your replacement rule when an extra zero-width character exists inside it.
            </Problem>
          </div>
        </section>

        {/* CODE/DATA */}
        <section>
          <SectionLabel>For technical text</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Invisible Characters in Code, JSON and Data
          </h2>

          <p className="mt-4 leading-7">
            Invisible Unicode is especially confusing in technical text because developers often inspect what is displayed while software evaluates the underlying string. A hidden code point can affect comparisons, keys, identifiers or validation even when the text appears unchanged.
          </p>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-slate-950 p-5 text-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Braces size={15} aria-hidden="true" />
              Example
            </div>

            <pre className="mt-4 overflow-x-auto text-sm leading-7"><code>{`Visible value:   "admin"
Hidden value:    "ad[U+200B]min"

To a person:     may look similar
To software:     different character sequence`}</code></pre>
          </div>

          <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-slate-400">
            The X-Ray view is designed for this situation: it exposes the hidden code point without rewriting the rest of the input.
          </p>
        </section>

        {/* ORIGIN */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Where Do Invisible Characters Come From?
          </h2>

          <p className="mt-4 leading-7">
            Invisible and non-standard Unicode characters can appear through normal text processing. Common sources include websites, word processors, PDFs, rich-text editors, messaging apps, file encodings and copied code. Some characters may also be deliberately inserted for formatting or technical purposes.
          </p>

          <p className="mt-4 leading-7">
            Their presence therefore tells you <strong>what exists in the text</strong>, not who created the text or why the character was inserted.
          </p>
        </section>

        {/* BOM */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            What Is U+FEFF, the Byte Order Mark?
          </h2>

          <p className="mt-4 leading-7">
            <code>U+FEFF</code> is used as a Byte Order Mark at the beginning of some Unicode text streams. When it appears unexpectedly inside copied or processed text, it may be difficult to see and can behave like an unwanted hidden character.
          </p>

          <ReferenceNote>
            Unicode defines U+FEFF as the character used for the byte order mark in relevant Unicode encoding schemes.{" "}
            <a href="https://www.unicode.org/faq/utf_bom.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-700 underline decoration-cyan-300 underline-offset-4 dark:text-cyan-300">
              Read Unicode&apos;s BOM FAQ
            </a>
          </ReferenceNote>
        </section>

        {/* FEATURES */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Invisible Character Detector Features
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Card title="Unicode X-Ray View">Replace supported invisible findings with visible code-point labels inside a preview of the original text.</Card>
            <Card title="Exact Character Details">See the Unicode code point, character name, type, count and positions.</Card>
            <Card title="Line and Column Location">Use position details to locate hidden characters inside multi-line text more precisely.</Card>
            <Card title="Selective Cleanup">Choose exactly which detected character types should be removed or normalized.</Card>
            <Card title="Conservative Recommendations">Common cleanup candidates are selected while sensitive joiners and directional characters remain optional.</Card>
            <Card title="Unusual Space Normalization">Convert supported non-standard spaces to a normal space instead of deleting the gap completely.</Card>
            <Card title="Large Text Support">Scan large text while limiting the visual X-Ray output to keep the interface responsive.</Card>
            <Card title="Browser-Based Processing">The scanner does not require an AI model or remote text-analysis API.</Card>
          </div>
        </section>

        {/* CANNIBALIZATION */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Invisible Character Detector vs ChatGPT Watermark Remover
          </h2>

          <p className="mt-4 leading-7">
            Both tools can inspect hidden Unicode, but they serve different search intents. This detector is a general Unicode debugging tool for any text. The ChatGPT Watermark Remover is specifically organized around checking copied ChatGPT text and watermark-related questions.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Need</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Invisible Character Detector</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">ChatGPT Watermark Remover</th>
                </tr>
              </thead>

              <tbody>
                <Comparison task="General hidden Unicode inspection" detector="Best choice" watermark="Supported" />
                <Comparison task="Code, data or copied text debugging" detector="Best choice" watermark="Not the main focus" />
                <Comparison task="Exact code points and positions" detector="Yes" watermark="Yes" />
                <Comparison task="ChatGPT watermark-specific questions" detector="Not the main focus" watermark="Best choice" />
                <Comparison task="ChatGPT copy-paste investigation" detector="Supported" watermark="Best choice" />
              </tbody>
            </table>
          </div>

          <p className="mt-5 leading-7">
            If your question is specifically about copied ChatGPT content, use the{" "}
            <Link href="/tools/chatgpt-watermark-remover" className="font-semibold text-cyan-700 underline decoration-cyan-300 underline-offset-4 dark:text-cyan-300">
              ChatGPT Watermark Remover
            </Link>.
          </p>
        </section>

        {/* PRIVACY */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Private, Browser-Based Unicode Inspection
          </h2>

          <p className="mt-4 leading-7">
            The character scan and cleanup logic run in your browser. CountFlows does not need an AI model, external AI API or database lookup to identify the supported Unicode characters in the text.
          </p>

          <p className="mt-4 leading-7">
            For confidential or regulated information, continue to follow your organization&apos;s own security and data-handling requirements before placing information into any website.
          </p>
        </section>

        {/* RELATED TOOLS */}
        <section>
          <SectionLabel>Continue your workflow</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Related Text Tools
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-slate-400">
            Choose the next tool based on whether you need broader cleanup, AI-specific inspection, comparison or precise replacement.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Related href="/tools/ai-text-cleaner" title="AI Text Cleaner" label="Clean formatting" icon={Sparkles} description="Clean Markdown, HTML, punctuation, spacing and broader formatting artifacts from AI-generated or copied text." accent="cyan" />
            <Related href="/tools/chatgpt-watermark-remover" title="ChatGPT Watermark Remover" label="Check AI text" icon={ScanSearch} description="Inspect copied ChatGPT text for supported hidden Unicode and watermark-like character artifacts." accent="blue" />
            <Related href="/tools/text-compare" title="Online Text Compare" label="Compare versions" icon={GitCompareArrows} description="Compare the original and cleaned versions to review visible changes side by side." accent="violet" />
            <Related href="/tools/find-and-replace-text" title="Find & Replace Text" label="Make precise edits" icon={ReplaceAll} description="Find and replace specific words, phrases or characters using custom replacement rules." accent="emerald" />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionLabel>Questions answered</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-cyan-200 dark:border-white/10 dark:bg-slate-900 dark:hover:border-cyan-900">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 dark:text-white">{faq.question}</summary>
                <p className="mt-3 leading-7 text-gray-600 dark:text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </section>
  )
}

function SectionLabel({ children }) {
  return <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/30 dark:text-cyan-300">{children}</span>
}

function Step({ number, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">{number}</span>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 leading-7">{children}</p>
      </div>
    </li>
  )
}

function QuickFact({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300"><Icon size={16} aria-hidden="true" /></span>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-400">{children}</p>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6">{children}</p>
    </article>
  )
}

function Problem({ icon: Icon, title, children }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-cyan-200 hover:shadow-sm dark:border-white/10 dark:bg-slate-900 dark:hover:border-cyan-900">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300"><Icon size={19} aria-hidden="true" /></span>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{children}</p>
        </div>
      </div>
    </article>
  )
}

function ReferenceNote({ children }) {
  return (
    <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" />
      <p className="text-sm leading-6 text-gray-600 dark:text-slate-400">{children}</p>
    </div>
  )
}

function ActionBadge({ action }) {
  const styles = action === "Remove" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : action === "Normalize" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>{action}</span>
}

function Comparison({ task, detector, watermark }) {
  return (
    <tr className="border-t border-gray-200 dark:border-white/10">
      <td className="px-4 py-3 font-medium">{task}</td>
      <td className="px-4 py-3">{detector}</td>
      <td className="px-4 py-3">{watermark}</td>
    </tr>
  )
}

const accentStyles = {
  cyan: { icon: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300", hover: "hover:border-cyan-300 dark:hover:border-cyan-800", label: "text-cyan-700 dark:text-cyan-300" },
  blue: { icon: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300", hover: "hover:border-blue-300 dark:hover:border-blue-800", label: "text-blue-700 dark:text-blue-300" },
  violet: { icon: "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300", hover: "hover:border-violet-300 dark:hover:border-violet-800", label: "text-violet-700 dark:text-violet-300" },
  emerald: { icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300", hover: "hover:border-emerald-300 dark:hover:border-emerald-800", label: "text-emerald-700 dark:text-emerald-300" },
}

function Related({ href, title, label, icon: Icon, description, accent = "cyan" }) {
  const styles = accentStyles[accent] || accentStyles.cyan

  return (
    <Link href={href} className={`group rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 ${styles.hover}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}><Icon size={21} aria-hidden="true" /></div>
        <div className="min-w-0 flex-1">
          <p className={`text-xs font-semibold uppercase tracking-wide ${styles.label}`}>{label}</p>
          <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">Open tool <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
        </div>
      </div>
    </Link>
  )
}