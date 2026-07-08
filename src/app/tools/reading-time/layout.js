import { readingTimeToolSchema} from "@/lib/schema";

export const metadata = {
  title: "Free Reading Time Calculator - Estimate Article Reading Speed",
  description: "Calculate reading time and speaking time for your content with Countflow's free reading time calculator. Perfect for bloggers, content creators, and publishers. Get accurate reading duration estimates instantly.",
  keywords: "reading time calculator, reading time estimator, estimate reading time, word reading speed, average reading time, time to read calculator, speaking time calculator",
  openGraph: {
    title: "Free Reading Time Calculator - Estimate Reading Duration",
    description: "Calculate reading time and speaking time for your content. Perfect for bloggers and publishers.",
    url: "https://countflows.com/tools/reading-time",
    type: "website",
    images: [{
      url: "https://countflows.com/blogs/blog4-1.png",
      width: 1200,
      height: 630,
      alt: "Countflows Reading Time Calculator"
    }]
  },
  alternates: {
    canonical: "https://countflows.com/tools/reading-time"
  }
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(readingTimeToolSchema) }}
      />
      {children}
    </>
  );
}