import { posts } from "@/lib/blogData";
import BlogList from "@/components/blog/BlogList";
import Link from "next/link";

export const metadata = {
  title: "Blog - Countflows | Writing Tips, SEO Strategies & Content Guides",
  description:
    "Discover expert writing tips, SEO optimization strategies, academic writing  guides, and best practices for using text analysis tools. Stay updated with the latest writing trends on Countflows Blog.",
  keywords:
    "writing tips, SEO strategies, content writing, blogging guide, academic writing structure, content optimization, writing techniques, formal writing style,academic writing tips for beginners, importance of academic writing for students, how to write an academic essay step by step, seo content writing",
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
      
      <BlogList posts={posts} />
    </main>
  );
}
