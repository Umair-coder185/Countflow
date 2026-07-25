const snake_case=`


<h1>What is CamelCase? PascalCase, Snake_Case and Kebab-Case Explained</h1>

<p>A pull request is blocked due to a linter's complaints about messy case.A total of three variables in one file have three distinct styles of writing. It is possible for a <a herf="/tools/case-converter">case converter </a> to resolve one file's case inconsistency problem instantly but will never inform you about why there is a case inconsistency or what exactly is camelCase, PascalCase, snake_case and kebab-case.</p>

<p>This article aims to help you understand each of these naming conventions and the usage of these conventions.</p>

<p><strong>Fast answer:</strong>camelCase combines words together without space with the first word being lowercase (taskTitle). PascalCase does the same except that the first letter is capitalized (TaskTitle).snake_case combines words in lowercase with an underscore in between (task_title).kebab-case is similar except it uses a hyphen instead of an underscore (task-title).</p>

<h2>What Is camelCase?</h2>

<p>camelCase takes two or more words and squishes them into one with no spaces at all.The first word stays lowercase.Every word after that starts with a capital letter.That's the whole rule.</p>

<figure><img src="/blogs/camel_case.png" alt="camel  case" ></figure>

<p>JavaScript, Java, and C# all use camelCase by default for variables and functions. If you've ever written something like userAge or calculateTotal, you were already using it. Since there are no extra characters between words, camelCase names stay shorter than the other styles, which helps in code that already has a lot going on.</p>

<h2>What Is PascalCase?</h2>

<p>PascalCase is almost the same as camelCase.The only difference is that the very first letter is capital too.So taskTitle becomes TaskTitle.It sounds like a small change,but it means a lot once you're reading through a big file.</p>
<figure><img src="/blogs/pascal_case.png" alt="pascal case"></figure>

<p>C#, Java, and TypeScript all use PascalCase for classes and types. So the moment you see TaskItem, you already know it's a class, before reading a single line inside it.</p>

<p>Frameworks like React and Vue take this a step further. Component files get named in PascalCase too, like TaskCard.jsx instead of taskCard.jsx. That way, components stand out from the regular functions sitting in the same folder.</p>


<h2>What Is snake_case?</h2>

<p>snake_case keeps every letter lowercase and adds an underscore wherever camelCase would add a capital letter. taskTitle becomes task_title.</p>

<figure><img src="/blogs/snake_case.png" alt="snake case"></figure>

<p>Python's official style guide, called PEP 8, tells developers to use snake_case for variables and functions. Almost every Python project follows this pattern because of it. Ruby follows the same rule.</p>

<p>Databases usually go with snake_case too no matter what language sits on top of them.Column names like task_id or created_at are everywhere.It's actually a common source of backend-to-frontend bugs: a Python or Ruby API sends back snake_case, but the JavaScript app on the other end expects camelCase.</p>

<h2>What Is kebab-case?</h2>

<p>kebab-case is a lot like snake_case but it swaps the underscore for a hyphen task_title becomes task-title.</p>

<p><div class="task-card">
  <span class="task-title"></span>
</div></P>

<p>You can't actually use kebab-case for variable names in most programming languages, because the language reads the hyphen as a minus sign. So instead, it shows up in URLs, file names, CSS class names, and command-line flags like --dry-run.</p>

<p>There's one place where kebab-case isn't optional, though. The rule for building custom HTML elements says every custom tag needs at least one hyphen in its name like &lt;task-card&gt;.No exceptions.Vue and Angular write component tags in kebab-case for exactly this reason even when the component's own file sits in PascalCase</p>


<figure><img src="/blogs/snake_case-vs-pascal_case.webp" alt="snake_case vs camel_case"></figure>
<h2>Other Naming Styles Worth Knowing</h2>

<p><strong>SCREAMING_SNAKE_CASE (also called CONSTANT_CASE):</strong> same as snake_case, but every letter is capital. Mostly used for constants, like MAX_LOGIN_ATTEMPTS.</p>

<p><strong>Train-Case:</strong> kebab-case, but every word is capitalized. Shows up sometimes in HTTP headers like Content-Type.</p>

<p><strong>dot.case:</strong> words separated by periods. Common in config files and some npm packages.</p>

<p>You don't really need to make a separate decision for any of these.They follow the same basic rule as the styles above just with a different letter case or a different symbol between words.</p>

<p>Everything above is about naming things in codeIf you want the rule for regular writing instead, like how to capitalize a headline or a sentence, check out <a href="/blog/what-is-sentence-case">What Is Sentence Case?</a></p>

<h2>Naming Styles by Programming Language</h2>

<table>
  <thead>
    <tr>
      <th>Language / Context</th>
      <th>Variables &amp; Functions</th>
      <th>Classes &amp; Types</th>
      <th>Constants</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>JavaScript</td>
      <td>camelCase</td>
      <td>PascalCase</td>
      <td>SCREAMING_SNAKE_CASE</td>
    </tr>
    <tr>
      <td>Python</td>
      <td>snake_case</td>
      <td>PascalCase</td>
      <td>SCREAMING_SNAKE_CASE</td>
    </tr>
    <tr>
      <td>Java</td>
      <td>camelCase</td>
      <td>PascalCase</td>
      <td>SCREAMING_SNAKE_CASE</td>
    </tr>
    <tr>
      <td>C#</td>
      <td>camelCase (local)</td>
      <td>PascalCase</td>
      <td>PascalCase</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>kebab-case</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>URLs &amp; file names</td>
      <td>kebab-case</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Ruby</td>
      <td>snake_case</td>
      <td>PascalCase</td>
      <td>SCREAMING_SNAKE_CASE</td>
    </tr>
  </tbody>
</table>

<p>None of this is forced on you by the language itself.Code that ignores every rule above still runs fine.What actually enforces it is the linter almost every setup uses plus the style guide that companies like Google and Airbnb publish and expect people to follow.</p>

<h2>Common Mistakes to Avoid</h2>

<ul>
  <li>Switching styles halfway through a file.One function called fetchTasks the next one called fetch_tasks. Pick one style per language and stick with it the whole way through.</li>
  <li>Writing a constant in PascalCase. MaxRetries should be MAX_RETRIES instead.</li>
  <li>Being inconsistent with acronyms.taskID, taskId and taskld all show up in real code.Most style guides, including Google's, say to treat an acronym like a normal word: taskId, not taskID.</li>
  <li>Starting a class name with a lowercase letter. A class called taskItem instead of TaskItem loses the whole point of using PascalCase in the first place.</li>
</ul>

<h2>How to Switch Between Naming Styles</h2>

<p>Renaming a bunch of variables from snake_case to camelCase by hand is slow and it's easy to make a typo along the way. This comes up more than you'd think: a Python API sending back snake_case while a JavaScript app wants camelCase is one of the most common headaches in full-stack work.</p>

<p>The <a href="/tools/case-converter"> Free Case Converter</a> tool linked above switches text between camelCase, PascalCase, snake_case and kebab-case with one click. It runs right in your browser too, so nothing you paste gets sent anywhere.</p>

<p>Working in a spreadsheet instead of code? Check out <a href="/blog/how-to-convert-case-in-excel">how to convert case in Excel</a>. And if you need a different tool altogether, the <a href="/tools">full tools page</a> has all eight, from word counters to keyword density checkers.</p>

<h2>Why This Actually Matters</h2>

<p>A consistent naming style basically turns a name into a clue.PascalCase means you're looking at a class,before you've even read a line inside it.SCREAMING_SNAKE_CASE means that value isn't supposed to change ever.</p>

<p>camelCase usually just means a variable or a function. You get all of that without reading any actual logic, just from how the name is written.</p>

<p>Break the pattern and your tools stop helping you too.Autocomplete, search, and refactoring tools all treat getUserName and get_user_name as two completely different strings even though they mean the exact same thing. On a team, that turns into slower code reviews, duplicate variables nobody notices and bugs that trace back to two names that should have matched but didn't.</p>

<p>There's actual research behind this too not just opinions.A 2010 eye-tracking study by Sharif and Maletic presented at a conference on program comprehension, found that programmers recognized underscore-style names faster than camelCase ones. On average, camelCase names took 932 milliseconds longer to recognize.</p>

<h2>FAQs</h2>

<h3>Is snake_case the same as underscore case?</h3>

<p>Yes, they're the same thing. Lowercase letters, with an underscore between each word.</p>

<h3>What naming style does Python use?</h3>

<p>Python's style guide, PEP 8, says to use snake_case for variables and functions, and PascalCase for classes.</p>

<h3>Can I mix styles in one project?</h3>

<p>The code will still run either way, since casing is a style choice, not something the language forces on you. But mixing styles fails most linter checks and makes the code harder to read, so it's worth staying consistent anyway.</p>

<h3>What's the actual difference between camelCase and PascalCase?</h3>

<p>Just the first letter. camelCase starts lowercase, like taskTitle. PascalCase starts with a capital, like TaskTitle. Every word after the first one is capitalized the same way in both.</p>

<h3>Is there a standard naming style for JSON?</h3>

<p>Not really. camelCase is more common in JavaScript APIs.snake_case shows up a lot in APIs built with Python or Ruby.</p>

<h2>Bottom Line</h2>

<p>The camelCase, PascalCase, snake_case, and kebab-case notations all address the same issue of writing a multiword name without space.The selection of a specific notation is more influenced by the programming language in which one works rather than personal preference since the majority of these decisions have been made years ago.It is better to stick to the style guide that is already used in the particular language and be consistent in applying it throughout the project and use converters rather than retype everything manually.For better experience, use our free <a href="/tools/case-converter">Case Converter</a>.</p>


`

export default snake_case;