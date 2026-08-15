"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowDownUp,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  DollarSign,
  Info,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wallet,
} from "lucide-react"
import { MODELS } from "@/lib/modelPricing"

const CHIP_COLORS = [
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
]

const RESPONSE_LENGTH_PRESETS = [
  { id: "none", label: "Input only", outputTokens: 0 },
  { id: "short", label: "Short reply · ~150 tokens", outputTokens: 150 },
  { id: "medium", label: "Medium reply · ~500 tokens", outputTokens: 500 },
  { id: "long", label: "Long reply · ~1,500 tokens", outputTokens: 1500 },
]

function estimateTokenCount(text, model) {
  if (!text) return 0
  const wordLikeUnits = text.match(/[A-Za-z0-9']+|[^\sA-Za-z0-9']/g)?.length ?? 0
  const charBasedEstimate = Math.ceil(text.length / model.charsPerToken)
  return Math.max(1, Math.round(wordLikeUnits * 0.7 + charBasedEstimate * 0.3))
}

function buildTokenPieces(text, model) {
  if (!text) return []
  const preview = text.slice(0, 12000)
  const units = preview.match(/[A-Za-z0-9']+|[^\sA-Za-z0-9']|\s+/g) || []
  const pieces = []

  for (const unit of units) {
    const isWord = /^[A-Za-z0-9']+$/.test(unit)

    if (!isWord || unit.length <= 4) {
      pieces.push(unit)
    } else {
      const targetChunkLen = Math.max(3, Math.round(5 / model.subwordFactor))
      for (let i = 0; i < unit.length; i += targetChunkLen) pieces.push(unit.slice(i, i + targetChunkLen))
    }

    if (pieces.length >= 350) break
  }

  return pieces
}

function getRates(model, inputTokens) {
  if (!model.hasFixedPricing) return null

  if (model.longContext && inputTokens > model.longContext.thresholdTokens) {
    return {
      inputRate: model.longContext.inputPricePerMillion,
      outputRate: model.longContext.outputPricePerMillion,
      isLongContext: true,
    }
  }

  return {
    inputRate: model.inputPricePerMillion,
    outputRate: model.outputPricePerMillion,
    isLongContext: false,
  }
}

function formatCost(amount) {
  if (amount === null || amount === undefined) return "—"
  if (amount === 0) return "$0.00"
  if (amount < 0.01) return `$${amount.toFixed(6)}`
  if (amount < 1) return `$${amount.toFixed(4)}`
  return `$${amount.toFixed(2)}`
}

function ResultMetric({ label, value, accent = false, subtext }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/30" : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/70"}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`mt-1 text-2xl font-black ${accent ? "text-cyan-700 dark:text-cyan-300" : "text-gray-950 dark:text-white"}`}>{value}</p>
      {subtext ? <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">{subtext}</p> : null}
    </div>
  )
}

