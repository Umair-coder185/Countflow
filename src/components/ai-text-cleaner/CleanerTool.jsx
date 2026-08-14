


"use client"

import { useRef, useState } from "react"
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  Download,
  Eraser,
  EyeOff,
  FileCode,
  FileText,
  Globe,
  Layers,
  List,
  Minus,
  Quote,
  RotateCcw,
  ShieldCheck,
  Smile,
  Sparkles,
  Type,
  WrapText,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/* CLEANING ENGINE                                                            */
/* -------------------------------------------------------------------------- */
/*
  Everything below runs in the visitor's browser.
  No API, database, localStorage, artificial delay, or extra npm package.
*/

const decodeEntities = (text) => {
  const el = document.createElement("textarea")
  el.innerHTML = text
  return el.value
}

const stripHtmlTags = (text) =>
  text.replace(/<[^>]+>/g, "")

const removeMarkdown = (text) =>
  text
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
      inner
        .split("|")
        .map((cell) => cell.trim())
        .join("  ")
    )
    .replace(/^[ \t]*[:\-| ]+[ \t]*$/gm, "")

const removeBullets = (text) =>
  text
    .replace(
      /^[ \t]*[-*+\u2022\u00B7\u25E6\u25AA\u2023][ \t]+/gm,
      ""
    )
    .replace(/^[ \t]*\d{1,3}[.)][ \t]+/gm, "")

const removeEmoji = (text) =>
  text
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "")
    .replace(/\u200D/g, "")

const HOMOGLYPH_MAP = Object.freeze({
  "\u0410": "A",
  "\u0412": "B",
  "\u0415": "E",
  "\u041A": "K",
  "\u041C": "M",
  "\u041D": "H",
  "\u041E": "O",
  "\u0420": "P",
  "\u0421": "C",
  "\u0422": "T",
  "\u0425": "X",
  "\u0430": "a",
  "\u0435": "e",
  "\u043E": "o",
  "\u0440": "p",
  "\u0441": "c",
  "\u0443": "y",
  "\u0445": "x",
  "\u0456": "i",
  "\u0458": "j",
  "\u04BB": "h",
  "\u0391": "A",
  "\u0392": "B",
  "\u0395": "E",
  "\u0396": "Z",
  "\u0397": "H",
  "\u0399": "I",
  "\u039A": "K",
  "\u039C": "M",
  "\u039D": "N",
  "\u039F": "O",
  "\u03A1": "P",
  "\u03A4": "T",
  "\u03A5": "Y",
  "\u03A7": "X",
  "\u03BF": "o",
  "\u03B1": "a",
})

const HOMOGLYPH_PATTERN = new RegExp(
  Object.keys(HOMOGLYPH_MAP).join("|"),
  "g"
)

const advancedUnicodeCleanup = (text) =>
  text
    .normalize("NFKC")
    .replace(
      HOMOGLYPH_PATTERN,
      (character) => HOMOGLYPH_MAP[character]
    )

const smartPunctuation = (text) =>
  text
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/\u2026/g, "...")

/*
  Safer than converting spaced dashes to commas.
  A hyphen preserves ranges such as "2015 – 2020" better than a comma.
*/
const fixDashes = (text) =>
  text
    .replace(/[ \t]*\u2014[ \t]*/g, " - ")
    .replace(/[ \t]*\u2013[ \t]*/g, "-")
    .replace(/[ \t]{2,}/g, " ")

/*
  Conservative punctuation cleanup.
  We intentionally do NOT force spaces after punctuation because doing so can
  break URLs, domains, decimals, version numbers, and code.
*/
const punctuationSpacing = (text) =>
  text
    .replace(/\s+([.,;:!?\)\]\}])/g, "$1")
    .replace(/([.,;:!?])[\t ]{2,}/g, "$1 ")

