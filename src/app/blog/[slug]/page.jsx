import { posts } from "@/lib/blogData";   
import BlogContent from "@/components/blog/BlogContent";

export async function generateMetadata({ params }) {
  const { slug } = await params;   // ✅ await params
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: post.title + " | Countflows Blog",
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      url: `https://countflows.com/blog/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://countflows.com/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;   // ✅ await params
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Post not found</h1>
          <a href="/blog" className="text-blue-600 hover:underline">
            ← Back to Blog
          </a>
        </div>
      </main>
    );
  }

  return <BlogContent post={post} />;
}
