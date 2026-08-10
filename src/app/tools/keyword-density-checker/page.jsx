import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { keywordDensityFAQs } from "@/lib/faqData";
import FAQ from "@/components/FAQ";
import SEOContent from "@/components/keyword-density-checker-seo/SeoContent";
import KeywordDensityTool from "./KeywordDensityTool";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://countflows.com/tools/keyword-density-checker",
  name: "Keyword Density Checker - Countflows",
  url: "https://countflows.com/tools/keyword-density-checker",
  description:
    "Free online keyword density checker that analyzes single words and 2–3 word phrases with frequency and density percentages.",
  image: "https://countflows.com/og-image.png",
  applicationCategory: "SEOApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2024-01-01",
  dateModified: "2026-07-08",
  author: {
    "@type": "Organization",
    name: "Countflows",
    url: "https://countflows.com",
    logo: "https://countflows.com/logo.png",
  },
  publisher: {
    "@type": "Organization",
    name: "Countflows",
    logo: {
      "@type": "ImageObject",
      url: "https://countflows.com/logo.png",
    },
  },
  potentialAction: {
    "@type": "UseAction",
    target: "https://countflows.com/tools/keyword-density-checker",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  isAccessibleForFree: true,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://countflows.com" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://countflows.com/tools" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Keyword Density Checker",
      item: "https://countflows.com/tools/keyword-density-checker",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: keywordDensityFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
};

export default function KeywordDensityCheckerPage() {
  return (
    <main
      id="keyword-density-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen dark:text-white mt-12 md:mt-16"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
     <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
                  <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
                    <li aria-hidden="true">/</li>
                    <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">Keyword Density Checker</li>
                  </ol>
                </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pt-10 pb-8 md:pt-14 md:pb-10 text-center relative">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Free Keyword Density <span className="text-cyan-500">Checker</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          Instantly analyze how often each word and phrase appears in your text,
          along with its density percentage. Optimize your content for SEO, avoid
          keyword stuffing, and find your most-used terms — no signup required.
        </p>
      </section>

      {/* Tool */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <KeywordDensityTool />
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 text-center">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Phrase Analysis",
              description: "Check single words and 2–3 word phrases (n-grams) in real time.",
            },
            {
              title: "SEO-Friendly",
              description: "See density percentages to avoid keyword stuffing and over-optimization.",
            },
            {
              title: "Export Ready",
              description: "Copy results or download a clean CSV for your reports and audits.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-6 shadow-lg shadow-cyan-200/20 dark:shadow-black/20 hover:shadow-xl hover:shadow-cyan-200/30 dark:hover:shadow-black/30 transition-shadow"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <SEOContent />

      {/* All Guides Link */}
      <p className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm shadow-slate-200 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
        >
          All guides
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mb-20">
        <FAQ faqs={keywordDensityFAQs} />
      </div>

      {/* Back to Top */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12 text-center">
        <Link
          href="#keyword-density-top"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  );
}