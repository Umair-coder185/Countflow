import { ClipboardCheck } from "lucide-react"

export default function ClipboardDetails({ info }) {
  if (!info) return null

  return (
    <div className="border-t border-gray-200 px-5 py-4 dark:border-white/10 sm:px-6">
      <div className="flex items-start gap-3">
        <ClipboardCheck size={18} className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Clipboard Inspector</h3>

          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">
            {info.hasHtml
              ? "Your last paste included a rich HTML clipboard layer in addition to plain text."
              : "Your last paste exposed plain text only. No rich HTML clipboard layer was available to this browser."}
          </p>

          {info.hasHtml && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip>{info.tagCount} HTML tags</Chip>
              <Chip>{info.inlineStyleCount} inline styles</Chip>
              <Chip>{info.classAttributeCount} class attributes</Chip>
              <Chip>{info.dataAttributeCount} data attributes</Chip>
              {info.commentCount > 0 && <Chip>{info.commentCount} comments</Chip>}
            </div>
          )}

          <p className="mt-2 text-xs leading-5 text-gray-400 dark:text-slate-500">Rich clipboard markup is normal when copying formatted content. Its presence alone does not prove that a watermark exists.</p>
        </div>
      </div>
    </div>
  )
}

function Chip({ children }) {
  return <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-400">{children}</span>
}