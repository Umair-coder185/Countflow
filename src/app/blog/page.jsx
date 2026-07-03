import { posts } from "@/lib/blogData";
import BlogList from "@/components/blog/BlogList";
import Link from "next/link";

export const metadata = {
  title: "Word Count, Reading Time & Writing Guides | Countflows Blog",
  description:
    "Free guides on word counts, reading speed, essay length, and writing tips. Learn how many pages 2000 words is, how to read faster, and more on Countflows.",
  authors: [{ name: "Umair Tufail", url: "https://countflows.com/about" }],
  openGraph: {
    title: "Countflows Blog — Word Count & Writing Guides",
    description:
      "Practical guides on word counts, reading time, essay length, and SEO writing — powered by Countflows free text analysis tools.",
    url: "https://countflows.com/blog",
    siteName: "Countflows",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://countflows.com/public/blogs/blog2.png", // 1200x630 banayein
        width: 1200,
        height: 630,
        alt: "Countflows Blog — Writing and Word Count Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Countflows Blog — Word Count & Writing Guides",
    description:
      "Guides on word counts, reading time, essay length, and SEO writing.",
    images: ["https://countflows.com/og/blog-cover.png"],
  },
  alternates: {
    canonical: "https://countflows.com/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      
      <BlogList posts={posts} />
    </main>
  );
}
