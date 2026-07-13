import Link from "next/link"

import { ArrowRight, ChevronRight } from "lucide-react"
import { wordCounterFAQs } from "@/lib/faqData"
import FAQ from "@/components/FAQ"
import SEOContent from "@/components/Word-counter-seo/SEOContent"
import WordCounterTool from "@/components/word-counter/WordCounterTool"

// ---- JSON-LD (single source — layout.js se schema hata diya gaya hai) ----
const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://countflows.com/tools/word-counter",
  name: "Word Counter - CountFlows",
  url: "https://countflows.com/tools/word-counter",
  description:
    "Free online word counter that provides word, character, sentence, and paragraph counts plus goal tracking and readability tips.",
  image: "https://countflows.com/og-image.png",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2026-05-20",
  dateModified: "2026-07-08",
  author: {
    "@type": "Organization",
    name: "CountFlows",
    url: "https://countflows.com",
    logo: "https://countflows.com/logo.png",
  },
  publisher: {
    "@type": "Organization",
    name: "CountFlows",
    logo: { "@type": "ImageObject", url: "https://countflows.com/logo.png" },
  },
  potentialAction: {
    "@type": "UseAction",
    target: "https://countflows.com/tools/word-counter",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  isAccessibleForFree: true,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://countflows.com" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://countflows.com/tools" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Word Counter",
      item: "https://countflows.com/tools/word-counter",
    },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: wordCounterFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
}

const features = [
  {
    title: "Word tracking",
    description: "Count words and sentences as you write with real-time updates.",
  },
  {
    title: "Goal-driven",
    description: "Set a target word count and watch your progress bar grow.",
  },
  {
    title: "Writer-friendly",
    description: "Focus mode to minimize distractions and maximize productivity.",
  },
]

export default function WordCounterPage() {
  return (
    <main
      id="word-counter-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen mt-12 md:mt-16 dark:text-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />




      {/* Visible breadcrumb — matches BreadcrumbList JSON-LD */}
      {/* Visible breadcrumb — matches BreadcrumbList JSON-LD */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-5xl mx-auto px-4 md:px-8 pt-6 md:pt-8"
      >
        <ol className="flex flex-wrap items-center gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <li className="flex items-center">
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] sm:min-h-0 px-1 -mx-1 hover:text-cyan-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center shrink-0 px-0.5">
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </li>
          <li className="flex items-center">
            <Link
              href="/tools"
              className="inline-flex items-center min-h-[44px] sm:min-h-0 px-1 -mx-1 hover:text-cyan-600 transition-colors"
            >
              Tools
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center shrink-0 px-0.5">
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </li>
          <li
            aria-current="page"
            className="flex items-center font-medium text-gray-800 dark:text-gray-200 truncate max-w-[60vw] sm:max-w-none"
          >
            Word Counter
          </li>
        </ol>
      </nav>
      {/* Hero — server-rendered */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14 text-center relative">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-4">
          Free Word <span className="text-cyan-500">Counter</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          This free Word Counter instantly shows how many words, characters, sentences, and
          paragraphs are in your text — no signup required. Use it to track progress against
          targets, improve readability, and export your draft when you're finished.
        </p>
      </section>

      {/* Interactive tool — the ONLY client island on this page */}
      <WordCounterTool />

      {/* Feature cards — server-rendered, static */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content — server-rendered */}
      <SEOContent />
        <p className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm shadow-slate-200 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
          >
            All guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>

      {/* FAQ */}
      <div className="mb-20">
        <FAQ faqs={wordCounterFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#word-counter-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}