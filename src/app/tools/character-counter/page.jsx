"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Trash, Download } from "lucide-react"
import { Copy, } from "lucide-react"

import { characterCounterFAQs } from "@/lib/faqData"   // ✅ make sure this exists
import FAQ from "@/components/FAQ"
import StatsCard from "@/components/StatsCard"
import SeoContent from "@/components/Character-counter-seo/SeoContent"

export default function CharacterCounterPage() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState(2000) // default character goal

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

  // Preset options
  const presets = [
    { name: "Tweet", value: 280 },
    { name: "SMS", value: 160 },
    { name: "Meta Description", value: 155 },
    { name: "Instagram Caption", value: 2200 },
  ];
  const [limit, setLimit] = useState(280); // default preset (Twitter)

  const charCount = text.length;
  const progress = Math.min((charCount / limit) * 100, 100);

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const avgWordLength = words > 0 ? Math.round(charactersNoSpaces / words) : 0


  return (
    <main
      id="character-counter-top"
      className="
        relative overflow-hidden
        bg-gradient-to-b from-white to-cyan-50 
        dark:from-gray-950 dark:to-gray-800 
        min-h-screen md:mt-12 
        dark:text-white
      "
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-500/20" />

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100"
        >
          Cha<span className="text-cyan-500">R</span>acter
          <span className="text-cyan-500"> </span>Co
          <span className="text-cyan-400">U</span>nter
        </motion.h1>

        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
          Paste your draft, type your copy, and get instant character, word, and readability feedback with a clean, modern interface built for fast editing.
        </p>


      </section>

      {/* Tool Box */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6"
        >

          {/* Results Section */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-300">
              <span className="font-semibold">🔡 Characters: {charCount}</span>
              <span className="font-semibold">🎯 Limit: {limit}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full ${charCount > limit ? "bg-red-500" : "bg-cyan-500"
                  }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Alert Message */}
            <p className="text-sm text-gray-400">
              {charCount > limit

                ? `⚠️ You exceeded the ${limit}-character limit by ${charCount - limit}.`
                : `✅ Within the ${limit}-character limit.`}
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setLimit(preset.value)}
                className="px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
              >
                {preset.name}
              </button>
            ))}
          </div>
          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text..."
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
              Use the toolbar above to copy your text, clear the field, or download it for later. Every update refreshes the stats instantly.
            </p>
          </div>

          {/* Character Goal Tracker */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Character Goal</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Set a target and keep your copy polished.</p>
                </div>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-28 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500"
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
                  <span>{characters} / {goal} characters</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick insights</p>
              <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Characters (no spaces): <span className="font-semibold text-gray-900 dark:text-gray-100">{charactersNoSpaces}</span></p>
                <p>Words: <span className="font-semibold text-gray-900 dark:text-gray-100">{words}</span></p>
                <p>Avg. word length: <span className="font-semibold text-gray-900 dark:text-gray-100">{avgWordLength}</span> chars</p>
              </div>
              <div className="mt-6 rounded-2xl bg-cyan-600/10 dark:bg-cyan-500/10 p-4 text-sm text-cyan-800 dark:text-cyan-200">
                Tip: shorter average words can make your content easier to scan. Keep it crisp for better readability.
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <StatsCard text={text} />
          </div>

          {/* Tip Banner */}
          <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
            <p className="font-semibold">Feeling creative?</p>
            <p className="mt-2">Try writing a headline under 70 characters, then paste it here to see how your message lands.</p>
          </div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center relative">
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Instant counts", description: "See characters, words, and average word length in real time." },
            { title: "Goal tracking", description: "Set a target and watch the progress bar move with every keystroke." },
            { title: "Export ready", description: "Copy text or download a file in one click when you're finished." },
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
        <FAQ faqs={characterCounterFAQs} />
      </div>


      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link
          href="#character-counter-top"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors duration-200"
        >
          Back to top
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}