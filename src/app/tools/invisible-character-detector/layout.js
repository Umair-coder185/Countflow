
const SITE_URL = "https://countflows.com";
const PAGE_URL = `${SITE_URL}/tools/invisible-character-detector`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const SEO_TITLE = "Invisible Character Detector & Remover | CountFlows";
const SEO_DESCRIPTION = "Free invisible character detector to find hidden Unicode, zero-width spaces and invisible text. Check code points and positions, then remove unwanted characters.";

export const metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PAGE_URL,
    siteName: "CountFlows",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Invisible Character Detector and Remover - CountFlows" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function InvisibleCharacterDetectorLayout({ children }) {
  return children;
}
