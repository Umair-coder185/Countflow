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
  Eraser,
  Cpu,
  Repeat,
} from "lucide-react";

const SITE = "https://countflows.com";

export const metadata = {
  title: "Free Text Tools: Word, Character, Sentence Counters, AI Text Cleaner, Case Converter, Keyword Density Checker and Syllable Counter",
  description:
    "All CountFlows tools : free word and character counter, sentence counters, , keyword density checker , Ai text cleaner and Ai token counter.",
  openGraph: {
    title: "Free Word, Character & Sentence Counters - Countflows tools",
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
    slug: "counting",
    blurb: "Live counts for words, characters, and sentences as you type.",
    tools: [
      {
        name: "Word Counter",
        slug: "/tools/word-counter",
        icon: Type,
        desc: "Count words, characters, and sentences as you type, with a word goal tracker and a readability score.",
        best: "Essays, blog posts, applications",
        gradient: "from-blue-500 to-cyan-400",
      },
      {
        name: "Character Counter",
        slug: "/tools/character-counter",
        icon: Hash,
        desc: "Count characters with and without spaces, plus letters, lines, and paragraphs, against every major platform limit.",
        best: "Tweets, bios, meta descriptions, SMS",
        gradient: "from-violet-500 to-purple-400",
      },
      {
        name: "Sentence Counter",
        slug: "/tools/sentence-counter",
        icon: ListOrdered,
        desc: "Count sentences and check your average sentence length to keep writing readable.",
        best: "Editing and readability checks",
        gradient: "from-emerald-500 to-teal-400",
      },
      {
        name: "Syllable Counter",
        slug: "/tools/syllable-counter",
        icon: Music4,
        desc: "Count syllables in any word, line, or poem, including the 5-7-5 haiku pattern.",
        best: "Poetry and creative writing",
        gradient: "from-pink-500 to-rose-400",
      },
      {
        name: "AI Token Counter",
        slug: "/tools/ai-token-counter",
        icon: Cpu,
        desc: "Count tokens for ChatGPT, GPT-4, and Claude before you send a prompt, so you never hit a limit or get a surprise bill.",
        best: "AI prompts, API calls, system prompts",
        gradient: "from-amber-500 to-orange-400",
      },
    ],
  },
  {
    name: "Reading & Speech",
    slug: "reading",
    blurb: "Turn a word count into time.",
    tools: [
      {
        name: "Reading Time Calculator",
        slug: "/tools/reading-time",
        icon: Clock3,
        desc: "Estimate reading and speaking time using research-based averages (238 words per minute for silent reading).",
        best: "Articles, speeches, presentations",
        gradient: "from-sky-500 to-blue-400",
      },
    ],
  },
  {
    name: "Text Cleaning & Formatting",
    slug: "cleaning",
    blurb: "Fix formatting in one click.",
    tools: [
      {
        name: "Case Converter",
        slug: "/tools/case-converter",
        icon: CaseSensitive,
        desc: "Convert text to sentence case, Title Case, UPPERCASE, or lowercase without retyping anything.",
        best: "Headlines and pasted text cleanup",
        gradient: "from-indigo-500 to-violet-400",
      },
      {
        name: "AI Text Cleaner",
        slug: "/tools/ai-text-cleaner",
        icon: Sparkles,
        desc: "Remove markdown symbols, em dashes, invisible characters, and smart quotes from ChatGPT and AI text in one click.",
        best: "AI Text issues cleanup",
        gradient: "from-fuchsia-500 to-pink-400",
      },
      {
        name: "Remove Line Breaks",
        slug: "/tools/remove-line-breaks",
        icon: Eraser,
        desc: "Strip unwanted line breaks from text pasted out of PDFs and emails instantly.",
        best: "Pasted text cleanup",
        gradient: "from-lime-500 to-green-400",
      },
    ],
  },
  {
    name: "SEO Tools",
    slug: "seo",
    blurb: "Check your content before Google does.",
    tools: [
      {
        name: "Keyword Density Checker",
        slug: "/tools/keyword-density-checker",
        icon: Percent,
        desc: "Check keyword density by word and phrase, and catch over-optimization before you publish.",
        best: "SEO content and product pages",
        gradient: "from-red-500 to-orange-400",
      },
    ],
  },
  {
    name: "Text Generators",
    slug: "generators",
    blurb: "Generate text for social media, SMS, and more.",
    tools: [
      {
        name: "Text Repeater",
        slug: "/tools/text-repeater",
        icon: Repeat,
        desc: "Repeat a word, phrase, or sentence any number of times, with or without a separator.",
        best: "Social media, SMS, and copywriting",
        gradient: "from-cyan-500 to-blue-400",
      },
    ],
  },
];

