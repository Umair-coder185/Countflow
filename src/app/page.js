// src/app/page.jsx
import Hero from "@/components/home/Hero";
import ToolGrid from "@/components/home/ToolGrid";
import LimitsCheatSheet from "@/components/home/LimitsCheatSheet";
import WhyCountFlows from "@/components/home/WhyCountFlows";
import BlogStrip from "@/components/home/BlogStrip";
import AboutBlock from "@/components/home/AboutBlock";
import Faq from "@/components/home/Faq";
import HomeJsonLd from "@/components/seo/HomeJsonLd";

const description =
  "Free word counter, character counter, sentence counter,case converter and reading time calculator. Instant results as you type, no sign-up, and your text never leaves your browser.";

export const metadata = {
  title: "Countflows: Free Word & Character Counter Tools",
  description,
  alternates: { canonical: "https://countflows.com/" },
  openGraph: {
    title: "Countflows: Free Word & Character Counter Tools",
    description,
    url: "https://countflows.com/",
    siteName: "CountFlows",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Countflows: Free Word & Character Counter Tools",
    description,
  },
};

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <ToolGrid />
      <LimitsCheatSheet />
      <WhyCountFlows />
      <BlogStrip />
      <AboutBlock />
      <Faq />
    </>
  );
}