// app/tools/text-compare/page.jsx
//
// SERVER COMPONENT
//
// Metadata stays in layout.js.
//
// This page contains:
// - WebApplication schema
// - Breadcrumb schema
// - FAQ schema
// - Visible breadcrumb
// - Hero
// - Text Compare tool
// - Feature cards
// - SEO content
// - FAQ
//
// Only TextCompareTool is a Client Component.

import Link from "next/link"

import {
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  ShieldCheck,
} from "lucide-react"

import FAQ from "@/components/FAQ"
import SEOContent from "@/components/text-compare-seo/SEOContent"
import TextCompareTool from "@/components/text-compare/TextCompareTool"

import {
  textCompareFAQs,
} from "@/lib/faqData"


// ==========================================================
// SITE CONSTANTS
// ==========================================================

const SITE =
  "https://countflows.com"

const PAGE_URL =
  `${SITE}/tools/text-compare`


// ==========================================================
// WEB APPLICATION SCHEMA
// ==========================================================

const appSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "WebApplication",

  "@id":
    `${PAGE_URL}#webapp`,

  name:
    "Online Text Compare - CountFlows",

  alternateName:
    "Text Compare Tool",

  url:
    PAGE_URL,

  description:
    "Free online text compare tool to compare two texts and instantly highlight added, removed, and changed words, characters, or lines.",

  image:
    `${SITE}/og-image.png`,

  applicationCategory:
    "UtilitiesApplication",

  applicationSubCategory:
    "Text Comparison Tool",

  operatingSystem:
    "Any",

  browserRequirements:
    "Requires JavaScript and a modern web browser.",

  inLanguage:
    "en-US",

  isAccessibleForFree:
    true,

  featureList: [
    "Compare two texts online",
    "Word-level text comparison",
    "Character-level text comparison",
    "Line-by-line text comparison",
    "Side-by-side comparison",
    "Inline difference view",
    "Similarity percentage",
    "Added and removed word counts",
    "Previous and next difference navigation",
    "Ignore capitalization option",
    "Ignore whitespace option",
    "Local text file comparison",
    "Browser-based text processing",
  ],

  offers: {
    "@type":
      "Offer",

    price:
      "0",

    priceCurrency:
      "USD",

    availability:
      "https://schema.org/InStock",
  },

  author: {
    "@type":
      "Organization",

    name:
      "CountFlows",

    url:
      SITE,

    logo:
      `${SITE}/logo.png`,
  },

  publisher: {
    "@type":
      "Organization",

    name:
      "CountFlows",

    url:
      SITE,

    logo: {
      "@type":
        "ImageObject",

      url:
        `${SITE}/logo.png`,
    },
  },

  provider: {
    "@type":
      "Organization",

    name:
      "CountFlows",

    url:
      SITE,
  },

  potentialAction: {
    "@type":
      "UseAction",

    target:
      PAGE_URL,
  },
}


// ==========================================================
// BREADCRUMB SCHEMA
// ==========================================================

const breadcrumbSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "BreadcrumbList",

  "@id":
    `${PAGE_URL}#breadcrumb`,

  itemListElement: [
    {
      "@type":
        "ListItem",

      position:
        1,

      name:
        "Home",

      item:
        SITE,
    },

    {
      "@type":
        "ListItem",

      position:
        2,

      name:
        "Tools",

      item:
        `${SITE}/tools`,
    },

    {
      "@type":
        "ListItem",

      position:
        3,

      name:
        "Text Compare",

      item:
        PAGE_URL,
    },
  ],
}


// ==========================================================
// FAQ SCHEMA
//
// Uses the SAME FAQ data that is visibly rendered below.
// This avoids schema/content mismatch.
// ==========================================================

const faqSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "FAQPage",

  "@id":
    `${PAGE_URL}#faq`,

  mainEntity:
    textCompareFAQs.map(
      (faq) => ({
        "@type":
          "Question",

        name:
          faq.question.trim(),

        acceptedAnswer: {
          "@type":
            "Answer",

          text:
            faq.answer.trim(),
        },
      })
    ),
}


