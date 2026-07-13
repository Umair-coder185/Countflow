import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { caseConverterFAQs } from "@/lib/faqData"
import FAQ from "@/components/FAQ"
import SeoContent from "@/components/case-converter-seo/SeoContent"
import CaseConverterTool from "@/components/case-converter/CaseConverterTool"

const FEATURES = [
    { title: "7 case styles", description: "Sentence, lower, UPPER, Title, Capitalized, aLtErNaTiNg, and InVeRsE — one click each." },
    { title: "Instant and unlimited", description: "Convert a headline or an entire chapter. No word limit, no sign-up, no waiting." },
    { title: "100% private", description: "All conversion happens in your browser. Your text is never uploaded, logged, or stored." },
]

export default function CaseConverterPage() {
    return (
        <main
            id="case-converter-top"
            className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50
                dark:from-gray-950 dark:to-gray-800 min-h-screen md:mt-12 dark:text-white mt-12 md:mt-16"
        >
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20 mt-12 md:mt-16" />
            <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20 mt-12 md:mt-16" />
            <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
                <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
                    <li aria-hidden="true">/</li>
                    <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">Case Converter</li>
                </ol>
            </nav>
            {/* Hero Section — server-rendered, fully crawlable */}
            <section className="max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-14 text-center relative">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-3">
                    Case <span className="text-cyan-500">Converter</span>
                    <span className="block mt-2 text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
                        Change Text to Sentence Case, Title Case or UPPERCASE
                    </span>
                </h1>
                <p className="mx-auto mt-2 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
                    Paste your text, click a case style, and copy the result. This free online
                    text case converter fixes caps lock accidents, formats headlines, and cleans
                    up text in one click.
                </p>
            </section>

            {/* Tool Box — the only client island on the page */}
            <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12 ">
                <CaseConverterTool />
            </section>

            {/* Feature cards */}
            <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
                <div className="mt-2 grid gap-4 sm:grid-cols-3">
                    {FEATURES.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
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
                <FAQ faqs={caseConverterFAQs} />
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
                <Link
                    href="#case-converter-top"
                    className="inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
                >
                    Back to top
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </main>
    )
}