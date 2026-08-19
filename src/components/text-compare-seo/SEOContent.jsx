import Link from "next/link"

const h2Class =
  "mt-12 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"

const h3Class =
  "mt-8 mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"

const pClass =
  "mb-6 leading-7 text-gray-600 dark:text-gray-400"

const listClass =
  "mb-6 list-disc space-y-2.5 pl-6 leading-7 text-gray-600 dark:text-gray-400"

const orderedListClass =
  "mb-6 list-decimal space-y-2.5 pl-6 leading-7 text-gray-600 dark:text-gray-400"

const linkClass =
  "font-medium text-cyan-700 underline-offset-2 hover:underline dark:text-cyan-400"

const exampleLabelClass =
  "mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400"

const exampleBoxClass =
  "rounded-xl border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700 dark:border-gray-700 dark:bg-gray-950/70 dark:text-gray-300"


export default function SEOContent() {
  return (
    <section
      aria-label="Text Compare guide"
      className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-b from-gray-50 to-cyan-100 px-4 py-14 dark:from-gray-900 dark:to-gray-800 md:px-8 md:py-16"
    >

      {/* ==================================================
          PRIMARY SEARCH INTENT
      ================================================== */}

      <h2 className={h2Class}>
        Compare Two Texts Online and Find Differences
      </h2>

      <p className={pClass}>
        Use CountFlows Text Compare when you have two versions of the same
        writing, document, code, list, or text file and want to see exactly what
        changed. Paste the original text into the first box and the revised text
        into the second. The tool compares them and highlights added and removed
        content so you can review the differences without reading both versions
        line by line from the beginning.
      </p>

      <p className={pClass}>
        You can compare text by <strong>word, character, or line</strong>,
        switch between side-by-side and inline results, check the similarity
        percentage, and review added or removed words. For longer comparisons,
        use the Previous and Next Difference controls to move directly between
        detected changes.
      </p>


      {/* ==================================================
          HOW TO USE
      ================================================== */}

      <h2 className={h2Class}>
        How to Compare Two Texts for Differences
      </h2>

      <ol className={orderedListClass}>
        <li>
          Paste or type the <strong>original text</strong> into the first
          comparison box.
        </li>

        <li>
          Paste the <strong>revised or changed text</strong> into the second
          box. You can also load a supported local text file.
        </li>

        <li>
          Choose <strong>Words, Characters, or Lines</strong> depending on how
          precisely you want to compare the two versions.
        </li>

        <li>
          Choose whether capitalization or whitespace differences should be
          ignored when the selected comparison mode supports those options.
        </li>

        <li>
          Click <strong>Compare Text</strong> to highlight the differences and
          calculate the comparison statistics.
        </li>

        <li>
          Review the results side by side or inline, then use Previous and Next
          Difference to move through changes in longer text.
        </li>
      </ol>


      {/* ==================================================
          UNIQUE EXAMPLE
      ================================================== */}

      <h2 className={h2Class}>
        Example of Comparing Two Texts
      </h2>

      <p className={pClass}>
        A text difference checker is most useful when the two versions look
        similar at first glance. For example:
      </p>

      <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div>
          <div className={exampleLabelClass}>
            Original
          </div>

          <div className={exampleBoxClass}>
            The report will be submitted on Monday after the final review.
          </div>
        </div>

        <div>
          <div className={exampleLabelClass}>
            Revised
          </div>

          <div className={exampleBoxClass}>
            The updated report will be submitted on Tuesday after the final
            review.
          </div>
        </div>

      </div>

      <p className={pClass}>
        Instead of manually searching the two sentences, Text Compare can
        identify the added word <strong>updated</strong> and the change from
        <strong> Monday</strong> to <strong>Tuesday</strong>. The same approach
        works for much longer drafts, lists, code, and structured text.
      </p>


      {/* ==================================================
          MODES
      ================================================== */}

      <h2 className={h2Class}>
        Choose Word, Character, or Line Comparison
      </h2>


      <h3 className={h3Class}>
        Word Comparison
      </h3>

      <p className={pClass}>
        Word mode is usually the best choice for articles, essays, reports,
        emails, website copy, and edited drafts. It makes wording changes easier
        to review by showing where words or phrases were added or removed
        without treating every character as an individual difference.
      </p>


      <h3 className={h3Class}>
        Character Comparison
      </h3>

      <p className={pClass}>
        Character mode provides a more detailed text comparison. Use it when
        small differences matter, such as spelling changes, numbers,
        punctuation, symbols, IDs, codes, or short strings. Because
        character-level comparison requires more processing, Word or Line mode
        is more suitable for larger documents.
      </p>


      <h3 className={h3Class}>
        Line-by-Line Comparison
      </h3>

      <p className={pClass}>
        Line mode compares text according to individual lines. It is useful for
        code, logs, lists, configuration files, copied data, and documents where
        the position of each line matters. It is also the recommended mode for
        larger inputs when you need to identify structural changes efficiently.
      </p>


      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <h2 className={h2Class}>
        How Does the Text Compare Tool Work?
      </h2>

      <p className={pClass}>
        The tool divides the two inputs according to the comparison mode you
        select and looks for matching and changed sections. Matching content is
        kept unchanged in the result, while additions and removals are marked
        separately. Neighboring changes are grouped to make the result easier
        to read instead of displaying every changed character as an unrelated
        result.
      </p>

      <p className={pClass}>
        The comparison engine also uses limits for large or unusually complex
        inputs. If a comparison would require excessive processing, the tool can
        stop the operation and recommend Line mode or a smaller section rather
        than continuing an unnecessarily expensive comparison.
      </p>


      {/* ==================================================
          SUPPORTED USE CASES
      ================================================== */}

      <h2 className={h2Class}>
        What Can You Compare?
      </h2>

      <ul className={listClass}>
        <li>
          <strong>Articles and documents:</strong> compare two drafts of an
          article, report, essay, email, proposal, or web page before publishing
          or submitting it.
        </li>

        <li>
          <strong>Edited and AI-assisted writing:</strong> compare your original
          text with an edited version to see which words and sentences were
          actually changed.
        </li>

        <li>
          <strong>Code and structured text:</strong> review plain-text changes
          in JSON, Markdown, HTML, CSS, JavaScript, TypeScript, XML, YAML, and
          similar formats.
        </li>

        <li>
          <strong>Lists and copied data:</strong> find additions or removals
          between two versions of names, labels, values, CSV-style rows, or
          other line-based information.
        </li>

        <li>
          <strong>Website content:</strong> compare an old page with revised
          copy to confirm whether requested content changes were applied.
        </li>
      </ul>


      {/* ==================================================
          FILE INTENT
      ================================================== */}

      <h2 className={h2Class}>
        Compare Two Text Files Online
      </h2>

      <p className={pClass}>
        You do not have to copy every file manually. The tool can read supported
        text-based files directly in your browser, including TXT, Markdown, CSV,
        JSON, HTML, CSS, JavaScript, TypeScript, XML, YAML, and YML files.
        After loading the files, choose the comparison mode that best matches
        their structure.
      </p>

      <p className={pClass}>
        For source code, configuration files, or large structured documents,
        Line mode is usually easier to review. For prose and ordinary writing,
        Word mode provides a clearer view of wording changes.
      </p>


      {/* ==================================================
          SIDE BY SIDE
      ================================================== */}

      <h2 className={h2Class}>
        Side-by-Side or Inline Text Comparison
      </h2>

      <p className={pClass}>
        Side-by-side comparison separates the original and revised versions,
        which is useful when you want to see where a change occurred in each
        document. Inline comparison combines the differences into a single
        result and highlights additions and removals within the text flow.
      </p>

      <p className={pClass}>
        Neither view changes the comparison itself. You can switch between them
        depending on which presentation makes the differences easier to review.
      </p>


      {/* ==================================================
          IGNORE OPTIONS
      ================================================== */}

      <h2 className={h2Class}>
        Ignore Capitalization or Whitespace When Needed
      </h2>

      <p className={pClass}>
        Some differences are only formatting changes. For example, an uppercase
        letter or additional space may not matter when you are reviewing the
        wording of a document. The ignore options let you reduce this noise when
        the selected comparison mode supports it.
      </p>

      <p className={pClass}>
        Leave these options disabled when capitalization, spacing, or exact text
        formatting is important to your comparison.
      </p>


      {/* ==================================================
          SIMILARITY
      ================================================== */}

      <h2 className={h2Class}>
        What Does the Text Similarity Percentage Mean?
      </h2>

      <p className={pClass}>
        The similarity percentage provides a quick indication of how much
        unchanged text the two versions share relative to the longer input. A
        higher percentage generally means that more of the text remained the
        same, while a lower percentage indicates more substantial changes.
      </p>

      <p className={pClass}>
        The score is designed only to summarize the comparison you requested.
        It is <strong>not a plagiarism score, AI-detection score, authorship
        test, or semantic-equivalence score</strong>. Two passages can express
        the same idea using different wording, so the highlighted differences
        should be used when you need to understand exactly what changed.
      </p>


      {/* ==================================================
          PLAGIARISM DISTINCTION
      ================================================== */}

      <h2 className={h2Class}>
        Text Compare vs. Plagiarism Checker
      </h2>

      <p className={pClass}>
        A text compare tool and a plagiarism checker solve different problems.
        Text Compare examines only the two pieces of text that you provide and
        shows how those versions differ. It does not search websites,
        publications, databases, or other external sources.
      </p>

      <p className={pClass}>
        Use Text Compare when you already have two versions and want to find
        additions, removals, or revisions. A plagiarism service is a different
        type of tool intended to search outside sources for possible matches.
      </p>


      {/* ==================================================
          PRIVACY
      ================================================== */}

      <h2 className={h2Class}>
        Browser-Based Text Comparison
      </h2>

      <p className={pClass}>
        CountFlows performs the comparison in your browser. Your pasted text
        does not need to be sent to a remote text-comparison API, and supported
        local files are read by the browser as text before comparison. This lets
        you compare drafts without creating an account or uploading them to a
        separate comparison service.
      </p>

      <p className={pClass}>
        You should still follow your organization&apos;s security and data
        handling requirements before placing confidential, proprietary, or
        regulated information into any web page.
      </p>


      {/* ==================================================
          AUDIENCES
      ================================================== */}

      <h2 className={h2Class}>
        Who Can Use an Online Text Difference Checker?
      </h2>

      <ul className={listClass}>
        <li>
          <strong>Writers:</strong> review changes between early and final
          drafts.
        </li>

        <li>
          <strong>Editors:</strong> identify what was changed after a revision
          request.
        </li>

        <li>
          <strong>Students:</strong> compare different versions of their own
          essays, notes, and assignments.
        </li>

        <li>
          <strong>Developers:</strong> inspect changes in short code,
          configuration, JSON, or other plain-text content.
        </li>

        <li>
          <strong>SEO and content teams:</strong> compare old and updated page
          copy before publishing.
        </li>
      </ul>


      {/* ==================================================
          INTERNAL LINKS
      ================================================== */}

      <h2 className={h2Class}>
        Related Text Tools
      </h2>

      <p className={pClass}>
        Text Compare is designed for finding revisions between two versions. If
        you need to analyze or clean the text itself, these related tools may be
        more appropriate.
      </p>

      <ul className={listClass}>

        <li>
          <Link
            href="/tools/word-counter"
            className={linkClass}
          >
            Word Counter
          </Link>
          {" "}— check words, characters, sentences, and paragraphs in a
          document.
        </li>

        <li>
          <Link
            href="/tools/ai-text-cleaner"
            className={linkClass}
          >
            AI Text Cleaner
          </Link>
          {" "}— remove unwanted Markdown, hidden characters, and AI text
          formatting before editing or comparison.
        </li>

        <li>
          <Link
            href="/tools/character-counter"
            className={linkClass}
          >
            Character Counter
          </Link>
          {" "}— measure characters, letters, spaces, and symbols.
        </li>

        <li>
          <Link
            href="/tools/remove-line-breaks"
            className={linkClass}
          >
            Remove Line Breaks
          </Link>
          {" "}— remove unwanted breaks from copied text before comparing
          paragraphs.
        </li>

        <li>
          <Link
            href="/tools/case-converter"
            className={linkClass}
          >
            Case Converter
          </Link>
          {" "}— convert text between uppercase, lowercase, title case, and
          other common capitalization formats.
        </li>

        <li>
          <Link
            href="/tools/keyword-density-checker"
            className={linkClass}
          >
            Keyword Density Checker
          </Link>
          {" "}— review word and phrase frequency when preparing content for
          publishing.
        </li>

      </ul>

    </section>
  )
}