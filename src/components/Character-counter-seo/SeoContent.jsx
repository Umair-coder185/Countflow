"use client"
import Link from "next/link"


import { motion } from "framer-motion";

export default function SEOContent() {
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

  const comparisonData = [
    { feature: "Main Function", character: "Counts characters, spaces, symbols", word: "Counts total words" },
    { feature: "Best For", character: "Social media, SEO titles, SMS limits", word: "Essays, articles, blog writing" },
    { feature: "Extra Features", character: "Sentences, paragraphs, reading time", word: "Word density, keyword usage" },
    { feature: "Accuracy Focus", character: "Text length precision", word: "Content length & readability" },
  ]

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
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
              What is a <span className="text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">Character Counter?</span>
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              A Character Counter is a simple tool that shows how many characters and words your text contains. It also tracks sentences and paragraphs, helping you stay within limits for posts, essays, or messages.
you can also use a <Link href="/tools/word-counter" className="text-blue-500 hover:underline">Word Counter</Link> to check total words easily.
            </p>
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

      {/* Comparison Section */}
      <section className="bg-slate-950 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Character Counter vs <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">Word Counter</span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                Both tools help analyze text, but they serve different purposes depending on your writing needs.
              </p>
            </div>

            {/* Mobile-Friendly Table */}
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

      {/* Benefits Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
              Benefits of Using This Tool
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              Our Character Counter enables faster, more precise text monitoring with comprehensive metrics. Track word counts, sentence structure, and paragraph analysis to perfect your writing for essays, social media, professional emails, and any content where precision matters.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                { title: "Accurate Metrics", desc: "Real-time character and word count" },
                { title: "Mobile Friendly", desc: "Works seamlessly on all devices" },
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
    </>
  )
}

      <div >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Character Limits for Different Platforms
        </h1>

        {/* Social Media Character Limits */}
        <h2 className="text-2xl font-bold">Social Media Character Limits</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          A <strong>character counter</strong> helps you stay within social media limits easily. 
          Knowing limits prevents cutting off posts or captions unexpectedly.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            On <strong>Facebook</strong>, a status can contain up to 63,206 characters, 
            giving plenty of space for detailed posts.
          </li>
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            <strong>Instagram</strong> captions are limited to 2,200 characters, 
            so concise and engaging writing works best.
          </li>
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            For <strong>X (Twitter)</strong>, normal users have 280 characters, 
            while premium users can post up to 25,000 characters.
          </li>
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            <strong>Bluesky</strong> posts allow 300 characters, requiring short, 
            clear messages for maximum impact.
          </li>
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            <strong>Pinterest</strong> board descriptions can have 500 characters, 
            letting you summarize ideas effectively.
          </li>
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            <strong>Reddit</strong> titles are limited to 300 characters, 
            so create catchy and informative headings.
          </li>
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            <strong>YouTube</strong> video titles allow up to 100 characters, 
            ensuring clarity and audience attention.
          </li>
          <li className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            <strong>HTML title tags</strong> are recommended up to 60 characters 
            to display fully in search results.
          </li>
        </ul>

        {/* SEO Title & Meta Limits */}
        <h2 className="text-2xl font-bold">SEO Title & Meta Limits</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          A <strong>characters</strong> count is crucial for SEO titles and meta descriptions. 
          It ensures your titles display fully in search result without getting cut off.
        </p>
      </motion.div>
    
  

     <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
      SEO Title & Meta Limits </h3>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        A characters count is crucial for SEO titles and meta descriptions. It ensures your titles display fully in search result without getting cut off.

Meta descriptions should also follow proper limits, usually around 150–160 characters. Using a character counter helps optimize both titles and descriptions for better SEO performance.

      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Who Should Use a Character Counter?</h2>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Students & Researchers </h2>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          Students and researchers often need precise writing limits, making a Character Counter essential. It helps them count words in Google Docs quickly and check text length for essays, reports, and papers. Also, it ensures clarity and accuracy while meeting formatting requirements.
          </p>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Writers & Authors
</h2>
       <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Writers and authors rely on a Letter Count Tool to track their text length accurately. It also helps maintain style, meet submission limits, and ensure concise, polished writing. This tool saves time and improves overall content quality.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Marketers & Copywriters

       </h2>

       <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Marketers and copywriters use a Text Counter to optimize content for social media and ads. It also ensures messages fit character limits and engage audiences effectively.
        </p>

        <h2  className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Social Media Managers
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Social media managers rely on a Writing Length Checker to keep posts concise and effective. It also helps meet platform character limits and boost engagement.
          </p>




  

</div>


  
  