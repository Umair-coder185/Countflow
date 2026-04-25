import Link from "next/link"
import { posts } from "@/lib/blogData"

export const metadata = {
  title: "Blog - Countflow | Writing Tips, SEO Strategies & Content Guides",
  description: "Discover expert writing tips, SEO optimization strategies, content creation guides, and best practices for using text analysis tools. Stay updated with the latest writing trends on Countflow Blog.",
  keywords: "writing tips, SEO strategies, content writing, blogging guide, writing best practices, content optimization, writing techniques",
  openGraph: {
    title: "Countflow Blog - Writing Tips & SEO Strategies",
    description: "Learn writing tips, SEO strategies, and content creation best practices from Countflow experts.",
    url: "https://countflow.com/blog",
    type: "website"
  },
  alternates: {
    canonical: "https://countflow.com/blog"
  }
}

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-16">

      <h1 className="text-3xl font-bold mb-10">
        Blog
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="p-6 border rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {post.title}
            </h2>

            <p className="text-gray-500 text-sm">
              {post.description}
            </p>
          </Link>
        ))}

      </div>

    </main>
  )
}