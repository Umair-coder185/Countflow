




export const metadata = {
  title: "Privacy Policy - text-tools",
  description:
    "Privacy Policy for text-tools. Learn how we collect, use, and protect your data while using our text tools such as Word Counter, Sentence Counter, Reading Time Calculator, and Character Counter.",
  alternates: {
    canonical: "https://yourdomain.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - text-tools",
    description:
      "text-tools Privacy Policy covering cookies, Google AdSense, GDPR/CCPA compliance, children's privacy, and data protection.",
    url: "https://yourdomain.com/privacy-policy",
    siteName: "text-tools",
    type: "website",
  },
};

export default function PrivacyPolicy() {
  return (
    <>
    

      <section className="max-w-4xl mt-12 mx-auto px-6 py-16 text-gray-800 dark:text-slate-200">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🔒 Privacy Policy for text-tools
        </h1>

        <p className="mb-6">
          At <strong>text-tools</strong>, accessible from{" "}
          <a
            href="https://yourdomain.com"
            className="text-blue-500 hover:underline"
          >
            https://yourdomain.com
          </a>
          , the privacy of our visitors is one of our main priorities. This
          Privacy Policy document outlines the types of information collected
          and recorded by text-tools and how we use it.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          📑 Information We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            We do not collect personal information unless you voluntarily
            provide it (e.g., through our contact form or email).
          </li>
          <li>
            We may collect non‑personal data such as browser type, device
            information, and usage data to improve our services.
          </li>
          <li>
            Usage data may include pages visited, time spent, and tool usage
            patterns (Word Counter, Sentence Counter, Reading Time, Character
            Counter).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🍪 Cookies</h2>
        <p className="mb-6">
          We use cookies to store information about visitors’ preferences and
          optimize the user experience. Cookies allow us to remember your
          settings (e.g., dark mode, tool preferences) and provide faster access
          to our tools.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          📢 Google AdSense & Third‑Party Ads
        </h2>
        <p className="mb-6">
          We use third‑party advertising services such as{" "}
          <strong>Google AdSense</strong>. Google uses cookies (such as the{" "}
          <strong>DoubleClick cookie</strong>) to serve ads based on users’
          visits to this and other websites. Users may opt out of personalized
          advertising by visiting:{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="text-blue-500 hover:underline"
          >
            Google Ads Settings
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          🌍 Third‑Party Privacy Policies
        </h2>
        <p className="mb-6">
          Our Privacy Policy does not apply to other advertisers or websites. We
          advise you to consult the respective Privacy Policies of third‑party
          ad servers for more detailed information.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🔐 Data Protection</h2>
        <p className="mb-6">
          We take appropriate measures to protect your data, but no method of
          transmission over the Internet is 100% secure. We do not sell, trade,
          or rent users’ personal information to third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          👶 Children’s Privacy
        </h2>
        <p className="mb-6">
          Protecting children’s privacy online is important to us. We do not
          knowingly collect any personal information from children under the age
          of 13. If you believe your child has provided such information, please
          contact us immediately, and we will remove it.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          ⚖️ GDPR & CCPA Compliance
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>GDPR (EU Users):</strong> You have the right to access,
            rectify, or erase your personal data. You may also request
            restriction of processing or object to data processing.
          </li>
          <li>
            <strong>CCPA (California Users):</strong> You have the right to know
            what personal data we collect and request deletion of your data. We
            do not sell personal data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">📜 Consent</h2>
        <p className="mb-6">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">📬 Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:{" "}
          <a
            href="mailto:your-email@example.com"
            className="text-blue-500 hover:underline"
          >
            your-email@example.com
          </a>
        </p>
      </section>
    </>
  );
}
