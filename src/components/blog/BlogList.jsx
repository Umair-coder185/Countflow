"use client";

import BlogCard from "@/components/blog/BlogCard";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function BlogList({ posts }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 lg:py-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <div className="flex justify-center mb-5">
          <BookOpen className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
          Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover expert writing tips, SEO strategies, and content creation guides
        </p>
      </motion.header>

      {/* Blog Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post, i) => (
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
