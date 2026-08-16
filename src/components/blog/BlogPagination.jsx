import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function buildHref(page, selectedCategory) {
  const params = new URLSearchParams();

  if (
    selectedCategory &&
    selectedCategory !== "All"
  ) {
    params.set("category", selectedCategory);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return `/blog${query ? `?${query}` : ""}`;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  selectedCategory = "All",
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {currentPage > 1 ? (
        <Link
          href={buildHref(
            currentPage - 1,
            selectedCategory
          )}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label={`Go to blog page ${currentPage - 1}`}
        >
          <ChevronLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
          Previous
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
          aria-disabled="true"
        >
          <ChevronLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
          Previous
        </span>
      )}

      {pages.map((page) => {
        const isCurrent = page === currentPage;

        return isCurrent ? (
          <span
            key={page}
            aria-current="page"
            className="min-w-10 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page, selectedCategory)}
            className="min-w-10 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Go to blog page ${page}`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(
            currentPage + 1,
            selectedCategory
          )}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label={`Go to blog page ${currentPage + 1}`}
        >
          Next
          <ChevronRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
          aria-disabled="true"
        >
          Next
          <ChevronRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </span>
      )}
    </nav>
  );
}