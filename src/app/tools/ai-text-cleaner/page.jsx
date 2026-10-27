import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { aiTextCleanerFAQs } from "@/lib/faqData";
import FAQ from "@/components/FAQ";
import SeoContent from "@/components/ai-text-cleaner/SeoContent";
import CleanerTool from "@/components/ai-text-cleaner/CleanerTool";

const PAGE_URL =
  "https://countflows.com/tools/ai-text-cleaner";

const FEATURES = [
  {
    title: "14 Customizable Cleaning Options",
    description:
      "Remove Markdown, hidden characters, unusual spacing, smart punctuation, HTML, emojis and more. Choose exactly which rules to apply.",
  },
  {
    title: "Clean Text Without Rewriting",
    description:
      "Remove formatting artifacts while keeping your original wording. Optional transformations remain under your control.",
  },
  {
    title: "Browser-Based Processing",
    description:
      "The cleaning rules run directly in your browser. No account or remote AI processing is required.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": PAGE_URL,
  name: "Free AI Text Cleaner",
  url: PAGE_URL,
  description:
    "A free browser-based text cleaner for removing ChatGPT formatting, Markdown, hidden characters, em dashes, and unwanted spacing.",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "All",
  inLanguage: "en",
  image: "https://countflows.com/og-image.png",
  author: {
    "@type": "Organization",
    name: "CountFlows",
    url: "https://countflows.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
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
      name: "AI Text Cleaner",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aiTextCleanerFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question.trim(),
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.trim(),
    },
  })),
};

