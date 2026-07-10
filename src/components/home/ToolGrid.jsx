// src/components/home/ToolGrid.jsx
import Link from "next/link";
import { toolCategories, comingNext } from "@/lib/homeData";

export default function ToolGrid() {
  return (
    <section
      id="tools"
      className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.16),_transparent_40%)]" />
      <div className="mx-auto max-w-6xl relative">
       
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          All CountFlows{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Tools
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 dark:text-slate-400 sm:text-lg">
          Pick a tool and paste your text. Results appear instantly, and nothing
          is uploaded.
        </p>

        <div className="mt-12 space-y-12">
          {toolCategories.map((cat) => {
            // Defensive: skip any category whose tools array is missing,
            // instead of crashing the whole page.
            const liveTools = (cat.tools ?? []).filter((tool) => tool.live);
            if (liveTools.length === 0) return null;

            return (
              <div key={cat.category}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {cat.category}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {liveTools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="group rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_20px_90px_-48px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_26px_80px_-40px_rgba(59,130,246,0.2)] dark:border-slate-700/80 dark:bg-slate-950/85 dark:shadow-[0_20px_90px_-48px_rgba(15,23,42,0.45)]"
                    >
                      <div className="flex items-center gap-3">
                        <tool.icon
                          className="h-5 w-5 shrink-0 text-blue-500"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {tool.name}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-gray-600 dark:text-slate-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            Coming next:
          </span>{" "}
          {comingNext.join(" \u00b7 ")}. No email list, no waiting page. New tools
          simply appear here when they are ready.
        </p>
      </div>
    </section>
  );
}