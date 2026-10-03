import { notFound } from "next/navigation";
import BlogIndexView from "@/components/blog/BlogIndexView";
import { buildBlogMetadata, TOTAL_ALL_PAGES } from "@/lib/blogIndex";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(TOTAL_ALL_PAGES - 1, 0) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  return buildBlogMetadata(Number(page), "All");
}

export default async function BlogPageN({ params }) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 2 ||
    pageNumber > TOTAL_ALL_PAGES
  ) {
    notFound();
  }

  return <BlogIndexView page={pageNumber} category="All" />;
}