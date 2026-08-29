import Link from "next/link";
import Image from "next/image";
import { motion } from "@/lib/no-motion";
import {
  Calendar,
  User,
  Clock,
  Tag,
  ImageIcon,
  ArrowRight,
  Wrench,
} from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import authors from "@/lib/authors";
import { posts } from "@/lib/blogData";

const UMAIR_AUTHOR_IMAGE = "/images/umair-tufail.webp";




const TOOL_LIBRARY = {
  wordCounter: {
    name: "Word Counter",
    href: "/tools/word-counter",
    description: "Count words and characters instantly while you write or edit.",
  },
  sentenceCounter: {
    name: "Sentence Counter",
    href: "/tools/sentence-counter",
    description: "Check sentence count, sentence length, and text structure.",
  },
  readingTime: {
    name: "Reading Time Calculator",
    href: "/tools/reading-time",
    description: "Estimate how long any text takes to read or speak.",
  },
  syllableCounter: {
    name: "Syllable Counter",
    href: "/tools/syllable-counter",
    description: "Count syllables by word and line for poetry, lyrics, and pronunciation.",
  },
  aiTextCleaner: {
    name: "AI Text Cleaner",
    href: "/tools/ai-text-cleaner",
    description: "Clean AI-generated formatting, markdown, and hidden text artifacts.",
  },
};

function getAutomaticTools(post) {
  const searchText = [
    post?.title,
    post?.description,
    post?.category,
    ...(Array.isArray(post?.keywords) ? post.keywords : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // AI Text Cleaner is intentionally included in every article.
  if (
    /syllable|poetry|poem|haiku|sonnet|lyrics|pronunciation|meter/.test(
      searchText
    )
  ) {
    return [
      TOOL_LIBRARY.aiTextCleaner,
      TOOL_LIBRARY.syllableCounter,
      TOOL_LIBRARY.wordCounter,
    ];
  }

  if (
    /reading|read time|wpm|words per minute|speech|book|novel|audiobook/.test(
      searchText
    )
  ) {
    return [
      TOOL_LIBRARY.aiTextCleaner,
      TOOL_LIBRARY.readingTime,
      TOOL_LIBRARY.wordCounter,
    ];
  }

  if (
    /\bai\b|chatgpt|claude|gemini|copilot|ai-generated|ai writing/.test(
      searchText
    )
  ) {
    return [
      TOOL_LIBRARY.aiTextCleaner,
      TOOL_LIBRARY.wordCounter,
      TOOL_LIBRARY.sentenceCounter,
    ];
  }

  return [
    TOOL_LIBRARY.aiTextCleaner,
    TOOL_LIBRARY.wordCounter,
    TOOL_LIBRARY.sentenceCounter,
  ];
}

function getRelatedTools(post) {
  const manualTools = Array.isArray(post?.relatedTools)
    ? post.relatedTools.filter((tool) => tool?.name && tool?.href)
    : [];

  const automaticTools = getAutomaticTools(post);

  // Keep AI Text Cleaner guaranteed in every article, then respect
  // article-specific manual tools, then fill any remaining slots automatically.
  const combined = [
    TOOL_LIBRARY.aiTextCleaner,
    ...manualTools,
    ...automaticTools,
  ];

  const seen = new Set();

  return combined
    .filter((tool) => {
      if (seen.has(tool.href)) return false;
      seen.add(tool.href);
      return true;
    })
    .slice(0, 3);
}

function getAuthorInfo(author) {
  if (!author) return null;

  const key = author
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return authors[key] || null;
}

function getRelatedPosts(post) {
  if (!post?.slug) return [];

  const validPosts = posts.filter(
    (item) => item?.slug && item?.title && item.slug !== post.slug
  );

  // If a post defines relatedPosts manually, show those first.
  // Missing/invalid slugs are ignored, then the existing automatic
  // category/keyword logic fills any remaining slots.
  const manualRelatedPosts = Array.isArray(post?.relatedPosts)
    ? post.relatedPosts
        .map((slug) => validPosts.find((item) => item.slug === slug))
        .filter(Boolean)
    : [];

  const sameCategory = validPosts.filter(
    (item) => item.category && item.category === post.category
  );

  const sameKeyword = validPosts.filter((item) => {
    if (!Array.isArray(post.keywords) || !Array.isArray(item.keywords)) {
      return false;
    }

    const currentKeywords = new Set(
      post.keywords
        .filter(Boolean)
        .map((keyword) => keyword.toLowerCase().trim())
    );

    return item.keywords.some((keyword) =>
      currentKeywords.has(keyword?.toLowerCase().trim())
    );
  });

  const combined = [
    ...manualRelatedPosts,
    ...sameCategory,
    ...sameKeyword,
    ...validPosts,
  ];

  const seen = new Set();

  return combined
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    })
    .slice(0, 3);
}

