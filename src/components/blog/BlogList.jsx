


import BlogListClient from "@/components/blog/BlogListClient";
import BlogPagination from "@/components/blog/BlogPagination";

export default function BlogList({
  posts,
  categories,
  selectedCategory,
  currentPage,
  totalPages,
  totalPosts,
  faqs = [],
}) {
  return (
    <main className="max-w-screen-xl mx-auto px-2 sm:px-6 md:px-8 py-6 sm:py-14 lg:py-8">
      <BlogListClient
        posts={posts}
        categories={categories}
        selectedCategory={selectedCategory}
        totalPosts={totalPosts}
      />

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedCategory={selectedCategory}
      />

      {faqs.length > 0 ? (
        <section className="mx-auto mt-16 max-w-4xl border-t border-gray-200 pt-10 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            Frequently Asked Questions About the CountFlows Blog
          </h2>
          <div className="mt-8 space-y-8">
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {faq.question}
                </h3>
                <p className="mt-2 leading-7 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}