function StructuredData({ data }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default function AiTextCleanerPage() {
  return (
    <main
      id="ai-text-cleaner-top"
      className="
        relative isolate min-h-screen
        overflow-x-clip
        bg-gradient-to-b
        from-white via-white to-cyan-50
        text-slate-900
        dark:from-slate-950
        dark:via-slate-950
        dark:to-slate-900
        dark:text-white
        mt-12 md:mt-16
      "
    >
      <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="
          mx-auto max-w-6xl
          px-4 pt-4
          sm:px-6 md:pt-6
          lg:px-8
        "
      >
        <ol
          className="
            flex flex-wrap items-center
            gap-x-2 gap-y-1
            text-xs text-slate-500
            dark:text-slate-400 sm:text-sm
          "
        >
          <li>
            <Link
              href="/"
              className="hover:text-cyan-600"
            >
              Home
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link
              href="/tools"
              className="hover:text-cyan-600"
            >
              Tools
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li
            aria-current="page"
            className="
              font-semibold text-slate-800
              dark:text-slate-200
            "
          >
            AI Text Cleaner
          </li>
        </ol>
      </nav>

      {/* Compact, mobile-first hero */}
      <header
        className="
          relative mx-auto max-w-5xl
          px-4 pb-6 pt-6
          text-center
          sm:px-6 sm:pt-8
          md:pb-9 md:pt-10
        "
      >
        <div
          className="
            mb-4 inline-flex items-center gap-2
            rounded-full border border-cyan-200
            bg-cyan-50 px-3 py-1.5
            text-xs font-semibold text-cyan-800
            dark:border-cyan-800
            dark:bg-cyan-950/40
            dark:text-cyan-300
          "
        >
          <Sparkles
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />
          Free Online AI Text Cleaner
        </div>

        <h1
          className="
            text-balance
            text-3xl font-extrabold
            tracking-tight text-slate-950
            dark:text-white
            sm:text-4xl
            lg:text-5xl
          "
        >
          Free AI Text{" "}
          <span
            className="
              bg-gradient-to-r
              from-cyan-600 to-blue-600
              bg-clip-text text-transparent
              dark:from-cyan-400
              dark:to-blue-400
            "
          >
            Cleaner
          </span>
        </h1>

        <p
          className="
            mx-auto mt-3 max-w-3xl
            text-base font-semibold
            leading-relaxed text-slate-700
            dark:text-slate-200
            sm:text-lg md:text-xl
          "
        >
          Clean ChatGPT Text, Remove Markdown
          and Fix Unwanted Formatting
        </p>

        <p
          className="
            mx-auto mt-3 max-w-3xl
            text-sm leading-6 text-slate-600
            dark:text-slate-400
            sm:text-base sm:leading-7
          "
        >
          Paste text copied from ChatGPT, Claude,
          Gemini or another editor. Remove Markdown
          symbols, hidden characters, unwanted
          spaces and smart punctuation without
          automatically rewriting your sentences.
        </p>

        <div
          className="
            mt-5 flex flex-wrap
            items-center justify-center
            gap-x-4 gap-y-2
            text-xs font-medium
            text-slate-600
            dark:text-slate-300
            sm:text-sm
          "
        >
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2
              className="h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
            14 Cleaning Options
          </span>

          <span className="inline-flex items-center gap-1.5">
            <LockKeyhole
              className="h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
            Browser-Based
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2
              className="h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
            No Sign-up
          </span>
        </div>
      </header>

      {/* Main interactive tool */}
      <section
        aria-label="AI text cleaning tool"
        className="
          relative z-10 mx-auto
          max-w-6xl px-3
          sm:px-5 lg:px-8
        "
      >
        <CleanerTool />
      </section>

      {/* Product benefits */}
      <section
        aria-label="AI text cleaner features"
        className="
          mx-auto max-w-6xl
          px-4 py-9
          sm:px-6 md:py-12
          lg:px-8
        "
      >
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="
                rounded-2xl border
                border-slate-200 bg-white
                p-5 shadow-sm
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <h2
                className="
                  text-base font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {feature.title}
              </h2>

              <p
                className="
                  mt-2 text-sm leading-7
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Search-focused educational content */}
      <SeoContent />

      {/* Related articles */}
      <section
        aria-label="Related AI text cleaning guides"
        className="
          mx-auto max-w-4xl
          px-4 py-8
          sm:px-6
        "
      >
        <div
          className="
            rounded-2xl border
            border-cyan-200
            bg-white p-5
            dark:border-cyan-900
            dark:bg-slate-900
            sm:p-6
          "
        >
          <h2
            className="
              text-lg font-bold
              text-slate-900
              dark:text-white
            "
          >
            More Help With AI Text Formatting
          </h2>

          <p
            className="
              mt-2 text-sm leading-7
              text-slate-600
              dark:text-slate-300
            "
          >
            Learn how to remove ChatGPT formatting,
            understand common text artifacts and
            choose the right cleanup tools.
          </p>

          <div
            className="
              mt-4 flex flex-col
              items-start gap-3 sm:flex-row
              sm:flex-wrap
            "
          >
            <Link
              href="/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text"
              className="
                inline-flex items-center gap-2
                font-semibold text-cyan-700
                hover:underline
                dark:text-cyan-400
              "
            >
              Remove ChatGPT Formatting
              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/blog/cleanpaste-site-alternatives"
              className="
                inline-flex items-center gap-2
                font-semibold text-cyan-700
                hover:underline
                dark:text-cyan-400
              "
            >
              CleanPaste Alternatives
              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently asked questions */}
      <section className="pb-6">
        <FAQ faqs={aiTextCleanerFAQs} />
      </section>

      {/* Return to tool */}
      <div
        className="
          mx-auto max-w-6xl
          px-4 pb-14 pt-3
          text-center
        "
      >
        <Link
          href="#ai-text-cleaner-top"
          className="
            inline-flex min-h-11
            items-center justify-center
            gap-2 rounded-full
            bg-cyan-700 px-6 py-3
            text-sm font-bold text-white
            transition-colors
            hover:bg-cyan-800
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-cyan-600
          "
        >
          Back to AI Text Cleaner
          <ArrowRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Link>
      </div>
    </main>
  );
}