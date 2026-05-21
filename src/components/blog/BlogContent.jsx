"use client";

import { motion } from "framer-motion";
import { Calendar, User, Clock, Tag } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";


export default function BlogContent({ post }) {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 lg:py-16">
      {/* Header Back Link */}
         <BlogHeader
        title={post.title}
        subtitle={post.description}
      />

      <article className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-56 sm:h-72 md:h-96 w-full bg-gray-100 overflow-hidden mb-8 sm:mb-12 md:mb-14 rounded-lg"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 text-gray-900 dark:text-gray-100 leading-snug"
        >
          {post.title}
        </motion.h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-1 font-semibold text-gray-900 dark:text-gray-100">
            <User className="w-4 h-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {post.readTime}
          </span>
          <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full">
            <Tag className="w-4 h-4" /> {post.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 font-semibold mb-10 leading-relaxed">
          {post.description}
        </p>

        {/* Keywords */}
        <div className="mb-10 pb-10 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Topics Covered:
          </p>
          <div className="flex flex-wrap justify-start gap-2">
            {post.keywords.map((keyword, i) => (
              <span
                key={i}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-xs sm:text-sm md:text-base"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={ false }
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="prose blog-content prose-sm sm:prose-base md:prose-lg lg:prose-xl dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
            prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl
            prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl lg:prose-h3:text-3xl
            prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:font-semibold prose-a:underline hover:prose-a:text-blue-700 dark:prose-a:text-cyan-400 dark:hover:prose-a:text-cyan-300
            prose-img:rounded-lg prose-img:w-full h-auto prose-img:my-4
            prose-ul:list-disc prose-ul:ml-5 prose-ul:my-3
            prose-table:w-full prose-table:my-4 prose-table:text-sm sm:prose-table:text-base md:prose-table:text-lg
            prose-th:p-2 sm:prose-th:p-3 prose-td:p-2 sm:prose-td:p-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom Section */}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Written by
              </p>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
                {post.author}
              </p>
            </div>
            <a
              href="/blog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors text-sm sm:text-base md:text-lg"
            >
              ← Read More Articles
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
