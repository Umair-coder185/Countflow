"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Copy, Trash, Download } from "lucide-react"

import { wordCounterFAQs } from "@/lib/faqData"
import FAQ from "@/components/FAQ"
import StatsCard from "@/components/StatsCard"
import SEOContent from "@/components/Word-counter-seo/SEOContent"

export default function WordCounterPage() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState(1000) // default word goal
  const [focusMode, setFocusMode] = useState(false)

  // Structured data for AI Overviews / rich results
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter - Countflows",
    "url": "https://countflows.com/tools/word-counter",
    "description": "Free online word counter that provides  word, character, sentence, and paragraph counts plus goal tracking and readability tips.",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "All",
    "author": {
      "@type": "Organization",
      "name": "Countflows"
    },
    "feature": [
      "Real-time word and character counting",
      "Sentence and paragraph counts",
      "Goal tracker with progress bar",
      "Focus mode to reduce distractions",
      "Download and copy text"
    ],
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
      { "@type": "ListItem", "position": 3, "name": "Word Counter", "item": "https://countflows.com/tools/word-counter" }
    ]
  };
  



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
  const sentences = text.split(/[.!?]+/).filter(Boolean).length
  const avgSentenceLength = sentences > 0 ? Math.round(words / sentences) : 0
  const progress = Math.min((words / goal) * 100, 100)
  const paragraphCount =
    text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length;
  const charCount = text.length;

  // Vocabulary Richness
  const wordsArray = text.toLowerCase().match(/\b[a-zA-Z]+\b/g) || [];
  const uniqueWords = new Set(wordsArray);
  const vocabRichness =
    words === 0 ? 0 : ((uniqueWords.size / words) * 100).toFixed(1);

  let vocabLabel = "⚪ Balanced";
  if (vocabRichness > 70) vocabLabel = "🌟 Rich Vocabulary";
  else if (vocabRichness < 40) vocabLabel = "🔄 Repetitive";

  // Premium Sentiment Analysis (weighted scoring)
  const positiveWords = ["good", "great", "excellent", "happy", "love", "success", "amazing", "wonderful", "positive"];
  const negativeWords = ["bad", "poor", "sad", "hate", "fail", "problem", "negative", "terrible", "angry"];

  let sentimentScore = 0;
  wordsArray.forEach((word) => {
    if (positiveWords.includes(word)) sentimentScore += 2; // weighted
    if (negativeWords.includes(word)) sentimentScore -= 2;
  });


  let sentimentLabel = "⚪ Neutral";
  if (sentimentScore >= 6) sentimentLabel = "😊 Positive Tone";
  else if (sentimentScore <= -6) sentimentLabel = "☹️ Negative Tone";
  else if (sentimentScore > 0) sentimentLabel = "🙂 Slightly Positive";
  else if (sentimentScore < 0) sentimentLabel = "🙁 Slightly Negative";


  // Word Frequency Analysis (Top 5)
  const frequencyMap = {};
  wordsArray.forEach((word) => {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  });
  const sortedWords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);






  // Motivational message
  let motivation = ""
  if (progress >= 100) motivation = "🎉 Goal achieved!"
  else if (progress >= 75) motivation = "Almost there, keep going!"
  else if (progress >= 50) motivation = "Halfway done, great job!"
  else if (progress > 0) motivation = "Nice start, keep writing!"

  return (
    <main
      id="word-counter-top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-gray-950 dark:to-gray-800 min-h-screen md:mt-12 dark:text-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-8">
          Word <span className="text-cyan-500">Counter</span>
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Track your writing progress with instant word, character, and sentence counts. Set goals and watch your progress bar fill with every keystroke.
        </p>

      
      </section>

      {/* Tool Box */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6"
        >
          {/* Textarea */}
          {/* Results Section */}
          {/* Results Section */}
         
             
        <div className="mb-2 flex flex-col gap-4">
          <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-300">
                <span className="font-semibold text-gray-400">📝 Words: {words}</span>
                <span className="font-semibold text-gray-400">📖 Sentences: {sentences}</span>
                <span className="font-semibold text-gray-400">🔡 Characters: {charCount}</span>
                <span className="font-semibold text-gray-400">📑 Paragraphs: {paragraphCount}</span>
              </div>
              <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-300">
                <span className="font-semibold text-gray-400">🌐 Vocabulary: {vocabRichness}% – {vocabLabel}</span>
                <span className="font-semibold text-gray-400">💬 Sentiment: {sentimentLabel}</span>
              </div>
            </div>

        {/* Word Frequency Table */}
        {sortedWords.length > 0 && (
          <div className="mb-4 bg-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">📊 Top 5 Word Frequency</h2>
            <ul className="space-y-1 text-gray-300">
              {sortedWords.map(([word, count], index) => (
                <li key={index} className="flex justify-between">
                  <span className="capitalize">🔹 {word}</span>
                  <span>{count} ({((count / words) * 100).toFixed(1)}%)</span>
                </li>
              ))}
            </ul>
          </div>
        )}



          {/* Textarea */}
          <textarea
            value={text}
              onChange={(e) => setText(e.target.value)}

              // auto-analyze on any change (paste or typing)
          


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
                <Download size={18} /> Download
              </button>



              <button
                onClick={() => setFocusMode(!focusMode)}
                className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition"
              >
                {focusMode ? "Exit Focus Mode" : "Focus Mode"}
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
              Use the toolbar to copy, clear, or download your text. Your stats refresh instantly with every change.
            </p>
          </div>

          {!focusMode && (
            <>
              {/* Word Goal Tracker & Readability */}
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Word Goal</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Set a writing target and track your journey.</p>
                    </div>
                    <input
                      type="number"
                      value={goal}
                      onChange={(e) => setGoal(Number(e.target.value))}
                      className="w-24 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500"
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
                      <span>{words} / {goal} words</span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                  </div>
                  {motivation && (
                    <div className="mt-4 rounded-2xl bg-cyan-600/10 dark:bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-800 dark:text-cyan-200 text-center">
                      {motivation}
                    </div>
                  )}
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
                    Tip: Keep sentences short for better readability. Aim for 12-15 words per sentence.
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8">
                <StatsCard text={text} />
              </div>

              {/* Social Sharing */}
              <div className="mt-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-gray-900 dark:to-gray-800 p-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Share your writing</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          text.slice(0, 100)
                        )}`,
                        "_blank"
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition text-sm"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          window.location.href
                        )}`,
                        "_blank"
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition text-sm"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Tip Banner */}
              <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
                <p className="font-semibold">Writing a novel?</p>
                <p className="mt-2">Try the focus mode above to hide distractions and enter your flow state. Your word count will be waiting when you return.</p>
              </div>
            </>
          )}
        </motion.div>
      </section>

       <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Word tracking", description: "Count words and sentences as you write with real-time updates." },
            { title: "Goal-driven", description: "Set a target word count and watch your progress bar grow." },
            { title: "Writer-friendly", description: "Focus mode to minimize distractions and maximize productivity." },
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
        <FAQ faqs={wordCounterFAQs} />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#word-counter-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

    </main>
  )
}