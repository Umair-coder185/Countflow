// src/components/seo/HomeJsonLd.jsx
import { faqs } from "@/lib/homeData";

const SITE = "https://countflows.com";

export default function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: "CountFlows",
        url: `${SITE}/`,
        logo: `${SITE}/logo.png`, // TODO: point to your real logo file
        // Only list profiles that actually exist. An empty array is
        // better than fake links.
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "CountFlows",
        publisher: { "@id": `${SITE}/#org` },
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE}/#app`,
        name: "CountFlows Word and Character Counter Tools",
        url: `${SITE}/`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE}/#org` },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const graphJson = { __html: JSON.stringify(graph) };
  const faqJson = { __html: JSON.stringify(faqSchema) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={graphJson} />
      <script type="application/ld+json" dangerouslySetInnerHTML={faqJson} />
    </>
  );
}