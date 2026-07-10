// src/components/seo/HomeJsonLd.jsx
import { faqs } from "@/lib/homeData";

const SITE = "https://countflows.com";
const DESCRIPTION =
  "Free online word counter, character counter, sentence counter and reading time calculator. Instant results as you type, no sign-up, and your text never leaves your browser.";

export default function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: "CountFlows",
        url: `${SITE}/`,
        logo: `${SITE}/logo.png`,
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
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: `${SITE}/`,
        name: "Countflows: Free Word & Character Counter Tools",
        description: DESCRIPTION,
        isPartOf: { "@id": `${SITE}/#website` },
        breadcrumb: { "@id": `${SITE}/#breadcrumb` },
        publisher: { "@id": `${SITE}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE}/`,
          },
        ],
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
