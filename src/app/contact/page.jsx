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

      <main className="mx-auto mt-12 max-w-4xl px-6 py-16 text-gray-800 dark:text-slate-200 md:mt-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-gray-500 dark:text-slate-400"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-500 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">&rsaquo;</li>
            <li aria-current="page" className="font-medium">
              Contact
            </li>
          </ol>
        </nav>

        <article>
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Contact CountFlows
          </h1>
          <p className="mb-6 text-lg leading-8 text-gray-600 dark:text-slate-400">
            Questions, bug reports, tool suggestions, or business inquiries? Send
            us a message and we will usually reply within 24–48 hours.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="mailto:contact@countflows.com"
              className="rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
            >
              Email CountFlows
            </a>
            <Link
              href="/tools"
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-800 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              Explore Tools
            </Link>
          </div>

          <h2 className="mb-4 mt-10 text-2xl font-semibold">How we can help</h2>
          <ul className="mb-8 list-disc space-y-2 pl-6">
            <li>Support with using any CountFlows writing tool.</li>
            <li>Bug reports, technical issues, or website errors.</li>
            <li>Suggestions for new tools and improvements.</li>
            <li>Business, partnership, or advertising inquiries.</li>
          </ul>

          <h2 className="mb-4 mt-10 text-2xl font-semibold">Email support</h2>
          <p className="mb-6 leading-7">
            Contact us directly at{" "}
            <a
              href="mailto:contact@countflows.com"
              className="font-medium text-cyan-700 hover:underline dark:text-cyan-300"
            >
              contact@countflows.com
            </a>
            . Every message is read, and feedback helps shape the roadmap.
          </p>

          <h2 className="mb-4 mt-10 text-2xl font-semibold">Frequently asked questions</h2>
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold">How soon will I get a reply?</dt>
              <dd className="mt-1 leading-7">
                We aim to respond within 24–48 hours.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Can I suggest a new tool?</dt>
              <dd className="mt-1 leading-7">
                Yes. Suggestions for new text and writing utilities are welcome.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Is my information safe?</dt>
              <dd className="mt-1 leading-7">
                See our{" "}
                <Link href="/privacy-policy" className="text-cyan-700 hover:underline dark:text-cyan-300">
                  Privacy Policy
                </Link>{" "}
                for details about data handling.
              </dd>
            </div>
          </dl>
        </article>
      </main>
    </>
  );
}