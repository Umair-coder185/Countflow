// app/tools/character-counter/page.jsx
// SERVER component — "use client" NAHI likhna.
// JSON-LD server pe render hota hai aur client JS bundle chhota rehta hai.

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CharacterCounterTool from "@/components/character-counter/CharacterCounterTool"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/Character-counter-seo/SeoContent"
import { characterCounterFAQs } from "@/lib/faqData"

const SITE = "https://countflows.com"

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE}/tools/character-counter`,
  name: "Character Counter - CountFlows",
  url: `${SITE}/tools/character-counter`,
  description:
    "Free online character counter. Count characters with and without spaces, check platform limits like Tweet and SMS, and track a character goal \u2014 all in your browser.",
  image: `${SITE}/og-image.png`,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  // TODO: page ki REAL first-publish date dalo — generic 2024-01-01 hata diya hai
  datePublished: "2026-05-21",
  dateModified: "2026-07-13",
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

// NOTE: BreadcrumbList tabhi rakho jab /tools hub page live ho — abhi woh 404 hai.
// Neeche visible breadcrumb UI bhi add ki hai (Google guideline: schema + visible UI dono chahiye).
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Character Counter", item: `${SITE}/tools/character-counter` },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: characterCounterFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
}

// JSON-LD helper — teeno script tags isi se render hote hain
const jsonLd = (obj) => ({ __html: JSON.stringify(obj) })

const FEATURES = [
  { title: "Instant counts", description: "See characters, words, and average word length in real time." },
  { title: "Goal tracking", description: "Set a target and watch the progress bar move with every keystroke." },
  { title: "Export ready", description: "Copy text or download a file in one click when you're finished." },
]

export default function CharacterCounterPage() {
  return (
    <main
      id="character-counter-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen md:mt-12 dark:text-white mt-12 md:mt-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(appSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      {/* Visible breadcrumb — BreadcrumbList schema ke sath Google ko visible UI bhi chahiye */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">Character Counter</li>
        </ol>
      </nav>

      {/* Hero — poore page ka WAHID H1 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 text-center relative">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-4">
          Free Character <span className="text-cyan-500">Counter</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Count characters with and without spaces as you type, and check your text against platform
          limits like Tweet, SMS, and Instagram captions. Everything runs in your browser — your text
          is never uploaded or stored.
        </p>
      </section>

      {/* Interactive tool — sirf yehi client component hai */}
      <CharacterCounterTool />

      {/* Feature cards — h3 (h2 nahi), static, koi motion nahi */}
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
        <FAQ faqs={characterCounterFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#character-counter-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}