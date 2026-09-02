// src/lib/homeData.js
// Single source of truth for all homepage content.
// The `faqs` array feeds BOTH the visible FAQ section and the FAQPage
// JSON-LD schema, so they can never drift out of sync.

import { FileText, Type, ListOrdered, Music4, Hash, Clock3, SearchCheck, CaseSensitive, Sparkles, Eraser, GitCompareArrows, Repeat2, ReplaceAll, ScanSearch, EyeOff } from "lucide-react";
export const toolCategories = [
  {
    category: "Text Cleaning and Formatting",
    tools: [
      {
        name: "AI Text Cleaner",
        href: "/tools/ai-text-cleaner",
        icon: Sparkles,
        description: "Clean Markdown, unusual spacing, smart punctuation, and copy-paste formatting while preserving your original wording.",
        live: true,
      },
      {
        name: "Invisible Character Detector",
        href: "/tools/invisible-character-detector",
        icon: EyeOff,
        description: "Detect zero-width spaces, non-breaking spaces, and other hidden Unicode characters that can affect copying, search, or formatting.",
        live: true,
      },
      {
        name: "ChatGPT Watermark Remover",
        href: "/tools/chatgpt-watermark-remover",
        icon: ScanSearch,
        description: "Clean hidden Unicode, zero-width characters, unusual spaces, and copy-paste artifacts from ChatGPT text.",
        live: true,
      },
      {
        name: "Find & Replace Text",
        href: "/tools/find-and-replace-text",
        icon: ReplaceAll,
        description: "Find and replace words, phrases, characters, or multiple text values with advanced matching options.",
        live: true,
      },
      {
        name: "Text Compare",
        href: "/tools/text-compare",
        icon: GitCompareArrows,
        description: "Compare two texts online and instantly highlight added, removed, and changed text.",
        live: true,
      },
      {
        name: "Remove Line Breaks",
        href: "/tools/remove-line-breaks",
        icon: Eraser,
        description: "Strip unwanted line breaks from text pasted from PDFs, emails, documents, and websites.",
        live: true,
      },
      {
        name: "Case Converter",
        href: "/tools/case-converter",
        icon: CaseSensitive,
        description: "Convert text to sentence case, Title Case, UPPERCASE, or lowercase in one click.",
        live: true,
      },
    ],
  },

  {
    category: "Reading and Speech",
    tools: [
      {
        name: "Reading Time Calculator",
        href: "/tools/reading-time",
        icon: Clock3,
        description: "Estimate reading and speaking time using research-based reading speed averages.",
        live: true,
      },
    ],
  },

  {
    category: "SEO Tools",
    tools: [
      {
        name: "Keyword Density Checker",
        href: "/tools/keyword-density-checker",
        icon: SearchCheck,
        description: "Check keyword density by word and phrase, and review repeated keyword usage before publishing.",
        live: true,
      },
    ],
  },

  {
    category: "Counting Tools",
    tools: [
      {
        name: "Word Counter",
        href: "/tools/word-counter",
        icon: FileText,
        description: "Count words, characters, and sentences as you type, with a word goal tracker and readability score.",
        live: true,
      },
      {
        name: "Character Counter",
        href: "/tools/character-counter",
        icon: Type,
        description: "Count characters with and without spaces, plus letters, lines, and paragraphs.",
        live: true,
      },
      {
        name: "Sentence Counter",
        href: "/tools/sentence-counter",
        icon: ListOrdered,
        description: "Count sentences and check your average sentence length for readability.",
        live: true,
      },
      {
        name: "Syllable Counter",
        href: "/tools/syllable-counter",
        icon: Music4,
        description: "Count syllables in any word, line, or poem, including the 5-7-5 haiku pattern.",
        live: true,
      },
      {
        name: "AI Token Counter",
        href: "/tools/ai-token-counter",
        icon: Hash,
        description: "Count tokens for GPT-5, Claude, and Gemini instantly, with word and character counts side by side.",
        live: true,
      },
    ],
  },

  {
    category: "Text Generators",
    tools: [
      {
        name: "Text Repeater",
        href: "/tools/text-repeater",
        icon: Repeat2,
        description: "Repeat any word or phrase as many times as you need, with custom separators.",
        live: true,
      },
    ],
  },
]

