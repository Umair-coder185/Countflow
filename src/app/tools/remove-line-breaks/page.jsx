import Link from "next/link"
import { ArrowRight } from "lucide-react"
import RemoveLineBreaksTool from "@/components/remove-line-breaks/components/remove-line-breaks/RemoveLineBreaksTool"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/remove-line-breaks/components/remove-line-breaks/SeoContent"
import { removeLineBreaksFAQs } from "@/lib/faqData"

const SITE = "https://countflows.com"

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE}/tools/remove-line-breaks`,
  name: "Remove Line Breaks - CountFlows",
  url: `${SITE}/tools/remove-line-breaks`,
  description:
    "Free online line break remover. Three modes: remove all, preserve paragraphs, or replace with a custom separator. Everything runs in your browser.",
  image: `${SITE}/og-image.png`,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2026-08-01",
  dateModified: "2026-08-01",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Remove Line Breaks", item: `${SITE}/tools/remove-line-breaks` },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: removeLineBreaksFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
}

const jsonLd = (obj) => ({ __html: JSON.stringify(obj) })

const FEATURES = [
  { title: "Three cleanup modes", description: "Remove all, preserve paragraphs, or replace with any custom separator." },
  { title: "Instant results", description: "Cleaned text appears as you paste — no button to click, no page reload." },
  { title: "100% private", description: "Everything runs in your browser. Your text is never uploaded, stored, or read." },
]

export default function RemoveLineBreaksPage() {
  return (
    <main
      id="remove-line-breaks-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen md:mt-12 dark:text-white mt-12 md:mt-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(appSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">Remove Line Breaks</li>
        </ol>
      </nav>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 text-center relative">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-4">
          Remove <span className="text-cyan-500">Line Breaks</span> Online
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Paste your text. Get clean output. Done in under three seconds — no account needed, nothing leaves
          your device. Whether you are cleaning up a PDF copy-paste, fixing a ChatGPT response that broke apart
          in your CRM, or stripping carriage returns from an Excel export, this is the fastest way to do it.
        </p>
      </section>

      <RemoveLineBreaksTool />

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
        <FAQ faqs={removeLineBreaksFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#remove-line-breaks-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}