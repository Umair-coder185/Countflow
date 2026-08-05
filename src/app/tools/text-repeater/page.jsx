import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { textRepeaterFAQs } from "@/lib/faqData";
import FAQ from "@/components/FAQ";
import SeoContent from "@/components/text-repeater/SeoContent";
import TextRepeaterTool from "@/components/text-repeater/TextRepeaterTool";

/* ------------- Structured data (rendered on the server) ------------- */

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://countflows.com/tools/text-repeater",
  name: "Text Repeater - CountFlows",
  url: "https://countflows.com/tools/text-repeater",
  description:
    "Free online text repeater. Repeat any text, word, or emoji up to 10,000 times with five separator styles — entirely in your browser.",
  image: "https://countflows.com/og-image.png",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2026-08-05",
  dateModified: "2026-08-05",
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
    target: "https://countflows.com/tools/text-repeater",
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
    { "@type": "ListItem", position: 3, name: "Text Repeater", item: "https://countflows.com/tools/text-repeater" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: textRepeaterFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
};

const FEATURES = [
  {
    title: "5 separator styles",
    description:
      "New line, space, comma, dash, or type your own. Each mode updates the output instantly so you can compare at a glance.",
  },
  {
    title: "Up to 10,000 repeats",
    description:
      "From a single emoji to a full paragraph — repeat up to 10,000 copies in under a second. No sign-up, no queue.",
  },
  {
    title: "100% private",
    description:
      "Everything runs in your browser. Your text is never uploaded, logged, or sent anywhere. Copy or download the result and close the tab.",
  },
];

export default function TextRepeaterPage() {
  return (
    <main
      id="text-repeater-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen mt-12 md:mt-16 dark:text-white"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      {/* Structured data */}
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
          <li>
            <Link href="/" className="hover:text-cyan-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools" className="hover:text-cyan-600">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            aria-current="page"
            className="text-gray-900 dark:text-gray-100 font-medium"
          >
            Text Repeater
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12 text-center relative">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-4">
          Free Text{" "}
          <span className="text-cyan-500">Repeater</span>
          <span className="block mt-3 text-lg md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Repeat Any Text, Word, or Emoji Up to 10,000 Times
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Paste your text, choose how many copies you need, and pick a separator.
          Your repeated text is ready to copy in seconds. No sign-up, no waiting —
          everything stays in your browser.
        </p>
      </section>

      {/* Interactive tool */}
      <TextRepeaterTool />

      {/* Feature cards */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <SeoContent />

      {/* Blog CTA */}
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
        <FAQ faqs={textRepeaterFAQs} />
      </div>

      {/* Back to top */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#text-repeater-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  );
}