// ==========================================================
// SAFE JSON-LD SERIALIZATION
//
// `<` is escaped so static JSON-LD cannot accidentally
// terminate the script element.
//
// User text is NEVER inserted here.
// ==========================================================

const jsonLd = (obj) => ({
  __html:
    JSON.stringify(obj)
      .replace(
        /</g,
        "\\u003c"
      ),
})


// ==========================================================
// SUPPORTING FEATURES
// ==========================================================

const FEATURES = [
  {
    icon:
      FileSearch,

    title:
      "Word, Character & Line Comparison",

    description:
      "Compare text at the level that fits your task, from individual characters and wording changes to complete line-by-line revisions.",
  },

  {
    icon:
      CheckCircle2,

    title:
      "Find Every Change Faster",

    description:
      "Highlight added and removed text, review similarity statistics, and jump directly to the previous or next difference.",
  },

  {
    icon:
      ShieldCheck,

    title:
      "Browser-Based & Private",

    description:
      "Text comparison runs in your browser without sending your pasted content to a remote comparison API.",
  },
]


// ==========================================================
// PAGE
// ==========================================================

export default function TextComparePage() {
  return (
    <main
      id="text-compare-top"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-white
        to-cyan-50/70
        pt-12
        text-slate-950
        dark:from-gray-950
        dark:via-gray-950
        dark:to-gray-900
        dark:text-white
        md:pt-16
      "
    >

      {/* ==================================================
          DECORATIVE BACKGROUND
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-cyan-200/35
          blur-3xl
          dark:bg-cyan-500/15
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-4rem]
          top-[30rem]
          h-60
          w-60
          rounded-full
          bg-fuchsia-200/25
          blur-3xl
          dark:bg-fuchsia-500/10
        "
      />


      {/* ==================================================
          STRUCTURED DATA
      ================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={
          jsonLd(appSchema)
        }
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={
          jsonLd(
            breadcrumbSchema
          )
        }
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={
          jsonLd(faqSchema)
        }
      />


      {/* ==================================================
          BREADCRUMB
      ================================================== */}

      <nav
        aria-label="Breadcrumb"
        className="
          relative
          mx-auto
          max-w-5xl
          px-4
          pt-6
          md:px-8
        "
      >
        <ol
          className="
            flex
            flex-wrap
            items-center
            gap-y-1
            text-xs
            text-gray-500
            dark:text-gray-400
            sm:text-sm
          "
        >

          <li className="flex items-center">

            <Link
              href="/"
              className="
                inline-flex
                min-h-[44px]
                items-center
                px-1
                transition-colors
                hover:text-cyan-600
                sm:min-h-0
              "
            >
              Home
            </Link>

          </li>


          <li
            aria-hidden="true"
            className="
              flex
              shrink-0
              items-center
              px-0.5
            "
          >
            <ChevronRight
              className="
                h-3.5
                w-3.5
                sm:h-4
                sm:w-4
              "
            />
          </li>


          <li className="flex items-center">

            <Link
              href="/tools"
              className="
                inline-flex
                min-h-[44px]
                items-center
                px-1
                transition-colors
                hover:text-cyan-600
                sm:min-h-0
              "
            >
              Tools
            </Link>

          </li>


          <li
            aria-hidden="true"
            className="
              flex
              shrink-0
              items-center
              px-0.5
            "
          >
            <ChevronRight
              className="
                h-3.5
                w-3.5
                sm:h-4
                sm:w-4
              "
            />
          </li>


          <li
            aria-current="page"
            className="
              flex
              max-w-[60vw]
              items-center
              truncate
              font-medium
              text-gray-900
              dark:text-gray-100
              sm:max-w-none
            "
          >
            Text Compare
          </li>

        </ol>
      </nav>


      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="
          relative
          mx-auto
          max-w-5xl
          px-4
          pb-8
          pt-10
          text-center
          md:px-8
          md:pb-10
          md:pt-14
        "
      >

        {/* Trust / benefit badge */}

        <div
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-200
            bg-cyan-50/90
            px-3.5
            py-1.5
            text-xs
            font-semibold
            text-cyan-700
            dark:border-cyan-800/60
            dark:bg-cyan-950/40
            dark:text-cyan-300
          "
        >

          <span
            className="
              relative
              flex
              h-2
              w-2
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-cyan-400
                opacity-60
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2
                w-2
                rounded-full
                bg-cyan-500
              "
            />
          </span>

          Free · No signup · Browser-based

        </div>


        {/* ONE H1 ONLY */}

        <h1
          className="
            text-3xl
            font-black
            tracking-tight
            text-slate-950
            sm:text-5xl
            md:text-6xl
            dark:text-white
          "
        >
          Online{" "}

          <span
            className="
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              bg-clip-text
              text-transparent
            "
          >
            Text Compare
          </span>
        </h1>


        {/* Primary search-intent copy */}

        <p
          className="
            mx-auto
            mt-5
            max-w-3xl
            text-base
            leading-7
            text-slate-600
            sm:text-lg
            md:leading-8
            dark:text-slate-300
          "
        >
          Compare two texts online and instantly find
          added, removed, and changed words, characters,
          or lines. Review differences side by side,
          measure similarity, and jump directly between
          changes.
        </p>


        {/* Quick benefits */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-2
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >

          <span
            className="
              inline-flex
              items-center
              gap-1.5
            "
          >
            <CheckCircle2
              className="
                h-4
                w-4
                text-emerald-500
              "
              aria-hidden="true"
            />

            Word, character & line modes
          </span>


          <span
            className="
              inline-flex
              items-center
              gap-1.5
            "
          >
            <CheckCircle2
              className="
                h-4
                w-4
                text-emerald-500
              "
              aria-hidden="true"
            />

            Side-by-side differences
          </span>


          <span
            className="
              inline-flex
              items-center
              gap-1.5
            "
          >
            <CheckCircle2
              className="
                h-4
                w-4
                text-emerald-500
              "
              aria-hidden="true"
            />

            No text upload required
          </span>

        </div>

      </section>


      {/* ==================================================
          TOOL
      ================================================== */}

      <section
        aria-label="Online text comparison tool"
        className="relative"
      >
        <TextCompareTool />
      </section>


      {/* ==================================================
          FEATURE CARDS
      ================================================== */}

      <section
        aria-label="Text comparison features"
        className="
          relative
          mx-auto
          max-w-5xl
          px-4
          py-10
          md:px-8
          md:py-14
        "
      >

        <div
          className="
            grid
            gap-4
            sm:grid-cols-3
          "
        >

          {FEATURES.map(
            ({
              icon: Icon,
              title,
              description,
            }) => (

              <article
                key={title}
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white/85
                  p-5
                  text-left
                  shadow-sm
                  backdrop-blur
                  dark:border-gray-800
                  dark:bg-gray-900/80
                "
              >

                <div
                  className="
                    mb-3
                    inline-flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-50
                    text-cyan-600
                    dark:bg-cyan-950/50
                    dark:text-cyan-300
                  "
                >
                  <Icon
                    className="
                      h-4
                      w-4
                    "
                    aria-hidden="true"
                  />
                </div>


                <h2
                  className="
                    text-base
                    font-bold
                    text-gray-950
                    dark:text-white
                  "
                >
                  {title}
                </h2>


                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  {description}
                </p>

              </article>

            )
          )}

        </div>

      </section>


      {/* ==================================================
          SEO CONTENT
      ================================================== */}

      <SEOContent />


      {/* ==================================================
          FAQ
      ================================================== */}

      <div
        className="
          mb-16
          mt-10
        "
      >
        <FAQ
          faqs={
            textCompareFAQs
          }
        />
      </div>


      {/* ==================================================
          BACK TO TOP
      ================================================== */}

      <div
        className="
          mx-auto
          mb-12
          max-w-5xl
          px-4
          md:px-8
        "
      >

        <Link
          href="#text-compare-top"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-cyan-600
            px-5
            py-3
            font-semibold
            text-white
            shadow-lg
            shadow-cyan-500/20
            transition-colors
            hover:bg-cyan-700
            sm:w-auto
          "
        >
          Back to top

          <ArrowUp
            className="
              h-5
              w-5
            "
            aria-hidden="true"
          />
        </Link>

      </div>

    </main>
  )
}