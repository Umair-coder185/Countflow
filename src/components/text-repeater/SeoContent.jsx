import Link from "next/link";

const h2 = "text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100";
const h3 = "text-lg font-semibold text-gray-900 dark:text-gray-100";
const p = "text-sm sm:text-base leading-7 text-gray-700 dark:text-gray-300";
const linkStyle = "font-semibold text-cyan-700 dark:text-cyan-400 hover:underline underline-offset-4";
const card = "rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4 sm:p-5";

const RELATED_TOOLS = [
  { name: "Character Counter", href: "/tools/character-counter", desc: "Check character counts and publishing limits." },
  { name: "Word Counter", href: "/tools/word-counter", desc: "Count words and review text length." },
  { name: "Remove Line Breaks", href: "/tools/remove-line-breaks", desc: "Turn multi-line text into a single line." },
  { name: "Case Converter", href: "/tools/case-converter", desc: "Convert text to uppercase, lowercase, or title case." },
  { name: "AI Text Cleaner", href: "/tools/ai-text-cleaner", desc: "Remove unwanted formatting and hidden characters." },
  { name: "Keyword Density Checker", href: "/tools/keyword-density-checker", desc: "Review word and phrase frequency in text." },
];

const WHO_USES = [
  { title: "Social Media Managers", desc: "Create repeated emoji patterns and message strings without manually copying the same text." },
  { title: "Developers and QA Engineers", desc: "Generate repeated strings to test input limits, text rendering, and Unicode handling." },
  { title: "Students and Researchers", desc: "Prepare sample entries, repeated values, and formatted lists for assignments or testing." },
  { title: "Content Creators", desc: "Generate placeholder text and test how content fits into different layouts." },
  { title: "Data Analysts", desc: "Create repeated values with separators for sample data and controlled testing." },
  { title: "Designers and UI Teams", desc: "Test text wrapping, overflow, truncation, and responsive layouts using longer strings." },
];

const FEATURES = [
  "Repeat words, sentences, numbers, symbols, emojis, or paragraphs",
  "Choose any repeat count from 1 to 10,000",
  "Use quick presets including 100, 1,000, 5,000, and 10,000",
  "Separate copies using a new line, space, comma, dash, or custom text",
  "View live word and character totals",
  "Copy generated text",
  "Download repeated text as a .txt file",
  "Choose emojis using the built-in emoji picker",
  "Repeat Unicode and non-English text",
  "Use the tool on mobile, tablet, and desktop devices",
];

