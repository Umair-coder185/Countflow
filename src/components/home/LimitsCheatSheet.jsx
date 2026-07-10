// src/components/home/LimitsCheatSheet.jsx
import Link from "next/link";
import { characterLimits } from "@/lib/homeData";

export default function LimitsCheatSheet() {
  return (
    <section className="bg-slate-50 px-4 py-12 dark:bg-slate-900 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Character Limits Cheat Sheet (2026)
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600 dark:text-slate-400 sm:text-lg">
          Most platforms cut your text at a fixed character limit. The table
          below lists the limits that matter most in 2026.
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
              {characterLimits.map((row) => (
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

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
          Counting for a specific platform? The{" "}
          <Link
            href="/tools/character-counter"
            className="font-medium text-blue-500 hover:underline"
          >
            Character Counter
          </Link>{" "}
          shows characters with and without spaces in real time.
        </p>
      </div>
    </section>
  );
}