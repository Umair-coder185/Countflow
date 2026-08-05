"use client";

import {
  useState,
  useMemo,
  useCallback,
  useDeferredValue,
  useRef,
  useEffect,
} from "react";
import {
  Copy,
  Check,
  Download,
  RotateCcw,
  Type,
  Hash,
  AlignLeft,
  X,
  Smile,
} from "lucide-react";

const SEPARATORS = [
  { id: "newline", label: "New line", value: "\n" },
  { id: "space", label: "Space", value: " " },
  { id: "comma", label: "Comma", value: "," },
  { id: "dash", label: "Dash", value: "-" },
  { id: "custom", label: "Custom", value: "" },
];

const MAX_REPEATS = 10000;

const QUICK_COUNTS = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];

const EMOJI_GRID = [
  "😀", "😂", "🥰", "😎", "🤔", "😢", "😡", "🥳", "😴", "🤯",
  "👍", "👎", "👋", "🤝", "✌️", "🤞", "👏", "🙏", "💪", "✊",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💔", "💯",
  "⭐", "🔥", "💡", "🎉", "🎊", "🏆", "💎", "🚀", "⚡", "🎯",
  "✅", "❌", "⚠️", "❓", "🔗", "📌", "📎", "🔒", "💬", "🌈",
];

function StatPill({ icon: Icon, value, label }) {
  return (
    <span
      className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"
      title={label}
    >
      <Icon className="h-3 w-3" />
      {typeof value === "number" ? value.toLocaleString() : value}
    </span>
  );
}

