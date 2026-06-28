"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Type,
  Hash,
  TextSearch,
  Clock,
  FileText,
  CaseSensitive
} from "lucide-react"

const icons = {
  Type,
  Hash,
  TextSearch,
  Clock,
  FileText,
  CaseSensitive
}

export default function ToolCard({ title, description, iconName, link, className = "" }) {
  const Icon = icons[iconName]

  return (
    <Link href={link}>
      <motion.div
        initial={false}
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative p-6 rounded-2xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition cursor-pointer border-gray-200 dark:border-gray-700 group ${className}`}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-xl"
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/40"
          >
            <Icon className="text-blue-600 dark:text-blue-400" />
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}