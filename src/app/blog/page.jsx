import BlogIndexView from "@/components/blog/BlogIndexView";
import { buildBlogMetadata } from "@/lib/blogIndex";

export const metadata = buildBlogMetadata(1, "All");

export default function BlogPage() {
  return <BlogIndexView page={1} category="All" />;
}