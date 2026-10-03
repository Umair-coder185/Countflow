"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import { blogPath } from "@/lib/blogUrls";
import { BookOpen } from "lucide-react";

export default function BlogListClient({
  posts = [],
  categories = ["All"],
  selectedCategory = "All",
  totalPosts = 0,
}) {
  const router = useRouter();
  const [category, setCategory] = useState(selectedCategory);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const safePosts = Array.isArray(posts) ? posts : [];
  const safeCategories = Array.isArray(categories)
    ? categories
    : ["All"];

  function handleCategoryChange(event) {
    const nextCategory = event.target.value;
    setCategory(nextCategory);
    router.push(blogPath(1, nextCategory));
  }

  return (
    <>
      <header className="mb-6 text-center">
        <div
          className="flex justify-center mb-2 "
          aria-hidden="true"
        >
          <BookOpen className="w-10 h-10 text-blue-600 dark:text-cyan-400 mt--2" />
        </div>

        {selectedCategory === "All" ? (
          <>
            <h1 className="mx-auto mb-2 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              <span className="premium-gradient">CountFlows Blog</span>
            </h1>
            <h2 className="mx-auto mb-4 max-w-4xl text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
              Master Text Formatting, AI Tools, and Writing Productivity
            </h2>
          </>
        ) : (
          <h1 className="mx-auto mb-4 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
            {selectedCategory} Guides
          </h1>
        )}

        <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {selectedCategory === "All"
            ? "Welcome to the CountFlows blog, your ultimate resource for text analysis, AI formatting fixes, and professional writing conventions. Whether you are learning how to accurately count syllables, fixing ChatGPT formatting glitches, or mastering programming naming styles like camelCase and snake_case, our research-backed guides provide the clear, practical answers you need. Pair our tutorials with our suite of free online tools to write, format, and analyze text faster."
            : `Explore CountFlows ${selectedCategory} guides, practical tutorials, examples, and related free tools.`}
        </p>
      </header>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalPosts} {totalPosts === 1 ? "article" : "articles"}
          {selectedCategory !== "All"
            ? ` in ${selectedCategory}`
            : ""}
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="blog-category-filter"
            className="sr-only"
          >
            Filter by category
          </label>

          <select
            id="blog-category-filter"
            value={category}
            onChange={handleCategoryChange}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter posts by category"
          >
            {safeCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {safePosts.length > 0 ? (
        <section
          className="grid gap-6 sm:gap-8 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Blog posts"
        >
          {safePosts.map((post, index) => (
            <BlogCard
              key={post.id || post.slug}
              post={post}
              priority={index < 3}
            />
          ))}
        </section>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No articles are available in this category yet.
          </p>
        </div>
      )}
    </>
  );
}