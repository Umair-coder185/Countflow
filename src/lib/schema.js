// lib/schema.js
import { caseConverterFAQs } from "@/lib/faqData"; // ← needed for the FAQ schema below

const siteUrl = "https://countflows.com";

// ============================================
// 1. ORGANIZATION — site-wide identity
// (root layout mein ek baar inject hogi)
// ============================================
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}#organization`,
  name: "Countflows",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
  },
  description:
    "Free online writing analysis tools including word counter, character counter, reading time calculator, sentence analyzer, and keyword density checker",
  sameAs: [
    "https://twitter.com/countflows",
    "https://facebook.com/countflows",
    "https://linkedin.com/company/countflows",
  ],
};

// ============================================
// 2. WEBSITE — site-level schema
// ============================================
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  name: "Countflows",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}#organization` },
};

// ============================================
// 3. TOOL SCHEMA FACTORY
// ============================================
function createToolSchema({ name, description, path, features }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${siteUrl}${path}#webapp`,
    name: `${name} - Countflows`,
    description,
    url: `${siteUrl}${path}`,
    applicationCategory: "UtilitiesApplication",
    browserRequirements: "Requires JavaScript. Works in all modern browsers.",
    featureList: features,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: { "@id": `${siteUrl}#organization` },
  };
}

// ============================================
// 4. TOOL SCHEMAS
// ============================================
export const wordCounterToolSchema = createToolSchema({
  name: "Word Counter",
  description:
    "Free online word counter tool to instantly count words, characters, sentences and paragraphs",
  path: "/tools/word-counter",
  features: [
    "Real-time word and character counting",
    "Sentence and paragraph counts",
    "Goal tracker with progress bar",
  ],
});

export const characterCounterToolSchema = createToolSchema({
  name: "Character Counter",
  description:
    "Free online character counter to count characters, letters, spaces and symbols instantly",
  path: "/tools/character-counter",
  features: [
    "Character count with and without spaces",
    "Letter and symbol counting",
    "Social media character limit checking",
  ],
});

export const readingTimeToolSchema = createToolSchema({
  name: "Reading Time Calculator",
  description:
    "Free reading time calculator to estimate how long content takes to read and speak",
  path: "/tools/reading-time",
  features: [
    "Reading time estimation",
    "Speaking time estimation",
    "Adjustable reading speed (WPM)",
  ],
});

export const sentenceCounterToolSchema = createToolSchema({
  name: "Sentence Counter",
  description:
    "Free sentence counter and analyzer to count sentences and analyze writing structure",
  path: "/tools/sentence-calculator",
  features: [
    "Sentence counting",
    "Average sentence length analysis",
    "Writing structure insights",
  ],
});

export const keywordDensityToolSchema = createToolSchema({
  name: "Keyword Density Checker",
  description:
    "Free online keyword density checker that analyzes single words and 2–3 word phrases with frequency and density percentages",
  path: "/tools/keyword-density-checker",
  features: [
    "Keyword density percentage analysis",
    "1, 2 and 3-word phrase frequency",
    "Stop word filtering",
    "Copy and export results",
  ],
});

export const caseConverterToolSchema = createToolSchema({
  name: "Case Converter",
  description:
    "Free online case converter. Convert text to UPPERCASE, lowercase, Title Case, Sentence case, Capitalized Case, and more — entirely in your browser.",
  path: "/tools/case-converter",
  features: [
    "Convert to UPPERCASE",
    "Convert to lowercase",
    "Convert to Title Case",
    "Convert to Sentence case",
    "Convert to Capitalized Case",
    "Convert to aLtErNaTiNg cAsE",
    "Convert to InVeRsE cAsE",
  ],
});

// ============================================
// 5. CASE CONVERTER — page-specific schemas
// ============================================
export const caseConverterBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
    { "@type": "ListItem", position: 3, name: "Case Converter", item: `${siteUrl}/tools/case-converter` },
  ],
};

export const caseConverterFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: caseConverterFAQs.map((f) => ({
    "@type": "Question",
    name: f.question.trim(),
    acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
  })),
};

// ============================================
// 6. SITE-WIDE FAQ (homepage)
// ============================================
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Countflows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Countflows is a suite of free online writing analysis tools including word counter, character counter, reading time calculator, and sentence analyzer. Perfect for writers, students, bloggers, and content creators.",
      },
    },
    {
      "@type": "Question",
      name: "Is Countflows free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Countflows is completely free to use. No registration or subscription required.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the word counter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our word counter is 100% accurate. It counts all words including hyphenated words and contractions according to standard word count rules.",
      },
    },
  ],
};