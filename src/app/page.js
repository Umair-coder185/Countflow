import HeroToolFix from "@/components/HeroToolFix"
import ToolsGrid from "@/components/ToolsGrid"
import SEOContent from "@/components/Character-counter-seo/SeoContent"
import { WhyChooseUs } from "@/components/choseus"
import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false, loading: () => <div>Loading testimonials…</div> });
const HomeSeo = dynamic(() => import("@/components/HomeSeo"), { ssr: false, loading: () => <div>Loading SEO tips…</div> });

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-bold text-center mt-10 mb-8 text-gray-900 dark:text-white">
        Word Counter & Character Counter – Free Online Writing Tools
      </h1>
      <section className="max-w-3xl mx-auto mb-10 prose dark:prose-invert text-lg">
        <p>
          <strong>Countflows</strong> is your all-in-one solution for accurate word counting, character counting, and advanced text analysis. Our free online tools are designed for writers, students, bloggers, SEO professionals, and anyone who needs to optimize their content for clarity, length, and search engine performance.
        </p>
        <p>
          Instantly check your word count, character count (with and without spaces), sentence count, and estimated reading time. Our platform helps you meet content requirements for essays, social media, SEO meta tags, and more. Whether you’re preparing a tweet, a blog post, or a research paper, Countflows makes it easy to stay within limits and improve your writing quality.
        </p>
        <ul>
          <li>Free, unlimited use – no registration required</li>
          <li>Mobile-friendly and fast-loading for productivity on any device</li>
          <li>SEO-focused features for meta descriptions, titles, and readability</li>
          <li>Export, copy, and analyze your text with a single click</li>
        </ul>
        <p>
          Try our <a href="/tools/word-counter" className="text-blue-600 underline">Word Counter</a>, <a href="/tools/character-counter" className="text-blue-600 underline">Character Counter</a>, and <a href="/tools/reading-time" className="text-blue-600 underline">Reading Time Calculator</a> to boost your productivity and content quality.
        </p>
      </section>
      <section className="max-w-3xl mx-auto mb-12 prose dark:prose-invert">
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt className="font-semibold">What is a word counter?</dt>
          <dd>A word counter is a tool that instantly counts the number of words in your text. It’s useful for writers, students, and professionals who need to meet word limits for assignments, articles, or social media posts.</dd>
          <dt className="font-semibold">Why use a character counter?</dt>
          <dd>A character counter helps you track the number of characters in your content, including or excluding spaces. This is essential for SEO meta tags, tweets, SMS, and other platforms with strict character limits.</dd>
          <dt className="font-semibold">Is Countflows free to use?</dt>
          <dd>Yes! All our tools are completely free and require no sign-up. Use them as often as you need for any project.</dd>
          <dt className="font-semibold">How can these tools help with SEO?</dt>
          <dd>Our counters help you optimize meta titles, descriptions, and content length for better search engine rankings. They also improve readability and user engagement.</dd>
        </dl>
      </section>
      <ToolsGrid />
      <WhyChooseUs />
      <Testimonials />
      <HomeSeo />
    </main>
  )
}