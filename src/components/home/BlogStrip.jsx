// src/components/home/BlogStrip.jsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/homeData";

export default function BlogStrip() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-white px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 sm:px-6 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.16),_transparent_35%)]" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full bg-blue-100/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            Editor’s picks
          </span>
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Guides From the CountFlows Blog
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Practical reading, writing, and word-count guidance for creators who want polished results faster.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_20px_90px_-44px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_28px_80px_-40px_rgba(59,130,246,0.25)] dark:border-slate-700/80 dark:bg-slate-950/85 dark:shadow-[0_20px_90px_-44px_rgba(15,23,42,0.4)]"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h3 className="relative text-base font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {post.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {post.description}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm shadow-slate-200 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-500 dark:hover:bg-slate-900"
          >
            All guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}