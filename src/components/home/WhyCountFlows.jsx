// src/components/home/WhyCountFlows.jsx
import { ShieldCheck, Zap, Ruler } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Private by design",
    description:
      "Every tool runs entirely in your browser. Your text is never uploaded to a server, never logged, and never stored. Close the tab and it is gone.",
  },
  {
    icon: Zap,
    title: "Instant and unlimited",
    description:
      "Counts update as you type. There is no button to press, no sign-up wall, no word limit, and no paywall. Paste a tweet or a whole novel.",
  },
  {
    icon: Ruler,
    title: "Built for real limits",
    description:
      "Essay word counts, platform caption limits, meta description lengths, and reading time built on published research averages (238 words per minute, Brysbaert 2019). Real numbers, not guesses.",
  },
];

export default function WhyCountFlows() {
  return (
    <section className="bg-white px-4 py-12 dark:bg-slate-950 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Why Writers Use CountFlows
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-xl border border-gray-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <reason.icon
                className="h-8 w-8 text-blue-500"
                aria-hidden="true"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}