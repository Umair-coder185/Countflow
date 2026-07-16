import Link from "next/link";
import {
  Type,
  Hash,
  ListOrdered,
  Clock3,
  Percent,
  CaseSensitive,
  ArrowRight,
  BookOpen,
  Sparkles,
  Music4,
} from "lucide-react";

const SITE = "https://countflows.com";

export const metadata = {
  title: "Free Text Tools: Word, Character & Sentence Counters",
  description:
    "All CountFlows tools in one place: word, character, and sentence counters, reading time calculator, case converter, and keyword density checker. Free and private.",
  alternates: { canonical: `${SITE}/tools` },
  openGraph: {
    title: " Free Word, Character & Sentence Counters - Countflows tools",
    description:
      "Every CountFlows text tool on one page. Pick a tool, paste your text, get instant results. Nothing is uploaded.",
    url: `${SITE}/tools`,
    siteName: "CountFlows",
    type: "website",
  },
};

const CATEGORIES = [
  {
    name: "Counting Tools",
    blurb: "Live counts for words, characters, and sentences as you type.",
    tools: [
      {
        name: "Word Counter",
        slug: "/tools/word-counter",
        icon: Type,
        desc: "Count words, characters, and sentences as you type, with a word goal tracker and a readability score.",
        best: "Essays, blog posts, applications",
      },
      {
        name: "Character Counter",
        slug: "/tools/character-counter",
        icon: Hash,
        desc: "Count characters with and without spaces, plus letters, lines, and paragraphs, against every major platform limit.",
        best: "Tweets, bios, meta descriptions, SMS",
      },
      {
        name: "Sentence Counter",
        slug: "/tools/sentence-counter",
        icon: ListOrdered,
        desc: "Count sentences and check your average sentence length to keep writing readable.",
        best: "Editing and readability checks",
      },
      {
        name: "Syllable Counter",
        slug: "/tools/syllable-counter",
        icon: Music4,
        desc: "Count syllables in any word, line, or poem, including the 5-7-5 haiku pattern.",
        best: "Poetry and creative writing",
      }
    ],
  },
  {
    name: "Reading & Speech",
    blurb: "Turn a word count into time.",
    tools: [
      {
        name: "Reading Time Calculator",
        slug: "/tools/reading-time",
        icon: Clock3,
        desc: "Estimate reading and speaking time using research-based averages (238 words per minute for silent reading).",
        best: "Articles, speeches, presentations",
      },
    ],
  },
  {
    name: "Text Cleaning & Formatting",
    blurb: "Fix formatting in one click.",
    tools: [
      {
        name: "Case Converter",
        slug: "/tools/case-converter",
        icon: CaseSensitive,
        desc: "Convert text to sentence case, Title Case, UPPERCASE, or lowercase without retyping anything.",
        best: "Headlines and pasted text cleanup",
      },

      {
        name: "AI Text Cleaner",
        slug: "/tools/ai-text-cleaner",
        icon: Sparkles,
        desc:
          "Remove markdown symbols, em dashes, invisible characters, and smart quotes from ChatGPT and AI text in one click.",
        best: "Ai Text issues cleanup",
      },
    ],
  },
  {
    name: "SEO Tools",
    blurb: "Check your content before Google does.",
    tools: [
      {
        name: "Keyword Density Checker",
        slug: "/tools/keyword-density-checker",
        icon: Percent,
        desc: "Check keyword density by word and phrase, and catch over-optimization before you publish.",
        best: "SEO content and product pages",
      },
    ],
  },
];

const COMING_NEXT = ["AI Token Counter", "Small Text Generator", "SMS Segment Counter"];

const GUIDES = [
  { title: "How to Manage Essay Word Count", href: "/blog/manage-essay-word-count" },
  { title: "Cover Letter Word Count: What Recruiters Expect", href: "/blog/cover-letter-word-count" },
  { title: "How Long Should a Blog Post Be?", href: "/blog/how-long-should-a-blog-post-be" },
];

const ALL_TOOLS = CATEGORIES.flatMap((c) => c.tools);

function schemaProps() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "CountFlows Text Tools",
        url: `${SITE}/tools`,
        description:
          "Free browser-based text tools: word counter, character counter, sentence counter, reading time calculator, case converter, and keyword density checker.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: ALL_TOOLS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.name,
            url: `${SITE}${t.slug}`,
          })),
        },
      },
    ],
  };
  return { __html: JSON.stringify(data) };
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 mt-12 md:mt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaProps()} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-slate-900 dark:text-slate-100">
              Tools
            </li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="mb-3 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            100% free · No sign-up · Text stays in your browser
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All CountFlows Text Tools</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Pick a tool and paste your text. Every counter and converter below runs instantly in
            your browser, and nothing is uploaded, logged, or stored.
          </p>
        </header>

        {CATEGORIES.map((category) => (
          <section key={category.name} className="mt-12">
            <h2 className="text-xl font-semibold sm:text-2xl">{category.name}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.blurb}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.slug}
                    className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {tool.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {tool.desc}
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                      Best for: {tool.best}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      Open tool
                      <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Not sure which tool you need?</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <li>
              <strong className="text-slate-900 dark:text-slate-100">
                Essay or assignment with a word limit?
              </strong>{" "}
              Use the{" "}
              <Link
                href="/tools/word-counter"
                className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
              >
                Word Counter
              </Link>
              .
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">
                Platform limit set in characters (X, Instagram, SMS, meta descriptions)?
              </strong>{" "}
              Use the{" "}
              <Link
                href="/tools/character-counter"
                className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
              >
                Character Counter
              </Link>
              .
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Editing for readability?</strong>{" "}
              The{" "}
              <Link
                href="/tools/sentence-counter"
                className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
              >
                Sentence Counter
              </Link>{" "}
              flags a long average sentence length, and the{" "}
              <Link
                href="/tools/reading-time"
                className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
              >
                Reading Time Calculator
              </Link>{" "}
              shows how long your draft takes to read.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Publishing SEO content?</strong>{" "}
              Run it through the{" "}
              <Link
                href="/tools/keyword-density-checker"
                className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
              >
                Keyword Density Checker
              </Link>{" "}
              before it goes live.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Converting text case?</strong>{" "}
              Run it through the{" "}
              <Link
                href="/tools/case-converter"
                className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
              >
                Case Converter
              </Link>{" "}
              before it goes live.
              
            </li>
            <li>
              <strong className="text-slate-900 dark:text-slate-100">Writing poetry?</strong>{" "}
              Use the{" "}
              <Link
                href="/tools/syllable-counter"
                className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
              >
                Syllable Counter
              </Link>
              .
            </li>
            

          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold sm:text-2xl">Coming next</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {COMING_NEXT.join(" · ")}. No email list and no waiting page. New tools simply appear
            here when they are ready.
          </p>
        </section>

        <section className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <h2 className="text-xl font-semibold sm:text-2xl">Guides that pair with these tools</h2>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {GUIDES.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-900 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
                >
                  {guide.title}
                </Link>
              </li>


            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm shadow-slate-200 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
            >
              All guides
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}