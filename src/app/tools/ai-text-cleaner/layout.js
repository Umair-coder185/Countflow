const SITE_URL = "https://countflows.com";
const PAGE_URL = `${SITE_URL}/tools/ai-text-cleaner`;

const TITLE =
  "Free AI Text Cleaner – Clean ChatGPT Text Online | CountFlows";

const DESCRIPTION =
  "Clean AI text for free. Remove ChatGPT formatting, Markdown, em dashes, hidden characters and extra spaces. Paste your text and get clean results instantly.";

export const metadata = {
  title: {
    absolute: TITLE,
  },

  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "CountFlows",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CountFlows AI Text Cleaner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function AiTextCleanerLayout({ children }) {
  return <>{children}</>;
}