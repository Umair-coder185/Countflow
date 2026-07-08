"use client";

import { useState } from "react";
import { motion } from "@/lib/no-motion";
import { Copy, Trash, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import SeoContent from "@/components/Sentence-counter-seo/seo-content";
import FAQ from "@/components/FAQ";
import StatsCard from "@/components/StatsCard";
import { sentenceCounterFAQs } from "@/lib/faqData";

export default function SentenceCounterPage() {
  const [text, setText] = useState("");
  const [goal, setGoal] = useState(50); // default sentence goal

  const handleClear = () => setText("");
  const handleCopy = () => navigator.clipboard.writeText(text);
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-text.txt";
    a.click();
  };

  // Sentence count logic
  // Derived stats
  const sentences =
    text.trim() === "" ? [] : text.split(/[.!?]+/).filter(Boolean);

  const characters = text.length;
  const sentenceCount = sentences.length;
  const progress = Math.min((sentenceCount / goal) * 100, 100);

  // Derived stats
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Average sentence length
  const avgSentenceLength = sentenceCount === 0 ? 0 : Math.round(wordCount / sentenceCount);

  // Longest sentence
  const longestSentence = sentences.reduce(
    (longest, current) =>
      current.split(/\s+/).length > longest.split(/\s+/).length ? current : longest,
    ""
  );
  const longestSentenceLength = longestSentence.split(/\s+/).length;

  // Complexity score (simple heuristic: commas + length)
  const complexityScore =
    sentenceCount === 0
      ? 0
      : Math.round(
        (sentences.reduce((acc, s) => acc + (s.match(/,/g)?.length || 0), 0) / sentenceCount) * 10 +
        avgSentenceLength
      );

  // Flesch Reading Ease (approximate)
  const avgSyllablesPerWord = wordCount === 0 ? 0 : (text.length / wordCount) / 3;
  const fleschScore =
    wordCount === 0
      ? 0
      : Math.round(206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord));

  let readabilityLabel = "⚪ Neutral";
  if (fleschScore >= 70) readabilityLabel = "😊 Easy to read (8th grade)";
  else if (fleschScore >= 50) readabilityLabel = "📖 Fairly difficult (college level)";
  else readabilityLabel = "📚 Difficult (academic/professional)";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://countflows.com/tools/sentence-calculator",
    "name": "Sentence Calculator - Countflows",
    "url": "https://countflows.com/tools/sentence-calculator",
    "description": "Instant sentence counting and readability analysis tool — shows sentence counts, longest sentence, average sentence length and readability scores.",
    "image": "https://countflows.com/og-image.png",
    "applicationCategory": "ProductivityApplication",
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
      "target": "https://countflows.com/tools/sentence-calculator"
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
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://countflows.com" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://countflows.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "Sentence Calculator", "item": "https://countflows.com/tools/sentence-calculator" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sentenceCounterFAQs.map((f) => ({
      "@type": "Question",
      "name": f.question.trim(),
      "acceptedAnswer": { "@type": "Answer", "text": f.answer.trim() }
    }))
  };

  return (
    <main
      id="sentence-counter-top"
      className="
        relative overflow-hidden
        bg-gradient-to-b from-white to-cyan-50 
        dark:from-gray-950 dark:to-gray-800 
        min-h-screen md:mt-12 
        dark:text-white
      "
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/20" />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl  mt-8 md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100"
        >
          Sentence <span className="text-cyan-500">Cou</span>n
          <span className="text-cyan-400">ter</span>
        </motion.h1>

        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Instantly count sentences, measure average sentence length, and surface readability signals so you can improve clarity and pacing. Ideal for essays, articles, and technical writing.
        </p>


      </section>
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-4 ">

        {/* Results Section */}

        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-300">
            <span className="font-semibold">📖 Sentences: {sentenceCount}</span>
            <span className="font-semibold">📝 Words: {wordCount}</span>
            <span className="font-semibold">📊 Avg Length: {avgSentenceLength} words</span>
            <span className="font-semibold">🔍 Longest Sentence: {longestSentenceLength} words</span>
            <span className="font-semibold">⚡ Complexity Score: {complexityScore}</span>
            <span className="font-semibold">📚 Readability: {fleschScore} – {readabilityLabel}</span>
          </div>
          {longestSentence && (
            <p className="text-xs text-gray-400 italic">
              Longest sentence: “{longestSentence.trim()}”
            </p>
          )}
        </div>

      </section>

      {/* Tool Box */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6"
        >
          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text..."
            className="
              w-full min-h-[150px] sm:min-h-[200px] md:min-h-[280px] 
              border border-gray-300 dark:border-gray-600 
              rounded-xl p-4 
              outline-none focus:ring-2 focus:ring-cyan-500 
              resize-y 
              bg-white dark:bg-gray-900 
              text-gray-900 dark:text-gray-100 
              placeholder-gray-400 dark:placeholder-gray-500
              text-base md:text-lg
            "
          />

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-4">
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
                <Download size={18} /> Download
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
              Use the toolbar to copy, clear, or download your text. Stats update instantly as you type or paste.
            </p>
          </div>

          {/* Sentence Goal Tracker & Readability */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sentence Goal</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Set a target and track your writing progress.</p>
                </div>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-20 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mt-5">
                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>{sentenceCount} / {goal} sentences</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-cyan-600/10 dark:bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-800 dark:text-cyan-200 text-center">
                {progress >= 100 ? "🎉 Goal achieved!" : progress >= 75 ? "Almost there!" : "Keep writing!"}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Readability</p>
              <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Avg. sentence: <span className="font-semibold text-gray-900 dark:text-gray-100">{avgSentenceLength}</span> words</p>
                <p>Level: <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {avgSentenceLength <= 12
                    ? "Easy"
                    : avgSentenceLength <= 20
                      ? "Medium"
                      : "Hard"}
                </span></p>
              </div>
              <div className="mt-6 rounded-2xl bg-violet-600/10 dark:bg-violet-500/10 p-4 text-sm text-violet-800 dark:text-violet-200">
                Tip: Aim for 12-15 words per sentence for better readability.
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <StatsCard text={text} />
          </div>

          {/* Tip Banner */}
          <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
            <p className="font-semibold">Crafting an essay or article?</p>
            <p className="mt-2">Breaking your writing into shorter sentences can improve clarity and readability. Use this tool to analyze and perfect your sentence structure.</p>
          </div>
        </motion.div>
      </section>
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Instant counting", description: "See sentence count, words, and characters updated in real time." },
            { title: "Readability analysis", description: "Get insights into sentence length and writing difficulty levels." },
            { title: "Goal tracking", description: "Set a target sentence count and watch your progress bar grow." },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-5 shadow-lg shadow-cyan-200/20 dark:shadow-black/20"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* SEO Content */}
      <SeoContent />

      {/* FAQ */}
      <div className="mb-20">
        <FAQ faqs={sentenceCounterFAQs} />
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#sentence-counter-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  );
}
