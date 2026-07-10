import { posts } from "@/lib/blogData";

export async function GET() {
  const baseUrl = "https://countflows.com";
  const staticRoutes = [
    "/",
    "/tools/word-counter",
    "/tools/character-counter",
    "/tools/reading-time",
    "/tools/sentence-calculator",
    "/tools/keyword-density-checker",
    "/blog",
    "/about-us",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const blogRoutes = posts.map((post) => `/blog/${post.slug}`);
  const routes = [...staticRoutes, ...blogRoutes];
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = routes
    .map(
      (route) => `    <url>\n      <loc>${baseUrl}${route}</loc>\n      <lastmod>${lastmod}</lastmod>\n      <changefreq>weekly</changefreq>\n      <priority>0.7</priority>\n    </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
