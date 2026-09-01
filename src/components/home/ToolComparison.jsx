import Link from "next/link"
import { ArrowRight, Bot, Braces, CheckCircle2, Eye, ScanSearch } from "lucide-react"

const comparisonRows = [
  { label: "General invisible Unicode detection", detector: "Best choice", watermark: "Supported" },
  { label: "Zero-width character detection", detector: "Yes", watermark: "Yes" },
  { label: "Exact Unicode code points & positions", detector: "Yes", watermark: "Yes" },
  { label: "Code, JSON, CMS & data debugging", detector: "Best choice", watermark: "Limited" },
  { label: "Copied ChatGPT text inspection", detector: "Supported", watermark: "Best choice" },
  { label: "ChatGPT watermark-related questions", detector: "Not the main focus", watermark: "Best choice" },
]

export default function ToolComparison() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/70 bg-white py-16 sm:py-20 dark:border-white/5 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[-100px] h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl dark:bg-cyan-950/20" />
        <div className="absolute bottom-[-130px] right-[-100px] h-72 w-72 rounded-full bg-violet-100/40 blur-3xl dark:bg-violet-950/20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/30 dark:text-cyan-300">
            <ScanSearch size={14} aria-hidden="true" />
            Choose the right text inspector
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
            Invisible Character Detector vs ChatGPT Watermark Remover
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg dark:text-slate-400">
            <strong className="text-gray-900 dark:text-white">Use the Invisible Character Detector to inspect hidden Unicode in any text.</strong>{" "}
            Use the ChatGPT Watermark Remover when your question is specifically about hidden character artifacts in copied ChatGPT text.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <ToolCard
            href="/tools/invisible-character-detector"
            icon={Eye}
            eyebrow="General Unicode inspection"
            title="Invisible Character Detector"
            description="Find zero-width characters, unusual Unicode spaces and directional controls in text, code or copied data."
            points={[
              "Best for general hidden-character detection",
              "Shows Unicode code points and exact positions",
              "Useful for code, JSON, CMS and data debugging",
            ]}
            cta="Detect invisible characters"
            accent="cyan"
          />

          <ToolCard
            href="/tools/chatgpt-watermark-remover"
            icon={Bot}
            eyebrow="ChatGPT-specific inspection"
            title="ChatGPT Watermark Remover"
            description="Check copied ChatGPT text for supported hidden Unicode and character-level artifacts associated with watermark-related searches."
            points={[
              "Best for ChatGPT-specific watermark intent",
              "X-Ray view of supported hidden characters",
              "Selective cleanup without rewriting the text",
            ]}
            cta="Check ChatGPT text"
            accent="violet"
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="border-b border-gray-200 px-5 py-4 sm:px-6 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Braces size={18} aria-hidden="true" />
              </span>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Which tool should you use?</h3>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">The underlying characters may overlap, but the user intent is different.</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-950/70">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-900 sm:px-6 dark:text-white">What you need</th>
                  <th className="px-5 py-3 font-semibold text-gray-900 sm:px-6 dark:text-white">Invisible Character Detector</th>
                  <th className="px-5 py-3 font-semibold text-gray-900 sm:px-6 dark:text-white">ChatGPT Watermark Remover</th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t border-gray-200 dark:border-white/10">
                    <td className="px-5 py-3.5 font-medium text-gray-700 sm:px-6 dark:text-slate-300">{row.label}</td>
                    <td className="px-5 py-3.5 sm:px-6"><Result value={row.detector} /></td>
                    <td className="px-5 py-3.5 sm:px-6"><Result value={row.watermark} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-gray-500 dark:text-slate-400">
          Both tools inspect character-level text data rather than rewriting your content. If your problem is broader formatting such as Markdown, HTML, spacing or punctuation cleanup, use the{" "}
          <Link href="/tools/ai-text-cleaner" className="font-semibold text-cyan-700 underline decoration-cyan-300 underline-offset-4 hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
            AI Text Cleaner
          </Link>.
        </p>
      </div>
    </section>
  )
}

function ToolCard({ href, icon: Icon, eyebrow, title, description, points, cta, accent }) {
  const styles = accent === "violet"
    ? { icon: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300", label: "text-violet-700 dark:text-violet-300", hover: "hover:border-violet-300 dark:hover:border-violet-800", button: "group-hover:text-violet-700 dark:group-hover:text-violet-300" }
    : { icon: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300", label: "text-cyan-700 dark:text-cyan-300", hover: "hover:border-cyan-300 dark:hover:border-cyan-800", button: "group-hover:text-cyan-700 dark:group-hover:text-cyan-300" }

  return (
    <Link href={href} className={`group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 ${styles.hover}`}>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}>
        <Icon size={21} aria-hidden="true" />
      </div>

      <p className={`mt-5 text-xs font-semibold uppercase tracking-wide ${styles.label}`}>{eyebrow}</p>
      <h3 className="mt-1.5 text-xl font-bold text-gray-950 dark:text-white">{title}</h3>
      <p className="mt-3 leading-7 text-gray-600 dark:text-slate-400">{description}</p>

      <ul className="mt-5 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-gray-600 dark:text-slate-300">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition dark:text-white ${styles.button}`}>
        {cta}
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  )
}

function Result({ value }) {
  const strong = value === "Best choice" || value === "Yes"

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium ${strong ? "text-emerald-700 dark:text-emerald-300" : "text-gray-500 dark:text-slate-400"}`}>
      {strong && <CheckCircle2 size={14} aria-hidden="true" />}
      {value}
    </span>
  )
}