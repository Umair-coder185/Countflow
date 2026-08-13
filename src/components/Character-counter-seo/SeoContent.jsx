// components/Character-counter-seo/SeoContent.jsx
// SERVER COMPONENT
// No "use client" required.

import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"

/* -------------------------------------------------------------------------- */
/*                            WORDS → CHARACTERS                              */
/* -------------------------------------------------------------------------- */

const WORDS_TO_CHARS = [
  {
    words: "50",
    chars: "275–300",
    example: "A short message or social post",
  },
  {
    words: "100",
    chars: "550–600",
    example: "One or two short paragraphs",
  },
  {
    words: "250",
    chars: "1,375–1,500",
    example: "A short article section",
  },
  {
    words: "400",
    chars: "2,200–2,400",
    example: "A long social caption",
  },
  {
    words: "500",
    chars: "2,750–3,000",
    example: "About one page of dense text",
  },
  {
    words: "1,000",
    chars: "5,500–6,000",
    example: "A short blog article",
  },
]

/* -------------------------------------------------------------------------- */
/*                         CURRENT PUBLISHING LIMITS                          */
/* -------------------------------------------------------------------------- */

/*
  "Official" = current platform/documentation limit.
  "Guide"    = useful writing target, NOT a hard Google limit.

  Keep this table easy to update if a platform changes its rules.
*/

const PLATFORM_LIMITS = [
  {
    field: "X standard post",
    limit: "280 weighted characters",
    type: "Official",
  },
  {
    field: "X Premium post",
    limit: "25,000 weighted characters",
    type: "Official",
  },
  {
    field: "LinkedIn post",
    limit: "3,000 characters",
    type: "Official",
  },
  {
    field: "Bluesky post",
    limit: "300 grapheme clusters",
    type: "Official",
  },
  {
    field: "TikTok video caption",
    limit: "2,200 UTF-16 units",
    type: "Official",
  },
  {
    field: "YouTube video title",
    limit: "100 characters",
    type: "Official",
  },
  {
    field: "YouTube description",
    limit: "5,000 bytes",
    type: "Official",
  },
  {
    field: "Google Ads headline",
    limit: "30 characters",
    type: "Official",
  },
  {
    field: "Google Ads description",
    limit: "90 characters",
    type: "Official",
  },
  {
    field: "SEO title",
    limit: "About 50–60 characters",
    type: "Guide",
  },
  {
    field: "Meta description",
    limit: "About 140–155 characters",
    type: "Guide",
  },
  {
    field: "SMS using GSM-7",
    limit: "160 units in one message",
    type: "Standard",
  },
  {
    field: "Unicode SMS",
    limit: "70 units in one message",
    type: "Standard",
  },
]

/* -------------------------------------------------------------------------- */
/*                             INTERNAL LINKS                                 */
/* -------------------------------------------------------------------------- */

const MORE_TOOLS = [
  {
    href: "/tools/word-counter",
    name: "Word Counter",
    desc: "count words and text length as you type.",
  },
  {
    href: "/tools/sentence-counter",
    name: "Sentence Counter",
    desc: "count sentences and check sentence length.",
  },
  {
    href: "/tools/reading-time",
    name: "Reading Time Calculator",
    desc: "estimate reading and speaking time.",
  },
  {
    href: "/tools/keyword-density-checker",
    name: "Keyword Density Checker",
    desc: "check keyword frequency before publishing.",
  },
  {
    href: "/tools/ai-text-cleaner",
    name: "AI Text Cleaner",
    desc: "remove unwanted formatting and text artifacts.",
  },
  {
    href: "/tools/ai-token-counter",
    name: "AI Token Counter",
    desc: "count AI tokens and estimate model usage.",
  },
  {
    href: "/tools/syllable-counter",
    name: "Syllable Counter",
    desc: "count syllables in words, sentences, and poems.",
  },
]

