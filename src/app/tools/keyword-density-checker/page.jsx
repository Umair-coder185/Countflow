"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "@/lib/no-motion";
import { ArrowRight, Copy, Trash, Download, Search } from "lucide-react";
import { keywordDensityFAQs } from "@/lib/faqData";
import FAQ from "@/components/FAQ";
import SEOContent from "@/components/keyword-density-checker-seo/SeoContent";

// Common English stop words (toggle to ignore them)
const STOP_WORDS = new Set(
  `a about above after again against all am an and any are aren't as at be because
  been before being below between both but by can't cannot could couldn't did didn't
  do does doesn't doing don't down during each few for from further had hadn't has
  hasn't have haven't having he he'd he'll he's her here here's hers herself him
  himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself
  let's me more most mustn't my myself no nor not of off on once only or other ought
  our ours ourselves out over own same shan't she she'd she'll she's should shouldn't
  so some such than that that's the their theirs them themselves then there there's
  these they they'd they'll they're they've this those through to too under until up
  very was wasn't we we'd we'll we're we've were weren't what what's when when's where
  where's which while who who's whom why why's with won't would wouldn't you you'd
  you'll you're you've your yours yourself yourselves`.split(
    /\s+/
  )
);

export default function KeywordDensityCheckerPage() {
  const [text, setText] = useState("");
  const [phraseLength, setPhraseLength] = useState(1); // 1, 2, or 3 words
  const [ignoreStop, setIgnoreStop] = useState(true);

  // Structured data for AI Overviews / rich results
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://countflows.com/tools/keyword-density-checker",
    "name": "Keyword Density Checker - Countflows",
    "url": "https://countflows.com/tools/keyword-density-checker",
    "description": "Free online keyword density checker that analyzes single words and 2–3 word phrases with frequency and density percentages.",
    "image": "https://countflows.com/og-image.png",
    "applicationCategory": "SEOApplication",
    "operatingSystem": "All",
    "inLanguage": "en-US",
    "datePublished": "2024-01-01",
    "dateModified": "2026-07-08",
    "author": {
      "@type": "Organization",
      "name": "Countflows",
      "url": "https://countflows.com",
      "logo": "https://countflows.com/logo.png"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Countflows",
      "logo": {
        "@type": "ImageObject",
        "url": "https://countflows.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://countflows.com/tools/keyword-density-checker"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "isAccessibleForFree": true
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://countflows.com" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://countflows.com/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Keyword Density Checker",
        item: "https://countflows.com/tools/keyword-density-checker",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: keywordDensityFAQs.map((f) => ({
      "@type": "Question",
      name: f.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
    })),
  };

  // ---- Core analysis ----
  const rawWordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  // Letters only — pure numbers (e.g. "0") are ignored, matching SERP tools
  const wordsArray = text.toLowerCase().match(/\b[a-z]+(?:'[a-z]+)?\b/g) || [];
  const charCount = text.length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;

  const filtered = ignoreStop
    ? wordsArray.filter((w) => !STOP_WORDS.has(w))
    : wordsArray;

  // Build n-grams of the selected phrase length
  const frequencyMap = {};
  for (let i = 0; i <= filtered.length - phraseLength; i++) {
    const gram = filtered.slice(i, i + phraseLength).join(" ");
    frequencyMap[gram] = (frequencyMap[gram] || 0) + 1;
  }

  // ✅ Divide by the FILTERED word count so density matches SERP-style tools
  const denominator = Math.max(filtered.length, 1);
  const sortedKeywords = Object.entries(frequencyMap)
    .map(([phrase, count]) => ({
      phrase,
      count,
      density: ((count * phraseLength) / denominator) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);

  const uniquePhrases = Object.keys(frequencyMap).length;

  // ---- Actions ----
  const handleClear = () => setText("");

  const handleCopy = () => {
    const rows = sortedKeywords
      .map((r) => `${r.phrase}\t${r.count}\t${r.density.toFixed(2)}%`)
      .join("\n");
    navigator.clipboard.writeText(`Keyword\tFrequency\tDensity\n${rows}`);
  };

  const handleDownload = () => {
    const rows = sortedKeywords
      .map((r) => `"${r.phrase}",${r.count},${r.density.toFixed(2)}`)
      .join("\n");
    const csv = `Keyword,Frequency,Density (%)\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keyword-density-${phraseLength}-word.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main
      id="keyword-density-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen md:mt-12 dark:text-white mt-12 md:mt-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20 mt-12 md:mt-16" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20 mt-12 md:mt-16" />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />


      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="hover:text-cyan-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/tools" className="hover:text-cyan-600">Tools</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">Keyword Density Checker</li>
        </ol>
      </nav>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-8">
          Free Keyword Density <span className="text-cyan-500">Checker</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          This free Keyword Density Checker instantly shows how often each word and phrase appears
          in your text, along with its density percentage — no signup required. Use it to optimize
          your content for SEO, avoid keyword stuffing, and find your most-used terms.
        </p>
      </section>

      {/* Tool Box */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
        <motion.div
          initial={false}
          animate={28}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6"
        >
          {/* Summary Stats */}
          <div className="mb-4 flex flex-wrap gap-6 text-sm md:text-base">
            <span className="font-semibold text-gray-600 dark:text-gray-300">📝 Total Words: {rawWordCount}</span>
            <span className="font-semibold text-gray-600 dark:text-gray-300">🔡 Characters: {charCount}</span>
            <span className="font-semibold text-gray-600 dark:text-gray-300">📖 Sentences: {sentences}</span>
            <span className="font-semibold text-gray-600 dark:text-gray-300">🔑 Unique Keywords: {uniquePhrases}</span>
          </div>

          {/* Controls: phrase length + stop words */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex rounded-full border border-gray-200 dark:border-gray-600 p-1 bg-gray-50 dark:bg-gray-900">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setPhraseLength(n)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${phraseLength === n
                      ? "bg-cyan-500 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {n} {n === 1 ? "word" : "words"}
                </button>
              ))}
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={ignoreStop}
                onChange={(e) => setIgnoreStop(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-900"
              />
              Ignore common stop words (the, and, of…)
            </label>
          </div>

          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text..."
            className="w-full max-w-4xl mx-auto min-h-[150px] sm:min-h-[200px] md:min-h-[240px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg"
          />

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
              >
                <Copy size={18} /> Copy
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                <Trash size={18} /> Clear
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
              >
                <Download size={18} /> Download CSV
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
              Switch between 1, 2 and 3-word phrases, toggle stop words, then copy or export your
              results. Density updates instantly with every change.
            </p>
          </div>

          {/* Results Table */}
          <div className="mt-8">
            {sortedKeywords.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-10 text-center text-sm text-cyan-900 dark:text-cyan-100">
                <Search className="mx-auto mb-3 h-6 w-6 text-cyan-500" />
                Start typing or paste your text above to see keyword density results.
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-left text-sm md:text-base">
                  <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Keyword / Phrase</th>
                      <th className="px-4 py-3 text-right font-semibold">Frequency</th>
                      <th className="px-4 py-3 text-right font-semibold">Density</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {sortedKeywords.map((r, index) => (
                      <tr
                        key={index}
                        className="transition hover:bg-gray-50 dark:hover:bg-gray-900/60"
                      >
                        <td className="px-4 py-3 font-medium capitalize text-gray-900 dark:text-gray-100">
                          {r.phrase}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-gray-700 dark:text-gray-300">
                          {r.count}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center justify-end gap-2">
                            <span className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:block">
                              <span
                                className="block h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400"
                                style={{ width: `${Math.min(r.density * 4, 100)}%` }}
                              />
                            </span>
                            <span className="tabular-nums text-gray-700 dark:text-gray-300">
                              {r.density.toFixed(2)}%
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {sortedKeywords.length === 50 && (
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">Showing top 50 keywords.</p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Phrase analysis", description: "Check single words and 2–3 word phrases (n-grams) in real time." },
            { title: "SEO-friendly", description: "See density percentages to avoid keyword stuffing and over-optimization." },
            { title: "Export ready", description: "Copy results or download a clean CSV for your reports and audits." },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={29}
              animate={30}
              transition={31}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <SEOContent />


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
        <FAQ faqs={keywordDensityFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#keyword-density-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>



    </main>

  );
}