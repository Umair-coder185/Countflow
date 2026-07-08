"use client"

import { motion } from "@/lib/no-motion"
import { Type, Hash, Clock, Mic, AlignLeft, List } from "lucide-react"

export default function StatsCard({ text }) {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length
  const sentences = text.split(/[.!?]+/).filter(Boolean).length
  const paragraphs = text.split(/\n+/).filter(Boolean).length

  const readingTime = Math.ceil(words / 200)
  const speakingTime = Math.ceil(words / 150)

  const stats = [
    { label: "Words", value: words, icon: Type },
    { label: "Characters", value: characters, icon: Hash },
    { label: "No Spaces", value: charactersNoSpaces, icon: Hash },
    { label: "Reading Time", value: readingTime + " min", icon: Clock },
    { label: "Speaking Time", value: speakingTime + " min", icon: Mic },
    { label: "Sentences", value: sentences, icon: List },
    { label: "Paragraphs", value: paragraphs, icon: AlignLeft }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((item, index) => {
        const Icon = item.icon

        return (
          <motion.div
            key={index}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-xl flex items-center gap-3 transition group"
          >
            {/* Glow layer */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-lg"
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {item.label}
                </p>
                <p className="font-bold text-sm sm:text-base md:text-lg">
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}