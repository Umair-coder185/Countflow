import { Shield } from "lucide-react";
import { motion } from "@/lib/no-motion";

export default function PrivacyPolicyContent() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white blog-content dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden p-6 sm:p-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Effective Date: September 2, 2026
      </p>

      <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl dark:prose-invert max-w-none">

        <p>
          This Privacy Policy explains how CountFlows collects, uses, and
          handles information when you visit or use our website and tools.
          It also explains the choices you may have regarding your information.
        </p>


        <h2>1. Information We May Collect</h2>

        <p>
          Depending on the features and third-party services enabled on the
          website, we or our service providers may automatically receive
          information such as:
        </p>

        <ul>
          <li>Browser type, device type, and operating system</li>
          <li>IP address and approximate location derived from it</li>
          <li>Pages viewed and interactions with the website</li>
          <li>Referral information and general traffic data</li>
          <li>Cookies, local storage, and similar technologies</li>
        </ul>

        <p>
          CountFlows does not ask users to provide passwords, payment card
          information, or other sensitive personal information simply to use
          our free text tools.
        </p>

        <p>
          Some CountFlows tools are designed to process text locally in your
          browser. Where a tool specifically states that processing is local,
          the text is handled on your device for that operation rather than
          being sent to a remote AI model for processing.
        </p>


        <h2>2. How We Use Information</h2>

        <p>We may use information to:</p>

        <ul>
          <li>Operate and maintain CountFlows</li>
          <li>Improve website performance and user experience</li>
          <li>Understand general traffic and usage patterns</li>
          <li>Improve our tools and content</li>
          <li>Prevent spam, fraud, security threats, or abuse</li>
          <li>Display and measure advertising where advertising is enabled</li>
          <li>Comply with applicable legal obligations</li>
        </ul>


        <h2>3. Cookies and Similar Technologies</h2>

        <p>
          CountFlows and third-party services may use cookies, local storage,
          or similar technologies for website functionality, analytics,
          security, preferences, and advertising.
        </p>

        <p>
          You can manage or delete cookies through your browser settings.
          Where required, CountFlows may also provide a consent-management
          interface that allows you to make choices about certain cookies and
          advertising technologies.
        </p>

        <p>
          Disabling some cookies or storage technologies may affect certain
          website features.
        </p>


        <h2>4. Google Analytics</h2>

        <p>
          We may use Google Analytics to understand how visitors use
          CountFlows. Google Analytics may collect information such as page
          views, session information, approximate location, browser details,
          and device information.
        </p>

        <p>
          Google Analytics uses cookies or similar identifiers where permitted
          by your settings and applicable consent requirements. Data handling
          and retention are also subject to our Analytics configuration and
          Google's applicable policies.
        </p>


        <h2>5. Google AdSense and Advertising</h2>

        <p>
          CountFlows may use Google AdSense and other advertising services to
          display advertisements.
        </p>

        <p>
          When advertising services are enabled, Google and other advertising
          partners may place or read cookies on your browser or use technologies
          such as web beacons, IP addresses, and other identifiers to deliver,
          measure, limit, and personalize advertising where permitted.
        </p>

        <p>
          Advertising choices and the use of personalized ads may depend on
          your location, consent choices, browser settings, and applicable law.
        </p>

        <p>
          You can learn more about how Google uses information from websites
          and apps that use its services by visiting{" "}
          <a
            href="https://business.safety.google/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            Google's Business Data Responsibility page
          </a>.
        </p>

        <p>
          You can also manage advertising preferences through{" "}
          <a
            href="https://myadcenter.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            Google My Ad Center
          </a>.
        </p>


        <h2>6. Third-Party Services</h2>

        <p>
          CountFlows may use third-party service providers to operate,
          measure, secure, host, and monetize the website. These may include:
        </p>

        <ul>
          <li>
            <strong>Google Analytics:</strong> Website analytics and measurement
          </li>

          <li>
            <strong>Google AdSense:</strong> Advertising, when enabled
          </li>

          <li>
            <strong>Vercel:</strong> Website hosting and infrastructure
          </li>
        </ul>

        <p>
          These providers may process information according to their own terms
          and privacy policies. Their features and data practices are controlled
          by their respective services and by the settings we enable.
        </p>


        <h2>7. Data Retention</h2>

        <p>
          We retain information only for as long as reasonably necessary for
          the purposes described in this policy, including website operation,
          analytics, security, legal obligations, and dispute resolution.
        </p>

        <p>
          Third-party services such as Google Analytics and hosting providers
          maintain data according to their own retention policies and the
          settings available to CountFlows.
        </p>

        <p>
          Information stored locally in your browser, such as preferences or
          local storage values, may remain until it expires or you clear it
          from your device.
        </p>


        <h2>8. Data Security</h2>

        <p>
          We take reasonable technical and organizational measures to protect
          information associated with CountFlows. However, no internet service
          or electronic storage method can guarantee absolute security.
        </p>


        <h2>9. International Data Processing</h2>

        <p>
          CountFlows uses service providers that may process information in the
          United States and other countries. For example, our hosting and other
          technology providers may operate infrastructure or use subprocessors
          in multiple locations.
        </p>

        <p>
          Where required, service providers may use legal safeguards for
          international transfers of personal information.
        </p>


        <h2>10. Privacy Rights</h2>

        <p>
          Depending on where you live and which privacy laws apply, you may
          have rights concerning your personal information. These may include
          the right to:
        </p>

        <ul>
          <li>Request access to certain personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion where applicable</li>
          <li>Object to or restrict certain processing</li>
          <li>Withdraw consent where processing relies on consent</li>
          <li>Request data portability where applicable</li>
          <li>Opt out of certain advertising or data-sharing activities</li>
        </ul>

        <p>
          These rights vary by jurisdiction and may be subject to legal
          exceptions. You can contact us to submit a privacy request.
        </p>


        <h2>11. Children's Privacy</h2>

        <p>
          CountFlows is not directed to children under 13, and we do not
          knowingly collect personal information from children under 13.
          If you believe a child has provided personal information through
          CountFlows, please contact us so we can review and, where appropriate,
          remove it.
        </p>


        <h2>12. External Links</h2>

        <p>
          CountFlows may contain links to third-party websites. We are not
          responsible for the privacy practices, security, or content of those
          websites. Review their privacy policies before providing personal
          information.
        </p>


        <h2>13. Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy when our website, services, or
          privacy practices change. When we make material updates, we will
          revise the effective date shown at the top of this page.
        </p>


        <h2>14. Contact Us</h2>

        <p>
          If you have questions or requests concerning this Privacy Policy or
          your personal information, contact us:
        </p>

        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@countflows.com"
              className="text-blue-600"
            >
              contact@countflows.com
            </a>
          </li>

          <li>
            <strong>Website:</strong>{" "}
            <a
              href="https://countflows.com/contact"
              className="text-blue-600"
            >
              Contact page
            </a>
          </li>
        </ul>

      </div>
    </motion.article>
  );
}