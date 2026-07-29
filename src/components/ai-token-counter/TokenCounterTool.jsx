"use client";

import { useState, useMemo } from "react";
import { Copy, Trash2, Check, ChevronDown, Info } from "lucide-react";

const MODELS = [
  { id: "gpt-4o", label: "GPT-4o", charsPerToken: 4.0, subwordFactor: 1.28 },
  { id: "gpt-4", label: "GPT-4 / GPT-4 Turbo", charsPerToken: 4.0, subwordFactor: 1.28 },
  { id: "gpt-3.5", label: "GPT-3.5 Turbo", charsPerToken: 4.0, subwordFactor: 1.30 },
  { id: "claude", label: "Claude (Sonnet / Opus / Haiku)", charsPerToken: 3.6, subwordFactor: 1.22 },
  { id: "gemini", label: "Gemini 1.5", charsPerToken: 4.0, subwordFactor: 1.25 },
  { id: "llama", label: "Llama 3", charsPerToken: 4.2, subwordFactor: 1.20 },
];

const CHIP_COLORS = [
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
];

function splitIntoUnits(text) {
  if (!text) return [];
  return text.match(/[A-Za-z0-9']+|[^\sA-Za-z0-9']|\s+/g) || [];
}

function refineUnit(unit, subwordFactor) {
  const isWord = /^[A-Za-z0-9']+$/.test(unit);
  if (!isWord || unit.length <= 4) return [unit];

  const targetChunkLen = Math.max(3, Math.round(5 / subwordFactor));
  const pieces = [];
  for (let i = 0; i < unit.length; i += targetChunkLen) {
    pieces.push(unit.slice(i, i + targetChunkLen));
  }
  return pieces;
}

function estimateTokens(text, model) {
  const units = splitIntoUnits(text);
  const pieces = units.flatMap((u) => refineUnit(u, model.subwordFactor));

  const meaningfulPieces = pieces.filter((p) => p.trim().length > 0 || p.length > 1);

  const charBasedEstimate = Math.ceil(text.length / model.charsPerToken);
  const unitBasedEstimate = meaningfulPieces.length;

  const blended = Math.round(unitBasedEstimate * 0.7 + charBasedEstimate * 0.3);

  return { count: Math.max(blended, text ? 1 : 0), pieces };
}

export default function TokenCounterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [modelId, setModelId] = useState(MODELS[0].id);

  const selectedModel = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  const { count: tokenCount, pieces } = useMemo(
    () => estimateTokens(text, selectedModel),
    [text, selectedModel]
  );

  const stats = useMemo(() => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\n/).length : 0;
    const paragraphs = text.trim()
      ? text.trim().split(/\n\s*\n/).filter(Boolean).length
      : 0;

    return { characters, words, lines, paragraphs };
  }, [text]);

  const tokenChips = useMemo(() => {
    if (pieces.length === 0) return [];
    const capped = pieces.slice(0, 500);
    return capped
      .filter((p) => p.length > 0)
      .map((piece, i) => ({
        piece,
        color: CHIP_COLORS[i % CHIP_COLORS.length],
      }));
  }, [pieces]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl shadow-cyan-100/50 dark:shadow-black/30 p-4 md:p-6">
      {/* Model Selector */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <label htmlFor="model-select" className="text-sm font-medium text-gray-600 dark:text-gray-300 shrink-0">
          Model
        </label>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <Info className="h-3 w-3" />
            Estimated
          </span>
          <div className="relative">
            <select
              id="model-select"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="sticky top-0 z-10 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-4 bg-white dark:bg-gray-900 pb-1">
        <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
            {tokenCount.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Tokens
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.words.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Words
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.characters.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Characters
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.lines.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Lines
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center col-span-2 md:col-span-1">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.paragraphs.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Paragraphs
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your prompt or text here to count tokens..."
          className="w-full h-48 md:h-64 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            aria-label="Copy text"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleClear}
            disabled={!text}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 disabled:opacity-50 transition-colors"
            aria-label="Clear text"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {text && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 md:-bottom-3">
            <span className="inline-block bg-gray-900 dark:bg-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              Total: {tokenCount.toLocaleString()} tokens
            </span>
          </div>
        )}
      </div>

      {/* Token chip visualization — always visible when there's text */}
      {text && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
            Token breakdown
          </h3>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 max-h-64 overflow-y-auto">
            <div className="flex flex-wrap gap-1">
              {tokenChips.map((chip, i) => (
                <span
                  key={i}
                  className={`inline-block px-1.5 py-0.5 rounded text-xs font-mono whitespace-pre ${chip.color}`}
                >
                  {chip.piece === "\n" ? "↵" : chip.piece}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              {pieces.length > 500
                ? `Showing first 500 of ${pieces.length.toLocaleString()} approximate pieces.`
                : "Approximate token breakdown — actual tokenization may split words differently."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}