const COMING_NEXT = ["Small Text Generator", "SMS Segment Counter"];

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
    <main className="min-h-screen bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-white relative overflow-hidden font-sans">
      {/* Animated Background Orbs — dark mode only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-fuchsia-600/10 blur-[90px] animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={schemaProps()} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6 mt-8">
                <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
                  
                </ol>
              </nav>

        {/* Header */}
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-700 mb-4 sm:mb-6 dark:bg-white/5 dark:border-white/10 dark:text-indigo-300 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            100% Free · No Sign-up · Privacy First
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent hover:opacity-80 dark:from-white dark:via-indigo-200 dark:to-indigo-400">
              CountFlows
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-slate-500 dark:text-slate-400">
              Text Tools
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            A suite of powerful, browser-based text utilities. Paste your text, get instant results.
            Nothing is uploaded, logged, or stored.
          </p>
        </header>

        {/* Tool Categories */}
        {CATEGORIES.map((category) => (
          <section key={category.name} className="mb-12 sm:mb-16">
            <div className="mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{category.name}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">{category.blurb}</p>
            </div>

            <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.slug}
                    className="group relative rounded-2xl bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/10 p-5 sm:p-6 overflow-hidden shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-indigo-500/10"
                  >
                    {/* Gradient Orb */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${tool.gradient} opacity-[0.07] dark:opacity-10 group-hover:opacity-15 dark:group-hover:opacity-20 group-hover:scale-150 transition-all duration-700 blur-2xl`} />

                    {/* Icon */}
                    <div className={`relative mb-4 sm:mb-5 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <h3 className="relative text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {tool.desc}
                    </p>

                    {/* Best For Tag */}
                    <div className="relative mt-3 sm:mt-4 inline-flex items-center rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-slate-500 border border-slate-200 dark:border-white/5 group-hover:border-indigo-300 dark:group-hover:border-indigo-500/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-all duration-300">
                      {tool.best}
                    </div>

                    {/* CTA */}
                    <div className="relative mt-4 sm:mt-5 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      Open tool
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Which Tool Section */}
        <section className="mb-12 sm:mb-16 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Not sure which tool you need?</h2>
          <ul className="space-y-3 sm:space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Essay or assignment with a word limit?</strong> Use the{" "}
                <Link href="/tools/word-counter" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Word Counter</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Platform limit set in characters (X, Instagram, SMS, meta descriptions)?</strong> Use the{" "}
                <Link href="/tools/character-counter" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Character Counter</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Editing for readability?</strong> The{" "}
                <Link href="/tools/sentence-counter" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Sentence Counter</Link> flags long average sentence length, and the{" "}
                <Link href="/tools/reading-time" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Reading Time Calculator</Link> shows how long your draft takes to read.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Publishing SEO content?</strong> Run it through the{" "}
                <Link href="/tools/keyword-density-checker" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Keyword Density Checker</Link> before it goes live.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-fuchsia-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Converting text case?</strong> Run it through the{" "}
                <Link href="/tools/case-converter" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Case Converter</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Writing poetry?</strong> Use the{" "}
                <Link href="/tools/syllable-counter" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Syllable Counter</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Working with AI?</strong> Use the{" "}
                <Link href="/tools/ai-token-counter" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">AI Token Counter</Link> to check your prompt and response token counts before you send it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-slate-200">Pasting text from PDFs or emails?</strong> Use the{" "}
                <Link href="/tools/remove-line-breaks" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">Remove Line Breaks</Link> tool to strip unwanted line breaks instantly.
              </span>
            </li>
          </ul>
        </section>

        {/* Coming Next */}
        <section className="mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Coming soon:{" "}
              {COMING_NEXT.map((item, i) => (
                <span key={item}>
                  <span className="text-slate-900 dark:text-slate-200 font-medium">{item}</span>
                  {i < COMING_NEXT.length - 1 && <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>}
                </span>
              ))}
            </span>
          </div>
        </section>

        {/* Guides */}
        <section className="border-t border-slate-200 dark:border-white/10 pt-10 sm:pt-12">
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Guides that pair with these tools</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
            {GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 sm:p-5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                {guide.title}
                <div className="mt-3 flex items-center text-xs text-slate-500 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Read guide
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 sm:mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-white/5 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm transition hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-white/10 hover:text-indigo-700 dark:hover:text-indigo-300"
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