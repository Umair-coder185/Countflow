// app/tools/syllable-counter/page.jsx
// SERVER component — metadata stays in layout.js.
// Structured data, breadcrumb, hero, supporting cards, SEO content and FAQ render on the server.
// Only SyllableCounterTool is a client component.

import Link from "next/link"
import { ArrowRight, CheckCircle2, Music2, ShieldCheck } from "lucide-react"
import SyllableCounterTool from "@/components/syllable-counter/SyllableCounterTool"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/syllable-counter/SeoContent"
import { syllableCounterFAQs } from "@/lib/faqData"

const SITE = "https://countflows.com"

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE}/tools/syllable-counter`,
  name: "Free Syllable Counter for Poems, Haiku & Lyrics - CountFlows",
  url: `${SITE}/tools/syllable-counter`,
  description:
    "Free online syllable counter for words, sentences, poems, haiku and song lyrics. Get per-word and per-line syllable counts with a built-in 5-7-5 haiku checker.",
  image: `${SITE}/og-image.png`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2026-07-16",
  dateModified: "2026-08-15",
  author: { "@type": "Organization", name: "CountFlows", url: SITE, logo: `${SITE}/logo.png` },
  publisher: { "@type": "Organization", name: "CountFlows", logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  potentialAction: { "@type": "UseAction", target: `${SITE}/tools/syllable-counter` },
  isAccessibleForFree: true,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Syllable Counter", item: `${SITE}/tools/syllable-counter` },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: syllableCounterFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: faq.answer.trim() },
  })),
}

const jsonLd = (obj) => ({ __html: JSON.stringify(obj) })

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Per-word & line-by-line counts",
    description: "See syllables for each word and each line as you type, making long poems and verses easier to check.",
  },
  {
    icon: Music2,
    title: "Built for poems, haiku & lyrics",
    description: "Check poetry and song lyrics line by line, then switch on Haiku mode when you need a 5-7-5 pattern.",
  },
  {
    icon: ShieldCheck,
    title: "Private browser processing",
    description: "Your text stays in your browser. Count syllables without uploading, storing, or sending your writing anywhere.",
  },
]

export default function SyllableCounterPage() {
  return (
    <main
      id="syllable-counter-top"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-cyan-50/70 pt-12 text-slate-950 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 dark:text-white md:pt-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/35 blur-3xl dark:bg-cyan-500/15" />
      <div className="pointer-events-none absolute right-[-4rem] top-[30rem] h-60 w-60 rounded-full bg-fuchsia-200/25 blur-3xl dark:bg-fuchsia-500/10" />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(appSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <nav aria-label="Breadcrumb" className="relative mx-auto max-w-5xl px-4 pt-6 md:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="transition-colors hover:text-cyan-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="transition-colors hover:text-cyan-600">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">Syllable Counter</li>
        </ol>
      </nav>

      <section className="relative mx-auto max-w-5xl px-4 pb-8 pt-10 text-center md:px-8 md:pb-10 md:pt-14">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/90 px-3.5 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-800/60 dark:bg-cyan-950/40 dark:text-cyan-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>
          Free, instant &amp; private
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl dark:text-white">
          Free Syllable Counter for{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Poems, Haiku &amp; Lyrics
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:leading-8 dark:text-slate-300">
          Count syllables in words, sentences, poems and song lyrics instantly. See every line separately and use the built-in 5-7-5 haiku checker when your poem needs an exact pattern.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Per-word counts</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Line-by-line results</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" />5-7-5 haiku mode</span>
        </div>
      </section>

      <section aria-label="Syllable counter tool" className="relative">
        <SyllableCounterTool />
      </section>

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
              <h2 className="text-base font-bold text-gray-950 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <SeoContent />

      <div className="mx-auto mt-10 max-w-5xl px-4 text-center md:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
        >
          Writing &amp; poetry guides
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mb-16 mt-8">
        <FAQ faqs={syllableCounterFAQs} />
      </div>

      <div className="mx-auto mb-12 max-w-5xl px-4 md:px-8">
        <Link
          href="#syllable-counter-top"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-700 sm:w-auto"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}