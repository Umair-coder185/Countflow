import Image from "next/image";
import Link from "next/link";

const AUTHOR_NAME = "Umair Tufail";
const AUTHOR_ROLE = "Content writer and Next.js developer";

export default function AboutBlock() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 md:py-20 lg:px-8">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.14),_transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 px-6 py-10 shadow-[0_24px_90px_-46px_rgba(15,23,42,0.24)] backdrop-blur dark:border-slate-700/80 dark:bg-slate-950/90 dark:shadow-[0_24px_90px_-46px_rgba(15,23,42,0.45)] sm:px-10 sm:py-12">

          <div className="grid items-center gap-8 md:grid-cols-[190px_1fr] md:gap-10">

            {/* Founder image */}
            <div className="mx-auto">
              <div className="relative h-52 w-44 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-lg shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 sm:h-56 sm:w-48">
                <Image
                  src="/images/umair-tufail.webp"
                  alt="Umair Tufail, founder of CountFlows"
                  fill
                  sizes="(max-width: 768px) 176px, 192px"
                  className="object-cover object-[50%_18%]"
                />
              </div>
            </div>

            {/* Founder content */}
            <div className="text-center md:text-left">

              <span className="mb-4 inline-flex rounded-full bg-blue-100/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                About the founder
              </span>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Who Builds CountFlows
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                CountFlows is built and maintained by{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {AUTHOR_NAME}
                </span>
                , a <span className="font-semibold text-slate-900 dark:text-white">{AUTHOR_ROLE}</span> focused on building practical, browser-based
                tools for writing, text analysis, SEO, and AI workflows. Every
                tool is designed to be simple, useful, and accessible without
                unnecessary signup requirements.
              </p>

              <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
                Have a tool request or found a bug?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-300 dark:hover:text-blue-200"
                >
                  Contact us
                </Link>{" "}
                or{" "}
                <Link
                  href="/about-us"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-300 dark:hover:text-blue-200"
                >
                  read more about the site
                </Link>
                .
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}