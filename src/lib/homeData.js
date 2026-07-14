// src/lib/homeData.js
// Single source of truth for all homepage content.
// The `faqs` array feeds BOTH the visible FAQ section and the FAQPage
// JSON-LD schema, so they can never drift out of sync.

import {
  FileText,
  Type,
  ListOrdered,
  Music4,
  Clock3,
  SearchCheck,
  CaseSensitive,
  Eraser,
  Repeat2,
  Sparkles,
} from "lucide-react";

export const toolCategories = [
  {
    category: "Counting Tools",
    tools: [
      {
        name: "Word Counter",
        href: "/tools/word-counter",
        icon: FileText,
        description:
          "Count words, characters, and sentences as you type, with a word goal tracker and readability score.",
        live: true,
      },
      {
        name: "Character Counter",
        href: "/tools/character-counter",
        icon: Type,
        description:
          "Count characters with and without spaces, plus letters, lines, and paragraphs.",
        live: true,
      },
      {
        name: "Sentence Counter",
        href: "/tools/sentence-counter",
        icon: ListOrdered,
        description:
          "Count sentences and check your average sentence length for readability.",
        live: true,
      },
    //   {
    //     name: "Syllable Counter",
    //     href: "/tools/syllable-counter",
    //     icon: Music4,
    //     description:
    //       "Count syllables in any word, line, or poem, including the 5-7-5 haiku pattern.",
    //     live: false, // NEW: flip to true when the tool page ships
    //   },
    ],
  },
  {
    category: "Reading and Speech",
    tools: [
      {
        name: "Reading Time Calculator",
        href: "/tools/reading-time",
        icon: Clock3,
        description:
          "Estimate reading and speaking time using research-based averages (238 words per minute for silent reading).",
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
        description:
          "Check keyword density by word and phrase, and catch over-optimization before Google does.",
        live: true,
      },
    ],
  },
  {
    category: "Text Cleaning and Formatting",
    tools: [
      {
        name: "Case Converter",
        href: "/tools/case-converter",
       icon: CaseSensitive,
      description:
       "Convert text to sentence case, Title Case, UPPERCASE, or lowercase in one click.",
       live: true, // NEW: flip to true when the tool page ships
      },
    
      {
      name: "AI Text Cleaner",
      href: "/tools/ai-text-cleaner",
      icon: Sparkles,
      description:
        "Remove markdown symbols, em dashes, invisible characters, and smart quotes from ChatGPT and AI text in one click.",
      live: true,
    },
  ],
    //   {
    //     name: "Remove Line Breaks",
    //     href: "/tools/remove-line-breaks",
    //     icon: Eraser,
    //     description:
    //       "Strip unwanted line breaks from text pasted out of PDFs and emails instantly.",
    //     live: false, // NEW: flip to true when the tool page ships
    //   },
    // ],
  },
   {
//     category: "Text Generators",
//     tools: [
//       {
//         name: "Text Repeater",
//         href: "/tools/text-repeater",
//         icon: Repeat2,
//         description:
//           "Repeat any word or phrase as many times as you need, with custom separators.",
//         live: false, // NEW: flip to true when the tool page ships
//       },
//     //   {
//     //     name: "Small Text Generator",
//     //     href: "/tools/small-text-generator",
//     //     icon: Sparkles,
//     //     description:
//     //       "Turn normal text into tiny Unicode text and small caps for bios and comments.",
//     //     live: false, // NEW: flip to true when the tool page ships
//     //   },
//     ],
  },
];

export const comingNext = [
  "AI Token Counter",
  "Small Text Generator",
  "SMS Segment Counter",
];

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