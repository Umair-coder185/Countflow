// src/components/home/Hero.jsx

import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  Zap,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

const trustItems = [
  {
    icon: Zap,
    text: "Instant results",
    color: "text-amber-500",
  },
  {
    icon: MousePointerClick,
    text: "No sign-up",
    color: "text-blue-500",
  },
  {
    icon: ShieldCheck,
    text: "Text stays on your device",
    color: "text-emerald-500",
  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/80 to-white px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 md:py-24 lg:px-8">

      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-24 left-[12%] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />

        <div className="absolute -top-16 right-[12%] h-72 w-72 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-500/10" />

        <div className="absolute left-1/2 top-32 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/10 blur-3xl dark:bg-emerald-500/5" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">

        {/* Top badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-cyan-950/5 backdrop-blur dark:border-cyan-900 dark:bg-slate-900/70 dark:text-slate-200">
            <Sparkles
              className="h-3.5 w-3.5 text-cyan-500"
              aria-hidden="true"
            />
            Free browser-based text tools
          </span>
        </div>

        {/* Main heading */}
        <h1 className="mx-auto mt-7 max-w-4xl text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl">

          Free Online Text Tools for{" "}

          <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
            Writing, SEO &amp; AI
          </span>

        </h1>

        {/* Brand promise */}
        <p className="mt-4 text-lg font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-xl">
          <span className="text-cyan-600 dark:text-cyan-400">
            Free.
          </span>{" "}

          <span className="text-purple-600 dark:text-purple-400">
            Instant.
          </span>{" "}

          <span className="text-emerald-600 dark:text-emerald-400">
            Private.
          </span>
        </p>

        {/* SEO + user-focused intro */}
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
          Use free online text tools to count{" "}
          <strong className="font-semibold text-slate-800 dark:text-slate-100">
            words, characters, sentences, syllables , Ai Text cleaner , AI tokens counter and cost calculator
          </strong>
          , check keyword density and reading time, and format
          your text instantly.
        </p>

        {/* Small reassurance */}
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          No account, no complicated setup, and no need to upload your text.
        </p>

        {/* Main actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <a
            href="#tools"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 sm:w-auto"
          >
            Explore Free Tools

            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <Link
            href="/tools/word-counter"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-purple-700 sm:w-auto"
          >
            Try Word Counter

            <ArrowRight
              className="h-4 w-4 text-purple-500 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

        </div>

        {/* Trust signals */}
        <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 sm:flex-row sm:gap-7">

          {trustItems.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <item.icon
                  className={`h-4 w-4 ${item.color}`}
                  aria-hidden="true"
                />
              </span>

              {item.text}
            </li>
          ))}

        </ul>

      </div>
    </section>
  )
}