export default function TextRepeaterTool() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(3);
  const [separatorId, setSeparatorId] = useState("newline");
  const [customSeparator, setCustomSeparator] = useState("");
  const [copied, setCopied] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const textareaRef = useRef(null);
  const pickerRef = useRef(null);

  // Deferred values keep input responsive at high repeat counts
  const deferredText = useDeferredValue(text);
  const deferredCount = useDeferredValue(count);

  // Close emoji picker on outside click
  useEffect(() => {
    if (!showEmoji) return;
    function handleClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showEmoji]);

  const separator =
    separatorId === "custom"
      ? customSeparator
      : SEPARATORS.find((s) => s.id === separatorId)?.value ?? "\n";

  const clampedCount = Math.min(
    Math.max(Math.round(deferredCount), 1),
    MAX_REPEATS
  );

  const output = useMemo(() => {
    if (!deferredText || deferredCount < 1 || deferredCount > MAX_REPEATS)
      return "";
    return Array(clampedCount).fill(deferredText).join(separator);
  }, [deferredText, clampedCount, separator, deferredCount]);

  const inputStats = useMemo(
    () => ({
      chars: text.length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text ? text.split("\n").length : 0,
    }),
    [text]
  );

  const outputStats = useMemo(
    () => ({
      chars: output.length,
      words: output.trim() ? output.trim().split(/\s+/).length : 0,
      lines: output ? output.split("\n").length : 0,
    }),
    [output]
  );

  const insertEmoji = useCallback(
    (emoji) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = text.slice(0, start) + emoji + text.slice(end);
      setText(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + emoji.length;
        ta.focus();
      });
      setShowEmoji(false);
    },
    [text]
  );

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = output;
      ta.setAttribute("aria-hidden", "true");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "repeated-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  const handleClear = useCallback(() => {
    setText("");
    setCount(3);
    setSeparatorId("newline");
    setCustomSeparator("");
  }, []);

  const isOverMax = count > MAX_REPEATS;
  const hasOutput = output.length > 0;

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/90 p-4 md:p-8 shadow-xl shadow-cyan-200/20 dark:shadow-black/30 space-y-6">

        {/* ──────── INPUT ──────── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="tr-input"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Type className="h-4 w-4 text-cyan-500" />
              Input Text
            </label>
            <div className="flex items-center gap-3">
              <StatPill icon={Hash} value={inputStats.chars} label="Characters" />
              <StatPill icon={Type} value={inputStats.words} label="Words" />
              <StatPill icon={AlignLeft} value={inputStats.lines} label="Lines" />
            </div>
          </div>

          <div className="relative">
            <textarea
              ref={textareaRef}
              id="tr-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text, word, or emoji here…"
              rows={4}
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition resize-y text-sm md:text-base"
            />

            {/* Emoji picker toggle — inside textarea corner */}
            <button
              type="button"
              onClick={() => setShowEmoji((v) => !v)}
              aria-label="Emoji picker"
              aria-expanded={showEmoji}
              className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-cyan-100 dark:hover:bg-gray-600 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Smile className="h-4 w-4" />
            </button>
          </div>

          {/* Emoji picker grid */}
          {showEmoji && (
            <div
              ref={pickerRef}
              role="dialog"
              aria-label="Select an emoji"
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-lg"
            >
              <div className="grid grid-cols-10 gap-1">
                {EMOJI_GRID.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => insertEmoji(emoji)}
                    className="flex h-4 w-full  justify-center rounded-lg text-lg hover:bg-cyan-100 dark:hover:bg-gray-700 active:scale-90 transition-all duration-100"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ──────── CONTROLS ──────── */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-end">
          {/* Repeat count */}
          <div className="space-y-1.5 w-full sm:w-auto">
            <label
              htmlFor="tr-count"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4 text-cyan-500" />
              Repeats
            </label>
            <input
              id="tr-count"
              type="number"
              min={1}
              max={MAX_REPEATS}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              aria-describedby={isOverMax ? "tr-count-error" : undefined}
              className={`w-full sm:w-36 rounded-xl border ${
                isOverMax
                  ? "border-red-400 dark:border-red-500 focus:ring-red-400/50"
                  : "border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition text-sm font-mono`}
            />
            {isOverMax && (
              <p
                id="tr-count-error"
                className="text-xs text-red-500 dark:text-red-400"
                role="alert"
              >
                Max {MAX_REPEATS.toLocaleString()} repeats
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {QUICK_COUNTS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    count === n
                      ? "bg-cyan-500 text-white shadow-sm shadow-cyan-500/30"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-cyan-50 dark:hover:bg-gray-700 hover:text-cyan-600 dark:hover:text-cyan-400"
                  }`}
                >
                  {n >= 1000 ? `${n / 1000}K` : n}
                </button>
              ))}
            </div>
          </div>

          {/* Separator pills */}
          <div className="space-y-1.5 flex-1 w-full">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <AlignLeft className="h-4 w-4 text-cyan-500" />
              Separator
            </span>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Separator style"
            >
              {SEPARATORS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={separatorId === s.id}
                  onClick={() => setSeparatorId(s.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border ${
                    separatorId === s.id
                      ? "bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/25"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600 hover:text-cyan-600 dark:hover:text-cyan-400"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                separatorId === "custom"
                  ? "max-h-16 mt-2 opacity-100"
                  : "max-h-0 mt-0 opacity-0"
              }`}
            >
              <input
                type="text"
                value={customSeparator}
                onChange={(e) => setCustomSeparator(e.target.value)}
                placeholder='e.g. | or ~ or ;;'
                className="w-full max-w-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* ──────── OUTPUT ──────── */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Copy className="h-4 w-4 text-cyan-500" />
              Output
            </span>

            <div className="flex items-center gap-3 flex-wrap">
              <StatPill icon={Hash} value={outputStats.chars} label="Characters" />
              <StatPill icon={Type} value={outputStats.words} label="Words" />
              <StatPill icon={AlignLeft} value={outputStats.lines} label="Lines" />

              {hasOutput && (
                <>
                  <span className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white px-4 py-1.5 text-xs font-semibold shadow-sm shadow-cyan-500/25 transition-all duration-150"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-1.5 text-xs font-semibold transition-colors duration-150"
                  >
                    <Download className="h-3.5 w-3.5" />
                    .txt
                  </button>
                </>
              )}
            </div>
          </div>

          <textarea
            id="tr-output"
            aria-label="Repeated text output"
            readOnly
            value={output}
            placeholder="Repeated text will appear here instantly as you type…"
            rows={6}
            className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-y text-sm md:text-base font-mono"
          />
        </div>

        {/* ──────── CLEAR ──────── */}
        {(text || customSeparator || count !== 3) && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 px-4 py-2 text-xs font-semibold transition-colors duration-150"
            >
              <X className="h-3.5 w-3.5" />
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}