


import BlogListClient from "@/components/blog/BlogListClient";
import BlogPagination from "@/components/blog/BlogPagination";

export default function BlogList({
  posts,
  categories,
  selectedCategory,
  currentPage,
  totalPages,
  totalPosts,
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
    </main>
  );
}