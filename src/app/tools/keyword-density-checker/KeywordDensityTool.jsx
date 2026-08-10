"use client";

import { useState, useMemo } from "react";
import { Copy, Trash, Download, Search, AlertTriangle } from "lucide-react";

// Common English stop words
const STOP_WORDS = new Set(
  `a about above after again against all am an and any are aren't as at be because
  been before being below between both but by can't cannot could couldn't did didn't
  do does doesn't doing don't down during each few for from further had hadn't has
  hasn't have haven't having he he'd he'll he's her here here's hers herself him
  himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself
  let's me more most mustn't my myself no nor not of off on once only or other ought
  our ours ourselves out over own same shan't she she'd she'll she's should shouldn't
  so some such than that that's the their theirs them themselves then there there's
  these they they'd they'll they're they've this those through to too under until up
  very was wasn't we we'd we'll we're we've were weren't what what's when when's where
  where's which while who who's whom why why's with won't would wouldn't you you'd
  you'll you're you've your yours yourself yourselves`.split(/\s+/)
);

const DENSITY_WARNING_THRESHOLD = 2.25;

export default function KeywordDensityTool() {
  const [text, setText] = useState("");
  const [phraseLength, setPhraseLength] = useState(1);
  const [ignoreStop, setIgnoreStop] = useState(true);

  // Core analysis
  const rawWordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const wordsArray = text.toLowerCase().match(/\b[a-z]+(?:'[a-z]+)?\b/g) || [];
  const charCount = text.length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;

  const filtered = ignoreStop
    ? wordsArray.filter((w) => !STOP_WORDS.has(w))
    : wordsArray;

  const { sortedKeywords, uniquePhrases, maxDensity } = useMemo(() => {
    const frequencyMap = {};
    for (let i = 0; i <= filtered.length - phraseLength; i++) {
      const gram = filtered.slice(i, i + phraseLength).join(" ");
      frequencyMap[gram] = (frequencyMap[gram] || 0) + 1;
    }

    const denominator = Math.max(filtered.length, 1);
    const sorted = Object.entries(frequencyMap)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: ((count * phraseLength) / denominator) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);

    const maxD = sorted.length > 0 ? Math.max(...sorted.map((s) => s.density)) : 0;

    return {
      sortedKeywords: sorted,
      uniquePhrases: Object.keys(frequencyMap).length,
      maxDensity: maxD,
    };
  }, [filtered, phraseLength]);

  const handleClear = () => setText("");

  const handleCopy = () => {
    const rows = sortedKeywords
      .map((r) => `${r.phrase}\t${r.count}\t${r.density.toFixed(2)}%`)
      .join("\n");
    navigator.clipboard.writeText(`Keyword\tFrequency\tDensity\n${rows}`);
  };

  const handleDownload = () => {
    const rows = sortedKeywords
      .map((r) => `"${r.phrase}",${r.count},${r.density.toFixed(2)}`)
      .join("\n");
    const csv = `Keyword,Frequency,Density (%)\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keyword-density-${phraseLength}-word.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasOverOptimized = maxDensity > DENSITY_WARNING_THRESHOLD;

  return (
    <div className="space-y-5">
      {/* ===== STATS BAR (Top) ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Words", value: rawWordCount, icon: "📝" },
          { label: "Characters", value: charCount, icon: "🔡" },
          { label: "Sentences", value: sentences, icon: "📖" },
          { label: "Unique Keywords", value: uniquePhrases, icon: "🔑" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-center shadow-sm"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {stat.icon} {stat.label}
            </div>
            <div className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
              {stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* ===== TOGGLE CONTROLS (Above Textarea) ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm">
        {/* Phrase Length Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-1">
            Phrase Length:
          </span>
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-600 p-1 bg-gray-50 dark:bg-gray-800">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPhraseLength(n)}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  phraseLength === n
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/25 scale-105"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {n} {n === 1 ? "Word" : "Words"}
              </button>
            ))}
          </div>
        </div>

        {/* Stop Words Toggle Switch */}
        <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300 select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={ignoreStop}
              onChange={(e) => setIgnoreStop(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-cyan-500 transition-colors" />
            <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
          </div>
          <span>
            Ignore stop words{" "}
            <span className="text-gray-400 dark:text-gray-500">(the, and, of…)</span>
          </span>
        </label>
      </div>

      {/* ===== TEXTAREA ===== */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your content here to analyze keyword density..."
          className="w-full min-h-[220px] sm:min-h-[280px] rounded-2xl border border-gray-300 dark:border-gray-600 p-5 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base leading-relaxed shadow-sm transition-all"
        />
        {text.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            title="Clear text"
          >
            <Trash size={16} />
          </button>
        )}
      </div>

      {/* ===== WARNING BANNER (if density > 2.25%) ===== */}
      {hasOverOptimized && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          <AlertTriangle size={18} className="shrink-0" />
          <span>
            <strong>Keyword stuffing detected!</strong> Some phrases exceed{" "}
            {DENSITY_WARNING_THRESHOLD}% density. Reduce usage for better SEO.
          </span>
        </div>
      )}

      {/* ===== RESULTS TABLE (Below Textarea) ===== */}
      <div>
        {sortedKeywords.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-900/10 p-12 text-center">
            <Search className="mx-auto mb-4 h-8 w-8 text-cyan-400 dark:text-cyan-600" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Start typing or paste your text to see keyword density results
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Results update instantly as you type
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Table Header */}
            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Top {sortedKeywords.length} {phraseLength === 1 ? "word" : `${phraseLength}-word phrases`}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Over {DENSITY_WARNING_THRESHOLD}% ={" "}
                  <span className="text-red-500 font-bold">red warning</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition text-xs font-medium"
                >
                  <Copy size={12} /> Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition text-xs font-medium"
                >
                  <Download size={12} /> CSV
                </button>
              </div>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3.5 font-semibold w-12 text-center">#</th>
                  <th className="px-6 py-3.5 font-semibold">Keyword / Phrase</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Frequency</th>
                  <th className="px-6 py-3.5 text-right font-semibold w-52">Density</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {sortedKeywords.map((r, index) => {
                  const isOverOptimized = r.density > DENSITY_WARNING_THRESHOLD;
                  return (
                    <tr
                      key={r.phrase}
                      className={`transition-colors ${
                        isOverOptimized
                          ? "bg-red-50/60 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-900/60"
                      }`}
                    >
                      <td className="px-6 py-3.5 text-center text-gray-400 dark:text-gray-500 text-xs font-mono">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`font-semibold capitalize ${
                            isOverOptimized
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {r.phrase}
                        </span>
                        {isOverOptimized && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-300">
                            <AlertTriangle size={10} className="mr-1" />
                            High
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-right tabular-nums font-medium text-gray-700 dark:text-gray-300">
                        {r.count}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="hidden sm:block h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className={`h-full rounded-full ${
                                isOverOptimized
                                  ? "bg-red-500"
                                  : "bg-gradient-to-r from-cyan-500 to-sky-400"
                              }`}
                              style={{
                                width: `${Math.min(
                                  (r.density / (maxDensity || 1)) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`tabular-nums font-bold ${
                              isOverOptimized
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {r.density.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}