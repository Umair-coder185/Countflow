/** @type {import('next').NextConfig} */

const nextConfig = {

  reactCompiler: true,

  async redirects() {

    return [

      // ---------- Pehle se maujood redirects ----------
      {
        source: '/tools/sentence-calculator',
        destination: '/tools/sentence-counter',
        permanent: true, // 301 — purani SEO value naye URL pe transfer hogi
      },

      {
        source: '/about',
        destination: '/about-us',
        permanent: true, // 301 — /about ke purane links safe rahenge
      },

      {
        source: '/syllable-counter',
        destination: '/tools/syllable-counter',
        permanent: true,
      },

      {
        source: '/chatgpt-watermark-remover',
        destination: '/tools/chatgpt-watermark-remover',
        permanent: true,
      },

      {
        source: '/blog/what-is-camelcase',
        destination: '/blog/camelcase-pascalcase-snake-case-explained',
        permanent: true,
      },

      {
        source: '/https\\:/countflows.com/blog/best-speed-reading-programs',
        destination: '/blog/best-speed-reading-programs',
        permanent: true,
      },

      // ---------- Cluster: "2000 words → pages" (10 duplicate/garbled slugs) ----------
      // Waja: content pipeline ek hi article ke liye baar-baar naya slug generate kar raha tha —
      // crawler ko ye "auto-generated/thin content farm" jaisa dikhta hai.
      { source: '/blog/how-many-words-per-page', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-many-words-per-page-2000-words', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-many-words-per-page-essay-books-documents', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-many-words-per-page-essays-books-documents', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-many-words-per-page/essays-books-documents', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-many-pages-is-2-000-words', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-much-words-per-page-double-spaced', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-mais-is-2000-words', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-many-pages-is-2000-wordshow-many-pages-is-1000-wordswords-per-page-double-spacedhow-many-words-s-a-300-page-bookwords-per-a4-pagehandwritten-words-per-page', destination: '/blog/how-many-pages-is-2000-words', permanent: true },
      { source: '/blog/how-many-pages-is-2000-wordshow-many-words-is-1000-wordswords-besides-double-spaced', destination: '/blog/how-many-pages-is-2000-words', permanent: true },

      // ---------- Cluster: "Does ChatGPT watermark text" ----------
      // Waja: ek typo variant (chatvpn) aur ek "-7-facts" suffix wala duplicate — dono same query solve karte hain.
      { source: '/blog/does-chatgpt-watermark-text-7-facts-you-need-to-know', destination: '/blog/does-chatgpt-watermark-text', permanent: true },
      { source: '/blog/does-chatvpn-watermark-text', destination: '/blog/does-chatgpt-watermark-text', permanent: true },

      // ---------- Cluster: "How many words in a novel" ----------
      { source: '/blog/how-many-words-in-a-novel-7-genre-counts-revealed', destination: '/blog/how-many-words-in-a-novel', permanent: true },
      { source: '/blog/how-a-novel-7-genre-counts-revealed', destination: '/blog/how-many-words-in-a-novel', permanent: true },

      // ---------- Cluster: "Remove ChatGPT formatting from copied AI text" (protected page — content untouched, sirf inbound duplicates merge kar rahe hain) ----------
      { source: '/blog/how-to-remove-chatgpt-formatting-from-coppied-ai-text', destination: '/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text', permanent: true },
      { source: '/blog/how-to-remove-chatgpt-from-copied-ai-text', destination: '/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text', permanent: true },

      // ---------- Tools: confirmed typo/format duplicates ----------
      { source: '/tools/syllable_counter', destination: '/tools/syllable-counter', permanent: true }, // underscore typo
      { source: '/tools/text-repeat', destination: '/tools/text-repeater', permanent: true },
      { source: '/tools/text-reperter', destination: '/tools/text-repeater', permanent: true }, // typo

            // ---------- Tools: canonical slugs confirmed ----------
      { source: '/tools/and-replace-text', destination: '/tools/find-and-replace-text', permanent: true },
      { source: '/tools/ai-token-context', destination: '/tools/ai-token-counter', permanent: true },
      { source: '/tools/ai-target-counter', destination: '/tools/ai-token-counter', permanent: true },
      { source: '/tools/countflows-reading-time-calculator', destination: '/tools/reading-time', permanent: true },
      { source: '/tools/reading-time-this-text', destination: '/tools/reading-time', permanent: true },

      // ---------- Off-topic broken slug ----------
      { source: '/blog/where-was-the-filmed', destination: '/blog/where-was-the-hobbit-filmed', permanent: true }, // truncated slug fix; final fate of this page (rework/redirect elsewhere) abhi decide karna baaki hai

      // ---------- ROOT-CAUSE FIX: koi bhi trailing-slash duplicate (ab + future) ----------
      // Waja: /text-repeater/, /syllable-counter/, /reading-time-calculator/, /does-chatgpt-watermark-text/
      // waghera sab isi ek rule se 301 ho jayenge — ab har naye trailing-slash variant ke liye
      // alag se entry likhne ki zaroorat nahi.
      {
        source: '/:path((?!_next|api).*)/',
        destination: '/:path',
        permanent: true,
      },

    ];

  },

  async headers() {

    return [

      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },

      {
        source: '/logo.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000' }
        ]
      },

      {
        source: '/og-image.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' }
        ]
      }

    ]

  }

};

export default nextConfig;