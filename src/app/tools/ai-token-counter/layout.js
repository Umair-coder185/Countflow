export const metadata = {
  title: "Free AI Token Counter - Instant GPT-4 & LLM Token Calculator | Countflows",
  description:
    "Count tokens for GPT-5, Claude, and Gemini instantly. See word, character, and token counts side by side.100% free, runs in your browser — nothing uploaded.",
  keywords:
    "ai token counter, gpt-4 token counter, chatgpt token counter, openai token calculator, llm token counter, count tokens online, ai token estimator, gpt token limit checker, text to tokens converter, free ai token counter",
  openGraph: {
    title: "Free AI Token Counter - Instant GPT-4 & LLM Token Calculator",
    description:
      "Calculate GPT-4, Claude, and LLM tokens, words, and characters for your prompts instantly. 100% free and private.",
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