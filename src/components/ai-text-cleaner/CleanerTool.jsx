"use client"

import { useState } from "react"

import { Trash, Download, Copy, Check, Sparkles } from "lucide-react"

/* ------------- Cleaning logic (runs 100% in the browser) ------------- */

// Strips markdown syntax but keeps the words: **bold**, *italic*, ## headings,
// `code`, [links](url), > blockquotes, --- rules, and table pipes.
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
        .replace(/^\|(.+)\|[ \t]*$/gm, (m, inner) => inner.split("|").map((c) => c.trim()).join("  "))
        .replace(/^[ \t]*[:\-| ]+[ \t]*$/gm, "")

// Strips leading bullet and numbered-list markers from each line.
const removeBullets = (t) =>
    t
        .replace(/^[ \t]*[-*+\u2022\u00B7\u25E6\u25AA\u2023][ \t]+/gm, "")
        .replace(/^[ \t]*\d{1,3}[.)][ \t]+/gm, "")

// Replaces em/en dashes: spaced dashes become a comma, tight dashes become a hyphen.
const fixDashes = (t) =>
    t.replace(/\s*[\u2014\u2013]\s*/g, (m) => (/\s/.test(m) ? ", " : "-"))

// Removes zero-width and other invisible Unicode characters, and normalizes
// exotic spaces (non-breaking, thin, ideographic) to a regular space.
const removeInvisible = (t) =>
    t
        .replace(/[\u200B\u200C\u200D\u2060\uFEFF\u00AD\u180E]/g, "")
        .replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, " ")

// Converts curly quotes and ellipsis characters to plain keyboard equivalents.
const straightenQuotes = (t) =>
    t
        .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
        .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
        .replace(/\u2026/g, "...")

// Removes emoji, pictographs, and variation selectors.
const removeEmoji = (t) =>
    t.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "").replace(/\u200D/g, "")

// Trims trailing spaces, collapses runs of spaces, and caps blank lines at one.
const tidyWhitespace = (t) =>
    t
        .replace(/[ \t]+$/gm, "")
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim()

const CLEANING_OPTIONS = [
    { id: "markdown", label: "Remove markdown symbols", hint: "** ## ` [ ] ( )", fn: removeMarkdown, defaultOn: true },
    { id: "dashes", label: "Fix em dashes", hint: "\u2014 becomes , or -", fn: fixDashes, defaultOn: true },
    { id: "invisible", label: "Remove invisible characters", hint: "zero-width + non-breaking spaces", fn: removeInvisible, defaultOn: true },
    { id: "quotes", label: "Straighten smart quotes", hint: "\u201Ccurly\u201D to \"straight\"", fn: straightenQuotes, defaultOn: true },
    { id: "whitespace", label: "Tidy extra spaces and line breaks", hint: "collapses gaps", fn: tidyWhitespace, defaultOn: true },
    { id: "bullets", label: "Remove bullet points", hint: "- \u2022 1. at line start", fn: removeBullets, defaultOn: false },
    { id: "emoji", label: "Remove emojis", hint: "\ud83d\ude80 \u2705 \ud83d\udd25 gone", fn: removeEmoji, defaultOn: false },
]

// Application order matters: strip structure first, normalize characters,
// tidy whitespace last so it cleans up anything the other passes left behind.
const PIPELINE_ORDER = ["markdown", "bullets", "emoji", "quotes", "dashes", "invisible", "whitespace"]

export default function CleanerTool() {
    const [text, setText] = useState("")
    const [options, setOptions] = useState(
        Object.fromEntries(CLEANING_OPTIONS.map((o) => [o.id, o.defaultOn]))
    )
    const [removedCount, setRemovedCount] = useState(null)
    const [copied, setCopied] = useState(false)

    /* ------------- Handlers ------------- */

    const toggleOption = (id) =>
        setOptions((prev) => ({ ...prev, [id]: !prev[id] }))

    const handleClean = () => {
        const before = text.length
        let result = text
        for (const id of PIPELINE_ORDER) {
            if (!options[id]) continue
            const option = CLEANING_OPTIONS.find((o) => o.id === id)
            result = option.fn(result)
        }
        setText(result)
        setRemovedCount(Math.max(0, before - result.length))
    }

    const handleClear = () => {
        setText("")
        setRemovedCount(null)
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const blob = new Blob([text], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "cleaned-text.txt"
        a.click()
        URL.revokeObjectURL(url)
    }

    /* ------------- Live stats ------------- */

    const characters = text.length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const lines = text.split("\n").filter((l) => l.trim().length > 0).length

    return (
        <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12 ">
            <div
                
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6"
            >
                {/* Live stats */}
                {/* Live stats */}
                <div
                    aria-live="polite"
                    className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gray-600 dark:text-gray-300"
                >
                    <span className="font-semibold">🔡 Characters: {characters}</span>
                    <span className="font-semibold">✏️ Words: {words}</span>
                    <span className="font-semibold">📄 Lines: {lines}</span>
                    {removedCount !== null && (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            ✨ Removed: {removedCount} characters
                        </span>
                    )}
                </div>

                {/* Textarea */}
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your AI-generated text here, pick what to clean, then click Clean Text..."
                    aria-label="Text to clean"
                    className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[280px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg"
                />

                {/* Cleaning options */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {CLEANING_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => toggleOption(option.id)}
                            aria-pressed={options[option.id]}
                            className={`flex items-start gap-2 px-4 py-2.5 rounded-2xl text-left text-sm md:text-base font-medium transition border
                ${options[option.id]
                                    ? "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-900 dark:text-cyan-100"
                                    : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                                }`}
                        >
                            <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                  ${options[option.id]
                                        ? "bg-cyan-500 border-cyan-500 text-white"
                                        : "border-gray-300 dark:border-gray-600"
                                    }`}
                            >
                                {options[option.id] && <Check size={14} />}
                            </span>
                            <span>
                                {option.label}
                                <span className="block text-xs font-normal text-gray-400 dark:text-gray-500">
                                    {option.hint}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>

                {/* Clean confirmation */}
                <p aria-live="polite" className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    {removedCount !== null
                        ? `\u2705 Cleaned! ${removedCount} unwanted characters removed. Click Copy to grab the result.`
                        : "Toggle the cleaners you need, then click Clean Text."}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        <button
                            onClick={handleClean}
                            disabled={!text}
                            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Sparkles size={18} /> Clean Text
                        </button>
                        <button
                            onClick={handleCopy}
                            disabled={!text}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={!text}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Trash size={18} /> Clear
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={!text}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Download size={18} /> Download
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
                        Clean as many times as you like. Each click applies the selected cleaners to
                        the current text. Copy the result or download it as a .txt file when you are done.
                    </p>
                </div>

                {/* Tip Banner */}
                <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
                    <p className="font-semibold">Em dashes everywhere?</p>
                    <p className="mt-2">
                        ChatGPT loves the — character. Keep “Fix em dashes” on and every spaced em
                        dash becomes a natural comma. One click, no manual find-and-replace.
                    </p>
                </div>
            </div>
        </section>
    )
}