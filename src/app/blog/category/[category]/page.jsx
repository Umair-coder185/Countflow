import { notFound } from "next/navigation";
import BlogIndexView from "@/components/blog/BlogIndexView";
import {
  buildBlogMetadata,
  categories,
  findCategoryBySlug,
} from "@/lib/blogIndex";
import { categorySlug } from "@/lib/blogUrls";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories
    .filter((item) => item !== "All")
    .map((item) => ({ category: categorySlug(item) }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const name = findCategoryBySlug(category);
  return buildBlogMetadata(1, name || "All");
}

export default async function BlogCategoryPage({ params }) {
  const { category } = await params;
  const name = findCategoryBySlug(category);

  if (!name) {
    notFound();
  }

  return <BlogIndexView page={1} category={name} />;
}