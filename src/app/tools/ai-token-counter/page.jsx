import Link from "next/link"
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react"
import { aitokenCounterFAQs } from "@/lib/faqData"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/ai-token-counter/SeoContent"
import TokenCounterTool from "@/components/ai-token-counter/TokenCounterTool"


const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://countflows.com/tools/ai-token-counter",
  name: "AI Token Counter & Cost Calculator - CountFlows",
  url: "https://countflows.com/tools/ai-token-counter",
  description:
    "Free online AI token counter and cost calculator for GPT, Claude, and Gemini. Estimate token count, API cost, context window usage, and monthly budget directly in your browser.",
  image: "https://countflows.com/og-image.png",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  inLanguage: "en-US",
  datePublished: "2026-07-14",
  dateModified: "2026-08-15",
  author: { "@type": "Organization", name: "CountFlows", url: "https://countflows.com", logo: "https://countflows.com/logo.png" },
  publisher: { "@type": "Organization", name: "CountFlows", logo: { "@type": "ImageObject", url: "https://countflows.com/logo.png" } },
  potentialAction: { "@type": "UseAction", target: "https://countflows.com/tools/ai-token-counter" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  isAccessibleForFree: true,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://countflows.com" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://countflows.com/tools" },
    { "@type": "ListItem", position: 3, name: "AI Token Counter", item: "https://countflows.com/tools/ai-token-counter" },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aitokenCounterFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
}

const BENEFITS = [
  { icon: Sparkles, title: "Instant token estimate", description: "Paste a prompt and see token, word, and character counts without leaving the page." },
  { icon: BadgeCheck, title: "Cost + context clarity", description: "Estimate API cost, context usage, and compare supported models before you spend credits." },
  { icon: ShieldCheck, title: "Private by design", description: "Your prompt is processed locally in your browser and is not uploaded or stored." },
]

export default function AiTokenCounterPage() {
  return (
    <main id="ai-token-counter-top" className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-cyan-50/70 pt-16 text-gray-950 dark:from-gray-950 dark:via-gray-950 dark:to-slate-900 dark:text-white">
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
      <div className="pointer-events-none absolute right-[-5rem] top-[28rem] h-72 w-72 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-500/10" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav aria-label="Breadcrumb" className="relative mx-auto max-w-6xl px-4 pt-5 md:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="transition hover:text-cyan-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="transition hover:text-cyan-600">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">AI Token Counter</li>
        </ol>
      </nav>

      <section className="relative mx-auto max-w-5xl px-4 pb-8 pt-10 text-center md:px-8 md:pb-10 md:pt-14">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" />
          Tokens, cost, context — one clear answer
        </div>

        <h1 className="text-3xl font-black tracking-tight text-gray-950 md:text-5xl dark:text-white">
          Free AI Token Counter <span className="text-cyan-600 dark:text-cyan-400">&amp; Cost Calculator</span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 md:text-lg md:leading-8 dark:text-gray-300">
          Paste a prompt to estimate its token count, API cost, context usage, and the cheapest supported model across GPT, Claude, and Gemini — instantly in your browser.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" />No sign-up</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" />Runs locally</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" />Free to use</span>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-10 md:px-8 md:pb-14">
        <TokenCounterTool />
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-gray-200 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/75">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300">
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-gray-950 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <SeoContent />

      <div className="mx-auto mt-10 max-w-6xl px-4 text-center md:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900">
          Read AI cost &amp; token guides
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mb-16 mt-8">
        <FAQ faqs={aitokenCounterFAQs} />
      </div>

      <div className="mx-auto mb-14 max-w-6xl px-4 md:px-8">
        <Link href="#ai-token-counter-top" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700 sm:w-auto">
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}