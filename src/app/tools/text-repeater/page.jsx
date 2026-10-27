import Link from "next/link";
import { ArrowRight, CheckCircle2, Copy, ShieldCheck, Sparkles } from "lucide-react";
import { textRepeaterFAQs } from "@/lib/faqData";
import FAQ from "@/components/FAQ";
import SeoContent from "@/components/text-repeater/SeoContent";
import TextRepeaterTool from "@/components/text-repeater/TextRepeaterTool";

const SITE_URL = "https://countflows.com";
const PAGE_URL = `${SITE_URL}/tools/text-repeater`;

/* ==================== STRUCTURED DATA ==================== */

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": PAGE_URL,
  name: "Free Text Repeater - CountFlows",
  url: PAGE_URL,
  description: "Free online text repeater to repeat words, text, and emojis up to 10,000 times with customizable separators and copy or download options.",
  image: `${SITE_URL}/og-image.png`,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en",
  author: { "@type": "Organization", name: "CountFlows", url: SITE_URL },
  publisher: { "@type": "Organization", name: "CountFlows", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
  potentialAction: { "@type": "UseAction", target: PAGE_URL },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isAccessibleForFree: true,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Text Repeater", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: textRepeaterFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: faq.answer.trim() },
  })),
};

function StructuredData({ data }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/* ==================== FEATURES ==================== */

const FEATURES = [
  {
    title: "5 Separator Styles",
    description: "Choose a new line, space, comma, dash, or custom separator to format repeated text for your needs.",
    icon: Copy,
  },
  {
    title: "Repeat Up to 10,000 Times",
    description: "Repeat a word, message, paragraph, or emoji using preset counts or your own number up to 10,000.",
    icon: Sparkles,
  },
  {
    title: "Browser-Based Processing",
    description: "Generate repeated text directly in your browser. No account or remote text-processing service is required.",
    icon: ShieldCheck,
  },
];

/* ==================== MAIN PAGE ==================== */

export default function TextRepeaterPage() {
  return (
    <main id="text-repeater-top" className="relative isolate min-h-screen overflow-x-clip bg-gradient-to-b from-white via-white to-cyan-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-white mt-12 md:mt-16">

      {/* Structured Data */}
      <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* Background Decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="relative mx-auto max-w-6xl px-4 pt-4 sm:px-6 md:pt-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          <li><Link href="/" className="hover:text-cyan-700 dark:hover:text-cyan-400">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="hover:text-cyan-700 dark:hover:text-cyan-400">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-slate-800 dark:text-slate-200">Text Repeater</li>
        </ol>
      </nav>

      {/* Hero — Compact Mobile Layout */}
      <header className="relative mx-auto max-w-5xl px-4 pb-6 pt-6 text-center sm:px-6 sm:pt-8 md:pb-9 md:pt-10">

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Free Online Text Repeater
        </div>

        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          Free Text <span className="text-cyan-600 dark:text-cyan-400">Repeater</span>
          <span className="mt-2 block text-lg font-semibold leading-snug text-slate-700 dark:text-slate-200 sm:text-xl lg:text-2xl">
            Repeat Any Text, Word, or Emoji Up to 10,000 Times
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base md:text-lg">
          Repeat text 10, 100, 1,000, or 10,000 times with this free online text repeater.
          Enter a word, message, or emoji, choose the repeat count and separator,
          then copy or download your result.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Up to 10,000 Repeats</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Custom Separators</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Copy or Download</span>
        </div>

      </header>

      {/* Interactive Text Repeater — Existing Tool Preserved */}
      <section aria-label="Online text repeater tool" className="relative z-10">
        <TextRepeaterTool />
      </section>

      {/* Feature Cards */}
      <section aria-label="Text repeater features" className="relative mx-auto max-w-5xl px-4 py-9 sm:px-6 md:py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Existing SEO Content */}
      <SeoContent />

      {/* Blog CTA */}
      <section aria-label="More writing and text guides" className="mx-auto max-w-5xl px-4 py-8 text-center sm:px-6">
        <Link href="/blog" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-200 bg-white px-6 py-3 text-sm font-semibold text-cyan-700 shadow-sm transition-colors hover:border-cyan-300 hover:bg-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-400 dark:hover:bg-slate-800">
          Explore More Articles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      {/* Frequently Asked Questions */}
      <section aria-label="Text repeater frequently asked questions" className="pb-6">
        <FAQ faqs={textRepeaterFAQs} />
      </section>

      {/* Back to Tool */}
      <div className="mx-auto max-w-5xl px-4 pb-14 pt-3 text-center sm:px-6">
        <Link href="#text-repeater-top" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-cyan-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 sm:w-auto">
          Back to Text Repeater
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

    </main>
  );
}