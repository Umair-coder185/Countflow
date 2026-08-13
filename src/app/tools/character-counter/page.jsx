// app/tools/character-counter/page.jsx
// SERVER COMPONENT
// Do NOT add "use client" here.

import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Globe2,
  LockKeyhole,
  MessageSquareText,
  Sparkles,
  Type,
} from "lucide-react"

import CharacterCounterTool from "@/components/character-counter/CharacterCounterTool"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/Character-counter-seo/SeoContent"
import { characterCounterFAQs } from "@/lib/faqData"

const SITE = "https://countflows.com"
const PAGE_URL = `${SITE}/tools/character-counter`

/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */

export const metadata = {
  title: "Free Character Counter – Count Characters Online | CountFlows",

  description:
    "Free character counter for Unicode, social media limits, SMS segments, words, emojis and more. Fast, private and browser-based.",

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Free Character Counter – Count Characters Online",
    description:
      "Count characters, words, Unicode, social media limits, SMS segments, emojis and more instantly with CountFlows.",
    siteName: "CountFlows",

    images: [
      {
        url: `${SITE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CountFlows Character Counter and platform limit analyzer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Character Counter – Count Characters Online",
    description:
      "Count characters, words, Unicode, social limits and SMS segments instantly.",
    images: [`${SITE}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
  },
}

/* -------------------------------------------------------------------------- */
/*                              STRUCTURED DATA                               */
/* -------------------------------------------------------------------------- */

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",

  "@id": `${PAGE_URL}#software`,
  name: "CountFlows Character Counter",
  url: PAGE_URL,

  description:
    "Free browser-based character counter for counting Unicode characters, words, social media limits, SMS segments, emojis, hashtags, mentions, URLs and text statistics.",

  image: `${SITE}/og-image.png`,

  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en-US",

  datePublished: "2026-05-21",
  dateModified: "2026-08-13",

  featureList: [
    "Character counting",
    "Characters without spaces",
    "Unicode grapheme counting",
    "Platform character limit checker",
    "SMS segment calculator",
    "Word counting",
    "Sentence counting",
    "Paragraph counting",
    "Emoji counting",
    "Hashtag counting",
    "Mention counting",
    "URL counting",
    "UTF-8 byte counting",
    "Character goal tracking",
    "Text cleanup",
  ],

  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },

  author: {
    "@type": "Organization",
    name: "CountFlows",
    url: SITE,
  },
}

/*
  /tools currently 404 ho to fake breadcrumb mat banao.

  Isliye:
  Home > Character Counter

  Agar future mein /tools live ho jaye, tab beech mein Tools add kar dena.
*/
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Character Counter",
      item: PAGE_URL,
    },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: characterCounterFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question.trim(),

    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.trim(),
    },
  })),
}

/*
  Escaping "<" is a small hardening improvement when JSON is
  inserted inside an HTML <script> element.
*/
const jsonLd = (data) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
})

