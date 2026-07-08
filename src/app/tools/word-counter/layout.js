import { wordCounterToolSchema } from "@/lib/schema";



export const metadata = {
  title: "Free Word Counter Online - Instant Word, Character & Sentence Count",
  description: "Count words, characters, sentences and paragraphs instantly with Countflow's free online word counter. Perfect for writers, students, bloggers and content creators. Get accurate text analysis in real-time.",
  keywords: "word counter, free word counter online, count words, word count tool, character counter, sentence counter, paragraph counter, text analyzer",
  openGraph: {
    title: "Free Word Counter Online - Instant Text Analysis",
    description: "Count words, characters, sentences and paragraphs instantly. Advanced analytics and readability scores.",
    url: "https://countflows.com/tools/word-counter",
    type: "website",
    images: [{
      url: "https://countflows.com/blogs/blog6-1.png",
      width: 1200,
      height: 630,
      alt: "Countflows Word Counter"
    }]
  },
  alternates: {
    canonical: "https://countflows.com/tools/word-counter"
  }
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wordCounterToolSchema) }}
      />
      {children}
    </>
  );
}

