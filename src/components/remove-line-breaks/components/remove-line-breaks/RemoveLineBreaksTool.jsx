"use client"

import { useState, useMemo } from "react"
import { Copy, Check, Trash, Download } from "lucide-react"

const MODES = [
  { id: "remove-all", name: "Remove All", desc: "Joins every line into one block with spaces." },
  { id: "preserve-paragraphs", name: "Preserve Paragraphs", desc: "Strips single line breaks but keeps paragraph spacing." },
  { id: "custom-separator", name: "Custom Separator", desc: "Replace line breaks with any character you need." },
]

const QUICK_SEPARATORS = [
  { label: "Comma", value: ", " },
  { label: "Pipe", value: " | " },
  { label: "Semicolon", value: "; " },
  { label: "Space", value: " " },
]

export default function RemoveLineBreaksTool() {
  const [text, setText] = useState("")
  const [mode, setMode] = useState("preserve-paragraphs")
  const [separator, setSeparator] = useState(", ")
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!text) return ""
    const normalized = text.replace(/\r\n?/g, "\n")

    switch (mode) {
      case "remove-all":
        return normalized.replace(/\n/g, " ").replace(/ {2,}/g, " ").trim()

      case "preserve-paragraphs":
        return (
          normalized
            .replace(/\n{3,}/g, "\n\n")  // collapse 3+ breaks to 2
            .replace(/\n\n/g, "\x00")     // mark paragraph breaks
            .replace(/\n/g, " ")           // single breaks → space
            .replace(/\x00/g, "\n\n")     // restore paragraph breaks
            .replace(/ {2,}/g, " ")       // clean double spaces
            .trim()
        )

      case "custom-separator":
        return normalized.replace(/\n/g, separator).trim()

      default:
        return text
    }
  }, [text, mode, separator])

  const originalLines = text ? text.split(/\r\n?|\n/).length : 0
  const resultLines = result ? result.split(/\r\n?|\n/).length : 0
  const breaksRemoved = Math.max(originalLines - resultLines, 0)

  const handleClear = () => {
    setText("")
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cleaned-text.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">

        {/* Mode selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                mode === m.id
                  ? "bg-cyan-600 text-white ring-2 ring-cyan-300"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Mode description + custom separator */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {MODES.find((m) => m.id === mode)?.desc}
          </p>

          {mode === "custom-separator" && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <label htmlFor="sep" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Separator:
              </label>
              <input
                id="sep"
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-28 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="flex gap-1.5">
                {QUICK_SEPARATORS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSeparator(s.value)}
                    aria-label={`Use ${s.label} separator`}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      separator === s.value
                        ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{originalLines}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Original lines</p>
          </div>
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{resultLines}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Result lines</p>
          </div>
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{breaksRemoved}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Breaks removed</p>
          </div>
        </div>

        {/* Textareas */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="input-text" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Input
            </label>
            <textarea
              id="input-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="output-text" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            <textarea
              id="output-text"
              value={result}
              readOnly
              className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied!" : "Copy Output"}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <Trash size={18} /> Clear
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
          >
            <Download size={18} /> Download
          </button>
        </div>

        {/* Tip banner */}
        <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
          <p className="font-semibold">Not sure which mode to use?</p>
          <p className="mt-2">
            Start with <strong>Preserve Paragraphs</strong> — it removes ugly mid-sentence breaks while
            keeping your document structure intact.
          </p>
        </div>
      </div>
    </section>
  )
}