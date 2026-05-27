"use client";

import BlogCard from "@/components/blog/BlogCard";
import { motion } from "framer-motion";
import { BookOpen, Filter } from "lucide-react";

export default function BlogList({ posts }) {
  // ✅ Sort posts by date (latest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="max-w-screen-xl  px-2 sm:px-6 md:px-8 py-6 sm:py-14 lg:py-8 mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <div className="flex justify-center mb-5">
          <BookOpen className="w-10 h-10 text-blue-600 dark:text-cyan-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
          📚 Blogs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover expert writing tips, SEO strategies, and content creation guides — always updated with the latest articles first.
        </p>
      </motion.header>

      {/* Unique Filter Bar */}
      <div className="flex justify-end items-center mb-8">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 dark:bg-cyan-600 text-white text-sm font-semibold shadow hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors">
          <Filter className="w-4 h-4" /> Filter by Category
        </button>
      </div>

      {/* Blog Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid gap-6 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sortedPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.section>
    </main>
  );
}
