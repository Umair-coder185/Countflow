// src/components/home/Faq.jsx
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/homeData";

export default function Faq() {
  return (
    <section className="bg-slate-50 px-4 py-12 dark:bg-slate-900 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180 dark:text-slate-400"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}