export const CATEGORY_LABELS = {
  hidden: "Hidden / Invisible",
  space: "Unusual Space",
  directional: "Directional Control",
  variation: "Variation Selector",
  typography: "Typography",
  separator: "Text Separator",
  blank: "Blank-Looking Character",
}

export function formatCodePoint(codePoint) {
  return `U+${codePoint.toString(16).toUpperCase().padStart(codePoint > 0xffff ? 6 : 4, "0")}`
}

function item(codePoint, name, category, replacement = "", recommended = false, description = "") {
  return {
    key: formatCodePoint(codePoint),
    codePoint,
    code: formatCodePoint(codePoint),
    name,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    replacement,
    recommended,
    description,
  }
}

const EXACT = new Map([
  [0x00a0, item(0x00a0, "No-Break Space", "space", " ", true, "A non-breaking space that looks similar to a normal space.")],
  [0x00ad, item(0x00ad, "Soft Hyphen", "hidden", "", true, "An invisible hyphen marker that may appear only when text wraps.")],
  [0x034f, item(0x034f, "Combining Grapheme Joiner", "hidden", "", false, "An invisible Unicode formatting character that can affect character ordering.")],
  [0x061c, item(0x061c, "Arabic Letter Mark", "directional", "", false, "A bidirectional formatting mark used with Arabic-script text.")],
  [0x115f, item(0x115f, "Hangul Choseong Filler", "blank", "", false, "A character that can appear blank while still remaining in the text.")],
  [0x1160, item(0x1160, "Hangul Jungseong Filler", "blank", "", false, "A Hangul filler character that can appear visually empty.")],
  [0x180e, item(0x180e, "Mongolian Vowel Separator", "hidden", "", false, "A historic formatting character that can be invisible in rendered text.")],

  [0x2000, item(0x2000, "En Quad", "space", " ", true)],
  [0x2001, item(0x2001, "Em Quad", "space", " ", true)],
  [0x2002, item(0x2002, "En Space", "space", " ", true)],
  [0x2003, item(0x2003, "Em Space", "space", " ", true)],
  [0x2004, item(0x2004, "Three-Per-Em Space", "space", " ", true)],
  [0x2005, item(0x2005, "Four-Per-Em Space", "space", " ", true)],
  [0x2006, item(0x2006, "Six-Per-Em Space", "space", " ", true)],
  [0x2007, item(0x2007, "Figure Space", "space", " ", true)],
  [0x2008, item(0x2008, "Punctuation Space", "space", " ", true)],
  [0x2009, item(0x2009, "Thin Space", "space", " ", true)],
  [0x200a, item(0x200a, "Hair Space", "space", " ", true)],

  [0x200b, item(0x200b, "Zero Width Space", "hidden", "", true, "An invisible spacing character with zero visible width.")],
  [0x200c, item(0x200c, "Zero Width Non-Joiner", "hidden", "", false, "Can be meaningful in some writing systems, so review before removing.")],
  [0x200d, item(0x200d, "Zero Width Joiner", "hidden", "", false, "Used in some scripts and emoji sequences. It should not be removed automatically.")],

  [0x200e, item(0x200e, "Left-to-Right Mark", "directional", "", false)],
  [0x200f, item(0x200f, "Right-to-Left Mark", "directional", "", false)],

  [0x2013, item(0x2013, "En Dash", "typography", "-", false)],
  [0x2014, item(0x2014, "Em Dash", "typography", "-", false)],
  [0x2018, item(0x2018, "Left Single Quotation Mark", "typography", "'", false)],
  [0x2019, item(0x2019, "Right Single Quotation Mark", "typography", "'", false)],
  [0x201c, item(0x201c, "Left Double Quotation Mark", "typography", '"', false)],
  [0x201d, item(0x201d, "Right Double Quotation Mark", "typography", '"', false)],
  [0x2026, item(0x2026, "Horizontal Ellipsis", "typography", "...", false)],

  [0x2028, item(0x2028, "Line Separator", "separator", "\n", false)],
  [0x2029, item(0x2029, "Paragraph Separator", "separator", "\n\n", false)],

  [0x202a, item(0x202a, "Left-to-Right Embedding", "directional", "", false)],
  [0x202b, item(0x202b, "Right-to-Left Embedding", "directional", "", false)],
  [0x202c, item(0x202c, "Pop Directional Formatting", "directional", "", false)],
  [0x202d, item(0x202d, "Left-to-Right Override", "directional", "", false)],
  [0x202e, item(0x202e, "Right-to-Left Override", "directional", "", false)],

  [0x202f, item(0x202f, "Narrow No-Break Space", "space", " ", true)],
  [0x205f, item(0x205f, "Medium Mathematical Space", "space", " ", true)],
  [0x2060, item(0x2060, "Word Joiner", "hidden", "", false)],
  [0x2061, item(0x2061, "Function Application", "hidden", "", false)],
  [0x2062, item(0x2062, "Invisible Times", "hidden", "", false)],
  [0x2063, item(0x2063, "Invisible Separator", "hidden", "", false)],
  [0x2064, item(0x2064, "Invisible Plus", "hidden", "", false)],

  [0x2066, item(0x2066, "Left-to-Right Isolate", "directional", "", false)],
  [0x2067, item(0x2067, "Right-to-Left Isolate", "directional", "", false)],
  [0x2068, item(0x2068, "First Strong Isolate", "directional", "", false)],
  [0x2069, item(0x2069, "Pop Directional Isolate", "directional", "", false)],

  [0x206a, item(0x206a, "Inhibit Symmetric Swapping", "directional", "", false)],
  [0x206b, item(0x206b, "Activate Symmetric Swapping", "directional", "", false)],
  [0x206c, item(0x206c, "Inhibit Arabic Form Shaping", "directional", "", false)],
  [0x206d, item(0x206d, "Activate Arabic Form Shaping", "directional", "", false)],
  [0x206e, item(0x206e, "National Digit Shapes", "directional", "", false)],
  [0x206f, item(0x206f, "Nominal Digit Shapes", "directional", "", false)],

  [0x2800, item(0x2800, "Braille Pattern Blank", "blank", "", false)],
  [0x3000, item(0x3000, "Ideographic Space", "space", " ", true)],
  [0x3164, item(0x3164, "Hangul Filler", "blank", "", false)],
  [0xfeff, item(0xfeff, "Zero Width No-Break Space / BOM", "hidden", "", true, "Often appears as a byte-order mark or invisible copied-text artifact.")],
  [0xffa0, item(0xffa0, "Halfwidth Hangul Filler", "blank", "", false)],

  [0xfff9, item(0xfff9, "Interlinear Annotation Anchor", "hidden", "", false)],
  [0xfffa, item(0xfffa, "Interlinear Annotation Separator", "hidden", "", false)],
  [0xfffb, item(0xfffb, "Interlinear Annotation Terminator", "hidden", "", false)],
])

function getVariationSelector(codePoint) {
  if (codePoint >= 0xfe00 && codePoint <= 0xfe0f) {
    const number = codePoint - 0xfe00 + 1
    return item(codePoint, `Variation Selector-${number}`, "variation", "", false, "Variation selectors can change how a character or emoji is rendered.")
  }

  if (codePoint >= 0xe0100 && codePoint <= 0xe01ef) {
    const number = codePoint - 0xe0100 + 17
    return item(codePoint, `Variation Selector-${number}`, "variation", "", false, "A supplementary variation selector.")
  }

  return null
}

function getTagCharacter(codePoint) {
  if (codePoint === 0xe0001) return item(codePoint, "Language Tag", "hidden", "", false)

  if (codePoint >= 0xe0020 && codePoint <= 0xe007e) {
    return item(codePoint, "Unicode Tag Character", "hidden", "", false, "Invisible Unicode tag characters can be used in specialized text and emoji sequences.")
  }

  if (codePoint === 0xe007f) return item(codePoint, "Cancel Tag", "hidden", "", false)

  return null
}

export function getUnicodeInfo(codePoint) {
  return EXACT.get(codePoint) || getVariationSelector(codePoint) || getTagCharacter(codePoint) || null
}