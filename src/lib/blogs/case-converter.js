const caseConverter = `

<article>

  <p>
    Excel can change text to uppercase, lowercase, or proper case without
    retyping a column manually. For most worksheets, use
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


  <section>
    <h2 id="quick-answer">How to Convert Case in Excel: Quick Answer</h2>

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
      <a
        href="https://support.microsoft.com/en-us/excel/change-the-case-of-text"
        target="_blank"
        rel="noopener noreferrer"
      >
        Microsoft: Change the case of text in Excel
      </a>.
    </p>
  </section>


  <section>
    <h2 id="table-of-contents">Table of Contents</h2>

    <ol>
      <li><a href="#method-selector">Which method should you use?</a></li>
      <li><a href="#upper-lower-proper">Method 1: UPPER, LOWER, and PROPER</a></li>
      <li><a href="#paste-values">How to replace the original text safely</a></li>
      <li><a href="#flash-fill">Method 2: Flash Fill without formulas</a></li>
      <li><a href="#sentence-case">Method 3: Sentence-style capitalization</a></li>
      <li><a href="#power-query">Method 4: Power Query for repeat jobs</a></li>
      <li><a href="#online-converter">Method 5: Browser-based case conversion</a></li>
      <li><a href="#proper-limitations">Why PROPER sometimes gives strange results</a></li>
      <li><a href="#numbers-dates">What happens to numbers and dates?</a></li>
      <li><a href="#troubleshooting">Common Excel case-conversion problems</a></li>
      <li><a href="#quality-check">The CountFlows 4-point quality check</a></li>
    </ol>
  </section>


  <section>
    <h2 id="method-selector">Which Excel Case Conversion Method Should You Use?</h2>

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
  </section>


  <section>
    <h2 id="upper-lower-proper">Method 1: Use UPPER, LOWER, and PROPER</h2>

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
  </section>


  <section>
    <h2 id="paste-values">How to Replace the Original Text Without Breaking It</h2>

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
      It does not yet contain independent text.
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
      Microsoft recommends the same values-only step when replacing the
      original text after a case formula.
    </p>
  </section>


  <section>
    <h2 id="flash-fill">Method 2: Change Text Case with Flash Fill</h2>

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
      <a
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
  </section>


  <section>
    <h2 id="sentence-case">Method 3: Create Simple Sentence Case in Excel</h2>

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
  </section>


  <section>
    <h2 id="power-query">Method 4: Use Power Query for Repeatable Cleanup</h2>

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
      <a
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
  </section>


  <section>
    <h2 id="online-converter">Method 5: Use a Browser-Based Case Converter</h2>

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
      Even so, automatic case conversion should be treated as a mechanical
      transformation. Check proper nouns, brand names, acronyms, and specialist
      terms after conversion.
    </p>
  </section>


  <section>
    <h2 id="proper-limitations">Why Excel PROPER Can Produce Unexpected Capitalization</h2>

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
      That behavior can create unexpected results in special text.
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
          <td>Names with punctuation</td>
          <td>Characters after punctuation may be capitalized unexpectedly</td>
          <td>Review names manually</td>
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
      <a
        href="https://support.microsoft.com/en-us/excel/proper-function"
        target="_blank"
        rel="noopener noreferrer"
      >
        PROPER function reference
      </a>.
    </p>
  </section>


  <section>
    <h2 id="numbers-dates">Does Changing Case Affect Numbers or Dates?</h2>

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
  </section>


  <section>
    <h2 id="troubleshooting">Common Problems When Changing Case in Excel</h2>


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


    <h3>PROPER damages an acronym or brand name</h3>

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
  </section>


  <section>
    <h2 id="quality-check">The CountFlows 4-Point Case Conversion Check</h2>

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
  </section>


  <section>
    <h2 id="bottom-line">Bottom Line</h2>

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
  </section>

</article>

`;

export default caseConverter;