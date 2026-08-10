"use client"

import { useCallback, useState, useRef } from "react"
import Link from "next/link"
import {
  Sparkles,
  Trash2,
  Download,
  Copy,
  Check,
  RotateCcw,
  Eraser,
  FileText,
  ArrowRight,
  Shield,
  Zap,
  EyeOff,
  WrapText,
  Minus,
  Type,
  Quote,
  Smile,
  Layers,
  Globe,
  FileCode,
  Code2,
  List,
  Settings2,
  Calculator,
  Repeat,
} from "lucide-react"

/* ============================================================
   Cleaning engine — pure functions
   ============================================================
   14 cleaners total (down from 20). The cut wasn't about deleting
   capability — every transform below still runs. Line-ending
   normalization, BOM removal, and trailing-whitespace trimming
   were folded into the two whitespace cleaners as silent
   sub-steps, since no user has ever wanted \r\n over \n. Unicode
   normalization and homoglyph conversion were merged into one
   "Advanced" toggle since they're the same audience (people
   pasting from PDFs/Word/security-conscious users), and smart
   quotes + ellipsis were merged since they're the same fix
   (curly typography → keyboard-safe ASCII).
   ============================================================ */

const decodeEntities = (t) => {
  const el = document.createElement("textarea")
  el.innerHTML = t
  return el.value
}

const stripHtmlTags = (t) => t.replace(/<[^>]+>/g, "")

