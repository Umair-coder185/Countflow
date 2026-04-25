import { posts } from "@/lib/blogData"

export async function generateMetadata({ params }) {

  const post = posts.find((p) => p.slug === params.slug)

  return {
    title: post?.title,
    description: post?.description
  }
}

export default function BlogPost({ params }) {

  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    return <div className="p-10">Post not found</div>
  }

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-16">

      <h1 className="text-3xl font-bold mb-6">
        {post.title}
      </h1>

      <p className="text-gray-500 mb-10">
        {post.description}
      </p>

      <article className="prose max-w-none">
        {post.content}
      </article>

    </main>
  )
}