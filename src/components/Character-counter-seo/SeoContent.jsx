// components/Character-counter-seo/SeoContent.jsx
// SERVER component - "use client" aur motion dono hata diye (static content ko inki zaroorat nahi).
// Poora copy "Character Counter - Fresh SEO Copy Pack (US/UK)" se hai - research-backed, sources pack ke section 6 mein.

import Link from "next/link"

const WORDS_TO_CHARS = [
  { words: "50", chars: "275–300", example: "One Bluesky post (300 limit)" },
  { words: "100", chars: "550–600", example: "Two short paragraphs" },
  { words: "250", chars: "1,375–1,500", example: "One Google Business post" },
  { words: "400", chars: "2,200–2,400", example: "An Instagram caption at its limit" },
  { words: "500", chars: "2,750–3,000", example: "One single-spaced page" },
  { words: "650", chars: "3,575–3,900", example: "A Common App essay, near the UCAS cap" },
  { words: "1,000", chars: "5,500–6,000", example: "A short blog post" },
]

const PLATFORM_LIMITS = [
  { field: "X (Twitter) post, free account", limit: "280" },
  { field: "X post, Premium", limit: "25,000 (timeline shows first 280, then “Show more”)" },
  { field: "X bio", limit: "160" },
  { field: "Instagram caption", limit: "2,200" },
  { field: "Instagram bio", limit: "150" },
  { field: "TikTok caption", limit: "4,000" },
  { field: "LinkedIn post", limit: "3,000" },
  { field: "Threads post", limit: "500" },
  { field: "Bluesky post", limit: "300" },
  { field: "YouTube Shorts caption", limit: "5,000" },
  { field: "SMS (standard characters)", limit: "160 per message" },
  { field: "Google meta description", limit: "~155–160 shown in results" },
  { field: "Title tag", limit: "~60 shown in results" },
  { field: "UCAS personal statement (UK)", limit: "4,000 including spaces" },
]

// NOTE: /tools/sentence-counter tab live hoga jab Sentence Counter pack deploy hoga - dono ek sath ship karo.
const MORE_TOOLS = [
  { href: "/tools/word-counter", name: "Word Counter", desc: "count words, characters, and reading time as you type." },
  { href: "/tools/sentence-counter", name: "Sentence Counter", desc: "check sentence count and average sentence length." },
  { href: "/tools/reading-time", name: "Reading Time Calculator", desc: "estimate reading and speaking time." },
  { href: "/tools/case-converter", name: "Case Converter", desc: "fix capitalization in one click." },
  { href: "/tools/keyword-density-checker", name: "Keyword Density Checker", desc: "keep keyword usage natural before you publish." },
]

const RELATED_GUIDES = [
  { href: "/blog/manage-essay-word-count", name: "Essay Word Count Guide: How Long Is an Essay?" },
  { href: "/blog/cover-letter-word-count", name: "Cover Letter Word Count: How Long Should It Be?" },
  { href: "/blog/how-long-should-a-blog-post-be", name: "How Long Should a Blog Post Be?" },
]

const h2Class = "text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white"
const pClass = "text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed"
const linkClass = "text-blue-500 hover:underline"

