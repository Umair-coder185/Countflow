export const metadata = {
  title: "Free AI Token Counter & Cost Calculator - GPT, Claude & Gemini | Countflows",
  description:
    "Count tokens for GPT-5.6, Claude, and Gemini, estimate API cost, and track context window usage instantly. 100% free, runs in your browser — nothing uploaded.",
  keywords:
    "ai token counter, ai cost calculator, token budget calculator, context window calculator, gpt token counter, chatgpt token counter, openai token calculator, llm token counter, count tokens online, ai token estimator, gpt token limit checker, text to tokens converter, free ai token counter",
  openGraph: {
    title: "Free AI Token Counter & Cost Calculator - GPT, Claude & Gemini",
    description:
      "Count tokens, estimate API cost, and track context window usage for GPT-5.6, Claude, and Gemini instantly. 100% free and private.",
    url: "https://countflows.com/tools/ai-token-counter",
    type: "website",
    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows AI Token Counter",
      },
    ],
  },
  alternates: {
    canonical: "https://countflows.com/tools/ai-token-counter",
  },
}

export default function Layout({ children }) {
  return <>{children}</>
}