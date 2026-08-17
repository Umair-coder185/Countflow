import { Clock, Hash, ListTree, Mic } from "lucide-react"

const statsConfig = [
  { key: "charactersNoSpaces", label: "Characters, no spaces", icon: Hash },
  { key: "readingTime", label: "Reading time", icon: Clock },
  { key: "speakingTime", label: "Speaking time", icon: Mic },
  { key: "avgSentenceLength", label: "Avg. sentence", icon: ListTree },
]

export default function StatsCard({
  charactersNoSpaces,
  readingTime,
  speakingTime,
  avgSentenceLength,
}) {
  const values = {
    charactersNoSpaces: charactersNoSpaces.toLocaleString(),
    readingTime,
    speakingTime,
    avgSentenceLength: `${avgSentenceLength} words`,
  }

  return (
    <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
      {statsConfig.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.key}
            className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5 dark:border-gray-700 dark:bg-gray-900"
          >
            <Icon
              className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <p className="mt-0.5 truncate text-sm font-bold tabular-nums text-gray-900 dark:text-gray-100">
                {values[item.key]}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}