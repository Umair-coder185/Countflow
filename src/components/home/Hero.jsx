// src/components/home/Hero.jsx  (v2)
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Zap,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";

const trustItems = [
  { icon: Zap, text: "Instant results", color: "text-amber-500" },
  { icon: MousePointerClick, text: "No sign-up", color: "text-blue-500" },
  { icon: ShieldCheck, text: "Text stays on your device", color: "text-green-500" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-white px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 md:py-24 lg:px-8">
      {/* Decorative color glows: pure CSS, no motion library */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-300/15 blur-2xl dark:bg-cyan-500/10" />
        <div className="absolute -top-12 right-1/4 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-600/10" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm shadow-slate-200 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          100% free text tools
        </span>

        {/* Short H1: gradient on the keywords, dark text only on line 2 */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 transition bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400">
            Word &amp; ch<span className="text-slate-900 dark:text-slate-100">a</span>ra<span className="text-slate-900 dark:text-slate-100">c</span>ter Counter
          </span>
          <span className="mt-2 block text-2xl font-bold text-gray-800 dark:text-slate-200 sm:text-3xl">
            Free. Instant. Private.
          </span>
        </h1>

        {/* One short sentence instead of three lines */}
        <p className="mx-auto mt-5 max-w-xl text-base text-slate-700 dark:text-slate-300 sm:text-lg">
          Count words, characters, sentences, and reading time as you type,
          plus case converters, cleanup tools, and text generators. Your text
          never leaves your browser.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#tools"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-opacity hover:opacity-90 sm:w-auto"
          >
            Browse All Tools
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/tools/word-counter"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400 sm:w-auto"
          >
            Try the Word Counter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Trust row: colored icons, short labels */}
        <ul className="mt-8 flex flex-col items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300 sm:flex-row sm:gap-6">
          {trustItems.map((item) => (
            <li key={item.text} className="flex items-center gap-2">
              <item.icon className={`h-4 w-4 ${item.color}`} aria-hidden="true" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}