/* -------------------------------------------------------------------------- */
/*                              FEATURE CARDS                                 */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  {
    icon: Type,
    title: "Unicode-aware counting",
    description:
      "Count user-visible characters more accurately, including complex emoji and multilingual text.",
  },
  {
    icon: Globe2,
    title: "Platform limit analyzer",
    description:
      "Check one piece of text against major social, video, SEO and advertising formats.",
  },
  {
    icon: MessageSquareText,
    title: "SMS segment analysis",
    description:
      "Detect GSM-7 or Unicode text and estimate how many SMS segments your message needs.",
  },
  {
    icon: Gauge,
    title: "Advanced text statistics",
    description:
      "Inspect words, sentences, paragraphs, URLs, hashtags, emojis, bytes and text composition.",
  },
  {
    icon: LockKeyhole,
    title: "Private browser processing",
    description:
      "The character and text calculations run locally in the browser without a counting API.",
  },
  {
    icon: Sparkles,
    title: "Writing cleanup tools",
    description:
      "Remove repeated spacing and spot formatting problems before publishing your copy.",
  },
]

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function CharacterCounterPage() {
  return (
    <main
      id="character-counter-top"
      className="
        relative min-h-screen overflow-hidden
        bg-gradient-to-b
        from-white via-white to-cyan-50
        pt-16
        text-gray-950
        dark:from-gray-950 dark:via-gray-950 dark:to-gray-900
        dark:text-white
        md:pt-20
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-0
          h-[28rem] w-[28rem] -translate-x-1/2
          rounded-full bg-cyan-200/30 blur-3xl
          dark:bg-cyan-500/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[-8rem] top-[35rem]
          h-[26rem] w-[26rem]
          rounded-full bg-sky-200/30 blur-3xl
          dark:bg-sky-500/10
        "
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(appSchema)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema)}
      />

      {/* ------------------------------------------------------------------ */}
      {/* BREADCRUMB                                                         */}
      {/* ------------------------------------------------------------------ */}

      <nav
        aria-label="Breadcrumb"
        className="relative mx-auto max-w-6xl px-4 pt-5 md:px-8"
      >
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link
              href="/"
              className="transition hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              Home
            </Link>
          </li>

          <li aria-hidden="true" className="text-gray-300 dark:text-gray-700">
            /
          </li>

          <li
            aria-current="page"
            className="font-medium text-gray-800 dark:text-gray-200"
          >
            Character Counter
          </li>
        </ol>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative mx-auto max-w-5xl px-4 pb-10 pt-10 text-center md:px-8 md:pb-14 md:pt-14">
        <div
          className="
            mx-auto inline-flex items-center gap-2
            rounded-full border border-cyan-200
            bg-white/80 px-4 py-2
            text-xs font-semibold text-cyan-700
            shadow-sm backdrop-blur
            dark:border-cyan-900
            dark:bg-cyan-950/30
            dark:text-cyan-300
          "
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />

          Character counter + platform analyzer
        </div>

        <h1
          className="
            mx-auto mt-5 max-w-4xl
            text-3xl font-black tracking-tight
            text-gray-950
            dark:text-white
            sm:text-4xl md:text-5xl
          "
        >
          Free Character{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
            Counter
          </span>
        </h1>

        <p
          className="
            mx-auto mt-5 max-w-3xl
            text-base leading-8
            text-gray-600
            dark:text-gray-300
            md:text-lg
          "
        >
          Count characters, words, Unicode, emojis, hashtags and URLs while
          checking your copy against social media, SEO, advertising and SMS
          limits. Everything updates instantly in your browser.
        </p>

        {/* Trust chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <TrustChip text="No signup" />

          <TrustChip text="Browser-based" />

          <TrustChip text="Unicode-aware" />

          <TrustChip text="Instant results" />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN INTERACTIVE TOOL                                              */}
      {/* ------------------------------------------------------------------ */}

      <CharacterCounterTool />

      {/* ------------------------------------------------------------------ */}
      {/* VALUE PROPOSITION                                                  */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
            More than a basic counter
          </p>

          <h2 className="mt-3 text-2xl font-black tracking-tight text-gray-950 dark:text-white md:text-3xl">
            One text box. Multiple publishing checks.
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
            Instead of opening separate tools for characters, platform limits,
            SMS length and text statistics, CountFlows analyzes them together
            while you write.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="
                group rounded-3xl
                border border-gray-200
                bg-white/90 p-6
                shadow-lg shadow-slate-200/40
                transition
                hover:-translate-y-1
                hover:border-cyan-300
                hover:shadow-xl
                dark:border-gray-800
                dark:bg-gray-900/80
                dark:shadow-black/20
                dark:hover:border-cyan-800
              "
            >
              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl bg-cyan-50
                  text-cyan-600
                  transition
                  group-hover:bg-cyan-100
                  dark:bg-cyan-950/40
                  dark:text-cyan-300
                "
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* EXISTING SEO CONTENT                                               */}
      {/* ------------------------------------------------------------------ */}

      <SeoContent />

      {/* ------------------------------------------------------------------ */}
      {/* BLOG CTA                                                           */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative mx-auto max-w-5xl px-4 py-10 text-center md:px-8">
        <Link
          href="/blog"
          className="
            inline-flex items-center gap-2
            rounded-full border border-cyan-200
            bg-white px-6 py-3
            text-sm font-bold text-cyan-700
            shadow-sm
            transition
            hover:border-cyan-300
            hover:bg-cyan-50
            dark:border-gray-700
            dark:bg-gray-900
            dark:text-cyan-300
            dark:hover:border-cyan-700
            dark:hover:bg-cyan-950/20
          "
        >
          Explore all writing guides

          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative mb-16">
        <FAQ faqs={characterCounterFAQs} />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BACK TO TOP                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative mx-auto mb-16 max-w-6xl px-4 md:px-8">
        <Link
          href="#character-counter-top"
          className="
            inline-flex w-full items-center justify-center gap-2
            rounded-full bg-cyan-600
            px-5 py-3
            font-semibold text-white
            shadow-lg shadow-cyan-500/20
            transition
            hover:bg-cyan-700
            sm:w-auto
          "
        >
          Back to top

          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/*                            SMALL SERVER COMPONENT                          */
/* -------------------------------------------------------------------------- */

function TrustChip({ text }) {
  return (
    <span
      className="
        inline-flex items-center gap-1.5
        rounded-full border border-gray-200
        bg-white/70 px-3 py-1.5
        text-xs font-medium text-gray-600
        shadow-sm backdrop-blur
        dark:border-gray-800
        dark:bg-gray-900/60
        dark:text-gray-300
      "
    >
      <CheckCircle2
        className="h-3.5 w-3.5 text-cyan-500"
        aria-hidden="true"
      />

      {text}
    </span>
  )
}