import Link from "next/link"

export default function SEOContent() {
  return (
    <section
      className="max-w-4xl mx-auto px-4 md:px-8 py-16 bg-gradient-to-b from-gray-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        What is a Word Counter?
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        A Word Counter instantly tells you how many words are in your text and helps you keep your writing on target. Paste content from Google Docs, type directly, and see related metrics such as characters, sentences, paragraphs, and estimated reading time.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Why Use a Word Counter Tool?
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        A word counter makes it easy to meet length requirements, improve clarity, and stay organized while you write. It is especially useful for essays, reports, blog posts, and any content that needs to match a specific word target.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Who Needs a Word Counter?
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Students, writers, job seekers, and researchers all benefit from accurate word counting. Use it for assignments, cover letters, abstracts, articles, or any writing task where precise length matters.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Key Features of Our Word Counter
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        This tool offers real-time word and character counts, sentence and paragraph analysis, reading time estimates, and fast mobile-friendly performance. It helps you quickly spot sections that need tightening or expansion.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Readability and Planning
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Tracking word count makes it easier to improve readability and structure. Use our <Link href="/tools/reading-time" className="text-blue-500 hover:underline">Reading Time Calculator</Link> to estimate how long your text will take to read and to plan your content more effectively.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Estimate Length by Page
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        A word counter also helps you estimate page length and stay on target for different formats. Knowing how many words fit on a page makes it easier to plan essays, stories, and reports.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        How to Use the Word Counter
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Paste or type your text into the box, and the tool updates instantly. You can check word count, character count, sentence count, and page estimates as you edit.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Improve Your Writing
      </h2>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Use the counter to identify long or repetitive sections. Remove unnecessary phrases, simplify wording, and tighten your sentences so your writing becomes sharper and more effective.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Ideal Word Counts for Different Content
      </h2>

      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
        <li>Blog posts: 1000–2000 words</li>
        <li>SEO articles: 1500+ words</li>
        <li>Essays: 500–1500 words</li>
        <li>Social media posts: 50–300 words</li>
      </ul>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Features of Our Word Counter Tool
      </h2>

      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
        <li>Real-time word and character count</li>
        <li>Sentence and paragraph analysis</li>
        <li>Reading time estimation</li>
        <li>Fast, mobile-friendly performance</li>
      </ul>
    </section>
  )
}