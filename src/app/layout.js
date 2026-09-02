// src/app/layout.js

import "./globals.css"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Providers } from "./Providers"

import { Inter } from "next/font/google"
import Script from "next/script"

import {
  organizationSchema,
  websiteSchema,
} from "@/lib/schema"

/* -------------------------------------------------------------------------- */
/*                                  FONTS                                     */
/* -------------------------------------------------------------------------- */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

/* -------------------------------------------------------------------------- */
/*                             GLOBAL METADATA                                */
/* -------------------------------------------------------------------------- */

const SITE = "https://countflows.com"

const defaultTitle =
  "Free Online Text Tools for Writing, SEO & AI | CountFlows"

const defaultDescription =
  "Free online text tools for writing, SEO and AI. Count words, characters, sentences, syllables and AI tokens, check reading time, keywords and more."

export const metadata = {
  metadataBase: new URL(SITE),

  applicationName: "CountFlows",

  /*
    Global fallback only.

    Individual tool/blog pages should define
    their own specific title and description.
  */
  title: {
    default: defaultTitle,
  },

  description: defaultDescription,

  creator: "CountFlows",
  publisher: "CountFlows",

  verification: {
    other: {
      "p:domain_verify":
        "b217ae0c175a4a1c20c289f095490fd6",
    },
  },

  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  /* ---------------------------------------------------------------------- */
  /* OPEN GRAPH                                                             */
  /* ---------------------------------------------------------------------- */

  openGraph: {
    type: "website",
    locale: "en_US",

    url: SITE,
    siteName: "CountFlows",

    title: defaultTitle,
    description: defaultDescription,

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",

        alt:
          "CountFlows free online text tools for writing, SEO and AI",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* X / TWITTER                                                            */
  /* ---------------------------------------------------------------------- */

  twitter: {
    card: "summary_large_image",

    title: defaultTitle,
    description: defaultDescription,

    images: [
      {
        url: "/og-image.png",

        alt:
          "CountFlows free online text tools for writing, SEO and AI",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* CRAWLING                                                               */
  /* ---------------------------------------------------------------------- */

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

  /* ---------------------------------------------------------------------- */
  /* ICONS                                                                  */
  /* ---------------------------------------------------------------------- */

  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "any",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
}

/* -------------------------------------------------------------------------- */
/*                              JSON-LD HELPER                                */
/* -------------------------------------------------------------------------- */

const jsonLd = (data) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
})

/* -------------------------------------------------------------------------- */
/*                               ROOT LAYOUT                                  */
/* -------------------------------------------------------------------------- */

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <head>
        {/* -------------------------------------------------------------- */}
        {/* GOOGLE ADSENSE VERIFICATION                                    */}
        {/* -------------------------------------------------------------- */}

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4043970460592255"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body
        className="
          min-h-screen
          bg-gradient-to-br
          from-white
          via-slate-50
          to-blue-50

          font-sans
          text-gray-900
          antialiased

          dark:bg-gradient-to-br
          dark:from-gray-950
          dark:via-slate-900
          dark:to-blue-950
          dark:text-white

          transition-colors
          duration-300
        "
      >
        {/* -------------------------------------------------------------- */}
        {/* GLOBAL STRUCTURED DATA                                         */}
        {/* Organization + WebSite schema only once site-wide              */}
        {/* -------------------------------------------------------------- */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(
            organizationSchema
          )}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(
            websiteSchema
          )}
        />

        {/* -------------------------------------------------------------- */}
        {/* APPLICATION                                                    */}
        {/* -------------------------------------------------------------- */}

        <Providers>
          <Navbar />

          {/*
            No <main> here.

            Each page should own its own <main>
            to avoid nested <main> elements.
          */}
          {children}

          <Footer />
        </Providers>

        {/* -------------------------------------------------------------- */}
        {/* GOOGLE ANALYTICS                                               */}
        {/* -------------------------------------------------------------- */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5H9EXT0X10"
          strategy="lazyOnload"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-5H9EXT0X10');
          `}
        </Script>
      </body>
    </html>
  )
}