const RELATED_GUIDES = [
  {
    href: "/blog/manage-essay-word-count",
    name: "Essay Word Count Guide: How Long Is an Essay?",
  },
  {
    href: "/blog/cover-letter-word-count",
    name: "Cover Letter Word Count: How Long Should It Be?",
  },
  {
    href: "/blog/how-long-should-a-blog-post-be",
    name: "How Long Should a Blog Post Be?",
  },
]

/* -------------------------------------------------------------------------- */
/*                                 STYLES                                     */
/* -------------------------------------------------------------------------- */

const h2Class =
  "text-2xl sm:text-3xl font-semibold tracking-tight text-gray-950 dark:text-white"

const h3Class =
  "text-xl font-semibold text-gray-900 dark:text-gray-100"

const pClass =
  "text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed"

const linkClass =
  "font-medium text-cyan-600 hover:text-cyan-700 hover:underline dark:text-cyan-400 dark:hover:text-cyan-300"

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export default function SeoContent() {
  return (
    <article
      aria-label="Character Counter Guide"
      className="
        bg-gradient-to-b
        from-white via-slate-50/70 to-white
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        py-12 md:py-20
        px-4 sm:px-6 lg:px-8
      "
    >
      <div className="max-w-4xl mx-auto space-y-14">

        {/* ---------------------------------------------------------------- */}
        {/* PRIMARY SEARCH INTENT                                            */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-6"
          aria-labelledby="more-countflows-tools"
        >
          {/* Section heading */}
          <div className="text-center sm:text-left">
            <div
              className="
        inline-flex items-center gap-2
        rounded-full
        border border-cyan-200
        bg-cyan-70/80
        px-3 py-1.5
        text-xs font-semibold
        text-cyan-700
        shadow-sm
        dark:border-cyan-900
        dark:bg-cyan-950/30
        dark:text-cyan-300
      "
            >
              <Sparkles
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              Free writing tools
            </div>

            <h2
              id="more-countflows-tools"
              className={`${h2Class} mt-4`}
            >
              Try Another{" "}
              <span
                className="
          bg-gradient-to-r
          from-cyan-500
          via-purple-500
          to-emerald-500
          bg-clip-text
          text-transparent
        "
              >
                CountFlows Tool
              </span>
            </h2>

            <p className={`${pClass} mt-3 max-w-2xl`}>
              Finished checking your character count? Choose another free tool to{" "}
              <span
                className="
          font-semibold
          bg-gradient-to-r
          from-cyan-500 to-blue-500
          bg-clip-text
          text-transparent
        "
              >
                analyze
              </span>
              ,{" "}
              <span
                className="
          font-semibold
          bg-gradient-to-r
          from-emerald-500 to-green-600
          bg-clip-text
          text-transparent
        "
              >
                clean
              </span>
              , or{" "}
              <span
                className="
          font-semibold
          bg-gradient-to-r
          from-purple-500 to-fuchsia-500
          bg-clip-text
          text-transparent
        "
              >
                improve
              </span>{" "}
              your text.
            </p>
          </div>

          {/* Tool cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {MORE_TOOLS.map((tool, index) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="
        group relative
        overflow-hidden
        rounded-3xl

        border border-cyan-200
        bg-white
        p-5

        shadow-md
        shadow-cyan-950/5

        transition-shadow
        duration-300

        hover:shadow-xl
        hover:shadow-cyan-950/15

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-500
        focus-visible:ring-offset-2

        dark:border-cyan-900/60
        dark:bg-gray-900
        dark:shadow-black/20
        dark:hover:shadow-black/40
      "
              >
                {/* Permanent colorful background glow */}
                <div
                  aria-hidden="true"
                  className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full

          bg-gradient-to-br
          from-cyan-200/80
          via-purple-200/70
          to-emerald-200/70

          blur-3xl
          opacity-70

          dark:from-cyan-800/30
          dark:via-purple-800/25
          dark:to-emerald-800/25
          dark:opacity-60
        "
                />

                {/* Small second glow for depth */}
                <div
                  aria-hidden="true"
                  className="
          pointer-events-none
          absolute
          -bottom-20
          -left-16
          h-32
          w-32
          rounded-full

          bg-gradient-to-tr
          from-emerald-100/70
          via-cyan-100/60
          to-purple-100/60

          blur-3xl

          dark:from-emerald-900/20
          dark:via-cyan-900/20
          dark:to-purple-900/20
        "
                />

                <div className="relative">
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">

                    {/* Number badge */}
                    <div
                      className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl

              bg-gradient-to-br
              from-cyan-500
              via-purple-500
              to-emerald-500

              text-sm
              font-black
              text-white

              shadow-md
              shadow-purple-500/20
            "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Arrow */}
                    <div
                      className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full

              border border-cyan-200
              bg-gradient-to-br
              from-cyan-50
              via-purple-50
              to-emerald-50

              text-cyan-700

              dark:border-cyan-900
              dark:from-cyan-950/40
              dark:via-purple-950/30
              dark:to-emerald-950/30
              dark:text-cyan-300
            "
                    >
                      <ArrowUpRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Tool name */}
                  <h3
                    className="
            mt-5
            text-lg
            font-bold
            tracking-tight
            text-gray-950

            dark:text-white
          "
                  >
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="
            mt-2
            text-sm
            leading-6
            text-gray-600

            dark:text-gray-400
          "
                  >
                    {tool.desc}
                  </p>

                  {/* CTA */}
                  <div
                    className="
            mt-5
            flex
            items-center
            gap-2

            text-sm
            font-semibold

            bg-gradient-to-r
            from-cyan-600
            via-purple-600
            to-emerald-600
            bg-clip-text
            text-transparent
          "
                  >
                    Use this tool

                    <ArrowUpRight
                      className="
              h-4
              w-4
              text-cyan-600

              dark:text-cyan-400
            "
                      aria-hidden="true"
                    />
                  </div>

                  {/* Permanent bottom gradient line */}
                  <div
                    aria-hidden="true"
                    className="
            absolute
            -bottom-5
            left-0
            h-[2px]
            w-full

            bg-gradient-to-r
            from-cyan-500
            via-purple-500
            to-emerald-500
          "
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="space-y-4"
          aria-labelledby="what-is-character-counter"
        >
          <h2
            id="what-is-character-counter"
            className={h2Class}
          >
            What Is a Character Counter?
          </h2>

          <p className={pClass}>
            A <strong>character counter</strong> is an online tool that shows
            how many characters are in your text as you type. This free
            CountFlows Character Counter counts characters with spaces and
            without spaces, words, sentences, paragraphs, Unicode characters,
            emojis, hashtags, mentions, URLs, and more.
          </p>

          <p className={pClass}>
            Paste your text into the box above and the{" "}
            <strong>character count</strong> updates instantly. You can also
            check the same text against social media, SEO, Google Ads, and SMS
            limits without opening separate tools.
          </p>

          <p className={pClass}>
            Everything is calculated directly in your browser. There is no
            sign-up and no need to upload your text.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* WHAT THE UPDATED TOOL COUNTS                                     */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="what-character-counter-counts"
        >
          <h2
            id="what-character-counter-counts"
            className={h2Class}
          >
            What Does This Character Counter Count?
          </h2>

          <p className={pClass}>
            A basic character counter only gives you one number. CountFlows
            shows the measurements that are useful when you are writing,
            publishing, coding, advertising, or preparing an SMS.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Characters with spaces",
              "Characters without spaces",
              "Unicode grapheme characters",
              "UTF-16 units",
              "UTF-8 bytes",
              "Words and unique words",
              "Sentences and paragraphs",
              "Lines",
              "Emojis",
              "Hashtags and mentions",
              "URLs",
              "Letters, numbers, and punctuation",
              "Reading time",
              "Speaking time",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-2xl
                  border border-gray-200
                  bg-white px-4 py-3
                  text-sm font-medium
                  text-gray-700
                  dark:border-gray-800
                  dark:bg-gray-900
                  dark:text-gray-300
                "
              >
                {item}
              </div>
            ))}
          </div>

          <p className={pClass}>
            The tool also includes a character goal, text-spacing cleanup,
            SMS segment analysis, and a cross-platform checker that shows
            where your current text fits.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SPACES                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="spaces-character-count"
        >
          <h2
            id="spaces-character-count"
            className={h2Class}
          >
            Do Spaces Count as Characters?
          </h2>

          <p className={pClass}>
            Yes. In most character limits, a space counts as a character.
            Punctuation, line breaks, symbols, and emoji can also affect the
            final count.
          </p>

          <p className={pClass}>
            That is why CountFlows works as both a{" "}
            <strong>character counter with spaces</strong> and a{" "}
            <strong>character counter without spaces</strong>. Use the
            without-spaces number only when a form or assignment specifically
            asks for it.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* UNICODE                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="unicode-character-counter"
        >
          <h2
            id="unicode-character-counter"
            className={h2Class}
          >
            Unicode and Emoji Character Counting
          </h2>

          <p className={pClass}>
            Not every digital platform counts text in exactly the same way.
            A simple JavaScript text length can treat some emoji or combined
            Unicode characters differently from what a person sees on screen.
          </p>

          <p className={pClass}>
            The CountFlows <strong>Unicode character counter</strong> uses
            browser-based grapheme counting for the main character total. It
            also shows UTF-16 units and UTF-8 bytes so you can compare the
            different measurements when a platform uses another counting
            method.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SOCIAL / PLATFORM LIMITS                                         */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="social-media-character-counter"
        >
          <h2
            id="social-media-character-counter"
            className={h2Class}
          >
            Social Media Character Counter and Platform Limits
          </h2>

          <p className={pClass}>
            The platform analyzer lets you paste your copy once and check
            whether it fits several publishing formats. This is useful as an{" "}
            <strong>X character counter</strong>,{" "}
            <strong>LinkedIn character counter</strong>,{" "}
            <strong>TikTok character counter</strong>, and general social
            media character counter.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">
                    Platform or field
                  </th>

                  <th className="px-4 py-3 font-semibold">
                    Limit
                  </th>

                  <th className="px-4 py-3 font-semibold">
                    Type
                  </th>
                </tr>
              </thead>

              <tbody>
                {PLATFORM_LIMITS.map((row) => (
                  <tr
                    key={row.field}
                    className="
                      border-t border-gray-200
                      dark:border-slate-800
                    "
                  >
                    <td className="px-4 py-3 font-medium">
                      {row.field}
                    </td>

                    <td className="px-4 py-3 text-gray-600 dark:text-slate-400">
                      {row.limit}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`
                          rounded-full px-2.5 py-1
                          text-xs font-semibold
                          ${row.type === "Official"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                            : row.type === "Guide"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                              : "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300"
                          }
                        `}
                      >
                        {row.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={pClass}>
            Counting rules matter. X uses weighted characters and treats web
            links differently, Bluesky measures grapheme clusters, and TikTok
            specifies UTF-16 units. The analyzer switches its counting method
            where needed instead of assuming every platform uses the same
            character count.
          </p>

          <p className={pClass}>
            Presets for Instagram, Threads, and custom character limits are
            also available in the tool above.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SMS                                                              */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="sms-character-counter"
        >
          <h2
            id="sms-character-counter"
            className={h2Class}
          >
            SMS Character Counter and Segment Calculator
          </h2>

          <p className={pClass}>
            An <strong>SMS character counter</strong> needs to do more than
            count visible characters. Standard GSM-7 text can fit up to 160
            units in one SMS, while text that requires Unicode encoding has a
            smaller single-message allowance.
          </p>

          <p className={pClass}>
            CountFlows automatically checks whether your message uses GSM-7 or
            Unicode and shows the number of SMS segments, the encoding, units
            used, and space remaining.
          </p>

          <p className={pClass}>
            This is especially useful when an emoji, smart quote, or non-Latin
            character changes how a message is encoded.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SEO + ADS                                                        */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="seo-character-limits"
        >
          <h2
            id="seo-character-limits"
            className={h2Class}
          >
            SEO, Meta Description, and Google Ads Character Limits
          </h2>

          <p className={pClass}>
            The tool can also be used as a{" "}
            <strong>meta description character counter</strong> and SEO title
            checker. The 50–60 character title and 140–155 character meta
            description ranges shown above are writing guides, not fixed
            Google Search limits.
          </p>

          <p className={pClass}>
            For paid search, Google Ads responsive search ad headlines support
            up to 30 characters and descriptions up to 90 characters. Select
            the Google Ads preset to check your copy before adding it to a
            campaign.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* WORDS TO CHARACTERS                                              */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="characters-per-100-words"
        >
          <h2
            id="characters-per-100-words"
            className={h2Class}
          >
            How Many Characters Is 100 Words?
          </h2>

          <p className={pClass}>
            In typical English writing, 100 words is roughly{" "}
            <strong>550 to 600 characters including spaces</strong>. The exact
            number changes with word length, punctuation, and writing style.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">
                    Words
                  </th>

                  <th className="px-4 py-3 font-semibold">
                    Approx. characters
                  </th>

                  <th className="px-4 py-3 font-semibold">
                    Example
                  </th>
                </tr>
              </thead>

              <tbody>
                {WORDS_TO_CHARS.map((row) => (
                  <tr
                    key={row.words}
                    className="border-t border-gray-200 dark:border-slate-800"
                  >
                    <td className="px-4 py-3 font-medium">
                      {row.words}
                    </td>

                    <td className="px-4 py-3">
                      {row.chars}
                    </td>

                    <td className="px-4 py-3 text-gray-600 dark:text-slate-400">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={pClass}>
            These are estimates for planning. For an exact result, paste your
            text into the character counter above. If your requirement is
            based on words instead, use the{" "}
            <Link
              href="/tools/word-counter"
              className={linkClass}
            >
              Word Counter
            </Link>
            .
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* WORD + GOOGLE DOCS                                               */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="character-count-word-google-docs"
        >
          <h2
            id="character-count-word-google-docs"
            className={h2Class}
          >
            How to Check Character Count in Word and Google Docs
          </h2>

          <div className="space-y-3">
            <p className={pClass}>
              <strong>Microsoft Word:</strong> select the word count in the
              status bar or go to Review → Word Count. Word shows characters
              both with and without spaces.
            </p>

            <p className={pClass}>
              <strong>Google Docs:</strong> open Tools → Word count, or press
              Ctrl + Shift + C on Windows and Cmd + Shift + C on Mac.
            </p>
          </div>

          <p className={pClass}>
            CountFlows is faster when you need to check text against platform
            limits at the same time, because the counter and publishing
            presets update together.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PRIVACY                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="character-counter-privacy"
        >
          <h2
            id="character-counter-privacy"
            className={h2Class}
          >
            Your Text Stays in Your Browser
          </h2>

          <p className={pClass}>
            The CountFlows Character Counter performs its counting and text
            analysis directly in your browser. The tool does not need to send
            your text to an external counting API.
          </p>

          <p className={pClass}>
            You can use it for drafts, captions, messages, ad copy, and other
            text without creating an account.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* MORE TOOLS                                                       */}
        {/* ---------------------------------------------------------------- */}



        {/* ---------------------------------------------------------------- */}
        {/* RELATED CONTENT                                                  */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="space-y-4"
          aria-labelledby="related-character-count-guides"
        >
          <h2
            id="related-character-count-guides"
            className={h2Class}
          >
            Related Writing Guides
          </h2>

          <ul className="space-y-3">
            {RELATED_GUIDES.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className={linkClass}
                >
                  {guide.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </article>
  )
}