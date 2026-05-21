"use client";

import { PenTool } from "lucide-react";
import { motion } from "framer-motion";

export default function SEOWritingTips() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl  mt-8 mx-auto mb-8 sm:mb-12 px-4 sm:px-6 py-8 sm:py-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <PenTool className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400 text-center">
          SEO Writing Tips for Better Content
        </h2>
      </div>

      {/* Content */}
      <ul className="list-disc pl-5 sm:pl-8 space-y-4 text-base sm:text-lg leading-relaxed">
        <li>
          Use long‑tail keywords such as{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            best free word counter for students
          </span>{" "}
          and{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            accurate character counter online
          </span>{" "}
          in your headings and body text. These phrases attract highly targeted
          traffic and improve your chances of ranking for niche queries.
        </li>
        <li>
          Keep sentences short and clear. Concise writing improves readability,
          lowers bounce rates, and helps Google understand your content better.
        </li>
        <li>
          Always check your{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            reading time calculator
          </span>{" "}
          results to match your audience’s attention span. Optimized reading
          time increases engagement and session duration.
        </li>
        <li>
          Optimize meta descriptions and titles for every page and tool. Include
          keywords like{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            SEO writing tips for bloggers
          </span>{" "}
          to boost click‑through rates from search results.
        </li>
        <li>
          Link to related tools and guides (e.g.,{" "}
          <a
            href="/tools/word-counter"
            className="text-blue-500 hover:underline"
          >
            Word Counter
          </a>{" "}
          or{" "}
          <a
            href="/tools/reading-time"
            className="text-blue-500 hover:underline"
          >
            Reading Time Calculator
          </a>
          ). Internal linking strengthens site structure and signals authority
          to Google.
        </li>
      </ul>
    </motion.section>
  );
}
