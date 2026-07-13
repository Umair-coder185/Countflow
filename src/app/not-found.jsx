// app/not-found.jsx
import Link from "next/link"
import {
  FileText, Clock, CaseSensitive, TextSearch, Type, AlignLeft,
  Home, LayoutGrid, BookOpen,
} from "lucide-react"

export const metadata = {
  title: "Page Not Found — Countflows",
  robots: { index: false, follow: true },
}

const popularTools = [
  { href: "/tools/word-counter", label: "Word Counter", desc: "Count words & characters instantly", icon: FileText },
  { href: "/tools/character-counter", label: "Character Counter", desc: "Track character limits in real time", icon: Type },
  { href: "/tools/sentence-counter", label: "Sentence Counter", desc: "Count sentences in any text", icon: AlignLeft },
  { href: "/tools/reading-time", label: "Reading Time", desc: "Estimate how long your text takes to read", icon: Clock },
  { href: "/tools/case-converter", label: "Case Converter", desc: "Switch between UPPER, lower & Title Case", icon: CaseSensitive },
  { href: "/tools/keyword-density-checker", label: "Keyword Density Checker", desc: "Analyze keyword usage for SEO", icon: TextSearch },
]

// Update these with your real blog slugs
const blogPosts = [
  { href: "/blog/speech-time-calculator", label: "Speech Time Calculator" },
  { href: "/blog/fast-reading-test", label: "Fast Reading Test" },

]

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 bg-white dark:bg-slate-950">
      <div className="max-w-3xl w-full text-center">
        {/* 404 statement */}
        <p className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-gray-600 dark:text-slate-400">
          The page you&apos;re looking for may have been moved, renamed, or never existed.
          But don&apos;t worry — the tools below might be what you came for.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition hover:scale-105"
          >
            <Home size={16} /> Back to Home
          </Link>
          <Link
            href="/tools"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/20 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <LayoutGrid size={16} /> Browse All Tools
          </Link>
        </div>

        {/* Popular tools */}
        <h2 className="mt-14 text-lg font-semibold text-gray-900 dark:text-white">
          Popular free tools
        </h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {popularTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition"
              >
                <Icon size={20} className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition" />
                <p className="mt-2 font-semibold text-sm text-gray-900 dark:text-white">
                  {tool.label}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                  {tool.desc}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Blog links */}
        <h2 className="mt-12 text-lg font-semibold text-gray-900 dark:text-white">
          From the blog
        </h2>
        <div className="mt-4 flex flex-col items-center gap-2">
          {blogPosts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              <BookOpen size={14} /> {post.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}