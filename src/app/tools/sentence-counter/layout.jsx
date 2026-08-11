import { sentenceCounterToolSchema } from "@/lib/schema";



export const metadata = {
  title: "Free Sentence Counter - Analyze Sentence Structure & Readability",
  description: "Use our free sentence counter to check your writing! Get insights on sentence length and quality. It's great for students, writers, and content creators!",
  keywords: "sentence counter, sentence analyzer, count sentences, sentence length analyzer, readability checker, writing quality analyzer, sentence structure tool",
  openGraph: {
    title: "Free Sentence Counter - Analyze Sentence Structure",
    description: "Count sentences and analyze writing structure instantly. Improve readability and sentence quality.",
    url: "https://countflows.com/tools/sentence-counter",
    type: "website",
    images: [{
      url: "https://countflows.com/public/blogs/blog5-1.png",
      width: 1200,
      height: 630,
      alt: "Countflows Sentence Counter"
    }]
  },
  alternates: {
    canonical: "https://countflows.com/tools/sentence-counter"
  }
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sentenceCounterToolSchema) }}
      />
      {children}
    </>
  );
}
