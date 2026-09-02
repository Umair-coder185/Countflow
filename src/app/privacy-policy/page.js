import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy | CountFlows",

  description:
    "Read the CountFlows Privacy Policy covering cookies, analytics, advertising, third-party services, data handling, and privacy choices.",

  alternates: {
    canonical: "https://countflows.com/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy | CountFlows",

    description:
      "Learn how CountFlows handles website data, cookies, analytics, advertising, and privacy choices.",

    url: "https://countflows.com/privacy-policy",

    siteName: "CountFlows",

    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 lg:py-20">
      <PrivacyPolicyContent />
    </main>
  );
}