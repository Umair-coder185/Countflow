import Link from "next/link"
import { ArrowRight, GitCompareArrows, ReplaceAll, Sparkles, Type } from "lucide-react"

const characters = [
  ["U+200B", "Zero Width Space", "Invisible", "Remove"],
  ["U+00AD", "Soft Hyphen", "Invisible", "Remove"],
  ["U+FEFF", "BOM / Zero Width No-Break Space", "Invisible", "Remove"],
  ["U+202F", "Narrow No-Break Space", "Unusual space", "Normalize"],
  ["U+200C", "Zero Width Non-Joiner", "Invisible / language-sensitive", "Review"],
  ["U+200D", "Zero Width Joiner", "Invisible / emoji-sensitive", "Review"],
  ["U+200E", "Left-to-Right Mark", "Directional", "Review"],
  ["U+2014", "Em Dash", "Typography", "Optional"],
]

const faqs = [
  {
    question: "What is a ChatGPT watermark remover?",
    answer: "A ChatGPT watermark remover is commonly used to describe a tool that checks copied ChatGPT text for hidden or unusual characters and removes selected artifacts. CountFlows focuses on character-level Unicode inspection rather than claiming to remove a verified official text watermark.",
  },
  {
    question: "Does ChatGPT put invisible characters in every answer?",
    answer: "No. You should not assume that every ChatGPT response contains invisible characters, or that an invisible character proves where the text came from. Hidden characters can enter text through editors, websites, formatting systems and copy-paste operations.",
  },
  {
    question: "Can this tool find zero-width spaces?",
    answer: "Yes. The scanner identifies zero-width spaces and several other supported invisible Unicode characters and shows their Unicode code points and positions.",
  },
  {
    question: "Does the tool remove em dashes?",
    answer: "Em dashes are detected under Typography, but they are not selected for removal by default. An em dash is a normal punctuation character and should not automatically be treated as a watermark.",
  },
  {
    question: "Will removing hidden characters make AI text undetectable?",
    answer: "No guarantee can be made. Removing Unicode artifacts changes those characters, but AI-detection systems can use many other signals. This tool is designed for text inspection and cleanup, not detector bypass.",
  },
  {
    question: "Is my text uploaded?",
    answer: "The scanning and cleanup logic runs in the browser and does not require an AI API or server-side text analysis.",
  },
]

export default function SEOContent() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-14 text-gray-700 sm:px-6 sm:py-16 lg:px-8 dark:text-slate-300">
       <section>
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">
        Continue your workflow
      </span>

      <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
        What Do You Want to Do Next?
      </h2>

      <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-slate-400">
        Your hidden-character check is only one step. Clean formatting, compare the changes, replace specific text, or check the final character count.
      </p>
    </div>
  </div>

  <div className="mt-7 grid gap-4 sm:grid-cols-2">
    <Related
      href="/tools/ai-text-cleaner"
      title="AI Text Cleaner"
      label="Clean formatting"
      icon={Sparkles}
      description="Remove Markdown, HTML, unwanted spacing, punctuation issues and other common AI text artifacts."
      accent="cyan"
    />

    <Related
      href="/tools/text-compare"
      title="Online Text Compare"
      label="Review changes"
      icon={GitCompareArrows}
      description="Compare your original and cleaned text side by side to see exactly what changed."
      accent="blue"
    />

    <Related
      href="/tools/find-and-replace-text"
      title="Find & Replace Text"
      label="Make precise edits"
      icon={ReplaceAll}
      description="Replace specific words, phrases or characters with custom rules and bulk replacements."
      accent="violet"
    />

    <Related
      href="/tools/character-counter"
      title="Character Counter"
      label="Check final length"
      icon={Type}
      description="Measure the final character count after cleaning or editing your text."
      accent="emerald"
    />
  </div>