const removeInvisible = (text) =>
  text
    .replace(/^\uFEFF/, "")
    .replace(
      /[\u200B\u200C\u200D\u2060\uFEFF\u00AD\u180E]/g,
      ""
    )
    .replace(
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\x80-\x9F]/g,
      ""
    )
    .replace(
      /[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g,
      " "
    )

const stripDiacritics = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

const removeDuplicateLines = (text) => {
  const seen = new Set()

  return text
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

const tidySpacing = (text) =>
  text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) =>
      line.replace(/[ \t]+$/, "")
    )
    .join("\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

const removeBlankLines = (text) =>
  text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n")

/* -------------------------------------------------------------------------- */
/* CLEANER CONFIG                                                             */
/* -------------------------------------------------------------------------- */

const CLEANING_OPTIONS = [
  {
    id: "invisible",
    group: "recommended",
    label: "Remove hidden characters",
    hint: "Zero-width spaces, BOM, control characters and odd spaces",
    fn: removeInvisible,
    defaultOn: true,
    icon: EyeOff,
  },
  {
    id: "spacing",
    group: "recommended",
    label: "Tidy spacing & line breaks",
    hint: "Repeated spaces, trailing gaps and excessive blank lines",
    fn: tidySpacing,
    defaultOn: true,
    icon: WrapText,
  },
  {
    id: "punctuation",
    group: "recommended",
    label: "Straighten smart punctuation",
    hint: "Curly quotes → straight quotes and … → ...",
    fn: smartPunctuation,
    defaultOn: true,
    icon: Quote,
  },
  {
    id: "dashes",
    group: "recommended",
    label: "Replace em & en dashes",
    hint: "Convert — and – to keyboard-safe hyphens",
    fn: fixDashes,
    defaultOn: true,
    icon: Minus,
  },
  {
    id: "punctspace",
    group: "recommended",
    label: "Tidy punctuation spacing",
    hint: "Remove stray spaces without breaking URLs or decimals",
    fn: punctuationSpacing,
    defaultOn: true,
    icon: Type,
  },
  {
    id: "markdown",
    group: "recommended",
    label: "Remove markdown formatting",
    hint: "Headings, bold, links, code marks, tables and quotes",
    fn: removeMarkdown,
    defaultOn: true,
    icon: FileCode,
  },
  {
    id: "html",
    group: "recommended",
    label: "Strip HTML tags",
    hint: "Remove tags such as <p>, <div> and <span>",
    fn: stripHtmlTags,
    defaultOn: true,
    icon: Code2,
  },
  {
    id: "entities",
    group: "recommended",
    label: "Decode HTML entities",
    hint: "&amp; → &, &lt; → <",
    fn: decodeEntities,
    defaultOn: true,
    icon: Code2,
  },

  {
    id: "blanklines",
    group: "advanced",
    label: "Remove all blank lines",
    hint: "Intentionally collapse paragraph spacing",
    fn: removeBlankLines,
    defaultOn: false,
    icon: Minus,
  },
  {
    id: "bullets",
    group: "advanced",
    label: "Remove bullets & numbering",
    hint: "Remove -, • and numbered markers at line starts",
    fn: removeBullets,
    defaultOn: false,
    icon: List,
  },
  {
    id: "emoji",
    group: "advanced",
    label: "Remove emojis",
    hint: "Remove pictographic emoji symbols",
    fn: removeEmoji,
    defaultOn: false,
    icon: Smile,
  },
  {
    id: "diacritics",
    group: "advanced",
    label: "Strip diacritics",
    hint: "café → cafe, naïve → naive",
    fn: stripDiacritics,
    defaultOn: false,
    icon: Type,
  },
  {
    id: "advanced",
    group: "advanced",
    label: "Advanced Unicode cleanup",
    hint: "Normalize fullwidth, ligature and lookalike characters",
    fn: advancedUnicodeCleanup,
    defaultOn: false,
    icon: Globe,
  },
  {
    id: "duplicates",
    group: "advanced",
    label: "Remove duplicate lines",
    hint: "Collapse exact repeated lines to one",
    fn: removeDuplicateLines,
    defaultOn: false,
    icon: Layers,
  },
]

const OPTIONS_BY_ID = Object.fromEntries(
  CLEANING_OPTIONS.map((option) => [
    option.id,
    option,
  ])
)

const DEFAULT_OPTIONS = Object.fromEntries(
  CLEANING_OPTIONS.map((option) => [
    option.id,
    option.defaultOn,
  ])
)

const PIPELINE_ORDER = [
  "entities",
  "html",
  "markdown",
  "bullets",
  "emoji",
  "advanced",
  "punctuation",
  "dashes",
  "invisible",
  "diacritics",
  "duplicates",
  "spacing",
  "blanklines",
  "punctspace",
]

const RECOMMENDED_OPTIONS =
  CLEANING_OPTIONS.filter(
    (option) =>
      option.group === "recommended"
  )

const ADVANCED_OPTIONS =
  CLEANING_OPTIONS.filter(
    (option) =>
      option.group === "advanced"
  )

/* -------------------------------------------------------------------------- */
/* CLEAN + REPORT IN ONE PASS                                                 */
/* -------------------------------------------------------------------------- */

export function cleanText(
  input,
  enabledOptions
) {
  return PIPELINE_ORDER.reduce(
    (result, id) => {
      if (!enabledOptions[id]) {
        return result
      }

      return OPTIONS_BY_ID[id].fn(result)
    },
    input
  )
}

function cleanTextWithReport(
  input,
  enabledOptions
) {
  let result = input
  const changed = []

  for (const id of PIPELINE_ORDER) {
    if (!enabledOptions[id]) continue

    const option = OPTIONS_BY_ID[id]
    const next = option.fn(result)

    if (next !== result) {
      changed.push({
        id,
        label: option.label,
      })
    }

    result = next
  }

  return {
    text: result,
    changed,
    beforeChars: input.length,
    afterChars: result.length,
  }
}

/* -------------------------------------------------------------------------- */
/* SMALL HELPERS                                                              */
/* -------------------------------------------------------------------------- */

const SAMPLE_TEXT = `## Project Update

This is **important** — but the copied text contains “smart quotes”, extra   spaces, and markdown.

> It may also contain hidden formatting.

• Keep the wording.
• Remove the clutter.
• Make it easy to paste elsewhere.`

function getTextStats(text) {
  const trimmed = text.trim()

  return {
    chars: text.length,
    words: trimmed
      ? trimmed.split(/\s+/).length
      : 0,
    lines: text
      .split("\n")
      .filter(
        (line) => line.trim().length > 0
      ).length,
  }
}

/*
  Build a lightweight visual diff for the ORIGINAL text.

  - "same" segments render normally.
  - "changed" segments are characters that were removed or replaced.
  - Insertions that exist only in the cleaned output are not highlighted
    in the original panel.
  - Bounded look-ahead keeps this fast for normal pasted text and avoids
    adding a diff library to the client bundle.
*/
function buildOriginalHighlightSegments(before, after) {
  if (!before) return []

  const LOOK_AHEAD = 48
  const segments = []

  const push = (type, value) => {
    if (!value) return

    const previous = segments[segments.length - 1]

    if (previous?.type === type) {
      previous.value += value
      return
    }

    segments.push({
      type,
      value,
    })
  }

  let beforeIndex = 0
  let afterIndex = 0

  while (
    beforeIndex < before.length &&
    afterIndex < after.length
  ) {
    if (
      before[beforeIndex] ===
      after[afterIndex]
    ) {
      push(
        "same",
        before[beforeIndex]
      )

      beforeIndex += 1
      afterIndex += 1
      continue
    }

    const beforeWindowEnd =
      Math.min(
        before.length,
        beforeIndex + LOOK_AHEAD
      )

    const afterWindowEnd =
      Math.min(
        after.length,
        afterIndex + LOOK_AHEAD
      )

    const nextAfterCharInBefore =
      before.indexOf(
        after[afterIndex],
        beforeIndex + 1
      )

    const nextBeforeCharInAfter =
      after.indexOf(
        before[beforeIndex],
        afterIndex + 1
      )

    const deletionDistance =
      nextAfterCharInBefore !== -1 &&
      nextAfterCharInBefore <
        beforeWindowEnd
        ? nextAfterCharInBefore -
          beforeIndex
        : Infinity

    const insertionDistance =
      nextBeforeCharInAfter !== -1 &&
      nextBeforeCharInAfter <
        afterWindowEnd
        ? nextBeforeCharInAfter -
          afterIndex
        : Infinity

    /*
      If the cleaned text catches up by skipping characters from
      the original, those source characters were removed.
    */
    if (
      deletionDistance <
      insertionDistance
    ) {
      push(
        "changed",
        before.slice(
          beforeIndex,
          beforeIndex +
            deletionDistance
        )
      )

      beforeIndex +=
        deletionDistance
      continue
    }

    /*
      If the original catches up by skipping characters that only
      exist in the cleaned output, advance the output pointer.
    */
    if (
      insertionDistance <
      deletionDistance
    ) {
      afterIndex +=
        insertionDistance
      continue
    }

    /*
      Replacement / ambiguous single-character change.
      Highlight the source character as changed.
    */
    push(
      "changed",
      before[beforeIndex]
    )

    beforeIndex += 1
    afterIndex += 1
  }

  if (beforeIndex < before.length) {
    push(
      "changed",
      before.slice(beforeIndex)
    )
  }

  return segments
}

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function CleanerTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [options, setOptions] =
    useState(DEFAULT_OPTIONS)
  const [report, setReport] = useState(null)
  const [toast, setToast] = useState(null)
  const [copied, setCopied] =
    useState(false)
  const [showChanges, setShowChanges] =
    useState(false)

  const toastTimerRef = useRef(null)
  const reportRef = useRef(null)

  const inputStats = getTextStats(input)
  const outputStats = getTextStats(output)

  const activeRecommended =
    RECOMMENDED_OPTIONS.filter(
      (option) => options[option.id]
    ).length

  const activeAdvanced =
    ADVANCED_OPTIONS.filter(
      (option) => options[option.id]
    ).length

  const showToast = (message) => {
    setToast(message)

    if (toastTimerRef.current) {
      window.clearTimeout(
        toastTimerRef.current
      )
    }

    toastTimerRef.current =
      window.setTimeout(() => {
        setToast(null)
      }, 2200)
  }

  const updateInput = (value) => {
    setInput(value)

    if (output || report) {
      setOutput("")
      setReport(null)
      setShowChanges(false)
    }
  }

  const toggleOption = (id) => {
    setOptions((previous) => ({
      ...previous,
      [id]: !previous[id],
    }))

    if (output || report) {
      setOutput("")
      setReport(null)
      setShowChanges(false)
    }
  }

  const resetOptions = () => {
    setOptions(DEFAULT_OPTIONS)
    setOutput("")
    setReport(null)
    setShowChanges(false)
    showToast("Cleaning options reset")
  }

  const handleSample = () => {
    setInput(SAMPLE_TEXT)
    setOutput("")
    setReport(null)
    setShowChanges(false)
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
    setReport(null)
    setCopied(false)
    setShowChanges(false)
  }

  const handleClean = () => {
    if (!input.trim()) {
      showToast(
        "Paste or type some text first"
      )
      return
    }

    const result =
      cleanTextWithReport(
        input,
        options
      )

    setOutput(result.text)
    setReport(result)
    setShowChanges(
      result.text !== input
    )

    if (result.changed.length === 0) {
      showToast(
        "Your text is already clean"
      )
    } else {
      showToast(
        `${result.changed.length} ${
          result.changed.length === 1
            ? "cleaner changed"
            : "cleaners changed"
        } your text`
      )
    }

    window.requestAnimationFrame(() => {
      reportRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    })
  }

  const handleCopy = async () => {
    if (!output) {
      showToast(
        "Clean some text first"
      )
      return
    }

    try {
      await navigator.clipboard.writeText(
        output
      )

      setCopied(true)
      showToast("Clean text copied")

      window.setTimeout(() => {
        setCopied(false)
      }, 1600)
    } catch {
      showToast("Copy failed")
    }
  }

  const handleDownload = () => {
    if (!output) {
      showToast(
        "Clean some text first"
      )
      return
    }

    const blob = new Blob(
      [output],
      {
        type:
          "text/plain;charset=utf-8",
      }
    )

    const url =
      URL.createObjectURL(blob)

    const anchor =
      document.createElement("a")

    anchor.href = url
    anchor.download =
      "countflows-cleaned-text.txt"

    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()

    URL.revokeObjectURL(url)

    showToast("Text downloaded")
  }

  return (
    <div className="relative">
      {/* -------------------------------------------------------------- */}
      {/* TOAST                                                          */}
      {/* -------------------------------------------------------------- */}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4"
        >
          <div
            className="flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-slate-950"
          >
            <Check
              className="h-4 w-4 text-emerald-400 dark:text-emerald-600"
              aria-hidden="true"
            />

            {toast}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* TOOL SHELL                                                     */}
      {/* -------------------------------------------------------------- */}

      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-xl shadow-cyan-950/5 dark:border-cyan-900/50 dark:bg-slate-950 dark:shadow-black/30"
      >
        {/* ------------------------------------------------------------ */}
        {/* HEADER                                                       */}
        {/* ------------------------------------------------------------ */}

        <div
          className="flex flex-col gap-4 border-b border-slate-100 px-4 py-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
            >
              <Eraser
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <h2
                className="text-base font-black text-slate-900 dark:text-white"
              >
                Smart Text Cleaner
              </h2>

              <p
                className="mt-0.5 text-xs text-slate-500 dark:text-slate-400"
              >
                Remove formatting clutter
                without rewriting your words.
              </p>
            </div>
          </div>

          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
          >
            <ShieldCheck
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />

            Browser-only · No upload
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* INPUT / OUTPUT                                               */}
        {/* ------------------------------------------------------------ */}

        <div
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* Input */}
          <div
            className="flex flex-col border-b border-slate-100 dark:border-slate-800 md:border-b-0 md:border-r"
          >
            <div
              className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5"
            >
              <span
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                <FileText
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />

                Original text
              </span>

              <div
                className="flex items-center gap-3 text-xs font-medium text-slate-400"
              >
                <button
                  type="button"
                  onClick={handleSample}
                  className="font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
                >
                  Try sample
                </button>

                {report &&
                  input !== output && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowChanges(
                          (current) =>
                            !current
                        )
                      }
                      className="font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
                    >
                      {showChanges
                        ? "Edit text"
                        : "Show changes"}
                    </button>
                  )}

                <span>
                  {inputStats.chars} chars
                </span>

                <span>
                  {inputStats.words} words
                </span>
              </div>
            </div>

            {showChanges &&
            report ? (
              <div
                className="min-h-[220px] flex-1 overflow-y-auto bg-rose-50/25 px-4 py-4 text-sm leading-7 text-slate-700 dark:bg-rose-950/5 dark:text-slate-200 sm:min-h-[280px] sm:px-5 sm:text-base"
              >
                <div
                  className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1 text-[11px] font-semibold text-rose-700 dark:border-rose-900 dark:bg-slate-950 dark:text-rose-300"
                >
                  Red = removed or replaced
                  source text
                </div>

                <div
                  className="whitespace-pre-wrap break-words"
                >
                  {buildOriginalHighlightSegments(
                    input,
                    output
                  ).map(
                    (
                      segment,
                      index
                    ) =>
                      segment.type ===
                      "changed" ? (
                        <mark
                          key={index}
                          className="rounded bg-rose-200/80 px-0.5 text-rose-800 line-through decoration-rose-500 decoration-2 dark:bg-rose-900/50 dark:text-rose-200"
                        >
                          {segment.value}
                        </mark>
                      ) : (
                        <span key={index}>
                          {segment.value}
                        </span>
                      )
                  )}
                </div>
              </div>
            ) : (
              <textarea
                value={input}
                onChange={(event) =>
                  updateInput(
                    event.target.value
                  )
                }
                placeholder="Paste AI-generated or copied text here…"
                spellCheck={false}
                className="min-h-[220px] flex-1 resize-y bg-transparent px-4 py-4 text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-300 dark:text-slate-200 dark:placeholder:text-slate-600 sm:min-h-[280px] sm:px-5 sm:text-base"
              />
            )}

            <div
              className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 text-xs text-slate-400 dark:border-slate-800 sm:px-5"
            >
              <span>
                {inputStats.lines} non-empty
                lines
              </span>

              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-semibold text-slate-500 hover:text-red-500"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div
              className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5"
            >
              <span
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />

                Clean output
              </span>

              <div className="flex items-center gap-2">
                <span
                  className="hidden text-xs font-medium text-slate-400 sm:inline"
                >
                  {outputStats.chars} chars ·{" "}
                  {outputStats.words} words
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy cleaned text"
                  title="Copy cleaned text"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-shadow hover:shadow-md dark:border-slate-700 dark:text-slate-400"
                >
                  {copied ? (
                    <Check
                      className="h-4 w-4 text-emerald-500"
                    />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  aria-label="Download cleaned text"
                  title="Download cleaned text"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-shadow hover:shadow-md dark:border-slate-700 dark:text-slate-400"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="min-h-[220px] flex-1 overflow-y-auto px-4 py-4 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:min-h-[280px] sm:px-5 sm:text-base"
            >
              {output ? (
                <pre
                  className="whitespace-pre-wrap break-words font-sans"
                >
                  {output}
                </pre>
              ) : (
                <div
                  className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400"
                  >
                    <Sparkles
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p
                      className="text-sm font-bold text-slate-600 dark:text-slate-300"
                    >
                      Cleaned text appears here
                    </p>

                    <p
                      className="mt-1 text-xs text-slate-400"
                    >
                      Your wording stays yours.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div
              className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-400 dark:border-slate-800 sm:px-5"
            >
              {outputStats.lines} non-empty
              lines
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* CLEANUP REPORT                                               */}
        {/* ------------------------------------------------------------ */}

        {report && (
          <div
            ref={reportRef}
            aria-live="polite"
            className="border-t border-emerald-100 bg-emerald-50/50 px-4 py-5 dark:border-emerald-900/40 dark:bg-emerald-950/10 sm:px-6"
          >
            <div
              className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <div
                  className="flex items-center gap-2"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"
                  >
                    <Check
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-black text-slate-900 dark:text-white"
                    >
                      Cleanup report
                    </h3>

                    <p
                      className="text-xs text-slate-500 dark:text-slate-400"
                    >
                      {report.changed.length === 0
                        ? "No selected cleaner needed to change this text."
                        : `${report.changed.length} ${
                            report.changed.length === 1
                              ? "cleaner made a change."
                              : "cleaners made changes."
                          }`}
                    </p>
                  </div>
                </div>

                {report.changed.length > 0 && (
                  <div
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {report.changed.map(
                      (item) => (
                        <span
                          key={item.id}
                          className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-slate-950 dark:text-emerald-300"
                        >
                          ✓ {item.label}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>

              <div
                className="grid grid-cols-2 gap-2 sm:min-w-[220px]"
              >
                <ReportMetric
                  label="Before"
                  value={`${report.beforeChars} chars`}
                />

                <ReportMetric
                  label="After"
                  value={`${report.afterChars} chars`}
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CLEANING OPTIONS                                             */}
        {/* ------------------------------------------------------------ */}

        <div
          className="border-t border-slate-100 bg-slate-50/60 px-4 py-6 dark:border-slate-800 dark:bg-slate-900/40 sm:px-6"
        >
          <div
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className="text-base font-black text-slate-900 dark:text-white"
                >
                  Recommended cleaning
                </h3>

                <span
                  className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
                >
                  {activeRecommended}/
                  {RECOMMENDED_OPTIONS.length}
                </span>
              </div>

              <p
                className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400"
              >
                Fix the common formatting
                problems people get after
                copying text from AI tools,
                websites and editors.
              </p>
            </div>

            <button
              type="button"
              onClick={resetOptions}
              className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
            >
              <RotateCcw
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />

              Reset defaults
            </button>
          </div>

          <div
            className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {RECOMMENDED_OPTIONS.map(
              (option) => (
                <CleanerToggle
                  key={option.id}
                  option={option}
                  enabled={
                    options[option.id]
                  }
                  onToggle={toggleOption}
                  tone="cyan"
                />
              )
            )}
          </div>

          {/* Advanced uses native details: no extra React state */}
          <details
            className="group mt-5 rounded-2xl border border-violet-200/80 bg-violet-50/50 dark:border-violet-900/50 dark:bg-violet-950/10"
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:hidden"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-black text-violet-800 dark:text-violet-300"
                  >
                    Advanced cleaning
                  </span>

                  <span
                    className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
                  >
                    {activeAdvanced} active
                  </span>
                </div>

                <p
                  className="mt-1 text-xs text-slate-500 dark:text-slate-400"
                >
                  Optional tools that can
                  intentionally remove or
                  normalize content.
                </p>
              </div>

              <span
                className="text-lg font-bold text-violet-500 transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>

            <div
              className="grid grid-cols-1 gap-3 border-t border-violet-200/60 p-4 dark:border-violet-900/40 sm:grid-cols-2 lg:grid-cols-3"
            >
              {ADVANCED_OPTIONS.map(
                (option) => (
                  <CleanerToggle
                    key={option.id}
                    option={option}
                    enabled={
                      options[option.id]
                    }
                    onToggle={
                      toggleOption
                    }
                    tone="violet"
                  />
                )
              )}
            </div>
          </details>

          <div
            className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200/70 bg-amber-50/60 px-3 py-2.5 text-xs leading-5 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/10 dark:text-amber-300"
          >
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />

            CountFlows cleans formatting.
            It does not rewrite your
            sentences or send your text to
            an AI model.
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* PRIMARY ACTION                                               */}
        {/* ------------------------------------------------------------ */}

        <div
          className="border-t border-slate-100 px-4 py-5 dark:border-slate-800 sm:px-6"
        >
          <button
            type="button"
            onClick={handleClean}
            disabled={!input.trim()}
            className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-cyan-500/20 transition-shadow hover:shadow-xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-40 sm:text-lg"
          >
            <Sparkles
              className="h-5 w-5"
              aria-hidden="true"
            />

            Clean My Text

            <ArrowRight
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>

          <p
            className="mt-2.5 text-center text-xs text-slate-400"
          >
            Runs instantly in your browser
          </p>
        </div>


      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* PRESENTATIONAL HELPERS                                                     */
/* -------------------------------------------------------------------------- */

function CleanerToggle({
  option,
  enabled,
  onToggle,
  tone,
}) {
  const Icon = option.icon

  const activeClass =
    tone === "violet"
      ? `
          border-violet-300
          bg-white
          shadow-sm

          dark:border-violet-700/60
          dark:bg-slate-950
        `
      : `
          border-cyan-200
          bg-white
          shadow-sm

          dark:border-cyan-800/60
          dark:bg-slate-950
        `

  const iconClass =
    tone === "violet"
      ? `
          bg-violet-100
          text-violet-600

          dark:bg-violet-950/50
          dark:text-violet-300
        `
      : `
          bg-cyan-100
          text-cyan-600

          dark:bg-cyan-950/50
          dark:text-cyan-300
        `

  const switchClass =
    tone === "violet"
      ? "bg-violet-500"
      : "bg-cyan-500"

  return (
    <button
      type="button"
      onClick={() =>
        onToggle(option.id)
      }
      aria-pressed={enabled}
      className={`flex min-h-[82px] items-start gap-3 rounded-2xl border p-3.5 text-left transition-shadow hover:shadow-md ${ enabled ? activeClass : ` border-slate-200 bg-white/60 dark:border-slate-700 dark:bg-slate-900/50 ` }`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${ enabled ? iconClass : ` bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 ` }`}
      >
        <Icon
          className="h-4 w-4"
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-bold ${ enabled ? ` text-slate-800 dark:text-slate-100 ` : ` text-slate-500 dark:text-slate-400 ` }`}
        >
          {option.label}
        </p>

        <p
          className="mt-1 text-xs leading-5 text-slate-400 dark:text-slate-500"
        >
          {option.hint}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={`mt-1 h-5 w-9 shrink-0 rounded-full p-0.5 ${ enabled ? switchClass : ` bg-slate-300 dark:bg-slate-700 ` }`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${ enabled ? "translate-x-4" : "translate-x-0" }`}
        />
      </span>
    </button>
  )
}

function ReportMetric({
  label,
  value,
}) {
  return (
    <div
      className="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 dark:border-emerald-900 dark:bg-slate-950"
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-wider text-slate-400"
      >
        {label}
      </p>

      <p
        className="mt-0.5 text-sm font-black text-slate-800 dark:text-white"
      >
        {value}
      </p>
    </div>
  )
}