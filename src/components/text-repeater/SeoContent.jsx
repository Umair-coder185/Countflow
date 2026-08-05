import Link from "next/link";

const RELATED_TOOLS = [
  {
    name: "Character Counter",
    href: "/tools/character-counter",
    desc: "Check the length of a message, caption, or form value",
  },
  {
    name: "Word Counter",
    href: "/tools/word-counter",
    desc: "Count words and sentences",
  },
  {
    name: "Remove Line Breaks",
    href: "/tools/remove-line-breaks",
    desc: "Turn multi-line content into one line",
  },
  {
    name: "Case Converter",
    href: "/tools/case-converter",
    desc: "Switch between uppercase, lowercase, and title case",
  },
  {
    name: "AI Text Cleaner",
    href: "/tools/ai-text-cleaner",
    desc: "Remove unwanted formatting and hidden characters",
  },
  {
    name: "Keyword Density Checker",
    href: "/tools/keyword-density-checker",
    desc: "Review keyword frequency in webpage copy",
  },
];

const WHO_USES = [
  {
    title: "Social media managers",
    desc: "Build emoji chains and repeated message strings for posts, bios, and comments without manual copy-paste.",
  },
  {
    title: "Developers and QA engineers",
    desc: "Test field limits, generate bulk test data, and verify Unicode handling in forms and interfaces.",
  },
  {
    title: "Students and researchers",
    desc: "Populate spreadsheets with sample entries, create formatted lists, and prepare data sets for assignments.",
  },
  {
    title: "Content creators and copywriters",
    desc: "Fill layout mock-ups with placeholder text and check how headings, paragraphs, and blocks behave at scale.",
  },
  {
    title: "Data analysts",
    desc: "Produce comma-separated or delimited lists for import into CSV files, databases, or analysis tools.",
  },
  {
    title: "Designers and UI teams",
    desc: "Stress-test responsive layouts with long repeated text to catch overflow, wrapping, and truncation issues early.",
  },
];

