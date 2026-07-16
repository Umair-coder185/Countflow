import Link from "next/link"

const h2Class = "text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4"
const h3Class = "text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2"
const pClass = "text-gray-600 dark:text-gray-300 leading-7 mb-4"
const linkClass = "text-cyan-600 dark:text-cyan-400 font-medium hover:underline"

export default function SeoContent() {
    return (
        <section className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            <h2 className={h2Class}>How to Convert Text Case Online</h2>
            <p className={pClass}>You can convert text case in three simple steps:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>Paste your text</strong> into the box above, or type directly into it.
                </li>
                <li>
                    <strong>Click one of the seven case styles</strong> — Sentence case, lower case,
                    UPPER CASE, Title Case, Capitalized Case, aLtErNaTiNg cAsE, or InVeRsE cAsE.
                </li>
                <li>
                    <strong>Copy the result</strong> with one click and paste it wherever you need it.
                </li>
            </ol>
            <p className={pClass}>
                There is no upload step and no processing delay. The conversion happens instantly
                in your browser, whether you paste a single headline or an entire chapter.
            </p>

            <h2 className={h2Class}>Every Case Style, Explained</h2>
            <p className={pClass}>
                Not sure which case you need? Here is what each button does, with an example.
            </p>

            <h3 className={h3Class}>UPPER CASE</h3>
            <p className={pClass}>
                Converts every letter to capitals — LIKE THIS. Use it to convert text to upper
                case for acronyms, legal disclaimers, form fields that demand capitals, or
                headings that need maximum emphasis. It is also the fastest way to fix text that
                was typed entirely in lowercase.
            </p>

            <h3 className={h3Class}>lower case</h3>
            <p className={pClass}>
                Converts every letter to small letters — like this. This is the classic fix when
                you need to convert upper case to lower case after a caps lock accident. Paste
                the shouting text, click once, and it reads normally again.
            </p>

            <h3 className={h3Class}>Title Case</h3>
            <p className={pClass}>
                Capitalizes the major words in your text — Like This Example Here. Title case is
                the standard style for book titles, blog headlines, and email subject lines. If
                you write headlines regularly, this button saves you from second-guessing every
                word.
            </p>

            <h3 className={h3Class}>Sentence case</h3>
            <p className={pClass}>
                Capitalizes only the first letter of each sentence — Like this. And this. It is
                the default style for body text, and the quickest way to turn an all-caps
                paragraph back into normal writing.
            </p>

            <h3 className={h3Class}>Capitalized Case</h3>
            <p className={pClass}>
                Capitalizes the first letter of every word — Like This Example Here, Even Small
                Words. Also called capital case or proper case. Unlike Title Case, it does not
                skip minor words such as "and" or "the," which makes it useful for names,
                headings, and lists.
            </p>

            <h3 className={h3Class}>aLtErNaTiNg cAsE</h3>
            <p className={pClass}>
                Alternates lower and upper case letters — lIkE tHiS. Mostly used for memes and
                sarcastic quoting on social media.
            </p>

            <h3 className={h3Class}>InVeRsE cAsE</h3>
            <p className={pClass}>
                Flips the existing case of every letter, so uppercase becomes lowercase and
                lowercase becomes uppercase. Handy when you typed a passage with caps lock on
                while holding Shift for capitals, which leaves the case exactly backwards.
            </p>

            <h2 className={h2Class}>Title Case vs. Sentence Case: Which One Should You Use?</h2>
            <p className={pClass}>
                This is the most common capitalization question, and the answer depends on where
                the text will appear. Title case is the traditional choice for book titles,
                newspaper headlines, and academic paper titles. Sentence case dominates on the
                modern web: most tech companies, news sites, and apps now write headings the same
                way they write sentences, because it reads faster and feels less formal.
            </p>
            <p className={pClass}>
                A practical rule: match the style that already surrounds your text. Writing a
                blog headline for a site that capitalizes every heading? Use Title Case. Writing
                a LinkedIn post, an email subject line, or a UI label? Sentence case almost
                always looks right. Whichever you pick, keep it consistent across the whole
                document — mixing both styles on one page is the mistake readers actually notice.
            </p>

            <h2 className={h2Class}>Case Converter Shortcuts in Word, Google Docs, and Excel</h2>
            <p className={pClass}>
                If your text lives inside another app, you may not need any tool at all. In
                Microsoft Word, PowerPoint, and Outlook, select the text and press Shift + F3 to
                cycle between lowercase, UPPERCASE, and Capitalize Each Word. In Google Docs, use
                Format → Text → Capitalization to apply lowercase, UPPERCASE, or Title Case. In
                Excel and Google Sheets, the =UPPER(), =LOWER(), and =PROPER() formulas change
                case cell by cell.
            </p>
            <p className={pClass}>
                The catch: each shortcut only works inside its own app, none of them offers
                Sentence case in Word, and Shift + F3 does nothing in a browser, a CMS, or a
                social media compose box. An online case converter works anywhere you can paste
                text, which is why many people keep this page bookmarked next to their editor.
            </p>

            <h2 className={h2Class}>Who Uses a Case Converter</h2>
            <p className={pClass}>
                <strong>Writers and editors</strong> — fix capitalization in drafts, standardize
                headlines to title case, and clean up text pasted from PDFs or emails without
                retyping.
            </p>
            <p className={pClass}>
                <strong>Students</strong> — format essay titles and headings correctly, and
                repair notes typed in a hurry with caps lock on.
            </p>
            <p className={pClass}>
                <strong>Social media managers</strong> — match each platform's style: sentence
                case for LinkedIn posts, title case for YouTube titles, and lowercase for a
                casual brand voice. Pair it with the{" "}
                <Link href="/tools/character-counter" className={linkClass}>
                    Character Counter
                </Link>{" "}
                to stay inside each platform's limit.
            </p>
            <p className={pClass}>
                <strong>SEO and marketing teams</strong> — keep title tags, meta descriptions,
                and ad headlines consistent across an entire site. Run your copy through the{" "}
                <Link href="/tools/keyword-density-checker" className={linkClass}>
                    Keyword Density Checker
                </Link>{" "}
                afterwards to keep the wording natural.
            </p>
            <p className={pClass}>
                <strong>Developers</strong> — while variable names use programming conventions
                like camelCase and snake_case, developers still convert plenty of plain text:
                error messages, UI labels, changelog entries, and documentation headings all
                need consistent capitalization before they ship.
            </p>
            <p className={pClass}>
                <strong>Anyone escaping Excel formulas</strong> — spreadsheet users often reach
                for =UPPER(), =LOWER(), and =PROPER() just to change text case. If the text does
                not need to stay in a spreadsheet, pasting it here is faster than writing a
                formula.
            </p>


            <h2 className={h2Class}>Why a Case Converter Still Matters in the Age of AI</h2>
            <p className={pClass}>
                You could paste your text into an AI chatbot and ask it to "make this title
                case." It usually works. But for a mechanical job like changing letter case, a
                dedicated tool beats a chatbot on every point that matters:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>Privacy</strong> — anything you paste into an AI assistant is sent to
                    a server, and depending on the service, it may be logged or used for training.
                    This tool never uploads your text at all, so a confidential contract stays
                    confidential.
                </li>
                <li>
                    <strong>Accuracy</strong> — AI models sometimes "helpfully" rewrite your
                    wording, fix your grammar, or swap a word while changing the case. A case
                    converter changes capitalization and nothing else. Every other character stays
                    exactly as you wrote it.
                </li>
                <li>
                    <strong>Speed</strong> — no prompt to write, no waiting for a response, no
                    usage limits. Click once and the result is ready to copy.
                </li>
            </ul>
            <p className={pClass}>
                AI has also created a new job for this tool: cleaning up AI output. Drafts from
                ChatGPT and similar assistants are notorious for inconsistent capitalization —
                Title Case Headings in one paragraph, sentence case in the next. Before you
                publish an AI-assisted draft, running headings through one consistent case style
                is one of the quickest ways to make the text look deliberately edited rather
                than machine-generated.
            </p>

            <h2 className={h2Class}>Your Text Never Leaves Your Browser</h2>
            <p className={pClass}>
                Like every CountFlows tool, the Case Converter runs entirely on your device.
                Your text is never uploaded to a server, never logged, and never stored. Paste a
                confidential contract or an unpublished manuscript — close the tab, and it is
                gone. There is no word limit, no sign-up wall, and no premium tier.
            </p>

            <h2 className={h2Class}>More Free Countflows Tools</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-7">
                <li>
                    <Link href="/tools/word-counter" className={linkClass}>
                        Word Counter
                    </Link>{" "}
                    — count words, characters, and sentences as you type.
                </li>
                <li>
                    <Link href="/tools/character-counter" className={linkClass}>
                        Character Counter
                    </Link>{" "}
                    — check your text against platform character limits.
                </li>
                <li>
                    <Link href="/tools/sentence-counter" className={linkClass}>
                        Sentence Counter
                    </Link>{" "}
                    — check sentence count and average sentence length.
                </li>
                <li>
                    <Link href="/tools/keyword-density-checker" className={linkClass}>
                        Keyword Density Checker
                    </Link>{" "}
                    — keep keyword usage natural before you publish.
                </li>
                <li>
                    <Link href="/tools/reading-time" className={linkClass}>
                        Reading Time Calculator
                    </Link>{" "}
                </li>
                <li>
                    <Link href="/tools/ai-text-cleaner" className={linkClass}>
                        AI Text Cleaner
                    </Link>{" "}
                    — remove AI artifacts, formatting, and spaces from your text.
                </li>
                <li>
                    <Link href="/tools/syllable-counter" className={linkClass}>
                        Syllable Counter
                    </Link>{" "}
                    — count syllables in words, sentences, and poems.
                </li>
            </ul>
        </section>
    )
}