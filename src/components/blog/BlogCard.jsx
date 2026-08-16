"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ImageIcon,
} from "lucide-react";
import { memo } from "react";

function BlogCard({ post, priority = false }) {
  const title = post?.title?.trim() || "Blog post";
  const slug = post?.slug?.trim() || "";
  const href = slug ? `/blog/${slug}` : "/blog";

  const keywords = Array.isArray(post?.keywords)
    ? post.keywords.filter(Boolean).slice(0, 3)
    : [];

  const imageSrc =
    typeof post?.image === "string" && post.image.trim()
      ? post.image.trim()
      : null;

  return (
    <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col w-full h-full min-h-[420px]">
      <Link
        href={href}
        className="relative block h-48 sm:h-52 md:h-56 lg:h-60 w-full overflow-hidden bg-gray-50 dark:bg-gray-800"
        aria-label={`Open ${title}`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={post?.imageAlt?.trim() || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            unoptimized
            className="object-contain p-2 sm:p-3"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-800 dark:to-slate-900"
            aria-hidden="true"
          >
            <ImageIcon className="w-10 h-10 text-blue-400 dark:text-cyan-500" />
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4 sm:p-6 gap-3 justify-between">
        <div>
          <Link href={href} className="block">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors line-clamp-2">
              {title}
            </h2>
          </Link>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {post?.author ? (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" aria-hidden="true" />
                {post.author}
              </span>
            ) : null}

            {post?.date ? (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {post.date}
              </span>
            ) : null}

            {post?.readTime ? (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {post.readTime}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col mt-1 gap-3">
          {keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={`${keyword}-${index}`}
                  className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-xs font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex items-end">
            <Link
              href={href}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm"
              aria-label={`Read more about ${title}`}
            >
              Read More
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(BlogCard);