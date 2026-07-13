export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/tools/",
          "/blog/",
          "/tools/word-counter",
          "/tools/character-counter",
          "/tools/reading-time",
          "/tools/sentence-counter",
          "/tools/keyword-density-checker",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
          "/server/",
          "/scripts/",
          "/assets/temp/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],

    sitemap: "https://countflows.com/sitemap.xml",
  };
}