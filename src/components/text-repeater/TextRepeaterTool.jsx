"use client";

import { useState, useMemo, useCallback, useDeferredValue, useRef, useEffect } from "react";
import { Copy, Check, Download, RotateCcw, Type, Hash, AlignLeft, X, Smile, ShieldCheck } from "lucide-react";

/* ==================== CONFIGURATION ==================== */

const MAX_REPEATS = 10000;
const QUICK_COUNTS = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];

const SEPARATORS = [
  { id: "newline", label: "New line", value: "\n" },
  { id: "space", label: "Space", value: " " },
  { id: "comma", label: "Comma", value: "," },
  { id: "dash", label: "Dash", value: "-" },
  { id: "custom", label: "Custom", value: "" },
];

const EMOJI_GRID = [
  "😀", "😂", "🥰", "😎", "🤔", "😢", "😡", "🥳", "😴", "🤯",
  "👍", "👎", "👋", "🤝", "✌️", "🤞", "👏", "🙏", "💪", "✊",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💔", "💯",
  "⭐", "🔥", "💡", "🎉", "🎊", "🏆", "💎", "🚀", "⚡", "🎯",
  "✅", "❌", "⚠️", "❓", "🔗", "📌", "📎", "🔒", "💬", "🌈",
];

/* ==================== HELPERS ==================== */

function getTextStats(value) {
  if (!value) return { chars: 0, words: 0, lines: 0 };
  return {
    chars: value.length,
    words: value.trim() ? value.trim().split(/\s+/).length : 0,
    lines: value.split("\n").length,
  };
}

function StatPill({ icon: Icon, value, label }) {
  return (
    <span title={label} className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">{label}: </span>
      <span className="font-medium tabular-nums">{typeof value === "number" ? value.toLocaleString() : value}</span>
    </span>
  );
}

