export const metadata = {
  title: {
    absolute:
      "Online Text Compare – Compare Two Texts Instantly | CountFlows",
  },

  description:
    "Compare two texts online and instantly highlight added, removed, and changed words, characters, or lines. Free, private, browser-based, and no signup.",

  alternates: {
    canonical:
      "https://countflows.com/tools/text-compare",
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
      "Online Text Compare – Compare Two Texts Instantly",

    description:
      "Compare two texts online and find added, removed, and changed words, characters, or lines instantly. Free and browser-based.",

    url:
      "https://countflows.com/tools/text-compare",

    type:
      "website",

    siteName:
      "CountFlows",

    locale:
      "en_US",

    images: [
      {
        url:
          "https://countflows.com/og-image.png",

        width: 1200,

        height: 630,

        alt:
          "CountFlows Online Text Compare Tool",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Online Text Compare – Compare Two Texts Instantly",

    description:
      "Compare two texts online and instantly highlight words, characters, or lines that changed.",

    images: [
      "https://countflows.com/og-image.png",
    ],
  },
}


export default function TextCompareLayout({
  children,
}) {
  return children
}