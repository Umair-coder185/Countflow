import { posts } from "@/lib/blogData";   
import BlogContent from "@/components/blog/BlogContent";

export async function generateMetadata({ params }) {
  const { slug: slugParam } = await params;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: post.title + " | Countflows Blogs",
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
  const { slug: slugParam } = await params;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
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

  // Article Schema Markup
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": `https://countflows.com${post.image}`,
    "url": `https://countflows.com/blog/${slug}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Countflows",
      "logo": {
        "@type": "ImageObject",
        "url": "https://countflows.com/logo.png"
      }
    },
    "articleBody": post.excerpt
  };

  // Breadcrumb for the article
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://countflows.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://countflows.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://countflows.com/blog/${slug}`
      }
    ]
  };

  // FAQ Schema Markup (if FAQs exist in post)
  const faqSchema = post.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogContent post={post} />
    </>
  );
}
