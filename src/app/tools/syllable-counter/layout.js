
const PAGE_URL = "https://countflows.com/tools/syllable-counter";
const OG_IMAGE = "https://countflows.com/og-image.png";

const SEO_TITLE = "Free Syllable Counter & Haiku Checker | CountFlows";
const SEO_DESCRIPTION = "Free online syllable counter and checker. Count syllables in words, sentences, poems and lyrics with line-by-line results and a 5-7-5 haiku checker.";

export const metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: SEO_TITLE,
    description: "Count syllables in words, poems, haiku and song lyrics instantly. See per-word and line-by-line counts, plus a free 5-7-5 haiku checker.",
    url: PAGE_URL,
    siteName: "CountFlows",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CountFlows Syllable Counter and Haiku Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Layout({ children }) {
  return children;
}
