import Link from "next/link"
import { ArrowUpRight, Clock3, ReplaceAll, ScanSearch, Sparkles } from "lucide-react"
import { comingNext, toolCategories } from "@/lib/homeData"

const LATEST_TOOLS = [
  {
    name: "Find & Replace Text",
    href: "/tools/find-and-replace-text",
    description: "Find and replace words, phrases, characters, or multiple values with regex, live preview, and smart conflict checks.",
    icon: ReplaceAll,
    live: true,
    isNew: true,
  },
  {
    name: "ChatGPT Watermark Remover",
    href: "/tools/chatgpt-watermark-remover",
    description: "Scan ChatGPT text for hidden Unicode, zero-width characters, unusual spaces, and copy-paste artifacts before cleaning them.",
    icon: ScanSearch,
    live: true,
    isNew: true,
  },
]

function mergeLatestTools(categories = []) {
  const safeCategories = Array.isArray(categories) ? categories : []
  const existingHrefs = new Set(safeCategories.flatMap((category) => category.tools ?? []).map((tool) => tool.href).filter(Boolean))
  const missingTools = LATEST_TOOLS.filter((tool) => !existingHrefs.has(tool.href))

  if (!missingTools.length) return safeCategories

  const targetIndex = safeCategories.findIndex((category) => /text|seo|ai/i.test(category.category || ""))

  if (targetIndex === -1) {
    return [
      ...safeCategories,
      {
        category: "Text, SEO & AI Tools",
        tools: missingTools,
      },
    ]
  }

  return safeCategories.map((category, index) =>
    index === targetIndex
      ? {
          ...category,
          tools: [...(category.tools ?? []), ...missingTools],
        }
      : category
  )
}

function slugify(value = "") {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

export default function ToolGrid() {
  const categories = mergeLatestTools(toolCategories)

  return (
    <section id="tools" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 md:py-20 lg:px-8">
      <BackgroundDecoration />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader />

        <div className="mt-14 space-y-14">
          {categories.map((category) => {
            const liveTools = (category.tools ?? []).filter((tool) => tool.live)

            if (!liveTools.length) return null

            const categoryId = `category-${slugify(category.category)}`

            return (
              <section key={category.category} aria-labelledby={categoryId}>
                <CategoryHeader id={categoryId} title={category.category} count={liveTools.length} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {liveTools.map((tool, index) => (
                    <ToolCard key={tool.href || tool.name} tool={tool} index={index} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        <ComingNext />
      </div>
    </section>
  )
}

function BackgroundDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 left-[10%] h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-500/10" />
      <div className="absolute right-[5%] top-20 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-500/10" />
      <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-emerald-200/15 blur-3xl dark:bg-emerald-500/5" />
    </div>
  )
}

function SectionHeader() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-semibold text-cyan-700 shadow-sm shadow-cyan-950/5 backdrop-blur dark:border-cyan-900 dark:bg-slate-900/70 dark:text-cyan-300">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Free browser-based tools
      </div>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        Explore All{" "}
        <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
          CountFlows Tools
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
        Choose a free tool to{" "}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">analyze</span>,{" "}
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">clean</span>, or{" "}
        <span className="font-semibold text-purple-600 dark:text-purple-400">improve</span>{" "}
        your text. Results appear instantly in your browser.
      </p>
    </div>
  )
}

function CategoryHeader({ id, title, count }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <h3 id={id} className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h3>

        <div aria-hidden="true" className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500" />
      </div>

      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        {count} {count === 1 ? "tool" : "tools"}
      </span>
    </div>
  )
}

function ToolCard({ tool, index }) {
  const Icon = tool.icon

  return (
    <Link
      href={tool.href}
      aria-label={`Open ${tool.name}`}
      className="group relative overflow-hidden rounded-3xl border border-cyan-200/80 bg-white/95 p-5 shadow-md shadow-cyan-950/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-cyan-900/50 dark:bg-slate-950/85 dark:shadow-black/20 dark:hover:border-cyan-700 dark:hover:shadow-black/40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-200/75 via-purple-200/60 to-emerald-200/60 opacity-70 blur-3xl dark:from-cyan-800/30 dark:via-purple-800/20 dark:to-emerald-800/20" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-emerald-500 text-white shadow-md shadow-purple-500/20">
            {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : <Sparkles className="h-5 w-5" aria-hidden="true" />}
          </div>

          <div className="flex items-center gap-2">
            {tool.isNew && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                New
              </span>
            )}

            <span className="text-xs font-black tracking-wider text-slate-300 dark:text-slate-700">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <h4 className="mt-5 text-lg font-bold tracking-tight text-slate-950 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
          {tool.name}
        </h4>

        <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-400">
          {tool.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
          Open tool
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </div>

        <div aria-hidden="true" className="absolute -bottom-5 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500" />
      </div>
    </Link>
  )
}

function ComingNext() {
  if (!comingNext?.length) return null

  return (
    <div className="relative mt-14 overflow-hidden rounded-3xl border border-cyan-200/70 bg-gradient-to-r from-cyan-50 via-purple-50/70 to-emerald-50 px-5 py-5 text-center shadow-sm dark:border-cyan-900/50 dark:from-cyan-950/20 dark:via-purple-950/20 dark:to-emerald-950/20">
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-purple-500 shadow-sm dark:bg-slate-900 dark:text-purple-400">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
        </span>

        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-white">Coming next:</span>{" "}
          {comingNext.join(" · ")}
        </p>
      </div>
    </div>
  )
}