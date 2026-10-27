"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardPaste,
  Copy,
  Download,
  Eraser,
  EyeOff,
  FileCode2,
  FileText,
  Layers,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";

/* =========================================================
   AI TEXT CLEANER — COUNTflows
   Responsive client-side text cleaning component

   Features:
   - 14 cleaning options
   - 8 recommended options
   - 6 advanced options
   - Input/output comparison
   - Cleanup report
   - Changed-text highlighting
   - Copy, download, sample and reset
   - Mobile and desktop layouts
   - Browser-side processing
========================================================= */

/* =========================================================
   CLEANING UTILITIES
========================================================= */

function decodeEntities(text) {
  const element = document.createElement("textarea");
  element.innerHTML = text;
  return element.value;
}

function stripHtmlTags(text) {
  return text.replace(/<[^>]+>/g, "");
}

function removeMarkdown(text) {
  return text
    // Fenced code blocks: remove fences, preserve content.
    .replace(/^```[^\n]*\n?/gm, "")
    .replace(/^~~~[^\n]*\n?/gm, "")

    // Markdown headings.
    .replace(/^[ \t]{0,3}#{1,6}[ \t]+/gm, "")

    // Images and links: preserve readable labels.
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

    // Bold, italic and strikethrough.
    .replace(/\*\*\*([\s\S]+?)\*\*\*/g, "$1")
    .replace(/___([\s\S]+?)___/g, "$1")
    .replace(/\*\*([\s\S]+?)\*\*/g, "$1")
    .replace(/__([\s\S]+?)__/g, "$1")
    .replace(/~~([\s\S]+?)~~/g, "$1")

    // Conservative single-emphasis handling.
    .replace(/(^|[\s([{])\*([^*\n]+)\*(?=$|[\s)\]},.!?])/gm, "$1$2")
    .replace(/(^|[\s([{])_([^_\n]+)_(?=$|[\s)\]},.!?])/gm, "$1$2")

    // Inline code.
    .replace(/`([^`\n]+)`/g, "$1")

    // Blockquotes.
    .replace(/^[ \t]*>[ \t]?/gm, "")

    // Horizontal rules.
    .replace(/^[ \t]*(?:-{3,}|\*{3,}|_{3,})[ \t]*$/gm, "")

    // Markdown table separator rows.
    .replace(
      /^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?[ \t]*$/gm,
      ""
    )

    // Readable markdown table rows.
    .replace(/^[ \t]*\|(.+)\|[ \t]*$/gm, (_, cells) =>
      cells
        .split("|")
        .map((cell) => cell.trim())
        .join("  ")
    );
}

function removeBullets(text) {
  return text
    .replace(
      /^[ \t]*[-*+\u2022\u00B7\u25E6\u25AA\u2023][ \t]+/gm,
      ""
    )
    .replace(/^[ \t]*\d{1,3}[.)][ \t]+/gm, "");
}

function removeEmoji(text) {
  return text
    .replace(
      /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*/gu,
      ""
    )
    .replace(/\uFE0F/g, "");
}

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
});

const HOMOGLYPH_PATTERN = new RegExp(
  Object.keys(HOMOGLYPH_MAP).join("|"),
  "g"
);

function advancedUnicodeCleanup(text) {
  return text
    .normalize("NFKC")
    .replace(
      HOMOGLYPH_PATTERN,
      (character) => HOMOGLYPH_MAP[character]
    );
}

function smartPunctuation(text) {
  return text
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/\u2026/g, "...");
}

function fixDashes(text) {
  return text
    .replace(/[ \t]*\u2014[ \t]*/g, " - ")
    .replace(/[ \t]*\u2013[ \t]*/g, "-")
    .replace(/[ \t]{2,}/g, " ");
}

function punctuationSpacing(text) {
  return text
    .replace(/[ \t]+([.,;:!?)}\]])/g, "$1")
    .replace(/([.,;:!?])[ \t]{2,}/g, "$1 ");
}

function removeInvisible(text) {
  return text
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
    );
}

