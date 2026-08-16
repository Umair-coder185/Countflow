import { BookOpen } from "lucide-react";
import { motion } from "@/lib/no-motion";

export default function BlogHeader({ title, subtitle }) {
  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10 mt-8 text-center"
    >
      <div className="flex justify-center mb-3" aria-hidden="true">
        <BookOpen className="w-10 h-10 text-blue-600 dark:text-cyan-400 " />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
        {title}
      </h1>

      {subtitle ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}