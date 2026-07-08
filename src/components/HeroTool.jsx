"use client"

import { useState } from "react"
import { motion } from "@/lib/no-motion"
import { Copy, Trash, Download } from "lucide-react"

import StatsCards from "./StatsCard"
import {
  countWords,
  countCharacters,
  countCharactersNoSpaces,
  countSentences,
  countParagraphs,
  calculateReadingTime,
  calculateSpeakingTime
} from "@/lib/textUtils"

export default function HeroTool() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState(1000)
  const [focusMode, setFocusMode] = useState(false)

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

  const words = countWords(text)
  const characters = countCharacters(text)
  const charactersNoSpaces = countCharactersNoSpaces(text)
  const sentences = countSentences(text)
  const paragraphs = countParagraphs(text)
  const readingTime = calculateReadingTime(words)
  const speakingTime = calculateSpeakingTime(words)

  const avgSentenceLength = sentences > 0 ? Math.round(words / sentences) : 0
  const progress = Math.min((words / goal) * 100, 100)

  let motivation = ""
  if (progress >= 100) motivation = "🎉 Goal achieved!"
  else if (progress >= 75) motivation = "Almost there, keep going!"
  else if (progress >= 50) motivation = "Halfway done, great job!"
  else if (progress > 0) motivation = "Nice start, keep writing!"

  return (
    <section
      className="w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 md:mt-12"
    >
      <div className="max-w-3xl mx-auto">
         
          
        {/* Heading */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-gray-100"
          >
            Wo<span className="text-cyan-400">R</span>d Co
            <span className="text-cyan-300">U</span>nter & Wri
            <span className="text-cyan-400">T</span>ing Tool
            <span className="text-cyan-400">S</span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm md:text-lg">
            Count words, characters, sentences, and reading time instantly.
          </p>
        </motion.div>

        {/* Tool Box */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 md:p-6 mx-auto"
        >
          {/* Textarea */}
          <textarea
            className="w-full h-48 md:h-64 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y text-sm md:text-base bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-inner text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Start typing or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-4">
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
              >
                <Copy size={18} /> Copy
              </button>

              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                <Trash size={18} /> Clear
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Download size={18} /> Download
              </button>
            </div>

            {/* Focus Mode Toggle */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              {focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
            </button>
          </div>

          {!focusMode && (
            <>
              {/* Word Goal Tracker */}
              <div className="mt-6 mx-auto max-w-md text-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Word Goal
                </label>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="mx-auto w-24 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
                />
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-cyan-500 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {words} / {goal} words
                </p>
                {motivation && (
                  <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-1">
                    {motivation}
                  </p>
                )}
              </div>

              {/* Readability Insights */}
              <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                <p>Characters: {characters}</p>
                <p>Characters (no spaces): {charactersNoSpaces}</p>
                <p>Sentences: {sentences}</p>
                <p>Paragraphs: {paragraphs}</p>
                <p>Average sentence length: {avgSentenceLength} words</p>
                <p>
                  Estimated readability:{" "}
                  {avgSentenceLength <= 12
                    ? "Easy"
                    : avgSentenceLength <= 20
                    ? "Medium"
                    : "Hard"}
                </p>
                <p>Estimated reading time: {readingTime} min</p>
                <p>Estimated speaking time: {speakingTime} min</p>
              </div>

              {/* Stats */}
              <StatsCards text={text} />

              {/* Social Sharing */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `My text has ${words} words and ${characters} characters!`
                      )}`,
                      "_blank"
                    )
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  Share on Twitter
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
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition text-sm"
                >
                  Share on LinkedIn
                </button>
              </div>

              {/* Ads Placement */}
              <div className="mt-8">
                <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  Ad Space (Responsive)
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}