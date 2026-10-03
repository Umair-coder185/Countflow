import { posts } from "@/lib/blogData";
import { blogPath, categorySlug } from "@/lib/blogUrls";

export const SITE_URL = "https://countflows.com";
export const BLOG_URL = `${SITE_URL}/blog`;
export const POSTS_PER_PAGE = 12;

const validPosts = posts.filter((post) => post?.slug && post?.title);

export const sortedPosts = [...validPosts].sort((a, b) => {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();

  if (Number.isNaN(dateA) && Number.isNaN(dateB)) return 0;
  if (Number.isNaN(dateA)) return 1;
  if (Number.isNaN(dateB)) return -1;

  return dateB - dateA;
});

export const categories = [
  "All",
  ...Array.from(
    new Set(sortedPosts.map((post) => post.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b)),
];

export const TOTAL_ALL_PAGES = Math.max(
  1,
  Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
);

export function findCategoryBySlug(slug) {
  return (
    categories.find(
      (item) => item !== "All" && categorySlug(item) === slug
    ) || null
  );
}

export function getListing(page, category) {
  if (category !== "All") {
    const list = sortedPosts.filter((post) => post.category === category);
    return {
      pagePosts: list,
      totalPages: 1,
      currentPage: 1,
      totalPosts: list.length,
      startIndex: 0,
    };
  }

  const currentPage = Math.min(Math.max(page, 1), TOTAL_ALL_PAGES);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

  return {
    pagePosts: sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE),
    totalPages: TOTAL_ALL_PAGES,
    currentPage,
    totalPosts: sortedPosts.length,
    startIndex,
  };
}

export function buildBlogMetadata(page, category) {
  const canonical = `${SITE_URL}${blogPath(page, category)}`;

  const topic =
    category === "All" ? "Writing, SEO & AI Guides" : `${category} Guides`;

  const title =
    page > 1
      ? `${topic} – Page ${page} | CountFlows`
      : `${topic} | CountFlows Blog`;

  const description =
    category === "All"
      ? "Explore free CountFlows guides on writing, SEO, AI, reading, syllables, word counts, and practical content tools."
      : `Explore CountFlows ${category} guides, practical tutorials, examples, and related free tools.`;

  const indexable = category === "All";

  return {
    title,
    description,
    authors: [{ name: "Umair Tufail", url: `${SITE_URL}/about-us` }],
    alternates: { canonical },
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
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}