export default function SeoContent() {
  return (
    <section className="relative mx-auto w-full max-w-4xl space-y-12 px-4 py-10 text-gray-700 dark:text-gray-300 sm:px-6 md:space-y-14 md:py-14 lg:px-8">

      {/* 1. WHAT IS A TEXT REPEATER */}
      <section id="what-is-text-repeater" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>What Is a Text Repeater?</h2>

        <p className={p}>
          A <strong>text repeater</strong> is an online tool that duplicates a word, sentence,
          message, number, emoji, or paragraph a selected number of times. Instead of
          repeatedly copying and pasting text manually, you enter it once and choose
          how many copies you need.
        </p>

        <p className={p}>
          CountFlows is a <strong>free online text repeater</strong> that supports up to
          10,000 repetitions, five separator styles, and downloadable text output.
          The repetition process runs directly in your browser, with no account
          or remote text-processing service required.
        </p>

        <p className={p}>
          You can use it to create repeated messages, emoji sequences, lists,
          placeholder text, and sample data for applications you own or are
          authorized to test.
        </p>
      </section>

      {/* 2. HOW TO USE THE TEXT REPEATER */}
      <section id="how-to-repeat-text" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>How to Repeat Text Online</h2>

        <ol className="ml-5 list-decimal space-y-3 text-sm leading-7 sm:text-base">
          <li><strong>Enter your text:</strong> Type or paste a word, phrase, emoji, or paragraph into the input field.</li>
          <li><strong>Select the repeat count:</strong> Use a quick preset or enter your preferred number of repetitions.</li>
          <li><strong>Choose a separator:</strong> Select a new line, space, comma, dash, or custom separator.</li>
          <li><strong>Review the result:</strong> The generated text updates when you change your input or settings.</li>
          <li><strong>Copy or download:</strong> Save the repeated output or paste it into another application.</li>
        </ol>

        <p className={p}>
          You do not need to press a separate Generate button. The text repeater
          automatically updates the output as you edit the text, count, or separator.
        </p>
      </section>

      {/* 3. HIGH-INTENT: 10,000 TIMES */}
      <section id="repeat-text-10000-times" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>How to Repeat Text 10,000 Times</h2>

        <p className={p}>
          If you need to <strong>repeat text 10,000 times</strong>, enter the text you want
          to duplicate, select the <strong>10,000</strong> preset, and choose how each
          copy should be separated. The tool will generate the repeated result
          for you to copy or download.
        </p>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 dark:border-cyan-900 dark:bg-cyan-950/20 sm:p-5">
          <h3 className={h3}>Example: Repeat “Hello” 10,000 Times</h3>

          <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm leading-7 text-gray-700 dark:text-gray-300 sm:text-base">
            <li>Enter <code className="rounded bg-white px-1.5 py-0.5 font-mono dark:bg-gray-900">Hello</code> in the text field.</li>
            <li>Select the <strong>10,000</strong> repeat preset.</li>
            <li>Choose <strong>New line</strong> to place each copy on a separate line.</li>
            <li>Use <strong>Copy</strong> or <strong>Download</strong> to save the complete output.</li>
          </ol>
        </div>

        <p className={p}>
          Large repeated outputs can contain many characters, especially when
          the original input is a full sentence or paragraph. Before pasting
          the result into another app, check whether that app has a character
          limit or can handle large amounts of text.
        </p>
      </section>

      {/* 4. SECONDARY INTENT: 1,000 TIMES */}
      <section id="repeat-text-1000-times" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>How to Repeat Text 1,000 Times</h2>

        <p className={p}>
          To <strong>repeat a word or message 1,000 times</strong>, enter your text and
          choose the <strong>1,000</strong> preset. You can create a line-by-line list
          using the New line separator or a continuous sequence using Space.
        </p>

        <p className={p}>
          For example, entering <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono dark:bg-gray-800">67</code>,
          selecting 1,000 repetitions, and choosing New line creates a list
          containing 1,000 copies of that text. You can use the same process
          for words, emojis, and other short messages.
        </p>

        <p className={p}>
          If you need a different count, use the custom repeat-count field
          instead of a preset.
        </p>
      </section>

      {/* 5. SEPARATORS */}
      <section id="text-repeater-separators" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>Choose the Right Text Separator</h2>

        <p className={p}>
          A separator is the character or text placed between repeated copies.
          CountFlows provides five separator options.
        </p>

        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">
          Swipe sideways to view the complete comparison table.
        </p>

        <div role="region" aria-label="Text repeater separator comparison" tabIndex={0} className="max-w-full overflow-x-auto rounded-2xl border border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 dark:border-gray-700">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-cyan-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Separator</th>
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Example: “Item” repeated 4 times</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr className="bg-white dark:bg-gray-900">
                <th scope="row" className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">New line</th>
                <td className="px-4 py-3 font-mono text-xs">Item<br />Item<br />Item<br />Item</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900/60">
                <th scope="row" className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Space</th>
                <td className="px-4 py-3 font-mono text-xs">Item Item Item Item</td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <th scope="row" className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Comma</th>
                <td className="px-4 py-3 font-mono text-xs">Item,Item,Item,Item</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900/60">
                <th scope="row" className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Dash</th>
                <td className="px-4 py-3 font-mono text-xs">Item-Item-Item-Item</td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <th scope="row" className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Custom (~)</th>
                <td className="px-4 py-3 font-mono text-xs">Item~Item~Item~Item</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className={p}>
          Choose <strong>New line</strong> for a list with one copy per row,
          <strong> Space</strong> for a continuous message or emoji chain, and
          <strong> Comma</strong> for simple comma-separated text. The Custom
          option allows you to enter your own separator.
        </p>
      </section>

      {/* 6. USERS */}
      <section id="who-uses-text-repeater" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>Who Uses a Text Repeater?</h2>

        <p className={p}>
          Text repetition is useful for content preparation, interface testing,
          sample data, and repetitive formatting tasks.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {WHO_USES.map((item) => (
            <div key={item.title} className={card}>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRACTICAL USE CASES */}
      <section id="text-repeater-uses" className="scroll-mt-24 space-y-5">
        <h2 className={h2}>Common Ways to Use a Text Repeater</h2>

        <div className="space-y-3">
          <h3 className={h3}>Messages and Emoji Chains</h3>
          <p className={p}>
            Enter a short message or emoji, select your preferred repeat count,
            and choose Space if you want the copies on one line. Review the
            character count before posting to platforms with text limits.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className={h3}>Lists and Spreadsheet Data</h3>
          <p className={p}>
            Use New line to place each repetition on a separate line. This
            works for sample spreadsheet entries, temporary data, and simple lists.
            For comma-separated output, select Comma and confirm that the
            format matches the destination.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className={h3}>Dividers and Text Patterns</h3>
          <p className={p}>
            Repeat a character or symbol to create simple dividers and patterns.
            You can try a dash, equals sign, star, arrow, or another character.
          </p>

          <div className="flex flex-wrap gap-2">
            {["-", "=", "•", "★", "→"].map((symbol) => (
              <code key={symbol} className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-1.5 font-mono text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {symbol}
              </code>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className={h3}>Website and Design Mockups</h3>
          <p className={p}>
            Repeat a sample sentence or paragraph to test content-heavy layouts.
            Longer text can reveal unexpected wrapping, overflow, truncation,
            or spacing problems on different screen sizes.
          </p>
        </div>
      </section>

      {/* 8. TESTING */}
      <section id="text-repeater-testing" className="scroll-mt-24 space-y-5">
        <h2 className={h2}>Text Repeater for Testing</h2>

        <p className={p}>
          Developers and QA testers can create repeated strings to check
          how software handles different input lengths and characters.
        </p>

        <div className="space-y-3">
          <h3 className={h3}>Test Character Limits</h3>
          <p className={p}>
            To create a 255-character test string, enter a single character,
            repeat it 255 times, and choose a separator that does not add
            extra characters. Use the output counter to verify the final length.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className={h3}>Test Long-Form Input</h3>
          <p className={p}>
            Paste a larger repeated string into a form or application you
            own or have permission to test. Check input validation,
            scrolling, text wrapping, storage limits, and mobile rendering.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className={h3}>Check Unicode Support</h3>
          <p className={p}>
            Repeat emojis, accented characters, symbols, or non-Latin text
            to see how an application displays and handles Unicode input.
          </p>
        </div>
      </section>

      {/* 9. FEATURES */}
      <section id="text-repeater-features" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>What This Text Repeater Includes</h2>

        <ul className="grid gap-2.5 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm leading-7 sm:text-base">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. PRIVACY */}
      <section id="text-repeater-privacy" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>Browser-Based Text Repetition</h2>

        <p className={p}>
          CountFlows generates repeated text using browser-side processing.
          The text repeater component does not need to upload your input to
          a remote server to generate the result.
        </p>

        <p className={p}>
          When working with confidential or sensitive information, follow
          your school or organization’s data-handling rules before pasting
          that information into any website.
        </p>
      </section>

      {/* 11. INTERNAL LINKS */}
      <section id="related-text-tools" className="scroll-mt-24 space-y-4">
        <h2 className={h2}>Related Text Tools</h2>

        <p className={p}>
          After generating repeated text, these CountFlows tools can help
          you inspect, format, or measure the output.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {RELATED_TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 dark:border-gray-700 dark:bg-gray-900/60 dark:hover:border-cyan-700 dark:hover:bg-cyan-950/20">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
              <div>
                <span className="text-sm font-bold text-gray-900 group-hover:text-cyan-700 dark:text-gray-100 dark:group-hover:text-cyan-400">{tool.name}</span>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. CLOSING CTA */}
      <section className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-5 text-center dark:border-cyan-800 dark:bg-cyan-950/20 sm:p-7">
        <h2 className={h2}>Repeat Text Without Manual Copy and Paste</h2>

        <p className={`${p} mt-3`}>
          Enter your text once, choose how many copies you need, and
          copy or download the generated result.
        </p>

        <Link href="#text-repeater-top" className={`mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-700 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-800`}>
          Back to Text Repeater
        </Link>
      </section>

    </section>
  );
}