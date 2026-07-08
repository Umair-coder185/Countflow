"use client"

import Link from "next/link"
import { Mail, Github, Twitter, Linkedin, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-3">
                Countflows
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                Premium writing tools for creators, writers, and professionals. Count words, analyze readability, and optimize your content instantly.
              </p>
              <div className="flex gap-3">
                <a href="https://twitter.com/umairrbuilds" target="_blank" rel="noopener noreferrer" className="inline-flex p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <Twitter size={18} />
                </a>
                <a href="https://www.linkedin.com/in/umair-nextjs-dev" target="_blank" rel="noopener noreferrer" className="inline-flex p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <Github size={18} />
                </a>
              </div>
            </div>

            {/* Tools Section */}
            <div>
              <h3 className="font-semibold text-base mb-5 text-white">Tools</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/tools/word-counter" className="text-sm text-slate-400 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition">Word Counter</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/character-counter" className="text-sm text-slate-400 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition">Character Counter</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/reading-time" className="text-sm text-slate-400 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition">Reading Time</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/sentence-calculator" className="text-sm text-slate-400 hover:text-cyan-400 transition flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition">Sentence Calculator</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="font-semibold text-base mb-5 text-white">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    Terms & Conditions
                  </Link>
                </li>
                 <li>
                  <Link href="/about-us" className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    About us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="font-semibold text-base mb-5 text-white">Stay Updated</h3>
              <p className="text-sm text-slate-400 mb-4">
                Get writing tips and tool updates delivered to your inbox.
              </p>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:bg-white/10 transition"
                />
                <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:from-cyan-400 hover:to-violet-400 transition flex items-center justify-center gap-2">
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8 md:my-12" />

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-sm text-slate-400 text-center md:text-left">
              <p>© {new Date().getFullYear()} Countflows. All rights reserved.</p>
              <p className="mt-2 text-xs text-slate-500">
                Made with <span className="text-cyan-400">❤</span> for writers and creators
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-slate-400">
              <Link href="/privacy-policy" className="hover:text-cyan-400 transition">
                Privacy
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/terms" className="hover:text-cyan-400 transition">
                Terms
              </Link>
              <span className="text-white/20">•</span>
              <a href="mailto:contact@countflow.com" className="hover:text-cyan-400 transition">
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer for AdSense */}
        <div className="bg-white/5 border-t border-white/10 px-4 sm:px-6 lg:px-8 py-4">
          <p className="max-w-7xl mx-auto text-xs text-slate-500 text-center">
            Countflows is an independent service. We are not affiliated with any third parties. This site may contain affiliate links and advertisements.
          </p>
        </div>
      </div>
    </footer>
  )
}
