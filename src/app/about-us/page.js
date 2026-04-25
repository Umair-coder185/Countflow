export const metadata = {
  title: "About Us - Text Tools",
  description:
    "Learn more about Text Tools, a premium suite of online writing utilities including Word Counter, Sentence Counter, Reading Time Calculator, and Character Counter. Our mission is to provide fast, accurate, and user-friendly tools for writers, students, and professionals.",
  alternates: {
    canonical: "https://yourdomain.com/about-us",
  },
  openGraph: {
    title: "About Us - Text Tools",
    description:
      "Text Tools provides free, accurate, and easy-to-use writing utilities like Word Counter, Sentence Counter, Reading Time Calculator, and Character Counter. Built for bloggers, students, and SEO writers.",
    url: "https://yourdomain.com/about-us",
    siteName: "Text Tools",
    type: "website",
  },
};

export default function AboutUs() {
  return (
    <section className="max-w-4xl mt-12  mx-auto px-6 py-16 text-gray-800 dark:text-slate-200">
      <h1 className="text-4xl font-bold mb-8 text-center">
        📄 About Us
      </h1>

      <p className="mb-6">
        Welcome to <strong>Text Tools</strong> — your trusted platform for
        accurate, fast, and user-friendly writing utilities. Our mission is to
        simplify text analysis and provide instant insights that help writers,
        students, and professionals improve their work.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">✨ Our Tools</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Word Counter:</strong> Instantly count words and analyze text
          length for blogs, essays, and SEO content.
        </li>
        <li>
          <strong>Sentence Counter:</strong> Measure sentence count and balance
          readability for clear communication.
        </li>
        <li>
          <strong>Reading Time Calculator:</strong> Estimate how long it takes
          to read or speak your text, with difficulty scoring.
        </li>
        <li>
          <strong>Character Counter:</strong> Track characters, spaces, and
          symbols for social media, ads, and technical writing.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">🎯 Our Mission</h2>
      <p className="mb-6">
        We aim to provide tools that save time, improve accuracy, and enhance
        productivity. Whether you’re a blogger optimizing content, a student
        preparing assignments, or a marketer crafting campaigns, our tools are
        designed to make your work easier and more effective.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">🔑 What We Focus On</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Providing accurate and reliable results</li>
        <li>Creating simple, user-friendly interfaces</li>
        <li>Helping users improve readability and SEO performance</li>
        <li>Continuously updating tools with new features</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">📊 Data & Accuracy</h2>
      <p className="mb-6">
        All our tools are based on researched formulas, linguistic analysis, and
        real-world scenarios. While results are highly accurate, they may vary
        depending on text complexity and usage context.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">🚀 Continuous Improvement</h2>
      <p className="mb-6">
        We are constantly enhancing our platform by adding new tools and
        refining existing ones. Our goal is to deliver a premium SaaS-style
        experience that feels professional, fast, and engaging.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">📬 Contact Us</h2>
      <p>
        If you have any questions, suggestions, or feedback, feel free to{" "}
        <a
          href="/contact"
          className="text-blue-500 hover:underline"
        >
          contact us
        </a>
        . We value your input and are always working to improve our services.
      </p>
    </section>
  );
}