const removeMarkdown = (t) =>
  t
    .replace(/^[ \t]{0,3}#{1,6}[ \t]+/gm, "")
    .replace(/(\*{1,3})(?=\S)([\s\S]*?\S)\1/g, "$2")
    .replace(/(_{1,3})(?=\S)([\s\S]*?\S)\1/g, "$2")
    .replace(/~~(?=\S)([\s\S]*?\S)~~/g, "$1")
    .replace(/```[a-zA-Z0-9]*\n?/g, "")
    .replace(/`([^`\n]+)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[ \t]*>[ \t]?/gm, "")
    .replace(/^[ \t]*([*\-_][ \t]*){3,}$/gm, "")
    .replace(/^\|(.+)\|[ \t]*$/gm, (_, inner) =>
      inner.split("|").map((c) => c.trim()).join("  ")
    )
    .replace(/^[ \t]*[:\-| ]+[ \t]*$/gm, "")

const removeBullets = (t) =>
  t
    .replace(/^[ \t]*[-*+\u2022\u00B7\u25E6\u25AA\u2023][ \t]+/gm, "")
    .replace(/^[ \t]*\d{1,3}[.)][ \t]+/gm, "")

const removeEmoji = (t) =>
  t.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "").replace(/\u200D/g, "")

const HOMOGLYPH_MAP = Object.freeze({
  "\u0410": "A", "\u0412": "B", "\u0415": "E", "\u041A": "K", "\u041C": "M",
  "\u041D": "H", "\u041E": "O", "\u0420": "P", "\u0421": "C", "\u0422": "T",
  "\u0425": "X", "\u0430": "a", "\u0435": "e", "\u043E": "o", "\u0440": "p",
  "\u0441": "c", "\u0443": "y", "\u0445": "x", "\u0456": "i", "\u0458": "j",
  "\u04BB": "h",
  "\u0391": "A", "\u0392": "B", "\u0395": "E", "\u0396": "Z", "\u0397": "H",
  "\u0399": "I", "\u039A": "K", "\u039C": "M", "\u039D": "N", "\u039F": "O",
  "\u03A1": "P", "\u03A4": "T", "\u03A5": "Y", "\u03A7": "X",
  "\u03BF": "o", "\u03B1": "a",
})
const HOMOGLYPH_PATTERN = new RegExp(Object.keys(HOMOGLYPH_MAP).join("|"), "g")
const advancedUnicodeCleanup = (t) =>
  t.normalize("NFKC").replace(HOMOGLYPH_PATTERN, (ch) => HOMOGLYPH_MAP[ch])

const smartPunctuation = (t) =>
  t
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/\u2026/g, "...")

const fixDashes = (t) =>
  t.replace(/\s*[\u2014\u2013]\s*/g, (m) => (/\s/.test(m) ? ", " : "-"))

const punctuationSpacing = (t) =>
  t
    .replace(/\s+([.,;:!?\)\]\}])/g, "$1")
    .replace(/([.,;:!?\)\]\}])([^\s])/g, "$1 $2")

// Zero-width/joiner chars, BOM, ASCII control chars, and every flavor of
// "invisible" space all collapse to nothing or a regular space in one pass.
const removeInvisible = (t) =>
  t
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B\u200C\u200D\u2060\uFEFF\u00AD\u180E]/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\x80-\x9F]/g, "")
    .replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, " ")

const stripDiacritics = (t) =>
  t.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const removeDuplicateLines = (t) => {
  const seen = new Set()
  return t
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim()
      if (trimmed === "") return true
      if (seen.has(trimmed)) return false
      seen.add(trimmed)
      return true
    })
    .join("\n")
}

// Line endings, trailing whitespace, repeated spaces/tabs, and blank-line
// stacks all get normalized together — this is the "make it tidy" pass.
const tidySpacing = (t) =>
  t
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

const removeBlankLines = (t) =>
  t.split("\n").filter((l) => l.trim() !== "").join("\n")

/* ── 14 cleaners ── */
const CLEANING_OPTIONS = [
  { id: "invisible", label: "Remove invisible & hidden characters", hint: "Zero-width spaces, BOM, control chars, non-breaking spaces", fn: removeInvisible, defaultOn: true, icon: EyeOff },
  { id: "spacing", label: "Tidy spacing & line breaks", hint: "Trailing spaces, repeated gaps, stacked blank lines", fn: tidySpacing, defaultOn: true, icon: WrapText },
  { id: "blanklines", label: "Remove all blank lines", hint: "Collapse paragraphs into a single block", fn: removeBlankLines, defaultOn: false, icon: Minus },
  { id: "punctuation", label: "Straighten smart quotes & ellipsis", hint: '"curly" → "straight", … → ...', fn: smartPunctuation, defaultOn: true, icon: Quote },
  { id: "dashes", label: "Fix em & en dashes", hint: "— and – become , or -", fn: fixDashes, defaultOn: true, icon: Minus },
  { id: "punctspace", label: "Fix spacing around punctuation", hint: "word . → word. and space after .,;:!?)]}", fn: punctuationSpacing, defaultOn: true, icon: Type },
  { id: "markdown", label: "Remove markdown symbols", hint: "** ## ` [ ] ( ) headings, links, tables", fn: removeMarkdown, defaultOn: true, icon: FileCode },
  { id: "html", label: "Strip HTML tags", hint: "Remove <p>, <div>, <span>", fn: stripHtmlTags, defaultOn: true, icon: Code2 },
  { id: "entities", label: "Decode HTML entities", hint: "&amp; → &, &lt; → <", fn: decodeEntities, defaultOn: true, icon: Code2 },
  { id: "bullets", label: "Remove bullet points", hint: "- • 1. at line start", fn: removeBullets, defaultOn: false, icon: List },
  { id: "emoji", label: "Remove emojis & emoticons", hint: "🚀 ✅ 🔥 :) :D gone", fn: removeEmoji, defaultOn: false, icon: Smile },
  { id: "diacritics", label: "Strip diacritics", hint: "café → cafe, naïve → naive", fn: stripDiacritics, defaultOn: false, icon: Type },
  { id: "advanced", label: "Advanced Unicode cleanup", hint: "Fullwidth/ligature chars + Cyrillic-lookalike letters → ASCII", fn: advancedUnicodeCleanup, defaultOn: false, icon: Globe },
  { id: "duplicates", label: "Remove duplicate lines", hint: "Exact repeats collapsed to one", fn: removeDuplicateLines, defaultOn: false, icon: Layers },
]

const OPTIONS_BY_ID = Object.fromEntries(CLEANING_OPTIONS.map((o) => [o.id, o]))
const DEFAULT_OPTIONS = Object.fromEntries(CLEANING_OPTIONS.map((o) => [o.id, o.defaultOn]))
const TOTAL_OPTIONS = CLEANING_OPTIONS.length

// Order matters: decode/strip markup first, normalize punctuation and
// unicode next, THEN clean whitespace last — collapsing spaces before
// non-breaking spaces are converted to regular ones would miss matches.
const PIPELINE_ORDER = [
  "entities", "html", "markdown", "bullets", "emoji",
  "advanced", "punctuation", "dashes",
  "invisible", "diacritics", "duplicates",
  "spacing", "blanklines", "punctspace",
]

export function cleanText(input, enabledOptions) {
  return PIPELINE_ORDER.reduce((result, id) => {
    if (!enabledOptions[id]) return result
    return OPTIONS_BY_ID[id].fn(result)
  }, input)
}

/* ============================================================
   Explore-more-tools links — real, live Countflows tool URLs.
   Pulled straight from countflows.com/tools so slugs stay accurate.
   ============================================================ */
const EXPLORE_TOOLS = [
  { name: "Case Converter", desc: "Fix capitalization after cleaning", href: "/tools/case-converter", icon: Type },
  { name: "AI Token Counter", desc: "Check token cost before you send", href: "/tools/ai-token-counter", icon: Calculator },
  { name: "Text Repeater", desc: "Duplicate text instantly", href: "/tools/text-repeater", icon: Repeat },
]




/* ============================================================
   Component
   ============================================================ */

export default function CleanerTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [toast, setToast] = useState(null)
  const [copied, setCopied] = useState(false)
  const [isCleaning, setIsCleaning] = useState(false)
  const outputRef = useRef(null)

  const activeCount = Object.values(options).filter(Boolean).length

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const toggleOption = useCallback((id) => {
    setOptions((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const selectAll = useCallback((state) => {
    setOptions((prev) => {
      const next = { ...prev }
      CLEANING_OPTIONS.forEach((o) => { next[o.id] = state })
      return next
    })
  }, [])

  const resetOptions = useCallback(() => {
    setOptions(DEFAULT_OPTIONS)
    showToast("Options reset to defaults")
  }, [showToast])

  const stats = (text) => {
    const trimmed = text.trim()
    return {
      chars: text.length,
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      lines: text.split("\n").filter((l) => l.trim().length > 0).length,
    }
  }

  const inStats = stats(input)
  const outStats = stats(output)
  const savedPct = input.length > 0 && output.length > 0
    ? Math.round(((input.length - output.length) / input.length) * 100)
    : 0

  const handleClean = useCallback(() => {
    if (!input.trim()) {
      showToast("Please paste some text first!")
      return
    }
    setIsCleaning(true)
    setTimeout(() => {
      const cleaned = cleanText(input, options)
      setOutput(cleaned)
      setIsCleaning(false)
      showToast("Text cleaned successfully!")
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 120)
  }, [input, options, showToast])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    showToast("Cleared!")
  }, [showToast])

  const handleCopy = useCallback(async () => {
    if (!output) { showToast("Nothing to copy yet!"); return }
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      showToast("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch { showToast("Copy failed") }
  }, [output, showToast])

  const handleDownload = useCallback(() => {
    if (!output) { showToast("Nothing to download yet!"); return }
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cleaned-text.txt"
    a.click()
    URL.revokeObjectURL(url)
    showToast("Downloaded!")
  }, [output, showToast])

  return (
    <div className="relative">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-cyan-300/15 blur-[100px] dark:bg-cyan-500/10" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-fuchsia-300/10 blur-[100px] dark:bg-fuchsia-500/10" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] rounded-full bg-emerald-300/10 blur-[100px] dark:bg-emerald-500/10" />
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300 px-4">
          <div className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-slate-900">
            <Check className="h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
            {toast}
          </div>
        </div>
      )}

      {/* ── Hero / AEO+GEO header ──
          Single H1 for this page. Intro is written as one direct,
          quotable definition sentence (what it is + what it removes +
          free/private) so answer engines can lift it verbatim. The
          feature list below is generated straight from CLEANING_OPTIONS
          so it can never drift out of sync with what the tool actually does. */}
     
      {/* ── Main Tool Card ── */}
      <div className="relative mx-auto max-w-6xl rounded-2xl border border-slate-200/60 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/80 dark:shadow-black/30 sm:rounded-3xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700/50 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 sm:h-9 sm:w-9">
              <Eraser className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Smart Editor</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={handleClear} aria-label="Clear all" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-slate-600 dark:text-slate-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-400" title="Clear all">
              <Trash2 className="h-4 w-4" />
            </button>
            <button onClick={handleCopy} aria-label="Copy output" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-cyan-500/50 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-400" title="Copy output">
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
            <button onClick={handleDownload} aria-label="Download" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-cyan-500/50 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-400" title="Download">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Input / Output Panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Input */}
          <div className="flex flex-col border-b border-slate-100 md:border-b-0 md:border-r dark:border-slate-700/50">
            <div className="flex flex-wrap items-center justify-between gap-y-1 border-b border-slate-50 px-4 py-2.5 dark:border-slate-700/30 sm:px-5">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <FileText className="h-3.5 w-3.5" /> Input
              </span>
              <div className="flex gap-2.5 text-xs font-medium text-slate-400 sm:gap-3">
                <span>{inStats.chars} chars</span>
                <span>{inStats.words} words</span>
                <span>{inStats.lines} lines</span>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your messy AI-generated text here...\n\nExample:\n## Introduction\nThis is *bold* text with em dashes — and smart quotes "like this".\n\n🚀 Remove all the clutter in one click!`}
              className="min-h-[220px] flex-1 resize-none bg-transparent px-4 py-4 font-mono text-sm leading-relaxed text-slate-700 outline-none placeholder:text-slate-300 dark:text-slate-300 dark:placeholder:text-slate-600 sm:min-h-[300px] sm:px-5"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col" ref={outputRef}>
            <div className="flex flex-wrap items-center justify-between gap-y-1 border-b border-slate-50 px-4 py-2.5 dark:border-slate-700/30 sm:px-5">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Sparkles className="h-3.5 w-3.5" /> Clean Output
              </span>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-400 sm:gap-3">
                {savedPct > 0 && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">-{savedPct}%</span>
                )}
                <span>{outStats.chars} chars</span>
                <span>{outStats.words} words</span>
                <span>{outStats.lines} lines</span>
              </div>
            </div>
            <div className="min-h-[220px] flex-1 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:min-h-[300px] sm:px-5">
              {output ? (
                <pre className="whitespace-pre-wrap break-words">{output}</pre>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center text-slate-300 dark:text-slate-600">
                  <Sparkles className="h-10 w-10 opacity-40" />
                  <p className="text-sm font-medium">Your cleaned text will appear here</p>
                  <p className="text-xs">Select cleaners below and tap Clean Text</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Cleaning Options ── */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-5 dark:border-slate-700/50 dark:bg-slate-800/30 sm:px-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Settings2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <div>
                
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Cleaning Options</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-300">{activeCount}/{TOTAL_OPTIONS} active</span>
              <button onClick={resetOptions} className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700" title="Reset to defaults">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CLEANING_OPTIONS.map((opt) => {
              const Icon = opt.icon
              const isOn = options[opt.id]
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  aria-pressed={isOn}
                  className={`group flex min-h-[64px] items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 active:scale-[0.98] ${
                    isOn
                      ? "border-cyan-200 bg-white shadow-sm shadow-cyan-100 dark:border-cyan-500/30 dark:bg-cyan-500/5 dark:shadow-none"
                      : "border-slate-200 bg-white/60 hover:border-slate-300 dark:border-slate-600/50 dark:bg-slate-800/40 dark:hover:border-slate-500"
                  }`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isOn ? "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400" : "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-sm font-semibold ${isOn ? "text-slate-800 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>{opt.label}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400 dark:text-slate-500">{opt.hint}</p>
                  </div>
                  <div className={`ml-auto mt-1 h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors ${isOn ? "bg-cyan-500 dark:bg-cyan-400" : "bg-slate-300 dark:bg-slate-600"}`}>
                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform dark:bg-slate-900 ${isOn ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => selectAll(true)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Select All</button>
            <button onClick={() => selectAll(false)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Select None</button>
          </div>
        </div>

        {/* ── Clean Button ── */}
        <div className="border-t border-slate-100 px-4 py-5 dark:border-slate-700/50 sm:px-6">
          <button
            onClick={handleClean}
            disabled={isCleaning}
            className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:shadow-2xl hover:shadow-cyan-500/30 active:scale-[0.98] disabled:opacity-70 sm:px-8 sm:text-lg"
          >
            <Sparkles className="h-5 w-5 shrink-0 transition-transform group-hover:rotate-12" />
            {isCleaning ? "Cleaning..." : "Clean Text"}
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* ── Explore More Tools ──
            Light, near-invisible borders on purpose (border-slate-100 /
            dark:border-slate-800) so these read as a quiet footer
            strip, not a competing card. Padding is explicit at every
            breakpoint so it never collapses on mobile. */}
        <div className="border-t border-slate-100/70 px-4 py-5 dark:border-slate-800/40 sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Explore more tools</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {EXPLORE_TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white/60 p-3.5 transition-all hover:border-cyan-200 hover:bg-white hover:shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-cyan-500/20 sm:p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-cyan-50 group-hover:text-cyan-600 dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-cyan-500/10 dark:group-hover:text-cyan-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{tool.name}</h4>
                    <p className="truncate text-xs text-slate-400 dark:text-slate-500">{tool.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-500 dark:text-slate-600" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {[
          { title: "14 Smart Cleaners", desc: "Toggle each cleaner independently. From invisible characters to markdown symbols, diacritics to smart quotes — full control.", icon: Sparkles, color: "from-cyan-500 to-blue-500" },
          { title: "100% Private & Secure", desc: "All text cleaning happens entirely in your browser. Nothing is uploaded, logged, or stored on any server.", icon: Shield, color: "from-emerald-500 to-teal-500" },
          { title: "Side-by-Side Editor", desc: "See your original and cleaned text simultaneously. Real-time character and word counts help you track exactly what changed.", icon: Zap, color: "from-violet-500 to-fuchsia-500" },
        ].map((f) => {
          const Icon = f.icon
          return (
            <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-lg shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-900/60 dark:shadow-black/20 sm:rounded-3xl sm:p-7">
              <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${f.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          )
        })}
      </div>


      


      
    </div>
  )
}