// app/tools/character-counter/layout.js

export const metadata = {
  title: "Free Character Counter – With & Without Spaces | CountFlows",

  description:
    "Free character counter to count characters with and without spaces. Check Unicode, X, LinkedIn, TikTok, SEO and SMS limits instantly in your browser.",

  alternates: {
    canonical: "https://countflows.com/tools/character-counter",
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

  openGraph: {
    title: "Free Character Counter – With & Without Spaces",
    description:
      "Count characters with and without spaces, check Unicode, social media, SEO and SMS limits, and analyze text instantly.",
    url: "https://countflows.com/tools/character-counter",
    siteName: "CountFlows",
    type: "website",

    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows free character counter with social media, Unicode and SMS limits",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Character Counter – With & Without Spaces",
    description:
      "Count characters, Unicode, social media limits, SEO text and SMS segments instantly with CountFlows.",
    images: ["https://countflows.com/og-image.png"],
  },
}

export default function Layout({ children }) {
  return children
}