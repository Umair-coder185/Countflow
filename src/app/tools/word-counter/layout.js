export const metadata = {
  title: "Free Word Counter Online - Instant Word, Character & Sentence Count",
  description:
    "Count words, characters, sentences and paragraphs instantly with CountFlows' free online word counter. Perfect for writers, students, bloggers and content creators. Get accurate text analysis in real-time.",
  openGraph: {
    title: "Free Word Counter Online - Instant Word, Character & Sentence Count",
    description:
      "Count words, characters, sentences and paragraphs instantly. Goal tracking, readability and word frequency — free, no signup.",
    url: "https://countflows.com/tools/word-counter",
    type: "website",
    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Word Counter",
      },
    ],
  },
  alternates: {
    canonical: "https://countflows.com/tools/word-counter",
  },
}

export default function Layout({ children }) {
  return children
}