function stripDiacritics(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function removeDuplicateLines(text) {
  const seen = new Set();

  return text
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return true;
      }

      if (seen.has(trimmed)) {
        return false;
      }

      seen.add(trimmed);
      return true;
    })
    .join("\n");
}

function tidySpacing(text) {
  return text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) =>
      line.replace(/[ \t]+$/g, "")
    )
    .join("\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function removeBlankLines(text) {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
}

/* =========================================================
   CLEANER CONFIGURATION
========================================================= */

const CLEANING_OPTIONS = [
  {
    id: "invisible",
    label: "Remove hidden characters",
    hint: "Zero-width spaces, BOM and invisible Unicode",
    group: "recommended",
    defaultOn: true,
    fn: removeInvisible,
  },
  {
    id: "spacing",
    label: "Tidy spacing & line breaks",
    hint: "Extra spaces, trailing gaps and blank lines",
    group: "recommended",
    defaultOn: true,
    fn: tidySpacing,
  },
  {
    id: "punctuation",
    label: "Straighten smart punctuation",
    hint: "Curly quotes and special ellipses",
    group: "recommended",
    defaultOn: true,
    fn: smartPunctuation,
  },
  {
    id: "dashes",
    label: "Replace em & en dashes",
    hint: "Convert special dashes to plain hyphens",
    group: "recommended",
    defaultOn: true,
    fn: fixDashes,
  },
  {
    id: "punctspace",
    label: "Tidy punctuation spacing",
    hint: "Remove unwanted gaps around punctuation",
    group: "recommended",
    defaultOn: true,
    fn: punctuationSpacing,
  },
  {
    id: "markdown",
    label: "Remove Markdown formatting",
    hint: "Headings, bold markers, links and code marks",
    group: "recommended",
    defaultOn: true,
    fn: removeMarkdown,
  },
  {
    id: "html",
    label: "Strip HTML tags",
    hint: "Remove HTML markup while retaining text",
    group: "recommended",
    defaultOn: true,
    fn: stripHtmlTags,
  },
  {
    id: "entities",
    label: "Decode HTML entities",
    hint: "Convert &amp; and &lt; to readable characters",
    group: "recommended",
    defaultOn: true,
    fn: decodeEntities,
  },
  {
    id: "blanklines",
    label: "Remove all blank lines",
    hint: "Collapse empty lines between paragraphs",
    group: "advanced",
    defaultOn: false,
    fn: removeBlankLines,
  },
  {
    id: "bullets",
    label: "Remove bullets & numbering",
    hint: "Remove list markers at the beginning of lines",
    group: "advanced",
    defaultOn: false,
    fn: removeBullets,
  },
  {
    id: "emoji",
    label: "Remove emojis",
    hint: "Remove pictographic emoji symbols",
    group: "advanced",
    defaultOn: false,
    fn: removeEmoji,
  },
  {
    id: "diacritics",
    label: "Strip diacritics",
    hint: "Convert café to cafe",
    group: "advanced",
    defaultOn: false,
    fn: stripDiacritics,
  },
  {
    id: "advanced",
    label: "Advanced Unicode cleanup",
    hint: "Normalize fullwidth and lookalike characters",
    group: "advanced",
    defaultOn: false,
    fn: advancedUnicodeCleanup,
  },
  {
    id: "duplicates",
    label: "Remove duplicate lines",
    hint: "Keep the first occurrence of repeated lines",
    group: "advanced",
    defaultOn: false,
    fn: removeDuplicateLines,
  },
];

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
];

const OPTIONS_MAP = Object.fromEntries(
  CLEANING_OPTIONS.map((option) => [
    option.id,
    option,
  ])
);

const DEFAULT_OPTIONS = Object.fromEntries(
  CLEANING_OPTIONS.map((option) => [
    option.id,
    option.defaultOn,
  ])
);

const RECOMMENDED_OPTIONS =
  CLEANING_OPTIONS.filter(
    (option) => option.group === "recommended"
  );

