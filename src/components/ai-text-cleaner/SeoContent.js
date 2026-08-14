


import Link from "next/link"

const h2Class =
  "text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4"

const h3Class =
  "text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2"

const pClass =
  "text-gray-600 dark:text-gray-300 leading-7 mb-4"

const linkClass =
  "text-cyan-600 dark:text-cyan-400 font-medium hover:underline"

const thClass =
  "px-4 py-3 font-semibold text-gray-900 dark:text-gray-100"

const tdClass =
  "px-4 py-3 align-top"

const trClass =
  "border-t border-gray-200 dark:border-gray-700"

export default function SeoContent() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8 md:px-8">

      {/* -------------------------------------------------------------- */}
      {/* PRIMARY SEARCH INTENT                                          */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        What Is an AI Text Cleaner?
      </h2>

      <p className={pClass}>
        An <strong>AI text cleaner</strong> removes unwanted formatting and
        copy-paste artifacts from AI-generated text without rewriting the
        message. CountFlows can clean markdown, hidden Unicode characters,
        smart punctuation, HTML, awkward spacing, em and en dashes, duplicate
        lines, emojis, bullets, and other text artifacts from content copied
        from ChatGPT, Claude, Gemini, Copilot, and similar tools.
      </p>

      <p className={pClass}>
        The cleaner runs in your browser using fixed text-processing rules.
        Your text is not sent to an AI model, and you choose which cleaning
        options are applied.
      </p>

      {/* -------------------------------------------------------------- */}
      {/* HOW TO                                                         */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        How to Clean AI-Generated Text
      </h2>

      <ol className="mb-4 list-decimal space-y-2 pl-6 leading-7 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Paste your text</strong> into the Original Text box.
        </li>

        <li>
          <strong>Choose the cleaning options</strong> you want. The
          recommended options handle common formatting problems, while
          advanced options stay optional.
        </li>

        <li>
          <strong>Click Clean My Text</strong>, review the cleaned output and
          cleanup report, then copy or download the result.
        </li>
      </ol>

      <p className={pClass}>
        This is useful when text copied from an AI chat looks correct in the
        chat window but pastes into Word, Google Docs, email, a CMS, or another
        editor with unwanted symbols, spacing, or special characters.
      </p>

      {/* -------------------------------------------------------------- */}
      {/* WHAT IT CLEANS                                                 */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        What This AI Text Cleaner Removes
      </h2>

      <p className={pClass}>
        Instead of applying one aggressive cleanup rule, CountFlows separates
        common fixes from optional changes. This helps preserve the text you
        want to keep.
      </p>

      <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[640px] text-left text-sm md:text-base">
          <thead className="bg-cyan-50 dark:bg-cyan-900/30">
            <tr>
              <th className={thClass}>Cleanup</th>
              <th className={thClass}>What it fixes</th>
              <th className={thClass}>Example</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 dark:text-gray-300">
            <tr className={trClass}>
              <td className={tdClass}>Markdown</td>
              <td className={tdClass}>
                Headings, bold or italic markers, links, blockquotes,
                backticks, and table syntax
              </td>
              <td className={tdClass}>
                **important** becomes important
              </td>
            </tr>

            <tr className={trClass}>
              <td className={tdClass}>Hidden characters</td>
              <td className={tdClass}>
                Zero-width characters, BOMs, control characters, and unusual
                spaces
              </td>
              <td className={tdClass}>
                Invisible formatting is removed or normalized
              </td>
            </tr>

            <tr className={trClass}>
              <td className={tdClass}>Smart punctuation</td>
              <td className={tdClass}>
                Curly quotes and single-character ellipses
              </td>
              <td className={tdClass}>
                “hello”… becomes "hello"...
              </td>
            </tr>

            <tr className={trClass}>
              <td className={tdClass}>Dashes</td>
              <td className={tdClass}>
                Em and en dashes that may not paste consistently
              </td>
              <td className={tdClass}>
                — and – are converted to keyboard-safe hyphens
              </td>
            </tr>

            <tr className={trClass}>
              <td className={tdClass}>HTML</td>
              <td className={tdClass}>
                HTML tags and encoded entities copied from rendered content
              </td>
              <td className={tdClass}>
                &lt;p&gt;Hello&lt;/p&gt; becomes Hello
              </td>
            </tr>

            <tr className={trClass}>
              <td className={tdClass}>Spacing</td>
              <td className={tdClass}>
                Repeated spaces, trailing whitespace, excess blank lines, and
                stray spaces before punctuation
              </td>
              <td className={tdClass}>
                Messy spacing becomes consistent plain text
              </td>
            </tr>

            <tr className={trClass}>
              <td className={tdClass}>Optional cleanup</td>
              <td className={tdClass}>
                Bullets, emojis, blank lines, duplicate lines, diacritics, and
                advanced Unicode forms
              </td>
              <td className={tdClass}>
                These stay optional because they can intentionally change
                visible content
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* UNIQUE PRODUCT VALUE                                           */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        See What Changed Before You Copy
      </h2>

      <p className={pClass}>
        Cleaning text should not feel like a black box. After a cleanup,
        CountFlows shows a cleanup report with the rules that changed the text,
        before-and-after character counts, and a highlighted view of removed
        or replaced source characters. You can review the changes before using
        the cleaned version.
      </p>

      <figure>
        <img src="/blogs/ai-text-cleaner.png" alt="Cleanup Report" />
      </figure>

      {/* -------------------------------------------------------------- */}
      {/* HIGH-INTENT RELATED QUERY                                      */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        Remove ChatGPT Formatting Without Rewriting the Text
      </h2>

      <p className={pClass}>
        Chat interfaces often render structured output such as headings,
        bold text, lists, links, code, and other markdown-style formatting.
        Copying that content into another application can leave visible syntax,
        rich-text residue, unusual spacing, or Unicode characters behind.
        Cleaning removes those formatting artifacts while keeping the wording
        available for you to edit normally.
      </p>

      <p className={pClass}>
        CountFlows does not try to make AI writing “undetectable” and it does
        not rewrite sentences. It is a formatting and text-cleanup utility.
      </p>

      {/* -------------------------------------------------------------- */}
      {/* SEMANTIC CLARITY                                               */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        AI Text Cleaner vs. AI Humanizer
      </h2>

      <p className={pClass}>
        An AI text cleaner fixes formatting, spacing, punctuation, Unicode,
        markup, and other copy-paste problems. An AI humanizer changes wording
        or sentence structure. CountFlows is a cleaner, not a humanizer: the
        goal is to make the text technically cleaner without automatically
        rewriting your ideas.
      </p>

      {/* -------------------------------------------------------------- */}
      {/* PRACTICAL USE                                                  */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        Where Cleaned Text Is Useful
      </h2>

      <p className={pClass}>
        Cleaned text is useful before pasting into Word or Google Docs,
        publishing in a CMS, writing an email, preparing social media copy,
        working with CSV or JSON, or moving text between applications that
        handle formatting differently.
      </p>

      <p className={pClass}>
        After cleaning, use the{" "}
        <Link
          href="/tools/character-counter"
          className={linkClass}
        >
          Character Counter
        </Link>{" "}
        to check publishing limits, the{" "}
        <Link
          href="/tools/word-counter"
          className={linkClass}
        >
          Word Counter
        </Link>{" "}
        for length and text statistics, or the{" "}
        <Link
          href="/tools/keyword-density-checker"
          className={linkClass}
        >
          Keyword Density Checker
        </Link>{" "}
        when reviewing content for publication.
      </p>

      {/* -------------------------------------------------------------- */}
      {/* PRIVACY                                                        */}
      {/* -------------------------------------------------------------- */}

      <h2 className={h2Class}>
        Private, Browser-Based Text Cleaning
      </h2>

      <p className={pClass}>
        The cleaning rules run locally in your browser. CountFlows does not
        need to send the pasted text to a remote AI model to perform the
        cleanup, so you can clean text without creating an account or waiting
        for a server response.
      </p>

      {/* -------------------------------------------------------------- */}
      {/* RELATED TOOL                                                   */}
      {/* -------------------------------------------------------------- */}

      <h3 className={h3Class}>
        Need to change capitalization too?
      </h3>

      <p className={pClass}>
        Use the{" "}
        <Link
          href="/tools/case-converter"
          className={linkClass}
        >
          Case Converter
        </Link>{" "}
        after cleaning if you also need sentence case, title case, uppercase,
        or lowercase formatting.
      </p>

    </section>
  )}