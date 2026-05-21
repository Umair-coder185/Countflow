import { posts } from "@/lib/blogData";
import BlogList from "@/components/blog/BlogList";
import Link from "next/link";

export const metadata = {
  title: "Blog - Countflows | Writing Tips, SEO Strategies & Content Guides",
  description:
    "Discover expert writing tips, SEO optimization strategies, content creation guides, and best practices for using text analysis tools. Stay updated with the latest writing trends on Countflows Blog.",
  keywords:
    "writing tips, SEO strategies, content writing, blogging guide, writing best practices, content optimization, writing techniques",
  openGraph: {
    title: "Countflows Blog - Writing Tips & SEO Strategies",
    description:
      "Learn writing tips, SEO strategies, and content creation best practices from Countflows experts.",
    url: "https://countflows.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://countflows.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Countflows Blog
      </h1>
      <section className="mb-10 prose dark:prose-invert max-w-none">
        <p>
          Welcome to the Countflows Blog! Here you’ll find expert advice on <strong>SEO content writing</strong>, <strong>blogging strategies</strong>, and <strong>writing tools</strong> to help you grow as a writer and content creator.
        </p>
        <p>
          Whether you’re a beginner or a seasoned professional, our guides cover everything from keyword research to on-page SEO, readability, and content optimization. Explore our most popular post: <Link href="/blog/seo-content-writing-guide" className="text-blue-600 underline">SEO Content Writing Guide</Link>.
        </p>
        <ul>
          <li>Learn how to use our <Link href="/tools/word-counter" className="text-blue-600 underline">Word Counter</Link> and <Link href="/tools/character-counter" className="text-blue-600 underline">Character Counter</Link> for better writing.</li>
          <li>Discover tips for <Link href="/blog/seo-content-writing-guide" className="text-blue-600 underline">SEO content writing</Link> and <Link href="/blog" className="text-blue-600 underline">blogging</Link>.</li>
          <li>Stay updated with the latest trends in digital writing and content marketing.</li>
        </ul>
        <p>
          Have a topic you want us to cover? <Link href="/contact" className="text-blue-600 underline">Contact us</Link> with your suggestions!
        </p>
      </section>
      <BlogList posts={posts} />
    </main>
  );
}