function RelatedArticlesMobile({ relatedPosts }) {
  if (!relatedPosts.length) return null;

  return (
    <section
      className="mt-14 pt-10 border-t border-gray-200 dark:border-gray-700 lg:hidden"
      aria-labelledby="related-articles-mobile-heading"
    >
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <h2
            id="related-articles-mobile-heading"
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            Related Articles
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Continue with closely related CountFlows guides.
          </p>
        </div>

        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {relatedPosts.map((relatedPost) => (
          <Link
            key={relatedPost.slug}
            href={`/blog/${relatedPost.slug}`}
            className="group rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition hover:border-blue-300 dark:hover:border-cyan-700 hover:shadow-md"
          >
            {relatedPost.category ? (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-cyan-400">
                {relatedPost.category}
              </p>
            ) : null}

            <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
              {relatedPost.title}
            </h3>

            {relatedPost.excerpt || relatedPost.description ? (
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400 line-clamp-3">
                {relatedPost.excerpt || relatedPost.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

function DesktopSidebar({ relatedPosts, relatedTools }) {
  if (!relatedPosts.length && !relatedTools.length) return null;

  return (
    <aside className="hidden lg:block" aria-label="Related content">
      <div className="sticky top-28 space-y-5">
        {relatedPosts.length > 0 ? (
          <section
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            aria-labelledby="related-articles-desktop-heading"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2
                id="related-articles-desktop-heading"
                className="text-lg font-bold text-gray-900 dark:text-gray-100"
              >
                Related Articles
              </h2>

              <Link
                href="/blog"
                className="shrink-0 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block rounded-lg border border-gray-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/60 dark:border-gray-800 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/20"
                >
                  <div className="flex gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-cyan-300"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      {relatedPost.category ? (
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600 dark:text-cyan-400">
                          {relatedPost.category}
                        </p>
                      ) : null}

                      <h3 className="text-sm font-bold leading-5 text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                        {relatedPost.title}
                      </h3>

                      {relatedPost.readTime ? (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {relatedPost.readTime}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {relatedTools.length > 0 ? (
          <section
            className="rounded-xl border border-cyan-200 bg-cyan-50/70 p-5 shadow-sm dark:border-cyan-900/60 dark:bg-cyan-950/30"
            aria-labelledby="related-tools-desktop-heading"
          >
            <div className="mb-4 flex items-center gap-2">
              <Wrench
                className="h-4 w-4 text-cyan-700 dark:text-cyan-300"
                aria-hidden="true"
              />
              <h2
                id="related-tools-desktop-heading"
                className="text-lg font-bold text-gray-900 dark:text-gray-100"
              >
                Related Tools
              </h2>
            </div>

            <div className="space-y-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block rounded-lg border border-cyan-200 bg-white p-3 transition hover:border-cyan-400 hover:shadow-sm dark:border-cyan-800 dark:bg-gray-900"
                >
                  <p className="text-sm font-bold text-gray-900 group-hover:text-cyan-700 dark:text-gray-100 dark:group-hover:text-cyan-300">
                    {tool.name}
                  </p>

                  {tool.description ? (
                    <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400 line-clamp-3">
                      {tool.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>

            <Link
              href="/tools"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300 hover:underline"
            >
              Explore all tools
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </section>
        ) : null}
      </div>
    </aside>
  );
}

export default function BlogContent({ post }) {
  const keywords = Array.isArray(post?.keywords)
    ? post.keywords.filter(Boolean)
    : [];

  const relatedTools = getRelatedTools(post);

  const relatedPosts = getRelatedPosts(post);
  const authorInfo = getAuthorInfo(post?.author);
  const authorImage =
    authorInfo?.image ||
    (authorInfo?.name?.trim().toLowerCase() === "umair tufail"
      ? UMAIR_AUTHOR_IMAGE
      : null);

  const imageSrc =
    typeof post?.image === "string" && post.image.trim()
      ? post.image.trim()
      : null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 lg:py-12">
      {/*
        Structured data is intentionally NOT rendered here.
        BlogPosting, BreadcrumbList, and FAQPage JSON-LD are handled once
        in app/blog/[slug]/page.jsx to avoid duplicate schemas.
      */}

      <div className="max-w-5xl mx-auto">
        <BlogHeader
          title={post.title}
          subtitle={post.description}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] gap-8 xl:gap-10 items-start">
        <article className="min-w-0 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden px-6 sm:px-8 md:px-10 xl:px-12 py-8 sm:py-12 md:py-16">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-64 sm:h-72 md:h-96 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-8 sm:mb-12 md:mb-14 rounded-lg"
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={post?.imageAlt || post.title}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) calc(100vw - 380px), calc(100vw - 440px)"
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-800 dark:to-slate-900"
                aria-hidden="true"
              >
                <ImageIcon className="h-12 w-12 text-blue-400 dark:text-cyan-500" />
              </div>
            )}
          </motion.div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
            {post?.author ? (
              <span className="flex items-center gap-1 font-semibold text-gray-900 dark:text-gray-100">
                <User className="w-4 h-4" aria-hidden="true" />
                {post.author}
              </span>
            ) : null}

            {post?.date ? (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {post.date}
              </span>
            ) : null}

            {post?.readTime ? (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {post.readTime}
              </span>
            ) : null}

            {post?.category ? (
              <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 sm:px-3 py-1 rounded-full">
                <Tag className="w-4 h-4" aria-hidden="true" />
                {post.category}
              </span>
            ) : null}
          </div>

          {/* Topics */}
          {keywords.length > 0 ? (
            <div className="mb-10 pb-10 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                Topics Covered:
              </p>

              <div className="flex flex-wrap justify-start gap-2">
                {keywords.map((keyword, index) => (
                  <span
                    key={`${keyword}-${index}`}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-xs sm:text-sm md:text-base"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Mobile/tablet only: tools stay inside article */}
          {relatedTools.length > 0 ? (
            <section
              className="mb-10 rounded-xl border border-cyan-200 bg-cyan-50/80 p-4 sm:p-6 dark:border-cyan-900/60 dark:bg-cyan-950/40 lg:hidden"
              aria-labelledby="related-tools-mobile-heading"
            >
              <h2
                id="related-tools-mobile-heading"
                className="text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300 mb-3"
              >
                Helpful tools for this guide
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-lg border border-cyan-200 bg-white p-4 text-left shadow-sm transition hover:border-cyan-400 hover:shadow-md dark:border-cyan-800 dark:bg-gray-900"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </p>

                    {tool.description ? (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {tool.description}
                      </p>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {/* Main Content */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose blog-content prose-sm sm:prose-base md:prose-lg xl:prose-xl dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
              prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl xl:prose-h2:text-4xl
              prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl xl:prose-h3:text-3xl
              prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-img:rounded-lg prose-img:w-full prose-img:h-auto prose-img:my-4
              prose-ul:list-disc prose-ul:ml-5 prose-ul:my-3
              prose-ol:list-decimal prose-ol:ml-5 prose-ol:my-3
              prose-table:w-full prose-table:my-4 prose-table:text-sm sm:prose-table:text-base
              prose-th:p-2 sm:prose-th:p-3 prose-td:p-2 sm:prose-td:p-3
              prose-a:text-cyan-600 dark:prose-a:text-cyan-400
              prose-a:underline prose-a:font-medium
              hover:prose-a:text-cyan-700 dark:hover:prose-a:text-cyan-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Mobile/tablet only: Related Articles stay below article */}
          <RelatedArticlesMobile relatedPosts={relatedPosts} />

          {/* Author Section */}
          <div className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-700">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">

              {/* Author information */}
              <div className="flex items-start gap-4">
                {authorInfo ? (
                  <>
                    {/* Author image */}
                    {authorImage ? (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-sm ring-1 ring-gray-200 dark:border-gray-900 dark:bg-gray-800 dark:ring-gray-700">
                        <Image
                          src={authorImage}
                          alt={`${authorInfo.name}${authorInfo.role ? `, ${authorInfo.role}` : ""} at CountFlows`}
                          fill
                          sizes="64px"
                          className="object-cover object-[50%_16%]"
                        />
                      </div>
                    ) : (
                      /* Fallback initials */
                      <div
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        aria-hidden="true"
                      >
                        {authorInfo.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}

                    {/* Author text */}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Written by
                      </p>

                      <p className="text-base font-bold text-gray-900 dark:text-gray-100 sm:text-lg md:text-xl">
                        {authorInfo.name}
                      </p>

                      {authorInfo.role ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {authorInfo.role}
                        </p>
                      ) : null}

                      {authorInfo.bio ? (
                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-700 dark:text-gray-300">
                          {authorInfo.bio}
                        </p>
                      ) : null}

                      {authorInfo.twitter || authorInfo.linkedin ? (
                        <div className="mt-3 flex gap-4">
                          {authorInfo.twitter ? (
                            <a
                              href={authorInfo.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${authorInfo.name} on X`}
                              className="text-sm font-medium text-blue-600 hover:underline dark:text-cyan-400"
                            >
                              Twitter
                            </a>
                          ) : null}

                          {authorInfo.linkedin ? (
                            <a
                              href={authorInfo.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${authorInfo.name} on LinkedIn`}
                              className="text-sm font-medium text-blue-600 hover:underline dark:text-cyan-400"
                            >
                              LinkedIn
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Written by
                    </p>

                    <p className="text-base font-bold text-gray-900 dark:text-gray-100 sm:text-lg md:text-xl">
                      {post?.author || "CountFlows Team"}
                    </p>
                  </div>
                )}
              </div>

              {/* Blog CTA */}
              <Link
                href="/blog"
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:px-6 sm:py-3 sm:text-base md:text-lg"
              >
                ← Read More Articles
              </Link>

            </div>
          </div>
        </article>

        {/* Desktop only: Related Articles + Related Tools */}
        <DesktopSidebar
          relatedPosts={relatedPosts}
          relatedTools={relatedTools}
        />
      </div>
    </main>
  );
}