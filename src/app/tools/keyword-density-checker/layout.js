import {keywordDensityToolSchema } from "@/lib/schema";
export const metadata = {
  title: "Free Keyword Density Checker - Analyze Keyword Frequency & Density",
  description:
    "Check keyword density online for free with Countflows. Analyze 1, 2 and 3-word phrase frequency and density percentages instantly. Perfect for SEO writers, bloggers and content creators.",
  keywords:
    "keyword density checker, free keyword density tool, keyword frequency counter, seo keyword analyzer, word density checker, keyword density calculator, on page seo tool",
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
        alt: "Countflows Keyword Density Checker",
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