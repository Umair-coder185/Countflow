// app/tools/character-counter/layout.js
// FIX: schema <script> yahan se HATA diya gaya hai.
// WebApplication + Breadcrumb + FAQ schema ab server page.jsx (File A) mein render hote hain.
// Do jagah schema rakhna = duplicate structured data.

export const metadata = {
  title: "Free Character Counter \u2013 With & Without Spaces, All Limits",
  description:
    "Count characters with and without spaces instantly. Check limits for X (Twitter), Instagram, SMS, meta descriptions, and UCAS \u2014 free, private, no sign-up.",
  openGraph: {
    title: "Free Character Counter \u2013 With & Without Spaces, All Limits",
    description:
      "Count characters with and without spaces instantly, and check every major platform limit in one place.",
    url: "https://countflows.com/tools/character-counter",
    type: "website",
    images: [
      {
        // FIX: blogs/blog3-1.png (blog image) ki jagah proper OG image
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CountFlows Character Counter",
      },
    ],
  },
  alternates: {
    canonical: "https://countflows.com/tools/character-counter",
  },
}

export default function Layout({ children }) {
  return children
}