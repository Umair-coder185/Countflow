"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion } from "@/lib/no-motion"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center px-1 transition"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-6 h-6 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-md"
        style={{
          transform: isDark ? "translateX(24px)" : "translateX(0px)"
        }}
      >
        {isDark ? (
          <Moon size={14} aria-hidden="true" />
        ) : (
          <Sun size={14} aria-hidden="true" />
        )}
      </motion.div>
    </button>
  )
}