import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { aiTextCleanerFAQs } from "@/lib/faqData"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/ai-text-cleaner/SeoContent"
import CleanerTool from "@/components/ai-text-cleaner/CleanerTool"

/* ------------- Structured data (rendered on the server) ------------- */

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://countflows.com/tools/ai-text-cleaner",
  name: "AI Text Cleaner - CountFlows",
  url: "https://countflows.com/tools/ai-text-cleaner",
  description:
    "Free online AI text cleaner. Remove markdown formatting, em dashes, invisible characters, smart quotes, and emojis from ChatGPT, Claude, and Gemini text \u2014 entirely in your browser.",
  image: "https://countflows.com/og-image.png",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
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
    target: "https://countflows.com/tools/ai-text-cleaner",
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
    { "@type": "ListItem", position: 3, name: "AI Text Cleaner", item: "https://countflows.com/tools/ai-text-cleaner" },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aiTextCleanerFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
}

const FEATURES = [
  { title: "7 cleaners, your rules", description: "Markdown, em dashes, invisible characters, smart quotes, whitespace, bullets, and emojis \u2014 toggle each one on or off." },
  { title: "Instant and unlimited", description: "Clean a caption or a 50-page report. No word limit, no sign-up, no waiting." },
  { title: "100% private", description: "All cleaning happens in your browser. Your text is never uploaded, logged, or stored." },
]

export default function AiTextCleanerPage() {
  return (
 <main
  id="ai-text-cleaner-top"
  className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen mt-12 md:mt-16 dark:text-white"
>
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(schema) } } />
      <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
        

         <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
                <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
                    <li aria-hidden="true">/</li>
                    <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">Ai Text Cleaner</li>
                </ol>
            </nav>
      {/* Hero Section (server-rendered) */}
     {/* Hero Section */}
<section className="relative mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-16 text-center">
  {/* Subtle badge */}
  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/80 px-4 py-1.5 text-xs font-semibold text-cyan-700 backdrop-blur-sm dark:border-cyan-800/50 dark:bg-cyan-900/20 dark:text-cyan-300">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
    </span>
    100% Free & Private — No Sign-up Required
  </div>

  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
    AI Text{" "}
    <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
      Cleaner
    </span>
  </h1>

  <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold text-slate-600 dark:text-slate-300 sm:text-xl md:text-2xl">
    Remove ChatGPT Formatting, Markdown & Hidden Characters
  </p>

  <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
    Paste text from ChatGPT, Claude, or Gemini and clean it in one click. This free
    AI text cleaner removes markdown symbols like ** and ##, replaces em dashes,
    strips invisible characters, and straightens smart quotes so your text pastes
    as clean, plain writing anywhere.
  </p>

  {/* Trust pills */}
  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      <svg className="h-3.5 w-3.5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      Browser-Only Processing
    </span>
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      <svg className="h-3.5 w-3.5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75 12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
      Instant Results
    </span>
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      <svg className="h-3.5 w-3.5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09z" /></svg>
      Zero Data Storage
    </span>
  </div>
</section>

      {/* Interactive tool - the ONLY client component on the page */}
      <CleanerTool />

      {/* Feature cards (server-rendered) */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content (server-rendered) */}
      <SeoContent />

       <p className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm shadow-slate-200 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
          >
            Latest Articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>

      {/* FAQ */}
      <div className="mb-20">
        <FAQ faqs={aiTextCleanerFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#ai-text-cleaner-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}