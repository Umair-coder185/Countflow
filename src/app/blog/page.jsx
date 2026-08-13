import { posts } from "@/lib/blogData";
import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "free Writing, SEO & AI Guides | CountFlows Blogs" ,

  description:
    "Explore CountFlows free guides on word count online , reading speed, syllables, SEO, AI writing, essay length, and practical tips to write and optimize content.",

  authors: [{ name: "Umair Tufail", url: "https://countflows.com/about" }],
  openGraph: {
    title: "Countflows Blog — Word Count Online & Writing Guides",
    description:
      "Practical guides on word counts, reading time, essay length, and SEO writing — powered by Countflows free text analysis tools.",
    url: "https://countflows.com/blog",
    siteName: "Countflows",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://countflows.com/blogs/blog2.png",
        width: 1200,
        height:830,
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
