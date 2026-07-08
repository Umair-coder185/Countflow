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

export default function HeroToolFix() {
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
    <section className="relative overflow-hidden bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_18%)]" />
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-56 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr] items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-200 backdrop-blur-sm">Instant word and readability insights</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white">Create <span className="text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text">sharper content</span> with a <span className="text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 bg-clip-text">premium word counter</span> and writing dashboard.</h1>
            <p className="mx-auto max-w-2xl text-slate-300 text-base sm:text-lg leading-8 lg:mx-0">A modern writing workspace that blends <span className="text-cyan-400/80">motion, layered depth</span>, and mobile-first design with dark mode support.</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <button className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-300">Start writing</button>
              <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-100 transition hover:border-cyan-300 hover:bg-white/10">Dark mode ready</button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_20px_60px_-40px_rgba(15,23,42,0.9)]">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Live</p>
                <p className="mt-2 text-sm text-slate-200">Word count updates instantly.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_20px_60px_-40px_rgba(15,23,42,0.9)]">
                <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-300">Focus</p>
                <p className="mt-2 text-sm text-slate-200">Distraction-free layout with high contrast.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_20px_60px_-40px_rgba(15,23,42,0.9)]">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Smart</p>
                <p className="mt-2 text-sm text-slate-200">Reading time and readability metrics instantly.</p>
              </div>
            </div>
          </div>
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.35, ease: "easeOut" }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.85)] backdrop-blur-xl">
            <div className="absolute inset-x-6 top-6 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 opacity-80 blur-xl" />
            <div className="relative space-y-5 pt-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span className="rounded-full bg-white/5 px-3 py-1">Live preview</span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">3D depth</span>
              </div>
              <div className="space-y-3 rounded-[1.75rem] bg-slate-950/95 p-5 shadow-lg shadow-cyan-500/5">
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <p className="font-medium">Current count</p>
                  <p className="text-cyan-300">{words} words</p>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-slate-900" />
                  <div className="h-2 w-4/5 rounded-full bg-cyan-400/80" />
                  <div className="h-2 w-3/5 rounded-full bg-violet-400/60" />
                  <div className="h-2 w-2/5 rounded-full bg-fuchsia-400/40" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Words</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{words}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-300">Reading</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{readingTime} min</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }} className="mt-12 rounded-[2rem] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/30">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Your writing studio</h2>
              <p className="text-slate-400 leading-7">Type, paste, or polish text inside a responsive editor that feels polished on mobile and desktop. Every control is within easy reach, with motion and depth that make the experience feel premium.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-4 text-slate-200">
                <p className="text-sm text-slate-400">Goal</p>
                <p className="mt-2 text-xl font-semibold text-white">{goal} words</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 text-slate-200">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="mt-2 text-xl font-semibold text-white">{Math.round(progress)}%</p>
              </div>
            </div>
          </div>
          <textarea className="mt-6 w-full min-h-[18rem] rounded-[1.75rem] border border-white/10 bg-slate-950/95 p-5 text-base text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10 resize-none" placeholder="Start typing or paste your text here..." value={text} onChange={(e) => setText(e.target.value)} />
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <button onClick={handleCopy} className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"><Copy size={18} /> Copy</button>
              <button onClick={handleClear} className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-700"><Trash size={18} /> Clear</button>
              <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"><Download size={18} /> Download</button>
            </div>
            <button onClick={() => setFocusMode(!focusMode)} className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">{focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}</button>
          </div>
          {!focusMode && (
            <>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Goals</p>
                  <div className="mt-4 h-3 w-full rounded-full bg-slate-800">
                    <div className="h-3 rounded-full bg-cyan-400 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{words} / {goal} words</p>
                  {motivation && <p className="mt-2 text-sm text-cyan-300">{motivation}</p>}
                </div>
                <div className="space-y-4">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-slate-200">
                    <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Characters</p>
                    <p className="mt-3 text-lg font-semibold text-white">{characters}</p>
                    <p className="text-sm text-slate-400 mt-1">No spaces: {charactersNoSpaces}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-slate-200">
                    <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-300">Readability</p>
                    <div className="mt-3 grid gap-2 text-sm text-slate-400">
                      <p>Sentences: {sentences}</p>
                      <p>Paragraphs: {paragraphs}</p>
                      <p>Avg sentence length: {avgSentenceLength}</p>
                      <p>Reading time: {readingTime} min</p>
                      <p>Speaking time: {speakingTime} min</p>
                    </div>
                  </div>
                </div>
              </div>
              <StatsCards text={text} />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`My text has ${words} words and ${characters} characters!`)}`, "_blank")} className="rounded-full bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">Share on Twitter</button>
                <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank")} className="rounded-full bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">Share on LinkedIn</button>
              </div>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 text-center text-slate-400">Ad Space (Responsive)</div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
