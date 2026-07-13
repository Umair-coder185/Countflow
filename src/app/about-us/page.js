// src/app/about-us/page.jsx

import Link from "next/link";

const description =
  "CountFlows is a free, private suite of writing tools built by Umair Tufail — six counters and converters that run entirely in your browser, no sign-up needed.";

export const metadata = {
  title: "About CountFlows",
  description,
  alternates: { canonical: "https://countflows.com/about-us" },
  openGraph: {
    title: "About CountFlows",
    description,
    url: "https://countflows.com/about-us",
    siteName: "CountFlows",
    type: "website",
  },
  twitter: { card: "summary", title: "About CountFlows", description },
};

// Verify each href against the live slugs in homeData.js before shipping.
const tools = [
  {
    name: "Word Counter",
    href: "/tools/word-counter",
    blurb: "Count words instantly for blogs, essays, and SEO content.",
  },
  {
    name: "Character Counter",
    href: "/tools/character-counter",
    blurb:
      "Track characters with and without spaces for captions, ads, and meta tags.",
  },
  {
    name: "Sentence Counter",
    href: "/tools/sentence-counter",
    blurb: "Measure sentence count and average length to keep writing readable.",
  },
  {
    name: "Reading Time Calculator",
    href: "/tools/reading-time",
    blurb: "Estimate reading and speaking time using research-based averages.",
  },
  {
    name: "Case Converter",
    href: "/tools/case-converter",
    blurb:
      "Switch text between UPPERCASE, lowercase, Title Case, and more in one click.",
  },
  {
    name: "Keyword Density Checker",
    href: "/tools/keyword-density-checker",
    blurb:
      "See which words and phrases you repeat most, with percentages for SEO.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About CountFlows",
  url: "https://countflows.com/about-us",
  mainEntity: {
    "@type": "Person",
    name: "Umair Tufail",
    jobTitle: "Founder",
    url: "https://countflows.com/about-us",
    // Keep only profiles that are real and active. Delete the rest.
    sameAs: ["https://www.linkedin.com/in/REPLACE-ME"],
  },
};

const jsonLdProps = { __html: JSON.stringify(aboutJsonLd) };

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
      name: "About Us",
      item: "https://countflows.com/about-us",
    },
  ],
};

const breadcrumbProps = { __html: JSON.stringify(breadcrumbJsonLd) };

// Hand-picked guides (same byline: Umair Tufail). Verify slugs against your blog.
const posts = [
  {
    title: "Average Reading Speed: What's Normal and How to Test Yours",
    href: "/blog/average-reading-speed",
  },
  {
    title: "How to Calculate Words Per Minute Reading (Formula + Examples)",
    href: "/blog/how-to-calculate-words-per-minute-reading",
  },
  {
    title: "How Long Does It Take to Read 10,000 Words?",
    href: "/blog/how-long-does-it-take-to-read-10000-words",
  },
  {
    title: "How to Read Faster Without Losing Comprehension",
    href: "/blog/how-to-read-faster",
  },
];

export default function AboutUs() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 dark:text-slate-200 mt-12 md:mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdProps}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbProps}
      />
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
          <li
            aria-current="page"
            className="font-medium text-gray-800 dark:text-slate-200"
          >
            About Us
          </li>
        </ol>
      </nav>
      <article>
        <h1 className="text-4xl font-bold mb-8 text-center">About CountFlows</h1>

        <p className="mb-6">
          <strong>CountFlows</strong> is a free suite of writing tools —
          counters, converters, and calculators that give you instant answers
          while you type. There are no accounts, no paywalls, and no uploads:
          every tool runs inside your browser, so your text never leaves your
          device.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why this site exists</h2>
        <p className="mb-6">
          CountFlows started with a simple annoyance: checking a word count
          online usually meant slow pages, pop-ups, and tools that quietly sent
          your text to a server. Tools this small should be instant, honest,
          and private. So I built one that was — then kept going. Every tool
          since has followed the same three rules: it is free, it works the
          moment you paste, and your text stays on your device.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Meet the founder</h2>
        
          <div>
            <p className="mb-4">
              I&apos;m <strong>Umair Tufail</strong>, a web developer and
              writer, and the person who builds, tests, and maintains every
              tool on CountFlows. I also write the guides on the blog — the
              same name you see in the article bylines. When a tool here quotes
              a number, it is backed by published research or documented
              platform limits, because I rely on these tools for my own writing
              every day.
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/umair-next-js"
                rel="me noopener noreferrer"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Connect with me on LinkedIn
              </a>
            </p>
          </div>
        

        <h2 className="text-2xl font-semibold mt-10 mb-4">Our tools</h2>
        <p className="mb-4">Six tools are live today, with more on the roadmap:</p>
        <ul className="list-disc pl-6 space-y-2">
          {tools.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="font-medium text-blue-500 hover:underline"
              >
                {tool.name}
              </Link>
              : {tool.blurb}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">What we stand for</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Free, always:</strong> no accounts, no premium tiers, no
            limits on how much text you can check.
          </li>
          <li>
            <strong>Private by design:</strong> all counting happens in your
            browser. Your text is never sent to our servers, so there is
            nothing for us to store, read, or share.
          </li>
          <li>
            <strong>Instant results:</strong> counts update as you type — no
            submit button, no waiting.
          </li>
          <li>
            <strong>Honest numbers:</strong> reading speeds, platform limits,
            and formulas come from published research and official
            documentation, not guesses.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">From the blog</h2>
        <p className="mb-4">
          Alongside the tools, I publish research-backed writing guides. A few
          worth starting with:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          {posts.map((post) => (
            <li key={post.href}>
              <Link
                href={post.href}
                className="font-medium text-blue-500 hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mb-6">
          Browse everything on the{" "}
          <Link href="/blog" className="text-blue-500 hover:underline">
            blog
          </Link>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Data and accuracy</h2>
        <p className="mb-6">
          Our calculators are built on researched formulas and published
          averages — for example, reading time uses 238 words per minute for
          silent reading (Brysbaert, 2019). Results are accurate for typical
          text, but averages are starting points: your own pace and context may
          vary.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
        <p>
          Found a bug, or want a tool we haven&apos;t built yet? Head to the{" "}
          <Link href="/contact" className="text-blue-500 hover:underline">
            contact page
          </Link>{" "}
          — feature requests genuinely shape the roadmap.
        </p>
      </article>
    </main>
  );
}