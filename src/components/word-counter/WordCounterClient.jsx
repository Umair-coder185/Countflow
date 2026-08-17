"use client"

import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import { Check, Copy, Download, Trash } from "lucide-react"

const WordCounterInsights = dynamic(() => import("./WordCounterInsights"), {
  ssr: false,
  loading: () => (
    <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
      Loading writing insights…
    </div>
  ),
})

function getCoreCounts(text) {
  const trimmed = text.trim()

  if (!trimmed) {
    return {
      words: 0,
      characters: text.length,
      sentences: 0,
      paragraphs: 0,
    }
  }

  return {
    words: trimmed.split(/\s+/).length,
    characters: text.length,
    sentences: trimmed
      .split(/[.!?]+/)
      .filter((part) => part.trim()).length,
    paragraphs: trimmed
      .split(/\n+/)
      .filter((part) => part.trim()).length,
  }
}

export default function WordCounterClient() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)

  const counts = useMemo(() => getCoreCounts(text), [text])

  const handleClear = () => {
    setText("")
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const handleDownload = () => {
    if (!text) return

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")

    anchor.href = url
    anchor.download = "countflows-word-count.txt"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()

    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800 md:p-6">
      <div
        className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-4 py-3 text-sm text-gray-700 dark:border-cyan-900/60 dark:bg-cyan-950/20 dark:text-gray-300"
        aria-live="polite"
      >
        {counts.words > 0 ? (
          <>
            Your text contains{" "}
            <strong className="text-gray-950 dark:text-white">
              {counts.words.toLocaleString()}{" "}
              {counts.words === 1 ? "word" : "words"}
            </strong>
            .
          </>
        ) : (
          <>Paste or type your text below to count words instantly.</>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Words", counts.words],
          ["Characters", counts.characters],
          ["Sentences", counts.sentences],
          ["Paragraphs", counts.paragraphs],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-center dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {label}
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-gray-950 dark:text-white">
              {Number(value).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <label
        htmlFor="word-counter-input"
        className="mt-5 block text-sm font-semibold text-gray-800 dark:text-gray-200"
      >
        Paste or type your text
      </label>

      <textarea
        id="word-counter-input"
        name="word-counter-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Start typing or paste your paragraph, essay, article, or document..."
        autoComplete="off"
        spellCheck
        className="mt-2 min-h-[220px] w-full resize-y rounded-xl border border-gray-300 bg-white p-4 text-base text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 md:min-h-[300px] md:text-lg"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!text}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
          {copied ? "Copied" : "Copy"}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={!text}
          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          <Trash size={17} />
          Clear
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!text}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} />
          Download
        </button>
      </div>

      <WordCounterInsights
        text={text}
        words={counts.words}
        sentences={counts.sentences}
      />
    </div>
  )
}