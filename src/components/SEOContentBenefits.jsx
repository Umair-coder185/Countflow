"use client";

import { BarChart3 } from "lucide-react";

export default function SEOContentBenefits() {
  return (
    <section
      className="max-w-3xl mt-10 mx-auto mb-12 px-5 sm:px-8 py-10 sm:py-14 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-blue-950 text-gray-700 dark:text-gray-300"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <BarChart3 className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400 text-center">
          Benefits of Using CountFlows for Word, Character, and Reading Time Analysis
        </h2>
      </div>

      {/* Content */}
      <p className="text-base sm:text-lg mb-6 text-center max-w-2xl mx-auto">
        CountFlows offers premium, free tools designed for bloggers, students,
        and SEO professionals. By combining accuracy with speed, our platform
        helps you create content that ranks higher and engages readers longer.
      </p>

      <ul className="list-disc pl-6 sm:pl-10 space-y-4 text-base sm:text-lg leading-relaxed">
        <li>
          <strong>Meet word and character limits:</strong> Perfect for{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            SEO blog posts, social media captions, and academic writing
          </span>.
        </li>
        <li>
          <strong>Boost search rankings:</strong> Target{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            long-tail keywords like “best free word counter for students”
          </span>{" "}
          and optimize for search intent.
        </li>
        <li>
          <strong>Enhance user experience:</strong> Provide{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            accurate reading time estimates
          </span>{" "}
          and improve readability with concise writing.
        </li>
        <li>
          <strong>Save time instantly:</strong> Enjoy{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            free, unlimited analysis tools
          </span>{" "}
          without sign‑ups or restrictions.
        </li>
      </ul>

      <p className="mt-8 text-base sm:text-lg text-center">
        With CountFlows, you don’t just analyze text  you{" "}
        <span className="font-semibold text-blue-700 dark:text-blue-300">
          create content that Google rewards
        </span> and readers love.
      </p>
    </section>
  );
}
