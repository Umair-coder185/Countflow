"use client";

import { useState, useMemo } from "react";
import {
  Copy,
  Trash2,
  Check,
  ChevronDown,
  Info,
  DollarSign,
  Wallet,
  AlertTriangle,
  ShieldCheck,
  ArrowDownUp,
} from "lucide-react";
import { MODELS } from "@/lib/modelPricing";

const CHIP_COLORS = [
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
];

const RESPONSE_LENGTH_PRESETS = [
  { id: "none", label: "Input only (no reply estimated)", outputTokens: 0 },
  { id: "short", label: "Short reply (~150 tokens)", outputTokens: 150 },
  { id: "medium", label: "Medium reply (~500 tokens)", outputTokens: 500 },
  { id: "long", label: "Long reply (~1,500 tokens)", outputTokens: 1500 },
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

// ---- Cost / context-window helpers — pure functions, no network calls ----

function getRates(model, inputTokens) {
  if (!model.hasFixedPricing) return null;
  if (model.longContext && inputTokens > model.longContext.thresholdTokens) {
    return {
      inputRate: model.longContext.inputPricePerMillion,
      outputRate: model.longContext.outputPricePerMillion,
      isLongContext: true,
    };
  }
  return {
    inputRate: model.inputPricePerMillion,
    outputRate: model.outputPricePerMillion,
    isLongContext: false,
  };
}

function formatCost(amount) {
  if (amount === 0) return "$0.00";
  if (amount < 0.01) return `$${amount.toFixed(6)}`;
  return `$${amount.toFixed(4)}`;
}

export default function TokenCounterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [modelId, setModelId] = useState(MODELS[0].id);

  const [responseLengthId, setResponseLengthId] = useState("none");

  const [budgetModelId, setBudgetModelId] = useState(MODELS[0].id);
  const [monthlyBudget, setMonthlyBudget] = useState(20);
  const [avgInputTokens, setAvgInputTokens] = useState(500);
  const [avgOutputTokens, setAvgOutputTokens] = useState(300);

  const selectedModel = MODELS.find((m) => m.id === modelId) ?? MODELS[0];
  const responsePreset =
    RESPONSE_LENGTH_PRESETS.find((p) => p.id === responseLengthId) ?? RESPONSE_LENGTH_PRESETS[0];

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

  // Cost estimate + context window usage — derived from tokenCount above.
  // No recomputation of tokens happens here; this only does arithmetic.
  const insights = useMemo(() => {
    const outputTokens = responsePreset.outputTokens;
    const totalTokens = tokenCount + outputTokens;
    const rates = getRates(selectedModel, tokenCount);

    let cost = null;
    if (rates) {
      const inputCost = (tokenCount / 1_000_000) * rates.inputRate;
      const outputCost = (outputTokens / 1_000_000) * rates.outputRate;
      cost = {
        inputCost,
        outputCost,
        totalCost: inputCost + outputCost,
        isLongContext: rates.isLongContext,
      };
    }

    const contextWindow = selectedModel.contextWindowTokens;
    const usagePercent = (totalTokens / contextWindow) * 100;
    const remainingTokens = contextWindow - totalTokens;
    const exceedsWindow = totalTokens > contextWindow;

    return { totalTokens, cost, usagePercent, remainingTokens, exceedsWindow };
  }, [tokenCount, responsePreset, selectedModel]);

  // Cost across every priced model for the current token count + expected
  // response length, sorted cheapest to most expensive. Pure arithmetic on the
  // already-computed tokenCount; no extra tokenization work.
  const modelComparison = useMemo(() => {
    const outputTokens = responsePreset.outputTokens;
    return MODELS.filter((m) => m.hasFixedPricing)
      .map((m) => {
        const rates = getRates(m, tokenCount);
        const inputCost = (tokenCount / 1_000_000) * rates.inputRate;
        const outputCost = (outputTokens / 1_000_000) * rates.outputRate;
        return {
          id: m.id,
          label: m.label,
          totalCost: inputCost + outputCost,
          isLongContext: rates.isLongContext,
        };
      })
      .sort((a, b) => a.totalCost - b.totalCost);
  }, [tokenCount, responsePreset]);

  const cheapestModel = modelComparison[0] ?? null;
  const priciestModel =
    modelComparison.length > 0 ? modelComparison[modelComparison.length - 1] : null;

  const budgetModel = MODELS.find((m) => m.id === budgetModelId) ?? MODELS[0];

  const budgetPlan = useMemo(() => {
    if (!budgetModel.hasFixedPricing) return null;
    const costPerRequest =
      (avgInputTokens / 1_000_000) * budgetModel.inputPricePerMillion +
      (avgOutputTokens / 1_000_000) * budgetModel.outputPricePerMillion;
    if (costPerRequest <= 0) return null;
    return {
      costPerRequest,
      requestsPerMonth: Math.floor(monthlyBudget / costPerRequest),
    };
  }, [budgetModel, avgInputTokens, avgOutputTokens, monthlyBudget]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => setText("");

  const usageBarColor =
    insights.usagePercent >= 85
      ? "bg-rose-500"
      : insights.usagePercent >= 50
      ? "bg-amber-500"
      : "bg-emerald-500";

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
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Tokens</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.words.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Words</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.characters.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Characters</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.lines.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Lines</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center col-span-2 md:col-span-1">
          <div className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
            {stats.paragraphs.toLocaleString()}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Paragraphs</div>
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

      {/* Trust line — directly under the textarea so it's seen immediately */}
      <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
        Your text stays in this browser — nothing is uploaded or stored.
      </p>

      {/* Token chip visualization — always rendered, empty-state message
          when there's nothing to break down yet */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Token breakdown</h3>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 max-h-64 overflow-y-auto">
          {tokenChips.length > 0 ? (
            <>
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
            </>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
              Start typing or paste text above to see the token breakdown.
            </p>
          )}
        </div>
      </div>

      {/* Cost estimate, context window usage, model comparison, and budget planner —
          always visible, no text required */}
      <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800">
          <DollarSign className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Cost estimate &amp; context window usage
          </span>
        </div>

        <div className="p-4 space-y-5">
          {/* Expected response length */}
          <div>
            <label
              htmlFor="response-length"
              className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"
            >
              Expected response length (optional — for cost &amp; context estimate)
            </label>
            <div className="relative w-full sm:w-80">
              <select
                id="response-length"
                value={responseLengthId}
                onChange={(e) => setResponseLengthId(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                {RESPONSE_LENGTH_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Cost estimate */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Estimated cost — {selectedModel.label}
            </p>
            {insights.cost ? (
              <>
                <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  {formatCost(insights.cost.totalCost)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatCost(insights.cost.inputCost)} input
                  {responseLengthId !== "none" && ` + ${formatCost(insights.cost.outputCost)} output`}
                  {insights.cost.isLongContext && " · long-context rate applied"}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedModel.pricingNote}</p>
            )}
          </div>

          {/* Cost comparison across every priced model, cheapest first */}
          {modelComparison.length > 1 && (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-gray-800">
                <ArrowDownUp className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Compare cost across models
                </span>
              </div>

              <div className="p-3 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-3">
                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      Lowest estimated cost
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      {cheapestModel.label}
                    </p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCost(cheapestModel.totalCost)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 p-3">
                    <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
                      Highest estimated cost
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      {priciestModel.label}
                    </p>
                    <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                      {formatCost(priciestModel.totalCost)}
                    </p>
                  </div>
                </div>

                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {modelComparison.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between py-1.5 text-sm"
                    >
                      <span className="text-gray-600 dark:text-gray-300">
                        {m.label}
                        {m.isLongContext && (
                          <span className="ml-1.5 text-xs text-gray-400">(long-context rate)</span>
                        )}
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {formatCost(m.totalCost)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Context window usage */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              <span>Context window usage</span>
              <span>{selectedModel.contextWindowTokens.toLocaleString()} tokens max</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-full ${usageBarColor} transition-all`}
                style={{ width: `${Math.min(insights.usagePercent, 100)}%` }}
              />
            </div>
            {insights.exceedsWindow ? (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                Exceeds {selectedModel.label}&apos;s context window by{" "}
                {Math.abs(insights.remainingTokens).toLocaleString()} tokens
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                {insights.usagePercent.toFixed(1)}% used · {insights.remainingTokens.toLocaleString()} tokens
                remaining
              </p>
            )}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-3">
            Cost and context window estimates are calculated entirely in your browser from the token count
            above — nothing is sent anywhere.
          </p>

          {/* Token Budget Planner — always visible alongside cost/context */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-gray-800">
              <Wallet className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Token budget planner
              </span>
            </div>

            <div className="p-3 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="budget-model" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Model
                  </label>
                  <div className="relative">
                    <select
                      id="budget-model"
                      value={budgetModelId}
                      onChange={(e) => setBudgetModelId(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
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
                <div>
                  <label htmlFor="monthly-budget" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Monthly budget (USD)
                  </label>
                  <input
                    id="monthly-budget"
                    type="number"
                    min="0"
                    step="1"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label htmlFor="avg-input" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Avg. input tokens / request
                  </label>
                  <input
                    id="avg-input"
                    type="number"
                    min="0"
                    step="10"
                    value={avgInputTokens}
                    onChange={(e) => setAvgInputTokens(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label htmlFor="avg-output" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Avg. output tokens / request
                  </label>
                  <input
                    id="avg-output"
                    type="number"
                    min="0"
                    step="10"
                    value={avgOutputTokens}
                    onChange={(e) => setAvgOutputTokens(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-200 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 rounded-lg px-3 py-2.5">
                {budgetPlan ? (
                  <>
                    At this rate, your budget covers approximately{" "}
                    <strong>{budgetPlan.requestsPerMonth.toLocaleString()} requests/month</strong> on{" "}
                    {budgetModel.label} ({formatCost(budgetPlan.costPerRequest)} per request).
                  </>
                ) : (
                  budgetModel.pricingNote ||
                  "Enter a budget and average token counts to see how many requests it covers."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}