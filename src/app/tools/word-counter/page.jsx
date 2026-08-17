import Link from "next/link"
import { ArrowUp, ChevronRight } from "lucide-react"

import { wordCounterFAQs } from "@/lib/faqData"
import FAQ from "@/components/FAQ"
import SEOContent from "@/components/Word-counter-seo/SEOContent"
import WordCounterSection from "@/components/word-counter/WordCounterSection"

const jsonLd = (obj) => ({
  __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
})

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://countflows.com/tools/word-counter#webapp",
  name: "Free Online Word Counter - CountFlows",
  url: "https://countflows.com/tools/word-counter",
  description:
    "Free online word counter that instantly counts words, characters, sentences, and paragraphs, with writing goals, word frequency, and reading-time estimates.",
  image: "https://countflows.com/og-image.png",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  inLanguage: "en-US",
  datePublished: "2026-05-20",
  dateModified: "2026-08-17",
  author: {
    "@type": "Organization",
    name: "CountFlows",
    url: "https://countflows.com",
  },
  publisher: {
    "@type": "Organization",
    name: "CountFlows",
    url: "https://countflows.com",
    logo: {
      "@type": "ImageObject",
      url: "https://countflows.com/logo.png",
    },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  isAccessibleForFree: true,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://countflows.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://countflows.com/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Word Counter",
      item: "https://countflows.com/tools/word-counter",
    },
  ],
}

const validFAQs = wordCounterFAQs.filter(
  (faq) => faq?.question?.trim() && faq?.answer?.trim()
)

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: validFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question.trim(),
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.trim(),
    },
  })),
}

const features = [
  {
    title: "Instant text counts",
    description:
      "See words, characters, sentences, and paragraphs update as you type or paste.",
  },
  {
    title: "Writing goal tracker",
    description:
      "Set a target word count and monitor your progress while you write.",
  },
  {
    title: "Private in your browser",
    description:
      "Your text is counted locally in the browser and is not uploaded for analysis.",
  },
]

export default function WordCounterPage() {
  return (
    <main
      id="word-counter-top"
      className="relative mt-12 min-h-screen overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 dark:text-white md:mt-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(appSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema)}
      />

      <nav
        aria-label="Breadcrumb"
        className="relative mx-auto max-w-6xl px-4 pt-6 md:px-8 md:pt-8"
      >
        <ol className="flex flex-wrap items-center gap-y-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <li className="flex items-center">
            <Link
              href="/"
              className="-mx-1 inline-flex min-h-[44px] items-center px-1 transition-colors hover:text-cyan-600 sm:min-h-0"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="flex shrink-0 items-center px-0.5">
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </li>
          <li className="flex items-center">
            <Link
              href="/tools"
              className="-mx-1 inline-flex min-h-[44px] items-center px-1 transition-colors hover:text-cyan-600 sm:min-h-0"
            >
              Tools
            </Link>
          </li>
          <li aria-hidden="true" className="flex shrink-0 items-center px-0.5">
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </li>
          <li
            aria-current="page"
            className="flex max-w-[60vw] items-center truncate font-medium text-gray-800 dark:text-gray-200 sm:max-w-none"
          >
            Word Counter
          </li>
        </ol>
      </nav>

      <section className="relative mx-auto max-w-5xl px-4 py-10 text-center md:px-8 md:py-12">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
          Free Online <span className="text-cyan-500">Word Counter</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300 md:text-lg md:leading-8">
          Count words, characters, sentences, and paragraphs instantly. Paste or
          type your text below to check your word count online for free, track a
          writing goal, and review useful text statistics with no signup.
        </p>
      </section>

      <WordCounterSection />

      <section
        aria-labelledby="word-counter-features"
        className="relative mx-auto max-w-5xl px-4 py-10 text-center md:px-8 md:py-14"
      >
        <h2 id="word-counter-features" className="sr-only">
          Word Counter features
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white/80 p-5 shadow-lg shadow-cyan-200/20 dark:border-gray-700 dark:bg-gray-900/90 dark:shadow-black/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SEOContent />

      <div className="mb-20">
        <FAQ faqs={validFAQs} />
      </div>

      <div className="mx-auto mb-12 max-w-5xl px-4 md:px-8">
        <Link
          href="#word-counter-top"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-colors duration-200 hover:bg-cyan-700 sm:w-auto"
        >
          Back to top
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}