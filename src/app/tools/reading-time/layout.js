export const metadata = {
  title: "Free Reading Time Calculator - Estimate Article Reading Speed",
  description: "Calculate reading time and speaking time for your content with Countflow's free reading time calculator. Perfect for bloggers, content creators, and publishers. Get accurate reading duration estimates instantly.",
  keywords: "reading time calculator, reading time estimator, estimate reading time, word reading speed, average reading time, time to read calculator, speaking time calculator",
  openGraph: {
    title: "Free Reading Time Calculator - Estimate Reading Duration",
    description: "Calculate reading time and speaking time for your content. Perfect for bloggers and publishers.",
    url: "https://countflow.com/tools/reading-time",
    type: "website",
    images: [{
      url: "https://countflow.com/reading-time-og.png",
      width: 1200,
      height: 630,
      alt: "Countflow Reading Time Calculator"
    }]
  },
  alternates: {
    canonical: "https://countflow.com/tools/reading-time"
  }
}

export default function Layout({ children }) {
  return children
}
