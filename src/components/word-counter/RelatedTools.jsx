import Link from "next/link"
import { ChevronRight } from "lucide-react"

const relatedTools = [
  {
    name: "Character Counter",
    href: "/tools/character-counter",
    description: "Check characters with and without spaces.",
  },
  {
    name: "Sentence Counter",
    href: "/tools/sentence-counter",
    description: "Count sentences and review sentence length.",
  },
  {
    name: "Reading Time Calculator",
    href: "/tools/reading-time",
    description: "Estimate how long your text takes to read.",
  },
  {
    name: "AI Text Cleaner",
    href: "/tools/ai-text-cleaner",
    description: "Clean formatting and common AI text artifacts.",
  },
  {
    name:"Keyword density checker",
    href :"/tools/keyword-density-checker",
    description:"check the keyword density in article.",
  }
]

export default function RelatedTools() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/90">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
        Related tools
      </p>

      <nav aria-label="Related text tools" className="mt-3">
        <ul className="space-y-2">
          {relatedTools.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="group block rounded-xl border border-transparent p-3 transition hover:border-cyan-200 hover:bg-cyan-50 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/30"
              >
                <span className="flex items-center justify-between gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {tool.name}
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-600"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-gray-400">
                  {tool.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}