function ActionButton({ onClick, disabled, icon: Icon, children, primary = false, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:cursor-not-allowed disabled:opacity-40 ${
        primary
          ? "bg-cyan-700 text-white hover:bg-cyan-800"
          : "border border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </button>
  );
}

/* ==================== MAIN COMPONENT ==================== */

export default function TextRepeaterTool() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(3);
  const [separatorId, setSeparatorId] = useState("newline");
  const [customSeparator, setCustomSeparator] = useState("");
  const [copied, setCopied] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const copyTimerRef = useRef(null);

  const deferredText = useDeferredValue(text);
  const deferredCount = useDeferredValue(count);

  const validCount = Number.isInteger(count) && count >= 1 && count <= MAX_REPEATS;
  const isOverMax = count > MAX_REPEATS;
  const isPending = deferredText !== text || deferredCount !== count;

  const separator = separatorId === "custom"
    ? customSeparator
    : SEPARATORS.find((item) => item.id === separatorId)?.value ?? "\n";

  /* The repetition algorithm remains unchanged in principle. */
  const output = useMemo(() => {
    if (!deferredText || !Number.isInteger(deferredCount) || deferredCount < 1 || deferredCount > MAX_REPEATS) return "";
    return Array(deferredCount).fill(deferredText).join(separator);
  }, [deferredText, deferredCount, separator]);

  const displayedOutput = isPending ? "" : output;
  const hasOutput = displayedOutput.length > 0;

  const inputStats = useMemo(() => getTextStats(text), [text]);
  const outputStats = useMemo(() => getTextStats(displayedOutput), [displayedOutput]);

  /* Close emoji picker on outside click or Escape. */
  useEffect(() => {
    if (!showEmoji) return;

    function handleClick(event) {
      if (event.target.closest?.("[data-emoji-toggle]")) return;
      if (pickerRef.current && !pickerRef.current.contains(event.target)) setShowEmoji(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setShowEmoji(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showEmoji]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const insertEmoji = useCallback((emoji) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const updated = text.slice(0, start) + emoji + text.slice(end);

    setText(updated);
    setCopied(false);
    setShowEmoji(false);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  }, [text]);

  const handleCopy = useCallback(async () => {
    if (!hasOutput) return;

    try {
      await navigator.clipboard.writeText(displayedOutput);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = displayedOutput;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();

        const successful = document.execCommand("copy");
        textarea.remove();

        if (!successful) return;
      } catch {
        return;
      }
    }

    setCopied(true);

    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
  }, [displayedOutput, hasOutput]);

  const handleDownload = useCallback(() => {
    if (!hasOutput) return;

    const blob = new Blob([displayedOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "countflows-repeated-text.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [displayedOutput, hasOutput]);

  const handleClear = useCallback(() => {
    setText("");
    setCount(3);
    setSeparatorId("newline");
    setCustomSeparator("");
    setCopied(false);
    setShowEmoji(false);
    textareaRef.current?.focus();
  }, []);

  const handleCountChange = useCallback((event) => {
    const value = event.target.value;
    setCount(value === "" ? 0 : Number(value));
    setCopied(false);
  }, []);

  return (
    <section id="text-repeater-tool" aria-label="Interactive text repeater" className="relative mx-auto max-w-5xl px-3 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8">

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-cyan-950/5 dark:border-slate-700 dark:bg-slate-900 sm:space-y-6 sm:p-6 md:rounded-3xl md:p-8">

        {/* ==================== INPUT ==================== */}

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="tr-input" className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
              <Type className="h-4 w-4 text-cyan-600" aria-hidden="true" />
              Enter Text to Repeat
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <StatPill icon={Hash} value={inputStats.chars} label="Input characters" />
              <StatPill icon={Type} value={inputStats.words} label="Input words" />
              <StatPill icon={AlignLeft} value={inputStats.lines} label="Input lines" />
            </div>
          </div>

          <div className="relative">
            <textarea
              ref={textareaRef}
              id="tr-input"
              value={text}
              onChange={(event) => { setText(event.target.value); setCopied(false); }}
              placeholder="Type or paste a word, message, paragraph, number, or emoji..."
              rows={4}
              spellCheck={false}
              className="block min-h-[120px] w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm leading-7 text-slate-900 outline-none placeholder:text-slate-400 focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 sm:min-h-[140px] sm:text-base"
            />

            <button
              type="button"
              data-emoji-toggle
              aria-label="Open emoji picker"
              aria-expanded={showEmoji}
              aria-controls="text-repeater-emoji-picker"
              onClick={() => setShowEmoji((previous) => !previous)}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-cyan-100 hover:text-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            >
              <Smile className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmoji && (
            <div
              ref={pickerRef}
              id="text-repeater-emoji-picker"
              aria-label="Choose an emoji"
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="grid grid-cols-6 gap-1 sm:grid-cols-8 md:grid-cols-10">
                {EMOJI_GRID.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => insertEmoji(emoji)}
                    aria-label={`Insert ${emoji} emoji`}
                    className="flex h-11 w-full items-center justify-center rounded-lg text-xl transition-colors hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 dark:hover:bg-slate-700"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ==================== REPEAT SETTINGS ==================== */}

        <div className="grid gap-5 border-t border-slate-100 pt-5 dark:border-slate-800 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-7">

          {/* Repeat Count */}
          <fieldset className="min-w-0 space-y-3">
            <legend className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
              <RotateCcw className="h-4 w-4 text-cyan-600" aria-hidden="true" />
              Number of Repeats
            </legend>

            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="tr-count" className="sr-only">Number of repetitions (1 to 10,000)</label>

              <input
                id="tr-count"
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_REPEATS}
                step={1}
                value={count}
                onChange={handleCountChange}
                aria-invalid={!validCount}
                aria-describedby="tr-count-help"
                className={`min-h-11 w-40 max-w-full rounded-xl border bg-white px-4 py-2.5 font-mono text-base font-semibold text-slate-900 outline-none focus-visible:ring-2 dark:bg-slate-800 dark:text-white ${
                  validCount
                    ? "border-slate-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30 dark:border-slate-700"
                    : "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/30 dark:border-red-500"
                }`}
              />

              <span id="tr-count-help" className={`text-xs font-medium ${validCount ? "text-slate-500 dark:text-slate-400" : "text-red-600 dark:text-red-400"}`}>
                {validCount ? "Maximum 10,000 repeats" : "Enter a whole number from 1 to 10,000"}
              </span>
            </div>

            {/* Quick Presets */}
            <div aria-label="Quick repeat count presets" className="flex flex-wrap gap-2">
              {QUICK_COUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={count === value}
                  onClick={() => { setCount(value); setCopied(false); }}
                  className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-bold tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 ${
                    count === value
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {value.toLocaleString()}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Separators */}
          <fieldset className="min-w-0 space-y-3">
            <legend className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
              <AlignLeft className="h-4 w-4 text-cyan-600" aria-hidden="true" />
              Separator Style
            </legend>

            <div className="flex flex-wrap gap-2" aria-label="Choose separator">
              {SEPARATORS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={separatorId === item.id}
                  onClick={() => { setSeparatorId(item.id); setCopied(false); }}
                  className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600 ${
                    separatorId === item.id
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {separatorId === "custom" && (
              <div className="pt-1">
                <label htmlFor="tr-custom-separator" className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Custom Separator
                </label>

                <input
                  id="tr-custom-separator"
                  type="text"
                  value={customSeparator}
                  onChange={(event) => { setCustomSeparator(event.target.value); setCopied(false); }}
                  placeholder="Example: | or ~ or ;;"
                  className="min-h-11 w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            )}
          </fieldset>
        </div>

        {/* ==================== OUTPUT ==================== */}

        <div className="space-y-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex flex-wrap items-center gap-3">
              <h2 className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                <Copy className="h-4 w-4 text-cyan-600" aria-hidden="true" />
                Repeated Text Output
              </h2>

              <div className="flex flex-wrap gap-3">
                <StatPill icon={Hash} value={outputStats.chars} label="Output characters" />
                <StatPill icon={Type} value={outputStats.words} label="Output words" />
                <StatPill icon={AlignLeft} value={outputStats.lines} label="Output lines" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <ActionButton onClick={handleCopy} disabled={!hasOutput} icon={copied ? Check : Copy} primary title="Copy all repeated text">
                {copied ? "Copied!" : "Copy Text"}
              </ActionButton>

              <ActionButton onClick={handleDownload} disabled={!hasOutput} icon={Download} title="Download repeated text as a TXT file">
                Download
              </ActionButton>
            </div>
          </div>

          <label htmlFor="tr-output" className="sr-only">Generated repeated text output</label>

          <textarea
            id="tr-output"
            readOnly
            value={displayedOutput}
            placeholder={isPending ? "Updating repeated text..." : "Your repeated text will appear here as you type..."}
            rows={6}
            spellCheck={false}
            className="block min-h-[150px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm leading-7 text-slate-900 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-500/30 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 sm:min-h-[190px] sm:text-base"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Text repetition runs in your browser.
            </p>

            {(text || customSeparator || count !== 3 || separatorId !== "newline") && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-950/20"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear All
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}