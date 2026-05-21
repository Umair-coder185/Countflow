export const metadata = {
  title: "Privacy Policy -  countflows",
  description:
    "Privacy Policy for countflows. Learn how we collect, use, and protect your data while using our text tools such as Word Counter, Sentence Counter, Reading Time Calculator, and Character Counter.",
  alternates: {
    canonical: "https://countflows.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - countflows",
    description:
      "countflows Privacy Policy covering cookies, Google AdSense, GDPR/CCPA compliance, children's privacy, and data protection.",
    url: "https://countflows.com/privacy-policy",
    siteName: "countflows",
    type: "website",
  },
};

import PrivacyPolicyContent from "./PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 lg:py-20">
      <PrivacyPolicyContent />
    </main>
  );
}