"use client"
import Link from "next/link"
import { motion } from "@/lib/no-motion";

export default function SEOContent() {
  const features = [
    {
      title: <Link href="/tools/sentence-calculator" className="text-blue-500 hover:underline">Instant Text Analysis</Link>,
      description: "Quickly count characters and words with this tool. It also shows sentences, paragraphs, and reading time instantly, making editing easier and helping your text fit limits for social media, essays, or posts.",
    },
    {
      title: <Link href="/tools/character-counter" className="text-blue-500 hover:underline">AI-Powered Rewriting</Link>,
      description: "Get suggestions to make your text shorter, clearer, and more effective with simpler vocabulary.",
    },
    {
      title: <Link href="/tools/sentence-calculator" className="text-blue-500 hover:underline">Grammar & Clarity Check</Link>,
      description: "Identify errors and get suggestions for clearer, more professional writing instantly.",
    },
    {
      title: <Link href="/tools/word-counter" className="text-blue-500 hover:underline">Tone & Style Suggestions</Link>,
      description: "Improve tone and style with recommendations tailored to your audience and purpose.",
    },
  ];

  const comparisonData = [
    { feature: "Main Function", character: "Counts characters, spaces, symbols", word: "Counts total words" },
    { feature: "Best For", character: "Social media, SEO titles, SMS limits", word: "Essays, articles, blog writing" },
    { feature: "Extra Features", character: "Sentences, paragraphs, reading time", word: "Word density, keyword usage" },
    { feature: "Accuracy Focus", character: "Text length precision", word: "Content length & readability" },
  ];

  return (
    <>
      <article aria-label="Character Counter Tool Information">
        <section className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="what-is-character-counter">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h1 id="what-is-character-counter" className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
                What is a <span className="text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">Character Counter?</span>
              </h1>
              <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                A Character Counter is a simple tool that shows how many characters and words your text contains. It also tracks sentences and paragraphs, helping you stay within limits for posts, essays, or messages. You can also use a <Link href="/tools/word-counter" className="text-blue-500 hover:underline">Word Counter</Link> to check total words easily.
              </p>
            </motion.div>

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10 border border-cyan-200 dark:border-cyan-500/20"
              aria-labelledby="how-to-use"
            >
              <h2 id="how-to-use" className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white">
                How to Use the Character Counter
              </h2>
              <ol className="list-decimal pl-6 text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed space-y-2">
                <li>Type or paste your text into the input box above.</li>
                <li>View instant character, word, and sentence counts as you type.</li>
                <li>Set a character goal or use a preset for social media, SEO, or SMS.</li>
                <li>Use the toolbar to copy, clear, or download your text.</li>
                <li>Check additional metrics like reading time and average word length.</li>
              </ol>
            </motion.div>

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
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Complexity Detection</h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    Our tool helps you identify long or complex text so you can simplify vocabulary and improve readability.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Reading Time Estimation</h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    Get a quick sense of how long your content will take to read, which helps readers and writers plan better.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Character Limit Control</h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    Stay within platform limits by tracking character counts in real time, especially for posts, titles, and meta descriptions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-950 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="comparison">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 id="comparison" className="text-3xl sm:text-4xl font-semibold">
                  Character Counter vs <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">Word Counter</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                  Both tools help analyze text, but they serve different purposes depending on your writing goals.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-900/50">
                      <th className="px-3 sm:px-4 py-3 text-left font-semibold">Feature</th>
                      <th className="px-3 sm:px-4 py-3 text-left font-semibold text-cyan-400">Character Counter</th>
                      <th className="px-3 sm:px-4 py-3 text-left font-semibold text-blue-400">Word Counter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-800 hover:bg-slate-900/30 transition">
                        <td className="px-3 sm:px-4 py-4 font-medium">{row.feature}</td>
                        <td className="px-3 sm:px-4 py-4 text-slate-300">{row.character}</td>
                        <td className="px-3 sm:px-4 py-4 text-slate-300">{row.word}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-center text-base">
                For best results, use both tools together to manage text length and readability effectively.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="benefits">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 id="benefits" className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
                Benefits of Using This Tool
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                Our Character Counter gives you fast, precise metrics and helps you stay within limits for essays, social media captions, and professional content.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { title: "Accurate Metrics", desc: "Real-time character and word count" },
                  { title: "Mobile Friendly", desc: "Works well on all devices" },
                  { title: "Free & Fast", desc: "No signup required, instant results" },
                  { title: "SEO Optimized", desc: "Perfect for content optimization" },
                ].map((benefit, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="use-cases">
          <div className="max-w-4xl mx-auto">
            <h2 id="use-cases" className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white mb-8">Who Should Use a Character Counter?</h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg">
              <li><strong>Students & Researchers:</strong> For essays, reports, and academic writing with strict length requirements.</li>
              <li><strong>Writers & Authors:</strong> To maintain style, meet submission limits, and ensure concise writing.</li>
              <li><strong>Marketers & Copywriters:</strong> For optimizing ad copy, social media posts, and email subject lines.</li>
              <li><strong>Social Media Managers:</strong> To keep posts within platform limits and maximize engagement.</li>
              <li><strong>SEO Professionals:</strong> For crafting meta titles and descriptions that fit search engine guidelines.</li>
            </ul>
          </div>
        </section>
      </article>
    </>
  )
}
