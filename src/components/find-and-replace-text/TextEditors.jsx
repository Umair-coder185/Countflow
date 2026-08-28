import {
  Check,
  Copy,
  Download,
} from "lucide-react"

export default function TextEditors({
  input,
  result,
  hasRun,
  copied,
  maxCharacters,
  onInputChange,
  onCopy,
  onDownload,
}) {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="border-b border-gray-200 p-5 dark:border-white/10 lg:border-b-0 lg:border-r sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <label
            htmlFor="find-replace-input"
            className="text-sm font-semibold text-gray-900 dark:text-white"
          >
            Original Text
          </label>

          <span className="text-xs text-gray-500 dark:text-slate-400">
            {input.length.toLocaleString()} /{" "}
            {maxCharacters.toLocaleString()}
          </span>
        </div>

        <textarea
          id="find-replace-input"
          value={input}
          onChange={(event) =>
            onInputChange(
              event.target.value
            )
          }
          placeholder="Paste or type your text here..."
          spellCheck="false"
          className="min-h-[300px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Result
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onCopy}
              disabled={!hasRun}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {copied ? (
                <Check
                  size={14}
                  aria-hidden="true"
                />
              ) : (
                <Copy
                  size={14}
                  aria-hidden="true"
                />
              )}

              {copied
                ? "Copied"
                : "Copy"}
            </button>

            <button
              type="button"
              onClick={onDownload}
              disabled={!hasRun}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Download
                size={14}
                aria-hidden="true"
              />
              Download
            </button>
          </div>
        </div>

        <textarea
          value={result}
          readOnly
          placeholder="Your updated text will appear here..."
          spellCheck="false"
          className="min-h-[300px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
        />
      </div>
    </div>
  )
}