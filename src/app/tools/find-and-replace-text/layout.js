export const metadata = {
  title: {
    absolute:
      "Find and Replace Text Online – Free Bulk Text Replacer | CountFlows",
  },

  description:
    "Find and replace text online with multiple replacement rules, regex, whole-word matching, live preview, and smart conflict detection. Free and browser-based.",

  alternates: {
    canonical:
      "https://countflows.com/tools/find-and-replace-text",
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
    title:
      "Find and Replace Text Online – Free Bulk Text Replacer",
    description:
      "Replace words, phrases, characters, or multiple text values at once with regex, whole-word matching, and smart conflict detection.",
    url:
      "https://countflows.com/tools/find-and-replace-text",
    type: "website",
    siteName: "CountFlows",
    locale: "en_US",

    images: [
      {
        url:
          "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt:
          "CountFlows Find and Replace Text Online tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Find and Replace Text Online – CountFlows",
    description:
      "Bulk find and replace text online with multiple rules, regex, and smart conflict detection.",
    images: [
      "https://countflows.com/og-image.png",
    ],
  },
}

export default function FindReplaceLayout({
  children,
}) {
  return children
}