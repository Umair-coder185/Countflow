export async function GET() {
  const baseUrl = "https://countflows.com";
  const routes = [
    "/",
    "/tools/word-counter",
    "/tools/character-counter",
    "/tools/reading-time",
    "/tools/sentence-calculator",
    "/tools/keyword-density-checker",
    "/blog",
    "/blog/seo-content-writing-guide",
    "/blog/manage-essay-word-count",
    "/blog/academic-writing",
    "/blog/how-many-pages-is-2000-words",
    "/blog/cover-letter-word-count",
    "/blog/common-writing-mistakes",
    "/blog/how-many-words-in-a-novel",
    "/blog/keyboard-shortcut-word-count",
    "/blog/how-long-should-a-blog-post-be",
    "/blog/check-word-count-in-google-docs",
    "/blog/how-to-read-military-time",
    "/blog/the-great-gatsby",
    "/blog/how-to-read-faster",
    "/blog/where-was-the-hobbit-filmed",
    "/blog/how-to-check-keyword-density",
    "/blog/how-to-calculate-words-per-minute-reading",
    "/blog/how-long-does-it-take-to-read-10000-words",
    "/blog/average-reading-speed",
    "/blog/best-speed-reading-programs",
    "/about-us",
    "/contact",
    "/privacy-policy",
    "/terms"
    
  ];

  const urls = routes.map(
    (route) => `    <url>\n      <loc>${baseUrl}${route}</loc>\n      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n      <changefreq>weekly</changefreq>\n      <priority>0.7</priority>\n    </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600"
    }
  });
}
