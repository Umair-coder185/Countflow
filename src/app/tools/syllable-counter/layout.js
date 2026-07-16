// app/tools/syllable-counter/layout.js
// SERVER file - metadata only. Schema yahan NAHI (duplicate-schema bug se bachne ke liye
// teeno schemas sirf page.jsx mein hain). No "keywords" meta - Google ignores it.

export const metadata = {
  title: "Free Syllable Counter - Count Syllables Online | CountFlows",
  description:
    "Use our free syllable counter to count syllables in any word, lyrics or poem instantly, with a built-in 5-7-5 haiku checker. Free, runs in your browser - your text is never uploaded.",
  openGraph: {
    title: "Free Syllable Counter - Count Syllables Online",
    description:
      "Count syllables in any word, sentence, or poem instantly, with a built-in 5-7-5 haiku checker. 100% free and private.",
    url: "https://countflows.com/tools/syllable-counter",
    type: "website",
    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Syllable Counter",
      },
    ],
  },
  alternates: {
    canonical: "https://countflows.com/tools/syllable-counter",
  },
}

export default function Layout({ children }) {
  return children
}