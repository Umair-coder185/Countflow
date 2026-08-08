// src/components/home/LimitsCheatSheet.jsx
import Link from "next/link";
import { characterLimits } from "@/lib/homeData";

// Homepage = teaser: sirf sab se common limits.
// Full cheat sheet /tools/character-counter#limits-cheat-sheet pe hai.
const topLimits = characterLimits.slice(0, 6);

export default function LimitsCheatSheet() {
  return (
    <section className="bg-slate-50 px-4 py-12 dark:bg-slate-900 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Platform Character Limits at a Glance
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600 dark:text-slate-400 sm:text-lg">
          Most platforms cut your text at a fixed character limit. These are the
          ones writers hit most often.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-gray-100 dark:bg-slate-800">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  Platform / Field
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  Limit (characters)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
              {topLimits.map((row) => (
                <tr key={row.platform} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {row.platform}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-slate-400">
                    {row.limit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Professional text tools for clean, accurate writing
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  After you confirm your character limits, the Syllable Counter helps you refine poems and spoken text,
                  while the AI Text Cleaner removes hidden formatting, smart punctuation, and AI-generated artifacts.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/tools/syllable-counter"
                className="rounded-3xl border border-slate-200 p-6 text-left transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-slate-950"
              >
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  Syllable Counter
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  Count syllables in words, lines, and poems and validate haiku with live 5-7-5 checks.
                </p>
                <p className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Try the Syllable Counter →
                </p>
              </Link>
              <Link
                href="/tools/ai-text-cleaner"
                className="rounded-3xl border border-slate-200 p-6 text-left transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-slate-950"
              >
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  AI Text Cleaner
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  Strip markdown, smart quotes, invisible characters, and AI formatting noise before finalizing your copy.
                </p>
                <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">
                  Helps reduce AI detection signals across formatted text.
                </p>
                <p className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Try the AI Text Cleaner →
                </p>
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
          Need every limit — X Premium, Quora, Threads, Bluesky, meta
          descriptions? See the full{" "}
          <Link
            href="/tools/character-counter#limits-cheat-sheet"
            className="font-medium text-blue-500 hover:underline"
          >
            Character Limits Cheat Sheet (2026)
          </Link>{" "}
          and check your text against it in real time.
        </p>
      </div>
    </section>
  );
}