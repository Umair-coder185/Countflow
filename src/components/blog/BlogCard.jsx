"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function BlogCard({ post }) {
  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        boxShadow: "0 12px 40px rgba(0, 120, 255, 0.15)",
      }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col hover:shadow-2xl transition-all w-full h-full"
    >
      {/* Featured Image */}
      <div className="relative h-40 sm:h-48 md:h-52 w-full overflow-hidden group">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity rounded-t-2xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-6 gap-3">
        <Link href={`/blog/${post.slug}`} className="block">
          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors line-clamp-2">
            {post.title}
          </h4>
        </Link>

       

        {/* Meta Info */}
        <div className="flex flex-wrap gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
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
        <div className="flex flex-wrap gap-1 mt-auto mb-1">
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
          className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm mt-2"
          aria-label={`Read more about ${post.title}`}
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}
