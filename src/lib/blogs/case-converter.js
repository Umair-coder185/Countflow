const caseConverter = `

<article>

  <p>
    Excel can change text to uppercase, lowercase, or proper case without
    manually retyping every cell. For most worksheets, use
    <strong>UPPER</strong>, <strong>LOWER</strong>, or
    <strong>PROPER</strong>. Flash Fill is useful when you want a no-formula
    option, while Power Query is better for transformations you need to repeat.
  </p>

  <p>
    Sentence-style capitalization needs more care because Excel does not have a
    built-in SENTENCE function. A formula can handle a simple one-sentence
    cell, but proper nouns, acronyms, multiple sentences, and unusual brand
    names still need review.
  </p>


    <h2>How to Convert Case in Excel: Quick Answer</h2>

    <table>
      <thead>
        <tr>
          <th>Goal</th>
          <th>Method</th>
          <th>Example</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Convert text to UPPERCASE</td>
          <td><code>=UPPER(A2)</code></td>
          <td>JOHN SMITH</td>
        </tr>

        <tr>
          <td>Convert text to lowercase</td>
          <td><code>=LOWER(A2)</code></td>
          <td>john smith</td>
        </tr>

        <tr>
          <td>Capitalize each word</td>
          <td><code>=PROPER(A2)</code></td>
          <td>John Smith</td>
        </tr>

        <tr>
          <td>Simple sentence-style text</td>
          <td>
            <code>=IF(A2="","",UPPER(LEFT(A2,1))&amp;LOWER(MID(A2,2,LEN(A2))))</code>
          </td>
          <td>John smith went home.</td>
        </tr>

        <tr>
          <td>No formula</td>
          <td>Flash Fill</td>
          <td>Type one example, then use Ctrl+E</td>
        </tr>

        <tr>
          <td>Repeat the cleanup regularly</td>
          <td>Power Query</td>
          <td>Save the transformation and refresh it later</td>
        </tr>
      </tbody>
    </table>

    <p>
      Microsoft documents UPPER, LOWER, and PROPER as Excel's standard
      worksheet functions for changing capitalization.
      
        href="https://support.microsoft.com/en-us/excel/change-the-case-of-text"
        target="_blank"
        rel="noopener noreferrer"
      >
        Microsoft: Change the case of text in Excel
      </a>.
    </p>
    <h2>Which Excel Case Conversion Method Should You Use?</h2>

    <p>
      Do not choose a method only because it looks shortest. Choose it based on
      what you need to do with the data afterward.
    </p>

    <table>
      <thead>
        <tr>
          <th>Situation</th>
          <th>Recommended Method</th>
          <th>Why</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>A normal column that needs uppercase or lowercase</td>
          <td>UPPER or LOWER</td>
          <td>Simple, predictable, and easy to fill down</td>
        </tr>

        <tr>
          <td>Names or ordinary words need initial capitals</td>
          <td>PROPER, followed by review</td>
          <td>Fast, but special spellings can need correction</td>
        </tr>

        <tr>
          <td>You do not want formulas</td>
          <td>Flash Fill</td>
          <td>Excel learns the pattern from an example</td>
        </tr>

        <tr>
          <td>You receive the same report every week</td>
          <td>Power Query</td>
          <td>The transformation can become part of a refreshable workflow</td>
        </tr>

        <tr>
          <td>You need several capitalization styles outside Excel</td>
          <td>Case Converter</td>
          <td>Useful for quick copy-and-paste transformations</td>
        </tr>

        <tr>
          <td>Text contains proper nouns, acronyms, and multiple sentences</td>
          <td>Convert, then manually review</td>
          <td>Capitalization can depend on meaning, not just characters</td>
        </tr>
      </tbody>
    </table>
    <h2>Method 1: Use UPPER, LOWER, and PROPER</h2>

    <figure>
      <img
        src="/blogs/excel-functions.webp"
        alt="UPPER LOWER and PROPER functions for changing text case in Excel"
      />
    </figure>

    <p>
      Excel has three main built-in functions for basic capitalization changes.
      Add a temporary column next to the original data and apply the function
      there.
    </p>


    <h3>Convert lowercase text to uppercase</h3>

    <p>
      If your original value is in cell A2, enter:
    </p>

    <p><code>=UPPER(A2)</code></p>

    <p>
      Example:
    </p>

    <p>
      <strong>Input:</strong> project alpha<br />
      <strong>Result:</strong> PROJECT ALPHA
    </p>

    <p>
      Then drag or double-click the fill handle to apply the formula to the
      remaining rows.
    </p>


    <h3>Convert uppercase text to lowercase</h3>

    <p>
      Use:
    </p>

    <p><code>=LOWER(A2)</code></p>

    <p>
      Example:
    </p>

    <p>
      <strong>Input:</strong> CUSTOMER SUPPORT<br />
      <strong>Result:</strong> customer support
    </p>


    <h3>Capitalize the beginning of each word</h3>

    <p>
      Use:
    </p>

    <p><code>=PROPER(A2)</code></p>

    <p>
      Example:
    </p>

    <p>
      <strong>Input:</strong> john smith<br />
      <strong>Result:</strong> John Smith
    </p>

    <p>
      PROPER is convenient, but do not assume the result is automatically
      correct for every person's name, company, abbreviation, or technical
      term.
    </p>
    <h2>How to Replace the Original Text Without Breaking It</h2>

    <p>
      A common Excel mistake happens after the formula works perfectly.
      Users delete the original column and discover that the converted cells
      depended on it.
    </p>

    <p>
      The new column contains formulas such as:
    </p>

    <p><code>=UPPER(A2)</code></p>

    <p>
      It does not yet contain independent text — it still depends on cell A2.
    </p>

    <p>
      To make the converted results permanent:
    </p>

    <ol>
      <li>Select the converted cells.</li>
      <li>Press <strong>Ctrl+C</strong>.</li>
      <li>Choose <strong>Paste Special</strong> or the Paste menu.</li>
      <li>Select <strong>Values</strong>.</li>
      <li>Verify the pasted text.</li>
      <li>Delete the old helper column only after checking the result.</li>
    </ol>

    <p>
      This is the standard way to convert a formula's output into plain,
      independent text in Excel, so the result survives even after the source
      column is removed.
    </p>
    <h2>Method 2: Change Text Case with Flash Fill</h2>

    <p>
      Flash Fill is useful when your desired result follows a recognizable
      pattern and you do not want a worksheet formula.
    </p>

    <p>
      Suppose A2 contains:
    </p>

    <p><strong>MUHAMMAD ALI</strong></p>

    <p>
      In B2, manually type:
    </p>

    <p><strong>Muhammad Ali</strong></p>

    <p>
      Then:
    </p>

    <ol>
      <li>Press Enter after typing the example.</li>
      <li>Select the next cell in the output column if needed.</li>
      <li>Go to <strong>Data &gt; Flash Fill</strong>, or press <strong>Ctrl+E</strong> on Windows.</li>
      <li>Review several results before accepting the whole column as correct.</li>
    </ol>

    <p>
      Microsoft describes Flash Fill as a feature that detects a pattern from
      the example you provide and fills the remaining data accordingly.
      
        href="https://support.microsoft.com/en-us/excel/using-flash-fill-in-excel"
        target="_blank"
        rel="noopener noreferrer"
      >
        Microsoft Flash Fill documentation
      </a>.
    </p>

    <h3>When Flash Fill is especially useful</h3>

    <ul>
      <li>reformatting names</li>
      <li>combining or separating text while changing capitalization</li>
      <li>cleaning one-time imports</li>
      <li>applying a pattern that is awkward to express with one formula</li>
    </ul>

    <p>
      Flash Fill is pattern-based, so always inspect the output when the source
      data contains inconsistent formats.
    </p>
    <h2>Method 3: Create Simple Sentence Case in Excel</h2>

    <p>
      Excel does not provide a built-in SENTENCE function equivalent to its
      UPPER, LOWER, and PROPER functions.
    </p>

    <p>
      For a simple single-sentence cell, you can use:
    </p>

    <p>
      <code>=IF(A2="","",UPPER(LEFT(A2,1))&amp;LOWER(MID(A2,2,LEN(A2))))</code>
    </p>

    <p>
      If A2 contains:
    </p>

    <p><strong>WELCOME TO THE NEW OFFICE</strong></p>

    <p>
      the result becomes:
    </p>

    <p><strong>Welcome to the new office</strong></p>


    <h3>Important limitation</h3>

    <p>
      This formula changes characters mechanically. It does not understand
      language.
    </p>

    <p>
      For example:
    </p>

    <p>
      <strong>Input:</strong> WELCOME TO GOOGLE IN NEW YORK
    </p>

    <p>
      could become:
    </p>

    <p>
      <strong>Welcome to google in new york</strong>
    </p>

    <p>
      That is not fully correct because Google and New York are proper names.
    </p>

    <p>
      The formula also does not automatically capitalize the beginning of every
      new sentence inside a multi-sentence cell.
    </p>

    <p>
      Use it when the data is simple and predictable. For prose containing
      names, brands, acronyms, or several sentences, review the result manually.
    </p>

    <p>
      See our
      <a href="/blog/what-is-sentence-case">sentence case guide</a>
      for capitalization rules and examples.
    </p>
    <h2>Method 4: Use Power Query for Repeatable Cleanup</h2>

    <p>
      Formulas are convenient for one worksheet. Power Query becomes more
      useful when the same data-cleaning process happens repeatedly.
    </p>

    <p>
      A typical workflow is:
    </p>

    <ol>
      <li>Select the source data.</li>
      <li>Choose <strong>Data &gt; From Table/Range</strong>.</li>
      <li>Select the text column in Power Query.</li>
      <li>Apply the required capitalization transformation.</li>
      <li>Choose <strong>Close &amp; Load</strong>.</li>
    </ol>

    <p>
      Power Query's underlying text functions include:
    </p>

    <ul>
      <li><code>Text.Upper</code></li>
      <li><code>Text.Lower</code></li>
      <li><code>Text.Proper</code></li>
    </ul>

    <p>
      Microsoft documents these transformations in its Power Query M text
      function reference.
      
        href="https://learn.microsoft.com/en-us/powerquery-m/text-functions"
        target="_blank"
        rel="noopener noreferrer"
      >
        Microsoft Power Query text functions
      </a>.
    </p>

    <p>
      The main advantage is repeatability. Once the transformation is part of
      the query, new source data can go through the same cleanup process when
      the query is refreshed.
    </p>
    <h2>Method 5: Use a Browser-Based Case Converter</h2>

    <p>
      A spreadsheet is not always the fastest workspace when you simply have a
      block of text that needs a different capitalization style.
    </p>

    <p>
      You can copy the text, paste it into the
      <a href="/tools/case-converter">CountFlows Case Converter</a>,
      choose the required style, and paste the result back into Excel.
    </p>

    <p>
      Available transformations include common options such as:
    </p>

    <ul>
      <li>UPPERCASE</li>
      <li>lowercase</li>
      <li>Title Case</li>
      <li>Sentence case</li>
      <li>other stylistic case transformations supported by the tool</li>
    </ul>

    <p>
      CountFlows performs its text-tool processing in the browser rather than
      requiring the text to be sent to a text-processing API.
    </p>

    <p>
      If the text you're pasting into Excel was copied from ChatGPT or another
      AI tool, it can carry Markdown symbols, invisible characters, or other
      formatting artifacts that interfere with PROPER, Flash Fill, or a
      sentence-case formula. Clean it first with the
      <a href="/tools/ai-text-cleaner">AI Text Cleaner</a>, or see the
      <a href="/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text">
        guide to removing ChatGPT formatting
      </a>
      for more methods.
    </p>

    <p>
      Even after cleanup, treat automatic case conversion as a mechanical
      transformation. Check proper nouns, brand names, acronyms, and specialist
      terms after conversion.
    </p>
    <h2>Why Excel PROPER Can Produce Unexpected Capitalization</h2>

    <p>
      This is one of the most useful limitations to know before cleaning a
      large name list.
    </p>

    <p>
      Microsoft explains that PROPER capitalizes the first letter in a string
      and letters that follow characters other than letters. It converts other
      letters to lowercase.
    </p>

    <p>
      That behavior can create unexpected results in special text. Microsoft's
      own documentation shows this with <code>2-cent's worth</code>, which
      PROPER converts to <code>2-Cent'S Worth</code> — the letter right after
      the apostrophe gets capitalized too, since PROPER treats the apostrophe
      as a non-letter break point.
    </p>

    <table>
      <thead>
        <tr>
          <th>Source Type</th>
          <th>Possible Problem</th>
          <th>What to Do</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Acronym</td>
          <td>NASA can become Nasa</td>
          <td>Restore the established acronym</td>
        </tr>

        <tr>
          <td>Brand styling</td>
          <td>iPhone or eBay may lose official capitalization</td>
          <td>Restore the brand's preferred form</td>
        </tr>

        <tr>
          <td>Names or words with an apostrophe</td>
          <td>O'brien or Cent's Worth may capitalize the letter after the apostrophe</td>
          <td>Review names and possessives manually</td>
        </tr>

        <tr>
          <td>Technical identifiers</td>
          <td>Case-sensitive terms may be altered</td>
          <td>Do not apply PROPER blindly</td>
        </tr>
      </tbody>
    </table>

    <p>
      Microsoft documents this exact behavior in its
      
        href="https://support.microsoft.com/en-us/excel/proper-function"
        target="_blank"
        rel="noopener noreferrer"
      >
        PROPER function reference
      </a>.
    </p>
    <h2>Does Changing Case Affect Numbers or Dates?</h2>

    <p>
      UPPER, LOWER, and PROPER are text functions. Non-letter characters inside
      a text string are not converted into uppercase or lowercase.
    </p>

    <p>
      For example:
    </p>

    <p>
      <strong>Input:</strong> invoice 2026-104<br />
      <strong>UPPER result:</strong> INVOICE 2026-104
    </p>

    <p>
      The digits and hyphen remain while the letters change.
    </p>

    <p>
      However, do not apply text-case formulas blindly to columns that contain
      real Excel dates, numeric values, IDs, or other data types. Excel stores
      dates internally as numbers, and converting data through text functions
      can change how the result behaves or displays.
    </p>

    <p>
      Apply case conversion only to columns intended to contain text.
    </p>
    <h2>Common Problems When Changing Case in Excel</h2>


    <h3>The formula appears instead of the result</h3>

    <p>
      The cell may be formatted as Text, or formula display may be enabled.
      Change the cell format to General if appropriate, then re-enter the
      formula.
    </p>


    <h3>You get a #NAME? error</h3>

    <p>
      Check the function spelling. For example:
    </p>

    <p>
      <strong>Wrong:</strong> <code>=UPER(A2)</code><br />
      <strong>Correct:</strong> <code>=UPPER(A2)</code>
    </p>


    <h3>The result disappears after deleting the source column</h3>

    <p>
      The converted cells still contain formulas linked to that source.
      Copy the results and paste them as values before removing the original
      data.
    </p>


    <h3>PROPER damages an acronym, brand name, or possessive</h3>

    <p>
      This is a limitation of mechanical capitalization. Correct exceptional
      names manually or use Find and Replace when the same term appears many
      times.
    </p>


    <h3>Flash Fill guesses the wrong pattern</h3>

    <p>
      Give Excel another example that better represents the desired result, or
      use a formula if the transformation follows a simple rule.
    </p>


    <h3>Sentence case lowercases proper names</h3>

    <p>
      A basic formula does not know that words such as Google, Pakistan, NASA,
      or iPhone have special capitalization. Restore those terms after the
      conversion or use a workflow designed for context-sensitive text.
    </p>
    <h2>The CountFlows 4-Point Case Conversion Check</h2>

    <p>
      Before replacing hundreds of original cells, inspect the converted output
      using four checks:
    </p>

    <ol>
      <li>
        <strong>Pattern:</strong>
        Did the method apply the capitalization style you intended?
      </li>

      <li>
        <strong>Exceptions:</strong>
        Are names, brands, acronyms, and technical terms still correct?
      </li>

      <li>
        <strong>Data type:</strong>
        Did you limit the transformation to actual text rather than dates or
        numeric fields?
      </li>

      <li>
        <strong>Replacement:</strong>
        If formulas were used, did you paste the final results as values before
        deleting the source column?
      </li>
    </ol>

    <p>
      Checking a few rows at the top, middle, and bottom of a long dataset can
      catch pattern problems before they affect the entire worksheet.
    </p>
    <h2>Frequently Asked Questions</h2>

    <h3>How do I capitalize all text in Excel?</h3>
    <p>
      Use <code>=UPPER(A2)</code> to convert a cell's text to all capital
      letters, then fill the formula down the column. Paste the results as
      values if you need to remove the original column afterward.
    </p>

    <h3>How do I use a case formula in Excel?</h3>
    <p>
      Enter the formula in a new cell referencing the text you want to
      convert — <code>=UPPER(A2)</code>, <code>=LOWER(A2)</code>, or
      <code>=PROPER(A2)</code> — then press Enter and drag the fill handle
      down to apply it to the rest of the column.
    </p>

    <h3>Can you convert uppercase to lowercase in Excel?</h3>
    <p>
      Yes. Use <code>=LOWER(A2)</code>, where A2 is the cell containing the
      uppercase text. The result appears in the new cell without changing the
      original.
    </p>

    <h3>How do I change case in Excel without a formula?</h3>
    <p>
      Use Flash Fill. Type the result you want for the first cell manually,
      then select <strong>Data &gt; Flash Fill</strong> or press
      <strong>Ctrl+E</strong>. Excel detects the pattern and fills the rest of
      the column automatically.
    </p>
    <h2>Bottom Line</h2>

    <p>
      For basic Excel text cleanup, start with UPPER, LOWER, or PROPER. Use
      Flash Fill when a pattern is easier to demonstrate than to write as a
      formula, and use Power Query when the same transformation needs to run
      repeatedly.
    </p>

    <p>
      Sentence-style capitalization is more complicated because Excel has no
      dedicated sentence-case function and formulas cannot understand proper
      nouns or context automatically.
    </p>

    <p>
      For quick copy-and-paste transformations, the
      <a href="/tools/case-converter">CountFlows Case Converter</a>
      provides another option. Whichever method you choose, review exceptional
      names and paste formula results as values before removing the original
      data.
    </p>
</article>

`;

export default caseConverter;