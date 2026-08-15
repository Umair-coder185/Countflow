// app/tools/reading-time/page.jsx
// SERVER component — metadata stays in layout.js.
// WebApplication, BreadcrumbList and FAQPage schemas are rendered here.

import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Mic2,
  TimerReset,
} from "lucide-react"

import ReadingTimeTool from "@/components/reading-time-calculator/ReadingTimeTool"
import SEOContent from "@/components/reading-time-calculator/seo-content"
import FAQ from "@/components/FAQ"

import { readingTimeFAQs } from "@/lib/faqData"
import { readingTimeToolSchema } from "@/lib/schema"

const SITE = "https://countflows.com"

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE}/tools/reading-time#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Reading Time Calculator",
      item: `${SITE}/tools/reading-time`,
    },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/tools/reading-time#faq`,
  mainEntity: readingTimeFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question.trim(),
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.trim(),
    },
  })),
}

const jsonLd = (obj) => ({
  __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
})

const FEATURES = [
  {
    icon: TimerReset,
    title: "Instant reading-time estimate",
    description:
      "Paste your text and see the estimated reading duration in minutes and seconds, not just a rounded whole number.",
  },
  {
    icon: Gauge,
    title: "Adjustable reading speed",
    description:
      "Choose a reading speed or enter your own words-per-minute rate for a more useful personal estimate.",
  },
  {
    icon: Mic2,
    title: "Speaking-time estimate",
    description:
      "See how long the same text may take to read aloud for speeches, presentations, scripts, or voiceovers.",
  },
]

export default function ReadingTimePage() {
  return (
    <main
      id="reading-time-top"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-cyan-50/70 pt-12 text-slate-950 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 dark:text-white md:pt-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/35 blur-3xl dark:bg-cyan-500/15" />
      <div className="pointer-events-none absolute right-[-4rem] top-[32rem] h-60 w-60 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-500/10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(readingTimeToolSchema)}
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
        className="relative mx-auto max-w-5xl px-4 pt-6 md:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="transition-colors hover:text-cyan-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link href="/tools" className="transition-colors hover:text-cyan-600">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li
            aria-current="page"
            className="font-medium text-gray-900 dark:text-gray-100"
          >
            Reading Time Calculator
          </li>
        </ol>
      </nav>

      <section className="relative mx-auto max-w-5xl px-4 pb-8 pt-10 text-center md:px-8 md:pb-10 md:pt-14">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/90 px-3.5 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-800/60 dark:bg-cyan-950/40 dark:text-cyan-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Free · No sign-up · Runs in your browser
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl dark:text-white">
          Free{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Reading Time Calculator
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:leading-8 dark:text-slate-300">
          Paste any article, essay, script, or document to estimate how long it
          will take to read. Adjust the reading speed for a more useful result
          and compare it with speaking time.
        </p>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Wondering{" "}
          <strong className="font-semibold text-slate-700 dark:text-slate-200">
            how long this text will take to read?
          </strong>{" "}
          Paste it below and get the answer instantly.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Minutes &amp; seconds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Adjustable WPM
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Speaking time
          </span>
        </div>
      </section>

      <ReadingTimeTool />

      <section className="relative mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-gray-200 bg-white/85 p-5 text-left shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h2 className="text-base font-bold text-gray-950 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SEOContent />

      <div className="mx-auto mt-10 max-w-5xl px-4 text-center md:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
        >
          Reading &amp; writing guides
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mb-16 mt-8">
        <FAQ faqs={readingTimeFAQs} />
      </div>

      <div className="mx-auto mb-12 max-w-5xl px-4 md:px-8">
        <Link
          href="#reading-time-top"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-700 sm:w-auto"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}