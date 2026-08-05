

export const metadata={
  title: "Free Text Repeater — Repeat Text Up to 10,000 Times | CountFlows",
  description:
    "Free online text repeater. Repeat any text, word, or emoji up to 10,000 times with five separator styles. No sign-up, no limits — everything stays in your browser.",
  alternates: { canonical: "https://countflows.com/tools/text-repeater" },
  openGraph: {
    title: "Free Text Repeater — Repeat Text Up to 10,000 Times | CountFlows",
    description:
      "Repeat any text, word, or emoji up to 10,000 times. Five separator styles, live output, copy or download — 100% free and private.",
    url: "https://countflows.com/tools/text-repeater",
    siteName: "CountFlows",
    type: "website",
    images: [{ url: "https://countflows.com/og-image.png", width: 1200, height: 630, alt: "Text Repeater — CountFlows" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text Repeater — CountFlows",
    description: "Repeat any text up to 10,000 times with five separator styles. Free, private, no sign-up.",
    images: ["https://countflows.com/og-image.png"],
  },
};

export default function TextRepeaterLayout({ children }) {
  return children;
}