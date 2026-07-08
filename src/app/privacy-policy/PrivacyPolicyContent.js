'use client';

import { Shield } from "lucide-react";
import { motion } from "@/lib/no-motion";

export default function PrivacyPolicyContent() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white  blog-content dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden p-6 sm:p-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Effective Date: May 17, 2026
      </p>

      {/* Content */}
      <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl dark:prose-invert max-w-none">
        <p>
          This Privacy Policy describes how CountFlows (
          <a href="https://countflows.com/" className="text-blue-600" aria-label="Visit CountFlows homepage">
            Visit our homepage
          </a>
          ) collects, uses, and protects information when you visit or use our
          website. By using our website, you agree to the terms explained
          below.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Basic browser information (browser type, device, OS)</li>
          <li>IP address and approximate location</li>
          <li>Pages you visit on our website</li>
          <li>Time spent on pages and user behavior</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        <p>
          We do not directly collect sensitive personal information like
          passwords or payment details unless clearly required in future
          features.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Improve website performance and user experience</li>
          <li>Understand visitor behavior and traffic patterns</li>
          <li>Optimize content and tools on the website</li>
          <li>Show relevant advertisements (if applicable)</li>
          <li>Prevent spam, fraud, or abuse</li>
        </ul>

        <h2>3. Cookies and Tracking Technologies</h2>
        <p>CountFlows uses cookies to:</p>
        <ul>
          <li>Remember user preferences</li>
          <li>Analyze website traffic</li>
          <li>Improve site functionality</li>
        </ul>
        <p>
          You can disable cookies in your browser settings, but some parts of
          the site may not function properly.
        </p>

        <h2>3a. Data Retention</h2>
        <p>
          We retain personal data only for as long as necessary to provide our
          services or as required by law:
        </p>
        <ul>
          <li>Analytics data: Retained for 14 months by default</li>
          <li>Cookies: Session cookies are deleted when you close your browser; persistent cookies expire based on their lifespan setting</li>
          <li>IP addresses: Anonymized after 9 months</li>
          <li>User preferences: Retained locally on your device</li>
        </ul>
        <p>
          You may request deletion of your data at any time by contacting us.
        </p>

        <h2>4. Google AdSense and Third-Party Ads</h2>
        <p>
          We may use Google AdSense or similar advertising services. These
          third-party vendors may use cookies (such as the DART cookie) to
          show ads based on your visits to this and other websites.
        </p>
        <p>
          You can opt out of personalized ads by visiting the{' '}
          <a
            href="https://www.google.com/settings/ads"
            className="text-blue-600"
            aria-label="Google Ad Settings page"
          >
            Google Ad Settings page
          </a>.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>CountFlows uses the following third-party services:</p>
        <ul>
          <li><strong>Google Analytics:</strong> Analyzes website traffic and user behavior</li>
          <li><strong>Google AdSense:</strong> Displays targeted advertisements</li>
          <li><strong>Advertising networks:</strong> Partner networks for ad serving</li>
          <li><strong>Hosting providers (Vercel):</strong> Hosts our website and infrastructure</li>
        </ul>
        <p>
          These services may collect and process your data according to their
          privacy policies. We recommend reviewing their policies on their
          respective websites.
        </p>

        <h2>6. Data Protection</h2>
        <p>
          We take reasonable steps to protect your data. However, no method of
          online transmission or storage is 100% secure, so we cannot
          guarantee absolute security.
        </p>

        <h2>6a. Data Transfers</h2>
        <p>
          CountFlows is hosted on Vercel servers located in the United States.
          By using our website, you consent to the transfer of your information
          to the United States for processing. We take appropriate safeguards
          to protect your data during transfer.
        </p>

        <h2>6b. GDPR and CCPA Compliance</h2>
        <p>
          <strong>For EU residents (GDPR):</strong> You have the right to:
        </p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion (right to be forgotten)</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge a complaint with your local data protection authority</li>
        </ul>
        <p>
          <strong>For California residents (CCPA):</strong> You have the right
          to:
        </p>
        <ul>
          <li>Know what personal information is collected</li>
          <li>Know whether personal information is sold or disclosed</li>
          <li>Say no to the sale or sharing of personal information</li>
          <li>Access your personal information</li>
          <li>Request deletion of personal information</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information in
          Section 11.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          CountFlows does not knowingly collect data from children under 13.
          If you believe such data has been collected, please contact us so we
          can remove it.
        </p>

        <h2>8. External Links</h2>
        <p>
          Our website may contain links to other websites. We are not
          responsible for the privacy practices or content of those external
          sites.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes
          will be posted on this page with an updated "Effective Date".
        </p>

        <h2>10. User Rights and Choices</h2>
        <p>
          You have control over your information:
        </p>
        <ul>
          <li>
            <strong>Opt-out of cookies:</strong> Disable cookies in your browser
            settings or use a browser extension
          </li>
          <li>
            <strong>Opt-out of personalized ads:</strong>{" "}
            <a href="https://www.google.com/settings/ads" className="text-blue-600" aria-label="Google Ad Settings">
              Google Ad Settings
            </a>
          </li>
          <li>
            <strong>Do Not Track:</strong> If your browser supports DNT
            signals, we respect your choice not to be tracked
          </li>
          <li>
            <strong>Data access/deletion:</strong> Request a copy of your data
            or request deletion by contacting us
          </li>
        </ul>

        <h2>11. Contact Us</h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or your personal data, please contact us:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:umairrao965@gmail.com" className="text-blue-600" aria-label="Email CountFlows support">
              umairrao965@gmail.com
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href="https://countflows.com/contact"
              className="text-blue-600"
              aria-label="Contact page"
            >
              Contact page
            </a>
          </li>
          <li>
            <strong>Response Time:</strong> We aim to respond to all requests
            within 30 days
          </li>
        </ul>
      </div>
    </motion.article>
  );
}
