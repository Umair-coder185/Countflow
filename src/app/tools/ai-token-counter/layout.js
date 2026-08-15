export const metadata = {
  title: "Free AI Token Calculator & Counter | GPT, Claude, Gemini",

  description:
    "Count AI tokens instantly, estimate GPT, Claude & Gemini API costs, check context limits, and find the cheapest model. Free and private.",

  keywords: [
    "ai token calculator",
    "ai token counter",
    "chatgpt token counter",
    "gpt token counter",
    "gpt token calculator",
    "ai cost calculator",
    "ai api cost calculator",
    "token cost calculator",
    "llm cost calculator",
    "llm token counter",
    "claude token counter",
    "gemini token counter",
    "openai token calculator",
    "token budget calculator",
    "context window calculator",
    "prompt token counter",
  ],

  alternates: {
    canonical: "https://countflows.com/tools/ai-token-counter",
  },

  openGraph: {
    title: "Free AI Token Calculator & Counter | GPT, Claude, Gemini",
    description:
      "Count tokens, compare AI API costs, check context limits, and find the cheapest supported model across GPT, Claude, and Gemini.",
    url: "https://countflows.com/tools/ai-token-counter",
    siteName: "CountFlows",
    type: "website",

    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows AI Token Calculator and Counter",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free AI Token Calculator & Counter | CountFlows",
    description:
      "Count AI tokens, compare GPT, Claude & Gemini API costs, check context limits, and estimate your AI spend.",
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
  return <>{children}</>
}