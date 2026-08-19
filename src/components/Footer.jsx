"use client"

import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, ArrowUpRight } from "lucide-react"

const featuredTools = [
  { name: "Word Counter", href: "/tools/word-counter" },
  { name: "AI Text Cleaner", href: "/tools/ai-text-cleaner" },
  { name: "Online Text Compare", href: "/tools/text-compare" },
  { name: "Keyword Density Checker", href: "/tools/keyword-density-checker" },
  { name: "AI Token Counter", href: "/tools/ai-token-counter" },
  { name: "Syllable Counter", href: "/tools/syllable-counter" },
]

const companyLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-100">
      {/* Subtle brand background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-14">
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label="CountFlows home"
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image
                  src="/images/countflows-logo.png"
                  alt="CountFlows logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>

              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-2xl font-bold text-transparent">
                CountFlows
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Free browser-based tools for writing, text analysis, SEO, and AI workflows.
              Fast, practical, and built to help you work with text more efficiently.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://twitter.com/umairrbuilds"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CountFlows on X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                <Twitter size={17} aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/umair-nextjs-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CountFlows on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                <Linkedin size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Featured tools */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">
              Popular Tools
            </h2>

            <ul className="mt-5 space-y-3">
              {featuredTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-cyan-300"
                  >
                    <span>{tool.name}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/tools"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View all tools
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">
              Company
            </h2>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition hover:text-cyan-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                Support
              </p>
              <a
                href="mailto:contact@countflows.com"
                className="mt-2 inline-block text-sm text-slate-400 transition hover:text-cyan-300"
              >
                contact@countflows.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 md:mt-12">
          <div className="flex flex-col gap-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} CountFlows. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/privacy-policy" className="transition hover:text-slate-300">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-slate-300">
                Terms
              </Link>
              <Link href="/contact" className="transition hover:text-slate-300">
                Contact
              </Link>
            </div>
          </div>

          <p className="mt-4 max-w-4xl text-xs leading-5 text-slate-600">
            CountFlows is an independent online tools platform. Some pages may contain
            advertisements or affiliate links, which help support the site without affecting
            how our tools work.
          </p>
        </div>
      </div>
    </footer>
  )}