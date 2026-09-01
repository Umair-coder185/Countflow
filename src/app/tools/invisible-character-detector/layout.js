export const metadata = {
  title: "Invisible Character Detector – Find Hidden Unicode Characters | CountFlows",
  description: "Detect invisible characters, zero-width spaces, unusual Unicode spaces and hidden text characters. See exact code points, counts and positions, then remove selected characters in your browser.",
  alternates: {
    canonical: "/tools/invisible-character-detector",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Invisible Character Detector – Find Hidden Unicode Characters | CountFlows",
    description: "Find zero-width spaces, hidden Unicode characters and unusual spaces. Inspect exact code points and positions before removing anything.",
    url: "https://countflows.com/tools/invisible-character-detector",
    siteName: "CountFlows",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invisible Character Detector by CountFlows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invisible Character Detector – Find Hidden Unicode Characters",
    description: "Detect zero-width spaces, hidden Unicode and unusual characters with exact code points, counts and positions.",
    images: ["/og-image.png"],
  },
}

export default function InvisibleCharacterDetectorLayout({ children }) {
  return children
}