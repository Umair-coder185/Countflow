import { BookOpen } from "lucide-react";
import { motion } from "@/lib/no-motion";
import Link from "next/link";

export default function BlogHeader({ title, subtitle }) {
  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10 text-center mt-8"
    >
      {/* Back Link */}
      <div className="mb-6 text-left">
        <Link
          href="/blog"
          className="inline-flex  mt-6 items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-2 mt-4">
        <BookOpen className="w-10 h-10 text-blue-600" />
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
