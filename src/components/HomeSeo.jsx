"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: <Link href="/tools/sentence-calculator" className="text-blue-500 hover:underline">Instant Text Analysis</Link>,
    description: "You can quickly count characters and words with this tool. It also shows sentences, paragraphs, and reading time instantly. This makes editing easier and ensures your text fits limits for social media, essays, or posts. You can also analyze sentence structure using a Sentence Counter</Link> tool to improve clarity and flow.",
  },
    {
      title: <Link href="/tools/character-counter" className="text-blue-500 hover:underline">AI-Powered Rewriting</Link>,
      description: "Get AI suggestions to make your text shorter, clearer, and more effective with simpler vocabulary.",
    },
    {
      title: <Link href="/tools/sentence-calculator" className="text-blue-500 hover:underline">Grammar & Clarity Check</Link>,
      description: "Identify errors and get suggestions for clearer, more professional writing instantly.",
    },
    {
      title: <Link href="/tools/word-counter" className="text-blue-500 hover:underline">Tone & Style Suggestions</Link>,
      description: "Improve tone and style with recommendations tailored to your audience and purpose.",
    },
  ]



export function HomeSeo() {






return (
    <>
      {/* Content Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
        What’s Special About{" "}
        <span className="text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
          Our Tool
        </span>
      </h2>

      <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
        Unlike basic counters, our tool goes beyond showing numbers. It delivers{" "}
        <span className="font-semibold text-gray-900 dark:text-white">instant auto‑analysis</span>, 
        highlights readability issues, and provides{" "}
        <span className="font-semibold text-gray-900 dark:text-white">premium SaaS‑style insights</span> 
        such as sentence balance, keyword density, and difficulty scores.
        <br /><br />
        Whether you’re a{" "}
        <span className="text-cyan-600 dark:text-cyan-400 font-medium">blogger</span>,{" "}
        <span className="text-blue-600 dark:text-blue-400 font-medium">student</span>, or{" "}
        <span className="text-indigo-600 dark:text-indigo-400 font-medium">SEO writer</span>, 
        our tool adapts to your needs — helping you stay within limits for posts, essays, or messages while improving clarity.
        <br /><br />
        For deeper word analysis, you can also explore our{" "}
        <Link
          href="/tools/word-counter"
          className="text-blue-500 hover:underline font-medium"
        >
          Word Counter
        </Link>{" "}
        to check total words easily.
      </p>

      {/* Decorative gradient divider */}
      <div className="mt-10 h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
    
          </motion.div>

          {/* Key Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-8">
              Key Features
            </h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800/50 hover:shadow-lg dark:hover:shadow-cyan-500/10 transition"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-base sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How to Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10 border border-cyan-200 dark:border-cyan-500/20"
          >
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white">
              How to Use the Character Counter
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              Simply type or paste your text into the counter and receive instant analysis. The tool displays character counts, word counts, and additional metrics like sentences, paragraphs, and estimated reading time—perfect for essays, social media content, and emails.
            </p>
          </motion.div>

          {/* Readability Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white">
              Readability & Text Analysis
            </h2>

            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Difficult Words Detection</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Our tool identifies complex terms in your text, helping you simplify vocabulary and improve readability for a wider audience.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Reading Time Estimation</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Get accurate reading time estimates so your audience knows how long it takes to read your content before they start.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Speaking Time Calculation</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Perfect for presentations and speeches. Estimate speaking time to ensure you stay within your allotted duration.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        </section>
    </>
  );
}
