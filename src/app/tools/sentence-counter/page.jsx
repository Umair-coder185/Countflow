import Link from "next/link";
import SentenceCounterTool from "@/components/Sentence-counter-seo/SentenceCounterTool";
import SeoContent from "@/components/Sentence-counter-seo/seo-content";
import FAQ from "@/components/FAQ";
import { sentenceCounterFAQs } from "@/lib/faqData";
import { ArrowRight, ChevronRight } from "lucide-react";



const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://countflows.com/tools/sentence-counter",
  name: "Sentence Counter – CountFlows",
  url: "https://countflows.com/tools/sentence-counter",
  description:
    "Free sentence counter that shows sentence count, word count, longest sentence, average sentence length, and a readability score in real time.",
  image: "https://countflows.com/og-image.png",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2026-06-15",
  dateModified: "2026-07-13",
  author: {
    "@type": "Organization",
    name: "CountFlows",
    url: "https://countflows.com",
    logo: "https://countflows.com/logo.png",
  },
  publisher: {
    "@type": "Organization",
    name: "CountFlows",
    logo: {
      "@type": "ImageObject",
      url: "https://countflows.com/logo.png",
    },
  },
  potentialAction: {
    "@type": "UseAction",
    target: "https://countflows.com/tools/sentence-counter",
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
      name: "Sentence Counter",
      item: "https://countflows.com/tools/sentence-counter",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sentenceCounterFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
};

const features = [
  {
    title: "Free Instant counting",
    description:
      "See sentence count, words, and characters updated in real time.",
  },
  {
    title: " Free Readability analysis",
    description:
      "Get insights into sentence length and writing difficulty levels.",
  },
  {
    title: "Goal tracking free",
    description:
      "Set a target sentence count and watch your progress bar grow.",
  },
];

export default function SentenceCounterPage() {
  return (
    <main
      id="sentence-counter-top"
      className="relative overflow-hidden bg-gradient-to-b mt-12 md:mt-16 from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen md:mt-12 dark:text-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/20" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML= {{ __html: JSON.stringify(schema) }} 
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML= {{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML= {{ __html: JSON.stringify(faqSchema) }} 
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-5xl mx-auto px-4 md:px-8 pt-8"
      >
        <ol className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-cyan-600 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link
              href="/tools"
              className="hover:text-cyan-600 transition-colors"
            >
              Tools
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li
            aria-current="page"
            className="font-medium text-gray-800 dark:text-gray-200"
          >
            Sentence Counter
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14 text-center relative">
        <h1 className="text-2xl mt-4 md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
           Sentence <span className="text-cyan-500">Counter</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Instantly count sentences, measure average sentence length, and
          surface readability signals so you can improve clarity and pacing.
          Ideal for essays, articles, and technical writing.
        </p>
      </section>

      {/* Interactive Tool (client component) */}
      <SentenceCounterTool />

      {/* Feature Cards */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
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

      {/* FAQ */}
      <div className="mb-20">
        <FAQ faqs={sentenceCounterFAQs} />
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#sentence-counter-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  );
}