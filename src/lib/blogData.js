import seoContent from "./blogs/seo-content-writing-guide";
import howToManageEssayWordCount  from "./blogs/how-to-manage-esaay";

export const posts = [
  {
    id: 1,
    slug: "seo-content-writing-guide",
    title: "SEO Content Writing Guide for Blogging & Optimization",
    description: "Master SEO content writing to engage readers and outrank competitors. Learn practical skills to optimize your copy and target keywords.",
    excerpt: "Learn SEO content writing, keyword optimization, blogging strategies, search intent, readability, and on-page SEO techniques.",
    image: "/blogs/seo-keyword-research.png",
    category: "SEO",
    author: "Countflows Team",
    date: "May 21, 2026",
    readTime: "12 min read",
    keywords: ["SEO content writing", "blogging", "on-page SEO", "keyword optimization", "search intent", "content structure", "keyword research online"],
    content: seoContent,
  },


   {
    id: 2,
    slug: "manage-essay-word-count",
    title: "How to Manage Essay Word Count Effectively",
    description: "Learn how to manage essay word count effectively with latest strategies. Discover tips for improving readability and meeting academic requirements.",
    excerpt: "Managing essay word count starts at the outline stage, not the writing stage...",
    image: "/blogs/blog2.png",
    category: "Academic Writing",
    author: "Countflows Team",
    date: "May 17, 2026",
    readTime: "15 min read",
    keywords: ["essay word count", "academic writing", "college essays"],
    content: howToManageEssayWordCount,
  },
];

export const blogs = posts;