import {keywordDensityToolSchema } from "@/lib/schema";
export const metadata = {
  title: "Free Keyword Density Checker - Analyze Keyword Frequency & Density",
  description:
    "Check keyword density and frequency for free with CountFlows. Analyze words and phrases, find repeated keywords, and optimize your content for SEO.",
    
  openGraph: {
    title: "Free Keyword Density Checker - Instant SEO Keyword Analysis",
    description:
      "Analyze keyword density and phrase frequency instantly. See single words and 2–3 word phrases with counts and percentages.",
    url: "https://countflows.com/tools/keyword-density-checker",
    type: "website",
    images: [
      {
        url: "https://countflows.com/blogs/blog3-2.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Keyword Density Checker",
      },
    ],
  },
  alternates: {
    canonical: "https://countflows.com/tools/keyword-density-checker",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(keywordDensityToolSchema ) }}
      />
      {children}
    </>
  );
}