"use client"

import Image from "next/image"
import Link from "next/link"
import {
  AlignLeft,
  BookOpen,
  CaseSensitive,
  ChevronDown,
  Clock,
  Eraser,
  FileText,
  GitCompareArrows,
  Hash,
  Info,
  LayoutGrid,
  Mail,
  Menu,
  Music4,
  Repeat,
  Sparkles,
  TextSearch,
  Type,
  X,
  ReplaceAll,
  ScanSearch
} from "lucide-react"
import { AnimatePresence, motion } from "@/lib/no-motion"
import { useEffect, useRef, useState } from "react"
import ThemeToggle from "./ThemeToggle"

const toolItems = [
  { href: "/tools/word-counter", label: "Word Counter", icon: FileText },
  { href: "/tools/character-counter", label: "Character Counter", icon: Type },
  { href: "/tools/sentence-counter", label: "Sentence Counter", icon: AlignLeft },
  { href: "/tools/reading-time", label: "Reading Time", icon: Clock },
  { href: "/tools/keyword-density-checker", label: "Keyword Density Checker", icon: TextSearch },
  { href: "/tools/case-converter", label: "Case Converter", icon: CaseSensitive },
  { href: "/tools/ai-text-cleaner", label: "AI Text Cleaner", icon: Sparkles },
  { href: "/tools/ai-token-counter", label: "AI Token Counter", icon: Hash },
  { href: "/tools/syllable-counter", label: "Syllable Counter", icon: Music4 },
  { href: "/tools/remove-line-breaks", label: "Remove Line Breaks", icon: Eraser },
  { href: "/tools/text-repeater", label: "Text Repeater", icon: Repeat },
  { href: "/tools/text-compare", label: "Online Text Compare", icon: GitCompareArrows },
  { href: "/tools/find-and-replace-text", label: "Find & Replace Text", icon: ReplaceAll },
  { href: "/tools/chatgpt-watermark-remover", label: "ChatGPT Watermark Remover", icon: ScanSearch },
]

const navItems = [
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about-us", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToolsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setToolsOpen(false)
        setIsOpen(false)
        setMobileToolsOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const closeAll = () => {
    setIsOpen(false)
    setToolsOpen(false)
    setMobileToolsOpen(false)
  }

  return (
    <header
    className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
    scrolled
      ? "border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90"
      : "border-b border-transparent bg-transparent shadow-none"
  }`}
>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeAll}
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="CountFlows home"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[9px] ring-1 ring-black/5 dark:ring-white/10">
            <Image
              src="/images/countflows-logo.png"
              alt=""
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </span>

          <span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            CountFlows
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setToolsOpen((open) => !open)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              aria-controls="desktop-tools-menu"
              className="group flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-800 transition hover:bg-cyan-50 hover:text-gray-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <LayoutGrid
                size={16}
                className="text-cyan-500 transition-transform group-hover:scale-110 dark:text-cyan-400"
                aria-hidden="true"
              />
              Tools
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  id="desktop-tools-menu"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-[560px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30"
                >
                  <div className="mb-2 px-2 pt-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-slate-400">
                      Text, SEO & AI Tools
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    {toolItems.map((item) => {
                      const Icon = item.icon

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeAll}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-cyan-50 hover:text-gray-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:group-hover:bg-cyan-900/50">
                            <Icon size={16} aria-hidden="true" />
                          </span>
                          <span className="min-w-0 leading-5">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="mt-3 border-t border-gray-200 pt-3 dark:border-white/10">
                    <Link
                      href="/tools"
                      onClick={closeAll}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-white/10"
                    >
                      <span>Browse all tools</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAll}
                className="group flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-800 transition hover:bg-cyan-50 hover:text-gray-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Icon
                  size={16}
                  className="text-cyan-500 transition-transform group-hover:scale-110 dark:text-cyan-400"
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/tools"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Explore Tools
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.18 }}
            className="border-t border-gray-200 bg-white/95 px-4 pb-5 pt-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1">
              <button
                type="button"
                onClick={() => setMobileToolsOpen((open) => !open)}
                aria-expanded={mobileToolsOpen}
                aria-controls="mobile-tools-menu"
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-gray-900 transition hover:bg-cyan-50 dark:text-white dark:hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <LayoutGrid size={18} className="text-cyan-500 dark:text-cyan-400" aria-hidden="true" />
                  Tools
                </span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {mobileToolsOpen && (
                  <motion.div
                    id="mobile-tools-menu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-1 pb-2 pl-3 sm:grid-cols-2">
                      {toolItems.map((item) => {
                        const Icon = item.icon

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeAll}
                            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-cyan-50 dark:text-slate-300 dark:hover:bg-white/10"
                          >
                            <Icon size={16} className="text-cyan-500 dark:text-cyan-400" aria-hidden="true" />
                            {item.label}
                          </Link>
                        )
                      })}

                      <Link
                        href="/tools"
                        onClick={closeAll}
                        className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-white/10 sm:col-span-2"
                      >
                        Browse all tools
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {navItems.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-900 transition hover:bg-cyan-50 dark:text-white dark:hover:bg-white/10"
                  >
                    <Icon size={18} className="text-cyan-500 dark:text-cyan-400" aria-hidden="true" />
                    {item.label}
                  </Link>
                )
              })}

              <div className="mt-2 border-t border-gray-200 pt-3 dark:border-white/10">
                <Link
                  href="/tools"
                  onClick={closeAll}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:shadow-lg"
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}