const ADVANCED_OPTIONS =
  CLEANING_OPTIONS.filter(
    (option) => option.group === "advanced"
  );

const SAMPLE_TEXT = [
  "## Project Update",
  "",
  "**Status:** Complete",
  "",
  "The task is finished — ready for review.",
  "",
  "### Next Steps",
  "",
  "- Review the final draft",
  "- Share it with the team",
  "",
  "“Everything looks good…”",
].join("\n");

/* =========================================================
   CLEANING ENGINE & REPORT
========================================================= */

export function cleanText(
  input,
  enabledOptions = DEFAULT_OPTIONS
) {
  return PIPELINE_ORDER.reduce(
    (currentText, optionId) => {
      if (!enabledOptions[optionId]) {
        return currentText;
      }

      return OPTIONS_MAP[optionId].fn(currentText);
    },
    input
  );
}

function cleanTextWithReport(
  input,
  enabledOptions
) {
  let currentText = input;

  const changed = [];

  for (const optionId of PIPELINE_ORDER) {
    if (!enabledOptions[optionId]) {
      continue;
    }

    const option = OPTIONS_MAP[optionId];

    const nextText = option.fn(currentText);

    if (nextText !== currentText) {
      changed.push({
        id: option.id,
        label: option.label,
      });
    }

    currentText = nextText;
  }

  return {
    text: currentText,
    changed,
    beforeChars: input.length,
    afterChars: currentText.length,
    hasChanges: currentText !== input,
  };
}

function getTextStats(text) {
  const words =
    text.trim().match(/\S+/g)?.length || 0;

  const lines = text
    ? text.split(/\r?\n/).filter(
        (line) => line.trim()
      ).length
    : 0;

  return {
    characters: text.length,
    words,
    lines,
  };
}

/* =========================================================
   CHANGE HIGHLIGHTING

   This highlights the changed span using common
   prefix/suffix matching. It is a visual comparison,
   not a character-by-character edit history.
========================================================= */

function getChangeSegments(before, after) {
  if (before === after) {
    return [
      { text: before, changed: false },
    ];
  }

  let prefix = 0;

  while (
    prefix < before.length &&
    prefix < after.length &&
    before[prefix] === after[prefix]
  ) {
    prefix++;
  }

  let suffix = 0;

  while (
    suffix < before.length - prefix &&
    suffix < after.length - prefix &&
    before[before.length - 1 - suffix] ===
      after[after.length - 1 - suffix]
  ) {
    suffix++;
  }

  return [
    {
      text: before.slice(0, prefix),
      changed: false,
    },
    {
      text: before.slice(
        prefix,
        before.length - suffix
      ),
      changed: true,
    },
    {
      text: suffix
        ? before.slice(before.length - suffix)
        : "",
      changed: false,
    },
  ].filter((segment) => segment.text);
}

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function Stat({ label, value }) {
  return (
    <div
      className="
        flex items-center gap-1.5
        text-xs text-slate-500
        dark:text-slate-400
      "
    >
      <span>{label}:</span>

      <strong
        className="
          font-semibold text-slate-700
          dark:text-slate-200
        "
      >
        {value.toLocaleString()}
      </strong>
    </div>
  );
}

function OptionToggle({
  option,
  enabled,
  onToggle,
  advanced = false,
}) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => onToggle(option.id)}
      className={`
        flex min-h-[76px]
        w-full items-start gap-3
        rounded-xl border p-3
        text-left transition-all
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-cyan-600
        ${
          enabled
            ? advanced
              ? "border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-950/30"
              : "border-cyan-300 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-950/30"
            : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900"
        }
      `}
    >
      <span
        aria-hidden="true"
        className={`
          mt-0.5 flex h-5 w-5
          shrink-0 items-center
          justify-center rounded-md border
          ${
            enabled
              ? advanced
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-cyan-600 bg-cyan-600 text-white"
              : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
          }
        `}
      >
        {enabled && (
          <Check className="h-3.5 w-3.5" />
        )}
      </span>

      <span className="min-w-0">
        <span
          className="
            block text-sm font-bold
            leading-5 text-slate-900
            dark:text-white
          "
        >
          {option.label}
        </span>

        <span
          className="
            mt-1 block text-xs
            leading-5 text-slate-500
            dark:text-slate-400
          "
        >
          {option.hint}
        </span>
      </span>
    </button>
  );
}

