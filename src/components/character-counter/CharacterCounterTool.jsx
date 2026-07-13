"use client"

import { useState } from "react"
import { Copy, Check, Trash, Download } from "lucide-react"
import StatsCard from "@/components/StatsCard"

const PRESETS = [
  { name: "Tweet / X", value: 280 },
  { name: "SMS", value: 160 },
  { name: "Meta Description", value: 155 },
  { name: "Instagram Caption", value: 2200 },
  { name: "LinkedIn Post", value: 3000 },
  { name: "Threads", value: 500 },
  { name: "Bluesky", value: 300 },
]

export default function CharacterCounterTool() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState(2000)
  const [limit, setLimit] = useState(280)
  const [copied, setCopied] = useState(false)

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const avgWordLength = words > 0 ? Math.round(charactersNoSpaces / words) : 0

  // FIX: limit-progress aur goal-progress ab ALAG hain.
  // Purani file mein goal bar bhi `limit` se chal raha tha — 280 chars pe "100% complete" dikhata tha.
  const limitProgress = Math.min((characters / limit) * 100, 100)
  const goalProgress = goal > 0 ? Math.min((characters / goal) * 100, 100) : 0

  const handleClear = () => setText("")

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-text.txt"
    a.click()
    URL.revokeObjectURL(url) // FIX: memory leak
  }

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">
        {/* Results — FIX: light mode contrast (pehle text-gray-300 tha, white card pe invisible) */}
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <span className="font-semibold">🔡 Characters: {characters}</span>
            <span className="font-semibold">🎯 Limit: {limit}</span>
          </div>

          {/* Progress bar — FIX: track ka color light mode ke liye bhi */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full ${characters > limit ? "bg-red-500" : "bg-cyan-500"}`}
              style={{ width: `${limitProgress}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {characters > limit
              ? `⚠️ You exceeded the ${limit}-character limit by ${characters - limit}.`
              : `✅ Within the ${limit}-character limit.`}
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-3 mb-6">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setLimit(preset.value)}
              aria-pressed={limit === preset.value}
              className={`px-4 py-2 rounded-full transition ${
                limit === preset.value
                  ? "bg-cyan-600 text-white ring-2 ring-cyan-300"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
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
          className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[280px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg"
        />

        {/* Actions — FIX: Copy button ab "Copied!" feedback deta hai */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied!" : "Copy"}
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
            Use the toolbar above to copy your text, clear the field, or download it for later. Every
            update refreshes the stats instantly.
          </p>
        </div>

        {/* Goal tracker — FIX: ab goalProgress use hota hai, limit wala progress nahi */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Character Goal</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Set a target and keep your copy polished.
                </p>
              </div>
              <input
                type="number"
                min={1}
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-28 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="mt-5">
              <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>{characters} / {goal} characters</span>
                <span>{Math.round(goalProgress)}% complete</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick insights</p>
            <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                Characters (no spaces):{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">{charactersNoSpaces}</span>
              </p>
              <p>
                Words: <span className="font-semibold text-gray-900 dark:text-gray-100">{words}</span>
              </p>
              <p>
                Avg. word length:{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">{avgWordLength}</span> chars
              </p>
            </div>
            <div className="mt-6 rounded-2xl bg-cyan-600/10 dark:bg-cyan-500/10 p-4 text-sm text-cyan-800 dark:text-cyan-200">
              Tip: shorter average words can make your content easier to scan. Keep it crisp for better
              readability.
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8">
          <StatsCard text={text} />
        </div>

        {/* Tip banner */}
        <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
          <p className="font-semibold">Feeling creative?</p>
          <p className="mt-2">
            Try writing a headline under 70 characters, then paste it here to see how your message lands.
          </p>
        </div>
      </div>
    </section>
  )
}