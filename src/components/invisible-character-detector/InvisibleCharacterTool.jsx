"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import TextWorkspace from "./TextWorkspace"
import DetectionSummary from "./DetectionSummary"
import XRayPreview from "./XRayPreview"
import CharacterList from "./CharacterList"
import { detectInvisibleCharacters } from "@/lib/invisible-character-detector/detectInvisibleCharacters"
import { cleanInvisibleCharacters } from "@/lib/invisible-character-detector/cleanInvisibleCharacters"

const MAX_INPUT_CHARS = 300_000

const SAMPLE_TEXT = `This\u200Bis a sample with invisible characters.

This sentence contains a no-break\u00A0space.
This one contains a narrow\u202Fspace.
\uFEFFThis line starts with an invisible BOM character.`

export default function InvisibleCharacterTool() {
  const [input, setInput] = useState("")
  const [scanResult, setScanResult] = useState(null)
  const [selectedKeys, setSelectedKeys] = useState(new Set())
  const [copied, setCopied] = useState(false)

  const reportRef = useRef(null)
  const shouldScrollToReport = useRef(false)
  const copyTimerRef = useRef(null)

  const cleanedResult = useMemo(() => {
    if (!scanResult) return { text: input, changed: false, changedOccurrences: 0, removedOccurrences: 0, normalizedOccurrences: 0, changedTypes: 0 }
    return cleanInvisibleCharacters(input, scanResult.occurrences, selectedKeys)
  }, [input, scanResult, selectedKeys])

  useEffect(() => {
    if (!scanResult || !shouldScrollToReport.current) return

    shouldScrollToReport.current = false

    requestAnimationFrame(() => {
      reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [scanResult])

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  function runScan(text) {
    const result = detectInvisibleCharacters(text)
    const recommendedKeys = new Set(result.groups.filter((group) => group.recommended).map((group) => group.key))

    setScanResult(result)
    setSelectedKeys(recommendedKeys)
    setCopied(false)
  }

  function handleInputChange(value) {
    const nextValue = value.slice(0, MAX_INPUT_CHARS)

    setInput(nextValue)
    setScanResult(null)
    setSelectedKeys(new Set())
    setCopied(false)
  }

  function handleScan() {
    if (!input) return

    shouldScrollToReport.current = true
    runScan(input)
  }

  function handleTrySample() {
    setInput(SAMPLE_TEXT)
    shouldScrollToReport.current = true
    runScan(SAMPLE_TEXT)
  }

  function handleToggleCharacter(key) {
    setSelectedKeys((current) => {
      const next = new Set(current)

      if (next.has(key)) next.delete(key)
      else next.add(key)

      return next
    })
  }

  function handleSelectRecommended() {
    if (!scanResult) return

    setSelectedKeys(new Set(scanResult.groups.filter((group) => group.recommended).map((group) => group.key)))
  }

  function handleSelectAll() {
    if (!scanResult) return

    setSelectedKeys(new Set(scanResult.groups.map((group) => group.key)))
  }

  function handleClearSelection() {
    setSelectedKeys(new Set())
  }

  async function handleCopy() {
    if (!cleanedResult.text) return

    const success = await copyText(cleanedResult.text)

    if (!success) return

    setCopied(true)

    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)

    copyTimerRef.current = setTimeout(() => {
      setCopied(false)
    }, 1800)
  }

  function handleReset() {
    setInput("")
    setScanResult(null)
    setSelectedKeys(new Set())
    setCopied(false)

    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
  }

  return (
    <div className="space-y-7">
      <TextWorkspace
        input={input}
        cleanedText={cleanedResult.text}
        hasScanned={Boolean(scanResult)}
        copied={copied}
        maxCharacters={MAX_INPUT_CHARS}
        onInputChange={handleInputChange}
        onScan={handleScan}
        onTrySample={handleTrySample}
        onCopy={handleCopy}
        onReset={handleReset}
      />

      {scanResult && (
        <div ref={reportRef} id="detection-report" className="scroll-mt-24 space-y-6">
          <DetectionSummary summary={scanResult.summary} selectedCount={selectedKeys.size} changedOccurrences={cleanedResult.changedOccurrences} />

          {scanResult.summary.totalDetected > 0 && (
            <>
              <XRayPreview text={input} occurrences={scanResult.occurrences} />

              <CharacterList
                groups={scanResult.groups}
                selectedKeys={selectedKeys}
                onToggle={handleToggleCharacter}
                onSelectRecommended={handleSelectRecommended}
                onSelectAll={handleSelectAll}
                onClear={handleClearSelection}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fall through to the browser fallback.
  }

  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    textarea.style.pointerEvents = "none"

    document.body.appendChild(textarea)
    textarea.select()

    const copied = document.execCommand("copy")

    document.body.removeChild(textarea)

    return copied
  } catch {
    return false
  }
}