export default function SeoContent() {
  return (
    <article aria-label="Character Counter Tool Information">
      <section
        className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="what-is-character-counter"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          {/* FIX: yeh pehle <h1> tha - ab <h2>. Page ka wahid H1 hero mein hai. */}
          <div className="space-y-4">
            <h2 id="what-is-character-counter" className={h2Class}>
              What Is a Character Counter and How Do You Use It?
            </h2>
            <p className={pClass}>
              A character counter shows exactly how many characters your text contains, with spaces
              and without. Those two numbers decide whether your tweet posts, your caption fits,
              or your application form accepts your answer. Paste or type into the box above and the
              counts update in real time. There is no button, no sign-up, and no upload step:
              everything is counted in your browser as you edit.
            </p>
            <p className={pClass}>
              Alongside characters, the tool shows your word count and average word length, so one
              paste answers every length question at once. Working against a word limit instead?
              Check your total with the <Link href="/tools/word-counter" className={linkClass}>Word Counter</Link>,
              then come back to verify characters.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="do-spaces-count" className={h2Class}>Do Spaces Count as Characters?</h2>
            <p className={pClass}>
              Yes, in almost every real-world limit. Tweets, Instagram captions, SMS messages, meta
              descriptions, and application forms (including the UCAS personal statement) all count
              spaces, punctuation, and emoji as characters. Use the “without spaces” figure only when
              an instruction explicitly says characters excluding spaces. Some job portals and
              academic systems do.
            </p>
            <p className={pClass}>
              That is why this tool shows both numbers side by side instead of making you guess which
              one a form will use.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="characters-per-100-words" className={h2Class}>How Many Characters Is 100 Words?</h2>
            <p className={pClass}>
              About 550 to 600 characters including spaces. The average English word runs 4.7
              letters; add the space that follows each word and you get roughly 5.5 to 6 characters
              per word. The full conversion both ways:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-slate-700 text-left">
                    <th className="px-3 py-3 font-semibold">Words</th>
                    <th className="px-3 py-3 font-semibold">Characters (with spaces)</th>
                    <th className="px-3 py-3 font-semibold">Real-world equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {WORDS_TO_CHARS.map((row) => (
                    <tr key={row.words} className="border-b border-gray-200 dark:border-slate-800">
                      <td className="px-3 py-3 font-medium">{row.words}</td>
                      <td className="px-3 py-3">{row.chars}</td>
                      <td className="px-3 py-3 text-gray-600 dark:text-slate-400">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={pClass}>
              Your real ratio shifts with style: academic writing uses longer words, chat-style
              writing shorter ones. For an exact count, paste the text above. The estimate is for
              planning, the counter is for submitting.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="limits-cheat-sheet" className={h2Class}>Character Limits Cheat Sheet (2026)</h2>
            <p className={pClass}>Every limit below counts spaces, punctuation, and emoji:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-slate-700 text-left">
                    <th className="px-3 py-3 font-semibold">Platform / field</th>
                    <th className="px-3 py-3 font-semibold">Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {PLATFORM_LIMITS.map((row) => (
                    <tr key={row.field} className="border-b border-gray-200 dark:border-slate-800">
                      <td className="px-3 py-3 font-medium">{row.field}</td>
                      <td className="px-3 py-3">{row.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={pClass}>
              Two X rules that trip people up: every link counts as exactly 23 characters no matter
              how long the URL is, and most emoji count as 2 characters.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="sms-limit" className={h2Class}>Why Does One Emoji Cut My SMS Limit to 70?</h2>
            <p className={pClass}>
              A standard text message holds 160 characters using GSM-7 encoding: basic Latin
              letters, numbers, and common punctuation. Add even one character outside that set, such as an
              emoji, a curly quote (a “smart quote”) that a text editor inserts automatically, or a
              non-Latin letter, and the entire message switches to Unicode encoding, dropping the
              limit to 70 characters.
            </p>
            <p className={pClass}>
              Go over the limit and the message splits into segments of 153 characters (standard) or
              67 (Unicode), and each segment is billed separately. If a marketing SMS suddenly costs
              double, a single curly apostrophe is the usual suspect. Paste your message above to
              catch it before you send.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="application-limits" className={h2Class}>Character Counts for Applications (US &amp; UK)</h2>
            <p className={pClass}>Character limits matter most when an application form enforces them:</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              <li>
                <strong>UK (UCAS personal statement):</strong> 4,000 characters including spaces,
                roughly 600 words. From 2026 entry the statement is split into three structured
                questions with a minimum of 350 characters each, but the overall 4,000-character cap
                is unchanged. Character limits punish long sentences twice, because connectives eat
                characters fast.
              </li>
              <li>
                <strong>US (Common App):</strong> the personal statement caps at 650 words (roughly
                3,600 to 3,900 characters), while many supplemental short answers are character-capped,
                not word-capped. Read each prompt carefully; the two limits are not interchangeable.
              </li>
              <li>
                <strong>Job applications:</strong> many portals cap the cover letter field or answers
                by characters. Draft in a document, verify here, then paste into the form.
              </li>
            </ul>
            <p className={pClass}>
              For word-count targets by essay type, see the{" "}
              <Link href="/blog/manage-essay-word-count" className={linkClass}>Essay Word Count Guide</Link>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="word-google-docs" className={h2Class}>How to Check Character Count in Word and Google Docs</h2>
            <p className={pClass}>
              <strong>Microsoft Word:</strong> click the word count in the bottom-left status bar.
              The Word Count box shows characters with and without spaces. Or go to Review → Word
              Count, or press Ctrl + Shift + G on Windows. To count a specific section only,
              highlight it first.
            </p>
            <p className={pClass}>
              <strong>Google Docs:</strong> press Ctrl + Shift + C (Cmd + Shift + C on Mac) or go to
              Tools → Word count. Docs shows characters including spaces by default.
            </p>
            <p className={pClass}>
              Counts can differ by a character or two between programs, because each tool treats line breaks
              and special characters slightly differently, the same way word counts differ between
              Word and Google Docs.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="privacy" className={h2Class}>Your Text Never Leaves Your Browser</h2>
            <p className={pClass}>
              Like every CountFlows tool, the Character Counter runs entirely on your device. Your
              text is never uploaded, never stored, and never read by anyone. Paste a confidential
              cover letter or an unpublished draft. Close the tab, and it is gone. No sign-up, no
              character limit on the tool itself, no premium tier.
            </p>
          </div>

          <div className="space-y-4">
            <h2 id="more-tools" className={h2Class}>More Free CountFlows Tools</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              {MORE_TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className={linkClass}>{tool.name}</Link>: {tool.desc}
                </li>
              ))}
            </ul>
          </div>

          {/* FIX: Related Guides section - audit issue #5 (missing tha) */}
          <div className="space-y-4">
            <h2 id="related-guides" className={h2Class}>Related Guides</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              {RELATED_GUIDES.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href} className={linkClass}>{guide.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </article>
  )
}