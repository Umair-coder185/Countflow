// app/tools/syllable-counter/page.jsx
// SERVER component — "use client" NAHI likhna.
// Schemas, breadcrumb, hero, feature cards, SeoContent, FAQ sab server pe render hote hain.
// Sirf SyllableCounterTool client component hai.

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SyllableCounterTool from "@/components/syllable-counter/SyllableCounterTool"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/Syllable-counter/SeoContent"
import { syllableCounterFAQs } from "@/lib/faqData"

const SITE = "https://countflows.com"

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE}/tools/syllable-counter`,
  name: "Syllable Counter – CountFlows",
  url: `${SITE}/tools/syllable-counter`,
  description:
    "Free online syllable counter with per-word and per-line counts and a real-time 5-7-5 haiku checker. Runs entirely in your browser.",
  image: `${SITE}/og-image.png`,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  // TODO: launch ke din REAL publish date dalo
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: {
    "@type": "Organization",
    name: "CountFlows",
    url: SITE,
    logo: `${SITE}/logo.png`,
  },
  publisher: {
    "@type": "Organization",
    name: "CountFlows",
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  isAccessibleForFree: true,
}

// NOTE: /tools hub live hone ke baad hi yeh breadcrumb sahi hai.
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
  mainEntity: syllableCounterFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
}

const jsonLd = (obj) => ({ __html: JSON.stringify(obj) })

const FEATURES = [
  {
    title: "Per-word and per-line counts",
    description: "See the syllable count for every word and every line the moment you type it.",
  },
  {
    title: "Haiku mode (5-7-5)",
    description: "Each line gets a live check against the 5-7-5 pattern and turns green when it fits.",
  },
  {
    title: "100% private",
    description: "All counting happens in your browser. Your text is never uploaded, logged, or stored.",
  },
]

export default function SyllableCounterPage() {
  return (
    <main
      id="syllable-counter-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen  mt-12 md:mt-16 dark:text-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(appSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      {/* Visible breadcrumb — schema ke sath visible UI Google guideline hai */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">Syllable Counter</li>
        </ol>
      </nav>

      {/* Hero — poore page ka WAHID H1 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 text-center relative">
       
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ">
          Syllable <span className="text-cyan-500">Counter</span>
          <span className="block mt-3 text-lg md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Count Syllables in Words, Sentences and Poems
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Type or paste your text and see the syllable count for every word and the
          whole passage instantly. Switch on Haiku mode to check your poem against the 5-7-5
          pattern line by line.
        </p>
      </section>

      {/* Interactive tool — sirf yehi client component hai */}
      <SyllableCounterTool />

      {/* Feature cards — h3 (H2 nahi, heading outline pollute nahi karna) */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <SeoContent />

       <p className="mt-10 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm shadow-slate-200 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
                >
                  All guides
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </p>

      <div className="mb-20">
        <FAQ faqs={syllableCounterFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#syllable-counter-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}