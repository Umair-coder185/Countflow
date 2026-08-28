import Link from "next/link"

export default function SEOContent() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="space-y-14 text-gray-700 dark:text-slate-300">

        {/* How to Use */}
        <section aria-labelledby="how-to-use-heading">
          <h2
            id="how-to-use-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            How to Use This Tool
          </h2>

          <p className="mt-4 leading-7">
            CountFlows Find and Replace Text lets you replace one word, phrase,
            character, or many different values in the same block of text.
            For a simple edit, you only need your original text, a Find value,
            and a Replace With value.
          </p>

          <ol className="mt-6 space-y-5">
            <li>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                1. Paste your original text
              </h3>
              <p className="mt-1 leading-7">
                Paste or type the content you want to edit into the Original
                Text box. This can be an article, list, email, code snippet,
                product description, data export, or other plain text.
              </p>
            </li>

            <li>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                2. Enter what you want to find
              </h3>
              <p className="mt-1 leading-7">
                Add the exact word, phrase, number, symbol, or pattern that
                should be located. For example, you could find{" "}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
                  2025
                </code>{" "}
                throughout a document.
              </p>
            </li>

            <li>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                3. Add the replacement
              </h3>
              <p className="mt-1 leading-7">
                Enter the new value in Replace With. To remove matching text
                completely, leave the replacement field empty.
              </p>
            </li>

            <li>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                4. Add more replacement rules when needed
              </h3>
              <p className="mt-1 leading-7">
                Select Add Replacement when you need to replace multiple words
                or phrases at once. You do not need to repeat the entire process
                for every change.
              </p>
            </li>

            <li>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                5. Review the matches and replace
              </h3>
              <p className="mt-1 leading-7">
                Check the match preview and any Smart Conflict Check warnings,
                then select Replace Text. Review the result before copying or
                downloading it.
              </p>
            </li>
          </ol>
        </section>

        {/* Common Problems */}
        <section aria-labelledby="common-problems-heading">
          <h2
            id="common-problems-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Common Problems
          </h2>

          <p className="mt-4 leading-7">
            Find and replace looks simple, but a small matching mistake can
            change more text than expected. These are the problems users most
            often need to avoid.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                A short word changes part of a longer word
              </h3>
              <p className="mt-2 text-sm leading-6">
                Finding <strong>cat</strong> may also match text inside{" "}
                <strong>category</strong>. Turn on Whole Words Only when the
                search value should stand on its own.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Capitalization does not match
              </h3>
              <p className="mt-2 text-sm leading-6">
                If <strong>Apple</strong> and <strong>apple</strong> should be
                treated differently, enable Match Case. Leave it off when
                capitalization should not matter.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                One replacement triggers another
              </h3>
              <p className="mt-2 text-sm leading-6">
                With rules such as <strong>cat → dog</strong> and{" "}
                <strong>dog → fish</strong>, Sequential mode can turn the
                original <strong>cat</strong> into <strong>fish</strong>.
                Simultaneous mode avoids this in most normal editing jobs.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                A regex pattern is invalid
              </h3>
              <p className="mt-2 text-sm leading-6">
                An incomplete regular expression can produce unexpected
                matching behavior. CountFlows checks the pattern and shows an
                error instead of applying an invalid replacement.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                I need to delete the matching text
              </h3>
              <p className="mt-2 text-sm leading-6">
                Put the unwanted value in Find and leave Replace With empty.
                Every accepted match will be removed.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Two replacement rules overlap
              </h3>
              <p className="mt-2 text-sm leading-6">
                Similar search terms can compete for the same part of the
                original text. Check the preview and Smart Conflict Check before
                applying a large group of rules.
              </p>
            </article>
          </div>
        </section>

        {/* Overview */}
        <section aria-labelledby="overview-heading">
          <h2
            id="overview-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Overview
          </h2>

          <p className="mt-4 leading-7">
            An online find and replace tool searches through a block of text for
            a specific value and substitutes matching occurrences with another
            value. It is useful when the same correction appears many times and
            manual editing would be slow or easy to miss.
          </p>

          <p className="mt-4 leading-7">
            CountFlows supports both basic search and replace jobs and more
            controlled bulk text replacement. You can replace multiple words at
            once, restrict matching to whole words, respect capitalization, use
            regular expressions, and choose how multiple rules are applied.
          </p>

          <p className="mt-4 leading-7">
            The tool is designed for writers, editors, developers, students,
            marketers, SEO professionals, and anyone cleaning structured or
            repeated text. No software installation is required.
          </p>
        </section>

        {/* Features */}
        <section aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Features
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Feature
              title="Multiple Find and Replace Rules"
              text="Apply several replacement pairs in one job instead of editing the same text again and again."
            />

            <Feature
              title="Smart Conflict Check"
              text="Detect duplicate, overlapping, circular, or chained rules that may produce unexpected replacements."
            />

            <Feature
              title="Match Preview"
              text="See matching text before running the final replacement, which makes large edits easier to review."
            />

            <Feature
              title="Whole-Word Matching"
              text="Replace a standalone word without accidentally changing the same letters inside a longer word."
            />

            <Feature
              title="Case-Sensitive Matching"
              text="Choose whether words such as Apple, apple, and APPLE should be treated as the same value."
            />

            <Feature
              title="Regular Expression Support"
              text="Use regex patterns and capture groups when a simple literal search is not flexible enough."
            />

            <Feature
              title="Simultaneous Replacement"
              text="Apply rules against the original text so a newly created value does not unexpectedly trigger another rule."
            />

            <Feature
              title="Sequential Replacement"
              text="Run rules from top to bottom when you intentionally want one transformation to feed into the next."
            />

            <Feature
              title="Replacement Statistics"
              text="Check how many replacements were made and compare word and character counts before and after editing."
            />

            <Feature
              title="Copy and Download"
              text="Copy the finished result to your clipboard or save it as a text file when the changes look correct."
            />
          </div>
        </section>

        {/* Multiple replacement intent */}
        <section aria-labelledby="multiple-replacements-heading">
          <h2
            id="multiple-replacements-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Find and Replace Multiple Words at Once
          </h2>

          <p className="mt-4 leading-7">
            Bulk find and replace is useful when a document needs several
            repeated corrections. Instead of running a separate search for each
            word, add multiple replacement rules and process them together.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
            <div className="grid grid-cols-2 bg-gray-50 text-sm font-semibold text-gray-900 dark:bg-slate-900 dark:text-white">
              <div className="border-r border-gray-200 px-4 py-3 dark:border-white/10">
                Find
              </div>
              <div className="px-4 py-3">
                Replace With
              </div>
            </div>

            {[
              ["2025", "2026"],
              ["oldbrand.com", "newbrand.com"],
              ["John", "David"],
              ["colour", "color"],
              ["—", "-"],
            ].map(([find, replace]) => (
              <div
                key={`${find}-${replace}`}
                className="grid grid-cols-2 border-t border-gray-200 text-sm dark:border-white/10"
              >
                <div className="border-r border-gray-200 px-4 py-3 font-mono dark:border-white/10">
                  {find}
                </div>
                <div className="px-4 py-3 font-mono">
                  {replace}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 leading-7">
            This is useful for brand migrations, repeated spelling changes,
            template editing, product updates, terminology changes, and bulk
            cleanup.
          </p>
        </section>

        {/* Plain text vs regex */}
        <section aria-labelledby="plain-regex-heading">
          <h2
            id="plain-regex-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Plain Text vs Regex Find and Replace
          </h2>

          <p className="mt-4 leading-7">
            Use plain text for normal word or phrase replacement. Use regex only
            when you need to match a pattern rather than one exact value.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="py-3 pr-5 font-semibold text-gray-900 dark:text-white">
                    Mode
                  </th>
                  <th className="py-3 pr-5 font-semibold text-gray-900 dark:text-white">
                    Best for
                  </th>
                  <th className="py-3 font-semibold text-gray-900 dark:text-white">
                    Example
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <td className="py-4 pr-5 font-medium">Plain text</td>
                  <td className="py-4 pr-5">
                    Words, phrases, names, URLs, symbols
                  </td>
                  <td className="py-4">
                    <code>colour → color</code>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 pr-5 font-medium">Regex</td>
                  <td className="py-4 pr-5">
                    Dates, numbers, whitespace, repeated patterns
                  </td>
                  <td className="py-4">
                    <code>\s+ → single space</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 leading-7">
            If you are not familiar with regular expressions, leave Regex off.
            Literal find and replace is safer for ordinary writing and editing.
          </p>
        </section>

        {/* Rule order */}
        <section aria-labelledby="replacement-mode-heading">
          <h2
            id="replacement-mode-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Simultaneous vs Sequential Replacement
          </h2>

          <p className="mt-4 leading-7">
            The difference matters when one replacement creates text that
            another rule can find.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-5 dark:border-cyan-900/50 dark:bg-cyan-950/20">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Simultaneous
              </h3>

              <p className="mt-2 text-sm leading-6">
                Recommended for most jobs. Rules work from the original text, so
                the output created by one rule does not become a new match for
                another rule.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Sequential
              </h3>

              <p className="mt-2 text-sm leading-6">
                Rules run from top to bottom. Use this when you intentionally
                want the result of one replacement to be processed by a later
                rule.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-gray-100 p-4 text-sm leading-6 dark:bg-slate-900">
            <strong className="text-gray-900 dark:text-white">Example:</strong>{" "}
            if Rule 1 is <code>cat → dog</code> and Rule 2 is{" "}
            <code>dog → fish</code>, Sequential mode can turn{" "}
            <code>cat</code> into <code>fish</code>. Smart Conflict Check warns
            you about this type of chain.
          </div>
        </section>

        {/* Examples */}
        <section aria-labelledby="examples-heading">
          <h2
            id="examples-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Find and Replace Text Examples
          </h2>

          <p className="mt-4 leading-7">
            A few simple examples show where online search and replace saves
            time.
          </p>

          <div className="mt-6 space-y-4">
            <Example
              title="Update a year"
              before="The 2025 report includes our 2025 sales results."
              find="2025"
              replace="2026"
              after="The 2026 report includes our 2026 sales results."
            />

            <Example
              title="Rename a brand"
              before="Visit oldbrand.com for OldBrand support."
              find="oldbrand.com"
              replace="newbrand.com"
              after="Visit newbrand.com for OldBrand support."
            />

            <Example
              title="Remove unwanted text"
              before="Product [DRAFT] description"
              find="[DRAFT]"
              replace="blank"
              after="Product description"
            />
          </div>
        </section>

        {/* Common uses */}
        <section aria-labelledby="common-uses-heading">
          <h2
            id="common-uses-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Common Uses for Find and Replace Text
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <UseCase
              title="Writing and Editing"
              text="Correct repeated spelling mistakes, rename people or products, update dates, or standardize terminology across long text."
            />

            <UseCase
              title="SEO and Content"
              text="Update old URLs, brand names, recurring phrases, product terms, or repeated labels across copied website content."
            />

            <UseCase
              title="Code and Configuration"
              text="Rename strings, update paths, change placeholder values, or transform repeated text inside a code snippet."
            />

            <UseCase
              title="Lists and Data Cleanup"
              text="Replace delimiters, remove unwanted markers, standardize labels, or clean repeated values in copied CSV-style data."
            />
          </div>
        </section>

        {/* Privacy */}
        <section aria-labelledby="privacy-heading">
          <h2
            id="privacy-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Privacy and Browser-Based Processing
          </h2>

          <p className="mt-4 leading-7">
            The find and replace operation is performed in your browser and does
            not require a remote text-processing API. This keeps the workflow
            fast and avoids sending the text to CountFlows simply to perform the
            replacement.
          </p>

          <p className="mt-4 leading-7">
            You should still follow your organization&apos;s own security rules
            when handling confidential, regulated, or sensitive information.
          </p>
        </section>

        {/* Related tools */}
        <section aria-labelledby="related-tools-heading">
          <h2
            id="related-tools-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
          >
            Related Text Tools
          </h2>

          <p className="mt-4 leading-7">
            Find and Replace Text works well with other CountFlows tools when a
            document needs more than one type of edit.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <RelatedTool
              href="/tools/text-compare"
              title="Online Text Compare"
              text="Compare the original and edited versions to see exactly what changed."
            />

            <RelatedTool
              href="/tools/ai-text-cleaner"
              title="AI Text Cleaner"
              text="Clean unwanted formatting and text artifacts before making targeted replacements."
            />

            <RelatedTool
              href="/tools/case-converter"
              title="Case Converter"
              text="Change capitalization when you do not need to replace specific words."
            />

            <RelatedTool
              href="/tools/remove-line-breaks"
              title="Remove Line Breaks"
              text="Remove unwanted line breaks before further text cleanup."
            />

            <RelatedTool
              href="/tools/word-counter"
              title="Word Counter"
              text="Check word and character counts after editing your text."
            />
          </div>
        </section>
      </div>
    </section>
  )
}

function Feature({ title, text }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6">{text}</p>
    </article>
  )
}

function Example({ title, before, find, replace, after }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <div className="mt-3 space-y-2 text-sm leading-6">
        <p>
          <strong>Original:</strong> {before}
        </p>
        <p>
          <strong>Find:</strong> <code>{find}</code>
        </p>
        <p>
          <strong>Replace:</strong> <code>{replace}</code>
        </p>
        <p>
          <strong>Result:</strong> {after}
        </p>
      </div>
    </article>
  )
}

function UseCase({ title, text }) {
  return (
    <article>
      <h3 className="font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 leading-7">{text}</p>
    </article>
  )
}

function RelatedTool({ href, title, text }) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-cyan-300 hover:shadow-sm dark:border-white/10 dark:bg-slate-900 dark:hover:border-cyan-800"
    >
      <h3 className="font-semibold text-gray-900 transition group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
        {text}
      </p>
    </Link>
  )
}