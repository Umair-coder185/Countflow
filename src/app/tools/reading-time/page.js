"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Trash, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"

import { readingTimeFAQs } from "@/lib/faqData"
import FAQ from "@/components/FAQ"
import StatsCard from "@/components/StatsCard"
import SEOContent from "@/components/reading-time-calculator/seo-content"

export default function ReadingTimePage() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState(5) // default reading time goal in minutes

  const handleClear = () => setText("")
  const handleCopy = () => navigator.clipboard.writeText(text)
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-text.txt"
    a.click()
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const readingTime = Math.ceil(words / 200) // average 200 wpm
  const speakingTime = Math.ceil(words / 130) // average 130 wpm
  const progress = Math.min((readingTime / goal) * 100, 100)
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean).length;

  const readingTimeMinutes = words === 0 ? 0 : Math.ceil(words / 200);

  // Speaking Time (based on 130 words/minute)
  const speakingTimeMinutes = words === 0 ? 0 : Math.ceil(words / 130);

    const charCount = text.length;

  // Flesch Reading Ease Score
  // Formula: 206.835 - (1.015 × ASL) - (84.6 × ASW)
  // ASL = Average Sentence Length (words per sentence)
  // ASW = Average Syllables per Word (approximation)
  const avgSentenceLength = sentences === 0 ? 0 : words / sentences;
  const avgSyllablesPerWord = words === 0 ? 0 : (charCount / words) / 3; // rough estimate
  const fleschScore = words === 0 ? 0 : Math.round(206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord));

  let difficultyLabel = "⚪ Neutral";
  if (fleschScore >= 70) difficultyLabel = "😊 Easy to read (8th grade)";
  else if (fleschScore >= 50) difficultyLabel = "📖 Fairly difficult (college level)";
  else difficultyLabel = "📚 Difficult (academic/professional)";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reading Time Calculator - Countflows",
    "url": "https://countflows.com/tools/reading-time",
    "description": "Calculate approximate reading and speaking time for any text with instant estimates, speaking time, and reading difficulty scores.",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "All",
    "author": {
      "@type": "Organization",
      "name": "Countflows"
    },
    "keywords": "Instant reading time estimates, Speaking time estimates, Flesch reading-ease score, Goal tracker",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://countflows.com" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://countflows.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "Reading Time Calculator", "item": "https://countflows.com/tools/reading-time" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": readingTimeFAQs.map((f) => ({
      "@type": "Question",
      "name": f.question.trim(),
      "acceptedAnswer": { "@type": "Answer", "text": f.answer.trim() }
    }))
  };

  return (
    <main
      id="reading-time-top"
      className={clsx(
        "relative overflow-hidden",
        "bg-gradient-to-b from-white to-cyan-50",
        "dark:from-gray-950 dark:to-gray-800",
        "min-h-screen md:mt-12 dark:text-white"
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-500/20" />

    

      {/* Hero Section */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-8">
          Reading <span className="text-cyan-500">Time Calculator</span>
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Instantly calculate reading and speaking time for any text. Use quick estimates to plan sessions, optimize article lengths, or prepare presentations with reliable time targets.
        </p>


      </section>
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-4 ">



        <div className="flex flex-wrap gap-4 items-center text-sm md:text-base text-gray-300">
          <span className="font-semibold">⏱️ Reading Time: ~{readingTimeMinutes} min</span>
          <span className="font-semibold">🎤 Speaking Time: ~{speakingTimeMinutes} min</span>
          <span className="font-semibold">📊 Difficulty: {fleschScore} – {difficultyLabel}</span>
        </div>
      </section>

      {/* Tool Box */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-6">
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
           className={clsx(
          "w-full max-w-4xl mx-auto min-h-[240px]",
          "border border-gray-300 dark:border-gray-600",
          "rounded-xl p-4",
          "outline-none focus:ring-2 focus:ring-cyan-500",
          "resize-y",
          "bg-white dark:bg-gray-900",
          "text-gray-900 dark:text-gray-100",
          "placeholder-gray-400 dark:placeholder-gray-500",
          "text-base md:text-lg"
        )}
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
              Copy your text, clear the field, or download it. Stats update instantly as you type or paste.
            </p>
          </div>

          {/* Reading Time Goal Tracker & Insights */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Reading Time Goal</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Set your target reading time in minutes.</p>
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
                  <span>{readingTime} / {goal} min</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-cyan-600/10 dark:bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-800 dark:text-cyan-200 text-center">
                {readingTime <= goal ? "You're on pace!" : "Content longer than goal"}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Breakdown</p>
              <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Words: <span className="font-semibold text-gray-900 dark:text-gray-100">{words}</span></p>
                <p>Read time: <span className="font-semibold text-gray-900 dark:text-gray-100">{readingTime} min</span></p>
                <p>Speak time: <span className="font-semibold text-gray-900 dark:text-gray-100">{speakingTime} min</span></p>
              </div>
              <div className="mt-6 rounded-2xl bg-amber-600/10 dark:bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200">
                Tip: Average reader at 200 words/min. Speak slower at 130 words/min.
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <StatsCard text={text} />
          </div>

          {/* Reading Strategy Banner */}
          <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
            <p className="font-semibold">Planning a presentation?</p>
            <p className="mt-2">Use the speaking time estimate above to time your slides perfectly. Aim for 1-2 minutes per slide for engaging presentations.</p>
          </div>
        </motion.div>
      </section>



      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Instant estimates", description: "Know reading time before you start—based on average reading speed." },
            { title: "Plan ahead", description: "Set your reading goal and track progress as you go through content." },
            { title: "Speaking time", description: "Get estimated speaking time for presentations and audiobooks." },
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
      <SEOContent />

      {/* FAQ */}
      <div className="mb-20">
        <FAQ faqs={readingTimeFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#reading-time-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}