export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Countflow",
  "url": "https://countflow.com",
  "logo": "https://countflow.com/logo.png",
  "description": "Free online writing analysis tools including word counter, character counter, reading time calculator, and sentence analyzer",
  "sameAs": [
    "https://twitter.com/countflow",
    "https://facebook.com/countflow",
    "https://linkedin.com/company/countflow"
  ],
  "contact": {
    "@type": "ContactPoint",
    "telephone": "+1-xxx-xxx-xxxx",
    "contactType": "Customer Support",
    "areaServed": "US"
  }
}

export const wordCounterToolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Word Counter - Countflow",
  "description": "Free online word counter tool to instantly count words, characters, sentences and paragraphs",
  "url": "https://countflow.com/tools/word-counter",
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
  "@type": "SoftwareApplication",
  "name": "Character Counter - Countflow",
  "description": "Free online character counter to count characters, letters, spaces and symbols instantly",
  "url": "https://countflow.com/tools/character-counter",
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
  "@type": "SoftwareApplication",
  "name": "Reading Time Calculator - Countflow",
  "description": "Free reading time calculator to estimate how long content takes to read and speak",
  "url": "https://countflow.com/tools/reading-time",
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
  "@type": "SoftwareApplication",
  "name": "Sentence Counter - Countflow",
  "description": "Free sentence counter and analyzer to count sentences and analyze writing structure",
  "url": "https://countflow.com/tools/sentence-calculator",
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
      "name": "What is Countflow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Countflow is a suite of free online writing analysis tools including word counter, character counter, reading time calculator, and sentence analyzer. Perfect for writers, students, bloggers, and content creators."
      }
    },
    {
      "@type": "Question",
      "name": "Is Countflow free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Countflow is completely free to use. No registration or subscription required."
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
