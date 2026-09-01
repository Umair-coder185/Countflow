import Link from "next/link"
import { ArrowRight, CheckCircle2, CircleX, Code2, Database, GitCompareArrows, ReplaceAll, Search, ShieldCheck, Sparkles, Type } from "lucide-react"

const characters = [
  ["U+200B", "Zero Width Space", "Invisible", "Remove"],
  ["U+00AD", "Soft Hyphen", "Invisible", "Remove"],
  ["U+FEFF", "BOM / Zero Width No-Break Space", "Invisible", "Remove"],
  ["U+202F", "Narrow No-Break Space", "Unusual space", "Normalize"],
  ["U+200C", "Zero Width Non-Joiner", "Language-sensitive", "Review"],
  ["U+200D", "Zero Width Joiner", "Emoji / language-sensitive", "Review"],
  ["U+200E", "Left-to-Right Mark", "Directional", "Review"],
  ["U+2014", "Em Dash", "Typography", "Optional"],
]

const beforeItems = [
  { icon: Search, title: "Exact search can miss", text: "A hidden character inside a visible word or phrase can stop an exact text match from working as expected." },
  { icon: Code2, title: "Strings may look equal but differ", text: "Code, JSON values, IDs, and copied strings can contain extra Unicode characters that are difficult to spot visually." },
  { icon: Type, title: "Spacing can behave differently", text: "A no-break or narrow space may look normal while affecting wrapping, editing, or text processing." },
  { icon: ReplaceAll, title: "Find and replace may skip text", text: "A hidden character between letters can prevent a normal find-and-replace rule from matching the visible phrase." },
]

const afterItems = [
  { icon: Search, title: "Cleaner exact matching", text: "Removing unwanted hidden characters makes the stored text closer to what you actually see on screen." },
  { icon: Code2, title: "More predictable text values", text: "Clean strings are easier to compare, search, parse, and move between editors or development tools." },
  { icon: Type, title: "Normalized spacing", text: "Selected unusual spaces can be converted to standard spaces without rewriting the wording." },
  { icon: ReplaceAll, title: "Easier text editing", text: "Search, replace, counting, and comparison tools can work with fewer invisible surprises." },
]

const faqs = [
  {
    question: "What does the ChatGPT Watermark Remover actually remove?",
    answer: "It scans for supported hidden Unicode characters, zero-width characters, unusual spaces, directional controls, and other character-level artifacts. You can review the findings and choose which character types to remove or normalize.",
  },
  {
    question: "Does every ChatGPT response contain hidden characters?",
    answer: "No. Hidden characters are not present in every response, and finding one does not prove that ChatGPT created the text. Similar Unicode characters can come from websites, editors, documents, messaging apps, and copy-paste operations.",
  },
  {
    question: "Can this tool detect zero-width spaces?",
    answer: "Yes. The scanner detects zero-width spaces and several other supported invisible Unicode characters and reports their Unicode code points, counts, and positions.",
  },
  {
    question: "Does the tool automatically remove em dashes?",
    answer: "No. Em dashes are normal visible punctuation. CountFlows lists them under Typography and does not select them for removal by default.",
  },
  {
    question: "Can hidden characters cause copy-and-paste problems?",
    answer: "They can. Some invisible Unicode characters may affect exact matching, spacing, code comparisons, search, data imports, or text processing even though the text looks normal on screen.",
  },
  {
    question: "Will removing hidden characters change AI-detector results?",
    answer: "There is no guarantee. AI detectors may analyze writing patterns and other signals unrelated to hidden Unicode. This tool is designed for character inspection and cleanup, not detector bypass.",
  },
  {
    question: "Is my text uploaded for analysis?",
    answer: "The character scan and cleanup logic run in your browser and do not require an AI API or server-side text analysis.",
  },
]

