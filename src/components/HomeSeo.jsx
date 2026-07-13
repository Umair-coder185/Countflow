import { motion } from "@/lib/no-motion";
import Link from "next/link";

const features = [
  {
    title: <Link href="/tools/sentence-counter" className="text-blue-500 hover:underline">Instant Text Analysis</Link>,
    description: "You can quickly count characters and words with this tool. It also shows sentences, paragraphs, and reading time instantly. This makes editing easier and ensures your text fits limits for social media, essays, or posts. You can also analyze sentence structure using a Sentence Counter tool to improve clarity and flow.",
  },
    {
      title: <Link href="/tools/character-counter" className="text-blue-500 hover:underline">AI-Powered Rewriting</Link>,
      description: "Get AI suggestions to make your text shorter, clearer, and more effective with simpler vocabulary.",
    },
    {
      title: <Link href="/tools/sentence-counter" className="text-blue-500 hover:underline">Grammar & Clarity Check</Link>,
      description: "Identify errors and get suggestions for clearer, more professional writing instantly.",
    },
    {
      title: <Link href="/tools/word-counter" className="text-blue-500 hover:underline">Tone & Style Suggestions</Link>,
      description: "Improve tone and style with recommendations tailored to your audience and purpose.",
    },
  ]

function HomeSeo() {
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
        You can also use our <Link href="/tools/word-counter" className="text-blue-500 hover:underline">Word Counter</Link> and <Link href="/tools/character-counter" className="text-blue-500 hover:underline">Character Counter</Link> for more detailed analysis.
      </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default HomeSeo;
