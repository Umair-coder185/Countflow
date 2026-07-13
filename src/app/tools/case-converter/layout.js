import {
    caseConverterToolSchema,
    caseConverterBreadcrumbSchema,
    caseConverterFaqSchema,
} from "@/lib/schema"


export const metadata = {
  title: "Free Case Converter - Convert Text Case Online | Countflows",
  description:
    "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case in one click. Free, runs in your browser \u2014 your text is never uploaded or stored.",
  keywords:
    "case converter, text case converter, convert upper case to lower case, convert text case, title case converter, sentence case converter, capital case converter, case converter online",
  openGraph: {
    title: "Free Case Converter - Convert Text Case Online",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case in one click. 100% free and private.",
    url: "https://countflows.com/tools/case-converter",
    type: "website",
    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Case Converter",
      },
    ],
  },
  alternates: {
    canonical: "https://countflows.com/tools/case-converter",
  },
}

export default function Layout({ children }) {
  return <>

    <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(caseConverterToolSchema) }}
            />
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(caseConverterBreadcrumbSchema) }}
            />
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(caseConverterFaqSchema) }}
            />
  {children}</>
}