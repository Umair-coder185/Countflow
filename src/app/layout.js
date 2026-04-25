import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Providers } from "./Providers"
import { Inter, Poppins } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ subsets: ["latin"], weight: ["400","600","700"], variable: "--font-poppins" })

export const metadata = {
  metadataBase: new URL('https://countflow.com'),
  title: "Countflow - Free Word Counter, Character Counter & Writing Tools",
  description: "Countflow is the ultimate free online writing analysis tool suite. Get instant word counts, character counts, reading time estimates, and sentence analysis. Perfect for writers, students, bloggers, and SEO professionals.",
  keywords: "word counter, character counter, reading time calculator, sentence counter, free online tools, text analyzer, writing tools, seo tools, content analysis",
  authors: [{ name: "Countflow" }],
  creator: "Countflow",
  publisher: "Countflow",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://countflow.com",
    siteName: "Countflow",
    title: "Countflow - Free Word Counter & Text Analysis Tools",
    description: "Get instant word counts, character counts, reading time estimates, and sentence analysis. The best free online writing tool suite.",
    images: [
      {
        url: "https://countflow.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Countflow - Free Writing Analysis Tools",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@countflow",
    title: "Countflow - Free Word Counter & Writing Tools",
    description: "Instant text analysis with word counter, character counter, and reading time calculator.",
    images: ["https://countflow.com/og-image.png"],
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
  alternates: {
    canonical: "https://countflow.com",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}