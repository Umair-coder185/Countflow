// app/tools/syllable-counter/layout.js
// SERVER file — metadata only.
// Keep structured data/schema in page.jsx to avoid duplication.

export const metadata = {
  title: "Free Syllable Counter for Poems, Haiku & Lyrics | CountFlows",

  description:
    "Count syllables instantly in words, poems, haiku and song lyrics. Check each line and validate 5-7-5 haiku patterns with our free online syllable counter.",

  alternates: {
    canonical: "https://countflows.com/tools/syllable-counter",
  },

  openGraph: {
    title: "Free Syllable Counter for Poems, Haiku & Lyrics | CountFlows",

    description:
      "Count syllables in words, poems, haiku and song lyrics instantly. Includes line-by-line counts and a free 5-7-5 haiku checker.",

    url: "https://countflows.com/tools/syllable-counter",

    siteName: "CountFlows",

    type: "website",

    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Syllable Counter for Poems, Haiku and Lyrics",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Free Syllable Counter for Poems, Haiku & Lyrics | CountFlows",

    description:
      "Count syllables line by line in poems, haiku and song lyrics with a free 5-7-5 haiku checker.",

    images: ["https://countflows.com/og-image.png"],
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
}

export default function Layout({ children }) {
  return children
}