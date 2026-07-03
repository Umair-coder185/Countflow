
import { characterCounterToolSchema } from "@/lib/schema";



export const metadata = {
  title: "Free Character Counter Online - Count Characters, Spaces & Letters",
  description: "Count characters, letters, and spaces instantly with Countflow's free online character counter. Ideal for social media posts, essays, and text analysis. Get accurate character counts with and without spaces.",
  keywords: "character counter, free character counter, count characters online, character counter tool, letter counter, text counter, character counter without spaces, character limit checker",
  openGraph: {
    title: "Free Character Counter Online - Instant Character Count",
    description: "Count characters, letters, and spaces instantly. Perfect for social media and content optimization.",
    url: "https://countflows.com/tools/character-counter",
    type: "website",
    images: [{
      url: "https://countflows.com/public/blogs/blog3-1.png",
      width: 1200,
      height: 630,
      alt: "Countflow Character Counter"
    }]
  },
  alternates: {
    canonical: "https://countflows.com/tools/character-counter"
  }
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(characterCounterToolSchema) }}
      />
      {children}
    </>
  );
}