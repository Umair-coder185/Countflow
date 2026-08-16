import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { posts } from "@/lib/blogData";
import BlogContent from "@/components/blog/BlogContent";

const SITE_URL = "https://countflows.com";
const BLOG_URL = `${SITE_URL}/blog`;

function getSlug(slugParam) {
  return Array.isArray(slugParam) ? slugParam[0] : slugParam;
}

function getPost(slug) {
  return posts.find((post) => post?.slug === slug);
}

function absoluteUrl(value) {
  if (!value) return undefined;

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function toIsoDate(value) {
  if (!value) return undefined;

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime())
    ? undefined
    : parsed.toISOString();
}

function authorSchema(author) {
  const name = author?.trim() || "CountFlows Team";

  if (
    name.toLowerCase() === "countflows team" ||
    name.toLowerCase() === "countflow team"
  ) {
    return {
      "@type": "Organization",
      name: "CountFlows",
      url: SITE_URL,
    };
  }

  return {
    "@type": "Person",
    name,
  };
}

function jsonLd(data) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function generateStaticParams() {
  return posts
    .filter((post) => post?.slug)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }) {
  const { slug: slugParam } = await params;
  const slug = getSlug(slugParam);
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | CountFlows",
      description:
        "The CountFlows blog post you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `${BLOG_URL}/${slug}`;
  const image = absoluteUrl(post.image);

  return {
    title: `${post.title} | CountFlows Blog`,
    description: post.description,
    authors: [
      {
        name: post.author?.trim() || "CountFlows Team",
        url: `${SITE_URL}/about`,
      },
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: "CountFlows",
      type: "article",
      locale: "en_US",
      publishedTime: toIsoDate(post.date),
      modifiedTime: toIsoDate(post.dateModified || post.updatedAt || post.date),
      authors: post.author ? [post.author.trim()] : undefined,
      images: image
        ? [
            {
              url: image,
              alt: post.imageAlt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: image ? [image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug: slugParam } = await params;
  const slug = getSlug(slugParam);
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const canonical = `${BLOG_URL}/${slug}`;
  const image = absoluteUrl(post.image);
  const datePublished = toIsoDate(post.date);
  const dateModified = toIsoDate(
    post.dateModified || post.updatedAt || post.date
  );

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    url: canonical,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    image: image
      ? {
          "@type": "ImageObject",
          url: image,
        }
      : undefined,
    datePublished,
    dateModified,
    author: authorSchema(post.author),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CountFlows",
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${BLOG_URL}#blog`,
      name: "CountFlows Blog",
      url: BLOG_URL,
    },
    keywords:
      Array.isArray(post.keywords) && post.keywords.length
        ? post.keywords.filter(Boolean).join(", ")
        : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  const faqSchema =
    Array.isArray(post.faqs) && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: post.faqs
            .filter((faq) => faq?.question && faq?.answer)
            .map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleSchema)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)}
      />

      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(faqSchema)}
        />
      ) : null}

      <nav
  aria-label="Breadcrumb"
  className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pt-24 sm:pt-28 lg:pt-28"
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

      <li>
        <Link
          href="/blog"
          className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
        >
          Blog
        </Link>
      </li>

      <li aria-hidden="true">
        <ChevronRight className="h-4 w-4" />
      </li>

      <li
        aria-current="page"
        className="max-w-[220px] sm:max-w-[350px] lg:max-w-[520px] truncate font-medium text-gray-700 dark:text-gray-300"
        title={post.title}
      >
        {post.title}
      </li>
    </ol>

    {/* Tools shortcut */}
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

      <BlogContent post={post} />
    </>
  );
}