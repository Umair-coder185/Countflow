export const metadata = {
  title:
    "Free Reading Time Calculator: How Long to Read This Text? | CountFlows",

  description:
    "Free reading time calculator: paste any article, essay, or script and get an instant reading and speaking time estimate in seconds — no sign-up needed.",

  alternates: {
    canonical: "https://countflows.com/tools/reading-time",
  },

  openGraph: {
    title:
      "Free Reading Time Calculator: How Long to Read This Text?",

    description:
      "Paste your text and instantly estimate reading and speaking time. See how long an article, essay, or script will take to read.",

    url: "https://countflows.com/tools/reading-time",

    siteName: "CountFlows",

    type: "website",

    images: [
      {
        url: "https://countflows.com/blogs/blog4-1.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Reading Time Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Free Reading Time Calculator: How Long to Read This Text?",

    description:
      "Paste your text and instantly estimate how long it will take to read or speak.",

    images: ["https://countflows.com/blogs/blog4-1.png"],
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