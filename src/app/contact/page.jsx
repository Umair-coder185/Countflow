// src/app/contact/page.jsx
import ContactUsClient from "./ContactUsClient";
import Link from "next/link";

const description =
  "Questions, bug reports, tool suggestions, or business inquiries — reach CountFlows by email and get a reply within 24–48 hours.";

export const metadata = {
  title: "Contact CountFlows",
  description,
  alternates: { canonical: "https://countflows.com/contact" },
  openGraph: {
    title: "Contact CountFlows",
    description,
    url: "https://countflows.com/contact",
    siteName: "CountFlows",
    type: "website",
  },
  twitter: { card: "summary", title: "Contact CountFlows", description },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CountFlows",
  url: "https://countflows.com/contact",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://countflows.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://countflows.com/contact",
    },
  ],
};

const contactProps = { __html: JSON.stringify(contactJsonLd) };
const breadcrumbProps = { __html: JSON.stringify(breadcrumbJsonLd) };

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={contactProps} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbProps}
      />

      


      <ContactUsClient />
    </>
  );
}