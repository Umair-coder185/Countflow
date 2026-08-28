"use client"

import { useMemo, useRef, useState } from "react"

import TextEditors from "./TextEditors.jsx"
import ReplacementRules from "./ReplacementRules.jsx"
import ReplaceOptions from "./ReplaceOptions.jsx"
import ReplacementStats from "./ReplacementStats.jsx"
import ConflictWarnings from "./ConflictWarnings.jsx"
import MatchPreview from "./MatchPreview.jsx"

import { replaceText } from "@/lib/find-and-replace/replaceText"
import { detectConflicts } from "@/lib/find-and-replace/detectConflicts"

const MAX_INPUT_CHARS = 500_000
const MAX_RULES = 50

const INITIAL_OPTIONS = {
  caseSensitive: false,
  wholeWords: false,
  regex: false,
  mode: "simultaneous",
}

function createRule(id) {
  return {
    id,
    search: "",
    replace: "",
  }
}

function countWords(text = "") {
  const value = text.trim()
  return value ? value.split(/\s+/).length : 0
}

/*
 * Development check.
 * Remove this after the component exports are confirmed.
 */
const COMPONENTS = {
  TextEditors,
  ReplacementRules,
  ReplaceOptions,
  ReplacementStats,
  ConflictWarnings,
  MatchPreview,
}

for (const [name, Component] of Object.entries(COMPONENTS)) {
  if (typeof Component !== "function") {
    console.error(`${name} import is invalid:`, Component)

    throw new Error(
      `${name} is not exported correctly. ` +
        `Open ${name}.jsx and make sure it uses: ` +
        `export default function ${name}() {}`
    )
  }
}

export default function FindReplaceTool() {
  const nextRuleId = useRef(2)

  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [rules, setRules] = useState([createRule(1)])
  const [options, setOptions] = useState(INITIAL_OPTIONS)

  const [replacementData, setReplacementData] = useState({
    totalReplacements: 0,
    ruleStats: [],
  })

  const [hasRun, setHasRun] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const warnings = useMemo(() => {
    return detectConflicts(rules, options).filter(
      (warning) =>
        !warning.sequentialOnly ||
        options.mode === "sequential"
    )
  }, [rules, options])

  const hasBlockingError = warnings.some(
    (warning) => warning.severity === "error"
  )

  const hasValidRule = rules.some(
    (rule) => rule.search.length > 0
  )

  const canReplace =
    input.length > 0 &&
    hasValidRule &&
    !hasBlockingError

  const stats = useMemo(
    () => ({
      replacements: replacementData.totalReplacements,
      inputWords: countWords(input),
      inputCharacters: input.length,
      resultWords: countWords(result),
      resultCharacters: result.length,
      ruleStats: replacementData.ruleStats,
    }),
    [input, result, replacementData]
  )

  const clearResult = () => {
    setResult("")
    setHasRun(false)
    setCopied(false)

    setReplacementData({
      totalReplacements: 0,
      ruleStats: [],
    })
  }

  const handleInputChange = (value) => {
    setInput(value.slice(0, MAX_INPUT_CHARS))
    clearResult()
    setError("")
  }

  const updateRule = (id, field, value) => {
    setRules((current) =>
      current.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              [field]: value,
            }
          : rule
      )
    )

    clearResult()
    setError("")
  }

  const addRule = () => {
    if (rules.length >= MAX_RULES) return

    const id = nextRuleId.current
    nextRuleId.current += 1

    setRules((current) => [
      ...current,
      createRule(id),
    ])

    clearResult()
    setError("")
  }

  const removeRule = (id) => {
    if (rules.length === 1) {
      setRules([
        createRule(rules[0]?.id ?? 1),
      ])
    } else {
      setRules((current) =>
        current.filter(
          (rule) => rule.id !== id
        )
      )
    }

    clearResult()
    setError("")
  }

  const handleOptionsChange = (nextOptions) => {
    setOptions(nextOptions)
    clearResult()
    setError("")
  }

  const handleReplace = () => {
    if (!canReplace) return

    setError("")
    setCopied(false)

    try {
      const response = replaceText(
        input,
        rules,
        options
      )

      setResult(response.text)

      setReplacementData({
        totalReplacements: response.totalReplacements,
        ruleStats: response.ruleStats,
      })

      setHasRun(true)
    } catch (err) {
      clearResult()

      setError(
        err instanceof Error
          ? err.message
          : "The replacement could not be completed."
      )
    }
  }

  const handleCopy = async () => {
    if (!hasRun) return

    try {
      await navigator.clipboard.writeText(result)

      setCopied(true)

      window.setTimeout(
        () => setCopied(false),
        1800
      )
    } catch {
      setError(
        "Could not copy the result. Please copy it manually."
      )
    }
  }

  const handleDownload = () => {
    if (!hasRun) return

    const blob = new Blob(
      [result],
      {
        type: "text/plain;charset=utf-8",
      }
    )

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "countflows-replaced-text.txt"

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setInput("")
    setResult("")
    setRules([createRule(1)])
    setOptions(INITIAL_OPTIONS)

    setReplacementData({
      totalReplacements: 0,
      ruleStats: [],
    })

    setHasRun(false)
    setError("")
    setCopied(false)

    nextRuleId.current = 2
  }

  return (
    <section
      aria-label="Find and replace text tool"
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
    >
      <TextEditors
        input={input}
        result={result}
        hasRun={hasRun}
        copied={copied}
        maxCharacters={MAX_INPUT_CHARS}
        onInputChange={handleInputChange}
        onCopy={handleCopy}
        onDownload={handleDownload}
      />

      <ReplacementRules
        rules={rules}
        maxRules={MAX_RULES}
        regex={options.regex}
        onChange={updateRule}
        onAdd={addRule}
        onRemove={removeRule}
      />

      <ReplaceOptions
        options={options}
        onChange={handleOptionsChange}
      />

      <ConflictWarnings
        warnings={warnings}
        hasRules={hasValidRule}
      />

      <MatchPreview
        input={input}
        rules={rules}
        options={options}
      />

      <ReplacementStats
        stats={stats}
        hasRun={hasRun}
        error={error}
        canReplace={canReplace}
        onReplace={handleReplace}
        onReset={handleReset}
      />
    </section>
  )
}