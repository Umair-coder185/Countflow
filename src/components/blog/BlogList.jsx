"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import { BookOpen } from "lucide-react";

export default function BlogList({ posts }) {
  
  // ✅ Sort posts by date (latest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // Categories for filter (client-side)
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? sortedPosts
      : sortedPosts.filter((p) => p.category === selectedCategory);

  return (
    <main className="max-w-screen-xl  px-2 sm:px-6 md:px-8 py-6 sm:py-14 lg:py-4 mx-auto">
      {/* Header */}
      <header className="mb-6 text-center">
        <div className="flex justify-center mb-5">
          <BookOpen className="w-10 h-10 text-blue-600 dark:text-cyan-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
          📚 Blogs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover expert writing tips, SEO strategies, and content creation guides — always updated with the latest articles first.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex justify-end items-center mb-8 gap-3">
        <label className="sr-only">Filter by category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border text-sm shadow-sm focus:outline-none"
          aria-label="Filter posts by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Grid */}
      <section className="grid gap-6 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {filteredPosts.map((post) => (
          <div key={post.slug}>
            <BlogCard post={post} />
          </div>
        ))}
      </section>
    </main>
  );
}
