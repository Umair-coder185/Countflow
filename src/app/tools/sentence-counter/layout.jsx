export const metadata = {
  title: "Free Sentence Counter & Sentence Length Checker | CountFlows",

  description:
    "Count sentences instantly and check average sentence length, longest and shortest sentences, and word count. Free online sentence counter with no sign-up.",

  alternates: {
    canonical: "https://countflows.com/tools/sentence-counter",
  },

  openGraph: {
    title: "Free Sentence Counter & Sentence Length Checker | CountFlows",

    description:
      "Find how many sentences are in your text, check average sentence length, and identify your longest and shortest sentences instantly.",

    url: "https://countflows.com/tools/sentence-counter",

    siteName: "CountFlows",

    type: "website",

    images: [
      {
        url: "https://countflows.com/blogs/blog5-1.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Sentence Counter and Sentence Length Checker",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Free Sentence Counter & Sentence Length Checker | CountFlows",

    description:
      "Count sentences, check sentence length, and find your longest and shortest sentences instantly.",

    images: ["https://countflows.com/blogs/blog5-1.png"],
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