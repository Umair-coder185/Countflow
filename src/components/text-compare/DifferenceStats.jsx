"use client"

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value)
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </div>
    </div>
  )
}

export default function DifferenceStats({ result }) {
  if (!result) return null

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Similarity"
          value={`${result.similarity.toFixed(1)}%`}
        />
        <StatCard
          label="Difference runs"
          value={formatNumber(result.differenceCount)}
        />
        <StatCard
          label="Added words"
          value={formatNumber(result.stats.addedWords)}
        />
        <StatCard
          label="Removed words"
          value={formatNumber(result.stats.removedWords)}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Original words"
          value={formatNumber(result.stats.originalWords)}
        />
        <StatCard
          label="Changed words"
          value={formatNumber(result.stats.revisedWords)}
        />
        <StatCard
          label="Characters added"
          value={formatNumber(result.stats.addedCharacters)}
        />
        <StatCard
          label="Characters removed"
          value={formatNumber(result.stats.removedCharacters)}
        />
      </div>
    </>
  )
}