export default function SeoContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-14 text-gray-700 dark:text-gray-300">
      {/* ── 1. What is a text repeater ── */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          What Is a Text Repeater?
        </h2>
        <p className="leading-7">
          A text repeater is a free browser tool that repeats any text, word, or
          emoji a set number of times instead of you copying and pasting by hand.
          Paste your text once, set a count, and this tool does it in under a
          second: up to 10,000 repeats, five separator styles, and nothing you
          type ever leaves your browser. There is no server, no API call, and no
          sign-up wall — just instant, private text repetition.
        </p>
        <p className="leading-7">
          Whether you need a list of test entries for a spreadsheet, a repeated
          emoji string for a social media post, or a block of filler text for a
          layout mock-up, a text repeater handles the tedious part so you can
          focus on the work that matters.
        </p>
      </div>

      {/* ── 2. How to repeat text ── */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          How to Repeat Text
        </h2>
        <ol className="list-decimal list-outside ml-5 space-y-3 leading-7">
          <li>
            <strong className="text-gray-900 dark:text-gray-100">
              Type or paste something
            </strong>{" "}
            into the input box.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">
              Choose how many times
            </strong>{" "}
            it should appear.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">
              Select a separator.
            </strong>
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">
              Copy or download
            </strong>{" "}
            the result.
          </li>
        </ol>
        <p className="leading-7">
          You do not need to press a generate button. The output changes as you
          edit the text or settings.
        </p>
      </div>

      {/* ── 3. Pick the right separator ── */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Pick the Right Separator
        </h2>
        <p className="leading-7">
          The separator controls what appears between the copies.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-cyan-50 dark:bg-gray-800">
                <th className="px-5 py-3 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  Option
                </th>
                <th className="px-5 py-3 font-semibold text-gray-900 dark:text-gray-100">
                  Result with &quot;Item&quot; repeated four times
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  New line
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  Item<br />
                  Item<br />
                  Item<br />
                  Item
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900/60">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  Space
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  Item Item Item Item
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  Comma
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  Item,Item,Item,Item
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900/60">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  Dash
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  Item-Item-Item-Item
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  Custom ~
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  Item~Item~Item~Item
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="leading-7">
          Choose <strong className="text-gray-900 dark:text-gray-100">New line</strong> when
          preparing rows for a spreadsheet or test file.{" "}
          <strong className="text-gray-900 dark:text-gray-100">Space</strong> is
          better for a message or emoji chain, while{" "}
          <strong className="text-gray-900 dark:text-gray-100">Comma</strong>{" "}
          produces a simple list. If those options do not fit, enter your own
          separator using the Custom option.
        </p>
      </div>

      {/* ── 4. Who uses the text repeater ── */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Who Uses a Text Repeater?
        </h2>
        <p className="leading-7">
          Text repeaters are not limited to one type of user. Anyone who needs
          duplicated text without the manual effort can benefit from this tool.
          Here are some of the most common groups that rely on it daily.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {WHO_USES.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Common ways to use the tool ── */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Common Ways to Use the Tool
        </h2>

        {/* Messages and Emoji Chains */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Messages and Emoji Chains
          </h3>
          <p className="leading-7">
            Enter a short message or emoji, select the number of copies, and use
            the space option to keep everything on one line. Long repeated
            messages can be difficult to read, so check the final character count
            before sending or posting them.
          </p>
        </div>

        {/* Lists and Spreadsheet Data */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Lists and Spreadsheet Data
          </h3>
          <p className="leading-7">
            Select the new-line option to place one copy on each row. This is
            useful when preparing sample spreadsheet values, simple lists, or
            temporary test data.
          </p>
          <p className="leading-7">
            For comma-separated values, choose the comma option and confirm that
            the result matches the format required by the destination.
          </p>
        </div>

        {/* Dividers and Text Patterns */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Dividers and Text Patterns
          </h3>
          <p className="leading-7">
            Repeating a character is an easy way to make a basic divider. Try
            symbols such as:
          </p>
          <div className="flex flex-wrap gap-2">
            {["-", "=", "\u2022", "\u2605", "\u2192"].map((sym) => (
              <code
                key={sym}
                className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm font-mono text-gray-800 dark:text-gray-200"
              >
                {sym}
              </code>
            ))}
          </div>
          <p className="leading-7">
            You can also use the custom separator to create your own pattern.
          </p>
        </div>

        {/* Design Mockups */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Design Mockups
          </h3>
          <p className="leading-7">
            A single sentence rarely shows how a layout will behave with a
            realistic amount of text. Repeat a sample sentence to fill a card,
            page section, or mobile screen and check how the design responds.
          </p>
        </div>
      </div>

      {/* ── 6. Text repeater for testing ── */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Text Repeater for Testing
        </h2>
        <p className="leading-7">
          Developers and QA testers can use repeated strings to check how an
          interface handles unusually short or long input.
        </p>

        {/* Check Field Limits */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Check Field Limits
          </h3>
          <p className="leading-7">
            To test a 255-character field, enter one character and repeat it 255
            times. If you select a separator, remember that the separator
            characters will also affect the final length. The live counter helps
            you confirm the output before using it.
          </p>
        </div>

        {/* Test Long Form Input */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Test Long Form Input
          </h3>
          <p className="leading-7">
            Generate a larger block and paste it into a form you own or have
            permission to test. Look for problems with:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5 leading-7">
            <li>Character validation</li>
            <li>Scrolling</li>
            <li>Text wrapping</li>
            <li>Storage limits</li>
            <li>Mobile layouts</li>
            <li>Slow rendering</li>
          </ul>
        </div>

        {/* Check Unicode Support */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Check Unicode Support
          </h3>
          <p className="leading-7">
            Repeat emojis, accented letters, symbols, or non-Latin text to see
            how your application stores and displays Unicode characters.
          </p>
        </div>
      </div>

      {/* ── 7. What the text repeater includes ── */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          What the Text Repeater Includes
        </h2>
        <ul className="space-y-2.5">
          {[
            "Repeat words, sentences, numbers, symbols, emojis, or paragraphs",
            "Set a custom repeat count of up to 10,000",
            "Use quick presets for common counts",
            "Separate copies with a new line, space, comma, dash, or custom value",
            "See live word and character totals",
            "Copy the complete result",
            "Download the output as a .txt file",
            "Use an included emoji picker",
            "Preserve Unicode and non-English text",
            "Use the tool on phones, tablets, and computers",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 leading-7">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── 8. Your text stays in your browser ── */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Your Text Stays in Your Browser
        </h2>
        <p className="leading-7">
          The repeating process runs locally in your browser. Text entered into
          the tool is not uploaded to a server for processing.
        </p>
        <p className="leading-7">
          You should still follow your school or organization&rsquo;s privacy
          rules when working with confidential information.
        </p>
      </div>

      {/* ── 9. Related tools ── */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Related Tools
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4 transition-colors hover:border-cyan-300 dark:hover:border-cyan-700 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20"
            >
              <span
                className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400 group-hover:bg-cyan-500 transition-colors"
                aria-hidden="true"
              />
              <div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {tool.name}
                </span>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 10. Closing CTA ── */}
      <div className="rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50/60 dark:bg-cyan-950/30 p-6 md:p-8 text-center space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Repeat It Without the Copy-and-Paste Routine
        </h2>
        <p className="leading-7 text-gray-600 dark:text-gray-400">
          Enter your text once, choose the number of copies, and take the
          finished result wherever you need it.
        </p>
      </div>
    </section>
  );
}