export const comingNext = [ "Small Text Generator",
  "SMS Segment Counter",];


export const characterLimits = [
  { platform: "X (Twitter) post", limit: "280" },
  { platform: "X Premium post", limit: "25,000" },
  { platform: "Instagram caption", limit: '2,200 (about 125 shown before "more")' },
  { platform: "Instagram bio", limit: "150" },
  { platform: "LinkedIn headline", limit: "220" },
  { platform: "LinkedIn post", limit: "3,000" },
  { platform: "TikTok caption", limit: "4,000" },
  { platform: "SMS text message", limit: "160 (70 with emoji or Unicode)" },
  { platform: "Google title tag", limit: "About 60 characters (580 pixels)" },
  { platform: "Google meta description", limit: "About 155 characters shown" },
  { platform: "YouTube title", limit: "100" },
  { platform: "Facebook post", limit: "63,206 (about 400 shown in feed)" },
];

export const blogPosts = [
  {
    title: "Average Reading Speed: What's Normal and How to Test Yours",
    href: "/blog/average-reading-speed",
    description:
      "Research puts the adult average at 238 words per minute. See where you stand and how to test yourself in 3 minutes.",
  },
  {
    title: "How to Calculate Words Per Minute Reading",
    href: "/blog/how-to-calculate-words-per-minute-reading",
    description:
      "The WPM formula with worked examples, plus the one conversion mistake that ruins most people's numbers.",
  },
  {
    title: "How Long Does It Take to Read 10,000 Words?",
    href: "/blog/how-long-does-it-take-to-read-10000-words",
    description:
      "About 42 minutes at an average pace. The full breakdown covers skimming, studying, and reading aloud.",
  },
  {
    title: "How to Read Faster Without Losing Comprehension",
    href: "/blog/how-to-read-faster",
    description:
      "Six habits that raise your pace without turning reading into skimming.",
  },
];

export const faqs = [
  {
    question: "Are the CountFlows tools free?",
    answer:
      "Yes. Every tool is completely free with no registration, no word limits, and no premium tier. The site is supported by ads, not subscriptions.",
  },
  {
    question: "Is my text stored or uploaded when I use these tools?",
    answer:
      "No. All counting happens inside your browser on your own device. Your text is never sent to our servers, so there is nothing for us to store, read, or share.",
  },
  {
    question: "Why does my word count differ from Microsoft Word or Google Docs?",
    answer:
      "Each program counts slightly differently. Hyphenated words, numbers, and symbols can be counted as one word or two depending on the tool. Differences of a few words on long documents are normal. For an assignment, always follow the count from the tool your instructor specifies.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "We divide your word count by research-based averages: 238 words per minute for silent reading and 183 for reading aloud (Brysbaert, 2019). Your personal speed will vary, so treat the estimate as a starting point and test your own pace with the Reading Time Calculator.",
  },
  {
    question: "Do in-text citations count toward my word count?",
    answer:
      "It depends on your institution. Many universities exclude reference lists but include in-text citations. Check your assignment brief first, then subtract your reference section from the total if it is excluded.",
  },
  {
    question: "How do I count characters for Instagram, X, or SMS?",
    answer:
      "Paste your caption or message into the Character Counter and compare the result with the limit: 2,200 for Instagram captions, 280 for a standard X post, and 160 for one SMS.",
  },
  {
    question: "Why is character count important for writers?",
    answer:
      "Many fields have hard limits: meta descriptions, social bios, ad headlines, and SMS all cut text past a fixed length. Counting characters before you publish prevents truncated titles and split messages.",
  },
  {
    question: "What is a keyword density checker?",
    answer:
      "It shows how often each word or phrase appears in your text as a percentage of total words. Writers use it to keep keyword usage natural, since over-repeating a phrase reads badly and can trigger over-optimization signals in search engines.",
  },
];