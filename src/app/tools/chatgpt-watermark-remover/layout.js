export const metadata = {
  title: {
    absolute: "ChatGPT Watermark Remover – Check Hidden Characters | CountFlows",
  },

  description: "Scan ChatGPT text for hidden Unicode, zero-width characters, unusual spaces and copy-paste artifacts. Review and remove supported characters in your browser.",

  alternates: {
    canonical: "https://countflows.com/tools/chatgpt-watermark-remover",
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
    title: "ChatGPT Watermark Remover – Check Hidden Characters",
    description: "Inspect ChatGPT text for hidden Unicode, zero-width characters, unusual spaces and copy-paste artifacts.",
    url: "https://countflows.com/tools/chatgpt-watermark-remover",
    type: "website",
    siteName: "CountFlows",
    locale: "en_US",
    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows ChatGPT Watermark Remover",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Watermark Remover | CountFlows",
    description: "Detect and remove supported hidden characters and Unicode artifacts from ChatGPT text.",
    images: ["https://countflows.com/og-image.png"],
  },
}

export default function ChatGPTWatermarkRemoverLayout({ children }) {
  return children
}