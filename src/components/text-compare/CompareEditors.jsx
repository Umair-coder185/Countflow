"use client"

import { Clipboard, Upload } from "lucide-react"

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value)
}

function EditorPanel({
  label,
  value,
  onChange,
  onPaste,
  onFile,
  maxCharacters,
}) {
  const remaining = Math.max(0, maxCharacters - value.length)

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-950/60">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <label className="font-semibold text-gray-900 dark:text-gray-100">
          {label}
        </label>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onPaste}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-gray-600 transition hover:bg-white hover:text-cyan-700 dark:text-gray-300 dark:hover:bg-gray-900"
          >
            <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
            Paste
          </button>

          <label className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-gray-600 transition hover:bg-white hover:text-cyan-700 dark:text-gray-300 dark:hover:bg-gray-900">
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            Load file
            <input
              type="file"
              className="sr-only"
              accept=".txt,.md,.csv,.json,.html,.htm,.css,.js,.jsx,.ts,.tsx,.xml,.yaml,.yml,text/plain"
              onChange={onFile}
            />
          </label>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={13}
        spellCheck="false"
        placeholder={`Paste ${label.toLowerCase()} here...`}
        className="w-full resize-y bg-transparent px-4 py-4 text-sm leading-7 text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
      />

      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <span>{formatNumber(value.length)} characters</span>
        <span>{formatNumber(remaining)} remaining</span>
      </div>
    </div>
  )
}

export default function CompareEditors({
  original,
  revised,
  onOriginalChange,
  onRevisedChange,
  onPasteOriginal,
  onPasteRevised,
  onOriginalFile,
  onRevisedFile,
  maxCharacters,
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <EditorPanel
        label="Original text"
        value={original}
        onChange={onOriginalChange}
        onPaste={onPasteOriginal}
        onFile={onOriginalFile}
        maxCharacters={maxCharacters}
      />

      <EditorPanel
        label="Changed text"
        value={revised}
        onChange={onRevisedChange}
        onPaste={onPasteRevised}
        onFile={onRevisedFile}
        maxCharacters={maxCharacters}
      />
    </div>
  )
}