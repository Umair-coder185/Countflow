import { posts } from "@/lib/blogData";
import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Blog - Countflows | Writing Tips, SEO Strategies & Content Guides",
  description:
    "Discover expert writing tips, SEO optimization strategies, content creation guides, and best practices for using text analysis tools. Stay updated with the latest writing trends on Countflows Blog.",
  keywords:
    "writing tips, SEO strategies, content writing, blogging guide, writing best practices, content optimization, writing techniques",
  openGraph: {
    title: "Countflows Blog - Writing Tips & SEO Strategies",
    description:
      "Learn writing tips, SEO strategies, and content creation best practices from Countflows experts.",
    url: "https://countflows.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://countflows.com/blog",
  },
};

export default function BlogPage() {
  return <BlogList posts={posts} />;
}