export default function SEOContent() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-16 px-4 py-14 text-gray-700 sm:px-6 sm:py-16 lg:px-8 dark:text-slate-300">

        {/* HOW TO USE */}
        <section>
          <SectionLabel>Quick start</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            How to Use the ChatGPT Watermark Checker
          </h2>

          <p className="mt-4 leading-7">
            Paste the text you want to inspect and select <strong>Scan Text</strong>. CountFlows checks the Unicode characters in the text and separates supported findings into hidden characters, unusual spaces, directional controls, and typography.
          </p>

          <ol className="mt-7 space-y-5">
            <Step number="1" title="Paste your text">Copy the ChatGPT text or other copied content and paste it into the scanner.</Step>
            <Step number="2" title="Scan the characters">Select Scan Text. The tool checks the characters without rewriting your sentences.</Step>
            <Step number="3" title="Open the X-Ray view">Invisible findings appear as visible labels such as U+200B so you can see where they occur.</Step>
            <Step number="4" title="Review each finding">Check its Unicode code point, name, category, count, and position before changing it.</Step>
            <Step number="5" title="Choose what to clean">Use the recommended selection or choose individual character types yourself.</Step>
            <Step number="6" title="Copy the result">Review the cleaned version, then copy or download the text.</Step>
          </ol>
        </section>

        {/* BEFORE / AFTER */}
        <section>
          <div className="text-center">
            <SectionLabel>Before & after</SectionLabel>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              What Changes After Hidden Characters Are Cleaned?
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-7 text-gray-600 dark:text-slate-400">
              The goal is not to rewrite your content. It is to make invisible character-level differences visible and let you remove the ones you do not want.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <BeforeAfterPanel variant="before" title="Before Cleanup" items={beforeItems} />

            <div className="hidden items-center justify-center lg:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200 bg-white text-cyan-600 shadow-sm dark:border-cyan-900 dark:bg-slate-900 dark:text-cyan-300">
                <ArrowRight size={19} aria-hidden="true" />
              </div>
            </div>

            <BeforeAfterPanel variant="after" title="After Selected Cleanup" items={afterItems} />
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />

              <p className="text-sm leading-6 text-gray-600 dark:text-slate-400">
                <strong className="text-gray-900 dark:text-white">CountFlows uses selective cleanup.</strong>{" "}
                Language-sensitive joiners, directional controls, variation selectors, and visible typography are not treated the same as ordinary removable zero-width artifacts.
              </p>
            </div>
          </div>
        </section>

        {/* REAL WORLD IMPACT */}
        <section>
          <SectionLabel>Why check?</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Where Invisible Unicode Can Cause Real Problems
          </h2>

          <p className="mt-4 max-w-3xl leading-7">
            Hidden characters matter when software compares the actual underlying string instead of the text you can see. A single invisible code point can be enough to make two visually identical values behave differently.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <ImpactCard icon={Code2} title="Code and structured data">
              Zero-width characters inside identifiers, copied commands, JSON values, or configuration text can make comparisons and parsers behave unexpectedly.
            </ImpactCard>

            <ImpactCard icon={Search} title="Search and exact matching">
              An invisible character inside a phrase can cause exact search, deduplication, or normal find-and-replace rules to miss a value that looks correct.
            </ImpactCard>

            <ImpactCard icon={Database} title="CMS and stored text">
              Hidden Unicode saved into a CMS, spreadsheet, form, or database can remain there after the visible text has been copied or edited.
            </ImpactCard>

            <ImpactCard icon={Type} title="Spacing, wrapping, and counts">
              Non-standard spaces and joiners can affect line wrapping, character counts, text selection, or layout without being obvious on screen.
            </ImpactCard>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" />

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Hidden Unicode is a text-quality issue, not proof of AI authorship
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
                  The same characters can appear through browsers, documents, editors, websites, and copy-paste operations. Finding one tells you what is present in the string; it does not tell you who wrote the text.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG / INFORMATIONAL INTENT SEPARATION */}
        <section>
          <SectionLabel>What we mean by watermark</SectionLabel>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            What This ChatGPT Watermark Scanner Actually Checks
          </h2>

          <p className="mt-4 leading-7">
            The phrase <strong>“ChatGPT watermark”</strong> is commonly used online when people notice hidden or unusual characters in copied AI text. This tool checks for those concrete character-level artifacts: zero-width marks, unusual Unicode spaces, directional controls, variation selectors, and related characters.
          </p>

          <p className="mt-4 leading-7">
            CountFlows does <strong>not</strong> assume that finding one of these characters proves the text came from ChatGPT, and it does not present ordinary punctuation such as an em dash as proof of a hidden watermark.
          </p>

          <div className="mt-6 rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-5 dark:border-cyan-900/60 dark:from-cyan-950/20 dark:to-blue-950/20">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Looking for the evidence behind the watermark question?
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
              We keep the deeper research separate from this tool page so this page stays focused on scanning and cleanup.
            </p>

            <Link href="/blog/does-chatgpt-watermark-text" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
              Read: Does ChatGPT Watermark Text?
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* DETECTION COVERAGE */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            What Does the ChatGPT Watermark Remover Detect?
          </h2>

          <p className="mt-4 leading-7">
            The scanner looks for character-level details that are easy to miss by eye. It does not blindly delete everything unusual. Findings are grouped by type so you can decide what should be removed, normalized, or left alone.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <Card title="Zero-Width Characters">
              Detect zero-width spaces, joiners, non-joiners, word joiners, and related invisible formatting characters.
            </Card>

            <Card title="Unusual Unicode Spaces">
              Find no-break spaces, narrow spaces, thin spaces, hair spaces, and several other characters that resemble ordinary spacing.
            </Card>

            <Card title="Directional Controls">
              Identify left-to-right, right-to-left, embedding, override, and isolate controls that can affect text display.
            </Card>

            <Card title="Blank-Looking Characters">
              Detect supported Unicode characters that occupy a character position while appearing visually empty.
            </Card>

            <Card title="Variation Selectors">
              Show variation selectors separately because they may affect emoji or character presentation and should not be removed blindly.
            </Card>

            <Card title="Visible Typography">
              Em dashes, en dashes, curly quotes, and ellipses are reported separately from true invisible characters.
            </Card>
          </div>
        </section>

        {/* ZERO WIDTH INTENT */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Zero-Width and Hidden Unicode Characters in Copied Text
          </h2>

          <p className="mt-4 leading-7">
            Unicode includes characters that have no visible width or that control how nearby text behaves. A zero-width space can sit between two letters without appearing on screen, while a joiner or directional mark may have a legitimate role in some languages, scripts, or emoji.
          </p>

          <p className="mt-4 leading-7">
            That difference matters. The scanner therefore shows the exact Unicode code point rather than treating every hidden character as the same thing. For example, <code>U+200B</code> is a Zero Width Space, while <code>U+200D</code> is a Zero Width Joiner that can be meaningful in emoji sequences and written languages.
          </p>
        </section>

        {/* REFERENCE TABLE */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Examples of Invisible and Unusual Characters
          </h2>

          <p className="mt-4 leading-7">
            These are some of the character types the scanner can report. The recommended action depends on what the character does, not simply on whether it is unusual.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Unicode</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Character</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Default approach</th>
                </tr>
              </thead>

              <tbody>
                {characters.map(([code, name, type, action]) => (
                  <tr key={code} className="border-t border-gray-200 dark:border-white/10">
                    <td className="px-4 py-3 font-mono font-medium">{code}</td>
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">{type}</td>
                    <td className="px-4 py-3">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* COMMON PROBLEMS */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Common Hidden-Character Problems
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <Card title="The text looks normal but behaves differently">
              A zero-width character or non-standard space can sit between visible characters without being obvious.
            </Card>

            <Card title="Search cannot find the phrase">
              A hidden Unicode character inside a word or phrase can prevent an exact text search from matching what you see.
            </Card>

            <Card title="Copied text has strange spacing">
              A no-break or narrow space can look almost identical to a standard space while behaving differently.
            </Card>

            <Card title="Code or data comparisons fail">
              Invisible formatting marks can cause two values that look identical to contain different underlying character sequences.
            </Card>

            <Card title="Text direction changes unexpectedly">
              Bidirectional controls can change how mixed left-to-right and right-to-left content appears.
            </Card>

            <Card title="Normal punctuation is mistaken for a watermark">
              An em dash is visible punctuation. CountFlows reports typography separately rather than automatically calling it a hidden watermark.
            </Card>
          </div>
        </section>

        {/* OVERVIEW */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Overview
          </h2>

          <p className="mt-4 leading-7">
            The ChatGPT Watermark Remover is primarily a <strong>Unicode inspection and selective cleanup tool</strong>. Its purpose is to reveal supported invisible and unusual characters before you decide whether to change them.
          </p>

          <p className="mt-4 leading-7">
            Instead of showing a vague “watermark removed” message, CountFlows provides an X-Ray preview, Unicode names, code points, occurrence counts, and positions. You can see what is actually present in the string and make the cleanup decision yourself.
          </p>
        </section>

        {/* FEATURES */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            ChatGPT Watermark Checker Features
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Card title="Unicode X-Ray View">
              Turn invisible findings into visible Unicode labels inside a preview of the original text.
            </Card>

            <Card title="Exact Character Inspector">
              See each supported character&apos;s code point, name, category, count, and positions.
            </Card>

            <Card title="Selective Cleanup">
              Remove or normalize only the character types you choose rather than blindly changing the entire text.
            </Card>

            <Card title="Conservative Recommended Mode">
              Common cleanup candidates can be selected while language-sensitive characters and visible typography remain optional.
            </Card>

            <Card title="Clipboard Inspector">
              See whether your latest paste exposed a separate rich HTML clipboard layer in addition to plain text.
            </Card>

            <Card title="Typography Separation">
              Em dashes, smart quotes, and ellipses are reported separately from invisible Unicode.
            </Card>

            <Card title="Large Text Support">
              The full string can be scanned while the visual X-Ray preview is limited to protect browser performance.
            </Card>

            <Card title="Browser-Based Processing">
              Character inspection does not require an AI model, remote AI API, or server-side text analysis.
            </Card>
          </div>
        </section>

        {/* CANNIBALIZATION PROTECTION */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Watermark Scanner or AI Text Cleaner: Which Tool Should You Use?
          </h2>

          <p className="mt-4 leading-7">
            The two tools solve different jobs. Use this page when you want to <strong>inspect hidden Unicode and see exactly where it appears</strong>. Use the AI Text Cleaner when the problem is broader formatting cleanup.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Task</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Watermark Scanner</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">AI Text Cleaner</th>
                </tr>
              </thead>

              <tbody>
                <Comparison task="Inspect Unicode code points" watermark="Best choice" cleaner="Not its main job" />
                <Comparison task="Show exact hidden-character positions" watermark="Yes" cleaner="No" />
                <Comparison task="X-Ray invisible Unicode" watermark="Yes" cleaner="No" />
                <Comparison task="Remove Markdown and HTML" watermark="No" cleaner="Yes" />
                <Comparison task="General formatting cleanup" watermark="Limited" cleaner="Best choice" />
                <Comparison task="Clean bullets and broader formatting" watermark="No" cleaner="Yes" />
              </tbody>
            </table>
          </div>

          <p className="mt-5 leading-7">
            Need broader cleanup instead? Open the{" "}
            <Link href="/tools/ai-text-cleaner" className="font-semibold text-cyan-700 underline decoration-cyan-300 underline-offset-4 dark:text-cyan-300">
              AI Text Cleaner
            </Link>{" "}
            for Markdown, HTML, punctuation, spacing, and general AI-text formatting.
          </p>
        </section>

        {/* AI DETECTION */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Does Removing Hidden Characters Change AI Detection?
          </h2>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
            <p className="font-semibold text-gray-900 dark:text-white">
              Hidden-character cleanup is not the same thing as AI-detection bypass.
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
              Removing Unicode artifacts changes those specific characters. It does not guarantee that an AI detector will classify the writing differently because detection systems may use signals unrelated to invisible Unicode.
            </p>
          </div>

          <p className="mt-4 leading-7">
            CountFlows therefore positions this tool as a character inspector and cleanup utility, not as a way to bypass Turnitin, GPTZero, or another AI-writing detector.
          </p>
        </section>

        {/* PRIVACY */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Private, Browser-Based Character Scanning
          </h2>

          <p className="mt-4 leading-7">
            The Unicode scan and cleanup logic run in your browser. The tool does not need an AI API or server-side language model to determine which supported characters are present.
          </p>

          <p className="mt-4 leading-7">
            If the text contains confidential or regulated information, you should still follow your organization&apos;s own security and data-handling policies.
          </p>
        </section>

        {/* RELATED TOOLS */}
        <section>
          <div>
            <SectionLabel>Continue your workflow</SectionLabel>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              What Do You Want to Do Next?
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-slate-400">
              After checking hidden characters, choose the next tool based on what your text actually needs.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Related href="/tools/ai-text-cleaner" title="AI Text Cleaner" label="Clean formatting" icon={Sparkles} description="Remove Markdown, HTML, unwanted spacing, punctuation issues, and broader AI-text formatting." accent="cyan" />

            <Related href="/tools/text-compare" title="Online Text Compare" label="Review changes" icon={GitCompareArrows} description="Compare your original and cleaned text side by side to see exactly what changed." accent="blue" />

            <Related href="/tools/find-and-replace-text" title="Find & Replace Text" label="Make precise edits" icon={ReplaceAll} description="Replace specific words, phrases, or characters using custom and bulk replacement rules." accent="violet" />

            <Related href="/tools/character-counter" title="Character Counter" label="Check final length" icon={Type} description="Measure the final character count after inspecting or cleaning your text." accent="emerald" />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-cyan-200 dark:border-white/10 dark:bg-slate-900 dark:hover:border-cyan-900">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </summary>

                <p className="mt-3 leading-7 text-gray-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </section>
  )
}

function SectionLabel({ children }) {
  return (
    <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/30 dark:text-cyan-300">
      {children}
    </span>
  )
}

function Step({ number, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
        {number}
      </span>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 leading-7">{children}</p>
      </div>
    </li>
  )
}

function BeforeAfterPanel({ variant, title, items }) {
  const before = variant === "before"

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${before ? "border-rose-200 bg-gradient-to-b from-rose-50/70 to-white dark:border-rose-900/50 dark:from-rose-950/20 dark:to-slate-900" : "border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-white dark:border-emerald-900/50 dark:from-emerald-950/20 dark:to-slate-900"}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${before ? "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"}`}>
          {before ? <CircleX size={19} aria-hidden="true" /> : <CheckCircle2 size={19} aria-hidden="true" />}
        </span>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>

      <div className="mt-5 space-y-3">
        {items.map(({ icon: Icon, title: itemTitle, text }) => (
          <div key={itemTitle} className={`rounded-xl border bg-white/80 p-4 dark:bg-slate-950/60 ${before ? "border-rose-100 dark:border-rose-900/40" : "border-emerald-100 dark:border-emerald-900/40"}`}>
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${before ? "bg-rose-50 text-rose-500 dark:bg-rose-950/60 dark:text-rose-300" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"}`}>
                <Icon size={15} aria-hidden="true" />
              </span>

              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{itemTitle}</p>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-slate-400">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImpactCard({ icon: Icon, title, children }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-cyan-200 hover:shadow-sm dark:border-white/10 dark:bg-slate-900 dark:hover:border-cyan-900">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300">
          <Icon size={19} aria-hidden="true" />
        </span>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{children}</p>
        </div>
      </div>
    </article>
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

function Comparison({ task, watermark, cleaner }) {
  return (
    <tr className="border-t border-gray-200 dark:border-white/10">
      <td className="px-4 py-3 font-medium">{task}</td>
      <td className="px-4 py-3">{watermark}</td>
      <td className="px-4 py-3">{cleaner}</td>
    </tr>
  )
}

const accentStyles = {
  cyan: {
    icon: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300",
    hover: "hover:border-cyan-300 dark:hover:border-cyan-800",
    label: "text-cyan-700 dark:text-cyan-300",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300",
    hover: "hover:border-blue-300 dark:hover:border-blue-800",
    label: "text-blue-700 dark:text-blue-300",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
    hover: "hover:border-violet-300 dark:hover:border-violet-800",
    label: "text-violet-700 dark:text-violet-300",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
    hover: "hover:border-emerald-300 dark:hover:border-emerald-800",
    label: "text-emerald-700 dark:text-emerald-300",
  },
}

function Related({ href, title, label, icon: Icon, description, accent = "cyan" }) {
  const styles = accentStyles[accent] || accentStyles.cyan

  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 ${styles.hover}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}>
          <Icon size={21} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-xs font-semibold uppercase tracking-wide ${styles.label}`}>{label}</p>

          <h3 className="mt-1 text-lg font-bold text-gray-900 transition group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{description}</p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
            Open tool
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}