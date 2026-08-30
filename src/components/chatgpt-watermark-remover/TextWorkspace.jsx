import { Check, Copy, Download, RotateCcw, ScanSearch, Sparkles } from "lucide-react"

export default function TextWorkspace({ input, cleanedText, hasScanned, copied, maxCharacters, onInputChange, onAnalyze, onTrySample, onPaste, onCopy, onDownload, onReset }) {
  const handlePaste = (event) => {
    onPaste?.({
      plainText: event.clipboardData?.getData("text/plain") || "",
      htmlText: event.clipboardData?.getData("text/html") || "",
    })
  }

  return (
    <div>
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-gray-200 p-5 dark:border-white/10 lg:border-b-0 lg:border-r sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <label htmlFor="watermark-input" className="text-sm font-semibold text-gray-900 dark:text-white">ChatGPT Text</label>
            <span className="text-xs text-gray-500 dark:text-slate-400">{input.length.toLocaleString()} / {maxCharacters.toLocaleString()}</span>
          </div>

          <textarea id="watermark-input" value={input} maxLength={maxCharacters} onPaste={handlePaste} onChange={(event) => onInputChange(event.target.value)} placeholder="Paste ChatGPT text here to inspect hidden Unicode and unusual characters..." spellCheck="false" className="min-h-[330px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600" />

          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={onAnalyze} disabled={!input} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">
              <ScanSearch size={16} aria-hidden="true" />
              Scan Text
            </button>

            <button type="button" onClick={onTrySample} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">
              <Sparkles size={16} aria-hidden="true" />
              Try Sample
            </button>

            <button type="button" onClick={onReset} className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/5">
              <RotateCcw size={15} aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Cleaned Text</span>
              {hasScanned && <span className="ml-2 text-xs text-gray-400">{cleanedText.length.toLocaleString()} characters</span>}
            </div>

            <div className="flex gap-1">
              <button type="button" onClick={onCopy} disabled={!hasScanned} className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-white/10">
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </button>

              <button type="button" onClick={onDownload} disabled={!hasScanned} className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-white/10">
                <Download size={14} aria-hidden="true" />
                Download
              </button>
            </div>
          </div>

          <textarea value={hasScanned ? cleanedText : ""} readOnly placeholder="Your cleaned preview will appear here after the scan..." spellCheck="false" className="min-h-[330px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600" />

          <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-slate-400">The cleaned preview changes as you select or deselect character types below. Your wording is not rewritten.</p>
        </div>
      </div>
    </div>
  )
}