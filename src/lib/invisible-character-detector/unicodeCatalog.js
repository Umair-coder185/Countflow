export const CATEGORY_LABELS = {
  invisible: "Invisible Character",
  space: "Unusual Space",
  directional: "Directional Control",
}

export const ACTION_LABELS = {
  remove: "Remove",
  normalize: "Normalize",
  review: "Review",
}

export function formatCodePoint(codePoint) {
  const width = codePoint > 0xffff ? 6 : 4
  return `U+${codePoint.toString(16).toUpperCase().padStart(width, "0")}`
}

function createCharacter(codePoint, name, category, action, replacement, recommended, description) {
  return Object.freeze({
    codePoint,
    code: formatCodePoint(codePoint),
    name,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    action,
    actionLabel: ACTION_LABELS[action],
    replacement,
    recommended,
    description,
  })
}

const CHARACTER_MAP = new Map([
  [
    0x00a0,
    createCharacter(
      0x00a0,
      "No-Break Space",
      "space",
      "normalize",
      " ",
      true,
      "Looks like a normal space but prevents a line break at that position."
    ),
  ],

  [
    0x00ad,
    createCharacter(
      0x00ad,
      "Soft Hyphen",
      "invisible",
      "remove",
      "",
      true,
      "An invisible hyphen marker that may become visible when a word wraps."
    ),
  ],

  [
    0x034f,
    createCharacter(
      0x034f,
      "Combining Grapheme Joiner",
      "invisible",
      "review",
      "",
      false,
      "An invisible formatting character that can influence combining-character behavior."
    ),
  ],

  [
    0x061c,
    createCharacter(
      0x061c,
      "Arabic Letter Mark",
      "directional",
      "review",
      "",
      false,
      "Controls bidirectional text behavior and may be meaningful in Arabic-script content."
    ),
  ],

  [
    0x2000,
    createCharacter(
      0x2000,
      "En Quad",
      "space",
      "normalize",
      " ",
      true,
      "A Unicode spacing character wider or different from a standard ASCII space."
    ),
  ],

  [
    0x2001,
    createCharacter(
      0x2001,
      "Em Quad",
      "space",
      "normalize",
      " ",
      true,
      "A Unicode spacing character that can behave differently from a normal space."
    ),
  ],

  [
    0x2002,
    createCharacter(
      0x2002,
      "En Space",
      "space",
      "normalize",
      " ",
      true,
      "A visible-width Unicode space that differs from a standard space."
    ),
  ],

  [
    0x2003,
    createCharacter(
      0x2003,
      "Em Space",
      "space",
      "normalize",
      " ",
      true,
      "A wide Unicode space often introduced through formatted text."
    ),
  ],

  [
    0x2004,
    createCharacter(
      0x2004,
      "Three-Per-Em Space",
      "space",
      "normalize",
      " ",
      true,
      "A typographic Unicode space that can be normalized to a regular space."
    ),
  ],

  [
    0x2005,
    createCharacter(
      0x2005,
      "Four-Per-Em Space",
      "space",
      "normalize",
      " ",
      true,
      "A typographic Unicode space that may look similar to ordinary spacing."
    ),
  ],

  [
    0x2006,
    createCharacter(
      0x2006,
      "Six-Per-Em Space",
      "space",
      "normalize",
      " ",
      true,
      "A narrow typographic space that can be difficult to distinguish visually."
    ),
  ],

  [
    0x2007,
    createCharacter(
      0x2007,
      "Figure Space",
      "space",
      "normalize",
      " ",
      true,
      "A non-breaking space designed to align numbers."
    ),
  ],

  [
    0x2008,
    createCharacter(
      0x2008,
      "Punctuation Space",
      "space",
      "normalize",
      " ",
      true,
      "A Unicode space approximately the width of punctuation."
    ),
  ],

  [
    0x2009,
    createCharacter(
      0x2009,
      "Thin Space",
      "space",
      "normalize",
      " ",
      true,
      "A narrow space commonly used in typography."
    ),
  ],

  [
    0x200a,
    createCharacter(
      0x200a,
      "Hair Space",
      "space",
      "normalize",
      " ",
      true,
      "An extremely narrow Unicode space that can be hard to notice."
    ),
  ],

  [
    0x200b,
    createCharacter(
      0x200b,
      "Zero Width Space",
      "invisible",
      "remove",
      "",
      true,
      "An invisible character with zero visible width that can interrupt search, matching, or text processing."
    ),
  ],

  [
    0x200c,
    createCharacter(
      0x200c,
      "Zero Width Non-Joiner",
      "invisible",
      "review",
      "",
      false,
      "An invisible character used legitimately in some writing systems. Review before removing."
    ),
  ],

  [
    0x200d,
    createCharacter(
      0x200d,
      "Zero Width Joiner",
      "invisible",
      "review",
      "",
      false,
      "Used in some languages and emoji sequences. Removing it automatically can change visible text."
    ),
  ],

  [
    0x200e,
    createCharacter(
      0x200e,
      "Left-to-Right Mark",
      "directional",
      "review",
      "",
      false,
      "An invisible mark that influences bidirectional text display."
    ),
  ],

  [
    0x200f,
    createCharacter(
      0x200f,
      "Right-to-Left Mark",
      "directional",
      "review",
      "",
      false,
      "An invisible mark used to control right-to-left text direction."
    ),
  ],

  [
    0x202a,
    createCharacter(
      0x202a,
      "Left-to-Right Embedding",
      "directional",
      "review",
      "",
      false,
      "A bidirectional formatting control that affects how surrounding text is displayed."
    ),
  ],

  [
    0x202b,
    createCharacter(
      0x202b,
      "Right-to-Left Embedding",
      "directional",
      "review",
      "",
      false,
      "A bidirectional formatting control used for right-to-left text."
    ),
  ],

  [
    0x202c,
    createCharacter(
      0x202c,
      "Pop Directional Formatting",
      "directional",
      "review",
      "",
      false,
      "Ends a previous bidirectional embedding or override."
    ),
  ],

  [
    0x202d,
    createCharacter(
      0x202d,
      "Left-to-Right Override",
      "directional",
      "review",
      "",
      false,
      "Forces text direction from left to right until the formatting control ends."
    ),
  ],

  [
    0x202e,
    createCharacter(
      0x202e,
      "Right-to-Left Override",
      "directional",
      "review",
      "",
      false,
      "Forces text direction from right to left and can make text appear different from its stored order."
    ),
  ],

  [
    0x202f,
    createCharacter(
      0x202f,
      "Narrow No-Break Space",
      "space",
      "normalize",
      " ",
      true,
      "A narrow non-breaking space that can look almost identical to an ordinary space."
    ),
  ],

  [
    0x205f,
    createCharacter(
      0x205f,
      "Medium Mathematical Space",
      "space",
      "normalize",
      " ",
      true,
      "A mathematical spacing character that can be normalized in ordinary text."
    ),
  ],

  [
    0x2060,
    createCharacter(
      0x2060,
      "Word Joiner",
      "invisible",
      "review",
      "",
      false,
      "An invisible character that prevents line breaks between surrounding characters."
    ),
  ],

  [
    0x2066,
    createCharacter(
      0x2066,
      "Left-to-Right Isolate",
      "directional",
      "review",
      "",
      false,
      "Starts an isolated left-to-right directional section."
    ),
  ],

  [
    0x2067,
    createCharacter(
      0x2067,
      "Right-to-Left Isolate",
      "directional",
      "review",
      "",
      false,
      "Starts an isolated right-to-left directional section."
    ),
  ],

  [
    0x2068,
    createCharacter(
      0x2068,
      "First Strong Isolate",
      "directional",
      "review",
      "",
      false,
      "Lets the first strong character determine the direction of an isolated section."
    ),
  ],

  [
    0x2069,
    createCharacter(
      0x2069,
      "Pop Directional Isolate",
      "directional",
      "review",
      "",
      false,
      "Ends a bidirectional isolate section."
    ),
  ],

  [
    0x3000,
    createCharacter(
      0x3000,
      "Ideographic Space",
      "space",
      "normalize",
      " ",
      true,
      "A full-width Unicode space commonly used in East Asian typography."
    ),
  ],

  [
    0xfeff,
    createCharacter(
      0xfeff,
      "Zero Width No-Break Space / BOM",
      "invisible",
      "remove",
      "",
      true,
      "An invisible character often used as a byte-order mark and sometimes introduced during copying or file conversion."
    ),
  ],
])

export function getInvisibleCharacterInfo(codePoint) {
  return CHARACTER_MAP.get(codePoint) || null
}

export function isInvisibleCharacter(codePoint) {
  return CHARACTER_MAP.has(codePoint)
}

export function getSupportedCharacters() {
  return Array.from(CHARACTER_MAP.values())
}

export function getRecommendedCharacterCodes() {
  return getSupportedCharacters()
    .filter((character) => character.recommended)
    .map((character) => character.code)
}