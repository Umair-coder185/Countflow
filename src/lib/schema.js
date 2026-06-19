export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Countflows",
  "url": "https://countflows.com",
  "logo": "https://countflows.com/logo.png",
  "description": "Free online writing analysis tools including word counter, character counter, reading time calculator, and sentence analyzer",
  "sameAs": [
    "https://twitter.com/countflows",
    "https://facebook.com/countflows",
    "https://linkedin.com/company/countflows"
  ],
    "keywords": "Real-time word and character counting, Sentence and paragraph counts, Goal tracker with progress bar",
  }


export const wordCounterToolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Counter - Countflows",
  "description": "Free online word counter tool to instantly count words, characters, sentences and paragraphs",
  "url": "https://countflows.com/tools/word-counter",
  "applicationCategory": "Productivity",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250"
  }
}

export const characterCounterToolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Character Counter - Countflows",
  "description": "Free online character counter to count characters, letters, spaces and symbols instantly",
  "url": "https://countflows.com/tools/character-counter",
  "applicationCategory": "Productivity",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export const readingTimeToolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reading Time Calculator - Countflows",
  "description": "Free reading time calculator to estimate how long content takes to read and speak",
  "url": "https://countflows.com/tools/reading-time",
  "applicationCategory": "Productivity",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export const sentenceCounterToolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sentence Counter - Countflows",
  "description": "Free sentence counter and analyzer to count sentences and analyze writing structure",
  "url": "https://countflows.com/tools/sentence-calculator",
  "applicationCategory": "Productivity",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Countflows?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Countflows is a suite of free online writing analysis tools including word counter, character counter, reading time calculator, and sentence analyzer. Perfect for writers, students, bloggers, and content creators."
      }
    },
    {
      "@type": "Question",
      "name": "Is Countflows free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Countflows is completely free to use. No registration or subscription required."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the word counter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our word counter is 100% accurate. It counts all words including hyphenated words and contractions according to standard word count rules."
      }
    }
  ]
}
