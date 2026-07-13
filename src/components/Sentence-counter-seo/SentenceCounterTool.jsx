"use client";

import { useState } from "react";

import { Copy, Trash, Download } from "lucide-react";
import StatsCard from "@/components/StatsCard";

export default function SentenceCounterTool() {
  const [text, setText] = useState("");
  const [goal, setGoal] = useState(50);

  const handleClear = () => setText("");
  const handleCopy = () => navigator.clipboard.writeText(text);
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Sentence splitting — ignores decimals like 3.5 so they don't count as breaks
  const sentences =
    text.trim() === ""
      ? []
      : text
          .split(/(?<![0-9])[.!?]+(?![0-9])/)
          .map((s) => s.trim())
          .filter(Boolean);

  const sentenceCount = sentences.length;
  const progress = Math.min((sentenceCount / Math.max(goal, 1)) * 100, 100);
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const avgSentenceLength =
    sentenceCount === 0 ? 0 : Math.round(wordCount / sentenceCount);

  const longestSentence = sentences.reduce(
    (longest, current) =>
      current.split(/\s+/).length > longest.split(/\s+/).length
        ? current
        : longest,
    ""
  );
  const longestSentenceLength =
    longestSentence === "" ? 0 : longestSentence.split(/\s+/).length;

  // Complexity score (simple heuristic: commas + length)
  const complexityScore =
    sentenceCount === 0
      ? 0
      : Math.round(
          (sentences.reduce(
            (acc, s) => acc + (s.match(/,/g)?.length || 0),
            0
          ) /
            sentenceCount) *
            10 +
            avgSentenceLength
        );

  // Flesch Reading Ease (approximate)
  const avgSyllablesPerWord =
    wordCount === 0 ? 0 : text.length / wordCount / 3;
  const fleschScore =
    wordCount === 0
      ? 0
      : Math.round(
          206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord
        );

  let readabilityLabel = "⚪ Neutral";
  if (wordCount === 0) readabilityLabel = "⚪ Neutral";
  else if (fleschScore >= 70) readabilityLabel = "😊 Easy to read";
  else if (fleschScore >= 60) readabilityLabel = "🙂 Plain English";
  else if (fleschScore >= 50) readabilityLabel = "📖 Fairly difficult";
  else readabilityLabel = "📚 Difficult (academic level)";

  return (
    <>
      {/* Results Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-4">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <span className="font-semibold">📖 Sentences: {sentenceCount}</span>
            <span className="font-semibold">📝 Words: {wordCount}</span>
            <span className="font-semibold">
              📊 Avg Length: {avgSentenceLength} words
            </span>
            <span className="font-semibold">
              🔍 Longest Sentence: {longestSentenceLength} words
            </span>
            <span className="font-semibold">
              ⚡ Complexity Score: {complexityScore}
            </span>
            <span className="font-semibold">
              📚 Readability: {fleschScore} – {readabilityLabel}
            </span>
          </div>
          {longestSentence && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Longest sentence: “{longestSentence}”
            </p>
          )}
        </div>
      </section>

      {/* Tool Box */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
        
         
        
          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text..."
            aria-label="Text to count sentences in"
            className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[280px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg"
          />

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
              >
                <Copy size={18} /> Copy
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                <Trash size={18} /> Clear
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
              >
                <Download size={18} /> Download
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
              Use the toolbar to copy, clear, or download your text. Stats
              update instantly as you type or paste.
            </p>
          </div>

          {/* Sentence Goal Tracker & Readability */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sentence Goal
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    Set a target and track your writing progress.
                  </p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  aria-label="Sentence goal"
                  className="w-20 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mt-5">
                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>
                    {sentenceCount} / {goal} sentences
                  </span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-cyan-600/10 dark:bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-800 dark:text-cyan-200 text-center">
                {progress >= 100
                  ? "🎉 Goal achieved!"
                  : progress >= 75
                    ? "Almost there!"
                    : "Keep writing!"}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Readability
              </p>
              <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Avg. sentence:{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {avgSentenceLength}
                  </span>{" "}
                  words
                </p>
                <p>
                  Level:{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {avgSentenceLength <= 14
                      ? "Easy"
                      : avgSentenceLength <= 20
                        ? "Medium"
                        : "Hard"}
                  </span>
                </p>
              </div>
              <div className="mt-6 rounded-2xl bg-violet-600/10 dark:bg-violet-500/10 p-4 text-sm text-violet-800 dark:text-violet-200">
                Tip: Aim for an average of 15–20 words per sentence for clear,
                natural writing.
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <StatsCard text={text} />
          </div>

          {/* Tip Banner */}
          <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
            <p className="font-semibold">Crafting an essay or article?</p>
            <p className="mt-2">
              Breaking your writing into shorter sentences can improve clarity
              and readability. Use this tool to analyze and perfect your
              sentence structure.
            </p>
          </div>
       
      </section>
    </>
  );
}