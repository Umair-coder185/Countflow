import { Check, Copy, RotateCcw, ScanSearch, Sparkles } from "lucide-react"

export default function TextWorkspace({ input, cleanedText, hasScanned, copied, maxCharacters, onInputChange, onScan, onTrySample, onCopy, onReset }) {
  const hasInput = input.length > 0

  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
      <div className="border-b border-cyan-100 bg-cyan-50/60 px-5 py-4 sm:px-6 dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-cyan-700 dark:text-cyan-300">Check Your Text for Invisible Characters</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-slate-400">Paste text below to find hidden Unicode, zero-width characters, and unusual spaces.</p>
          </div>

          <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-slate-400">{input.length.toLocaleString()} / {maxCharacters.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-gray-200 p-5 sm:p-6 lg:border-b-0 lg:border-r dark:border-white/10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <label htmlFor="invisible-character-input" className="text-sm font-semibold text-gray-900 dark:text-white">Original Text</label>

            {hasInput && (
              <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
                <RotateCcw size={13} aria-hidden="true" />
                Reset
              </button>
            )}
          </div>

          <textarea
            id="invisible-character-input"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            maxLength={maxCharacters}
            rows={13}
            spellCheck={false}
            autoComplete="off"
            placeholder="Paste or type text here..."
            className="min-h-[300px] w-full resize-y rounded-xl border border-cyan-100 bg-cyan-50/30 p-4 text-[15px] leading-7 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-cyan-500 dark:focus:bg-slate-950 dark:focus:ring-cyan-900/60"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onScan}
              disabled={!hasInput}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              <ScanSearch size={17} aria-hidden="true" />
              Detect Invisible Characters
            </button>

            <button
              type="button"
              onClick={onTrySample}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-700 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-300"
            >
              <Sparkles size={16} aria-hidden="true" />
              Try Sample
            </button>
          </div>
        </div>

        <div className="bg-gray-50/50 p-5 sm:p-6 dark:bg-slate-950/40">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <label htmlFor="invisible-character-output" className="text-sm font-semibold text-gray-900 dark:text-white">Cleaned Text</label>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-500">{hasScanned ? "Updates as you select characters to remove." : "Your cleaned text will appear after scanning."}</p>
            </div>

            {hasScanned && cleanedText && (
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-700 dark:hover:text-cyan-300"
              >
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>

          <textarea
            id="invisible-character-output"
            value={hasScanned ? cleanedText : ""}
            readOnly
            rows={13}
            spellCheck={false}
            placeholder="Scan your text to see the cleaned result..."
            className="min-h-[300px] w-full resize-y rounded-xl border border-gray-200 bg-white p-4 text-[15px] leading-7 text-gray-900 outline-none placeholder:text-gray-400 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-600"
          />

          {hasScanned && (
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs leading-5 text-gray-500 dark:text-slate-500">Only the character types selected in the scan report are changed.</p>

              <span className="shrink-0 text-xs font-medium tabular-nums text-gray-500 dark:text-slate-400">{cleanedText.length.toLocaleString()} chars</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}