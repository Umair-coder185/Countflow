const snake_case = `


<p>A pull request is blocked because a linter complains about inconsistent naming. Three variables in the same file may use three different styles. A <a href="/tools/case-converter">case converter</a> can fix the formatting quickly, but it won't explain why the styles differ or when to use camelCase, PascalCase, snake_case, or kebab-case.</p>

<p>This guide explains the main naming conventions, their differences, and where developers commonly use each one.</p>

<p><strong>Fast answer:</strong> camelCase starts with a lowercase word and capitalizes later words, like taskTitle. PascalCase capitalizes the first word too, like TaskTitle. snake_case separates lowercase words with underscores, like task_title. kebab-case uses hyphens, like task-title.</p>


<h2>camelCase vs PascalCase vs snake_case at a Glance</h2>

<table>
  <thead>
    <tr>
      <th>Style</th>
      <th>Example</th>
      <th>How Words Are Separated</th>
      <th>Common Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>camelCase</td>
      <td>userName</td>
      <td>Capital letters</td>
      <td>Variables and functions</td>
    </tr>
    <tr>
      <td>PascalCase</td>
      <td>UserName</td>
      <td>Capital letters, including the first word</td>
      <td>Classes, types, and components</td>
    </tr>
    <tr>
      <td>snake_case</td>
      <td>user_name</td>
      <td>Underscores</td>
      <td>Python, Ruby, and databases</td>
    </tr>
    <tr>
      <td>kebab-case</td>
      <td>user-name</td>
      <td>Hyphens</td>
      <td>URLs, CSS, and file names</td>
    </tr>
  </tbody>
</table>

<p>The main difference is simple. camelCase and PascalCase separate words with capitalization, snake_case uses underscores, and kebab-case uses hyphens.</p>


<h2>What Is camelCase?</h2>

<p>camelCase takes two or more words and joins them without spaces. The first word stays lowercase, while every word after it starts with a capital letter. That's the whole rule.</p>

<figure>
  <img src="/blogs/camel_case.png" alt="camelCase naming convention example">
</figure>

<p>JavaScript, Java, and C# commonly use camelCase for variables and functions. If you've written names like userAge or calculateTotal, you've already used it. Since there are no separators between words, camelCase also keeps names compact.</p>


<h2>What Is PascalCase?</h2>

<p>PascalCase is almost the same as camelCase. The main difference is that the first letter is capitalized too. So taskTitle becomes TaskTitle.</p>

<figure>
  <img src="/blogs/pascal_case.png" alt="PascalCase naming convention example">
</figure>

<p>C#, Java, and TypeScript commonly use PascalCase for classes and types. When you see a name like TaskItem, the capitalization can give you an immediate clue that you're looking at a class or type.</p>

<p>React components also commonly use PascalCase, such as TaskCard.jsx. Vue projects may use PascalCase or kebab-case depending on the project's naming rules.</p>


<h2>What Is snake_case?</h2>

<p>snake_case keeps words lowercase and separates them with underscores. For example, taskTitle becomes task_title.</p>

<figure>
  <img src="/blogs/snake_case.png" alt="snake_case naming convention example">
</figure>

<p>Python's official style guide, PEP 8, recommends snake_case for variables and functions. Ruby also commonly follows this pattern.</p>

<p>Databases often use snake_case as well. Column names like task_id and created_at are common. This can create naming differences when a Python or Ruby backend sends snake_case data to a JavaScript frontend that expects camelCase.</p>


<h2>PascalCase vs camelCase</h2>

<p>Both styles join words without spaces. camelCase starts with a lowercase letter, such as userProfile, while PascalCase starts with a capital letter, such as UserProfile. Variables and functions often use camelCase, while classes, types, and components commonly use PascalCase.</p>


<h2>camelCase vs snake_case</h2>

<p>camelCase marks new words with capital letters, while snake_case separates them with underscores. For example, firstName becomes first_name. The better choice usually depends on the conventions of the programming language or project you're working with.</p>


<h2>snake_case vs PascalCase</h2>

<p>snake_case uses lowercase words separated by underscores, such as user_profile. PascalCase removes separators and capitalizes each word, producing UserProfile. Python commonly uses snake_case for variables and PascalCase for classes.</p>


<h2>What Is kebab-case?</h2>

<p>kebab-case works a lot like snake_case, but it replaces underscores with hyphens. For example, task_title becomes task-title.</p>

<pre><code>&lt;div class="task-card"&gt;
  &lt;span class="task-title"&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>

<p>You can't normally use kebab-case for variable names in programming languages because the hyphen is often read as a minus sign. Instead, it commonly appears in URLs, file names, CSS class names, and command-line flags such as --dry-run.</p>

<p>Custom HTML elements also require a hyphen in their names, such as &lt;task-card&gt;. Frameworks may use kebab-case for component tags even when the related file uses PascalCase.</p>

<figure>
  <img src="/blogs/snake_case-vs-pascal_case.webp" alt="snake_case vs PascalCase naming conventions">
</figure>


<h2>Other Naming Styles Worth Knowing</h2>

<p><strong>SCREAMING_SNAKE_CASE, also called CONSTANT_CASE:</strong> follows snake_case but uses capital letters. It is commonly used for constants such as MAX_LOGIN_ATTEMPTS.</p>

<p><strong>Train-Case:</strong> works like kebab-case, but every word starts with a capital letter.</p>

<p><strong>dot.case:</strong> separates words with periods. You may see it in configuration files and package names.</p>

<p>You don't need to treat these as completely new ideas. They follow the same basic pattern as the main naming styles, using a different letter case or separator.</p>

<p>Everything above deals with naming things in code. If you want the rules for normal writing, such as headlines and sentences, read <a href="/blog/what-is-sentence-case">What Is Sentence Case?</a></p>


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
      <td>camelCase for locals</td>
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

<p>Languages don't always force these naming styles at runtime. Style guides, linters, frameworks, and team conventions usually decide which format you should follow. Staying consistent makes the code easier for other developers to understand.</p>


<h2>Common Mistakes to Avoid</h2>

<ul>
  <li>Switching styles halfway through a file. One function might be called fetchTasks while another is fetch_tasks. Follow the convention used by your language or project.</li>

  <li>Using the wrong style for constants. In many projects, MaxRetries would instead appear as MAX_RETRIES.</li>

  <li>Handling acronyms inconsistently. Names such as taskID and taskId may both appear in code, so follow the project's existing style guide.</li>

  <li>Starting a class name with a lowercase letter when the project uses PascalCase for classes.</li>
</ul>


<h2>How to Switch Between Naming Styles</h2>

<p>Renaming many variables from snake_case to camelCase by hand is slow, and a small typo can create another problem. This often comes up when a backend and frontend follow different naming conventions.</p>

<p>The <a href="/tools/case-converter">Free Case Converter</a> switches text between camelCase, PascalCase, snake_case, and kebab-case with one click. It runs in your browser, so the text you paste doesn't need to be sent to a server for conversion.</p>

<p>Working in a spreadsheet instead of code? Read <a href="/blog/how-to-convert-case-in-excel">how to convert case in Excel</a>. You can also browse the <a href="/tools">full tools page</a> for more free text and SEO tools.</p>


<h2>Why This Actually Matters</h2>

<p>A consistent naming style turns a name into a clue. PascalCase may tell you that you're looking at a class or type before you've opened its definition. SCREAMING_SNAKE_CASE often signals a constant.</p>

<p>camelCase commonly identifies variables or functions in languages such as JavaScript. These patterns make large codebases easier to scan because developers can recognize the role of an identifier faster.</p>

<p>Breaking the pattern also makes searching and refactoring harder. getUserName and get_user_name are different strings even when they describe the same thing. On a large project, inconsistent naming can make code reviews slower and create unnecessary confusion.</p>

<p>Research has also looked at how programmers read different identifier styles. A 2010 eye-tracking study by Bonita Sharif and Jonathan Maletic compared camelCase and underscore-based identifiers and found differences in how quickly participants recognized them.</p>


<h2>FAQs</h2>

<h3>Is snake_case the same as underscore case?</h3>

<p>Yes. Both names usually describe lowercase words separated by underscores, such as user_name.</p>


<h3>What does snake_case mean?</h3>

<p>snake_case is a naming style that separates lowercase words with underscores. For example, user account becomes user_account.</p>


<h3>What naming style does Python use?</h3>

<p>Python's PEP 8 style guide recommends snake_case for variables and functions, while class names normally use PascalCase.</p>


<h3>Can I mix styles in one project?</h3>

<p>The code may still run, but inconsistent naming makes a project harder to read and can fail linting or style checks. Following one convention also makes collaboration easier.</p>


<h3>What's the difference between camelCase and PascalCase?</h3>

<p>The main difference is the first letter. camelCase starts lowercase, like taskTitle, while PascalCase starts with a capital letter, like TaskTitle.</p>


<h3>Is PascalCase the same as Pascal notation?</h3>

<p>Yes. PascalCase, Pascal casing, and Pascal notation usually describe the same style where each word begins with a capital letter and no separator appears between words.</p>


<h3>Is there a standard naming style for JSON?</h3>

<p>JSON doesn't require one naming style. camelCase is common in JavaScript APIs, while snake_case often appears in APIs built with Python or Ruby.</p>


<h2>Bottom Line</h2>

<p>camelCase, PascalCase, snake_case, and kebab-case solve the same basic problem: writing multiword names without spaces. The main difference is whether they use capitalization, underscores, or hyphens to separate the words.</p>

<p>The right choice usually depends on the programming language, framework, or project's existing style guide. Consistency matters more than choosing one naming convention for every situation.</p>

<p>If you need to switch between these formats, use the free <a href="/tools/case-converter">Case Converter</a> instead of rewriting each name manually.</p>

`

export default snake_case;