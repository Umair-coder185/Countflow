export const metadata = {
  title: "Free Word Counter Online - Instant Word, Character & Sentence Count",
  description: "Count words, characters, sentences and paragraphs instantly with Countflow's free online word counter. Perfect for writers, students, bloggers and content creators. Get accurate text analysis in real-time.",
  keywords: "word counter, free word counter online, count words, word count tool, character counter, sentence counter, paragraph counter, text analyzer",
  openGraph: {
    title: "Free Word Counter Online - Instant Text Analysis",
    description: "Count words, characters, sentences and paragraphs instantly. Advanced analytics and readability scores.",
    url: "https://countflow.com/tools/word-counter",
    type: "website",
    images: [{
      url: "https://countflow.com/word-counter-og.png",
      width: 1200,
      height: 630,
      alt: "Countflow Word Counter"
    }]
  },
  alternates: {
    canonical: "https://countflow.com/tools/word-counter"
  }
}

export default function Layout({ children }) {
  return children
}
