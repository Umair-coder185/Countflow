"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import CharacterFindings from "./CharacterFindings"
import CleanupOptions from "./CleanupOptions"
import ClipboardDetails from "./ClipboardDetails"
import ScanSummary from "./ScanSummary"
import TextWorkspace from "./TextWorkspace"
import XRayPreview from "./XRayPreview"

import { applyCleanup } from "@/lib/chatgpt-watermark/cleanText"
import { inspectClipboard } from "@/lib/chatgpt-watermark/inspectClipboard"
import { scanText } from "@/lib/chatgpt-watermark/scanText"

const MAX_INPUT_CHARS = 300_000

const SAMPLE_TEXT = `This\u200B sample contains a zero-width space, a narrow\u202Fspace, a soft\u00ADhyphen, a BOM\uFEFF character, and an em dash — so you can see how the scanner works.`

export default function WatermarkRemoverTool() {
  const reportRef = useRef(null)
  const shouldScrollToReport = useRef(false)

  const [input, setInput] = useState("")
  const [scanResult, setScanResult] = useState(null)
  const [selectedKeys, setSelectedKeys] = useState(new Set())
  const [clipboardInfo, setClipboardInfo] = useState(null)
  const [copied, setCopied] = useState(false)

  const hasScanned = scanResult !== null
  const groups = scanResult?.groups || []
  const occurrences = scanResult?.occurrences || []
  const summary = scanResult?.summary || null

  const cleanupResult = useMemo(() => {
    if (!hasScanned) {
      return {
        text: "",
        changedOccurrences: 0,
        removedOccurrences: 0,
        normalizedOccurrences: 0,
      }
    }

    return applyCleanup(input, occurrences, selectedKeys)
  }, [hasScanned, input, occurrences, selectedKeys])

  useEffect(() => {
    if (!scanResult || !shouldScrollToReport.current) return

    shouldScrollToReport.current = false

    requestAnimationFrame(() => {
      reportRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }, [scanResult])

  const resetScan = () => {
    setScanResult(null)
    setSelectedKeys(new Set())
    setCopied(false)
  }

  const runScan = (text) => {
    const result = scanText(text)

    const recommended = new Set(
      result.groups
        .filter((group) => group.recommended)
        .map((group) => group.key)
    )

    setScanResult(result)
    setSelectedKeys(recommended)
    setCopied(false)
  }

  const handleInputChange = (value) => {
    const next = value.slice(0, MAX_INPUT_CHARS)

    setInput(next)
    resetScan()

    if (!next) {
      setClipboardInfo(null)
    }
  }

  const handleAnalyze = () => {
    if (!input.trim()) return

    shouldScrollToReport.current = true
    runScan(input)
  }

  const handleTrySample = () => {
    setInput(SAMPLE_TEXT)
    setClipboardInfo(null)

    shouldScrollToReport.current = true
    runScan(SAMPLE_TEXT)
  }

  const handlePaste = (payload) => {
    setClipboardInfo(
      inspectClipboard(payload)
    )
  }

  const handleToggleGroup = (key) => {
    setSelectedKeys((current) => {
      const next = new Set(current)

      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }

      return next
    })

    setCopied(false)
  }

  const handleSelectRecommended = () => {
    setSelectedKeys(
      new Set(
        groups
          .filter((group) => group.recommended)
          .map((group) => group.key)
      )
    )

    setCopied(false)
  }

  const handleSelectCategory = (category) => {
    setSelectedKeys(
      new Set(
        groups
          .filter((group) => group.category === category)
          .map((group) => group.key)
      )
    )

    setCopied(false)
  }

  const handleSelectAll = () => {
    setSelectedKeys(
      new Set(
        groups.map((group) => group.key)
      )
    )

    setCopied(false)
  }

  const handleClearSelection = () => {
    setSelectedKeys(new Set())
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!hasScanned) return

    try {
      await navigator.clipboard.writeText(
        cleanupResult.text
      )

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setCopied(false)
    }
  }

  const handleDownload = () => {
    if (!hasScanned) return

    const blob = new Blob(
      [cleanupResult.text],
      {
        type: "text/plain;charset=utf-8",
      }
    )

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "countflows-clean-chatgpt-text.txt"

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setInput("")
    setScanResult(null)
    setSelectedKeys(new Set())
    setClipboardInfo(null)
    setCopied(false)

    shouldScrollToReport.current = false
  }

  return (
    <section
      aria-label="ChatGPT watermark remover"
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
    >
      <TextWorkspace
        input={input}
        cleanedText={cleanupResult.text}
        hasScanned={hasScanned}
        copied={copied}
        maxCharacters={MAX_INPUT_CHARS}
        onInputChange={handleInputChange}
        onAnalyze={handleAnalyze}
        onTrySample={handleTrySample}
        onPaste={handlePaste}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onReset={handleReset}
      />

      <ClipboardDetails info={clipboardInfo} />

      {hasScanned && (
        <div
          ref={reportRef}
          id="scan-report"
          className="scroll-mt-24"
        >
          <ScanSummary
            summary={summary}
            cleanupResult={cleanupResult}
          />

          <XRayPreview
            input={input}
            occurrences={occurrences}
          />

          <CleanupOptions
            groups={groups}
            selectedKeys={selectedKeys}
            onRecommended={handleSelectRecommended}
            onCategory={handleSelectCategory}
            onAll={handleSelectAll}
            onClear={handleClearSelection}
          />

          <CharacterFindings
            groups={groups}
            selectedKeys={selectedKeys}
            onToggle={handleToggleGroup}
          />
        </div>
      )}
    </section>
  )
}