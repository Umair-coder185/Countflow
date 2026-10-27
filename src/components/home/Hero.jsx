
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
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-b
        from-slate-50 via-slate-100/80 to-white
        px-4 py-10
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        sm:px-6 sm:py-16 md:py-24 lg:px-8
      "
    >
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-10 left-[10%] h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl dark:bg-cyan-500/5 sm:-top-24 sm:left-[12%] sm:h-72 sm:w-72 sm:bg-cyan-300/20 sm:blur-3xl sm:dark:bg-cyan-500/10" />

        <div className="absolute -top-8 right-[10%] h-32 w-32 rounded-full bg-purple-300/10 blur-2xl dark:bg-purple-500/5 sm:-top-16 sm:right-[12%] sm:h-72 sm:w-72 sm:bg-purple-300/15 sm:blur-3xl sm:dark:bg-purple-500/10" />

        <div className="absolute left-1/2 top-24 h-28 w-28 -translate-x-1/2 rounded-full bg-emerald-200/5 blur-2xl dark:bg-emerald-500/5 sm:top-32 sm:h-64 sm:w-64 sm:bg-emerald-200/10 sm:blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">

        {/* Top badge */}
        <div className="mt-4 flex justify-center sm:mt-0">
          <span
            className="
              inline-flex items-center gap-2
              rounded-full border border-cyan-200
              bg-white/90 px-3 py-1.5
              text-[11px] font-semibold text-slate-700
              shadow-sm shadow-cyan-950/5
              dark:border-cyan-900 dark:bg-slate-900/80
              dark:text-slate-200
              sm:bg-white/80 sm:px-4 sm:py-2
              sm:text-xs sm:backdrop-blur
            "
          >
            <Sparkles
              className="h-3.5 w-3.5 text-cyan-500"
              aria-hidden="true"
            />
            Free browser-based text tools
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="
            mx-auto mt-5 max-w-4xl
            text-[28px] font-black leading-tight
            tracking-tight text-slate-950
            dark:text-white
            sm:mt-7 sm:text-5xl md:text-6xl
          "
        >
          Free Online Text Tools for{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
            Writing, SEO &amp; AI
          </span>
        </h1>

        {/* Brand promise */}
        <p className="mt-3 text-base font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:mt-4 sm:text-xl">
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

        {/* Mobile description */}
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-300 sm:hidden">
          Count words, characters, syllables and clean AI text instantly.
        </p>

        {/* Desktop description — unchanged */}
        <p className="mx-auto mt-5 hidden max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:block">
          Use free online text and AI tools to count{" "}
          <strong className="font-semibold text-slate-800 dark:text-slate-100">
            words, characters, sentences and syllables
          </strong>
          , clean AI-generated text, calculate AI tokens and API costs,
          check keyword density and reading time, and format your
          text instantly.
        </p>

        {/* Reassurance */}
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-slate-500 dark:text-slate-400 sm:mt-3 sm:text-sm">
          No account, no complicated setup, and no need to upload your text.
        </p>

        {/* Buttons — half width on mobile */}
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">

          <a
            href="#tools"
            className="
              group inline-flex
              w-[52%] min-w-[185px] max-w-[220px]
              items-center justify-center gap-2
              rounded-xl bg-gradient-to-r
              from-blue-600 via-cyan-500 to-cyan-500
              px-3 py-3 text-xs font-bold text-white
              shadow-lg shadow-cyan-500/20
              transition-all duration-300
              hover:shadow-xl hover:shadow-cyan-500/30
              sm:w-auto sm:min-w-0 sm:max-w-none
              sm:px-7 sm:py-3.5 sm:text-sm
            "
          >
            Explore Free Tools
            <ArrowDown
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <Link
            href="/tools/ai-text-cleaner"
            className="
              group inline-flex
              w-[52%] min-w-[185px] max-w-[220px]
              items-center justify-center gap-2
              rounded-xl border border-slate-300
              bg-white/90 px-3 py-3
              text-xs font-bold text-slate-800
              shadow-sm transition-all duration-300
              hover:border-purple-300 hover:shadow-md
              dark:border-slate-700 dark:bg-slate-900/80
              dark:text-slate-200 dark:hover:border-purple-700
              sm:w-auto sm:min-w-0 sm:max-w-none
              sm:px-7 sm:py-3.5 sm:text-sm
            "
          >
            Try AI Text Cleaner
            <ArrowRight
              className="h-4 w-4 shrink-0 text-purple-500 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

        </div>

        {/* Trust signals */}
        <ul className="mt-6 flex flex-col items-center justify-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-300 sm:mt-8 sm:flex-row sm:gap-7 sm:text-sm">
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
