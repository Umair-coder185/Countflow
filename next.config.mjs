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
      // NEW: a third concatenated garbled variant of the same cluster, confirmed in the raw GSC export
      { source: '/blog/what-edges-is-2000-wordshow-many-pages-is-1000-wordswords-per-page-double-spacedhow-many-words-is-a-300-page-bookwords-per-a4-pagehandwritten-words-per-page', destination: '/blog/how-many-pages-is-2000-words', permanent: true },

      // ---------- Cluster: "Does ChatGPT watermark text" ----------
      // Waja: ek typo variant (chatvpn) aur ek "-7-facts" suffix wala duplicate — dono same query solve karte hain.
      { source: '/blog/does-chatgpt-watermark-text-7-facts-you-need-to-know', destination: '/blog/does-chatgpt-watermark-text', permanent: true },
      { source: '/blog/does-chatvpn-watermark-text', destination: '/blog/does-chatgpt-watermark-text', permanent: true },
      // NEW: confirmed in raw GSC export, missing before
      { source: '/blog/does-agent-watermark-text', destination: '/blog/does-chatgpt-watermark-text', permanent: true },

      { source: '/blog/does-chatgpt-watermark-text-7-facts-you-need-to-know/', destination: '/blog/does-chatgpt-watermark-text', permanent: true },
      { source: '/blog/does-chatgpt-watermark-text/', destination: '/blog/does-chatgpt-watermark-text', permanent: true },
      // ---------- Cluster: "How many words in a novel" ----------
      { source: '/blog/how-many-words-in-a-novel-7-genre-counts-revealed', destination: '/blog/how-many-words-in-a-novel', permanent: true },
      { source: '/blog/how-a-novel-7-genre-counts-revealed', destination: '/blog/how-many-words-in-a-novel', permanent: true },

      // ---------- Cluster: "Remove ChatGPT formatting from copied AI text" (protected page — content untouched, sirf inbound duplicates merge kar rahe hain) ----------
      { source: '/blog/how-to-remove-chatgpt-formatting-from-coppied-ai-text', destination: '/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text', permanent: true },
      { source: '/blog/how-to-remove-chatgpt-from-copied-ai-text', destination: '/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text', permanent: true },
      { source: '/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text/', destination: '/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text', permanent: true },
      // NEW: truncated variant confirmed in raw GSC export, missing before
      { source: '/blog/how-to-remove-chatgpt-formatting', destination: '/blog/how-to-remove-chatgpt-formatting-from-copied-ai-text', permanent: true },

      // ---------- Cluster: "Average reading speed" ----------
      // NEW: none of these were covered before — confirmed via raw GSC export
      { source: '/blog/average-religion-speed', destination: '/blog/average-reading-speed', permanent: true },
      { source: '/blog/average-reading-speed-whats-normal-how-to-test-yours', destination: '/blog/average-reading-speed', permanent: true },
      { source: '/blog/average-reading-speed-wpm-whats-normal-how-to-test-yours', destination: '/blog/average-reading-speed', permanent: true },
      { source: '/blog/average-reading-speed/average-adult-silent-reading-rate-words-per-minute-source', destination: '/blog/average-reading-speed', permanent: true },

      // ---------- Cluster: "Best speed reading apps for PC" ----------
      // NEW: confirmed in raw GSC export, missing before
      { source: '/blog/best-speed-reading-apps', destination: '/blog/best-speed-reading-apps-for-pc', permanent: true },
      { source: '/blog/best-speed-reading-pc', destination: '/blog/best-speed-reading-apps-for-pc', permanent: true },

      // ---------- Misc confirmed blog duplicates (NEW) ----------
      { source: '/blog/1-million-token-to-words', destination: '/blog/1-million-tokens-to-words', permanent: true },
      { source: '/blog/how-much-does-1-million-tokens-cost-7-real-examples', destination: '/blog/how-much-does-1-million-tokens-cost', permanent: true },
      { source: '/blog/keyboard-shift-g-word-count', destination: '/blog/keyboard-shortcut-word-count', permanent: true },
      { source: '/blog/how-long-does-it-take-to-read-10,000-words', destination: '/blog/how-long-does-it-take-to-read-10000-words', permanent: true },
      { source: '/blog/countflows-ai-text-cleaner', destination: '/tools/ai-text-cleaner', permanent: true }, // best-guess target — confirm if wrong

      // ---------- Tools: confirmed typo/format duplicates ----------
      { source: '/tools/syllable_counter', destination: '/tools/syllable-counter', permanent: true }, // underscore typo
      { source: '/tools/text-repeat', destination: '/tools/text-repeater', permanent: true },
      { source: '/tools/text-reperter', destination: '/tools/text-repeater', permanent: true }, // typo
      // NEW: confirmed in raw GSC export, missing before — this one ranks at position 3.0!
      { source: '/tools/char-counter', destination: '/tools/character-counter', permanent: true },
      // NEW: the un-prefixed duplicate path to Text Repeater
      { source: '/text-repeater', destination: '/tools/text-repeater', permanent: true },
      // NEW: typo of the newly-confirmed Invisible Character Detector tool
      { source: '/tools/invisible-text-detector', destination: '/tools/invisible-character-detector', permanent: true },
      { source: '/hiddentextcleaner', destination: '/tools/invisible-character-detector', permanent: true },
      // NEW: best-guess targets — confirm if wrong
      { source: '/tools/overview', destination: '/tools', permanent: true },
      { source: '/tools/read', destination: '/tools/reading-time', permanent: true },

      // ---------- Tools: canonical slugs confirmed ----------
      { source: '/tools/and-replace-text', destination: '/tools/find-and-replace-text', permanent: true },
      { source: '/tools/ai-token-context', destination: '/tools/ai-token-counter', permanent: true },
      { source: '/tools/ai-target-counter', destination: '/tools/ai-token-counter', permanent: true },
      { source: '/tools/countflows-reading-time-calculator', destination: '/tools/reading-time', permanent: true },
      { source: '/tools/reading-time-this-text', destination: '/tools/reading-time', permanent: true },
      // NEW: the actual base legacy slug — this was the highest-traffic missing redirect (47 impressions, position 3.55)
      { source: '/tools/reading-time-calculator', destination: '/tools/reading-time', permanent: true },

      // ---------- Off-topic broken slug ----------
      // FLAG: destination page itself (where-was-the-hobbit-filmed) is NOT in the current blogData —
      // per an earlier decision both pages were meant to be deleted, not redirected into each other.
      // Left as-is pending your call — either remove this redirect (let it 404 as originally planned)
      // or point it somewhere else if you want to keep capturing its ~220 impressions.
      { source: '/blog/where-was-the-filmed', destination: '/blog/where-was-the-hobbit-filmed', permanent: true },

      // ---------- Unclear — no confident match, NOT added, confirm intent first ----------
      // /tools/ai-and-plagiarism-remover (1 impression) — no such tool currently exists
      // /blog/how-encrypted-word-count-ranges-apply-here (1 impression) — no clear source article

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