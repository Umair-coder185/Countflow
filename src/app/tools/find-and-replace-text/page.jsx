import Link from "next/link"
import {
  GitCompareArrows,
  Layers3,
  ShieldCheck,
} from "lucide-react"

import FAQ from "@/components/FAQ"
import FindReplaceTool from "@/components/find-and-replace-text/FindReplaceTool"
import SEOContent from "@/components/find-replace-seo/SEOContent"

const SITE =
  "https://countflows.com"

const PAGE_URL =
  `${SITE}/tools/find-and-replace-text`

const findReplaceFAQs = [
  {
    question:
      "How do I find and replace text online?",
    answer:
      "Paste your text into the Original Text box, enter the text you want to find and what you want to replace it with, then select Replace Text. CountFlows applies the replacement and shows the updated result.",
  },
  {
    question:
      "Can I replace multiple words at once?",
    answer:
      "Yes. Add multiple Find and Replace rules to change several words, phrases, characters, or values in one operation.",
  },
  {
    question:
      "What is simultaneous replacement?",
    answer:
      "Simultaneous mode applies each rule against the original text. It is recommended for most users because one replacement does not accidentally trigger another replacement rule.",
  },
  {
    question:
      "What is sequential replacement?",
    answer:
      "Sequential mode runs replacement rules from top to bottom. Text created by one rule can therefore be matched and changed by a later rule.",
  },
  {
    question:
      "Can I use regular expressions?",
    answer:
      "Yes. Enable Regex to use regular expression patterns for advanced find and replace operations. Invalid patterns are detected before replacement.",
  },
  {
    question:
      "Can I replace whole words only?",
    answer:
      "Yes. Enable Whole Words Only when you want to avoid replacing text that appears inside a longer word.",
  },
  {
    question:
      "Can I delete text instead of replacing it?",
    answer:
      "Yes. Enter the text you want to remove in the Find field and leave Replace With empty.",
  },
  {
    question:
      "What does Smart Conflict Check do?",
    answer:
      "Smart Conflict Check identifies potential problems such as duplicate rules, overlapping search terms, chained replacements, circular replacements, and invalid regular expressions.",
  },
  {
    question:
      "Is my text uploaded to CountFlows?",
    answer:
      "The find and replace operation runs directly in your browser and does not require sending your text to a remote text-processing API.",
  },
  {
    question:
      "Can I copy or download the replaced text?",
    answer:
      "Yes. After running the replacement, you can copy the result or download it as a text file.",
  },
]

const webAppSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "WebApplication",

  "@id":
    `${PAGE_URL}#webapp`,

  name:
    "Find and Replace Text Online",

  alternateName:
    "Bulk Text Replacer",

  url:
    PAGE_URL,

  description:
    "Find and replace words, phrases, characters, or multiple text values online with multiple replacement rules, regex, whole-word matching, and smart conflict detection.",

  applicationCategory:
    "UtilitiesApplication",

  operatingSystem:
    "Any",

  browserRequirements:
    "Requires a modern web browser with JavaScript enabled.",

  inLanguage:
    "en",

  isAccessibleForFree:
    true,

  offers: {
    "@type":
      "Offer",
    price:
      "0",
    priceCurrency:
      "USD",
  },

  featureList: [
    "Find and replace text",
    "Multiple replacement rules",
    "Bulk text replacement",
    "Case-sensitive matching",
    "Whole-word matching",
    "Regular expression replacement",
    "Simultaneous replacement",
    "Sequential replacement",
    "Smart conflict detection",
    "Match preview",
    "Replacement statistics",
    "Copy replaced text",
    "Download replaced text",
    "Browser-based processing",
  ],

  provider: {
    "@type":
      "Organization",

    name:
      "CountFlows",

    url:
      SITE,
  },
}

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
        "Find and Replace Text",

      item:
        PAGE_URL,
    },
  ],
}

const jsonLd = (data) => ({
  __html:
    JSON.stringify(data).replace(
      /</g,
      "\\u003c"
    ),
})

export default function FindReplaceTextPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-white">

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={
          jsonLd(webAppSchema)
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

      {/* Hero */}
      <div className="bg-gradient-to-b from-cyan-50/80 via-white to-white dark:from-cyan-950/20 dark:via-slate-950 dark:to-slate-950">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12 lg:px-8">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-slate-400"
          >
            <Link
              href="/"
              className="transition hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              Home
            </Link>

            <span
              aria-hidden="true"
            >
              /
            </span>

            <Link
              href="/tools"
              className="transition hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              Tools
            </Link>

            <span
              aria-hidden="true"
            >
              /
            </span>

            <span className="text-gray-700 dark:text-slate-300">
              Find and Replace Text
            </span>
          </nav>

          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-900/60 dark:bg-slate-900/80 dark:text-cyan-300">
              <ShieldCheck
                size={16}
                aria-hidden="true"
              />

              Free browser-based text tool
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Find and Replace{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Text Online
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg dark:text-slate-300">
              Replace words, phrases,
              characters, or multiple
              text values at once with
              live match preview, regex,
              and smart conflict
              detection.
            </p>

            {/* Quick benefits */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                <Layers3
                  size={14}
                  className="text-cyan-500"
                  aria-hidden="true"
                />
                Multiple replacement rules
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                <GitCompareArrows
                  size={14}
                  className="text-cyan-500"
                  aria-hidden="true"
                />
                Simultaneous or sequential
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                <ShieldCheck
                  size={14}
                  className="text-cyan-500"
                  aria-hidden="true"
                />
                Browser-based processing
              </span>
            </div>
          </div>
        </section>
      </div>

     

      {/* Tool */}
      <section
        aria-labelledby="tool-heading"
        className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8"
      >
        <div className="mb-5">
          <h2
            id="tool-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Tool
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base dark:text-slate-400">
            Paste your text, add the
            values you want to find and
            replace, choose any matching
            options you need, and review
            the result.
          </p>
        </div>

        <FindReplaceTool />
      </section>



       {/* Introduction */}
      <section
        aria-labelledby="introduction-heading"
        className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 lg:px-8"
      >
        <h2
          id="introduction-heading"
          className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Introduction
        </h2>

        <p className="mt-3 leading-7 text-gray-600 dark:text-slate-300">
          Find and Replace Text helps
          you quickly change repeated
          words, phrases, characters, or
          patterns without editing every
          occurrence manually. Add one
          replacement or several rules,
          review matching text, and
          generate the updated version
          in seconds.
        </p>
      </section>

      {/* SEO / Helpful Content */}
      <div className="border-t border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-slate-950">
        <SEOContent />
      </div>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <FAQ
          faqs={
            findReplaceFAQs
          }
        />
      </section>
    </main>
  )
}