function ActionButton({
  onClick,
  disabled,
  children,
  icon: Icon,
  title,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="
        inline-flex min-h-10
        items-center justify-center
        gap-1.5 rounded-lg
        border border-slate-200
        bg-white px-3 py-2
        text-xs font-semibold
        text-slate-700
        transition-colors
        hover:border-cyan-300
        hover:bg-cyan-50
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-cyan-600
        disabled:cursor-not-allowed
        disabled:opacity-40
        dark:border-slate-700
        dark:bg-slate-900
        dark:text-slate-200
        dark:hover:bg-slate-800
      "
    >
      <Icon
        className="h-3.5 w-3.5"
        aria-hidden="true"
      />

      {children}
    </button>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CleanerTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [options, setOptions] =
    useState(DEFAULT_OPTIONS);

  const [report, setReport] = useState(null);

  const [showChanges, setShowChanges] =
    useState(false);

  const [showAdvanced, setShowAdvanced] =
    useState(false);

  const [toast, setToast] = useState("");

  const [copied, setCopied] = useState(false);

  const toastTimer = useRef(null);

  const outputRef = useRef(null);

  const inputStats = useMemo(
    () => getTextStats(input),
    [input]
  );

  const outputStats = useMemo(
    () => getTextStats(output),
    [output]
  );

  const activeRecommended =
    RECOMMENDED_OPTIONS.filter(
      (option) => options[option.id]
    ).length;

  const activeAdvanced =
    ADVANCED_OPTIONS.filter(
      (option) => options[option.id]
    ).length;

  function notify(message) {
    setToast(message);

    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }

    toastTimer.current = window.setTimeout(
      () => setToast(""),
      2600
    );
  }

  function invalidateResult() {
    setOutput("");
    setReport(null);
    setShowChanges(false);
    setCopied(false);
  }

  function updateInput(value) {
    setInput(value);
    invalidateResult();
  }

  function toggleOption(id) {
    setOptions((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));

    invalidateResult();
  }

  function resetOptions() {
    setOptions({ ...DEFAULT_OPTIONS });
    invalidateResult();
    notify("Default cleaning options restored");
  }

  function loadSample() {
    setInput(SAMPLE_TEXT);
    invalidateResult();
    notify("Sample text loaded");
  }

  function clearAll() {
    setInput("");
    invalidateResult();
    notify("Text cleared");
  }

  function handleClean() {
    if (!input.trim()) {
      notify("Paste or type text first");
      return;
    }

    const result = cleanTextWithReport(
      input,
      options
    );

    setOutput(result.text);
    setReport(result);
    setShowChanges(false);
    setCopied(false);

    if (result.changed.length === 0) {
      notify("No changes were needed");
    } else {
      notify(
        `${result.changed.length} cleaning ${
          result.changed.length === 1
            ? "rule applied"
            : "rules applied"
        }`
      );
    }

    // On small screens, bring the result into view.
    if (window.innerWidth < 768) {
      window.setTimeout(() => {
        outputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  }

  async function handleCopy() {
    if (!report) {
      notify("Clean your text first");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      notify("Cleaned text copied");

      window.setTimeout(
        () => setCopied(false),
        1800
      );
    } catch {
      notify("Copy failed. Select the text manually.");
    }
  }

  function handleDownload() {
    if (!report) {
      notify("Clean your text first");
      return;
    }

    const blob = new Blob([output], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "countflows-cleaned-text.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(
      () => URL.revokeObjectURL(url),
      1000
    );

    notify("Text file downloaded");
  }

  const highlightSegments = useMemo(
    () =>
      report
        ? getChangeSegments(input, output)
        : [],
    [input, output, report]
  );

  return (
    <div className="relative w-full">
      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="
            pointer-events-none fixed
            bottom-20 left-1/2 z-50
            w-max max-w-[90vw]
            -translate-x-1/2
            rounded-full
            bg-slate-950 px-5 py-3
            text-center text-sm
            font-semibold text-white
            shadow-xl
            dark:bg-white
            dark:text-slate-950
          "
        >
          {toast}
        </div>
      )}

      {/* Main tool shell */}
      <div
        className="
          relative mx-auto w-full
          max-w-6xl overflow-hidden
          rounded-2xl border
          border-cyan-100
          bg-white shadow-xl
          shadow-cyan-950/5
          dark:border-cyan-900/50
          dark:bg-slate-950
          dark:shadow-black/30
          sm:rounded-3xl
        "
      >
        {/* Tool header */}
        <div
          className="
            flex flex-col gap-3
            border-b border-slate-100
            px-4 py-4
            dark:border-slate-800
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-gradient-to-br
                from-cyan-600 to-blue-700
                text-white
              "
            >
              <Eraser
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <h2
                className="
                  text-base font-extrabold
                  text-slate-900
                  dark:text-white
                  sm:text-lg
                "
              >
                Smart AI Text Cleaner
              </h2>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Clean formatting without
                rewriting your sentences.
              </p>
            </div>
          </div>

          <div
            className="
              inline-flex w-fit
              items-center gap-1.5
              rounded-full
              border border-emerald-200
              bg-emerald-50
              px-3 py-1.5
              text-xs font-semibold
              text-emerald-700
              dark:border-emerald-900
              dark:bg-emerald-950/30
              dark:text-emerald-300
            "
          >
            <ShieldCheck
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            Browser-Based Cleaning
          </div>
        </div>

        {/* Input and output workspace */}
        <div
          className="
            grid min-w-0
            grid-cols-1
            md:grid-cols-2
          "
        >
          {/* Original input */}
          <section
            aria-label="Original text"
            className="
              min-w-0 border-b
              border-slate-100
              dark:border-slate-800
              md:border-b-0 md:border-r
            "
          >
            <div
              className="
                flex flex-wrap
                items-center justify-between
                gap-2 border-b
                border-slate-100
                px-4 py-3
                dark:border-slate-800
                sm:px-5
              "
            >
              <div
                className="
                  flex items-center gap-2
                  text-sm font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                <ClipboardPaste
                  className="h-4 w-4 text-cyan-600"
                  aria-hidden="true"
                />
                Original Text
              </div>

              <div className="flex flex-wrap gap-2">
                <ActionButton
                  onClick={loadSample}
                  icon={FileText}
                  title="Load sample text"
                >
                  Sample
                </ActionButton>

                <ActionButton
                  onClick={clearAll}
                  icon={X}
                  disabled={!input}
                  title="Clear input and output"
                >
                  Clear
                </ActionButton>
              </div>
            </div>

            <label
              htmlFor="ai-cleaner-input"
              className="sr-only"
            >
              Paste or type text to clean
            </label>

            {showChanges && report ? (
              <div
                className="
                  min-h-[180px]
                  whitespace-pre-wrap
                  break-words
                  px-4 py-4
                  font-mono text-sm
                  leading-7
                  text-slate-800
                  dark:text-slate-200
                  sm:min-h-[240px]
                  sm:px-5
                  lg:min-h-[280px]
                "
              >
                {highlightSegments.map(
                  (segment, index) => (
                    <span
                      key={index}
                      className={
                        segment.changed
                          ? "rounded-sm bg-rose-200 text-rose-950 dark:bg-rose-900/60 dark:text-rose-100"
                          : ""
                      }
                    >
                      {segment.text}
                    </span>
                  )
                )}
              </div>
            ) : (
              <textarea
                id="ai-cleaner-input"
                value={input}
                onChange={(event) =>
                  updateInput(event.target.value)
                }
                placeholder={
                  "Paste your ChatGPT, Claude, Gemini or copied text here...\n\nExample:\n## Project Update\n**Status:** Complete"
                }
                spellCheck={false}
                className="
                  block min-h-[180px]
                  w-full resize-y
                  bg-transparent
                  px-4 py-4
                  font-mono text-sm
                  leading-7
                  text-slate-800
                  outline-none
                  placeholder:text-slate-400
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-cyan-500
                  dark:text-slate-200
                  dark:placeholder:text-slate-600
                  sm:min-h-[240px]
                  sm:px-5
                  lg:min-h-[280px]
                "
              />
            )}

            <div
              className="
                flex flex-wrap
                items-center justify-between
                gap-2 border-t
                border-slate-100
                px-4 py-2.5
                dark:border-slate-800
                sm:px-5
              "
            >
              <div className="flex flex-wrap gap-3">
                <Stat
                  label="Words"
                  value={inputStats.words}
                />

                <Stat
                  label="Characters"
                  value={inputStats.characters}
                />
              </div>

              {report && (
                <button
                  type="button"
                  onClick={() =>
                    setShowChanges(
                      (previous) => !previous
                    )
                  }
                  className="
                    text-xs font-bold
                    text-cyan-700
                    hover:underline
                    dark:text-cyan-400
                  "
                >
                  {showChanges
                    ? "Edit original"
                    : "Highlight changes"}
                </button>
              )}
            </div>
          </section>

          {/* Cleaned output */}
          <section
            ref={outputRef}
            aria-label="Cleaned text"
            className={`
              min-w-0 scroll-mt-20
              flex-col
              ${
                report
                  ? "flex"
                  : "hidden md:flex"
              }
            `}
          >
            <div
              className="
                flex flex-wrap
                items-center justify-between
                gap-2 border-b
                border-slate-100
                px-4 py-3
                dark:border-slate-800
                sm:px-5
              "
            >
              <div
                className="
                  flex items-center gap-2
                  text-sm font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                <Sparkles
                  className="h-4 w-4 text-emerald-600"
                  aria-hidden="true"
                />
                Cleaned Text
              </div>

              <div className="flex flex-wrap gap-2">
                <ActionButton
                  onClick={handleCopy}
                  disabled={!report}
                  icon={copied ? Check : Copy}
                  title="Copy cleaned text"
                >
                  {copied ? "Copied" : "Copy"}
                </ActionButton>

                <ActionButton
                  onClick={handleDownload}
                  disabled={!report}
                  icon={Download}
                  title="Download cleaned text"
                >
                  Download
                </ActionButton>
              </div>
            </div>

            <div
              aria-live="polite"
              className="
                min-h-[180px]
                flex-1 overflow-auto
                px-4 py-4
                sm:min-h-[240px]
                sm:px-5
                lg:min-h-[280px]
              "
            >
              {report ? (
                <pre
                  className="
                    whitespace-pre-wrap
                    break-words
                    font-mono text-sm
                    leading-7
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {output}
                </pre>
              ) : (
                <div
                  className="
                    flex min-h-[150px]
                    flex-col items-center
                    justify-center gap-3
                    text-center
                    sm:min-h-[200px]
                  "
                >
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-2xl
                      bg-emerald-50
                      text-emerald-600
                      dark:bg-emerald-950/30
                      dark:text-emerald-400
                    "
                  >
                    <WandSparkles
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <p
                    className="
                      text-sm font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    Your cleaned text will appear here.
                  </p>

                  <p
                    className="
                      text-xs text-slate-400
                    "
                  >
                    Paste text and select Clean My Text.
                  </p>
                </div>
              )}
            </div>

            <div
              className="
                flex flex-wrap gap-3
                border-t border-slate-100
                px-4 py-2.5
                dark:border-slate-800
                sm:px-5
              "
            >
              <Stat
                label="Words"
                value={outputStats.words}
              />

              <Stat
                label="Characters"
                value={outputStats.characters}
              />
            </div>
          </section>
        </div>

        {/* Main action */}
        <div
          className="
            border-t border-slate-100
            bg-white px-4 py-4
            dark:border-slate-800
            dark:bg-slate-950
            sm:px-6 sm:py-5
          "
        >
          <button
            type="button"
            onClick={handleClean}
            disabled={!input.trim()}
            className="
              group flex min-h-12
              w-full items-center
              justify-center gap-2.5
              rounded-xl
              bg-gradient-to-r
              from-cyan-600 to-blue-700
              px-5 py-3.5
              text-base font-extrabold
              text-white shadow-md
              shadow-cyan-600/15
              transition-all
              hover:from-cyan-700
              hover:to-blue-800
              hover:shadow-lg
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-cyan-600
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:shadow-none
              sm:text-lg
            "
          >
            <Sparkles
              className="h-5 w-5"
              aria-hidden="true"
            />

            Clean My Text

            <ArrowRight
              className="
                h-5 w-5
                transition-transform
                group-hover:translate-x-1
              "
              aria-hidden="true"
            />
          </button>

          <p
            className="
              mt-2 text-center
              text-xs leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            Uses your selected options.
            Text cleaning runs directly in your browser.
          </p>
        </div>

        {/* Cleanup report */}
        {report && (
          <section
            aria-label="Cleanup report"
            className="
              border-t border-emerald-100
              bg-emerald-50/60
              px-4 py-5
              dark:border-emerald-900/40
              dark:bg-emerald-950/10
              sm:px-6
            "
          >
            <div
              className="
                flex flex-col gap-4
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div>
                <div
                  className="
                    flex items-center gap-2
                  "
                >
                  <div
                    className="
                      flex h-8 w-8
                      items-center justify-center
                      rounded-full
                      bg-emerald-600 text-white
                    "
                  >
                    <Check
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className="
                      text-base font-extrabold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Cleanup Report
                  </h3>
                </div>

                <p
                  className="
                    mt-2 text-sm
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  {report.hasChanges
                    ? `${report.changed.length} cleaning rules changed your text.`
                    : "Your text did not need changes with the selected options."}
                </p>

                {report.changed.length > 0 && (
                  <div
                    className="
                      mt-3 flex flex-wrap gap-2
                    "
                  >
                    {report.changed.map(
                      (item) => (
                        <span
                          key={item.id}
                          className="
                            rounded-full
                            border border-emerald-200
                            bg-white px-3 py-1
                            text-xs font-semibold
                            text-emerald-700
                            dark:border-emerald-900
                            dark:bg-slate-900
                            dark:text-emerald-300
                          "
                        >
                          ✓ {item.label}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>

              <div
                className="
                  grid grid-cols-2 gap-2
                  sm:min-w-[210px]
                "
              >
                <div
                  className="
                    rounded-xl border
                    border-emerald-200
                    bg-white p-3
                    dark:border-emerald-900
                    dark:bg-slate-900
                  "
                >
                  <p
                    className="
                      text-xs text-slate-500
                    "
                  >
                    Before
                  </p>

                  <p
                    className="
                      mt-1 text-lg font-extrabold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {report.beforeChars.toLocaleString()}
                  </p>
                </div>

                <div
                  className="
                    rounded-xl border
                    border-emerald-200
                    bg-white p-3
                    dark:border-emerald-900
                    dark:bg-slate-900
                  "
                >
                  <p
                    className="
                      text-xs text-slate-500
                    "
                  >
                    After
                  </p>

                  <p
                    className="
                      mt-1 text-lg font-extrabold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {report.afterChars.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recommended options */}
        <section
          aria-labelledby="recommended-cleaning-heading"
          className="
            border-t border-slate-100
            bg-slate-50/60
            px-4 py-5
            dark:border-slate-800
            dark:bg-slate-900/40
            sm:px-6 sm:py-6
          "
        >
          <div
            className="
              flex flex-col gap-3
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div>
              <div
                className="
                  flex flex-wrap
                  items-center gap-2
                "
              >
                <Settings2
                  className="
                    h-4 w-4 text-cyan-600
                  "
                  aria-hidden="true"
                />

                <h3
                  id="recommended-cleaning-heading"
                  className="
                    text-base font-extrabold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Recommended Cleaning
                </h3>

                <span
                  className="
                    rounded-full bg-cyan-100
                    px-2.5 py-1
                    text-xs font-bold
                    text-cyan-800
                    dark:bg-cyan-950/50
                    dark:text-cyan-300
                  "
                >
                  {activeRecommended}/
                  {RECOMMENDED_OPTIONS.length}
                </span>
              </div>

              <p
                className="
                  mt-2 max-w-2xl
                  text-sm leading-6
                  text-slate-600
                  dark:text-slate-400
                "
              >
                These options handle common formatting
                issues in ChatGPT, Claude, Gemini
                and copied online text.
              </p>
            </div>

            <button
              type="button"
              onClick={resetOptions}
              className="
                inline-flex min-h-10
                w-fit items-center gap-1.5
                text-xs font-semibold
                text-slate-600
                hover:text-cyan-700
                dark:text-slate-300
                dark:hover:text-cyan-400
              "
            >
              <RotateCcw
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />

              Reset Defaults
            </button>
          </div>

          <div
            className="
              mt-4 grid grid-cols-1
              gap-2.5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {RECOMMENDED_OPTIONS.map(
              (option) => (
                <OptionToggle
                  key={option.id}
                  option={option}
                  enabled={options[option.id]}
                  onToggle={toggleOption}
                />
              )
            )}
          </div>

          {/* Advanced options */}
          <div
            className="
              mt-5 overflow-hidden
              rounded-2xl
              border border-violet-200
              bg-violet-50/40
              dark:border-violet-900/50
              dark:bg-violet-950/10
            "
          >
            <button
              type="button"
              aria-expanded={showAdvanced}
              aria-controls="advanced-cleaning-options"
              onClick={() =>
                setShowAdvanced(
                  (previous) => !previous
                )
              }
              className="
                flex min-h-14
                w-full items-center
                justify-between gap-3
                px-4 py-3
                text-left
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-violet-600
              "
            >
              <div>
                <div
                  className="
                    flex flex-wrap
                    items-center gap-2
                  "
                >
                  <span
                    className="
                      text-sm font-extrabold
                      text-violet-800
                      dark:text-violet-300
                    "
                  >
                    Advanced Cleaning
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-violet-100
                      px-2.5 py-0.5
                      text-xs font-bold
                      text-violet-700
                      dark:bg-violet-950
                      dark:text-violet-300
                    "
                  >
                    {activeAdvanced} active
                  </span>
                </div>

                <p
                  className="
                    mt-1 text-xs leading-5
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Optional changes that may remove
                  visible characters or formatting.
                </p>
              </div>

              <ChevronDown
                className={`
                  h-5 w-5 shrink-0
                  text-violet-600
                  transition-transform
                  ${
                    showAdvanced
                      ? "rotate-180"
                      : ""
                  }
                `}
                aria-hidden="true"
              />
            </button>

            {showAdvanced && (
              <div
                id="advanced-cleaning-options"
                className="
                  grid grid-cols-1
                  gap-2.5 border-t
                  border-violet-200
                  p-3
                  dark:border-violet-900/50
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {ADVANCED_OPTIONS.map(
                  (option) => (
                    <OptionToggle
                      key={option.id}
                      option={option}
                      enabled={options[option.id]}
                      onToggle={toggleOption}
                      advanced
                    />
                  )
                )}
              </div>
            )}
          </div>

          <div
            className="
              mt-4 flex items-start
              gap-2 rounded-xl
              border border-amber-200
              bg-amber-50 px-3 py-3
              text-xs leading-5
              text-amber-900
              dark:border-amber-900/40
              dark:bg-amber-950/10
              dark:text-amber-300
            "
          >
            <ShieldCheck
              className="
                mt-0.5 h-4 w-4 shrink-0
              "
              aria-hidden="true"
            />

            This tool removes formatting artifacts.
            It does not automatically rewrite text,
            humanize AI content or determine
            whether writing was AI-generated.
          </div>
        </section>
      </div>
    </div>
  );
}