</section>
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">How to Use This Tool</h2>

          <p className="mt-4 leading-7">Paste the ChatGPT text you want to inspect and select <strong>Scan Text</strong>. The checker reads the Unicode characters in the text and separates supported findings into hidden characters, unusual spaces, directional controls and typography.</p>

          <ol className="mt-6 space-y-4">
            <Step number="1" title="Paste your text">Copy the text you want to inspect and paste it into the ChatGPT Text box.</Step>
            <Step number="2" title="Scan the characters">Select Scan Text. CountFlows checks the text character by character without rewriting the wording.</Step>
            <Step number="3" title="Review the X-Ray view">Invisible characters are displayed as visible Unicode labels such as U+200B so you can see where they appear.</Step>
            <Step number="4" title="Check the findings">Review the character name, Unicode code point, number of occurrences and positions before changing anything.</Step>
            <Step number="5" title="Choose what to clean">Use Recommended for conservative cleanup, or select individual character types yourself.</Step>
            <Step number="6" title="Copy the cleaned text">Review the cleaned preview, then copy or download the result.</Step>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">What Is a ChatGPT Watermark?</h2>

          <p className="mt-4 leading-7"><strong>The phrase “ChatGPT watermark” is often used online for hidden or unusual characters noticed in copied AI text.</strong> These can include zero-width spaces, non-standard Unicode spaces, formatting controls or other copy-paste artifacts.</p>

          <p className="mt-4 leading-7">The presence of one of these characters does not prove that ChatGPT created the text. The same Unicode characters can be introduced by websites, word processors, messaging apps, editors and other software.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Does ChatGPT Really Watermark Text?</h2>

          <p className="mt-4 leading-7"><strong>CountFlows does not claim that ordinary ChatGPT text contains a confirmed official OpenAI watermark.</strong> OpenAI&apos;s public provenance documentation currently describes supported provenance signals for media such as images and audio and discusses expansion to additional media.</p>

          <p className="mt-4 leading-7">For that reason, this tool uses the popular search term “ChatGPT watermark remover” while being precise about what it actually does: it identifies concrete Unicode characters and copy-paste artifacts that are present in your text.</p>

          <p className="mt-4 text-sm">
            Reference:{" "}
            <a href="https://help.openai.com/en/articles/8912793" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-4 dark:text-cyan-300">
              OpenAI provenance documentation
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">What Does the ChatGPT Watermark Remover Detect?</h2>

          <p className="mt-4 leading-7">The scanner is designed to find character-level details that are easy to miss by eye. It does not simply delete every unusual character. Each finding is classified so you can decide whether it is an accidental artifact or a character you actually need.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card title="Zero-Width Characters">Detect zero-width spaces, joiners, non-joiners and related invisible formatting characters.</Card>
            <Card title="Unusual Unicode Spaces">Find non-breaking spaces, narrow spaces, thin spaces, hair spaces and several other space characters that resemble a normal space.</Card>
            <Card title="Directional Controls">Identify left-to-right, right-to-left, embedding, override and isolate controls that can affect how text is displayed.</Card>
            <Card title="Blank-Looking Characters">Detect supported Unicode characters that may occupy a character position while appearing empty.</Card>
            <Card title="Variation Selectors">Show variation selectors separately because they can affect emoji and character presentation and should not be removed blindly.</Card>
            <Card title="Typography">Em dashes, en dashes, curly quotes and ellipses are identified separately from invisible characters.</Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Hidden Unicode Characters in ChatGPT Text</h2>

          <p className="mt-4 leading-7">Unicode contains many characters that do not look like ordinary letters or spaces. Some have zero width. Others control direction, joining or text presentation. They may be useful in one context and confusing in another.</p>

          <p className="mt-4 leading-7">That is why the scanner shows the exact Unicode code point instead of treating every hidden character as suspicious. A <code>U+200B</code> zero-width space, for example, is very different from a <code>U+200D</code> zero-width joiner used in some emoji and writing systems.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Examples of Hidden and Unusual Characters</h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
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
                    <td className="px-4 py-3 font-mono">{code}</td>
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">{type}</td>
                    <td className="px-4 py-3">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Common Problems</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card title="Text looks normal but behaves differently">A zero-width or non-standard space can exist between two visible characters without being obvious on screen.</Card>
            <Card title="Search does not find an expected phrase">A hidden character inside a word or phrase can prevent a literal search from matching the visible text.</Card>
            <Card title="Copied text has unusual spacing">A no-break space or narrow space can look almost identical to a standard space while behaving differently.</Card>
            <Card title="Code or structured text fails unexpectedly">Invisible formatting marks can cause comparisons, identifiers or parsers to behave differently from what the visible text suggests.</Card>
            <Card title="Direction changes unexpectedly">Bidirectional controls can change how mixed left-to-right and right-to-left text appears.</Card>
            <Card title="An em dash is called a watermark">An em dash is normal punctuation. CountFlows lists visible typography separately rather than automatically describing it as a hidden watermark.</Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Overview</h2>

          <p className="mt-4 leading-7">The ChatGPT Watermark Remover is a Unicode inspection and cleanup tool. Its main purpose is to make invisible and unusual characters visible before you decide whether to remove them.</p>

          <p className="mt-4 leading-7">Instead of applying a blind cleanup rule, the tool provides an X-Ray view, character names, code points, counts and positions. This is useful when you want evidence of what is actually present in the text rather than a simple “watermark removed” message.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Features</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card title="Unicode X-Ray View">Turn invisible findings into visible code-point labels inside a preview of the original text.</Card>
            <Card title="Exact Character Inspector">See the Unicode code, official-style name, category, count and positions for each supported finding.</Card>
            <Card title="Selective Cleanup">Remove or normalize only the character types you choose.</Card>
            <Card title="Conservative Recommended Mode">Automatically select common cleanup candidates while leaving language-sensitive characters and typography alone.</Card>
            <Card title="Clipboard Inspector">Check whether the latest paste included a separate rich HTML clipboard layer and inspect basic markup information.</Card>
            <Card title="Typography Separation">Treat em dashes, smart quotes and ellipses as typography rather than automatically labeling them as watermarks.</Card>
            <Card title="Large Text Support">Scan large text while limiting the visual X-Ray preview to protect browser performance.</Card>
            <Card title="Browser-Based Processing">The scanner does not need an AI model or remote text-processing API to inspect the characters.</Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">ChatGPT Watermark Remover vs AI Text Cleaner</h2>

          <p className="mt-4 leading-7">These CountFlows tools solve different problems. The watermark remover is built for inspection. The AI Text Cleaner is built for broader formatting cleanup.</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-950">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Task</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Watermark Remover</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">AI Text Cleaner</th>
                </tr>
              </thead>

              <tbody>
                <Comparison task="Inspect Unicode code points" watermark="Yes" cleaner="Not the main purpose" />
                <Comparison task="Show exact positions" watermark="Yes" cleaner="No" />
                <Comparison task="X-Ray invisible characters" watermark="Yes" cleaner="No" />
                <Comparison task="Remove Markdown and HTML" watermark="No" cleaner="Yes" />
                <Comparison task="General formatting cleanup" watermark="Limited" cleaner="Yes" />
                <Comparison task="Normalize bullets and formatting" watermark="No" cleaner="Yes" />
              </tbody>
            </table>
          </div>

          <p className="mt-4 leading-7">If your main problem is Markdown, HTML, bullets, spacing or general AI formatting, use the{" "}
            <Link href="/tools/ai-text-cleaner" className="font-semibold text-cyan-700 underline decoration-cyan-300 underline-offset-4 dark:text-cyan-300">AI Text Cleaner</Link>.
            If you want to inspect the actual hidden Unicode characters inside text, stay with this tool.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Does Removing Hidden Characters Affect AI Detection?</h2>

          <p className="mt-4 leading-7"><strong>Removing hidden characters does not guarantee that an AI detector will classify the text differently.</strong> AI-detection systems may analyze wording, sentence patterns, probability signals and other features unrelated to invisible Unicode.</p>

          <p className="mt-4 leading-7">CountFlows therefore does not describe this tool as a way to bypass GPTZero, Turnitin or another detector. Its purpose is narrower: inspect and clean supported character-level artifacts.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Privacy and Browser-Based Processing</h2>

          <p className="mt-4 leading-7">The text scan and cleanup run in your browser. The tool does not require an AI API or database to determine which supported Unicode characters are present.</p>

          <p className="mt-4 leading-7">For confidential or regulated information, you should still follow your organization&apos;s security policies before placing the text into any website or online service.</p>
        </section>

      

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">Frequently Asked Questions</h2>

          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
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

function Related({ href, title, children }) {
  return (
    <Link href={href} className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-cyan-300 hover:shadow-sm dark:border-white/10 dark:bg-slate-900 dark:hover:border-cyan-800">
      <h3 className="font-semibold text-gray-900 transition group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">{children}</p>
    </Link>
  )
}