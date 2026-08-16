import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { posts } from "@/lib/blogData";
import BlogList from "@/components/blog/BlogList";

const SITE_URL = "https://countflows.com";
const BLOG_URL = `${SITE_URL}/blog`;
const POSTS_PER_PAGE = 12;

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(value) {
  const parsed = Number.parseInt(firstValue(value) || "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function getValidPosts() {
  return posts.filter((post) => post?.slug && post?.title);
}

function getSortedPosts(list) {
  return [...list].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (Number.isNaN(dateA) && Number.isNaN(dateB)) return 0;
    if (Number.isNaN(dateA)) return 1;
    if (Number.isNaN(dateB)) return -1;

    return dateB - dateA;
  });
}

function getCategories(list) {
  return [
    "All",
    ...Array.from(
      new Set(list.map((post) => post.category).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b)),
  ];
}

function resolveCategory(rawCategory, categories) {
  const category = firstValue(rawCategory);

  if (!category) return "All";

  const match = categories.find(
    (item) => item.toLowerCase() === category.toLowerCase()
  );

  return match || null;
}

function buildBlogUrl(page = 1, category = "All", absolute = true) {
  const params = new URLSearchParams();

  if (category && category !== "All") {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  const path = `/blog${query ? `?${query}` : ""}`;

  return absolute ? `${SITE_URL}${path}` : path;
}

function toIsoDate(date) {
  if (!date) return undefined;

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? undefined
    : parsed.toISOString();
}

function jsonLd(data) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const validPosts = getValidPosts();
  const categories = getCategories(validPosts);

  const requestedPage = parsePage(params?.page);
  const resolvedCategory = resolveCategory(params?.category, categories);
  const category = resolvedCategory || "All";

  const canonical = buildBlogUrl(requestedPage, category);

  const topic =
    category === "All"
      ? "Writing, SEO & AI Guides"
      : `${category} Guides`;

  const title =
    requestedPage > 1
      ? `${topic} – Page ${requestedPage} | CountFlows`
      : `${topic} | CountFlows Blog`;

  const description =
    category === "All"
      ? "Explore free CountFlows guides on writing, SEO, AI, reading, syllables, word counts, and practical content tools."
      : `Explore CountFlows ${category} guides, practical tutorials, examples, and related free tools.`;

  return {
    title,
    description,
    authors: [
      {
        name: "Umair Tufail",
        url: `${SITE_URL}/about`,
      },
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "CountFlows",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/blogs/blog2.png`,
          width: 1200,
          height: 830,
          alt: "CountFlows Blog — Writing, SEO and AI Guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/blogs/blog2.png`],
    },
    robots: {
      index: category === "All",
      follow: true,
      googleBot: {
        index: category === "All",
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;

  const validPosts = getValidPosts();
  const sortedPosts = getSortedPosts(validPosts);
  const categories = getCategories(sortedPosts);

  const requestedPage = parsePage(params?.page);
  const category = resolveCategory(params?.category, categories);

  if (!category) {
    notFound();
  }

  const categoryPosts =
    category === "All"
      ? sortedPosts
      : sortedPosts.filter((post) => post.category === category);

  const totalPages = Math.max(
    1,
    Math.ceil(categoryPosts.length / POSTS_PER_PAGE)
  );

  if (requestedPage > totalPages && categoryPosts.length > 0) {
    notFound();
  }

  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

  const pagePosts = categoryPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const canonical = buildBlogUrl(currentPage, category);

  const collectionName =
    category === "All"
      ? "CountFlows Blog"
      : `${category} Guides | CountFlows`;

  const collectionPageId = `${canonical}#collectionpage`;
  const blogId = `${BLOG_URL}#blog`;
  const itemListId = `${canonical}#itemlist`;
  const breadcrumbId = `${canonical}#breadcrumb`;

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
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        mainEntity: {
          "@id": itemListId,
        },
      },
      {
        "@type": "Blog",
        "@id": blogId,
        url: BLOG_URL,
        name: "CountFlows Blog",
        description:
          "Practical guides about writing, SEO, AI, reading, text analysis, and content creation.",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
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
            image: post.image
              ? `${SITE_URL}${post.image}`
              : undefined,
            datePublished: toIsoDate(post.date),
            author: {
              "@type":
                post.author === "Countflows Team" ||
                post.author === "CountFlows Team"
                  ? "Organization"
                  : "Person",
              name: post.author || "CountFlows Team",
            },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: BLOG_URL,
          },
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

      {/* Visible breadcrumb + separate Tools shortcut */}
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
            className="shrink-0 rounded-lg border border-gray-200 dark:border-gray-700
              px-3 py-1.5 text-sm font-semibold text-blue-600 dark:text-cyan-400
              hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
          >
            Explore Tools
          </Link>
        </div>
      </nav>

      <BlogList
        posts={pagePosts}
        categories={categories}
        selectedCategory={category}
        currentPage={currentPage}
        totalPages={totalPages}
        totalPosts={categoryPosts.length}
      />
    </>
  );
}