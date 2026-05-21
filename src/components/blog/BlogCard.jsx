"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";

export default function BlogCard({ post }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col"
    >
      {/* Featured Image */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
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
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.keywords.slice(0, 3).map((keyword, i) => (
            <span
              key={i}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
