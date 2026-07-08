"use client"

import ToolCard from "./ToolCard"
import { motion } from "@/lib/no-motion"

export default function ToolsGrid() {
  const tools = [
    {
      title: "Word Counter",
      description: "Count words instantly in your text.",
      iconName: "Type",
      link: "/tools/word-counter",
    },
    {
      title: "Character Counter",
      description: "Count characters with and without spaces.",
      iconName: "Hash",
      link: "/tools/character-counter",
    },
      {
      title: "keyword density checker",
      description: "free keyword density checker",
      iconName:"TextSearch",
      link: "/tools/keyword-density-checker",
    },
    {
      title: "Reading Time",
      description: "Estimate reading and speaking time.",
      iconName: "Clock",
      link: "/tools/reading-time",
    },
    {
      title: "Sentence Counter",
      description: "Count sentences in your text.",
      iconName: "FileText",
      link: "/tools/sentence-calculator",
    },
  

  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-400/5 dark:bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-violet-400/5 dark:bg-violet-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl  pt-14 mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 dark:bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-6 backdrop-blur-sm">
            Powerful Writing Tools
          </p>
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            <span className="text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">Explore </span>Our <span className="text-transparent bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text">Premium</span> Tools</h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-slate-400 text-base sm:text-lg">
            Comprehensive writing analysis tools designed to help you create better content faster
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tools.map((tool, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ToolCard
                {...tool}
                className="h-full bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-2 hover:border-cyan-400 dark:hover:border-cyan-400 p-6 backdrop-blur-sm group"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            More tools coming soon! Check back regularly for updates.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition hover:scale-105"
          >
            Explore All Tools
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}