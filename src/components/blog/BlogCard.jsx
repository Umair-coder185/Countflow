"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "@/lib/no-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { memo } from "react";

// Defined outside the component so these objects aren't recreated on every render
const hoverAnimation = {
  scale: 1.02,
  boxShadow: "0 12px 40px rgba(0, 120, 255, 0.15)",
};
const hoverTransition = { duration: 0.3 };

function BlogCard({ post, priority = false }) {
  // Safe fallbacks so a missing field never crashes the card
  const keywords = post?.keywords?.slice(0, 3) ?? [];
  const href = `/blog/${post?.slug ?? ""}`;

  return (
    <motion.article
      whileHover={hoverAnimation}
      transition={hoverTransition}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col hover:shadow-2xl transition-all w-full h-full min-h-[420px]"
    >
      {/* Featured Image */}
      <div className="relative h-48 sm:h-48 md:h-56 lg:h-60 w-full overflow-hidden group">
        <Image
          src={post?.image}
          alt={post?.title ?? "Blog post image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity rounded-t-2xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2 sm:p-6 gap-2 justify-between">
        <div>
          <Link href={href} className="block">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors line-clamp-2">
              {post?.title}
            </h4>
          </Link>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 ">
            <span className="flex  gap-1">
              <User className="w-4 h-4" /> {post?.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post?.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {post?.readTime}
            </span>
          </div>
        </div>
 
        <div className="flex  flex-col mt-1 gap-2">
          <div className="flex-1 flex flex-wrap gap-2 max-w-[66%]">
            {keywords.map((keyword, i) => (
              <span
                key={i}
                className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Read More Button pinned to bottom-right */}
          <div className="flex items-end ">
            <Link
              href={href}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm"
              aria-label={`Read more about ${post?.title ?? "this post"}`}
            >
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Prevents unnecessary re-renders when props haven't changed
export default memo(BlogCard);