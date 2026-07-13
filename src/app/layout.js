import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Providers } from "./Providers"
import { Inter, Poppins } from "next/font/google"
import Script from "next/script";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ subsets: ["latin"], weight: ["400","600","700"], variable: "--font-poppins" })

export const metadata = {
  metadataBase: new URL('https://countflows.com'),
  // 🐛 FIX: title ab object hai, template iske andar
  title: {
    default: "Free Word & Character Counter Tools - Countflows",
  
  },
  description: "Free online word counter, character counter, and text analysis tools for writers, bloggers, and SEO. Get instant counts, reading time, and improve your content.",
  // ❌ keywords line delete kar di
  authors: [{ name: "Umair Tufail" }],
  creator: "Umair Tufail",
  publisher: "Umair Tufail",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://countflows.com",
    siteName: "Countflows",
    title: "Free Word Counter & Text Analysis Tools",
    description: "Get instant word counts, character counts, reading time estimates, and sentence analysis. The best free online writing tool suite.",
    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Countflows - Free Writing Analysis Tools",
        type: "image/png",
        secureUrl: "https://countflows.com/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@countflows",
    title: "Countflows - Free Word Counter & Writing Tools",
    description: "Instant text analysis with word counter, character counter, and reading time calculator.",
    images: [
      {
        url: "https://countflows.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Countflows Writing Tools",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
       { url: "/favicon.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
     
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon.png", type: "image/png", sizes: "180x180" },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Organization + WebSite schema — pure site pe ek baar */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5H9EXT0X10"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5H9EXT0X10');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-900 dark:to-blue-950 text-gray-900 dark:text-white transition-colors duration-300`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}