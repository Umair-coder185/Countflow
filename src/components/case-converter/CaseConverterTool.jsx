"use client"

import { useState } from "react"
import { Trash, Download, Copy, Check } from "lucide-react"
import { CASE_STYLES } from "@/lib/caseConverter"

export default function CaseConverterTool() {
    const [text, setText] = useState("")
    const [activeCase, setActiveCase] = useState(null)
    const [copied, setCopied] = useState(false)

    const handleConvert = (style) => {
        setText((current) => style.convert(current))
        setActiveCase(style.name)
    }

    const handleClear = () => {
        setText("")
        setActiveCase(null)
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
        a.download = "converted-text.txt"
        a.click()
        URL.revokeObjectURL(url)
    }

    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 md:p-6">
            {/* Live stats */}
            <div
                aria-live="polite"
                className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gray-600 dark:text-gray-300"
            >
                <span className="font-semibold">🔡 Characters: {characters}</span>
                <span className="font-semibold">✏️ Words: {words}</span>
                <span className="font-semibold">📄 Sentences: {sentences}</span>
                <span className="font-semibold">✂️ No spaces: {charactersNoSpaces}</span>
            </div>

            {/* Textarea */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here, then click a case style below..."
                aria-label="Text to convert"
                className="w-full min-h-[150px] md:min-h-[240px] border border-gray-300 dark:border-gray-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-y bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg"
            />

            {/* Case style buttons */}
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {CASE_STYLES.map((style) => (
                    <button
                        key={style.name}
                        onClick={() => handleConvert(style)}
                        disabled={!text}
                        className={`min-h-[44px] px-3 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors duration-150 shadow-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:text-gray-500 ${activeCase === style.name ? "bg-cyan-700 text-white ring-2 ring-cyan-300 dark:ring-cyan-500" : "bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800"}`}
                    >
                        {style.name}
                    </button>
                ))}
            </div>

            {/* Conversion confirmation */}
            <p aria-live="polite" className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {activeCase
                    ? `✅ Converted to ${activeCase}. Click Copy to grab the result.`
                    : "Pick a case style to convert your text instantly."}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <button
                        onClick={handleCopy}
                        disabled={!text}
                        className="flex-1 sm:flex-none min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-600 text-white font-semibold rounded-full shadow-sm hover:bg-cyan-700 active:bg-cyan-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                        onClick={handleClear}
                        disabled={!text}
                        className="flex-1 sm:flex-none min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-800 dark:disabled:text-gray-600"
                    >
                        <Trash size={18} /> Clear
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!text}
                        className="flex-1 sm:flex-none min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-full shadow-sm hover:bg-emerald-700 active:bg-emerald-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                    >
                        <Download size={18} /> Download
                    </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
                    Convert as many times as you like — each click applies the new case to the current text. Copy the result or download it as a .txt file when you are done.
                </p>
            </div>

            {/* Tip Banner */}
            <div className="mt-8 rounded-3xl border border-dashed border-cyan-200 dark:border-cyan-700 bg-cyan-50/80 dark:bg-cyan-900/20 p-6 text-center text-sm text-cyan-900 dark:text-cyan-100">
                <p className="font-semibold">Caps lock accident?</p>
                <p className="mt-2">
                    Paste the shouting text and click Sentence case — it reads normally again in one click, no retyping needed.
                </p>
            </div>
        </div>
    )
}