function countMatches(text, regex) {
  return (text.match(regex) || []).length
}

export function inspectClipboard({ plainText = "", htmlText = "" } = {}) {
  const plain = typeof plainText === "string" ? plainText : ""
  const html = typeof htmlText === "string" ? htmlText : ""

  if (!html) {
    return {
      hasHtml: false,
      plainLength: plain.length,
      htmlLength: 0,
      tagCount: 0,
      inlineStyleCount: 0,
      classAttributeCount: 0,
      dataAttributeCount: 0,
      commentCount: 0,
      hiddenStyleCount: 0,
    }
  }

  return {
    hasHtml: true,
    plainLength: plain.length,
    htmlLength: html.length,
    tagCount: countMatches(html, /<\/?[a-z][^>]*>/gi),
    inlineStyleCount: countMatches(html, /\sstyle\s*=/gi),
    classAttributeCount: countMatches(html, /\sclass\s*=/gi),
    dataAttributeCount: countMatches(html, /\sdata-[\w-]+\s*=/gi),
    commentCount: countMatches(html, /<!--[\s\S]*?-->/g),
    hiddenStyleCount: countMatches(html, /(?:display\s*:\s*none|visibility\s*:\s*hidden)/gi),
  }
}