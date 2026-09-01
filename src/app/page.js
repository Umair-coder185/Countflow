// src/app/page.jsx

import Hero from "@/components/home/Hero"
import ToolGrid from "@/components/home/ToolGrid"
import ToolComparison from "@/components/home/ToolComparison"
import LimitsCheatSheet from "@/components/home/LimitsCheatSheet"
import WhyCountFlows from "@/components/home/WhyCountFlows"
import BlogStrip from "@/components/home/BlogStrip"
import AboutBlock from "@/components/home/AboutBlock"
import Faq from "@/components/home/Faq"
import HomeJsonLd from "@/components/seo/HomeJsonLd"

const title =
  "Free Online Text Tools for Writing, SEO & AI | CountFlows"

const description =
  "Free online text tools to count words, characters, sentences, syllables and AI tokens, check keyword density and reading time, and clean text instantly."

export const metadata = {
  title,
  description,

  alternates: {
    canonical: "https://countflows.com/",
  },

  openGraph: {
    title,
    description,
    url: "https://countflows.com/",
    siteName: "CountFlows",
    type: "website",

    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows free online text tools for writing, SEO and AI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://countflows.com/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <main>
        <Hero />
        <ToolGrid />
        <ToolComparison />
        <LimitsCheatSheet />
        <WhyCountFlows />
        <BlogStrip />
        <AboutBlock />
        <Faq />
      </main>
    </>
  )
}