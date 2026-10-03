import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import BlogList from "@/components/blog/BlogList";
import {
  SITE_URL,
  BLOG_URL,
  categories,
  getListing,
} from "@/lib/blogIndex";
import { blogPath } from "@/lib/blogUrls";

const BLOG_FAQS = [
  {
    question: "What kind of tutorials and guides can I find here?",
    answer:
      "We publish in-depth guides covering text formatting, grammar rules, AI tool limitations, and developer naming conventions. Popular topics include syllable division rules, removing AI markdown, and understanding token limits in large language models.",
  },
  {
    question: "Are the text tools featured in the articles free to use?",
    answer:
      "Yes! Every tool mentioned in our blog—from the Case Converter to the AI Text Cleaner and Syllable Counter—is 100% free. They run entirely in your browser, ensuring your text is processed securely and instantly without being sent to external servers.",
  },
  {
    question: "How can I fix messy AI-generated text formatting?",
    answer:
      "Our blog features comprehensive guides on identifying and removing AI artifacts like overused em dashes, bold asterisks, and non-breaking spaces. We recommend pairing these guides with our AI Text Cleaner to automate the formatting process.",
  },
];

function toIsoDate(date) {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function jsonLd(data) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function BlogIndexView({ page = 1, category = "All" }) {
  const { pagePosts, totalPages, currentPage, totalPosts, startIndex } =
    getListing(page, category);

  const canonical = `${SITE_URL}${blogPath(currentPage, category)}`;

  const collectionName =
    category === "All" ? "CountFlows Blog" : `${category} Guides | CountFlows`;

  const collectionPageId = `${canonical}#collectionpage`;
  const blogId = `${BLOG_URL}#blog`;
  const itemListId = `${canonical}#itemlist`;
  const breadcrumbId = `${canonical}#breadcrumb`;

  const showFaqs = category === "All" && currentPage === 1;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": collectionPageId,
        url: canonical,
        name: collectionName,
        description:
          category === "All"
            ? "CountFlows guides on writing, SEO, AI, reading, syllables, word counts, and content tools."
            : `CountFlows ${category} guides and tutorials.`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "Blog",
        "@id": blogId,
        url: BLOG_URL,
        name: "CountFlows Blog",
        description:
          "Practical guides about writing, SEO, AI, reading, text analysis, and content creation.",
        publisher: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name:
          category === "All"
            ? `CountFlows Blog Posts — Page ${currentPage}`
            : `${category} Blog Posts — Page ${currentPage}`,
        numberOfItems: pagePosts.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: pagePosts.map((post, index) => ({
          "@type": "ListItem",
          position: startIndex + index + 1,
          name: post.title,
          url: `${BLOG_URL}/${post.slug}`,
          item: {
            "@type": "BlogPosting",
            "@id": `${BLOG_URL}/${post.slug}#article`,
            headline: post.title,
            url: `${BLOG_URL}/${post.slug}`,
            description: post.description || post.excerpt,
            image: post.image ? `${SITE_URL}${post.image}` : undefined,
            datePublished: toIsoDate(post.date),
            author: {
              "@type":
                post.author === "CountFlows Team" ? "Organization" : "Person",
              name: post.author || "CountFlows Team",
            },
          },
        })),
      },
      ...(showFaqs
        ? [
            {
              "@type": "FAQPage",
              "@id": `${BLOG_URL}#faqpage`,
              url: BLOG_URL,
              mainEntity: BLOG_FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_URL },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />

      <nav
        aria-label="Breadcrumb"
        className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 lg:pt-28"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>

            <li
              aria-current="page"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Blog
            </li>
          </ol>

          <Link
            href="/tools"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg
              bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm
              font-semibold text-white shadow-md shadow-blue-600/20
              transition duration-200 hover:-translate-y-0.5 hover:from-blue-700
              hover:to-cyan-700 hover:shadow-lg hover:shadow-cyan-600/25
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-cyan-500 focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-slate-950"
          >
            Explore Tools
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </nav>

      <BlogList
        posts={pagePosts}
        categories={categories}
        selectedCategory={category}
        currentPage={currentPage}
        totalPages={totalPages}
        totalPosts={totalPosts}
        faqs={showFaqs ? BLOG_FAQS : []}
      />
    </>
  );
}