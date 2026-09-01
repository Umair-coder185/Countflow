import Link from "next/link"
import { ChevronRight, Eye, ScanSearch, ShieldCheck } from "lucide-react"
import InvisibleCharacterTool from "@/components/invisible-character-detector/InvisibleCharacterTool"
import SEOContent from "@/components/invisible-character-seo/SEOContent"

const pageUrl = "https://countflows.com/tools/invisible-character-detector"

const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Invisible Character Detector",
    url: pageUrl,
    description: "Detect invisible Unicode characters, zero-width spaces, unusual spaces and directional controls. Review exact code points, counts and positions before removing selected characters.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser with JavaScript enabled.",
    isAccessibleForFree: true,
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    featureList: [
        "Detect invisible Unicode characters",
        "Find zero-width spaces",
        "Identify unusual Unicode spaces",
        "Show Unicode code points and character names",
        "Show exact character positions",
        "X-Ray hidden-character preview",
        "Selective character cleanup",
        "Browser-based processing",
    ],
}

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://countflows.com/",
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
            name: "Invisible Character Detector",
            item: pageUrl,
        },
    ],
}

export default function InvisibleCharacterDetectorPage() {
    return (
        <>
            <main className="relative mt-12 min-h-screen overflow-hidden bg-gradient-to-b from-white to-cyan-50 text-gray-900 dark:from-gray-950 dark:to-gray-800 dark:text-white md:mt-16">
                <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
                <div className="pointer-events-none absolute right-0 top-1/3 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

                <section className="relative overflow-hidden">
                    <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 md:px-8 md:pt-8 lg:px-8">
                        <nav aria-label="Breadcrumb" className="relative mx-auto mb-7 max-w-6xl">
                            <ol className="flex flex-wrap items-center gap-y-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                                <li className="flex items-center">
                                    <Link href="/" className="-mx-1 inline-flex min-h-[44px] items-center px-1 transition-colors hover:text-cyan-600 sm:min-h-0">Home</Link>
                                </li>
                                <li aria-hidden="true" className="flex shrink-0 items-center px-0.5 text-gray-400 dark:text-slate-500">
                                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </li>
                                <li className="flex items-center">
                                    <Link href="/tools" className="-mx-1 inline-flex min-h-[44px] items-center px-1 transition-colors hover:text-cyan-600 sm:min-h-0">Tools</Link>
                                </li>
                                <li aria-hidden="true" className="flex shrink-0 items-center px-0.5 text-gray-400 dark:text-slate-500">
                                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </li>
                                <li aria-current="page" className="flex max-w-[60vw] items-center truncate font-medium text-gray-800 dark:text-gray-200 sm:max-w-none">
                                    Invisible Character Detector
                                </li>
                            </ol>
                        </nav>

                        <div className="mx-auto max-w-4xl text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700 shadow-sm dark:border-cyan-900/60 dark:bg-cyan-950/40 dark:text-cyan-300">
                                <ScanSearch size={27} aria-hidden="true" />
                            </div>

                            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                                Invisible
                                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                                    {" Character Detector"}
                                </span>
                            </h1>

                            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-slate-400">
                                Find invisible Unicode characters, zero-width spaces and unusual spaces in your text. See the exact character, code point, count and position before removing anything.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                                <TrustBadge icon={Eye}>Exact Unicode details</TrustBadge>
                                <TrustBadge icon={ScanSearch}>X-Ray hidden characters</TrustBadge>
                                <TrustBadge icon={ShieldCheck}>Runs in your browser</TrustBadge>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                            Detect and Remove Invisible Characters
                        </h2>

                        <p className="mt-3 max-w-3xl leading-7 text-gray-600 dark:text-slate-400">
                            Paste your text below to scan for supported hidden Unicode characters. Review the X-Ray view and findings, then remove or normalize only the character types you choose.
                        </p>
                    </div>

                    <InvisibleCharacterTool />

                    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
                        <strong className="text-gray-900 dark:text-white">Important:</strong>{" "}
                        Not every invisible character is unwanted. Some Unicode joiners and directional controls have legitimate uses in languages, emoji and bidirectional text, so CountFlows does not automatically select sensitive characters for removal.
                    </div>
                </section>
            </main>

            <SEOContent />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
    )
}

function TrustBadge({ icon: Icon, children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
            <Icon size={15} className="text-cyan-600 dark:text-cyan-300" aria-hidden="true" />
            {children}
        </span>
    )
}