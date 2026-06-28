"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, BookOpen, FileText, Clock, Zap,TextSearch } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/tools/word-counter", label: "Word Counter", icon: FileText },
    { href: "/tools/character-counter", label: "Character Counter", icon: Zap },
    { href: "/tools/reading-time", label: "Reading Time", icon: Clock },
    
    {href : "/tools/keyword-density-checker", label:"keyword density checker" , icon:TextSearch},
    { href: "/blog", label: "Blog", icon: BookOpen },
  ]

  return (
    <header
      className={`fixed  top-0 left-0 w-full z-50 transition-all duration-300 
      ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 shadow-lg backdrop-blur-xl border-b border-gray-200 dark:border-white/10"
          : "bg-gradient-to-b from-white/40 dark:from-slate-950/40 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4   sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
<Link
  href="/"
  className="flex items-center gap-2 font-bold text-xl sm:text-2xl bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent hover:opacity-80 transition"
>
  <Image
    src="/favicon.png"
    alt="Countflows logo"
    width={24}
    height={32}
    className="rounded-md"
    style={{ width: "auto", height: "auto" }}
    priority
  />
  Countflows
</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-cyan-100/50 dark:hover:bg-white/10 transition group"
              >
                <Icon size={16} className="text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/tools/word-counter"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-4 pb-6"
          >
            <div className="space-y-2">
              {navItems.map((item, idx) => {
                const Icon = item.icon
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-900 dark:text-white hover:bg-cyan-100/50 dark:hover:bg-white/10 transition"
                  >
                    <Icon size={18} className="text-cyan-500 dark:text-cyan-400" />
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                <Link
                  href="/tools/word-counter"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold hover:shadow-lg transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
