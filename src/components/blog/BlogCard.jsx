"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function BlogCard({ post }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        boxShadow: "0 8px 24px rgba(0, 120, 255, 0.10)",
      }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col hover:shadow-xl transition-all w-full max-w-2xl min-w-[340px] mx-auto"
    >
      {/* Featured Image */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden group">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity rounded-t-2xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {post.readTime}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto mb-3">
          {post.keywords.slice(0, 3).map((keyword, i) => (
            <span
              key={i}
              className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-700 transition-colors text-xs sm:text-sm mt-1"
          aria-label={`Read more about ${post.title}`}
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
