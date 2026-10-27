const SITE_URL = "https://countflows.com";
const PAGE_URL = `${SITE_URL}/tools/text-repeater`;

const TITLE = "Free Text Repeater — Repeat Text Up to 10,000 Times | CountFlows";

const DESCRIPTION = "Free online text repeater to repeat words, text, or emojis 1,000 or 10,000 times. Choose separators, copy or download results instantly. No sign-up required.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "CountFlows",
    type: "website",
    images: [
      { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Free Text Repeater — CountFlows" },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function TextRepeaterLayout({ children }) {
  return <>{children}</>;
}