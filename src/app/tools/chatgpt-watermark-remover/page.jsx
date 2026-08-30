import Link from "next/link"
import { Eye, ScanSearch, ShieldCheck } from "lucide-react"

import WatermarkRemoverTool from "@/components/chatgpt-watermark-remover/WatermarkRemoverTool"
import SEOContent from "@/components/chatgpt-watermark-seo/SEOContent"

const SITE = "https://countflows.com"
const PAGE_URL = `${SITE}/tools/chatgpt-watermark-remover`

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${PAGE_URL}#webapp`,
  name: "ChatGPT Watermark Remover",
  alternateName: "ChatGPT Watermark Checker",
  url: PAGE_URL,
  description: "Scan ChatGPT text for hidden Unicode characters, zero-width characters, unusual spaces, directional controls and copy-paste artifacts, then selectively remove or normalize supported characters.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with JavaScript enabled.",
  inLanguage: "en",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "ChatGPT watermark checking",
    "Hidden Unicode detection",
    "Zero-width character detection",
    "Unusual space detection",
    "Directional control detection",
    "Unicode code point inspection",
    "Character position reporting",
    "X-Ray character preview",
    "Selective character cleanup",
    "Typography inspection",
    "Clipboard markup inspection",
    "Browser-based processing",
  ],
  provider: {
    "@type": "Organization",
    name: "CountFlows",
    url: SITE,
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "ChatGPT Watermark Remover", item: PAGE_URL },
  ],
}

const jsonLd = (data) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") })

export default function ChatGPTWatermarkRemoverPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webAppSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <div className="bg-gradient-to-b from-cyan-50/80 via-white to-white dark:from-cyan-950/20 dark:via-slate-950 dark:to-slate-950">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
            <Link href="/" className="transition hover:text-cyan-600 dark:hover:text-cyan-400">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/tools" className="transition hover:text-cyan-600 dark:hover:text-cyan-400">Tools</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-700 dark:text-slate-300">ChatGPT Watermark Remover</span>
          </nav>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm dark:border-cyan-900/60 dark:bg-slate-900/80 dark:text-cyan-300">
              <ShieldCheck size={16} aria-hidden="true" />
              Browser-based Unicode scanner
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              ChatGPT{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Watermark Remover
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg dark:text-slate-300">
              Scan ChatGPT text for hidden Unicode characters, zero-width marks, unusual spaces and copy-paste artifacts. See exactly what was found before you remove anything.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Badge icon={ScanSearch}>Unicode scanner</Badge>
              <Badge icon={Eye}>X-Ray character view</Badge>
              <Badge icon={ShieldCheck}>No AI API required</Badge>
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="watermark-tool-heading" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 id="watermark-tool-heading" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ChatGPT Watermark Checker & Remover</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base dark:text-slate-400">Paste your text, scan it, inspect each Unicode finding and choose which character types should be removed or normalized.</p>
        </div>

        <WatermarkRemoverTool />

        <p className="mx-auto mt-4 max-w-4xl text-center text-xs leading-5 text-gray-500 dark:text-slate-500">This tool detects supported character-level artifacts. It does not claim that a detected character is an official OpenAI text watermark or prove that the text was generated by AI.</p>
      </section>

      <SEOContent />
    </main>
  )
}

function Badge({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
      <Icon size={14} className="text-cyan-500" aria-hidden="true" />
      {children}
    </span>
  )
}