export default function TokenCounterTool() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)
  const [modelId, setModelId] = useState(MODELS[0].id)
  const [responseLengthId, setResponseLengthId] = useState("none")
  const [budgetModelId, setBudgetModelId] = useState(MODELS[0].id)
  const [monthlyBudget, setMonthlyBudget] = useState(20)
  const [avgInputTokens, setAvgInputTokens] = useState(500)
  const [avgOutputTokens, setAvgOutputTokens] = useState(300)

  const selectedModel = MODELS.find((m) => m.id === modelId) ?? MODELS[0]
  const responsePreset = RESPONSE_LENGTH_PRESETS.find((p) => p.id === responseLengthId) ?? RESPONSE_LENGTH_PRESETS[0]

  const tokenCount = useMemo(() => estimateTokenCount(text, selectedModel), [text, selectedModel])
  const tokenPieces = useMemo(() => buildTokenPieces(text, selectedModel), [text, selectedModel])

  const stats = useMemo(() => {
    const characters = text.length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split(/\n/).length : 0
    return { characters, words, lines }
  }, [text])

  const tokenChips = useMemo(
    () => tokenPieces.filter((piece) => piece.length > 0).map((piece, i) => ({ piece, color: CHIP_COLORS[i % CHIP_COLORS.length] })),
    [tokenPieces]
  )

  const insights = useMemo(() => {
    const outputTokens = responsePreset.outputTokens
    const totalTokens = tokenCount + outputTokens
    const rates = getRates(selectedModel, tokenCount)

    let cost = null
    if (rates) {
      const inputCost = (tokenCount / 1_000_000) * rates.inputRate
      const outputCost = (outputTokens / 1_000_000) * rates.outputRate
      cost = { inputCost, outputCost, totalCost: inputCost + outputCost, isLongContext: rates.isLongContext }
    }

    const contextWindow = selectedModel.contextWindowTokens
    const usagePercent = contextWindow ? (totalTokens / contextWindow) * 100 : 0
    const remainingTokens = contextWindow - totalTokens
    const exceedsWindow = totalTokens > contextWindow

    return { totalTokens, cost, usagePercent, remainingTokens, exceedsWindow }
  }, [tokenCount, responsePreset, selectedModel])

  const modelComparison = useMemo(() => {
    const outputTokens = responsePreset.outputTokens

    return MODELS.filter((m) => m.hasFixedPricing)
      .map((m) => {
        const rates = getRates(m, tokenCount)
        const inputCost = (tokenCount / 1_000_000) * rates.inputRate
        const outputCost = (outputTokens / 1_000_000) * rates.outputRate

        return {
          id: m.id,
          label: m.label,
          totalCost: inputCost + outputCost,
          isLongContext: rates.isLongContext,
        }
      })
      .sort((a, b) => a.totalCost - b.totalCost)
  }, [tokenCount, responsePreset])

  const cheapestModel = modelComparison[0] ?? null
  const selectedComparison = modelComparison.find((m) => m.id === selectedModel.id) ?? null
  const savingsPercent =
    cheapestModel && selectedComparison && selectedComparison.totalCost > 0 && cheapestModel.totalCost < selectedComparison.totalCost
      ? Math.round(((selectedComparison.totalCost - cheapestModel.totalCost) / selectedComparison.totalCost) * 100)
      : 0

  const budgetModel = MODELS.find((m) => m.id === budgetModelId) ?? MODELS[0]

  const budgetPlan = useMemo(() => {
    if (!budgetModel.hasFixedPricing) return null

    const costPerRequest =
      (avgInputTokens / 1_000_000) * budgetModel.inputPricePerMillion +
      (avgOutputTokens / 1_000_000) * budgetModel.outputPricePerMillion

    if (costPerRequest <= 0) return null

    return {
      costPerRequest,
      requestsPerMonth: Math.floor(monthlyBudget / costPerRequest),
    }
  }, [budgetModel, avgInputTokens, avgOutputTokens, monthlyBudget])

  const handleCopy = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const usageBarColor =
    insights.usagePercent >= 85 ? "bg-rose-500" : insights.usagePercent >= 50 ? "bg-amber-500" : "bg-emerald-500"

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-cyan-100/70 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/30">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 md:px-6 dark:border-gray-800 dark:bg-gray-900">
        <div>
          <p className="text-sm font-bold text-gray-950 dark:text-white">AI Token Counter</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Paste once. See tokens, cost, context, and the best-value model.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />Private in browser
          </span>

          <div className="relative">
            <select
              aria-label="AI model"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm font-semibold text-gray-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-cyan-950"
            >
              {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_.75fr]">
        <section className="border-b border-gray-200 p-4 md:p-6 lg:border-b-0 lg:border-r dark:border-gray-800">
          <div className="mb-3 flex items-center justify-between gap-3">
            <label htmlFor="token-text" className="text-sm font-semibold text-gray-800 dark:text-gray-200">Your prompt or text</label>
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><Info className="h-3.5 w-3.5" />Estimated tokenization</span>
          </div>

          <div className="relative">
            <textarea
              id="token-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your prompt, system message, article, or API input here…"
              className="h-72 w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 p-4 pb-14 text-[15px] leading-7 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100/60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-cyan-950/40"
            />

            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button type="button" onClick={handleCopy} disabled={!text} className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:border-cyan-200 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" aria-label="Copy text">
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>

              <button type="button" onClick={() => setText("")} disabled={!text} className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:border-rose-200 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" aria-label="Clear text">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <ResultMetric label="Tokens" value={tokenCount.toLocaleString()} accent />
            <ResultMetric label="Words" value={stats.words.toLocaleString()} />
            <ResultMetric label="Characters" value={stats.characters.toLocaleString()} />
          </div>

          <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/70">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Token breakdown
              </span>

              {tokenChips.length > 0 && (
                <span className="text-xs text-gray-400">
                  Approximate visualization
                </span>
              )}
            </div>

            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              {tokenChips.length > 0 ? (
                <>
                  <div className="flex max-h-52 flex-wrap gap-1 overflow-y-auto">
                    {tokenChips.map((chip, i) => (
                      <span
                        key={`${chip.piece}-${i}`}
                        className={`inline-block rounded px-1.5 py-0.5 font-mono text-xs whitespace-pre ${chip.color}`}
                      >
                        {chip.piece === "\n" ? "↵" : chip.piece}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-xs leading-5 text-gray-400">
                    Approximate token visualization. Long text is capped in the breakdown for faster browser performance.
                  </p>
                </>
              ) : (
                <div className="flex min-h-28 items-center justify-center">
                  <p className="text-center text-sm text-gray-400 dark:text-gray-500">
                    Paste text above to see the token breakdown.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="bg-slate-50/70 p-4 md:p-6 dark:bg-gray-950/40">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-sm font-bold text-gray-950 dark:text-white">Your AI cost snapshot</h2>
          </div>

          <div className="mt-4">
            <label htmlFor="response-length" className="mb-1.5 block text-xs font-semibold text-gray-500 dark:text-gray-400">Expected response</label>
            <div className="relative">
              <select
                id="response-length"
                value={responseLengthId}
                onChange={(e) => setResponseLengthId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-cyan-950"
              >
                {RESPONSE_LENGTH_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <ResultMetric
              label="Estimated cost"
              value={insights.cost ? formatCost(insights.cost.totalCost) : "N/A"}
              accent
              subtext={insights.cost ? `≈ ${formatCost(insights.cost.totalCost * 1000)} / 1K similar requests` : selectedModel.pricingNote}
            />
            <ResultMetric
              label="Total tokens"
              value={insights.totalTokens.toLocaleString()}
              subtext={responseLengthId === "none" ? "Input only" : `Includes ~${responsePreset.outputTokens.toLocaleString()} output`}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Context window</p>
                <p className="mt-1 text-sm font-bold text-gray-950 dark:text-white">{selectedModel.contextWindowTokens.toLocaleString()} tokens max</p>
              </div>
              <span className="text-sm font-black text-gray-900 dark:text-white">{Math.min(insights.usagePercent, 999).toFixed(1)}%</span>
            </div>

            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className={`h-full rounded-full ${usageBarColor} transition-all`} style={{ width: `${Math.min(insights.usagePercent, 100)}%` }} />
            </div>

            {insights.exceedsWindow ? (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" />Exceeds context by {Math.abs(insights.remainingTokens).toLocaleString()} tokens
              </p>
            ) : (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{Math.max(0, insights.remainingTokens).toLocaleString()} tokens remaining</p>
            )}
          </div>

          {cheapestModel ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/25">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Best value for this prompt</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="font-black text-gray-950 dark:text-white">{cheapestModel.label}</p>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{formatCost(cheapestModel.totalCost)}</p>
                </div>
                {savingsPercent > 0 ? (
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-sm dark:bg-gray-900 dark:text-emerald-300">Save ~{savingsPercent}%</span>
                ) : (
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-sm dark:bg-gray-900 dark:text-emerald-300">Selected is lowest</span>
                )}
              </div>
            </div>
          ) : null}

          <details className="group mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
              <span className="inline-flex items-center gap-2"><ArrowDownUp className="h-4 w-4 text-cyan-600" />Compare model costs</span>
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>

            <div className="border-t border-gray-200 px-4 py-2 dark:border-gray-700">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {modelComparison.map((model, index) => (
                  <li key={model.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="min-w-0 text-gray-600 dark:text-gray-300">
                      <span className="font-medium">{model.label}</span>
                      {index === 0 ? <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">LOWEST</span> : null}
                    </span>
                    <span className="shrink-0 font-bold text-gray-900 dark:text-white">{formatCost(model.totalCost)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="group mt-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
              <span className="inline-flex items-center gap-2"><Wallet className="h-4 w-4 text-cyan-600" />Plan a monthly budget</span>
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>

            <div className="space-y-3 border-t border-gray-200 p-4 dark:border-gray-700">
              <div>
                <label htmlFor="budget-model" className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">Model</label>
                <select
                  id="budget-model"
                  value={budgetModelId}
                  onChange={(e) => setBudgetModelId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="monthly-budget" className="mb-1 block text-[11px] font-semibold text-gray-500 dark:text-gray-400">Budget $</label>
                  <input id="monthly-budget" type="number" min="0" value={monthlyBudget} onChange={(e) => setMonthlyBudget(Math.max(0, Number(e.target.value) || 0))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-2.5 py-2 text-sm outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-800" />
                </div>
                <div>
                  <label htmlFor="avg-input" className="mb-1 block text-[11px] font-semibold text-gray-500 dark:text-gray-400">Input</label>
                  <input id="avg-input" type="number" min="0" value={avgInputTokens} onChange={(e) => setAvgInputTokens(Math.max(0, Number(e.target.value) || 0))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-2.5 py-2 text-sm outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-800" />
                </div>
                <div>
                  <label htmlFor="avg-output" className="mb-1 block text-[11px] font-semibold text-gray-500 dark:text-gray-400">Output</label>
                  <input id="avg-output" type="number" min="0" value={avgOutputTokens} onChange={(e) => setAvgOutputTokens(Math.max(0, Number(e.target.value) || 0))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-2.5 py-2 text-sm outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-800" />
                </div>
              </div>

              <div className="rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2.5 text-sm text-gray-700 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-gray-200">
                {budgetPlan ? (
                  <>About <strong>{budgetPlan.requestsPerMonth.toLocaleString()} requests/month</strong> at {formatCost(budgetPlan.costPerRequest)} per request.</>
                ) : (
                  budgetModel.pricingNote || "Enter a budget and average token counts to estimate monthly requests."
                )}
              </div>
            </div>
          </details>

          <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-5 text-gray-400 dark:text-gray-500">
            <DollarSign className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Cost estimates use the rates configured in your modelPricing data and are calculated locally in the browser.
          </p>
        </aside>
      </div>
    </div>
  )
}